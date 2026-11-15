"""Forecasts of a metric at a step or on a product, from the descriptors and the trace.

   A distribution is a list of samples, so forecasts and their accumulation run as a Monte Carlo
   simulation, each sample one run of the project."""

import random

from business.structure.derivation import served
from business.structure.process import OUTSIDE, evaluate

SAMPLES = 10000                                  # samples drawn for each distribution


def descriptor_values(s, i, selections, mu):
    """D(s, i): the values bound on the node instances step s serves in project i and on their
       ancestors, {(node id, descriptor name): list of values}, a value for each instance of the node.
       Each descriptor is its node's own, so nodes' descriptors sharing a name stay apart."""
    D = {}
    for x in sorted(served(s, selections[i], mu), key=lambda x: x.id):
        for name, value in x.values.items():
            D.setdefault((x.node, name), []).append(value)
    return D


def numbers(s, i, selections, mu):
    """The number of instances of each node step s serves in project i, {node id: number}, ancestors
       included."""
    n = {}
    for x in served(s, selections[i], mu):
        n[x.node] = n.get(x.node, 0) + 1
    return n


def recorded_value(trace, s, i, m, context=None):
    """y_m(s, i): step s's records for metric m in project i combined, here summed, keeping only those
       that match the context; None where there are none. context(record) says whether a record
       matches c, and None is the empty context."""
    ys = [r.value for r in trace
          if r.project == i and r.step == s and r.metric == m and (context is None or context(r))]
    return sum(ys) if ys else None


DEPENDS = ""                                     # the node id under which a metric depended on joins D


def points(trace, s, m, i, selections, mu, context=None, depends=None):
    """R: a point for each past project i' in I_c(s, m), those other than i with records of metric m at
       step s matching the context, each as (D(s, i'), the number of each node's instances, y_m(s, i')).
       Where m depends on another metric, that metric's value at the step joins D, under (DEPENDS, its
       name), and a project that has none is left out."""
    past = {r.project for r in trace
            if r.project != i and r.step == s and r.metric == m and (context is None or context(r))}
    result = []
    for p in sorted(past):
        D = descriptor_values(s, p, selections, mu)
        if depends is not None:
            v = recorded_value(trace, s, p, depends, context)
            if v is None:
                continue
            D = {**D, (DEPENDS, depends): [v]}
        result.append((D, numbers(s, p, selections, mu), recorded_value(trace, s, p, m, context)))
    return result


def distribution(s, m, i, trace, selections, mu, T, context=None, uses=None, combine=None,
                 given=None, depends=None, at=None, samples=SAMPLES, seed=0):
    """y_m(s) ~ F_m(theta(D), s, c): samples of metric m at step s in project i, from a fit over R read
       at D(s, i).

       uses       what influences the metric, None for all: descriptors as (node id, name), and a node
                  id for the number of its instances; paint colour, say, need not influence time
       combine    how a numerical descriptor's values over several instances of its node combine for
                  this metric, {(node id, name): function}, sum where none is given
       given      a forecast taken in place of the trace where it has no points, a number or samples
       depends    the metric m depends on during execution, if any, such as the dose a fall in blood
                  pressure follows: its value at the step joins the descriptors in the fit
       at         the value of the metric depended on at which the forecast is read, a chosen dose; with
                  none there is no forecast

       Categorical descriptors separate the points, keeping those that match the project's values, and
       numerical ones scale them, with the number of instances of each node, by least squares. An input
       that adds nothing to the others in the points is left out (see independent). The spread is the fit's
       residuals, resampled. With too few points for the fit, the matching points' values are
       resampled as they are. With no points and no given forecast, there is no forecast, None. The
       metric must be numerical (see NOTES)."""
    kinds = {(x.id, d.name): d.kind for x in T.nodes.values() for d in x.descriptors}
    combine = combine or {}
    own = descriptor_values(s, i, selections, mu)
    if depends is not None:
        if at is None:
            return None
        kinds[(DEPENDS, depends)] = "numerical"
        own[(DEPENDS, depends)] = [at]
    used = lambda k: uses is None or k in uses

    def describe(D, n):
        names = [d for d in sorted(D) if used(d)]
        group = tuple((d, tuple(sorted(D[d]))) for d in names if kinds[d] == "categorical")
        numerical = [d for d in names if kinds[d] == "numerical"]
        counted = [x for x in sorted(n) if used(x)]
        inputs = [combine.get(d, sum)(D[d]) for d in numerical] + [n[x] for x in counted]
        return (group, tuple(numerical), tuple(counted)), inputs

    key, x = describe(own, numbers(s, i, selections, mu))
    matching = [(px, y) for D, n, y in points(trace, s, m, i, selections, mu, context, depends)
                for pkey, px in [describe(D, n)] if pkey == key]

    rng = random.Random(seed)
    if not matching:
        if given is None:
            return None
        return list(given) if isinstance(given, (list, tuple)) else [given] * samples

    kept = independent([px for px, _ in matching])
    pick = lambda v: [1] + [v[k] for k in kept]
    b = least_squares([pick(px) for px, _ in matching], [y for _, y in matching])
    if b is None:
        ys = [y for _, y in matching]
        return [rng.choice(ys) for _ in range(samples)]
    fitted = lambda v: sum(bk * vk for bk, vk in zip(b, pick(v)))
    residuals = [y - fitted(px) for px, y in matching]
    return [fitted(x) + rng.choice(residuals) for _ in range(samples)]


