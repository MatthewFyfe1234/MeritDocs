# SPD2 notes (chopping board)

Temporary. Delete items once resolved or moved into the paper.

## Definitions

In the paper's order (the-model.tsx).

| Definition | Status |
|---|---|
| Product | agreed |
| Master specification | coded |
| Descriptor | coded |
| Master process | coded |
| Metric | coded; values y wait for Trace |
| Job | coded |
| Mapping | coded |
| Selection | coded |
| Derivation | |
| Extension | |
| Repetition | |
| Agent | |
| Tool | |
| Material | |
| Trace | |
| Exposure | |
| Eligibility | |
| Forecast | |
| Accumulation | |
| Contract | |
| Project | |

## Issues in the definitions

- Metric: a categorical metric cannot be summed, run along a path, or read at a percentile, so
  Accumulation and Forecast (Q_r) apply only to numerical metrics as written. Check when we reach them.

- Within-job products (main concern on the horizon). Accumulation chains a job's steps in executed order,
  or a topological sort before execution, with the assumed order left open in Scope. Still to decide:
  whether products passed within a job must be stated (on the platform they are implicit, as a floor plan
  passing to the sections), since leaving them implicit may hide steps with no real dependency.

## Building the DSLIB master

- Reshape the process JSON to the model's form: jobs, steps with their job, arcs {product, src, tgt},
  metrics.

- Master process: no merged milestone products. Each step's product goes on its own arc to each step
  that needs it (technical design, UI design and ISP design separately, not one Validated design), so a
  project lacking a step loses only that step's product.

## Skipped

## For the evaluation (DSLIB)

Changes to the source data:

- Activity names unified as synonyms, edited in place in the workbooks (Baseline Schedule). Originals
  backed up outside the repo. Projects in brackets.
  - analysis - business analysis -> Business analysis [11, 20, 21]
  - design - technical design -> Technical design [15, 20]
  - design - user interface design -> User interface design [21]
  - development - bugfixing -> Bug fixing [22]
  - development - build ISP -> Coding [22]
  - development - coding -> Coding [11, 15, 20, 21]
  - development - technical assembly -> Technical assembly test [21]
  - development - technical assembly test -> Technical assembly test [22]
  - full handover -> Full handover to UAT [21, 22]
  - implementation - put in production -> Deploy to production [15]
  - test ICT/ict - test coordination -> Test coordination [15, 21, 22]
  - test ICT/ict - test execution -> Test execution [15, 21, 22]
  - test ICT/ict - test preparation -> Test preparation [15, 21, 22]
  - uat - test execution support -> UAT support [22]
  - uat - test support -> UAT support [15]
- The .p2x (ProTrack) files still carry the original names.
- Post go-live support excluded: aftercare, to be recorded as metrics against the steps it follows.

Synthesised, not in the data:

- Skillsets (jobs), inferred from activity names. Qualifications Q(a) are not recorded.
- Order of steps within each job, by reasoning where the schedules leave it open.
- Product names, from milestone names.
- The master specification, its nodes and their mapping to steps.

Limitations: see data/dslib-it/LIMITATIONS.md.
