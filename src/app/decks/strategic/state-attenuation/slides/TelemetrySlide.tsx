import { SlideLayout } from '@/components/slides/SlideLayout';
import { BlankSlide } from '@/components/slides/BlankSlide';

export function TelemetrySlide() {
  return (
    <SlideLayout title="A Different Kind of Surveillance" subtitle="Distributed, discrete, and not personalised">
      <BlankSlide notes={
        <>
          <p>This system involves surveillance. That should be acknowledged directly rather than denied - the denial is a weak position that invites obvious rebuttal. What changes is the nature of the surveillance, across three dimensions that matter.</p>
          <br />
          <p>Distributed audience. In algorithmic management as currently practiced - Amazon, Uber, gig economy platforms - the data flows to a single point of control: the capital owner and their managerial proxy. It is gathered from workers and used above them. In this system, the data flows to ecosystem participants: the client who set the metrics, future clients evaluating a track record, other executors. Nobody above the worker is watching. The record is more like a public portfolio than a surveillance file.</p>
          <br />
          <p>Discrete set of metrics. Only what was agreed upfront is measured. The client defined the metrics before the project began - speed, carbon, quality, cost, or whatever they specified. Nothing is gathered beyond what those metrics require. There is no scope creep into behaviour, personality, or anything outside the delivery itself. The boundary of what is recorded is set by the client's stated priorities, not by the system's appetite for data.</p>
          <br />
          <p>Not personalised. The metrics are about the output, not the person. Carbon tracks the project, not the individual worker's footprint. Quality tracks the work, not a character assessment. The delivery record is a record of what was done, not of who the person is. The executor's track record accumulates across projects and is theirs - it is how they are selected for future work, and it belongs to them.</p>
          <br />
          <p>Structurally incapable of discrimination. The system is blind to age, gender, race, and every other protected characteristic - not as a policy choice, but as a structural property. Discrimination requires data. The system holds no data on personal characteristics because those characteristics are irrelevant to delivery and therefore never tracked. Selection operates entirely on delivery record against defined metrics. A hiring or evaluation process that cannot see a person's name, age, gender, or appearance has no surface area on which bias can operate.</p>
          <br />
          <p>The contrast with current systems is stark - and the inversion is important. Human managers in orchestration roles are themselves surveillance systems. They observe continuously, form impressions, make judgments, and act on them. That surveillance is: continuous rather than bounded; personal rather than output-focused; unaccountable - there is no record of what the manager observed or how they used it; opaque to the worker, who has no idea what data is held about them or how it influences decisions; and biased by protected characteristics the worker cannot control and the manager cannot fully suppress.</p>
          <br />
          <p>Removing humans from the orchestration layer is therefore not the introduction of surveillance into a previously surveillance-free environment. It is the removal of subconscious and unstated surveillance from the orchestration layer - the kind that is most invasive precisely because it is never named, never bounded, and never held to account.</p>
          <br />
          <p>Subconscious surveillance: the manager doesn't know they're doing it. Impressions form below the level of deliberate thought. Bias operates without intent. The manager genuinely believes they are evaluating performance when they are partly evaluating accent, manner, appearance, and familiarity. Unstated surveillance: it is never declared. There is no agreement about what is being observed or how it will be used. The worker has no way to know what data the manager holds or what impressions have formed. No contract. No scope. No auditability.</p>
          <br />
          <p>What replaces it is conscious and stated - declared upfront by the client, visible to the executor, auditable after the fact. The surveillance is bounded, impersonal, and structurally incapable of acting on the personal characteristics that bias exploits. The human manager as a silo of unacknowledged, personalised, opaque data disappears. The delivery record takes its place.</p>
          <br />
          <p>One nuance worth holding: if the metrics themselves encoded bias - for instance, if "cultural fit" or "communication style" were tracked - discrimination could re-enter indirectly. The structural anti-discrimination property holds only as long as metrics remain tied to objective delivery outcomes. That is a governance question, not a technical one, and it is one the open master process framework is well positioned to address through participant scrutiny.</p>
          <br />
          <p>The deeper point: the problem with surveillance capitalism is not the surveillance. It is the capitalism - one metric, profit, imposed on every other consideration, with proceeds flowing to a very small group. Change the metric to anything the client or community values, distribute the audience across participants rather than concentrating it in ownership, remove the personal dimension, and strip out the data on which discrimination depends - and the nature of the tracking changes in kind, not just in degree.</p>
        </>
      } />
    </SlideLayout>
  );
}
