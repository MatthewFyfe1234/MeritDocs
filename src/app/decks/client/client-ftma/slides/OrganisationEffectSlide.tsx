import { SlideLayout } from '../../../../components/slides/SlideLayout';

const benefits = [
  {
    title: 'Estimating accuracy',
    body: 'Quotes generated from the specification - material quantities from dimensions and wastage factors, process steps estimated deterministically from the job variables.',
  },
  {
    title: 'Automated planning',
    body: 'The model derives the fastest timeline from team calendars, assigns executors based on experience and availability, and selects tools based on their schedules.',
  },
  {
    title: 'Material procurement',
    body: 'Stock levels adjusted automatically. Material RFQs generated and ready to send based on confirmed specifications.',
  },
  {
    title: 'Internal benchmarking',
    body: 'Performance tracked per job, per step, per operative - over time. Improvement is visible, not assumed.',
  },
  {
    title: 'Document control',
    body: 'Certificates of conformance and process records enforced at point of execution. Nothing moves forward without sign-off.',
  },
  {
    title: 'Operative records',
    body: 'Execution history follows each operative - a verified performance record built at point of work, not declared on a CV.',
  },
  {
    title: 'R&D at real problems',
    body: 'Where work actually slows or fails is visible in your own data. Investment targets verified bottlenecks, not perceived ones.',
  },
  {
    title: 'Training quality signal',
    body: 'High variance in execution metrics between individuals doing the same step flags a training gap before it becomes a delivery problem.',
  },
];

export function OrganisationEffectSlide() {
  return (
    <SlideLayout
      title="The Organisation Benefits"
      subtitle="Every job makes the next one better. The platform captures that improvement and makes it visible."
    >
      <div
        className="flex-1 min-h-0 grid grid-cols-2 gap-x-5"
        style={{ borderTop: '1px solid var(--slide-border-primary)', alignContent: 'start', paddingTop: '0.5rem' }}
      >
        {benefits.map(({ title, body }) => (
          <div key={title} className="flex flex-col gap-0.5 py-2" style={{ borderBottom: '1px solid var(--slide-border-primary)' }}>
            <span className="text-xs font-semibold" style={{ color: 'var(--slide-accent)' }}>{title}</span>
            <span className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>{body}</span>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}
