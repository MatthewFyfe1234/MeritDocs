"""A project: its steps' forecasts, its contracts C(j) offered to the agents eligible for them, and its
   own value for each metric; the contracts as taken; and, once delivered, its recorded values. Built on
   both the structure (the project's process) and the analysis (forecasts, accumulation, eligibility)."""

from dataclasses import dataclass

from business.analysis.accumulation import (accumulate, add_job_orders, arriving, ordering,
                                            product_values, total)
from business.analysis.experience import eligible, gained
from business.analysis.forecasting import distribution, percentile, product_value, recorded_value
from business.structure.process import OUTSIDE
from business.structure.derivation import ProjectProcess, derive, inputs, job_steps, outputs


@dataclass
class Contract:
    """C(j) = (in(j), out(j), phi(j)): the unit offered for self-selection, a job within the project's
       process."""
    job: str                                     # j
    inputs: list                                 # in(j), the products it draws
    outputs: list                                # out(j), the products it supplies
    forecasts: dict                              # phi(j), {metric name: forecast value}


@dataclass
class Project:
    """Project(T-hat): the delivery of the state a selection specifies, each derived step offered with its
       forecasts, its job's contract and the agents eligible for that job, with the project's own value
       for each metric."""
    process: ProjectProcess                      # G_T-hat, its steps N_T-hat
    forecasts: dict                              # forecast(s, ., r, empty), {step: {metric: value}}
    contracts: dict                              # C(j), each job's by its id
    eligible: dict                               # Elig(j), each job's set of agent ids by its id
    total: dict                                  # Q_r(X_m(N_T-hat)), {metric: value}
    accumulated: dict                            # Q_r(X_m(OUTSIDE)), {metric: value}, path metrics only
    value: dict                                  # the project's own value, {metric: value}: accumulated
                                                 # where the metric runs along paths (time: the length of
                                                 # the critical path), its total otherwise
    median: dict                                 # the steps' forecasts read at the median, {step: {metric:
                                                 # value}}, for judging a forecast's error against what
                                                 # was recorded
    median_value: dict                           # the project's own value read at the median, {metric:
                                                 # value}


@dataclass
class Taken:
    """A contract taken: C(j), binding on the agent that self-selected it."""
    contract: Contract                           # C(j)
    agent: str                                   # a, in Elig(j)


@dataclass
class Delivery:
    """A project as far as it has been executed: the recorded values, y_m(s, i), at each step executed,
       the steps ready to execute next, and, for each metric accumulated along paths, when each step's
       inputs arrived, at the steps executed and those ready, and the value accumulated at the steps
       executed, X_m(s); for time, when each step started and finished, and when each ready step can
       start. Once every step is executed, the project's own value."""
    recorded: dict                               # {step: {metric: value}}, the steps executed
    agents: dict                                 # the agents recorded at each job's steps, {job: set}
    gained: dict                                 # the experience each of them gained at the steps
                                                 # executed, {agent: {step: {measure name: amount}}}
    ready: list                                 # the steps not executed whose predecessors all are
    arrived: dict                                # {metric: {step: value}}, path metrics only
    accumulated: dict                            # X_m(s), {metric: {step: value}}, path metrics only
    value: dict                                  # the project's own value, {metric: value}, as in
                                                 # Project, once every step has a record for it


# --------------------------------------------------------------------------------------------------


