"""A past project replayed from its records, as it was: who executed each step and what was recorded there,
   against its forecast at r. Nothing is written. Where the data does not order the projects in time, as
   MIMIC's date-shifted stays do not, the other projects stand for the past: the forecast is fitted on
   them, as the model's forecasts always are, and the experience shown before the replay is theirs."""

import business
from simulation.builder import change
from simulation.events import emit


def replay(dataset_id, i, r):
    """Project i as a run for the page to play back: its process, offer and events, who took each job
       first, who executed each step, its delivery, every step executed, and each agent's experience
       without it."""
    M = business.load_model(dataset_id)
    G = M["G"]
    tree = business.read(business.dataset_dir(dataset_id) / "selections.json")[i]
    process, offered, log = change(M, tree, i, r, heading="replayed")
    delivered = business.delivered(M, i)

    time = next(iter(delivered.arrived), None)               # a path metric, by which the steps start
    start = delivered.arrived[time] if time else {}
    executed = sorted(delivered.recorded, key=lambda s: (start.get(s, 0), s))
    agent_at = {}
    for rec in M["trace"]:
        if rec.project == i and rec.agents and rec.step not in agent_at:
            agent_at[rec.step] = min(rec.agents)          # a record's agents are a set

    taken, holder = {}, {}
    for s in executed:
        j, agent = G.steps[s].job, agent_at.get(s)
        if agent is None:
            continue
        if j not in taken:
            taken[j] = holder[j] = agent
            emit(log, "taken", [j, agent], agent=M["agents"][agent].name, job=G.jobs[j].name)
        elif holder[j] != agent:
            emit(log, "took over", [j, holder[j], agent], job=G.jobs[j].name,
                 before=M["agents"][holder[j]].name, after=M["agents"][agent].name)
            holder[j] = agent
    for s in executed:
        for m, y in delivered.recorded[s].items():
            forecast = offered.forecasts[s].get(m) if offered else None
            emit(log, "recorded", [s], step=G.steps[s].name, metric=m, actual=round(y, 2),
                 forecast="no" if forecast is None else round(forecast, 2))
    for m, y in delivered.value.items():
        forecast = offered.value.get(m) if offered else None
        emit(log, "delivered", [], project=i, metric=m, actual=round(y, 2),
             forecast="no" if forecast is None else round(forecast, 2))

    others = {**M, "trace": [rec for rec in M["trace"] if rec.project != i]}
    return process, offered, taken, agent_at, delivered, executed, log, business.experience(others)
