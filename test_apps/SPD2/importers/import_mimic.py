"""Imports the MIMIC common cases dataset: reads the MIMIC-IV demo's tables, as published, and writes the
model's JSON files.

The 29 admissions of the subset are three case types, each chosen by its billing group (HCFA DRG, TYPES),
on one shared master process: a case type and the care a patient needs select which of its steps run.
Each stay's course is read from its transfers between care units, its ICU procedure events, its orders
and its charting, and each step timed by the events that start and end it (STEPS). Who executed each step
is read from the events too (AGENTS). The jobs, the steps and the specification follow the breakdown of
the hospital model (models/hospital) cut down to what the raw data times; they are reasoned choices, not
in the data. The arcs are the moves between steps that the stays make.

Usage:
    py -m importers.import_mimic        (re)import data/mimic-common/ from data/mimic-iv-demo-common-cases/
"""

import csv
import gzip
import re
from collections import Counter, defaultdict
from datetime import datetime

from business import DATA, write_model

DATASET_ID = "mimic-common"
SOURCE = DATA / "mimic-iv-demo-common-cases"

# The case types: (id, billing group the admissions are chosen by)
TYPES = [("cabg", "CORONARY BYPASS"), ("renal", "RENAL FAILURE"), ("sepsis", "SEPTICEMIA OR SEVERE SEPSIS")]

JOBS = [("ED", "Emergency medicine"), ("CS", "Cardiac surgery"), ("CC", "Critical care"), ("WD", "Ward")]

# The steps, each in its job, in the pathway's order, with what starts and ends it
STEPS = [
    ("ed", "Emergency assessment", "ED", "time in the emergency department, its observation unit included"),
    ("pre-op", "Pre-operative workup", "CS", "from admission, or leaving the ED, to leaving for theatre: in time of "
                                             "the first PACU or CVICU transfer"),
    ("operate", "Operate", "CS", "from leaving for theatre to arriving in the ICU: the ICU's OR Received event"),
    ("ventilate", "Ventilate and wean", "CC", "from arriving from theatre to extubation: end of the Invasive "
                                              "Ventilation event"),
    ("icu", "Intensive care", "CC", "time in intensive care units; after surgery, from extubation"),
    ("ward", "Ward care", "WD", "time on wards; after surgery, from leaving the ICU to discharge"),
]

# Who executed each step, as the data records it. The operating surgeon is not recorded: the one who
# orders most on the day of surgery stands in.
AGENTS = {
    "ed": "the provider with most orders in the ED (poe.order_provider_id)",
    "pre-op": "the admitting provider (admissions.admit_provider_id)",
    "operate": "the provider with most orders on the day of surgery (poe.order_provider_id)",
    "ventilate": "the caregiver recording the ventilation (procedureevents.caregiver_id)",
    "icu": "the caregiver charting most in the ICU (chartevents.caregiver_id)",
    "ward": "the provider with most orders on the wards (poe.order_provider_id)",
}

# The product passing on each move between steps, or into or out of the process (None)
PRODUCTS = {
    (None, "ed"): "Arriving patient",
    (None, "pre-op"): "Admitted patient",
    (None, "icu"): "Patient admitted to ICU",
    ("ed", "pre-op"): "Patient for surgery",
    ("ed", "icu"): "Patient for ICU",
    ("ed", "ward"): "Patient for a ward",
    ("pre-op", "operate"): "Patient for theatre",
    ("operate", "ventilate"): "Patient from theatre",
    ("operate", "icu"): "Patient from theatre",
    ("ventilate", "icu"): "Extubated patient",
    ("icu", "ward"): "Patient stepped down",
    ("ward", None): "Discharged patient",
    ("icu", None): "Patient leaving the ICU",
}

