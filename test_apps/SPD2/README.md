# SPD2

An implementation of the model in the SPD paper (Stigmergic Project Delivery), tested against real
datasets. The model's code uses the paper's terms and notation throughout.

## Folders

```
app.py                  starts the app: python app.py, then open http://localhost:8000
business/               the model
  structure/            the static, deterministic parts
    specification.py      master specification T, descriptors, selection
    process.py            master process G, products and their formulas, metrics, jobs
    mapping.py            mapping mu from spec nodes to steps
    derivation.py         a project's steps and process, a job's inputs and outputs
    resources.py          agents, tools, materials
  analysis/             the parts built on the trace
    trace.py              execution records
    experience.py         exposure, experience, eligibility
    forecasting.py        forecasts
    accumulation.py       how forecasts combine over jobs and paths
  project.py            contracts offered to eligible agents, and the project
  checks.py             the conditions a dataset must meet, checked once on loading
simulation/             the world: runs projects through the model (outside it)
  events.py             a run's events, each a change in the project's state
  messages.py           the dialog's message for each kind of event
  world.py              the hidden rule giving each step's outcome (a dataset's world.json)
importers/              one per dataset: reads its raw source and writes its JSON files
data/<dataset>/         one folder per dataset
  dataset.json            its name and importer
  source/                 the raw data, as obtained
  *.json                  the files the model reads
  REPORT.md               what the dataset needs to run, and what it cannot support
presentation/           the web page that draws the model (display only), plain ES modules, no build
  index.html              the panels and the dialog, markup only
  styles.css              its styles
  main.js                 start-up: the dataset tabs, showing a dataset and a project
  state.js                the page's shared state
  panels.js               Agents, Tools and materials, the master specification, the Projects drawer
  process.js              the master process panel
  run.js                  building a project; Play, Step, Reset and Autoplay
  animate.js              a run played back on the board
  dialog.js               the Dialog: Now, Story and Measures
  util.js                 small helpers
```

Only `business/` holds the model. The importers prepare data for it, and the presentation only draws it.

## Inside a model file

Each file in `business/` has two parts, divided by a full-width `# -----` line.

- **Above the line: definitions.** One class per term in the paper, holding only its fields, with
  the paper's symbol in a comment. `@dataclass` before a class lets Python write the routine code for
  a class that is just named fields.
- **Below the line: functions.** What the model does with the definitions, such as reading them from
  a dataset's JSON. The model's files take their data as given: the paper's conditions on it (a tree,
  an acyclic graph) are checked once, in `checks.py`.

`None` stands for the paper's star (outside the process) where it appears, named `OUTSIDE`.

## Importing a dataset

```
python -m importers.import_dslib
python -m importers.import_mimic
```

The first reads `data/dslib-it/source/` and rewrites the JSON files in `data/dslib-it/`. The second reads the
MIMIC-IV demo's tables in `data/mimic-iv-demo-common-cases/` and rewrites `data/mimic-common/`.
