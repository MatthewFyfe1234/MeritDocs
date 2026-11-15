# Settled points (don't re-raise from a review)

Check a review against this list before triaging. Each point is decided, with the reason after the colon.

## Known to-dos, tracked in NOTES

- Empty evaluation, blank Limits, Conclusion "TODO": the Section 5 rewrite.
- Path rule (⇝ dropping inputs through skipped steps), ⋆ as both source and sink, the negative-scan loop: Formalisation items or open decisions.
- MIMIC date-shifting, build gaps, demo without notes: Section 5 items.
- The clinical example's dosing, pooling and "slowest agent": NOTES items.

## Decided

- A step serves every instance, with no per-instance records: the model doesn't decipher which instance a record belongs to, and an instance arriving after its step has run is Section 6's "too late" case.
- No caveat on contribution 2 ("completed steps and their records stay valid"): limitations don't go in the contributions, and the records do stay valid.
- Step-level forecasting isn't a named contribution: a step isn't a universal unit; the distinction is the reference class at the operation, with records attributed.
- Condition nested under anatomy in the example, a descriptor in MIMIC: the nesting is the intended shape, and MIMIC records diagnoses only at discharge, without anatomy (Section 5 says so).
- "Is it stigmergy?": the offer agents act on is a reading of the trace, not an instruction (related work, Stigmergy).
- "Interdependent jobs of whole projects": kept, since delegate MAS coordinate ongoing production on current intentions, not projects on a history of past executions.
- The model neither schedules nor allocates: it sets eligibility and forecasts, and any rostering or scheduling belongs to an implementation.
- Project control is a by-product, ◐ in Table 1: not formalised separately (Section 3).
- Jørgensen dropped: about estimation accuracy, not who does the work.
- "Section 3.2": headings are numbered in the rendered paper, and Illustration is 3.2.
- Vanhoucke's account and both PBWD contrasts in the derivation paragraph: kept deliberately (likely reviewers).
