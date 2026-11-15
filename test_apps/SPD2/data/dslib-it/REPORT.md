# DSLIB IT: changes made and limitations

## Changes made

The importer was rewritten and the files regenerated from the workbooks as published (DSLIB v3.4):

1. Synonyms: activity names that differ across projects for one kind of work taken as one step (below).
2. master_process.json: jobs, steps, an arc per product (one per producing step), metrics duration and cost.
   Each arc has a `basis`: "data" where a schedule links the steps, or a step's work reaches go live (an exit), "reasoned" where the importer adds it (the order within each job and between phases).
3. resources.json: one agent per employee per project, qualified for the jobs it did.
4. master_specification.json: finer, so each node's steps are ones every project selecting it ran.
5. selections.json and trace.json: one selection per project, one record per activity and metric.
6. dataset.json: duration accumulates along paths.

Not done: baseline durations as given forecasts, and a world.json to Play new projects.

## Limitations

1. Employees are lettered per project, so experience cannot build up across projects: no eligibility or floors.
2. No size or scope descriptors, so forecasts cannot scale.
3. Five projects, and 6 of 18 steps occur in only one: too little to fit or to judge calibration.
4. Who could have taken a job, and why one did, is not recorded: self-selection only from the outcome.
5. Jobs are inferred from activity names, and employees span several in one project.
6. An activity named more than once is several employees on it, one row each, not recurring work.
7. The schedules link activities only in part, timing the rest by fixed dates: 29 of 53 arcs are reasoned.
8. Products are milestones merging several steps' outputs, some with no producing step.
9. Cost is hours times rate, so adds nothing to duration.
10. 26 of 60 actuals equal the plan exactly, and several are 2 to 7% of it: partly the plan, not measured.
11. Risk profiles are all ProTrack's default, so no expert spread.
12. No tools or materials.
13. Whether the five projects share one organisation is not stated.
14. No hidden rule, so new projects can only be simulated from a rule fitted to these five.

## Synonym assumptions

Judged from the names and phases alone (importer, SYNONYMS). Projects in brackets.

- analysis - business analysis → Business analysis [11, 20, 21]
- design - technical design → Technical design [15, 20]
- design - user interface design → User interface design [21]
- development - bugfixing → Bug fixing [22]
- development - bugfixing and support → Bug fixing [11]
- development - build ISP → Coding [22]
- development - coding → Coding [11, 15, 20, 21]
- development - technical assembly → Technical assembly test [21]
- development - technical assembly test → Technical assembly test [22]
- full handover → Full handover to UAT [21, 22]
- implementation - put in production → Deploy to production [15]
- test ICT - test coordination → Test coordination [15, 21, 22]
- test ICT - test execution → Test execution [15, 21, 22]
- test ICT - test preparation → Test preparation [15, 21, 22]
- uat - test execution support → UAT support [22]
- uat - test support → UAT support [15]
