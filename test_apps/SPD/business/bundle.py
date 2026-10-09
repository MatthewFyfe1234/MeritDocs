"""Bundle the model + trace into presentation/model_bundle.js.

Emits `window.SPD = {...}` as a plain .js file so the walkthrough page can load
it with a <script src> and run from file:// (no server, no fetch). Run after the
trace exists (python main.py trace).

Run:  python main.py bundle      (or: python business/bundle.py)
"""

import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
DATA = HERE.parent / "data"
OUTPUT = HERE.parent / "outputs"
PRESENTATION = HERE.parent / "presentation"


def load(name, base=DATA):
    with open(base / name, encoding="utf-8") as fh:
        return json.load(fh)


def main():
    bundle = {
        "spec": load("master_specification.json"),
        "process": load("master_process.json"),
        "agents": load("agents.json"),
        "trace": load("trace.json", OUTPUT),
    }
    PRESENTATION.mkdir(exist_ok=True)
    text = "window.SPD = " + json.dumps(bundle, indent=2) + ";\n"
    with open(PRESENTATION / "model_bundle.js", "w", encoding="utf-8") as fh:
        fh.write(text)
    print(f"Wrote presentation/model_bundle.js ({len(bundle['trace']['records'])} trace records)")


if __name__ == "__main__":
    main()
