import { Bibliography, Definition, Figure, Proposition } from '@/components/paper';
import type { PaperConfig } from '@/components/paper';
import references from '../references.json';

/**
 * Template for a paper that proposes a model or method.
 *
 * To start a paper: copy this folder, rename it, fill in the config below, then register it in
 * documents/index.tsx (export) and App.tsx (documents record).
 *
 * Writing notes
 * - Grey italic paragraphs (className="paper-todo") are prompts. Delete each one as you write the section.
 * - Cite with keys from ../references.json (Zotero: export the collection as "CSL JSON"):
 *     import { Cite } from '@/components/paper';
 *     <Cite id="reijers2003" />  ->  (Reijers et al., 2003)      <Cite id="reijers2003" narrative page="229" />  ->  Reijers et al. (2003, p. 229)
 *   The Bibliography at the end lists only what is cited.
 * - Formal structure: <Definition name="...">, <Proposition name="...">. Numbered automatically.
 * - Diagrams: wrap an SVG or image in <Figure caption="...">. Numbered automatically.
 * - Headings are numbered automatically because numbered: true. Use h2 for sections, h3 for subsections.
 */
export const paper: PaperConfig = {
  title: '[Paper title: name the model and what it does]',
  subtitle: '[Optional subtitle]',
  authors: ['[Author]'],
  date: '[Month Year]',
  numbered: true,
  exportFilename: 'Merit-Model-Paper.pdf',
  references,
  abstract:
    '[Four moves, one to two sentences each: the problem; what you propose; how you tested it; the result. ' +
    'For a first paper without results, say what the proposed evaluation will show.]',
  content: (
    <>
      <h2>Introduction</h2>
      <p className="paper-todo">
        The gap: what existing practice or theory fails to do, and why it matters. Then the contribution in a few
        sentences. Then the outline: one sentence per remaining section.
      </p>

      <h2>Related work</h2>
      <p className="paper-todo">
        The closest prior approaches (PBWD, configuration, RTN and so on). For each: what it does, and how yours
        differs. Group by approach, not by author. End with the position your model occupies relative to them.
      </p>

      <h2>The model</h2>
      <h3>Notation</h3>
      <p className="paper-todo">
        Symbols and conventions, in one place. Keep it short enough to hold in your head while reading the rest.
      </p>

      <h3>Definitions</h3>
      <Definition name="[Term]">
        <p>[Precise statement. One concept per definition, built only on earlier notation and definitions.]</p>
      </Definition>
      <p className="paper-todo">
        Cover the formal structure: the master spec, the mapping, the graph and the trace. Give each its own
        definition, in the order a reader needs them.
      </p>

      <h3>Properties</h3>
      <Proposition name="[Property]">
        <p>[Something that follows from the definitions, e.g. a consistency or completeness guarantee.]</p>
      </Proposition>

      <Figure caption="[Caption: what the diagram shows, readable without the text.]">
        <div
          style={{
            border: '1px dashed var(--slide-border-primary)',
            height: '50mm',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10pt',
            opacity: 0.6,
          }}
        >
          [Model diagram: replace with an SVG]
        </div>
      </Figure>

      <h2>Worked example</h2>
      <p className="paper-todo">
        Small enough to check by hand. State the input, apply each definition step by step, and show the output. The
        reader should be able to reproduce every number.
      </p>
      <table>
        <thead>
          <tr>
            <th>Step</th>
            <th>Definition used</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>[ ]</td>
            <td>[ ]</td>
          </tr>
          <tr>
            <td>2</td>
            <td>[ ]</td>
            <td>[ ]</td>
          </tr>
        </tbody>
      </table>

      <h2>Evaluation</h2>
      <h3>Experiment</h3>
      <p className="paper-todo">
        What was run, on what data or case, and what question it answers. If there are no results yet, retitle this
        section "Proposed evaluation" and describe the study you will run.
      </p>
      <h3>Baselines and metrics</h3>
      <p className="paper-todo">What you compare against, and how success is measured.</p>
      <h3>Results</h3>
      <table>
        <thead>
          <tr>
            <th>Approach</th>
            <th>[Metric 1]</th>
            <th>[Metric 2]</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>[Baseline]</td>
            <td>[ ]</td>
            <td>[ ]</td>
          </tr>
          <tr>
            <td>[Proposed model]</td>
            <td>[ ]</td>
            <td>[ ]</td>
          </tr>
        </tbody>
      </table>

      <h2>Discussion and limitations</h2>
      <p className="paper-todo">
        What the results mean, where the model does not apply, and what you did not test. State limitations plainly:
        reviewers find them anyway.
      </p>

      <h2>Conclusion and future work</h2>
      <p className="paper-todo">
        Restate the contribution in one or two sentences, then the two or three most valuable next steps.
      </p>

      <Bibliography />
    </>
  ),
};
