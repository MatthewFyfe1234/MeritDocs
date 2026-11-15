"""Running one project: its selection offered by the model, its contracts taken, and its steps executed and
   recorded, wave by wave or all at once, until it is delivered. Between waves the selection may grow,
   the paper's extension. A project part-way through is in progress: its selection and records so far are
   saved, and who holds each contract is kept in the dataset's runs.json, the simulation's own state."""

import json
import random

import business
from business.analysis.forecasting import descriptor_values
from business.analysis.trace import read_trace
from business.checks import check_extension
from business.project import delivery, reissue, take
from business.structure.derivation import derive, late, leaving
from business.structure.specification import read_selection
from simulation.builder import change
from simulation.events import emit
from simulation.policy import self_select
from simulation.world import load_world, outcome, random_selection


class Late(ValueError):
    """An extension refused: the steps it adds would come before steps already executed."""
    def __init__(self, steps):
        super().__init__(f"the extension adds steps before ones already executed: {', '.join(sorted(steps))}")
        self.steps = sorted(steps)


def saved(dataset_id, part, empty):
    """A dataset's selections.json or trace.json in its JSON form, empty where it has none."""
    path = business.dataset_dir(dataset_id) / f"{part}.json"
    return business.read(path) if path.is_file() else empty


def runs(dataset_id):
    """The projects in progress, {project: {"taken": {job: agent}}}: who holds each contract taken."""
    path = business.dataset_dir(dataset_id) / "runs.json"
    return json.loads(path.read_text(encoding="utf-8")) if path.is_file() else {}


def save_runs(dataset_id, state):
    path = business.dataset_dir(dataset_id) / "runs.json"
    path.write_text(json.dumps(state, indent=2) + "\n", encoding="utf-8")


def ledger(dataset_id):
    """What the simulation noted of each project it ran, for its measures and its story, by project:
       {order, r, forecasts: {step: {metric: {r, median}}}, value: {metric: {r, median}},
       eligible: {job: [agents]}, events: [{kind, params, refs}]}. Each step's forecasts are those offered
       when it joined the project, and the project's value and each job's eligible agents those of its
       last offer, its selection then complete."""
    path = business.dataset_dir(dataset_id) / "ledger.json"
    return json.loads(path.read_text(encoding="utf-8")) if path.is_file() else {}


def save_ledger(dataset_id, book):
    path = business.dataset_dir(dataset_id) / "ledger.json"
    path.write_text(json.dumps(book, indent=1) + "\n", encoding="utf-8")


def note(book, project, r, offered, log):
    """Notes a project's offer and the events of a run of it in the ledger, book."""
    entry = book.setdefault(project, {"order": max((e["order"] for e in book.values()), default=0) + 1,
                                      "r": r, "forecasts": {}, "value": {}, "eligible": {}, "events": []})
    for s, metrics in offered.forecasts.items():
        entry["forecasts"].setdefault(s, {m: {"r": y, "median": offered.median[s][m]} for m, y in metrics.items()})
    entry["value"] = {m: {"r": y, "median": offered.median_value.get(m)} for m, y in offered.value.items()}
    for j, agents in offered.eligible.items():
        entry["eligible"][j] = sorted(agents)            # as last offered, the selection then complete
    entry["events"] += [{"kind": e.kind, "params": e.params, "refs": e.refs} for e in log
                        if e.kind in ("extended", "taken", "handed over", "recorded", "delivered")]


def in_progress(dataset_id):
    """The project in progress, if any. Projects run one at a time."""
    return next(iter(runs(dataset_id)), None)


def late_steps(M, dataset_id, tree, project):
    """The steps a grown selection, tree, would add before steps the project in progress has already
       executed; empty where the project is not in progress or the extension holds."""
    if project not in runs(dataset_id):
        return []
    before = derive(M["selections"][project], M["mu"], M["G"])
    after = derive(read_selection(tree), M["mu"], M["G"])
    executed = {r.step for r in M["trace"] if r.project == project}
    return sorted(late(after, after.steps - before.steps, executed))


