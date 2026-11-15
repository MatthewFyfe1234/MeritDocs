# Open items (not part of the paper)

## Section 5 rewrite

- **Full MIMIC-IV.** Rebuild Feasibility's MIMIC paragraph on the full database in place of the open demo, with every figure (patients, admissions, nodes, steps, jobs, products, events, gaps) rerun.
- **Build gaps.** `in(j)` now follows paths through unselected steps. Rerun the 204 admissions (74%) with a contract receiving no product and the 829 records outside the derived process, and analyse them, not one sentence. Diagnose the causes (the path rule, what the demo doesn't record, nursing steps the master lacks), so a reviewer doesn't read them as the master failing to fit the data.
- **Forecasting test.** The 2×2: whole project or accumulated from steps, with or without descriptors, each scored against the same outcome, with calibration at r in every cell. Run in the simulation (known world) and on full MIMIC-IV (step times). If it holds, the abstract can claim forecasting improves, not only that it is possible.
- **Forecasting when a step is ready.** Compare forecast and actual start times at converging steps using MIMIC timestamps. Word it as a lower bound, since unclaimed upstream jobs are ignored.
- **DSLIB.** Add the DSLIB IT build to Feasibility (the reviewer's requested data), and what it cannot test to Limits (`test_apps/SPD2/data/dslib-it/REPORT.md`).
- **Limits.** Findings are not nodes, so selection driven by findings is not exercised.
- **MIMIC demo has no notes.** The demo excludes free-text notes (radiology reports are in the credentialed MIMIC-IV-Note), yet the clinical example reads its trace from triage and assessment notes and the imaging report, and Feasibility calls the trace a by-product of documentation. The demo is also the first 100 qualifying subjects, not a random sample. Say both in Section 5, or use MIMIC-IV-Note with the full build.
- **MIMIC date-shifting.** Each patient's dates are shifted by a random offset, so a caregiver's work can't be ordered across patients. Check the documentation; if so, validity tests 4 and 5 (exposure predicts performance, floors improve allocation) can't run on MIMIC (anchor_year_group gives only 3-year windows) and need another source. Tests 1–3, on 29 admissions in three case types, have almost no power. Say both before a reviewer does.
- **Experience floors.** Rostered staff give no comparison allocation. Test in the simulation, or drop the claim.
- **Coordination.** Allocation is stigmergic by default, a policy replacing it only at the interface (Contract). The clinical data are rostered, the policy case, so say in Limits the default isn't tested on real data, or test self-selection in the simulation.

## Formalisation

- **Path rule.** u (job A) → unselected w (job A) → v (job B) gives no u ⇝ v, so the input drops from `in(j)`. Justify or loosen, and qualify the introduction's "whichever operations a project skips". Consider a coherence check: every input of a selected step comes from a selected step or ⋆. A product passing through a skipped step assumes the step forwards its input unchanged, which only holds where input and output types match; state it formally.
- **Forecast defined twice.** `F_m(θ(D), s, c)` and `forecast(s, m, r, c) = Q_r(fit(R)(·))` both define the forecast, and θ is absent from the second. Merge them or state how they relate.
- **Shared step forecast with its count.** Project 3 forecasts two panels as one 2700mm, 7-stud panel, but the definition says "their number included" and Stack Panel and per-panel setup happen twice. Forecast with the count (ties to the open Stack Panel scaling decision).
- **Job duration when jobs interleave.** Say whether a contract's time is the agent's active time or the elapsed span (the surgeon's steps sit either side of the anaesthetist's).
- **Lower is worse.** `Q_r` assumes more is worse; for a metric like yield the conservative reading is `Q_{1-r}`.
- **Recency.** Exposure only accumulates. Allow a recent window (precedent: 14 CFR 61.57 pilot recency; surgical privileges by annual volume, e.g. Leapfrog's standard).
- **Attributed values in the trace.** Flag a record as measured or attributed, so attributed values (Mark Out and Lay Out's split) aren't fitted as data.
- **Pooling sentence.** The Project definition's "the contract over the agents eligible for it and the rest with the empty context" is hard to follow, and step and contract forecasts can disagree within a project. The "slowest agent" reasoning for the project's ∅ applies equally to the contract's pooling over Elig(j); explain why they differ.
- **Performance floor wording.** Eligibility looks back, but the floor reads the agent's forecast. Say it reads the agent's records at the job's descriptors, through its forecast (raw past values mix instance sizes).
- **Notation summary.** One paragraph or table before the definitions.

## Framing and related work

- **Contribution.** The introduction now matches the line after Table 1 (forecasting and eligibility read from a trace held on a derived process); align the abstract's "aligned by construction" and decide whether the Table 1 line stays.
- **Table 1 scoring.** Self-scored on chosen columns; consider a second scorer.
- **Expressiveness limits.** The mapping takes nodes, so a descriptor value can't trigger a step (noggins above a wall height must be a node), and there are no cross-tree requires/excludes constraints. Say so in Limitations rather than behind "the selection is coherent".
- **Sole author.** "We" and "our knowledge" with one author; check the venue.
- **Related work.** Add CAPP (feature-based generative process planning), arguably the closest precedent. PPR
  models and hierarchical Bayesian forecasting are optional.
- **Run-in bold leads.** Network formalisms still has a label (undecided: "Among network formalisms, SPD's process graph…"). Consider subsections if leads aren't enough (specification and process; forecasting and control; resources and coordination).
- **ERP recording.** "Manufacturing execution and ERP systems built to ISA-95 record actual times…" still has only the standard cited. Add an MES or ERP source, or cite the relevant Part 1 clauses.
- **Bibliography housekeeping.** DOIs on all entries that have one: a Crossref sweep (rate-limited, so pace it) found kang1990, hegge1991, vanderaalst2005, fips183, kelley1959, marquezchamorro2018, malcolm1959, wauters2017, batselier2016, batselier2015, holvoet2007, kellogg2020, vanderaalst2016, plus the RLI paper (10.48550/arXiv.2510.26787); the rest still to check. Proceedings need series, volumes and editors (holvoet2007: LNCS 4389, eds. Weyns, Van Dyke Parunak and Michel; the LNBIP volume 256 entry; AAAI Press for the AAAI entry). Open questions: PRINCE2 2009 vs the 2023 7th edition; Lipke's pages (March 2003 confirmed, pages not); Kahneman and Tversky's 1979 TIMS original (pages unconfirmed) vs the 1982 reprint; Goodhart alongside Campbell.
- **Introduction's gap.** "Assumed or generic distributions, or project-level history" overstates it, given the operation-level standard data and resource-aware predictive monitoring Section 2 cites.
- **Discussion length.** Reviewer suggests cutting it by about half (carbon, pay, shared instrument, AI agents).

## Terminology and figures

- **Optional: selection-instance figure.** A figure showing the selection as a forest of node instances raised above the flat master specification (B instanced twice, C unselected), with a passage on the process's corresponding structure and why the model doesn't reconstruct it from the trace. Drafted and commented out at the end of the Illustration in `the-model.tsx`, with the figure as `SelectionInstanceFigure` in `figures.tsx`. Restoring it as Figure 5 means renumbering Section 4's figures (5 to 9 become 6 to 10). Its process passage describes step instances, which the model no longer has, so it needs rewriting first.
- **Symbol clash.** `A` (arc set in `T = (N, A)`) vs component `A` in Figures 1-4.
- **Clinical example.** Re-offering the anaesthetist's job mid-operation reads as unrealistic, and choosing a dose from an observational fit will worry clinical reviewers. Consider a non-dosing metric or decision support. Also: choosing cisatracurium mid-operation implies no relaxant at induction; the material chosen "at execution rather than fixed by the mapping" puts the key decision outside derivation (a limitation, not a strength).
- **Job terms.** "Job", "skillset", "trade or role" and "contract" overlap. Define job once at master and once at project level, and use those terms throughout (pair with the "Specification" item).
- **"Specification" for a project's selection.** Several uses mean the project's instance, not the master (search the sections for "specification"). Change case by case, rewording where "selection" reads oddly ("This panel, 1200mm wide…"). Keep general comparisons ("derived from a specification") and the product "the panel's specification". Where the master is meant, say "master specification".

## Discussion

- **Section 6's `X_m^t`.** Could refer to `X_m(⋆)`, the project's accumulated value, now that Accumulation defines it.
- **Portfolio forecasting.** Forecasts across projects sum by job `J(s)` over time, giving demand on each skillset against the agents eligible for it, resource planning above the project layer. Percentiles don't add: combine the distributions, then take the percentile.

## Deferred

- Conclusion, after the Section 5 rewrite.
- Implementation and clinical build as a contribution (feasibility only), after Section 5.
