"""Forecast, selection and contracts for a derived SPD project.

Builds on a derived project (process derivation stays isolated in
derive_project.py, imported here) and the accumulated trace:

  forecast(s, D)  a predicted distribution for a step's metrics, fitted over the
                  trace records that match the step and lie near D. Categorical
                  descriptors must match; numericals are matched by nearest
                  neighbours, so the scaling theta is carried by the local fit.

  selection       eligible agents ranked by a trace-derived stimulus: the
                  forecast on the work plus each agent's recorded performance on
                  comparable work, n_a(s) over sub(s). Steps are not decomposed
                  yet, so sub(s) = {s}. Surfaced to inform, not to assign.

  contract C(j)   per job (skillset) within the derived subgraph: inputs in(j)
                  drawn from outside the job, outputs out(j) supplied, and the
                  forecast phi(j) over its steps.

Run:  python forecast_select.py [seed]
"""

import json
import math
import statistics
import sys
import random
from pathlib import Path

from derive_project import load, derive, OUTPUT
from generate_trace import TYPICAL

HERE = Path(__file__).resolve().parent

K_NEAREST = 8


def numerical_distance(d_a, d_b):
    """Normalised distance over the numerical descriptors shared by two bindings."""
    total = 0.0
    for name, value in d_a.items():
        if name in d_b and isinstance(value, (int, float)) and not isinstance(value, bool):
            scale = TYPICAL.get(name, 1.0)
            total += ((float(value) - float(d_b[name])) / scale) ** 2
    return math.sqrt(total)


def categoricals_match(d_query, d_record):
    """Every categorical in the query must equal the record's value."""
    for name, value in d_query.items():
        if isinstance(value, str) and d_record.get(name) != value:
            return False
    return True


def forecast(step, D, records):
    """Predicted metric distribution for `step` under descriptor values `D`."""
    at_step = [r for r in records if r["s"] == step]
    matched = [r for r in at_step if categoricals_match(D, r["D"])]
    pool = matched or at_step  # fall back to all records at the step
    if not pool:
        return {"n": 0, "metrics": {}}

    pool = sorted(pool, key=lambda r: numerical_distance(D, r["D"]))[:K_NEAREST]

    metric_names = set()
    for r in pool:
        metric_names.update(r["M"].keys())

    dist = {}
    for m in sorted(metric_names):
        values = [r["M"][m] for r in pool if m in r["M"]]
        dist[m] = {
            "mean": round(statistics.fmean(values), 2),
            "sd": round(statistics.pstdev(values), 2) if len(values) > 1 else 0.0,
        }
    return {"n": len(pool), "metrics": dist}


def sub(step):
    """Finer steps a step decomposes into. No decomposition yet, so just itself."""
    return {step}


def n_a(agent_id, step, records):
    """Agent's record count at the step or the finer steps it decomposes into."""
    fine = sub(step)
    return sum(1 for r in records if r["a"] == agent_id and r["s"] in fine)


def build(rng, spec, process, agents, trace):
    project = derive(rng, spec, process, agents)
    records = trace["records"]
    req = process["J"]

    # descriptor values per derived step come from the node that necessitated it
    mu = process["mu"]
    node_of_step = {s: node for node, steps in mu.items() for s in steps}
    D_of_step = {s: project["bindings"][node_of_step[s]] for s in project["N_P"]}

    # forecast each derived step under its bound descriptors
    forecasts = {s: forecast(s, D_of_step[s], records) for s in project["N_P"]}

    # selection stimulus: eligible agents ranked by n_a, with the forecast attached
    selection = {}
    for step, elig in project["eligibility"].items():
        ranked = sorted(
            ({"a": a, "n_a": n_a(a, step, records)} for a in elig),
            key=lambda e: e["n_a"],
            reverse=True,
        )
        selection[step] = {"forecast": forecasts[step], "agents": ranked}

    # contracts: one per job (skillset) present in the derived subgraph
    induced_arcs = project["G_P"]["Asp"]
    jobs = sorted({req[s] for s in project["N_P"]})
    contracts = []
    for j in jobs:
        job_steps = [s for s in project["N_P"] if req[s] == j]
        job_set = set(job_steps)
        in_products = [
            {"product": e["product"], "from": e["u"], "to": e["v"]}
            for e in induced_arcs
            if e["v"] in job_set and e["u"] not in job_set
        ]
        out_products = [
            {"product": e["product"], "from": e["u"], "to": e["v"]}
            for e in induced_arcs
            if e["u"] in job_set and e["v"] not in job_set
        ]
        contracts.append(
            {
                "job": j,
                "steps": job_steps,
                "in": in_products,
                "out": out_products,
                "phi": {s: forecasts[s] for s in job_steps},
            }
        )

    return {
        "kind": "forecast_selection",
        "P": project["P"],
        "bindings": project["bindings"],
        "N_P": project["N_P"],
        "forecasts": forecasts,
        "selection": selection,
        "contracts": contracts,
    }


def main():
    seed = int(sys.argv[1]) if len(sys.argv) > 1 else random.randrange(1_000_000)
    rng = random.Random(seed)

    spec = load("master_specification.json")
    process = load("master_process.json")
    agents = load("agents.json")
    trace = load("trace.json", OUTPUT)

    result = build(rng, spec, process, agents, trace)
    result["seed"] = seed

    OUTPUT.mkdir(exist_ok=True)
    with open(OUTPUT / "forecast_selection.json", "w", encoding="utf-8") as fh:
        json.dump(result, fh, indent=2)

    print(f"seed {seed}")
    print(f"P: {', '.join(result['P'])}   steps: {', '.join(result['N_P'])}")
    print("forecasts (duration_h):")
    for s, fc in result["forecasts"].items():
        d = fc["metrics"].get("duration_h", {})
        print(f"  {s}: mean {d.get('mean')} sd {d.get('sd')} (n={fc['n']})")
    print("selection (top eligible agent by experience):")
    for s, sel in result["selection"].items():
        top = sel["agents"][0] if sel["agents"] else None
        print(f"  {s}: {top['a']} (n_a={top['n_a']})" if top else f"  {s}: none")
    print("contracts:")
    for c in result["contracts"]:
        ins = [p["product"] for p in c["in"]]
        outs = [p["product"] for p in c["out"]]
        print(f"  {c['job']}: steps {c['steps']} in {ins} out {outs}")
    print("wrote forecast_selection.json")


if __name__ == "__main__":
    main()
