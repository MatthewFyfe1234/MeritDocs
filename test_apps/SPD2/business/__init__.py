"""SPD2 business layer.

Each dataset lives in data/<id>/: dataset.json (its name, its importer if any, and which metrics
accumulate along paths), source/ (the raw data, if any), and the model's JSON files, PARTS. An importer
(in importers/) reads its dataset's source and writes the JSON files with write_model().

list_datasets()        the datasets, as [{id, name, credit}]
load_model(id)         one dataset's model, checked (see checks) and read
load_derivation(id, i) project i's process, derived from its selection
load_project(id, i, r) project i of a dataset (see project)
offer(M, selections, i, r)  project i offered from a loaded model
delivered(M, i, order) project i's recorded values, accumulated (see delivery)
experience(M)          each agent's experience so far at each step
"""

import json
from pathlib import Path

from business.analysis.accumulation import TIME
from business.analysis.experience import experience_table
from business.analysis.trace import read_trace
from business.checks import check_dataset
from business.project import delivery, project
from business.analysis.forecasting import DEPENDS, descriptor_values
from business.structure.derivation import derive
from business.structure.mapping import read_mapping
from business.structure.process import evaluate, read_master_process
from business.structure.resources import read_resources
from business.structure.specification import read_master_specification, read_selection

DATA = Path(__file__).resolve().parent.parent / "data"
PARTS = ["master_specification", "master_process", "resources", "selections", "trace", "floors",
         "credited", "given"]
REQUIRED = ["master_specification", "master_process"]
OPERATORS = {"time": TIME}                       # the operators a dataset.json may name for a metric


def dataset_dir(dataset_id):
    path = (DATA / dataset_id).resolve()
    if path.parent != DATA or not (path / "dataset.json").is_file():
        raise KeyError(dataset_id)
    return path


def list_datasets():
    """The datasets, each with its name and its credit (its source and citation), if any."""
    return [{"id": d.name, **{k: v for k, v in read(d / "dataset.json").items() if k in ("name", "credit")}}
            for d in sorted(DATA.iterdir()) if (d / "dataset.json").is_file()]


def dataset_info(dataset_id):
    """A dataset's dataset.json: its name, description, importer, credit and settings."""
    return read(dataset_dir(dataset_id) / "dataset.json")


def load_model(dataset_id):
    """A dataset's model: its JSON parts checked, then read. A part other than REQUIRED may be absent."""
    path = dataset_dir(dataset_id)
    parts = {part: read(path / f"{part}.json") for part in PARTS if (path / f"{part}.json").is_file()}
    for part in REQUIRED:
        if part not in parts:
            raise ValueError(f"dataset {dataset_id!r} has no {part}.json")
    try:
        check_dataset(parts)
    except KeyError as field:
        raise ValueError(f"dataset {dataset_id!r}: a JSON file is missing the field {field}") from None

    agents, tools, materials = read_resources(parts.get("resources", {}))
    settings = read(path / "dataset.json")
    G = read_master_process(parts["master_process"])
    return {
        "T": read_master_specification(parts["master_specification"]),
        "G": G,
        "mu": read_mapping(parts["master_specification"]),
        "agents": agents,
        "tools": tools,
        "materials": materials,
        "selections": {i: read_selection(tree) for i, tree in parts.get("selections", {}).items()},
        "trace": read_trace(parts.get("trace", [])),
        "floors": {x: (f["descriptor"], f["floor"]) for x, f in parts.get("floors", {}).items()},
        "credited": parts.get("credited", {}),           # n-tilde_a(s): {agent: {step: amount}}
        "given": parts.get("given", {}),                 # given forecasts: {step: {metric: value}}
        "operators": {m: OPERATORS[name] for m, name in settings.get("operators", {}).items()},
        "uses": read_uses(settings.get("uses", {}), G),
    }


def read_uses(given, G):
    """What influences each metric, from dataset.json's {metric: [input]}, where none is given all that
       the step's nodes carry: each input a descriptor, "node.descriptor", the metric it depends on, by
       its name, or a node, by its id, for the number of its instances (see distribution)."""
    uses = {}
    for m, inputs in given.items():
        if m not in G.metrics:
            raise ValueError(f"dataset.json uses: {m!r} is not a metric")
        uses[m] = {(DEPENDS, k) if k == G.metrics[m].depends else tuple(k.split(".", 1)) if "." in k else k
                   for k in inputs}
    return uses


def load_derivation(dataset_id, i):
    """Project i's process G_T-hat, derived from its selection."""
    M = load_model(dataset_id)
    return derive(M["selections"][i], M["mu"], M["G"])


def load_project(dataset_id, i, r):
    """Project i of a dataset, read at the r-percentile."""
    M = load_model(dataset_id)
    return offer(M, M["selections"], i, r)


def offer(M, selections, i, r):
    """Project i offered from a loaded model M, its selection among selections (a new project's
       included), read at the r-percentile, with the dataset's floors, credited experience and given
       forecasts. A given forecast is a number, or a formula over descriptors read at the step's values
       in this project, D(s, i), as an estimate that scales with size."""
    credited = {(a, s): n for a, steps in M["credited"].items() for s, n in steps.items()}
    given = {}
    for s, metrics in M["given"].items():
        D = descriptor_values(s, i, selections, M["mu"])
        for m, y in metrics.items():
            y = evaluate(y, D) if isinstance(y, str) else y      # a formula, None if not bound here
            if y is not None:
                given[(s, m)] = y
    return project(i, r, M["T"], M["G"], M["mu"], selections, M["agents"], M["trace"],
                   floors=M["floors"], credited=credited, given=given, operators=M["operators"],
                   uses=M["uses"])


def delivered(M, i, order=None):
    """Project i's Delivery from a loaded model M: its records, accumulated with the dataset's
       operators, its steps executed in order."""
    process = derive(M["selections"][i], M["mu"], M["G"])
    return delivery(i, process, M["G"], M["mu"], M["selections"], M["trace"], M["operators"], order,
                    M["floors"])


def experience(M):
    """Each agent's experience so far at each step, from a loaded model M, in what eligibility measures
       it in, with what is credited by hand (see experience_table)."""
    credited = {(a, s): n for a, steps in M["credited"].items() for s, n in steps.items()}
    return experience_table(M["agents"], M["G"].steps, M["trace"], M["floors"], credited,
                            M["selections"], M["mu"])


def write_model(dataset_id, **parts):
    path = DATA / dataset_id
    for part, obj in parts.items():
        if part not in PARTS:
            raise ValueError(f"unknown model part {part!r}")
        (path / f"{part}.json").write_text(json.dumps(obj, indent=2) + "\n", encoding="utf-8")


def read(path):
    return json.loads(path.read_text(encoding="utf-8"))
