# Open questions (for resolution; not part of the paper)

## Formalisation gaps (referee-level, from the implementation review)

- **Open classes uncharacterised.** `θ` is "left open" without saying what class it
  ranges over or what it must satisfy; likewise `≈` (needs a metric and threshold) and
  `fit` (needs a type). Characterise the admissible classes.
- **`D` overloading.** `D` is both the descriptor schema `(d_1, …, d_k)` and bound
  values in `τ`/`forecast`. Separate schema from valuation.

## Still open — terminology

Job and skillset are now the same partition (eligibility tests `j ∈ Q(a)`), so use one surface term
consistently across prose and figures (the figures say "Skillset", the model says
"job").

## Still open — smaller

- **Symbol clash (figures):** `A` (the tree's arc set in `T = (N, A)`) vs the
  component labelled `A` in Figures 1-4. Relabel one or the other.
- **Proposition (optional):** state the deterministic (mapping) + stochastic
  (descriptor/forecast) pair as a proposition if formal results are wanted.

## Surplus to the core argument (review flags, revisit when finalising)

- Related work, the IFC subtype enumeration is heavy for its one point (SPD treats
  labour as an agent, not an allocatable resource); compressible.
- Related work, the software-shortcomings paragraph (`masood`, `conoscenti`,
  `jorgensen`) is motivating but tangential; a sentence may do.
- Worked examples: two full examples is the biggest length item. Consider whether
  the patient example earns its length or could shrink to just the
  extension-during-execution point the wall-frame does not show.