# What a case takes on, after the hospital model's anatomy: (id, name, steps, descriptors, children). Its
# case type, and the care it needs, each care setting a node of its own, as a case may not need it.
SPECIFICATION = ("patient", "Patient", [],
                 [{"name": "age", "kind": "numerical"}, {"name": "weight", "kind": "numerical"},
                  {"name": "admission", "kind": "categorical"}], [
    ("chest", "Chest", [], [], [
        ("bypass", "Coronary artery bypass", ["pre-op", "operate"],
         [{"name": "grafts", "kind": "numerical", "range": [1, 5]}], [
            ("post-op-ventilation", "Post-operative ventilation", ["ventilate"], [], []),
        ]),
    ]),
    ("kidneys", "Kidneys", [], [], [
        ("renal-failure", "Renal failure", [], [], []),
    ]),
    ("whole-body", "Whole body", [], [], [
        ("sepsis", "Sepsis", [], [], []),
    ]),
    ("care", "Care coordination", [], [], [
        ("emergency", "Emergency department", ["ed"], [], []),
        ("intensive", "Intensive care", ["icu"], [], []),
        ("wards", "Ward", ["ward"], [], []),
    ]),
])
TYPE_NODE = {"cabg": ("chest", "bypass"), "renal": ("kidneys", "renal-failure"), "sepsis": ("whole-body", "sepsis")}
CARE_NODE = {"ed": "emergency", "icu": "intensive", "ward": "wards"}

# The admission types, as planned or not: split further, a type has too few cases to forecast from
PLANNED = {"ELECTIVE", "SURGICAL SAME DAY ADMISSION"}

COUNTS = {"single": 1, "one": 1, "double": 2, "two": 2, "three": 3, "four": 4}

# The paper's anaesthetic example (worked examples, Figure 9), as the ICU records it: the first propofol
# infusion started in a stay, its dose a metric of the material used, and the largest fall in mean
# arterial pressure (MAP) within the hour after it, from the last reading in the hour before, a metric
# depending on the dose. Theatre is not recorded, so this is sedation started in the ICU, not induction.
SEDATIVE = "Propofol"
MAP = {"Arterial Blood Pressure mean", "Non Invasive Blood Pressure mean"}
WINDOW = 60                                      # minutes before and after the start the MAP is read in
METRICS = [
    {"name": "duration", "kind": "numerical"},
    {"name": "propofol dose", "kind": "numerical", "steps": ["ventilate", "icu"]},          # mcg/kg/min
    {"name": "MAP fall", "kind": "numerical", "steps": ["ventilate", "icu"], "depends": "propofol dose"},  # mmHg
]

# The inventory the ICU steps drew on: each drug, fluid or feed given there (inputevents) as a material,
# those given in at least MIN_CASES stays, and the machines (procedureevents) as tools. The wards and
# the ED record no inventory here, their records leaving tools and materials unrecorded.
MIN_CASES = 3
TOOLS = {"Invasive Ventilation": "Ventilator", "Non-invasive Ventilation": "Non-invasive ventilator",
         "Dialysis - CRRT": "CRRT machine"}
LBS = 0.45359237
# Not materials drawn on: what the patient drank or was given before the ICU, and the carrier solutions
# drugs are mixed in, recorded as items of their own
NOT_MATERIALS = ("14-", "16-")                   # order categories: oral or gastric intake, pre-admission
CARRIERS = {"Solution", "Piggyback", "Sterile Water"}


