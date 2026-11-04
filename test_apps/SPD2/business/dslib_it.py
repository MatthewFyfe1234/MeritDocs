"""Derives the DSLIB IT dataset's master model from its source workbooks.

Usage:
    python -m business.dslib_it        (re)derive data/dslib-it/ from data/dslib-it/source/
"""

import re
from collections import defaultdict

from business import DATA, write_model

DATASET_ID = "dslib-it"
DATASET = DATA / DATASET_ID / "source" / "Excel"

# Skillset of a step, matched in order against its name (or the name's activity-type prefix).
# Inferred: the dataset records no roles, only anonymous employees per project.
SKILLSETS = [
    ("PM", "Project management", ["project management", "validation and support"]),
    ("BA", "Business analysis", ["requirements", "analysis"]),
    ("DS", "Design", ["design"]),
    ("DV", "Development", ["development", "coding", "bug fixing", "technical assembly"]),
    ("TS", "Testing", ["test", "uat"]),
    ("OP", "Operations", ["deploy"]),
]

# What the client agrees to buy: (name, dataset activities/milestones it comes from, children).
# Level 2 is what the organisation hands over or has signed off; level 3 is one worker's
# output from one activity. Levels go no deeper than the schedules record activities.
SPECIFICATION = ("Delivered solution", ["project management", "validation and support",
                                         "deploy to production", "go live"], [
    ("Information system", ["development completed", "bug fixing", "development - bugfixing and support",
                            "technical assembly test", "test preparation", "test coordination",
                            "test execution", "test ict - regression testing", "uat support"], [
        ("Application code", ["coding"]),
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

# What each milestone produces, named as a thing, for the process's product edges
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

# Idealised order of the steps in each job (lane), as if all of them were in one project.
# Precedence runs from each step to the next; a project without a step passes precedence on
# to the next one. Reasoned, not read off the schedules' dates; an edge is marked "data"
# where a schedule links the pair explicitly.
JOB_ORDER = [
    ["project management", "validation and support"],
    ["requirements", "business analysis", "analysis - conceptual design"],
    ["technical design", "design - integration (mapping)", "user interface design", "design - isp design"],
    ["coding", "technical assembly test", "bug fixing", "development - bugfixing and support"],
    ["test preparation", "test coordination", "test execution", "test ict - regression testing", "uat support"],
    ["deploy to production"],
]

# Not delivery steps: post go-live support is aftercare, to be recorded as issues (metrics)
# against the steps it follows, not modelled as a step
EXCLUDED = {"post implementation - post go live support"}

PHASES = ["supporting tasks", "requirements", "analysis", "design", "development",
          "ict test", "uat", "implementation", "post implementation"]

ACRONYMS = {"isp", "ict", "uat"}


def norm(name):
    name = " ".join(str(name).lower().split())
    return "ict test" if name == "test ict" else name


def slug(name):
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def pretty(name):
    name = " ".join(w.upper() if w in ACRONYMS else w for w in name.split(" "))
    return name[:1].upper() + name[1:]


def skillset_of(name):
    key = name.split(" - ")[0]
    for sid, _, words in SKILLSETS:
        if any(w in key for w in words):
            return sid
    raise ValueError(f"no skillset for {name!r}")


def read_project(path):
    """Leaf activities of one project: name, phase, milestone flag, start (as a fraction of
    the project), preds, resources."""
    import openpyxl
    sheet = openpyxl.load_workbook(path, data_only=True, read_only=True)["Baseline Schedule"]
    rows = [r for r in sheet.iter_rows(min_row=3, values_only=True) if r[0] is not None]
    by_id = {str(r[0]): r for r in rows}
    phases = {str(r[2]): norm(r[1]) for r in rows if str(r[2]).count(".") == 1}
    whole = next(r for r in rows if str(r[2]) == "1")
    span = (whole[6] - whole[5]).total_seconds()
    acts = []
    for r in rows:
        wbs = str(r[2])
        if wbs.count(".") < 2:
            continue
        preds = [norm(by_id[m.group()][1]) for m in re.finditer(r"\d+", str(r[3] or ""))]
        acts.append({
            "name": norm(r[1]),
            "phase": phases[wbs.rsplit(".", 1)[0]],
            "milestone": r[7] in (0, "0"),
            "start": (r[5] - whole[5]).total_seconds() / span,
            "preds": preds,
            "resources": [s.strip() for s in str(r[8] or "").split(";") if s.strip()],
        })
    return acts


def derive():
    nodes = {}                                   # name -> merged node
    flows = defaultdict(set)                     # (u, v) -> projects
    people = defaultdict(set)                    # skillset -> (project, employee)

    for path in sorted(DATASET.glob("*.xlsx")):
        project = path.stem.split(" ")[0]
        for a in read_project(path):
            if a["name"] in EXCLUDED:
                continue
            n = nodes.setdefault(a["name"], {"phases": set(), "milestone": True, "projects": set(),
                                             "starts": defaultdict(list)})
            n["phases"].add(a["phase"])
            n["starts"][project].append(a["start"])
            n["milestone"] &= a["milestone"]
            n["projects"].add(project)
            for u in a["preds"]:
                flows[(u, a["name"])].add(project)
            for e in a["resources"]:
                people[skillset_of(a["name"])].add((project, e))

    agents = {
        "note": "Skillsets are inferred from activity names; the dataset records no roles. "
                "Employee letters are per project, so 21-D and 22-D need not be the same person.",
        "skillsets": [{
            "id": sid,
            "name": name,
            "inferred": True,
            "people": [{"id": f"{p[-2:]}-{e[-1]}", "name": e, "project": p} for p, e in sorted(people[sid])],
        } for sid, name, _ in SKILLSETS],
    }

    write_model(DATASET_ID,
                agents=agents,
                inventory={"materials": [], "tools": []},
                master_specification=derive_specification(nodes),
                master_process=derive_process(nodes, flows))


def derive_process(nodes, flows):
    """Steps in skillset lanes, precedence within a job, products between jobs.

    A job is taken to be a lane (an approximation: skillsets are inferred). Precedence within
    a lane is the chain in JOB_ORDER; the links the schedules record within a lane,
    direct or through a milestone, are kept as `observed` evidence. A link crossing lanes is a
    product: through a milestone it is named after it; a direct one is a product the data leaves
    unnamed. A product with no recipient is a terminal output. Links between milestones are
    kept in `into`. A milestone with no producing step is kept, with `from` empty.
    Columns: each step after its predecessors, then by phase, then by mean start (averaged
    per project first); each lane holds one step per column.
    """
    step_names = [n for n, v in nodes.items() if not v["milestone"]]
    milestones = [n for n, v in nodes.items() if v["milestone"]]
    lane = {n: skillset_of(n) for n in step_names}
    made = {m: sorted(u for (u, v) in flows if v == m and u in step_names) for m in milestones}
    used = {m: sorted(v for (u, v) in flows if u == m and v in step_names) for m in milestones}
    into = {m: sorted(v for (u, v) in flows if u == m and v in milestones) for m in milestones}

    preds = defaultdict(set)                     # step -> steps it waits on
    observed, products = [], []
    for (u, v), ps in sorted(flows.items()):
        if u in step_names and v in step_names:
            if lane[u] == lane[v]:
                observed.append({"from": slug(u), "to": slug(v), "projects": sorted(ps)})
            else:
                preds[v].add(u)
                products.append({"id": f"{slug(u)}--{slug(v)}", "name": None, "milestone": None,
                                 "projects": sorted(ps), "from": [slug(u)], "to": [slug(v)], "into": []})

    for m in sorted(milestones):
        crossing = []
        for v in used[m]:
            same = [u for u in made[m] if lane[u] == lane[v]]
            for u in same:
                observed.append({"from": slug(u), "to": slug(v), "via": pretty(m),
                                 "projects": sorted(nodes[m]["projects"])})
            if len(same) < len(made[m]):
                crossing.append(v)
                preds[v].update(u for u in made[m] if lane[u] != lane[v])
        products.append({
            "id": slug(m),
            "name": PRODUCTS[m],
            "milestone": pretty(m),
            "projects": sorted(nodes[m]["projects"]),
            "from": [slug(u) for u in made[m]],
            "to": [slug(v) for v in crossing],
            "into": [slug(v) for v in into[m]],
        })

    ordered = [n for job in JOB_ORDER for n in job]
    if sorted(ordered) != sorted(step_names) or any(len({lane.get(n) for n in job}) != 1 for job in JOB_ORDER):
        raise ValueError("JOB_ORDER must list every step once, one lane per job")
    linked = {(o["from"], o["to"]) for o in observed}
    precedence = []
    for job in JOB_ORDER:
        for u, v in zip(job, job[1:]):
            preds[v].add(u)
            precedence.append({"from": slug(u), "to": slug(v),
                               "basis": "data" if (slug(u), slug(v)) in linked else "reasoning"})

    phase = {n:min(PHASES.index(p) for p in nodes[n]["phases"]) for n in step_names}
    start = {n: sum(sum(s) / len(s) for s in nodes[n]["starts"].values()) / len(nodes[n]["starts"])
             for n in step_names}

    # Place a step once its predecessors are placed, earliest phase and mean start first.
    # Supporting tasks (phase 0) run alongside; every other phase starts after the last.
    column, next_free, floor = {}, defaultdict(int), 0

    def place(n, first):
        column[n] = max([next_free[lane[n]], first] + [column[u] + 1 for u in preds[n] if u in column])
        next_free[lane[n]] = column[n] + 1

    todo = sorted(step_names, key=lambda n: (phase[n], start[n], n))
    while todo:
        n = next((n for n in todo if not (preds[n] & set(todo))), todo[0])
        todo.remove(n)
        if phase[n] > 0 and not any(phase[c] == phase[n] for c in column):
            floor = max((column[c] + 1 for c in column if phase[c] > 0), default=0)
        place(n, floor if phase[n] > 0 else 0)

    steps = [{
        "id": slug(n),
        "name": pretty(n),
        "label": pretty(n.split(" - ", 1)[-1]),
        "skillset": lane[n],
        "phase": PHASES[phase[n]],
        "column": column[n],
        "projects": sorted(nodes[n]["projects"]),
    } for n in step_names]
    steps.sort(key=lambda s: s["column"])

    return {
        "skillsets": [{"id": sid, "name": name, "inferred": True} for sid, name, _ in SKILLSETS],
        "steps": steps,
        "precedence": precedence,
        "observed": observed,
        "products": products,
    }


def derive_specification(nodes):
    """The master spec: what the client agrees to buy and receives.

    Each node names the dataset activities and milestones it comes from. Its steps (the
    mapping to the process) are the activities among them, and its projects are those
    whose schedules contain any of them. No node has descriptors yet: the dataset
    records none.
    """
    def build(name, sources, children=()):
        missing = [s for s in sources if s not in nodes]
        if missing:
            raise ValueError(f"{name}: not in dataset: {missing}")
        kids = [build(*c) for c in children]
        projects = set().union(*(nodes[s]["projects"] for s in sources), *(set(k["projects"]) for k in kids))
        return {
            "id": slug(name),
            "name": name,
            "steps": [slug(s) for s in sources if not nodes[s]["milestone"]],
            "projects": sorted(projects),
            "descriptors": [],
            "children": kids,
        }

    return build(*SPECIFICATION)


if __name__ == "__main__":
    derive()
