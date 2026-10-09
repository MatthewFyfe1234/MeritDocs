# Open questions (for resolution; not part of the paper)

## Prose must catch up with the new formalism (highest priority)

The definitions now diverge from the prose written against the older model. Reconcile:

- **Eligibility vs selection.** Gate = qualification (holds the skillset); experience
  = selection stimulus (`n_a`). Still describing experience-as-eligibility:
  Introduction ("the same trace fixes which agents are eligible"; "the relevant
  experience ... defined by the derivation"); Related work, Coordination mechanism
  ("filtered to an eligible set by matching recorded experience"); Related work,
  "Experience-based ranking within eligibility" (recast as selection, not the gate);
  Worked examples (Panel 4 "≥20 recorded framing instances"; the anaesthetist's
  "record of comparable cases" — these are stimulus, not gate).
- **Contract granularity.** The model fixes the unit as a job, `C(j)`. Panel 4 attaches
  it per step; align to the job. (Intro's "per skillset" is now fine, since job =
  skillset.)

## Formalisation gaps (referee-level, from the implementation review)

- **Open classes uncharacterised.** `θ` is "left open" without saying what class it
  ranges over or what it must satisfy; likewise `≈` (needs a metric and threshold) and
  `fit` (needs a type). Characterise the admissible classes.
- **`D` / `M` overloading (invasive).** `D` is both the descriptor schema
  `(d_1, …, d_k)` and bound values in `τ`/`forecast`; `M` is the metric vector, a
  realised observation, and the predicted distribution `M(s)`. Separate schema from
  valuation, and random variable from realisation from distribution. Touches most
  equations.

## Still open — terminology

Job and skillset are now the same partition (`req(s) = J(s)`), so use one surface term
consistently across prose and figures (the figures say "Skillset", the model says
"job").

## Still open — smaller

- **Symbol clash (figures):** `A` (the tree's arc set in `T = (N, A)`) vs the
  component labelled `A` in Figures 1-4. Relabel one or the other.
- **Proposition (optional):** state the deterministic (mapping) + stochastic
  (descriptor/forecast) pair as a proposition if formal results are wanted.

## Surplus to the core argument (review flags, revisit when finalising)

- Introduction, paras 3-4 re-explain the full model mechanics that Section 3 then
  formalises; could preview more briefly.
- Related work, the IFC subtype enumeration is heavy for its one point (SPD treats
  labour as an agent, not an allocatable resource); compressible.
- Related work, the software-shortcomings paragraph (`masood`, `conoscenti`,
  `jorgensen`) is motivating but tangential; a sentence may do.
- Worked examples: two full examples is the biggest length item. Consider whether
  the patient example earns its length or could shrink to just the
  extension-during-execution point the wall-frame does not show.
- Introduction roadmap's description of Section 5 ("outlines the evaluation this
  claim invites ...") is stale against the current Evaluation section.
