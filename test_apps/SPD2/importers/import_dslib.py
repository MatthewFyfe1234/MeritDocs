"""Imports the DSLIB IT dataset: reads its source workbooks and writes the model's JSON files.

From each project's schedule (data/dslib-it/source/Excel) it takes the leaf activities, their links, the
employee each was assigned, and, from the last tracking period, each one's actual start, duration and
cost. What the data does not record is supplied by the tables below, each a reasoned choice: the jobs,
the master specification and its mapping, the products' names and the order of steps within each job.
See data/dslib-it/REPORT.md for what the data cannot support.

Usage:
    py -m importers.import_dslib        (re)import data/dslib-it/ from data/dslib-it/source/
"""

import re
from collections import defaultdict
from datetime import datetime, timedelta

from business import DATA, write_model
from importers.xlsx import workbook

DATASET_ID = "dslib-it"
SOURCE = DATA / DATASET_ID / "source" / "Excel"
HOURS_A_DAY = 8                                  # the schedules' working days, as the project cards state

# The job of a step, matched in order against its name (or the name's activity-type prefix).
# Inferred: the dataset records no roles, only anonymous employees per project.
JOBS = [
    ("PM", "Project management", ["project management", "validation and support"]),
    ("BA", "Business analysis", ["requirements", "analysis"]),
    ("DS", "Design", ["design"]),
    ("DV", "Development", ["development", "coding", "bug fixing", "technical assembly"]),
    ("TS", "Testing", ["test", "uat"]),
    ("OP", "Operations", ["deploy"]),
]

# What the client agrees to buy: (name, dataset activities and milestones it comes from, children).
# Its steps (the mapping) are the activities among them; a project selects a node where any of them, or
# any of its children's, appear in its schedule. A node necessitates the same steps in every project, so
# steps the projects take or leave independently sit on nodes of their own.
SPECIFICATION = ("Delivered solution", ["project management", "go live"], [
    ("Validation and support", ["validation and support"]),
    ("Production deployment", ["deploy to production"]),
    ("Information system", ["development completed"], [
        ("Application code", ["coding"]),
        ("Assembly test", ["technical assembly test"]),
        ("Bug fixes", ["bug fixing"]),
        ("ICT testing", ["test preparation", "test coordination", "test execution", "ict test completed"]),
        ("Regression test", ["test ict - regression testing"]),
        ("Acceptance support", ["uat support", "uat completed"]),
    ]),
    ("Requirements specification", ["requirements", "requirements validated"]),
    ("Functional analysis", ["analysis validated"], [
        ("Business analysis", ["business analysis"]),
        ("Conceptual design", ["analysis - conceptual design"]),
    ]),
    ("Design documents", ["design validated"], [
        ("Technical design", ["technical design"]),
        ("User interface design", ["user interface design"]),
        ("Integration mapping", ["design - integration (mapping)"]),
        ("ISP design", ["design - isp design"]),
    ]),
    ("Handover package", ["release handover", "full handover to uat"]),
])

# What each milestone stands for, named as a thing: a product a step passes on through it
PRODUCTS = {
    "go live": "Live system",
    "requirements validated": "Validated requirements",
    "analysis validated": "Validated analysis",
    "design validated": "Validated design",
    "development completed": "Completed build",
    "code freeze": "Frozen code baseline",
    "ict test completed": "ICT-tested build",
    "uat completed": "Accepted release",
    "release handover": "Release package",
    "full handover to uat": "Handover package",
}

# The order of the steps in each job, as if all of them were in one project: each passes its work on to
# the next. Reasoned, where the schedules leave it open.
JOB_ORDER = [
    ["project management", "validation and support"],
    ["requirements", "business analysis", "analysis - conceptual design"],
    ["technical design", "design - integration (mapping)", "user interface design", "design - isp design"],
    ["coding", "technical assembly test", "bug fixing"],
    ["test preparation", "test coordination", "test execution", "test ict - regression testing", "uat support"],
    ["deploy to production"],
]

