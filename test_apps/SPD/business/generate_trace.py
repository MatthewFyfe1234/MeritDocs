"""Generate trace data for the SPD model.

The trace is a set of attributed records

    tau = { (P, s, D, a, M) }

each tying the metrics M recorded at a master step s, under the descriptor
values D that held, to the agent a that executed it and the project P it arose
from, with tools and materials recorded alongside. Keying on the master step
lets history accumulate across projects.

Reads master_specification.json (descriptor definitions D, via inverse mu),
master_process.json (steps, J -> req, mu) and agents.json (qualifications Q),
all from this script's own directory, and writes trace.json next to them.

Run:  python generate_trace.py
"""

import json
import math
import random
from pathlib import Path

HERE = Path(__file__).resolve().parent
DATA = HERE.parent / "data"
OUTPUT = HERE.parent / "outputs"

NUM_PROJECTS = 40
SEED = 20261009

# --- how to sample descriptor values when the spec gives only name + type -----
# Numerical descriptors: (low, high) sampling range in the descriptor's unit.
NUMERICAL_RANGE = {
    "length": (100.0, 2000.0),   # mm
    "width": (100.0, 1200.0),    # mm
    "count": (1, 60),            # unitless, integer
}
# Categorical descriptors without explicit levels in the spec draw from here.
CATEGORICAL_POOL = {
    "colour": ["natural", "black", "white", "grey", "blue"],
}

# --- metric model: metrics scale with the numerical descriptor values ---------
# A "typical" value per numerical descriptor normalises its contribution, and
# COEF is the hours that descriptor adds to a step at its typical value.
TYPICAL = {"length": 1000.0, "width": 500.0, "count": 20.0}
COEF = {"length": 4.0, "width": 2.0, "count": 3.0}
STEP_BASE_HOURS = {"p1": 6, "p2": 3, "q1": 8, "q2": 5, "r1": 4, "r2": 7}

TOOL_POOL = ["saw", "drill", "jig", "press", "gauge", "hoist"]
MATERIAL_POOL = ["timber", "steel", "fixings", "sealant", "coating", "board"]


def load(name, base=DATA):
    with open(base / name, encoding="utf-8") as fh:
        return json.load(fh)


def agent_speed(agent_id):
    """Stable per-agent speed factor in ~[0.8, 1.2]; lower is faster."""
    h = (hash(agent_id) % 1000) / 1000.0
    return 0.8 + 0.4 * h


def sample_descriptors(rng, descriptor_defs):
    """Draw a value for each descriptor definition on a spec node."""
    values = {}
    for d in descriptor_defs:
        name, dtype = d["name"], d["type"]
        if dtype == "numerical":
            low, high = NUMERICAL_RANGE.get(name, (1.0, 100.0))
            if name == "count":
                values[name] = rng.randint(int(low), int(high))
            else:
                values[name] = round(rng.uniform(low, high), 1)
        else:  # categorical
            levels = d.get("levels") or CATEGORICAL_POOL.get(name, ["x", "y", "z"])
            values[name] = rng.choice(levels)
    return values


def compute_metrics(rng, step, descriptor_values, agent_id):
    """Directly observed metrics M that scale with the numerical descriptors.

    Only primitives are recorded here (duration, defects); derived figures such
    as cost are computed downstream from these plus rates, not tracked.
    """
    base = STEP_BASE_HOURS.get(step, 5)
    scaled = base
    for name, value in descriptor_values.items():
        if name in COEF:
            scaled += COEF[name] * (float(value) / TYPICAL[name])

    speed = agent_speed(agent_id)
    noise = math.exp(rng.gauss(0.0, 0.12))  # lognormal, ~+/-12%
    duration_h = round(scaled * speed * noise, 2)

    # defects: small count, fewer for faster/more skilled (lower speed) agents
    defect_rate = 0.8 * speed
    defects = sum(1 for _ in range(6) if rng.random() < defect_rate / 6.0)

    return {"duration_h": duration_h, "defects": defects}


def main():
    rng = random.Random(SEED)

    spec = load("master_specification.json")
    process = load("master_process.json")
    agents_doc = load("agents.json")

    # descriptor definitions per spec node
    descriptor_defs = {n["id"]: n.get("D", []) for n in spec["N"]}
    node_status = {n["id"]: n.get("status", "active") for n in spec["N"]}

    # inverse mu: step -> spec node that necessitates it
    step_of_node = process["mu"]
    node_of_step = {s: node for node, steps in step_of_node.items() for s in steps}

    # req(s) = J(s): the skillset a step requires (its lane)
    req = process["J"]

    # Elig(s) = agents whose qualifications Q include req(s)
    agents = agents_doc["agents"]
    eligible = {
        s: [a["id"] for a in agents if req[s] in a["Q"]] for s in req
    }

    trace = []
    for i in range(1, NUM_PROJECTS + 1):
        project = f"PRJ-{i:03d}"

        # which spec nodes this project instantiates (optional ones sometimes)
        active_nodes = [
            node
            for node in step_of_node
            if step_of_node[node]
            and (node_status.get(node) != "optional" or rng.random() < 0.5)
        ]

        for node in active_nodes:
            # descriptor values are fixed per node on an instance; its steps share them
            D = sample_descriptors(rng, descriptor_defs[node])
            for step in step_of_node[node]:
                candidates = eligible.get(step, [])
                if not candidates:
                    continue
                agent_id = rng.choice(candidates)
                M = compute_metrics(rng, step, D, agent_id)
                trace.append(
                    {
                        "P": project,
                        "s": step,
                        "D": D,
                        "a": agent_id,
                        "M": M,
                        "tools": rng.sample(TOOL_POOL, rng.randint(1, 2)),
                        "materials": rng.sample(MATERIAL_POOL, rng.randint(1, 2)),
                    }
                )

    out = {
        "kind": "trace",
        "specification": "master_specification.json",
        "process": "master_process.json",
        "agents": "agents.json",
        "note": "tau = { (P, s, D, a, M) }, keyed on master step s so history accumulates across projects.",
        "records": trace,
    }
    OUTPUT.mkdir(exist_ok=True)
    with open(OUTPUT / "trace.json", "w", encoding="utf-8") as fh:
        json.dump(out, fh, indent=2)

    print(f"Wrote {len(trace)} trace records across {NUM_PROJECTS} projects to trace.json")


if __name__ == "__main__":
    main()
