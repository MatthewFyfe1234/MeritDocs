import { Bibliography } from '@/components/paper';
import type { PaperConfig } from '@/components/paper';
import references from './references.json';
import { Notes } from './sections/notes';
import { Introduction } from './sections/introduction';
import { RelatedWork } from './sections/related-work';
import { Anomaly } from './sections/anomaly';
import { TheMode } from './sections/the-mode';
import { Positioning } from './sections/positioning';
import { Argument } from './sections/argument';
import { BoundaryConditions } from './sections/boundary-conditions';
import { Implications } from './sections/implications';
import { Conclusion } from './sections/conclusion';

/** Draft scaffold. Theory paper: stigmergy as a distinct mode of coordination, alongside market, hierarchy and
 *  network. Companion to the Stigmergic Project Delivery paper, which is its concrete instantiation. Content lives
 *  in ./sections/*; references in ./references.json. */
export const paper: PaperConfig = {
  title: 'Stigmergic Coordination: Production Organised Through Attributed Contribution',
  authors: ['Matthew Fyfe'],
  date: 'October 2026',
  numbered: true,
  citationStyle: 'numeric', // [n] = position in ./references.json
  exportFilename: 'Merit-Stigmergic-Coordination-Production.pdf',
  references,
  abstract:
    `Coordination of economic activity is conventionally assigned to one of three modes: the market's price, the hierarchy's authority, the network's trust. Each aligns activity to a proxy for the outcome parties want delivered rather than to the delivered outcome itself, and in the gap between proxy and outcome sits the persistent misalignment among the parties to production: client, supplier, employee, and the toolmakers, insurers, educators and regulators behind them. We argue that this gap is not a fixed cost to be priced around but one that widens as the dimensions a product must satisfy multiply - cost, time, safety, provenance, carbon - and that the organisational silo which sustains it is the same object as the measurement gap of incentive theory. The established responses to multidimensional delivery either rest on informal monitoring that does not scale, or close the gap on one dimension by siloing the rest. We propose a fourth mode, attributed stigmergy: coordination through locally-attributed contribution recorded in a shared process medium, whose coordinating logic, the counterpart of price or authority, is attribution-and-selection. The mode accounts for what the other three cannot: cooperative alignment that scales past its usual size ceiling, alignment that composes along an entire chain of inputs where contractual alignment remains stubbornly pairwise, and the disappearance of the intermediation that exists only to bridge opacity. The contribution is conceptual and typological; a companion construction establishes that the mode is formally realisable.`,
  content: (
    <>
      <Notes />
      <Introduction />
      <RelatedWork />
      <Anomaly />
      <TheMode />
      <Positioning />
      <Argument />
      <BoundaryConditions />
      <Implications />
      <Conclusion />
      <Bibliography />
    </>
  ),
};
