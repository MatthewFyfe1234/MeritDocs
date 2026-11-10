# Open items (not part of the paper)

## Section 5 rewrite

- **Build gaps.** Test whether the `in(j)` definition (no product from an unselected step) explains the 204
  admissions with a contract receiving no product. Say what happens to the 829 records outside the derived
  process, given "aligned by construction".
- **Calibration test.** Run on full MIMIC-IV (step vs job vs admission level). If it holds, the abstract can claim
  forecasting is more effective, not only based on a record of each execution. Include a parametric step-level
  baseline (standard data, unit rates), since admission-level is a weak comparator, and report derivation coverage on
  held-out admissions.
- **Forecasting when a step is ready.** Compare forecast and actual start times at converging steps using MIMIC
  timestamps. If it holds, Section 2 can claim the "when" is more accurate, not only earlier.
- **Mock-data claim.** "Exercise every mechanism of Section 3 end to end" must hold for Repetition (node and step
  instances, new instances by extension), or exclude it.
- **MIMIC citations.** Check PhysioNet's terms: Goldberger et al. (2000) and Johnson et al. (2023).

## Formalisation

- **Within-job products.** Accumulation now chains a job's steps in executed order, or a topological sort before
  execution, with the assumed order left open in Scope. Still to decide: whether products passed within a job must be
  stated (on the platform they are implicit, as a floor plan passing to the sections), since leaving them implicit
  may hide steps with no real dependency.

## Terminology and figures

- **Optional: selection-instance figure.** A figure showing the selection as a tree of node instances raised above
  the flat master specification (B instanced twice, C unselected), with a passage on the process's corresponding
  structure and why the model doesn't reconstruct it from the trace. Drafted and commented out at the end of the
  Illustration in `the-model.tsx`, with the figure as `SelectionInstanceFigure` in `figures.tsx`. Restoring it as
  Figure 5 means renumbering Section 4's figures (5 to 9 become 6 to 10). Its process passage describes step
  instances, which the model no longer has, so it needs rewriting first.

- Symbol clash: `A` (arc set in `T = (N, A)`) vs component `A` in Figures 1-4.

## Deferred

- Conclusion, after the Section 5 rewrite.
- Implementation and clinical build as a contribution (feasibility only), after Section 5.