def contract(j, project, G, own, r, operators=None, products=None, order=None):
    """C(j) for job j in the project, with phi(j) read at the r-percentile.

       own        each metric's samples at each of the project's steps, {metric: {step: samples}}
       operators  the Operators of each metric accumulated along paths, {metric: Operators}; any other
                  metric is totalled over the job's steps
       products   y_m(u, v) for each path metric, {metric: {(u, v): value}} (see product_values)
       order      one ordering of the project's steps, from which each job's order is assumed (see
                  ordering)

       Each forecast is the distribution accumulated over the job's steps, sample by sample, not a sum
       of their percentiles. A metric accumulated along paths runs over those steps alone, so that its
       time is the job's own duration, not including any wait for its inputs."""
    operators, products = operators or {}, products or {}
    S_j = job_steps(j, project, G)
    forecasts = {}
    for m, samples in own.items():
        if not any(s in samples for s in S_j):
            continue                                     # measured at none of the job's steps
        if m not in operators:
            forecasts[m] = percentile(total(samples, S_j), r)
            continue
        ops = operators[m]
        ordered = add_job_orders(project, G, order)
        alone = ProjectProcess(S_j, {(u, v) for u, v in ordered.precedence if u in S_j and v in S_j})
        within = {(u, v): y for (u, v), y in products.get(m, {}).items() if u in S_j and v in S_j}
        X, _ = accumulate(alone, {s: samples[s] for s in S_j}, within, ops)
        runs = [ops.merge_identity] * len(next(iter(X.values())))
        for s in S_j:
            runs = [ops.merge(a, b) for a, b in zip(runs, X[s])]
        forecasts[m] = percentile(runs, r)
    return Contract(j, inputs(j, project, G), outputs(j, project, G), forecasts)


def project(i, r, T, G, mu, selections, agents, trace, floors=None, credited=None, given=None,
            operators=None, order=None, uses=None, combine=None):
    """Project(T-hat) for project i, its selection T-hat being selections[i], everything read at r and
       taken with the empty context, pooling over who will do the work.

       floors     each floored node's (descriptor, floor) by its id (see eligible)
       credited   experience credited by hand, by (agent id, step id)
       given      a forecast taken where a step has no relevant trace, from a heuristic or an expert
                  estimate, by (step id, metric)
       operators  the Operators of each metric accumulated along paths, {metric: Operators}
       order      one ordering of the project's steps (see ordering)
       uses       what influences each metric, {metric: uses} (see distribution), all where none is
                  given
       combine    how each metric combines a descriptor's values over several instances, {metric:
                  combine} (see distribution), sum where none is given

       A metric is offered only where every step of the project it is measured at has a forecast for
       it, since its contracts and the project's own value need them all. A metric that depends on
       another is read at the other's value at the step: the value recorded there in project i, or else
       the median of its forecast, until one is chosen."""
    floors, credited, given, operators = floors or {}, credited or {}, given or {}, operators or {}
    uses, combine = uses or {}, combine or {}
    process = derive(selections[i], mu, G)

    own = {}

    def chosen(depends, s):
        if depends is None:
            return None
        y = recorded_value(trace, s, i, depends)
        if y is None and s in own.get(depends, {}):
            y = percentile(own[depends][s], 0.5)
        return y

    # A metric others depend on is forecast before them
    for m, metric in sorted(G.metrics.items(), key=lambda kv: kv[1].depends is not None):
        if metric.kind != "numerical":
            continue                                     # see NOTES: categorical metrics
        steps = [s for s in process.steps if metric.steps is None or s in metric.steps]
        samples = {s: distribution(s, m, i, trace, selections, mu, T, uses=uses.get(m),
                                   combine=combine.get(m), given=given.get((s, m)),
                                   depends=metric.depends, at=chosen(metric.depends, s))
                   for s in steps}
        if samples and all(x is not None for x in samples.values()):
            own[m] = samples

    products = {m: product_values(process, G, m, operators[m],
                                  lambda e, m=m: product_value(e, m, i, selections, mu))
                for m in own if m in operators}
    jobs = {G.steps[s].job for s in process.steps}
    ordered = add_job_orders(process, G, order)

    runs = {m: total(own[m], process.steps) for m in own}            # the project's value, sample by sample
    for m in own:
        if m in operators:
            runs[m] = accumulate(ordered, own[m], products[m], operators[m], order)[1]
    totals = {m: percentile(total(own[m], process.steps), r) for m in own}
    accumulated = {m: percentile(runs[m], r) for m in own if m in operators}
    return Project(
        process=process,
        forecasts={s: {m: percentile(own[m][s], r) for m in own if s in own[m]} for s in process.steps},
        contracts={j: contract(j, process, G, own, r, operators, products, order) for j in jobs},
        eligible={j: eligible(j, process, i, G, agents, trace, floors, credited, selections, mu)
                  for j in jobs},
        total=totals,
        accumulated=accumulated,
        value={**totals, **accumulated},
        median={s: {m: percentile(own[m][s], 0.5) for m in own if s in own[m]} for s in process.steps},
        median_value={m: percentile(runs[m], 0.5) for m in own},
    )


