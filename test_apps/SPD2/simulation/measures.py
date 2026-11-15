"""Measures of the model over the projects the simulation has run, in the order run: how well its
   forecasts held against what was recorded, and how the pool of agents eligible for each job changed.
   Each project is judged against the forecasts offered when it ran, noted in the ledger (see run.note),
   not against forecasts made since, which would draw on later projects.

   calibration  the share of steps whose recorded value exceeded the forecast at r, against 1 - r, the
                share reading at r allows: more is optimistic, less cautious
   error        each step's error against the forecast's median, relative to what was recorded: the
                typical size of a miss, which should shrink as the trace grows and the fit learns
   eligible     each job's eligible agents, as last offered in each project, its selection then complete"""

import math

import business
from business.structure.derivation import derive
from simulation.run import ledger


def measures(dataset_id):
    """The measures, project by project, {projects: [...], summary: {...}}. Each project gives its id,
       order, r, steps judged, overruns and their share, the running share over the series so far, its
       typical error (the median of its steps' relative errors), its own value against its forecasts,
       and its eligible pools. Only projects delivered, with every step recorded, are judged."""
    M = business.load_model(dataset_id)
    rows, judged, over = [], 0, 0
    for i, entry in sorted(ledger(dataset_id).items(), key=lambda kv: kv[1]["order"]):
        if i not in M["selections"]:
            continue
        process = derive(M["selections"][i], M["mu"], M["G"])
        d = business.delivered(M, i)
        if len(d.recorded) != len(process.steps):
            continue                                     # still in progress
        overruns, errors, steps, missed = 0, [], 0, []
        for s in sorted(process.steps):
            for m, actual in d.recorded[s].items():
                forecast = entry["forecasts"].get(s, {}).get(m)
                if forecast is None or forecast["r"] is None:
                    continue
                steps += 1
                if actual > forecast["r"]:
                    overruns += 1
                    missed.append({"step": s, "metric": m, "actual": actual, "forecast": forecast["r"]})
                if forecast["median"] is not None and actual:
                    errors.append(abs(actual - forecast["median"]) / abs(actual))
        judged, over = judged + steps, over + overruns
        rows.append({
            "project": i, "order": entry["order"], "r": entry["r"], "steps": steps, "overruns": overruns,
            "over": missed,
            "share": overruns / steps if steps else None,
            "running": over / judged if judged else None,
            "error": sorted(errors)[len(errors) // 2] if errors else None,
            "value": {m: {"actual": y, **entry["value"].get(m, {})} for m, y in d.value.items()},
            "eligible": {j: len(agents) for j, agents in entry["eligible"].items()},
            "pools": entry["eligible"],
        })
    return {"projects": rows, "summary": summary(rows, judged, over)}


def summary(rows, judged, over):
    """The series in brief: the steps judged and how many overran, against the share r allows, with how
       far the difference can stretch by chance alone (two standard errors), the typical error over the
       first projects and the last, and each job's eligible pool at the start and the end."""
    if not rows:
        return None
    target = sum(1 - row["r"] for row in rows) / len(rows)
    share = over / judged if judged else None
    slack = 2 * math.sqrt(target * (1 - target) / judged) if judged else None
    verdict = None
    if share is not None:
        verdict = "optimistic" if share > target + slack else "cautious" if share < target - slack else "calibrated"
    k = max(1, min(5, len(rows) // 2))
    typical = lambda some: sorted(e for e in (row["error"] for row in some) if e is not None)
    middle = lambda xs: xs[len(xs) // 2] if xs else None
    jobs = sorted({j for row in rows for j in row["eligible"]})
    first = {j: next((row["eligible"][j] for row in rows if j in row["eligible"]), None) for j in jobs}
    last = {j: next((row["eligible"][j] for row in reversed(rows) if j in row["eligible"]), None) for j in jobs}
    return {"projects": len(rows), "steps": judged, "overruns": over, "share": share, "target": target,
            "slack": slack, "verdict": verdict, "window": k,
            "error_first": middle(typical(rows[:k])), "error_last": middle(typical(rows[-k:])),
            "pool_first": first, "pool_last": last}
