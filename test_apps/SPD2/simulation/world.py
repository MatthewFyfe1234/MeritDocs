"""The world's hidden rule: what actually happens when a step executes. The model never sees it; its
   forecasts learn it from the trace. Each dataset that can be simulated states its rule in world.json."""

import json
import random
from dataclasses import dataclass, field

from business import dataset_dir


@dataclass
class Rule:
    """How one metric's value comes about at one step: base + the sum of slope x descriptor value +
       noise."""
    base: float
    slopes: dict = field(default_factory=dict)   # {(node id, descriptor name): slope}
    noise: float = 0.0                           # the noise's standard deviation (normal)


@dataclass
class World:
    """A dataset's hidden rule, for each step and metric, and the seed its noise is drawn from."""
    rules: dict                                  # {(step, metric): Rule}
    seed: int


# --------------------------------------------------------------------------------------------------


def load_world(dataset_id):
    """The world.json of a dataset, each slope on a descriptor named with its node, "x.d"."""
    data = json.loads((dataset_dir(dataset_id) / "world.json").read_text(encoding="utf-8"))
    slopes = lambda r: {tuple(k.split(".")): v for k, v in r.get("slopes", {}).items()}
    rules = {(s, m): Rule(r["base"], slopes(r), r.get("noise", 0.0))
             for s, metrics in data["steps"].items() for m, r in metrics.items()}
    return World(rules, data.get("seed", 0))


def outcome(rule, D, rng):
    """The value a step's execution yields for one metric, given the descriptor values it serves, D(s, i)
       as {(node id, name): list of values}. Values bound on several instances add, two panels taking
       longer than one."""
    scaled = sum(slope * sum(D.get(d, [])) for d, slope in rule.slopes.items())
    return rule.base + scaled + rng.gauss(0, rule.noise)


def generator(world):
    """The random numbers a run draws from, seeded so runs are reproducible."""
    return random.Random(world.seed)


INCLUDE = 0.6                                    # the chance each node below the root joins a selection


def random_selection(T, selections, project, rng):
    """A selection the world draws for a new project, in the nested JSON form: the root always, each
       node below it with chance INCLUDE where its parent is in, and each descriptor bound to a value.
       A numerical one is drawn within its range, or else within the values past projects bound it to,
       or else from 1 to 10, whole where its bounds are; a categorical one from the values past projects
       bound it to, leaving the node out where there are none."""
    past = {}
    for S in selections.values():
        for x in S.instances.values():
            for name, value in x.values.items():
                past.setdefault((x.node, name), []).append(value)
    children = {}
    for parent, child in sorted(T.relations):
        children.setdefault(parent, []).append(child)

    def value(x, d):
        seen = past.get((x, d.name), [])
        if d.kind == "categorical":
            return rng.choice(sorted(set(seen), key=str)) if seen else None
        low, high = d.range or ([min(seen), max(seen)] if seen else [1, 10])
        whole = all(isinstance(v, int) for v in (low, high))
        return rng.randint(low, high) if whole else round(rng.uniform(low, high), 2)

    def draw(x):
        values = {d.name: value(x, d) for d in T.nodes[x].descriptors}
        if any(v is None for v in values.values()):
            return None
        kids = [draw(c) for c in children.get(x, []) if rng.random() < INCLUDE]
        return {"id": f"{project}-{x}", "node": x, "values": values, "children": [k for k in kids if k]}

    return draw(T.root)
