import { Bibliography } from '@/components/paper';
import type { PaperConfig } from '@/components/paper';
import references from '../references.json';
import { Introduction } from './sections/introduction';
import { RelatedWork } from './sections/related-work';
import { TheModel } from './sections/the-model';
import { WorkedExamples } from './sections/worked-examples';
import { Evaluation } from './sections/evaluation';
import { Discussion } from './sections/discussion';
import { Conclusion } from './sections/conclusion';

/** Draft. Started from model-paper-template. Content lives in ./sections/*; shared figures in ./figures. */
export const paper: PaperConfig = {
  title: 'Stigmergic Project Delivery: Dynamic Specification-Driven Planning and Trace-Based Forecasting',
  authors: ['Matthew Fyfe'],
  date: 'October 2026',
  numbered: true,
  citationStyle: 'numeric', // [n] = position in ../references.json
  revisions: true, // under revision after review: wrap every addition in <Rev>

  exportFilename: 'Merit-Stigmergic-Project-Delivery.pdf',
  references,
  abstract:
    `Project planning and delivery rely on processes designed manually, in isolation from product specification and estimation and decoupled from execution, with forecasts ungrounded in resource-level execution data. Each of these areas is well studied, but to our knowledge no single model derives process directly from a specification while also forecasting outcomes and allocating work among agents. We propose Stigmergic Project Delivery (SPD), a formal model in which a specification generates process structure that remains dynamic during execution. In the model, execution leaves in that process a trace that drives both forecasting and self-selected allocation among agents, without central control. We explain how SPD instantiates Heylighen's components of stigmergy, with coordination emerging from them, and compare it against product-based workflow design, Activity-on-Node scheduling and predictive process monitoring to identify what each leaves unresolved. By deriving both risk-aware forecasts and task allocation directly from the specification and trace, SPD is intended to improve the predictability of delivery and reduce the forecasting and coordination overhead carried by management layers.`,
  content: (
    <>
      <Introduction />
      <RelatedWork />
      <TheModel />
      <WorkedExamples />
      <Evaluation />
      <Discussion />
      <Conclusion />
      <Bibliography />
    </>
  ),
};
