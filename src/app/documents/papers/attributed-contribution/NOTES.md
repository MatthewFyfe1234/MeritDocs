# Trace-Based Production: outstanding

## Substantive additions

- **Value-added literature (Related Work strand).** Teacher value-added and risk-adjusted surgeon/hospital
  report cards decompose outcomes into agent effects net of descriptors and are used for selection and pay: TBP
  in all but name. Engage Chetty, Friedman & Rockoff (2014), Rothstein (2010, sorting critique = our "Choice of
  work"), Koedel, Mihaly & Rockoff (2015 review), the debate over whether rich controls make value-added unbiased,
  and the teacher-incentive experiments as evidence on crowding out, gaming and acceptance. Some of it cuts
  against us. Add Tadelis (2016) on reputation systems to the Stigmergy strand.
- **Identification proposition.** Replace assertion with a stated result and its assumptions: conditional
  exogeneity of assignment, additive (or log-additive) separability, connected bipartite graph, stationarity.
  Name TBP's specific violations and their observable signatures:
  - self-selection of instances on unrecorded difficulty;
  - choice of tools (better workers take the faster kettle / better combine);
  - eligibility thresholds supply connectivity but also sort by ability (Andrews et al. bias).
  The remedy is in the model (allocated share in 4.3; chosen vs allocated comparison in 6.2). Rewrite 4.2's
  separation paragraph and Proposition 3 to match the proposition.
- **Simulation with known ground truth (optional).** Show the estimator recovering (or failing to recover) known
  effects under endogenous choice and threshold sorting. The existing simulation code in `figures.tsx` is a
  starting point.
- **Allocated share as embedded randomisation at scale.** Scale fixes sparsity, not confounding (confounding by
  indication; Meng 2018 "big data paradox"). A small allocated share across a global commons is a large
  randomised sample within routine delivery, as in the learning health system and embedded pragmatic trial
  literatures. This makes the "all of healthcare" ambition rest on identification, not volume. Consent is now
  in 6.4 (Allocation).
- **Surrogate outcomes / extension condition.** Long-lag outcomes become chains of short-lag links through
  measured outputs received as materials, valid to the extent intermediate measures stand in for the final
  outcome (Prentice criteria). State the principle as general, the result here as covering short-lag steps, and
  separate what the companion construction solves (composition) from what it cannot (identification of late
  outcomes from sparse, non-independent records). Durability is the case where no intermediate may suffice.
- **Fixed mapping.** "A given node always necessitates the same steps" is strong where work is complex and
  mapping is context-dependent. Address or qualify.

## Needs a decision

- **Silo overclaim (Introduction).** "Closing that measurement gap removes what makes it a silo" overclaims: silos
  also exist for confidentiality, competitive advantage, tacit knowledge and specialisation. Agreed wording, so
  confirm before softening to the silo created by unobservability. Consider reframing via Holmström's
  informativeness principle (1979) and filtering of common shocks (1982): a better signal, not observability, so
  the agency problem shrinks rather than disappears.
- **Governance of the levers.** Eligibility's thresholds and weights are held in the commons; who sets the
  others (allocated share, resolution of competing selections, innovation decay rate) is unsaid. Ostrom is cited
  but her design principles are not applied. Also performativity: shared default scores and forecasts steer
  decisions formally left to the parties. One sentence here, or a fuller treatment left to the companion
  construction.
- **Proposition 2.** More normative than equilibrium: employers with bargaining power can make employer-held
  records a condition of hire. Soften "converge on" to "favours" or "makes available", or model it.
- **Tea innovation paragraph (4.7).** Review whether tea keeps an innovation paragraph or leaves innovation to
  the harvest example.

## To write

- **Conclusion** (placeholder).
- **Innovation figure** (4.6 note): innovation event, deliveries better than the prior forecast, gain across
  adopters credited to the innovator tapering over deliveries, forecast adjusting. Once drawn, shift the figure
  numbers hard-coded in the text ("Figures 4 and 5", "Figures 7, 8 and 9").
- **Implications** to prose: opening todo, the hosting note (points to 4.5), the residual-claim note.

## Checks

- Render check of all figures (1, 2, 4, 5, 7 to 9), especially the enlarged run in 7 to 9 and Figure 1's output arrow.
