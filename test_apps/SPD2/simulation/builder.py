"""Building a new project's selection, one change at a time: each change derives the project's process
   again, through the model, offers it once the selection is complete (its forecasts), and states the
   project as it now stands, for the dialog."""

import business
from business.checks import check_ranges, check_selection
from business.structure.derivation import derive
from business.structure.specification import read_selection, unbound
from simulation.events import emit


def change(M, tree, project, r, heading="project"):
    """A new project's selection as it now stands, tree in the nested JSON form. Returns the project's
       process, its offer (None until every selected node's descriptors have values, the selection then
       checked by the model), and the events stating the project: its heading (being selected, or
       run), its nodes and values, its steps, and its forecast or what the forecast waits for."""
    log = []
    selection = read_selection(tree)
    emit(log, heading, [project], project=project)
    nodes = []
    for x in selection.instances.values():
        values = ", ".join(f"{d} = {v}" for d, v in x.values.items())
        nodes.append(M["T"].nodes[x.node].name + (f" ({values})" if values else ""))
    emit(log, "nodes", [x.node for x in selection.instances.values()], nodes=", ".join(nodes))

    process = derive(selection, M["mu"], M["G"])
    steps = sorted(process.steps)
    emit(log, "steps", steps, steps=", ".join(steps) or "none")

    awaiting = unbound(selection, M["T"])
    if awaiting:
        emit(log, "awaiting values", [], nodes=", ".join(M["T"].nodes[x.node].name for x in awaiting))
        return process, None, log

    check_selection(tree, M["T"])
    check_ranges(tree, M["T"])
    offered = business.offer(M, {**M["selections"], project: selection}, project, r)
    values = ", ".join(f"{m} {round(y, 2)}" for m, y in offered.value.items()) or "none"
    emit(log, "forecast", steps, r=r, values=values)
    return process, offered, log
