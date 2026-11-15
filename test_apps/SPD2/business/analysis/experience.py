"""Exposure n_c(s), an agent's experience n_a(s), and eligibility Elig(j)."""

from business.structure.derivation import served


def exposure(trace, steps, context, credited=None, recorded=None, bound=None, selections=None, mu=None):
    """n_c(s) = n_c^tau(s) + n-tilde_c(s): the exposure of a context c to a step s, or to a set of steps
       (such as all those a tool is used in), its extent in the trace plus any credited by hand.

       context(record) says whether a record names c, and credited gives what is credited to c by step,
       {step: amount}, for exposure gained outside the trace, such as a hired tool's prior wear or an
       agent's previous role. Its extent in the trace is measured in one of:
         recorded   a metric's name: its values, once per record;
         bound      a numerical descriptor of a node, (node id, name): its values on the instances of
                    that node the step served (those s serves in a record's project i, and their
                    ancestors), once per project. selections gives each project's selection by its
                    id, and mu the mapping.
       Which is measured is a modelling choice the paper leaves open."""
    steps = {steps} if isinstance(steps, str) else set(steps)
    credited = credited or {}
    total = sum(credited.get(s, 0) for s in steps)
    for s in steps:
        records = [r for r in trace if r.step == s and context(r)]
        if recorded is not None:
            total += sum(r.value for r in records if r.metric == recorded)
        else:
            node, name = bound
            total += sum(x.values[name]
                         for i in {r.project for r in records}
                         for x in served(s, selections[i], mu)
                         if x.node == node)
    return total


def experience(trace, a, steps, credited=None, **quantity):
    """n_a(s): agent a's exposure to a step or set of steps, totalling what it has delivered, with any
       credited to it by hand. credited gives n-tilde_a(s) by (agent id, step id), and quantity is what
       is measured (see exposure). Each agent a record names is credited, so a crew's members are each
       credited in full."""
    own = {s: n for (b, s), n in (credited or {}).items() if b == a}
    return exposure(trace, steps, lambda r: r.agents is not None and a in r.agents, own, **quantity)


def floors_at(s, i, floors, selections, mu):
    """The floors applying at step s in project i, each lambda_x as ((x, descriptor), floor): those set
       on a node x the project selects whose mapping includes s. floors gives each floored node's
       (descriptor, floor) by the node's id; a node without one imposes nothing."""
    nodes = {x.node for x in selections[i].instances.values()}
    return [((x, floors[x][0]), floors[x][1]) for x in sorted(nodes) if x in floors and s in mu.steps[x]]


def measures(s, floors, mu):
    """What experience at step s is measured in: executions, None, and, as eligibility reads it, the
       descriptor of each floor set on a node whose mapping includes s, (node id, name)."""
    return [None] + [(x, floors[x][0]) for x in sorted(floors) if s in mu.steps[x]]


def amount(trace, a, s, measure, selections, mu):
    """Agent a's experience at step s in trace, in one measure (see measures): a floored descriptor's
       extent, or, for None, the number of projects in which it executed s."""
    if measure is None:
        return len({r.project for r in trace if r.step == s and r.agents is not None and a in r.agents})
    return experience(trace, a, s, bound=measure, selections=selections, mu=mu)


def named(measure):
    """A measure's name: a floored descriptor as "x.d", executions as "executions"."""
    return "executions" if measure is None else ".".join(measure)


def gained(a, steps, i, trace, floors, selections, mu):
    """The experience agent a gained in project i at each of the steps, in executions and in each
       measure eligibility reads it in (see measures), {step: {measure name: amount}}: its exposure in
       that project's records."""
    own = [r for r in trace if r.project == i]
    return {s: {named(m): amount(own, a, s, m, selections, mu) for m in measures(s, floors, mu)}
            for s in steps}


def experience_table(agents, steps, trace, floors, credited, selections, mu):
    """Each agent's experience so far at each step it has any, in executions and in each measure
       eligibility reads it in, the latter with what is credited by hand, {agent: {step: {measure name:
       amount}}}."""
    table = {}
    for a in agents:
        for s in steps:
            amounts = {named(m): amount(trace, a, s, m, selections, mu) + (credited.get((a, s), 0) if m else 0)
                       for m in measures(s, floors, mu)}
            if any(amounts.values()):
                table.setdefault(a, {})[s] = amounts
    return table


def eligible(j, project, i, G, agents, trace, floors, credited, selections, mu):
    """Elig(j): the agents qualified for job j whose experience clears every floor applying at each step
       of j in project i, its process project (its steps N_T-hat).

       At each step, experience is measured in each applying floor's descriptor, its node's own (see
       floors_at), with what is credited by hand, credited by (agent id, step id)."""
    steps = [s for s in project.steps if G.steps[s].job == j]

    def clears(a, s):
        return all(experience(trace, a, s, credited, bound=d, selections=selections, mu=mu) >= value
                   for d, value in floors_at(s, i, floors, selections, mu))

    return {a.id for a in agents.values()
            if j in a.qualifications and all(clears(a.id, s) for s in steps)}
