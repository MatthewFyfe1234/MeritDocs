"""The forecasting test of the paper's evaluation, over the projects a dataset records: each is held out in
   turn and forecast from the others, and its delivered value compared with two forecasts at r.

   model      the project's value as the model forecasts it: each step forecast from the others' records
              at that step, then accumulated along the derived process (business.offer)
   baseline   the project's value forecast at the level of the whole project, from the others' delivered
              values, on the same information: its selection's descriptor values and nodes, categorical
              descriptors separating the projects and the rest scaling them, as a step's forecast does

   For each, at each r, the share of projects whose delivered value exceeds the forecast, against the
   nominal 1 - r, and each project's error, its delivered value's difference from the forecast as a share
   of the forecast. The records are not ordered in time (MIMIC's dates are shifted per patient), so the
   others stand for the past."""

import math
import random

import business
from business.analysis.forecasting import SAMPLES, independent, least_squares, percentile
from business.structure.derivation import derive

RS = (0.5, 0.8, 0.9)


def evaluation(dataset_id, rs=RS):
    """{rs, metric, projects: [{project, actual, model: {r: value}, baseline: {r: value}}], summary:
       {r: {nominal, slack, model: share over, baseline: share over}}, typical: {model, baseline}}, the
       typical error being the median of the projects' absolute errors against their r = 0.5 forecasts.
       Only projects with every step recorded are tested."""
    M = business.load_model(dataset_id)
    done = {}
    for i in sorted(M["selections"]):
        d = business.delivered(M, i)
        if d.recorded and len(d.recorded) == len(derive(M["selections"][i], M["mu"], M["G"]).steps) and d.value:
            done[i] = d.value
    if not done:
        return {"rs": list(rs), "metric": None, "projects": [], "summary": {}, "typical": {}}
    metric = sorted(next(iter(done.values())))[0]
    kinds = {(x.id, d.name): d.kind for x in M["T"].nodes.values() for d in x.descriptors}
    inputs = {i: whole(M["selections"][i]) for i in done}

    projects = []
    for i, value in done.items():
        others = [(inputs[p], done[p][metric]) for p in done if p != i and metric in done[p]]
        samples = baseline(inputs[i], others, kinds)
        projects.append({
            "project": i, "actual": value[metric],
            "model": {r: business.offer(M, M["selections"], i, r).value.get(metric) for r in rs},
            "baseline": {r: None if samples is None else percentile(samples, r) for r in rs},
        })

    def over(kind, r):
        judged = [p for p in projects if p[kind][r] is not None]
        return sum(p["actual"] > p[kind][r] for p in judged) / len(judged) if judged else None

    def typical(kind):
        errors = sorted(abs(error(p["actual"], p[kind][0.5])) for p in projects
                        if p[kind].get(0.5) not in (None, 0))
        return errors[len(errors) // 2] if errors else None

    n = len(projects)
    return {
        "rs": list(rs), "metric": metric, "projects": projects,
        "summary": {r: {"nominal": 1 - r, "slack": 2 * math.sqrt(r * (1 - r) / n),
                        "model": over("model", r), "baseline": over("baseline", r)} for r in rs},
        "typical": {"model": typical("model"), "baseline": typical("baseline")} if 0.5 in rs else {},
    }


def error(actual, forecast):
    """The delivered value's difference from the forecast, as a share of the forecast."""
    return (actual - forecast) / forecast


def whole(selection):
    """A project's information as a whole: its descriptor values, {(node, name): [values]}, and the number
       of instances of each node it selects."""
    D, n = {}, {}
    for x in selection.instances.values():
        n[x.node] = n.get(x.node, 0) + 1
        for name, v in x.values.items():
            D.setdefault((x.node, name), []).append(v)
    return D, n


def baseline(info, others, kinds, samples=SAMPLES, seed=0):
    """Samples of a project's value from the other projects' values, as a step's distribution is formed
       (see forecasting.distribution): the projects matching it in its categorical values and in which
       descriptors and nodes it has, its numerical values and node counts scaling the value by least
       squares, the spread the fit's residuals resampled; the matching values resampled where they are
       too few to fit. None where no project matches."""
    def describe(D, n):
        group = tuple((d, tuple(sorted(map(str, D[d])))) for d in sorted(D) if kinds[d] == "categorical")
        numerical = [d for d in sorted(D) if kinds[d] == "numerical"]
        counted = sorted(n)
        return (group, tuple(numerical), tuple(counted)), [sum(D[d]) for d in numerical] + [n[x] for x in counted]

    key, x = describe(*info)
    matching = [(px, y) for D, y in others for pkey, px in [describe(*D)] if pkey == key]
    if not matching:
        return None
    rng = random.Random(seed)
    kept = independent([px for px, _ in matching])
    pick = lambda v: [1] + [v[k] for k in kept]
    b = least_squares([pick(px) for px, _ in matching], [y for _, y in matching])
    if b is None:
        return [rng.choice([y for _, y in matching]) for _ in range(samples)]
    fitted = lambda v: sum(bk * vk for bk, vk in zip(b, pick(v)))
    residuals = [y - fitted(px) for px, y in matching]
    return [fitted(x) + rng.choice(residuals) for _ in range(samples)]