# Activity names that are synonyms across the projects, each mapped to one name, the workbooks being left
# as published. Judged from the names and phases alone: the data does not say two activities are the same.
SYNONYMS = {
    "analysis - business analysis": "business analysis",
    "design - technical design": "technical design",
    "design - user interface design": "user interface design",
    "development - bugfixing": "bug fixing",
    "development - bugfixing and support": "bug fixing",
    "development - build isp": "coding",
    "development - coding": "coding",
    "development - technical assembly": "technical assembly test",
    "development - technical assembly test": "technical assembly test",
    "full handover": "full handover to uat",
    "implementation - put in production": "deploy to production",
    "test ict - test coordination": "test coordination",
    "test ict - test execution": "test execution",
    "test ict - test preparation": "test preparation",
    "uat - test execution support": "uat support",
    "uat - test support": "uat support",
}

# The order of the phases, by job: each phase's work passes to the next. Reasoned: the schedules link
# activities only in part, timing the rest by fixed dates. Project management, a short kick-off, comes
# before them all (see derive_process).
PHASE_ORDER = ["BA", "DS", "DV", "TS", "OP"]

# Validation and support checks the built work, coming after coding in the projects' dates. Reasoned: the
# schedules link it only to project management. The bugs it finds, any number, pass one way to
# bug fixing, snagged before go live.
VALIDATES = [("coding", "validation and support"), ("validation and support", "bug fixing")]

# Not delivery steps: post go-live support is aftercare, to be recorded as metrics against the steps it
# follows, not modelled as a step
EXCLUDED = {"post implementation - post go live support"}

ACRONYMS = {"isp", "ict", "uat"}
INTO = "Request"                                 # what comes into the process from outside


def norm(name):
    """An activity's name, lower-cased and spaced as one, its synonyms taken as one (see SYNONYMS)."""
    name = " ".join(str(name).lower().split())
    return SYNONYMS.get(name, "ict test" if name == "test ict" else name)


def slug(name):
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def pretty(name):
    name = " ".join(w.upper() if w in ACRONYMS else w for w in name.split(" "))
    return name[:1].upper() + name[1:]


def label(name):
    """A step's short name: its activity type dropped, "Design - ISP design" as "ISP design"."""
    return pretty(name.split(" - ", 1)[-1])


def job_of(name):
    key = name.split(" - ")[0]
    for j, _, words in JOBS:
        if any(w in key for w in words):
            return j
    raise ValueError(f"no job for {name!r}")


def hours(text):
    """A ProTrack duration, "6d 4h" or "30m", in working hours."""
    total = 0.0
    for amount, unit in re.findall(r"([\d.]+)\s*([dhm])", str(text or "")):
        total += float(amount) * {"d": HOURS_A_DAY, "h": 1, "m": 1 / 60}[unit]
    return total


def moment(serial):
    """An Excel date, a serial day count, as an ISO date and time."""
    return (datetime(1899, 12, 30) + timedelta(days=float(serial))).isoformat(timespec="minutes")


def read_project(path):
    """One project's leaf activities, milestones included: {id, name, milestone, preds, employee, start,
       hours, cost}, the last four from the last tracking period, the actuals."""
    sheets, rows = workbook(path)
    schedule = [r for r in rows("Baseline Schedule")[2:] if r and r[0] is not None]
    by_id = {r[0]: r for r in schedule}
    tracking = [s for s in sheets if s.startswith("Project Control") or re.fullmatch(r"TP\d+", s)]
    actual = {r[0]: r for r in rows(tracking[-1])[3:] if r and r[0] is not None}
    cell = lambda r, k: r[k] if len(r) > k else None
    acts = []
    for r in schedule:
        if str(r[2]).count(".") < 2:
            continue                                     # the project and its phases, not activities
        a = actual.get(r[0], [])
        acts.append({
            "id": r[0],
            "name": norm(r[1]),
            "milestone": hours(r[7]) == 0,
            "preds": [norm(by_id[m.group()][1]) for m in re.finditer(r"\d+", str(r[3] or "")) if m.group() in by_id],
            "employee": (str(cell(r, 8) or "").split(";")[0].strip() or None),
            "start": moment(cell(a, 11)) if cell(a, 11) else None,
            "hours": hours(cell(a, 12)),
            "cost": float(cell(a, 18) or 0),
        })
    return acts


