"""A project's steps N_T-hat and process G_T-hat, derived from its selection."""

from dataclasses import dataclass

from business.structure.process import OUTSIDE


@dataclass
class ProjectProcess:
    """G_T-hat: a project's steps N_T-hat, ordered wherever a path of the master process joins two of
       them with none of the project's steps between."""
    steps: set                                   # N_T-hat, the ids of the project's steps
    precedence: set                              # each as (u, v), u before v


# --------------------------------------------------------------------------------------------------


def derive(S, mu, G):
    """Derives G_T-hat from the selection S, the mapping mu and the master process G.

       Each distinct node instanced in S necessitates its steps through mu, and together these are
       N_T-hat. u precedes v where u ~> v: a path of G joins u to v with any steps between outside N_T-hat
       and in v's job, that is, where some product e of u has e ~> v.

       A selection may grow during execution and is derived again. Growth only adds, so steps already
       executed stay valid."""
    steps = set().union(*(mu.steps[i.node] for i in S.instances.values()))
    precedence = {(e.src, v) for e in G.arcs if e.src in steps
                  for v in steps if reaches(e, v, steps, G)}
    return ProjectProcess(steps, precedence)


def served(s, S, mu):
    """The node instances step s serves in the selection S, those whose node necessitates it, and their
       ancestors, each instance once."""
    found = {}
    for x in S.instances.values():
        if s in mu.steps[x.node]:
            while x is not None and x.id not in found:
                found[x.id] = x
                x = S.instances.get(x.parent)
    return list(found.values())


def between(x, v, steps, G):
    """Whether a path to v, a step or OUTSIDE, may pass through x: a step outside the project, steps, in
       v's job, so that a product leaves a job only from the step that makes it. OUTSIDE has no job, so
       a path out of the process passes through none."""
    return (x is not OUTSIDE and v is not OUTSIDE and x not in steps
            and G.steps[x].job == G.steps[v].job)


def reaches(e, v, steps, G):
    """e ~> v: a path of G beginning with product e reaches v, a step or OUTSIDE, with any steps between
       outside the project's steps, steps, and in v's job."""
    frontier, seen = [e.tgt], set()
    while frontier:
        here = frontier.pop()
        if here == v:
            return True
        if here in seen or not between(here, v, steps, G):
            continue                                 # left the process, or a step the path cannot cross
        seen.add(here)
        frontier += [a.tgt for a in G.arcs if a.src == here]   # a skipped step of v's job: carry on
    return False


def carried(project, G):
    """The arcs of G on a path e ~> v into one of the project's steps: e leaves another of them or comes
       from outside, through any steps of v's job the project skips, its product passing on through
       them. A path out of the process is left to leaving."""
    sources = project.steps | {OUTSIDE}

    def through(starts, v, forward):
        """The steps a path to v may pass through, reachable from starts, forwards or backwards, through
           such steps only."""
        seen, frontier = set(), list(starts)
        while frontier:
            here = frontier.pop()
            for a in G.arcs:
                near, far = (a.src, a.tgt) if forward else (a.tgt, a.src)
                if near == here and far not in seen and between(far, v, project.steps, G):
                    seen.add(far)
                    frontier.append(far)
        return seen

    found = set()
    for v in project.steps:
        mid = through(sources, v, True) & through([v], v, False)   # reached from a source, leading to v
        found |= {id(a) for a in G.arcs
                  if (a.src in sources or a.src in mid) and (a.tgt == v or a.tgt in mid)}
    return [a for a in G.arcs if id(a) in found]


def leaving(project, G):
    """The products the project passes out of the process, e ~> OUTSIDE from one of its steps, each
       directly, since a path out of the process passes through no step the project skips."""
    return [e for e in G.arcs if e.src in project.steps and reaches(e, OUTSIDE, project.steps, G)]


def late(project, added, executed):
    """The steps an extension adds too late: those of added that come before a step already executed in
       the project's process, so would feed it. Extension only adds, so the steps executed and their
       records stay valid unless a newly necessitated step feeds one of them, a limitation the paper
       names."""
    after = {}
    for u, v in project.precedence:
        after.setdefault(u, set()).add(v)

    def reaches_executed(s):
        seen, frontier = set(), [s]
        while frontier:
            for v in after.get(frontier.pop(), ()):
                if v in executed:
                    return True
                if v not in seen:
                    seen.add(v)
                    frontier.append(v)
        return False

    return {s for s in added if reaches_executed(s)}


def job_steps(j, project, G):
    """S_j: job j's steps in the project."""
    return {s for s in project.steps if G.steps[s].job == j}


def inputs(j, project, G):
    """in(j): the products another of the project's jobs, or the outside of the process, passes on along
       a path into S_j with none of the project's steps between."""
    S_j = job_steps(j, project, G)
    return [e for e in G.arcs
            if (e.src is OUTSIDE or e.src in project.steps - S_j)
            and any(reaches(e, v, project.steps, G) for v in S_j)]


def outputs(j, project, G):
    """out(j): the products S_j passes on along such a path to another of the project's jobs or out of
       the process."""
    S_j = job_steps(j, project, G)
    return [e for e in G.arcs
            if e.src in S_j
            and any(reaches(e, v, project.steps, G) for v in (project.steps - S_j) | {OUTSIDE})]
