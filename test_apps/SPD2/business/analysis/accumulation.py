"""Accumulation: how a metric's forecast distributions combine across a project's process, as a total
   over a set of steps or at a step along the paths that reach it.

   Each distribution is a list of samples (see forecasting), and the samples are combined one run at a
   time, so the steps' values are taken as independent."""

from dataclasses import dataclass

from business.structure.derivation import ProjectProcess, reaches
from business.structure.process import OUTSIDE


@dataclass
class Operators:
    """The pair of operators by which a metric accumulates along paths, chosen for the purpose, each
       with an identity for where there is nothing to extend by or merge."""
    extend: object                               # the extending operator: a function (x, y)
    merge: object                                # the merging operator: a function (x, y)
    extend_identity: float
    merge_identity: float


# Finding the earliest each step can finish: time adds along a path and takes the maximum where paths
# converge, giving the length of the critical path at the last step
TIME = Operators(extend=lambda x, y: x + y, merge=max, extend_identity=0, merge_identity=0)


# --------------------------------------------------------------------------------------------------


def total(own, S):
    """X_m(S): the sum of the steps' own values over the set of steps S, own giving each step's
       samples; a step the metric is not measured at, absent from own, adds nothing."""
    runs = len(next(iter(own.values())))
    return [sum(own[s][k] for s in S if s in own) for k in range(runs)]


def ordering(project, order=None):
    """One ordering of all the project's steps consistent with its process. order, if given, is used,
       such as the steps executed in the order executed followed by the rest, and must hold each step
       once, after those it follows; otherwise a topological sort is taken, breaking ties by id."""
    if order is not None:
        return list(order)
    order, remaining = [], set(project.steps)
    while remaining:
        s = min(s for s in remaining if not any(v == s and u in remaining for u, v in project.precedence))
        order.append(s)
        remaining.remove(s)
    return order


def add_job_orders(project, G, order=None):
    """G_T-hat^J: the project's process with an order assumed between each job's steps, one agent
       performing them one at a time, drawn from one ordering of all the project's steps consistent
       with the process, so that no cycle forms."""
    order = ordering(project, order)
    orders = set()
    for j in G.jobs:
        steps = [s for s in order if G.steps[s].job == j]
        orders |= set(zip(steps, steps[1:]))
    return ProjectProcess(set(project.steps), project.precedence | orders)


def passed_on(u, v, project, G):
    """The products u passes on along the paths to v, either possibly OUTSIDE: each product e of u with
       e ~> v."""
    return [e for e in G.arcs if e.src == u and reaches(e, v, project.steps, G)]


def product_values(project, G, m, ops, value):
    """y_m(u, v) for each pair the products join, OUTSIDE included at either end: the merged value of the
       products u passes on along the paths to v. value(e) gives a product's value, or None where it
       has none for m, which counts as the identity of extend."""
    ends = [OUTSIDE, *sorted(project.steps)]
    y = {}
    for u in ends:
        for v in ends:
            if u is OUTSIDE and v is OUTSIDE:
                continue
            products = passed_on(u, v, project, G)
            if products:
                merged = ops.merge_identity
                for e in products:
                    ye = value(e)
                    merged = ops.merge(merged, ops.extend_identity if ye is None else ye)
                y[(u, v)] = merged
    return y


def arriving(v, ordered, here, products, ops):
    """The values arriving at step v, merged: those accumulated at the steps that supply it in ordered,
       pred(v), each extended by y_m(u, v), and any from outside the process, here giving each value
       accumulated so far, OUTSIDE's included. For time, when v can start."""
    supply = [u for u, w in ordered.precedence if w == v]    # pred(v)
    if (OUTSIDE, v) in products:
        supply.append(OUTSIDE)
    merged = ops.merge_identity
    for u in supply:
        merged = ops.merge(merged, ops.extend(here[u], products.get((u, v), ops.extend_identity)))
    return merged


def accumulate(ordered, own, products, ops, order=None):
    """X_m(v) at every step v, and the project's value X_m(OUTSIDE), for each sample.

       ordered is G_T-hat^J (see add_job_orders), own gives each step's samples of y_m(s), products
       gives y_m(u, v) (see product_values), where a pair without one, as between a job's steps in an
       assumed order, takes the identity of extend. A product from outside carries its value from the identity, and those
       leaving the process extend their sources' values into OUTSIDE, where the project's value
       accumulates."""
    order = ordering(ordered, order)
    runs = len(next(iter(own.values())))
    X = {v: [] for v in order}
    project_value = []
    for k in range(runs):
        here = {OUTSIDE: ops.extend_identity}
        for v in order:
            here[v] = ops.extend(arriving(v, ordered, here, products, ops), own[v][k])
            X[v].append(here[v])
        merged = ops.merge_identity
        for (u, w), y in products.items():
            if w is OUTSIDE:
                merged = ops.merge(merged, ops.extend(here[u], y))
        project_value.append(merged)
    return X, project_value