def derive():
    projects = {path.stem.split(" ")[0]: read_project(path) for path in sorted(SOURCE.glob("*.xlsx"))}
    every = {a["name"]: a["milestone"] for acts in projects.values() for a in acts if a["name"] not in EXCLUDED}
    steps = sorted(n for n, milestone in every.items() if not milestone)
    ordered = [n for job in JOB_ORDER for n in job]
    if sorted(ordered) != steps or any(len({job_of(n) for n in job}) != 1 for job in JOB_ORDER):
        raise ValueError("JOB_ORDER must list every step once, one job each")

    write_model(DATASET_ID,
                master_process=derive_process(projects, steps),
                master_specification=derive_specification(every),
                resources=derive_resources(projects),
                selections=derive_selections(projects),
                trace=derive_trace(projects))


END = "go live"                                  # the milestone that closes a project: what reaches it leaves


def links(projects, steps):
    """Each pair of steps the schedules link, directly or through milestones, (u, v): the milestone the
       product passes through, if any, the first where there are several. A step whose work reaches END
       through milestones is linked to outside the process, (u, None)."""
    found = {}
    for acts in projects.values():
        succ = defaultdict(set)
        for a in acts:
            for u in a["preds"]:
                succ[u].add(a["name"])
        for u in steps:
            frontier = [(v, None) for v in succ[u]]
            seen = set()
            while frontier:
                v, via = frontier.pop()
                if v in EXCLUDED or v in seen:
                    continue
                seen.add(v)
                if v in steps:
                    found.setdefault((u, v), via)
                else:                                    # a milestone: the product passes on through it
                    if v == END:
                        found.setdefault((u, None), via or v)
                    frontier += [(w, via or v) for w in succ[v]]
    return found


def derive_process(projects, steps):
    """G: the steps in their jobs, and the arcs carrying products, each marked with its basis: "data"
       where a schedule links the steps, "reasoned" where this importer adds the link.

       Within a job, each step passes its work to the next in JOB_ORDER (reasoned). Between jobs, a link
       the schedules record carries a product, named after the milestone it passes through, or the
       producing step's output where it is direct (data). Between phases, each step of one passes its
       work to the first step of the next in PHASE_ORDER (reasoned), so the link holds whichever steps a
       project runs, a path passing through skipped steps of the receiving job. A step whose work reaches
       go live through milestones passes its product out of the process, named after the first milestone
       (data). The request comes in from outside once, to project management, which passes its output to
       any other step nothing feeds; a step that feeds nothing, and has no such exit, passes its product
       out (reasoned)."""
    arcs = []
    for job in JOB_ORDER:
        for u, v in zip(job, job[1:]):
            arcs.append({"product": f"{label(u)} output", "src": slug(u), "tgt": slug(v), "basis": "reasoned"})
    for (u, v), via in sorted(links(projects, steps).items(), key=lambda kv: (kv[0][0], kv[0][1] or "")):
        if v is None:                                    # its work reaches go live: it leaves the process
            arcs.append({"product": PRODUCTS[via], "src": slug(u), "tgt": None, "basis": "data"})
        elif job_of(u) != job_of(v):
            arcs.append({"product": PRODUCTS[via] if via else f"{label(u)} output", "src": slug(u), "tgt": slug(v),
                         "basis": "data"})
    linked = {(a["src"], a["tgt"]) for a in arcs}
    first = {job_of(job[0]): job[0] for job in JOB_ORDER}   # each job's first step
    for before, after in zip(PHASE_ORDER, PHASE_ORDER[1:]):
        for u in next(job for job in JOB_ORDER if job_of(job[0]) == before):
            if (slug(u), slug(first[after])) not in linked:
                arcs.append({"product": f"{label(u)} output", "src": slug(u), "tgt": slug(first[after]),
                             "basis": "reasoned"})
    for u, v in VALIDATES:
        arcs.append({"product": f"{label(u)} output", "src": slug(u), "tgt": slug(v), "basis": "reasoned"})
    fed = {a["tgt"] for a in arcs}
    feeding = {a["src"] for a in arcs}
    reached = {}                                         # the milestone each step's product reaches first
    for acts in projects.values():
        for a in acts:
            if a["milestone"] and a["name"] in PRODUCTS:
                for u in a["preds"]:
                    reached.setdefault(u, a["name"])
    entry = JOB_ORDER[0][0]                              # project management, where the request comes in
    for n in steps:
        if n == entry:
            arcs.append({"product": INTO, "src": None, "tgt": slug(n), "basis": "reasoned"})
        elif slug(n) not in fed:
            arcs.append({"product": f"{label(entry)} output", "src": slug(entry), "tgt": slug(n),
                         "basis": "reasoned"})
        if slug(n) not in feeding:
            arcs.append({"product": PRODUCTS.get(reached.get(n), f"{label(n)} output"), "src": slug(n), "tgt": None,
                         "basis": "reasoned"})
    return {
        "jobs": [{"id": j, "name": name} for j, name, _ in JOBS],
        "steps": [{"id": slug(n), "name": label(n), "job": job_of(n)} for n in [s for job in JOB_ORDER for s in job]],
        "arcs": arcs,
        "metrics": [{"name": "duration", "kind": "numerical"}, {"name": "cost", "kind": "numerical"}],
    }