def independent(rows):
    """The inputs, by position, that each add something to a constant and the inputs kept before them,
       across the points' rows. An input alike in every point, or fixed by others, such as a sum of
       equal values and their number, is one the points cannot separate."""
    basis, kept = [[1.0] * len(rows)], []
    for k in range(len(rows[0]) if rows else 0):
        v = [float(row[k]) for row in rows]
        size = sum(a * a for a in v)
        for b in basis:                              # remove what the inputs kept already explain
            f = sum(a * c for a, c in zip(v, b)) / sum(c * c for c in b)
            v = [a - f * c for a, c in zip(v, b)]
        if sum(a * a for a in v) > 1e-9 * max(size, 1):
            basis.append(v)
            kept.append(k)
    return kept


def least_squares(X, y):
    """The coefficients b minimising the squared error of X b against y, or None where the points
       cannot fix them, being too few or all alike in some descriptor."""
    k = len(X[0])
    if len(X) <= k:
        return None
    A = [[sum(row[p] * row[q] for row in X) for q in range(k)] + [sum(row[p] * v for row, v in zip(X, y))]
         for p in range(k)]
    for c in range(k):
        pivot = max(range(c, k), key=lambda r: abs(A[r][c]))
        if abs(A[pivot][c]) < 1e-12:
            return None
        A[c], A[pivot] = A[pivot], A[c]
        for r in range(k):
            if r != c:
                f = A[r][c] / A[c][c]
                A[r] = [a - f * ac for a, ac in zip(A[r], A[c])]
    return [A[c][k] / A[c][c] for c in range(k)]


def percentile(samples, r):
    """Q_r: the r-percentile of a distribution, so that 1 - r is the tolerated risk of overrun."""
    ordered = sorted(samples)
    return ordered[min(len(ordered) - 1, int(r * len(ordered)))]


def forecast(s, m, r, i, trace, selections, mu, T, context=None, **options):
    """forecast(s, m, r, c): Q_r of the distribution of metric m at step s in project i, None where there
       is none. options are those of distribution."""
    samples = distribution(s, m, i, trace, selections, mu, T, context, **options)
    return None if samples is None else percentile(samples, r)


def product_value(e, m, i, selections, mu):
    """y_m(e): product e's metric m in project i, its formula read at its source step's descriptor
       values, D(src(e), i), or its target's for a product from outside; None where it has no formula
       for m, or a descriptor it reads is not bound in the project (see evaluate)."""
    if m not in e.formulas:
        return None
    s = e.tgt if e.src is OUTSIDE else e.src
    return evaluate(e.formulas[m], descriptor_values(s, i, selections, mu))