def take(j, agent, offered):
    """C(j) taken by the agent that self-selects it, becoming binding on it. The contract is offered only
       to the agents in Elig(j), so any other raises ValueError."""
    if agent not in offered.eligible.get(j, set()):
        raise ValueError(f"{agent!r} is not eligible for job {j!r}")
    return Taken(offered.contracts[j], agent)


def reissue(j, holder, offered):
    """C(j) re-issued once an extension adds steps to a job already taken: to the same agent, with phi(j)
       recomputed, where it is still eligible, now including the added steps; None where it is not. The
       job's remaining steps are then offered again to Elig(j), a handover, the steps executed staying
       with the agent that executed them."""
    return take(j, holder, offered) if holder in offered.eligible.get(j, set()) else None


def delivery(i, process, G, mu, selections, trace, operators=None, order=None, floors=None):
    """Project i's Delivery, as far as it has been executed: its records at each step executed, combined
       for each metric, the agents they name at each job's steps and the experience each gained there,
       the steps ready next, and the metrics accumulated along paths, as the forecasts are, over the
       recorded values instead of samples.

       A step is executed once it has records, and ready once every step before it in G_T-hat^J has
       been, one agent performing a job's steps in turn.

       operators  the Operators of each metric accumulated along paths, {metric: Operators}
       order      the order the steps were executed in (see ordering)
       floors     each floored node's (descriptor, floor) by its id, which experience is measured in
                  (see gained)"""
    operators, floors = operators or {}, floors or {}
    recorded = {}
    for s in process.steps:
        values = {m: y for m in G.metrics if (y := recorded_value(trace, s, i, m)) is not None}
        if values:
            recorded[s] = values
    agents = {}
    for r in trace:
        if r.project == i and r.step in process.steps and r.agents is not None:
            agents.setdefault(G.steps[r.step].job, set()).update(r.agents)
    ran = lambda a: [s for s in recorded if any(r.project == i and r.step == s and r.agents and a in r.agents
                                                for r in trace)]
    gains = {a: gained(a, ran(a), i, trace, floors, selections, mu) for names in agents.values() for a in names}
    ordered = add_job_orders(process, G, order)
    before = lambda v: [u for u, w in ordered.precedence if w == v]
    ready = sorted(v for v in process.steps if v not in recorded and all(u in recorded for u in before(v)))
    done = len(recorded) == len(process.steps)

    arrived, accumulated, value = {}, {}, {}
    for m in G.metrics:
        if m not in operators:
            if done and all(m in recorded[s] for s in process.steps):
                value[m] = sum(recorded[s][m] for s in process.steps)
            continue
        ops = operators[m]
        products = product_values(process, G, m, ops, lambda e, m=m: product_value(e, m, i, selections, mu))
        here = {OUTSIDE: ops.extend_identity}
        arrived[m], accumulated[m] = {}, {}
        for v in ordering(ordered, order):
            if not all(u in here for u in before(v)):
                continue                                 # waits on a step not yet executed
            if v in recorded and m in recorded[v]:
                arrived[m][v] = arriving(v, ordered, here, products, ops)
                here[v] = accumulated[m][v] = ops.extend(arrived[m][v], recorded[v][m])
            elif v in ready:
                arrived[m][v] = arriving(v, ordered, here, products, ops)
        if done and all(s in here for s in process.steps):
            merged = ops.merge_identity
            for (u, w), y in products.items():
                if w is OUTSIDE:
                    merged = ops.merge(merged, ops.extend(here[u], y))
            value[m] = merged
    return Delivery(recorded, agents, gains, ready, arrived, accumulated, value)