def table(name):
    with gzip.open(SOURCE / f"{name}.csv.gz", "rt", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def by_admission(name):
    rows = defaultdict(list)
    for r in table(name):
        rows[r["hadm_id"]].append(r)
    return rows


def at(text):
    return datetime.fromisoformat(text)


def hours(start, end):
    return (at(end) - at(start)).total_seconds() / 3600


def unit(careunit):
    """A care unit's kind: "ed", "icu", "theatre" or "ward"."""
    if careunit.startswith("Emergency Department"):
        return "ed"
    if "Intensive Care" in careunit or "SICU" in careunit or "(CCU)" in careunit:
        return "icu"
    return "theatre" if careunit == "PACU" else "ward"


def grafts(titles):
    """The arteries bypassed, counted from the procedure codes' titles: "(Aorto)coronary bypass of three
       coronary arteries" is 3, "Single internal mammary-coronary artery bypass" 1."""
    n = 0
    for t in titles:
        t = t.lower()
        if "bypass" not in t or "excision" in t:
            continue
        m = re.search(r"\b(single|one|double|two|three|four)\b", t)
        n += COUNTS[m.group(1)] if m else 1
    return n


class Sources:
    """The tables a case is read from, each by admission."""
    def __init__(self):
        self.admissions = {r["hadm_id"]: r for r in table("hosp/admissions")}
        self.patients = {r["subject_id"]: r for r in table("hosp/patients")}
        self.items = {r["itemid"]: r["label"] for r in table("icu/d_items")}
        self.titles = {(r["icd_code"], r["icd_version"]): r["long_title"] for r in table("hosp/d_icd_procedures")}
        self.transfers, self.procedures = by_admission("hosp/transfers"), by_admission("icu/procedureevents")
        self.orders, self.charts = by_admission("hosp/poe"), by_admission("icu/chartevents")
        self.coded, self.inputs = by_admission("hosp/procedures_icd"), by_admission("icu/inputevents")
        self.omr = defaultdict(list)
        for r in table("hosp/omr"):
            self.omr[r["subject_id"]].append(r)
        drg = {r["hadm_id"]: r["description"] for r in table("hosp/drgcodes") if r["drg_type"] == "HCFA"}
        self.types = {h: t for t, group in TYPES for h, d in drg.items() if d.startswith(group)}


def most(rows, who, when, spans):
    """Who appears most in rows within the spans of time, [(start, end)], or None."""
    c = Counter(r[who] for r in rows if r[who] and any(s <= r[when] <= e for s, e in spans))
    return c.most_common(1)[0][0] if c else None


def surgical(h, src, stays):
    """A coronary bypass stay's steps: the ED if it came through it, the workup to theatre, the operation,
       ventilation after it where recorded, then the ICU from extubation and the wards to discharge."""
    a = src.admissions[h]
    events = defaultdict(list)
    for e in src.procedures[h]:
        events[src.items[e["itemid"]]].append(e)
    theatre = next(t["intime"] for t in stays if unit(t["careunit"]) == "theatre" or "CVICU" in t["careunit"])
    received = min(e["starttime"] for e in events["OR Received"])
    vent = min((e for e in events["Invasive Ventilation"] if e["endtime"] > received),
               key=lambda e: e["starttime"], default=None)
    left_icu = max(t["outtime"] for t in stays if "CVICU" in t["careunit"])
    extubated = vent["endtime"] if vent else received
    steps = {}
    ed = [t for t in stays if unit(t["careunit"]) == "ed"]
    if ed:
        steps["ed"] = ([(t["intime"], t["outtime"]) for t in ed],
                       most(src.orders[h], "order_provider_id", "ordertime", [(t["intime"], t["outtime"]) for t in ed]))
    workup = ed[-1]["outtime"] if ed else a["admittime"]
    steps["pre-op"] = ([(workup, theatre)], a["admit_provider_id"])
    steps["operate"] = ([(theatre, received)], most(src.orders[h], "order_provider_id", "ordertime",
                                                    [(received[:10], received[:10] + " 23:59:59")]))
    if vent:
        steps["ventilate"] = ([(received, extubated)], vent["caregiver_id"])
    steps["icu"] = ([(extubated, left_icu)], most(src.charts[h], "caregiver_id", "charttime", [(extubated, left_icu)]))
    steps["ward"] = ([(left_icu, a["dischtime"])], most(src.orders[h], "order_provider_id", "ordertime",
                                                       [(left_icu, a["dischtime"])]))
    return steps


def medical(h, src, stays):
    """A medical stay's steps: its time in the ED, in intensive care and on wards, each where it has any,
       a stay moving back and forth counted as its time in each."""
    steps = {}
    for kind, rows, who, when in (("ed", src.orders[h], "order_provider_id", "ordertime"),
                                  ("icu", src.charts[h], "caregiver_id", "charttime"),
                                  ("ward", src.orders[h], "order_provider_id", "ordertime")):
        spans = [(t["intime"], t["outtime"]) for t in stays if unit(t["careunit"]) == kind]
        if spans:
            steps[kind] = (spans, most(rows, who, when, spans))
    return steps


def weight(h, src):
    """The patient's weight in kg: the outpatient record's weight nearest the admission, or else the ICU's
       admission weight, or None."""
    a = src.admissions[h]
    day = at(a["admittime"]).date()
    readings = [(abs((datetime.fromisoformat(r["chartdate"]).date() - day).days), float(r["result_value"]))
                for r in src.omr[a["subject_id"]] if r["result_name"] == "Weight (Lbs)"]
    if readings:
        return round(min(readings)[1] * LBS, 1)
    icu = [float(r["patientweight"]) for r in src.inputs[h] if r["patientweight"]]
    return icu[0] if icu else None


def sedation(h, src, steps):
    """The first propofol infusion started in the stay, where MAP is read in the hour before and after:
       the step it falls in, when, who started it, its dose (mcg/kg/min) and the fall in MAP (mmHg)."""
    starts = sorted((r for r in src.inputs[h] if src.items[r["itemid"]] == SEDATIVE and r["rateuom"].startswith("mcg/kg")),
                    key=lambda r: r["starttime"])
    readings = sorted((r["charttime"], float(r["valuenum"])) for r in src.charts[h]
                      if src.items[r["itemid"]] in MAP and r["valuenum"])
    for r in starts:
        t = at(r["starttime"])
        before = [v for c, v in readings if 0 <= (t - at(c)).total_seconds() <= WINDOW * 60]
        after = [v for c, v in readings if 0 < (at(c) - t).total_seconds() <= WINDOW * 60]
        step = next((s for s in ("ventilate", "icu") if s in steps
                     and any(a <= r["starttime"] <= b for a, b in steps[s][0])), None)
        if before and after and step:
            return {"step": step, "time": r["starttime"], "agent": r["caregiver_id"] or None,
                    "dose": round(float(r["rate"]), 2), "fall": round(before[-1] - min(after), 1)}
    return None


def inventory(h, src, steps):
    """What each ICU step drew on, {step: (tools, materials)}: the machines in use and the drugs, fluids
       and feeds started during its spans of time."""
    used = {}
    for s in ("ventilate", "icu"):
        if s not in steps:
            continue
        spans = steps[s][0]
        during = lambda a, b: any(a <= e and b >= f for f, e in spans)        # overlaps a span
        tools = {TOOLS[src.items[e["itemid"]]] for e in src.procedures[h]
                 if src.items[e["itemid"]] in TOOLS and during(e["starttime"], e["endtime"])}
        materials = {src.items[r["itemid"]] for r in src.inputs[h] if during(r["starttime"], r["starttime"])
                     and not r["ordercategoryname"].startswith(NOT_MATERIALS)
                     and src.items[r["itemid"]] not in CARRIERS}
        used[s] = (tools, materials)
    return used


def read_cases():
    """Each admission's case type, steps (each its spans of time and who executed it), patient,
       sedation and the inventory its ICU steps drew on."""
    src = Sources()
    cases = {}
    for h, kind in sorted(src.types.items(), key=lambda kv: ([t for t, _ in TYPES].index(kv[1]), kv[0])):
        a = src.admissions[h]
        stays = sorted((t for t in src.transfers[h] if t["eventtype"] != "discharge"), key=lambda t: t["intime"])
        p = src.patients[a["subject_id"]]
        steps = (surgical if kind == "cabg" else medical)(h, src, stays)
        cases[f"{kind}-{h}"] = {
            "type": kind,
            "steps": steps,
            "sedation": sedation(h, src, steps),
            "inventory": inventory(h, src, steps),
            "weight": weight(h, src),
            "age": int(p["anchor_age"]) + at(a["admittime"]).year - int(p["anchor_year"]),
            "admission": "Planned" if a["admission_type"] in PLANNED else "Unplanned",
            "grafts": grafts(src.titles[(c["icd_code"], c["icd_version"])] for c in src.coded[h]),
        }
    return cases


def derive():
    cases = read_cases()
    write_model(DATASET_ID,
                master_process=derive_process(cases),
                master_specification=derive_specification(),
                resources=derive_resources(cases),
                selections=derive_selections(cases),
                trace=derive_trace(cases))


ORDER = [s for s, *_ in STEPS]


def derive_process(cases):
    """G: the steps in their jobs, and an arc for each move between steps the stays make, in the
       pathway's order, with those into and out of the process."""
    moves = set()
    for c in cases.values():
        path = [None, *(s for s in ORDER if s in c["steps"]), None]
        moves |= set(zip(path, path[1:]))
    missing = moves - PRODUCTS.keys()
    if missing:
        raise ValueError(f"no product named for the moves {sorted(missing, key=str)}")
    rank = lambda s: -1 if s is None else ORDER.index(s)
    return {
        "jobs": [{"id": j, "name": name} for j, name in JOBS],
        "steps": [{"id": s, "name": name, "job": j} for s, name, j, _ in STEPS],
        "arcs": [{"product": PRODUCTS[(u, v)], "src": u, "tgt": v, "basis": "data"}
                 for u, v in sorted(moves, key=lambda m: (rank(m[0]), rank(m[1]) if m[1] else 99))],
        "metrics": METRICS,
    }


def derive_specification():
    def build(node):
        id, name, steps, descriptors, children = node
        return {"id": id, "name": name, "steps": steps, "descriptors": descriptors,
                "children": [build(c) for c in children]}
    return build(SPECIFICATION)


def agent_name(id):
    return f"Caregiver {id}" if id.isdigit() else f"Provider {id}"


def slug(name):
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def stocked(cases):
    """The materials kept: those given in at least MIN_CASES stays, propofol always."""
    stays = Counter(m for c in cases.values() for m in {m for _, ms in c["inventory"].values() for m in ms})
    return {m for m, n in stays.items() if n >= MIN_CASES} | {SEDATIVE}


def derive_resources(cases):
    """One agent per provider or caregiver who executed a step or started its sedation, qualified for the
       jobs of those steps; the machines the ICU steps used, as tools, and the materials kept."""
    jobs = defaultdict(set)
    job_of = {s: j for s, _, j, _ in STEPS}
    for case in cases.values():
        for s, (_, who) in case["steps"].items():
            if who:
                jobs[who].add(job_of[s])
        if case["sedation"] and case["sedation"]["agent"]:
            jobs[case["sedation"]["agent"]].add(job_of[case["sedation"]["step"]])
    return {
        "agents": [{"id": a, "name": agent_name(a), "qualifications": sorted(js)} for a, js in sorted(jobs.items())],
        "tools": [{"id": slug(t), "name": t} for t in sorted(set(TOOLS.values()))],
        "materials": [{"id": slug(m), "name": m} for m in sorted(stocked(cases))],
    }


def derive_selections(cases):
    """Each admission's selection: the patient, its case type, the bypass with its grafts and ventilation
       after it, where recorded, and the care settings it passed through."""
    selections = {}
    for i, c in cases.items():
        node = lambda id, values=None, children=(): {"id": f"{i}-{id}", "node": id, "values": values or {},
                                                      "children": list(children)}
        group, leaf = TYPE_NODE[c["type"]]
        if c["type"] == "cabg":
            vent = [node("post-op-ventilation")] if "ventilate" in c["steps"] else []
            kind = node(leaf, {"grafts": c["grafts"]}, vent)
        else:
            kind = node(leaf)
        care = [node(n) for s, n in CARE_NODE.items() if s in c["steps"]]
        selections[i] = node("patient", {"age": c["age"], "weight": c["weight"], "admission": c["admission"]},
                             [node(group, children=[kind]), node("care", children=care)])
    return selections


def derive_trace(cases):
    """One record per step executed: its duration in hours, the sum of its spans, with its first start,
       who executed it, and, at the ICU steps, the tools and materials it drew on (elsewhere unrecorded,
       None). Where a stay's sedation is recorded, two records more at its step: the propofol dose and
       the fall in MAP, each naming propofol and who started it."""
    kept = {m: slug(m) for m in stocked(cases)}
    trace = []
    for i, c in cases.items():
        for s in ORDER:
            if s not in c["steps"]:
                continue
            spans, who = c["steps"][s]
            tools, materials = c["inventory"].get(s, (None, None))
            trace.append({"project": i, "step": s, "time": spans[0][0], "agents": [who] if who else None,
                          "tools": None if tools is None else sorted(slug(t) for t in tools),
                          "materials": None if materials is None else sorted(kept[m] for m in materials if m in kept),
                          "metric": "duration", "value": round(sum(hours(a, b) for a, b in spans), 2)})
        sed = c["sedation"]
        if sed:
            base = {"project": i, "step": sed["step"], "time": sed["time"],
                    "agents": [sed["agent"]] if sed["agent"] else None, "tools": None, "materials": [slug(SEDATIVE)]}
            trace += [{**base, "metric": "propofol dose", "value": sed["dose"]},
                      {**base, "metric": "MAP fall", "value": sed["fall"]}]
    return trace


if __name__ == "__main__":
    derive()