def derive_specification(every):
    """T and its mapping: each node with the steps among the activities it comes from."""
    def build(name, sources, children=()):
        missing = [s for s in sources if s not in every]
        if missing:
            raise ValueError(f"{name}: not in the dataset: {missing}")
        return {"id": slug(name), "name": name, "steps": [slug(s) for s in sources if not every[s]],
                "descriptors": [], "children": [build(*c) for c in children]}
    return build(*SPECIFICATION)


def agent(project, employee):
    """An employee's agent id, scoped to the project: Employee D in C2015-22 is 22-D."""
    return f"{project[-2:]}-{employee.split()[-1]}"


def derive_resources(projects):
    """One agent per employee per project, the data lettering employees within a project only, each
       qualified for the jobs of the steps it executed. No tools or materials are recorded."""
    jobs = defaultdict(set)
    for project, acts in projects.items():
        for a in acts:
            if not a["milestone"] and a["name"] not in EXCLUDED and a["employee"]:
                jobs[(project, a["employee"])].add(job_of(a["name"]))
    return {
        "agents": [{"id": agent(p, e), "name": f"{e} ({p})", "qualifications": sorted(js)}
                   for (p, e), js in sorted(jobs.items())],
        "tools": [],
        "materials": [],
    }


def derive_selections(projects):
    """Each project's selection: the nodes whose activities or milestones its schedule contains, with
       their ancestors, the root always. No node has descriptors to bind."""
    def instance(project, names, node):
        name, sources, children = (node + ((),))[:3]
        kids = [k for k in (instance(project, names, c) for c in children) if k]
        if not kids and not set(sources) & names:
            return None
        return {"id": f"{project}-{slug(name)}", "node": slug(name), "values": {}, "children": kids}

    selections = {}
    for project, acts in projects.items():
        names = {a["name"] for a in acts}
        root = instance(project, names, SPECIFICATION)
        selections[project] = root or {"id": f"{project}-{slug(SPECIFICATION[0])}", "node": slug(SPECIFICATION[0]),
                                       "values": {}, "children": []}
    return selections


def derive_trace(projects):
    """One record per activity and metric: its actual duration in working hours and its actual cost, at
       its step, with its actual start and the employee assigned. An activity repeated in a project gives
       several records at one step."""
    trace = []
    for project, acts in projects.items():
        for a in acts:
            if a["milestone"] or a["name"] in EXCLUDED:
                continue
            base = {"project": project, "step": slug(a["name"]), "time": a["start"],
                    "agents": [agent(project, a["employee"])] if a["employee"] else None,
                    "tools": [], "materials": []}
            trace += [{**base, "metric": "duration", "value": round(a["hours"], 2)},
                      {**base, "metric": "cost", "value": round(a["cost"], 2)}]
    return trace


if __name__ == "__main__":
    derive()
