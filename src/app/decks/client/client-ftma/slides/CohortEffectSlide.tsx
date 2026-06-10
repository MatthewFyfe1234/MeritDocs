import { SlideLayout } from '../../../../components/slides/SlideLayout';

const benefits = [
  {
    title: 'Estimating accuracy',
    body: 'Contingency shrinks as forecasts draw on cohort actuals, not individual memory.',
    existing: false,
  },
  {
    title: 'Bulk purchasing',
    body: 'Aggregated demand across the cohort unlocks volume pricing unavailable to any single firm.',
    existing: false,
  },
  {
    title: 'Collective insurance',
    body: "Merit's enforced stage gates produce an auditable compliance record. The association takes that proof to underwriters and negotiates on it.",
    existing: false,
  },
  {
    title: 'Benchmarking with teeth',
    body: 'Performance compared against anonymised peers on data captured at execution, not declared on a survey.',
    existing: false,
  },
  {
    title: 'Document control',
    body: 'Certificates of conformance and process records standardised across the cohort and enforced at point of execution.',
    existing: false,
  },
  {
    title: 'Shared compliance',
    body: 'The association negotiates with MBIE and BCAs to accept the shared Merit record as presumptive compliance, replacing project-by-project inspection.',
    existing: true,
  },
  {
    title: 'R&D at real problems',
    body: 'Where work actually slows or fails is visible across the cohort. Investment targets verified bottlenecks.',
    existing: false,
  },
  {
    title: 'Shared talent pool',
    body: 'Execution records follow operatives across employers. Any member accesses a verified performance history instantly.',
    existing: false,
  },
  {
    title: 'Data-driven lobbying',
    body: 'The association brings aggregated, auditable evidence to government and regulators. Policy debates shift from "we believe" to "we can prove."',
    existing: false,
  },
];

export function CohortEffectSlide() {
  return (
    <SlideLayout
      title="The 'Union' Effect"
      subtitle="Every job makes the next one better. Shared across a cohort, that effect compounds dramatically."
    >
      <div className="flex-1 min-h-0 flex gap-6 items-stretch" style={{ paddingTop: '0.5rem' }}>
        {/* Left: one firm vs cohort */}
        <div className="flex flex-col pr-2" style={{ flex: '0 0 220px', borderTop: '1px solid var(--slide-border-primary)' }}>
          <div className="flex flex-col gap-1 pt-3 pb-4">
            <span className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--slide-text)', opacity: 0.35 }}>
              One firm
            </span>
            <span className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>
              Around 30 jobs in a year. Learning is slow - each new job adds one more data point.
            </span>
          </div>

          {/* VS on the inner divider */}
          <div className="flex items-center gap-2">
            <div style={{ flex: 1, height: '1px', background: 'var(--slide-border-primary)' }} />
            <span className="text-xs font-bold shrink-0" style={{ color: 'var(--slide-primary)', opacity: 0.3, letterSpacing: '0.05em' }}>VS</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--slide-border-primary)' }} />
          </div>

          <div className="flex flex-col gap-1 pt-4">
            <span className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--slide-accent)', opacity: 0.7 }}>
              A 20-member cohort
            </span>
            <span className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>
              Every member's jobs are in the same model. Each company draws on the full pool - hundreds of executions, from day one.
            </span>
          </div>
        </div>

        {/* Right: benefits 2-column grid */}
        <div
          className="flex-1 grid grid-cols-2 gap-x-5"
          style={{ borderTop: '1px solid var(--slide-border-primary)', alignContent: 'start' }}
        >
          {benefits.map(({ title, body, existing }) => (
            <div key={title} className="flex flex-col gap-0.5 py-2" style={{ borderBottom: '1px solid var(--slide-border-primary)' }}>
              <span className="text-xs font-semibold flex items-center gap-1.5" style={{ color: 'var(--slide-accent)' }}>
                {existing && <span style={{ color: 'var(--slide-accent)', fontSize: '0.5rem' }}>●</span>}
                {title}
              </span>
              <span className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>{body}</span>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
