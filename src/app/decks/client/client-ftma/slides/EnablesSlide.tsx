import { SlideLayout } from '@/components/slides/SlideLayout';

const left = [
  {
    title: 'Talent ledger',
    body: 'Execution data follows operatives across employers. A new employer sees a verified performance record, captured at point of work, not a CV. Recruiter fees disappear.',
  },
  {
    title: 'Collective insurance',
    body: 'Merit\'s stage gates mean members cannot proceed without meeting quality and safety requirements. The resulting record is enforced, not self-reported. The association takes auditable proof of compliance to underwriters and negotiates on it.',
  },
  {
    title: 'Shared compliance',
    body: 'The same enforced execution record serves as regulatory evidence. The association negotiates with MBIE and BCAs to accept Merit data as presumptive compliance, replacing project-by-project inspection with a single annual data audit.',
  },
  {
    title: 'Bulk procurement',
    body: 'The association uses its verified member list to negotiate volume pricing on materials, tools, and services. Small members access rates normally reserved for large buyers.',
  },
];

const right = [
  {
    title: 'Performance benchmarking',
    body: 'Defect rates, cycle times, and productivity are captured at execution, not estimated. Members compare against anonymised peers on data that was enforced, not declared.',
  },
  {
    title: 'R&D and innovation fund',
    body: 'Because Merit captures where work actually fails or slows, the sector\'s real inefficiency hotspots are visible. The association directs pooled R&D spend at verified problems, not perceived ones.',
  },
  {
    title: 'Data-driven lobbying',
    body: 'The association brings auditable, aggregated evidence to government and regulators rather than member surveys or anecdote. Policy debates shift from "we believe" to "we can prove."',
  },
];

export function EnablesSlide() {
  return (
    <SlideLayout
      title="What the 'Union' Can Do"
      subtitle="Each of these depends on Merit's records being enforced and verified, not self-reported. That is what makes them credible to insurers, regulators, and governments."
    >
      <div className="flex-1 min-h-0 flex gap-5">
        <div
          className="flex flex-col"
          style={{ flex: '4', borderTop: '1px solid var(--slide-border-primary)' }}
        >
          {left.map(({ title, body }) => (
            <div
              key={title}
              className="flex flex-col gap-0.5 py-2 flex-1"
              style={{ borderBottom: '1px solid var(--slide-border-primary)' }}
            >
              <span className="text-xs font-semibold leading-tight" style={{ color: 'var(--slide-accent)' }}>
                {title}
              </span>
              <span className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>
                {body}
              </span>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col"
          style={{ flex: '3', borderTop: '1px solid var(--slide-border-primary)' }}
        >
          {right.map(({ title, body }) => (
            <div
              key={title}
              className="flex flex-col gap-0.5 py-2 flex-1"
              style={{ borderBottom: '1px solid var(--slide-border-primary)' }}
            >
              <span className="text-xs font-semibold leading-tight" style={{ color: 'var(--slide-accent)' }}>
                {title}
              </span>
              <span className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>
                {body}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
