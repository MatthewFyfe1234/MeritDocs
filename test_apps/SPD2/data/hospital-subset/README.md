# Hospital subset: common case types

The demo's three common, repeating case types as their own set of projects, for a limited simulation:

| Type | Admissions | Pathway |
|---|---|---|
| Coronary bypass | 11 | planned surgery: ward, theatre, ICU, ward |
| Renal failure | 7 | emergency medical: ED, then ward |
| Sepsis | 11 | emergency medical with ICU; the least consistent |

The types are authored in [subset.json](subset.json): an admission joins a type when its billing group (HCFA DRG)
starts with one of the type's groups. Each admission is one spec, the whole stay in one phase.

**The master is `models/hospital`.** This folder adds projects only, built by the hospital scripts. It imports them and,
inside its own run, gives them this case list in place of the test cases and writes their output here. Nothing in
`models/hospital` is changed or written, and fixes there carry over on the next run.

## Build

```
python models/hospital-subset/subset.py      # -> models/hospital-subset/out/
```

## Run (SSMS), after the master and its test cases

1. `out/specs.sql` (Results): the 29 specs and their spec nodes
2. `out/assignments.sql` (Network): replaces these specs' assignments and what hangs off them
3. `out/assignment_outputs.sql`
4. `out/execution_materials.sql`
5. `out/execution_properties.sql` (readings; the property definitions are the master's `out/authorisation/execution_properties.sql`)
6. `out/assignment_properties.sql`

`assignment_outputs.sql` (about 16 MB) and `execution_properties.sql` (about 11 MB) may be too big to open in SSMS.
If so, run them with `sqlcmd -S <server> -E -i <file>`.

`cases.json` lists the specs: number, type, admission, title and spec node count.

Spec names are `<n>. Case <admission>: Common cases, <type>: ...`, so they don't clash with the test cases' specs, even
for the two admissions that are also test cases (27089790 and 29279905).