def advance(dataset_id, tree, project, r, to_end, keep_open=False):
    """Executes the project's next wave of steps, or, with to_end, every step left, until it is delivered;
       with keep_open, it stays in progress even once every step is executed, for a selection still to
       grow, as Autoplay's does after its first step.

       A new project is offered by the model and its contracts taken, each by an agent the policy picks
       among those the model makes eligible. A project in progress may come with its selection grown, an
       extension: the steps it necessitates join the process, a contract already held is re-issued to
       the same agent, with its forecasts recomputed and eligibility checked at the added steps, and a
       job new to the project is offered as usual. Where the holder is not eligible at the added steps,
       the job's remaining steps are handed over to an agent the policy picks among those eligible.

       A wave is the steps ready to execute that can start soonest, together: each step's values drawn
       from the world, its own seed keeping a run reproducible, and recorded with the agent holding its
       job's contract. Returns the project's process, its offer, the contracts taken by job, its Delivery
       so far, the steps executed now, whether it is delivered, and the events.

       Raises ValueError where the id is taken by a past project, another project is in progress, a
       selected node's descriptors lack values, an extension removes or changes what was selected, or a
       job has no agent eligible, and Late where an extension adds steps before ones executed; nothing
       is then saved."""
    M = business.load_model(dataset_id)
    G, state = M["G"], runs(dataset_id)
    if project in state:
        check_extension(saved(dataset_id, "selections", {})[project], tree)
        if late_steps(M, dataset_id, tree, project):
            raise Late(late_steps(M, dataset_id, tree, project))
    else:
        if project in M["selections"]:
            raise ValueError(f"project {project!r} already exists")
        if state:
            raise ValueError(f"project {next(iter(state))!r} is still in progress")
    process, offered, log = change(M, tree, project, r, heading="played")
    if offered is None:
        raise ValueError("every selected node's descriptors need values before the project can run")
    if project in state:                                  # an extension: what it adds
        before = derive(M["selections"][project], M["mu"], G)
        had = {x.node for x in M["selections"][project].instances.values()}
        for x in sorted({x.node for x in read_selection(tree).instances.values()} - had):
            added = sorted(s for s in M["mu"].steps[x] if s in process.steps and s not in before.steps)
            emit(log, "extended", [x, *added], node=M["T"].nodes[x].name, steps=", ".join(added) or "no new steps")
    selections = {**M["selections"], project: read_selection(tree)}
    world = load_world(dataset_id)
    seeded = lambda *what: random.Random(":".join(map(str, (world.seed, project, *what))))

    holders = state.get(project, {}).get("taken", {})
    taken = {}
    for j in sorted(offered.contracts):
        held = holders.get(j)
        if held is not None and (kept := reissue(j, held, offered)) is not None:
            taken[j] = kept
            continue
        others = [t.agent for t in taken.values()] + ([held] if held else [])
        agent = self_select(offered.eligible[j] - {held}, seeded("contract", j, held), others)
        if agent is None:
            raise ValueError(f"no agent is eligible for {G.jobs[j].name}'s contract")
        if held is None:
            emit(log, "taken", [j, agent], agent=M["agents"][agent].name, job=G.jobs[j].name)
        else:
            emit(log, "handed over", [j, held, agent], job=G.jobs[j].name,
                 before=M["agents"][held].name, after=M["agents"][agent].name)
        taken[j] = take(j, agent, offered)

    trace, records, executed_now = M["trace"], [], []
    time = next(iter(M["operators"]), None)               # the metric accumulated along paths, if any
    while True:
        so_far = delivery(project, process, G, M["mu"], selections, trace + read_trace(records), M["operators"])
        if not so_far.ready:
            break
        if time is not None and all(s in so_far.arrived[time] for s in so_far.ready):
            soonest = min(so_far.arrived[time][s] for s in so_far.ready)
            wave = [s for s in so_far.ready if so_far.arrived[time][s] <= soonest + 1e-9]
        else:
            wave = so_far.ready
        for s in wave:
            agent = taken[G.steps[s].job].agent
            D = descriptor_values(s, project, selections, M["mu"])
            rng = seeded("step", s)
            records += [{"project": project, "step": s, "time": None, "agents": [agent], "tools": [],
                         "materials": [], "metric": m, "value": round(outcome(world.rules[(s, m)], D, rng), 2)}
                        for m in G.metrics if (s, m) in world.rules]
            executed_now.append(s)
        if not to_end:
            break

    business.write_model(dataset_id, selections={**saved(dataset_id, "selections", {}), project: tree},
                         trace=[*saved(dataset_id, "trace", []), *records])
    delivered = business.delivered(business.load_model(dataset_id), project)
    done = len(delivered.recorded) == len(process.steps) and not keep_open
    state.pop(project, None)
    if not done:
        state[project] = {"taken": {j: t.agent for j, t in taken.items()}}
    save_runs(dataset_id, state)

    for s in executed_now:
        for m, y in delivered.recorded[s].items():
            forecast = offered.forecasts[s].get(m)
            emit(log, "recorded", [s], step=G.steps[s].name, metric=m, actual=round(y, 2),
                 forecast="no" if forecast is None else round(forecast, 2))
    if done:
        for m, y in delivered.value.items():
            forecast = offered.value.get(m)
            emit(log, "delivered", [], project=project, metric=m, actual=round(y, 2),
                 forecast="no" if forecast is None else round(forecast, 2))
    book = ledger(dataset_id)
    note(book, project, r, offered, log)
    save_ledger(dataset_id, book)
    return process, offered, taken, delivered, executed_now, done, log


def draw(dataset_id, project):
    """A selection the world draws for a new project, for Autoplay (see random_selection), from a seed of
       the world's and the project's id, so a loop is reproducible. A draw whose project delivers
       nothing, no product leaving the process, is drawn again."""
    M = business.load_model(dataset_id)
    world = load_world(dataset_id)
    rng = random.Random(f"{world.seed}:draw:{project}")
    for _ in range(100):
        tree = random_selection(M["T"], M["selections"], project, rng)
        if tree and leaving(derive(read_selection(tree), M["mu"], M["G"]), M["G"]):
            return tree
    raise ValueError("the world drew no selection whose project delivers anything")


def holders(dataset_id, project):
    """Who holds each contract of the project in progress, {job: agent}; empty for any other."""
    return runs(dataset_id).get(project, {}).get("taken", {})


def delete(dataset_id, project):
    """Removes a project from the dataset: its selection, its records, and its run if in progress. The
       model's trace only grows; this undoes a run in the simulation. Raises KeyError where there is no
       such project."""
    selections = saved(dataset_id, "selections", {})
    del selections[project]
    trace = [record for record in saved(dataset_id, "trace", []) if record["project"] != project]
    business.write_model(dataset_id, selections=selections, trace=trace)
    state = runs(dataset_id)
    if state.pop(project, None) is not None:
        save_runs(dataset_id, state)
    book = ledger(dataset_id)
    if book.pop(project, None) is not None:
        save_ledger(dataset_id, book)
