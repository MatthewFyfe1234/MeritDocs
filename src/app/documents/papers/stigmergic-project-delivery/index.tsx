import { Bibliography, Rev } from '@/components/paper';
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
  abstract: (
    <>
      Project planning and delivery rely on processes designed manually, in isolation from product specification
      and estimation and decoupled from execution, with forecasts ungrounded in <Rev minor>execution data attributed to individual resources</Rev>. Each
      of these areas is well studied, but to our knowledge no single model derives process directly from a
      specification while also forecasting outcomes<Rev>, determining agent eligibility and supporting project
      control</Rev>. We <Rev>propose and formalise</Rev> Stigmergic Project
      Delivery (SPD). <Rev>Building on the concept of an operational domain, the model derives a project&rsquo;s process from its specification, which
      remains dynamic during execution. A trace left within that process by earlier projects, attributed to the specific agents, tools and
      materials involved, drives risk-aware forecasting and enables stigmergic coordination, with project control as a byproduct</Rev>.{' '}
      <Rev>Because a mapping binds the specification to the process, the plan, its forecasts and the record of
      execution are aligned by construction rather than by reconciliation.</Rev> <Rev>SPD can thereby take over work that project management performs by hand.</Rev>{' '}
      <Rev>We position SPD against prior work on deriving process from a specification, project scheduling,
      forecasting, project control and stigmergic task management</Rev> to identify
      what each leaves unresolved.
    </>
  ),
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
