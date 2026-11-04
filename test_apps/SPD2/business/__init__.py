"""SPD2 business layer.

Each dataset lives in data/<id>/: dataset.json (its name and the module that derives it),
source/ (the raw data), and the derived model files. Each derive module reads its own
source and writes the model with write_model().

list_datasets()   the datasets, as [{id, name}]
load_model(id)    one dataset's model
"""

import json
from pathlib import Path

DATA = Path(__file__).resolve().parent.parent / "data"
PARTS = ["agents", "inventory", "master_specification", "master_process"]


def dataset_dir(dataset_id):
    path = (DATA / dataset_id).resolve()
    if path.parent != DATA or not (path / "dataset.json").is_file():
        raise KeyError(dataset_id)
    return path


def list_datasets():
    return [{"id": d.name, "name": read(d / "dataset.json")["name"]}
            for d in sorted(DATA.iterdir()) if (d / "dataset.json").is_file()]


def load_model(dataset_id):
    path = dataset_dir(dataset_id)
    model = {part: read(path / f"{part}.json") for part in PARTS}
    return {
        "agents": model["agents"],
        "inventory": model["inventory"],
        "specification": model["master_specification"],
        "process": model["master_process"],
    }


def write_model(dataset_id, **parts):
    path = DATA / dataset_id
    for part, obj in parts.items():
        if part not in PARTS:
            raise ValueError(f"unknown model part {part!r}")
        (path / f"{part}.json").write_text(json.dumps(obj, indent=2) + "\n", encoding="utf-8")


def read(path):
    return json.loads(path.read_text(encoding="utf-8"))
