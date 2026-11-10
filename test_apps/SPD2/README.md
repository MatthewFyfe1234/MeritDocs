# SPD2

An implementation of the model in the SPD paper (Stigmergic Project Delivery), tested against real
datasets. The model's code uses the paper's terms and notation throughout.

## Folders

```
app.py                  starts the app: python app.py, then open http://localhost:8000
business/               the model
  structure/            the static, deterministic parts
    specification.py      master specification T, descriptors, selection
    process.py            master process G, products, metrics, jobs
    mapping.py            mapping mu from spec nodes to steps
    derivation.py         a project's steps and process, extension, repetition
    resources.py          agents, tools, materials
  analysis/             the parts built on the trace
    trace.py              execution records
    experience.py         exposure, experience, eligibility
    forecasting.py        forecasts, accumulation
    contracts.py          contracts offered to eligible agents
importers/              one per dataset: reads its raw source and writes its JSON files
data/<dataset>/         one folder per dataset
  dataset.json            its name and importer
  source/                 the raw data, as obtained
  *.json                  the files the model reads
  LIMITATIONS.md          what the dataset cannot support
presentation/           the web page that draws the model (display only)
```

Only `business/` holds the model. The importers prepare data for it, and the presentation only draws it.

## Inside a model file

Each file in `business/` has two parts, divided by a full-width `# -----` line.

- **Above the line: definitions.** One class per term in the paper, holding only its fields, with
  the paper's symbol in a comment. `@dataclass` before a class lets Python write the routine code for
  a class that is just named fields.
- **Below the line: functions.** What the model does with the definitions, such as reading them from
  a dataset's JSON and checking them against the paper's conditions (a tree, an acyclic graph).

`None` stands for the paper's star (outside the process) where it appears, named `OUTSIDE`.

## Importing a dataset

```
python -m importers.import_dslib
```

reads `data/dslib-it/source/` and rewrites the JSON files in `data/dslib-it/`.
