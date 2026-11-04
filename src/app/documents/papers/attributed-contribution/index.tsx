import { Bibliography } from '@/components/paper';
import type { PaperConfig } from '@/components/paper';
import references from './references.json';
import { Introduction } from './sections/introduction';
import { RelatedWork } from './sections/related-work';
import { Anomaly } from './sections/anomaly';
import { TheMode } from './sections/the-mode';
import { Positioning } from './sections/positioning';
import { BoundaryConditions } from './sections/boundary-conditions';
import { Implications } from './sections/implications';
import { Conclusion } from './sections/conclusion';

/** Theory paper: Trace-Based Production, closing the measurement gap between client, worker and organisation
 *  through attributed records against a process commons. Companion to the Stigmergic Project Delivery paper, which
 *  gives the formal construction. Content lives in ./sections/*; references in ./references.json, ordered by first
 *  citation. */
export const paper: PaperConfig = {
  title: 'Trace-Based Production: Stigmergy within a Process Commons',
  authors: ['Matthew Fyfe'],
  date: 'November 2026',
  numbered: true,
  citationStyle: 'numeric', // [n] = position in ./references.json
  exportFilename: 'Merit-Trace-Based-Production.pdf',
  references,
  abstract:
    `In complex production, the parties to a product, including the client, the worker, the organisation and the public, each lack a reliable means of identifying, delivering or demonstrating value. At each boundary between them, what is delivered is evaluated subjectively rather than measured objectively, and considerable economic activity is spent bridging those boundaries. We review evidence of the resulting gaming, misaligned reward, coordination loss and unattributed external costs. Treating each boundary as a measurement gap, and the silo as its organisational form, we propose Trace-Based Production (TBP), which attributes contribution across every agent, tool and material involved. Execution is recorded against a process commons, and each party receives an attributed record of what was delivered, on explicit criteria, whereas algorithmic management decides on behalf of the employer or platform. The record supports stigmergic coordination, proportionate compensation and ground-sourced innovation, and eases a limit on the scale of cooperative organisation. We argue that the network effect draws a process commons toward the scale of its operational domain, and that as it spans organisations, the interests of workers and employers converge on shared ownership of the trace. We develop TBP as a formal model, demonstrated at the level of a single step through two worked examples, and set out the conditions under which contribution is identified, which eligibility thresholds and movement across the commons help supply.`,
  content: (
    <>
      <Introduction />
      <Anomaly />
      <RelatedWork />
      <TheMode />
      <Positioning />
      <BoundaryConditions />
      <Implications />
      <Conclusion />
      <Bibliography />
    </>
  ),
};
