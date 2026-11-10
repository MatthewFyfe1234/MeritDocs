# Paper conventions

Applies to every paper under `src/app/documents/papers/`. A paper's own `NOTES.md` holds its open items.

## Prose

- Write plain, compact academic prose. State the claim and its support, nothing more. No rhetorical turns, no
  addressing the reader, no signposting, no flourishes.
- Say what something is. Don't pad with what it isn't.
- Draft close to the author's own words. When in doubt, cut.
- Don't answer objections nobody in the paper has raised. Keep such replies for reviewers.
- No em dashes. Use commas, brackets or a new sentence.
- Colons and semicolons are fine where they fit, but use them sparingly.
- British spelling. No Oxford comma. "Data" is plural. "Outside the process", not "outside of".
- Refer to "Section 3" and "Figure 4", capitalised, by number.

## Lists and asides

- Put an inline list or gloss in brackets where commas would blur the sentence: "four fixed steps (Mark Out, Lay Out,
  Nail Frame and Stack Panel)", not "four fixed steps, Mark Out, Lay Out, Nail Frame and Stack Panel".
- Treat a secondary aside with a citation the same way: "(in the spirit of cardinality-based extensions [4])".
- Mark a list that isn't exhaustive: "and so on" or "and the like".

## Terms

- Use the model's own word for a concept, and the same word throughout. Don't introduce a synonym for variety.
- Don't coin a term or present one as established without a source.
- Avoid words the paper uses in another sense, such as "variance" in a paper about distributions.

### Italics

- Italicise a term the paper formally defines, once, where the introduction's narrative introduces it.
- Don't italicise terms the paper doesn't define, even central ones, or anything in the abstract.
- General emphasis is not a use of italics.

## Abstract

- No formatting and no author names beyond what is needed.
- Say what the paper does and what the model is. Keep comparison with other work to the end.
- Name areas of prior work rather than a partial list of methods.
- Claim only what the paper shows. Benefits not yet tested are stated as what the model provides, not as improvements.
- Anything claimed in the abstract should also appear in the introduction.

## Definitions and formalism

- One concept to a definition, with a bold run-in name.
- Definitions state what a thing is. Implications, examples and limitations go elsewhere.
- Don't state a result as a proposition unless it proves something the definitions don't already say.
- Keep notation only where it is used. Don't formalise an aside.
- Limitations of the model go in Limitations, not in the contributions.
- Give parallel objects parallel definitions, in the same order: what it breaks down, how its parts relate, its
  notation with the symbol for a single member ("a single one written $x$"), and what each member has.
- Place an attribute's definition straight after the object it belongs to, as Descriptor after the specification.
- Mark an instance with a hat: $\hat{x}$ is an instance of $x$, and $\hat{T}$ of $T$.
- Before introducing a symbol, check it isn't already in use, including in figures and examples.
- Keep a verb to one sense: "bound" for a value given on an instance, "carry" for a product on an arc, "typed" for
  products. Inside the definitions, avoid "define" for what the model does (use "specify").
- Write the model's master objects at the level of the domain, not of a project.

## Claims and citations

- Never misrepresent a cited author. Check the source before attributing a claim, a negative claim above all.
- If a claim can't be checked, list it in `NOTES.md` under the source checks.
- Cite the primary source for a finding, with a secondary source only as background.
- Comparing a cited author's work with ours is our framing. It must still be accurate, but it needn't be theirs.
- Don't state an empirical result the evaluation hasn't shown. "Enables" and "can" are the default strength.
- Be honest about limits, including those of the evaluation.

### Local copies of sources

- Save every source you download to a `sources/` folder in the paper's own directory. Check for a copy there before
  downloading it again.
- Name the file by its citation key: `reijers2003.pdf`.
- If the copy isn't the cited version, add what it is to the name: `flyvbjerg2021-summary.pdf`, `iec62264-preview.pdf`.
  Give a source with no citation key a descriptive name.
- Check the first page against the reference before filing the copy.

## Figures

- Figures and text must agree. A change to one means checking the other.
- Redesign one figure and confirm it before changing its siblings.
- Numbers, labels and terms in a figure match the text and tables.
- In specification and process figures, draw a mapping as leaving its node horizontally, running along a trunk and then an in-lane channel, and entering a
  step at its top-left. Products enter at the top-centre or side. Products crossing the process boundary flow downward
  across the edge of the lanes. Shared routing lives in the paper's `figure-routing.ts`.
- Draw unselected elements faded: `#f6f6f6` fill, `#cfcfcf` dashed stroke, `#bbb` text, `#dedede` mappings.
- Keep worked numbers illustrative but not suspiciously exact: recorded values shouldn't match forecasts perfectly.

## Revision marks (papers under review)

Set `revisions: true` in the paper's config. Deletions aren't marked. Text inside an existing mark needs no other.

| Change | Mark |
|---|---|
| New content or a changed claim | `<Rev>` |
| Wording only: rephrasing, renamed labels, reference fixes | `<Rev minor>` |
| A whole paragraph, equation or figure | `<Rev block>` |
| Text in the submitted version that a reviewer missed | `<Rev existing>` |
| SVG label, substance | `className="paper-rev-svg"` |
| SVG label, wording only | `className="paper-rev-svg-minor"` |

## JSX pitfalls

- JSX drops whitespace across a line break next to a tag. Where a line ends in text or a closing tag and the next begins
  with a tag, keep them on one line or add `{' '}`.
- In SVG `<text>`, build a label as one template string, because separate text nodes can overlap when rendered.
- To search `sections/` with a glob, use the directory as the path. A glob with a `sections/` prefix can fail silently.
- In a LaTeX string, keep the space after `\\ ` (a spaced backslash) when editing. Losing it turns `\\ \\bigl` into
  `\\\\bigl`, which KaTeX renders as a line break followed by the literal text "bigl".
- Split a long equation over lines with `aligned` rather than let it overflow the column.

## NOTES.md

- Open items only. Delete an item when it is finished.
- No "done" sections, changelog or history. State what is open, not what changed to make it so.

## Working together

- When asked "do you agree?" or "should we?", discuss first and edit on the go-ahead.
- "Ok" approves the point agreed, not extras. Ask about those separately.
- When condensing or rewriting, keep every settled decision and its wording.
- Say so when you disagree. Honest disagreement is wanted, and agreement for its own sake is not.
- Triage external reviews against what is already decided. Don't reopen a settled point because a reviewer raises it.
