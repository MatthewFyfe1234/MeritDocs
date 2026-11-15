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
| Metric | coded |
| Job | coded |
| Mapping | coded |
| Selection | coded |
| Derivation | coded |
| Extension | coded |
| Agent | coded |
| Tool | coded |
| Material | coded |
| Trace | coded |
| Exposure | coded |
| Eligibility | coded |
| Forecast | coded; numerical metrics only |
| Accumulation | coded; numerical metrics only |
| Contract | coded |
| Project | coded |

## Issues in the definitions

- Metric: a categorical metric cannot be summed, run along a path, or read at a percentile, so
  Accumulation and Forecast (Q_r) apply only to numerical metrics as written. The code forecasts and accumulates numerical metrics only, skipping categorical ones.

- Within-job products (main concern on the horizon). Accumulation assumes an order between a job's steps,
  the one performed or one ordering of all the project's steps, with the assumed order left open in Scope. Still to decide:
  whether products passed within a job must be stated (on the platform they are implicit, as a floor plan
  passing to the sections), since leaving them implicit may hide steps with no real dependency.

- Forecast: the code lets a given forecast be a function of descriptors (an estimate that scales with size); the definition or Scope could say "possibly a function of descriptors".

## Building the DSLIB master

- Reshape the process JSON to the model's form: jobs, steps with their job, arcs {product, src, tgt}, metrics.

- Master process: no merged milestone products. Each step's product goes on its own arc to each step that needs it (technical design, UI design and ISP design separately, not one Validated design), so a project lacking a step loses only that step's product.

## Simulation (to build)

A world outside business/ that runs projects through the model: it supplies everything the model leaves open. For illustration and verification of the model, not evaluation (its hidden rule is ours).

Principles:

- Projects run one at a time: finite resources and overlap stay outside, as in the paper's Scope.
- Trace and selections kept in the dataset, one per operational domain (data/<id>/trace.json,
  selections.json).
- Fixed seed, so runs are reproducible.
- The dialog shows the current state only: the dataset's when no project is shown, the project's alone while one is selected or run, each change replacing it. A run's events in order make up its story, a separate account. Each item adds its state lines.

In build order:

1. Run one project, still to do:
   - One agent holding two contracts in a project (a4 qualifies for j1 and j2): the policy avoids it where it can, but where forced, accumulation does not order the agent's steps across the jobs.
2. Forecasts run optimistic early: over 12 Autoplay projects from the two seeds, 34% of steps exceeded
   the forecast at r 0.8, against the 20% allowed (chance alone, about 9%). With few points per step,
   resampling the fit's residuals understates the spread, and a fit too short of points for its
   descriptors falls back to past values, so p2 at d 9 was forecast as at d 3 or 4. To weigh: widen the
   spread for small samples (a prediction interval rather than bare residuals).
3. Hidden rule, richer: learning (agents improve with experience at a step, so eligibility affects
   outcomes), a categorical split, agent differences (speed in world.json), product formulas, and a second pass on the self-selection policy (simulation/policy.py, random for now).
4. Selection builder, fuller: several instances of one node, each with its own values.
5. Policy comparison: the same world with and without floors, and at different r.
6. Measures and story count only projects run since the ledger began (data/<id>/ledger.json): the seeds and earlier runs have no forecasts noted.

## Presentation (to build, once the panels draw from the model)

- Mapping lines animated as a selection is built or played: each instance added draws its lines in, then its steps join the project's process (hover lines and the faded project view are built).

## Skipped

## For the evaluation (DSLIB)

- Post go-live support excluded: aftercare, to be recorded as metrics against the steps it follows.

Synthesised, not in the data:

- Skillsets (jobs), inferred from activity names. Qualifications Q(a) are not recorded.
- Order of steps within each job, by reasoning where the schedules leave it open.
- Product names, from milestone names.
- The master specification, its nodes and their mapping to steps.

Changes required and limitations: see data/dslib-it/REPORT.md.
