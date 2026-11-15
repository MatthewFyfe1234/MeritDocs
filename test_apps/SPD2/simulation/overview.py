"""The state with no project shown, for the dialog: the dataset's name, then what its master holds,
   its resources and inputs, and its trace so far."""

from simulation.events import emit


def count(n, word):
    """n with its word, made plural where n is not 1."""
    return f"{n} {word}" if n == 1 else f"{n} {word}s"


def overview(M, info):
    """The dialog's state for a dataset with no project shown: M its model (see
       business.load_model), info its dataset.json."""
    log = []
    emit(log, "dataset", name=info["name"])
    emit(log, "idle")

    G = M["G"]
    descriptors = sum(len(x.descriptors) for x in M["T"].nodes.values())
    products = {(e.src, e.product) for e in G.arcs}
    emit(log, "master", nodes=count(len(M["T"].nodes), "node"), descriptors=count(descriptors, "descriptor"),
         steps=count(len(G.steps), "step"), jobs=count(len(G.jobs), "job"),
         products=count(len(products), "product"), metrics=", ".join(G.metrics) or "none")

    emit(log, "resources", agents=len(M["agents"]), tools=len(M["tools"]), materials=len(M["materials"]))

    floors = ", ".join(f"{M['T'].nodes[x].name}, {d} ≥ {n}" for x, (d, n) in M["floors"].items()) or "none"
    credited = ", ".join(f"{a} at {s} {n}" for a, steps in M["credited"].items() for s, n in steps.items()) or "none"
    given = count(len(M["given"]), "step") if M["given"] else "none"
    emit(log, "inputs", floors=floors, credited=credited, given=given)

    if M["trace"]:
        emit(log, "trace", records=len(M["trace"]), projects=len({r.project for r in M["trace"]}))
    else:
        emit(log, "empty trace")
    return log
