"""Derive a project from the SPD master model.

A project is a subset of spec nodes with their descriptors bound to values:

    P  subset of N        (chosen here at random, for a start)
    N_P = union of mu(x) for x in P        the steps those nodes necessitate
    G_P = G[N_P]                           the induced process subgraph

The spec can be extended during execution by drawing further subsets the same
way (call derive() again with more nodes and union the result).

Reads master_specification.json, master_process.json and agents.json from this
script's own directory; reuses the descriptor sampling from generate_trace.py so
the value ranges stay in one place. Prints a summary and writes derived_project.json.

Run:  python derive_project.py [seed]
"""

import json
import random
import sys
from pathlib import Path

from generate_trace import sample_descriptors

HERE = Path(__file__).resolve().parent
DATA = HERE.parent / "data"
OUTPUT = HERE.parent / "outputs"


def load(name, base=DATA):
    with open(base / name, encoding="utf-8") as fh:
        return json.load(fh)


def pick_subset(rng, nodes, step_nodes, parent, p_include=0.5):
    """A random subset P of the spec nodes that necessitates at least one step
    and is closed under the tree (a selected branch pulls in its ancestors)."""
    chosen = {n for n in nodes if rng.random() < p_include}
    if not chosen & set(step_nodes):          # guarantee at least one process node
        chosen.add(rng.choice(step_nodes))
    for x in list(chosen):                    # tree closure up to the root
        p = parent.get(x)
        while p:
            chosen.add(p)
            p = parent.get(p)
    return [n for n in nodes if n in chosen]


def derive(rng, spec, process, agents):
    descriptor_defs = {n["id"]: n.get("D", []) for n in spec["N"]}
    all_nodes = [n["id"] for n in spec["N"]]

    mu = process["mu"]                       # spec node -> steps necessitated
    req = process["J"]                       # req(s) = J(s), the step's skillset
    steps_index = {s["id"]: s for s in process["G"]["Ns"]}
    arcs = process["G"]["Asp"]

    # P: random subset of the spec nodes, with descriptors bound to values
    step_nodes = [n for n in all_nodes if mu.get(n)]
    parent = {e["child"]: e["parent"] for e in spec["A"]}
    P = pick_subset(rng, all_nodes, step_nodes, parent)
    bindings = {x: sample_descriptors(rng, descriptor_defs[x]) for x in P}

    # N_P = union of mu(x) for x in P
    N_P = sorted({s for x in P for s in mu.get(x, [])})

    # G_P = G[N_P]: steps in N_P and the arcs with both endpoints in N_P
    node_set = set(N_P)
    induced_steps = [steps_index[s] for s in N_P]
    induced_arcs = [e for e in arcs if e["u"] in node_set and e["v"] in node_set]

    # Elig(s) for each derived step: agents whose Q includes req(s)
    eligibility = {
        s: [a["id"] for a in agents["agents"] if req[s] in a["Q"]] for s in N_P
    }

    return {
        "kind": "derived_project",
        "P": sorted(P),
        "bindings": bindings,
        "N_P": N_P,
        "G_P": {"Ns": induced_steps, "Asp": induced_arcs},
        "eligibility": eligibility,
    }


def main():
    seed = int(sys.argv[1]) if len(sys.argv) > 1 else random.randrange(1_000_000)
    rng = random.Random(seed)

    spec = load("master_specification.json")
    process = load("master_process.json")
    agents = load("agents.json")

    project = derive(rng, spec, process, agents)
    project["seed"] = seed

    OUTPUT.mkdir(exist_ok=True)
    with open(OUTPUT / "derived_project.json", "w", encoding="utf-8") as fh:
        json.dump(project, fh, indent=2)

    print(f"seed {seed}")
    print(f"P (spec nodes): {', '.join(project['P'])}")
    for node, vals in project["bindings"].items():
        print(f"  {node}: {vals}")
    print(f"N_P (steps):    {', '.join(project['N_P']) or '(none)'}")
    print(f"G_P arcs:       {[e['u'] + '->' + e['v'] for e in project['G_P']['Asp']]}")
    print("eligible agents per step:")
    for step, elig in project["eligibility"].items():
        print(f"  {step}: {', '.join(elig)}")
    print("wrote derived_project.json")


if __name__ == "__main__":
    main()
