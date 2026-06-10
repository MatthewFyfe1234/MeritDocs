import { SlideLayout } from '@/components/slides/SlideLayout';

const items = [
  {
    title: 'Process model',
    body: 'A shared, step-level definition of how work should be done, covering both factory and site. Every member works from the same foundation.',
  },
  {
    title: 'Execution record',
    body: 'Who did what, when, with which tool or material, against which specification, with what outcome across quality, time, cost, and carbon.',
  },
  {
    title: 'Document management',
    body: 'Verified storage of executor documents: ID, health and safety certificates, trade qualifications, and site inductions, each tied to a process step.',
  },
  {
    title: 'Comparative analytics',
    body: 'Dashboards showing performance by process, person, tool, material, and qualification, within one organisation or anonymised across organisations.',
  },
  {
    title: 'Stage-gate enforcement',
    body: 'Work cannot proceed without required documents, certifications, or prior step outputs. The record is clean by construction, not by audit.',
  },
];

export function DeliversSlide() {
  return (
    <SlideLayout
      title="What Merit Actually Delivers"
      subtitle="Five capabilities, each live from day one. No additional action required from FTMA or members beyond adoption."
    >
      <div className="flex-1 min-h-0 flex flex-col gap-0"
        style={{ borderTop: '1px solid var(--slide-border-primary)' }}>
        {items.map(({ title, body }, i) => (
          <div
            key={title}
            className="flex items-start gap-4 py-2 flex-1"
            style={{ borderBottom: '1px solid var(--slide-border-primary)' }}
          >
            <div
              className="shrink-0 w-7 text-right"
              style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                lineHeight: 1,
                paddingTop: '0.1rem',
                color: 'var(--slide-accent)',
                opacity: 0.55,
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </div>
            <div className="flex flex-col gap-0.5">
              <span
                className="text-xs font-semibold leading-tight"
                style={{ color: 'var(--slide-primary)' }}
              >
                {title}
              </span>
              <span
                className="text-xs leading-relaxed"
                style={{ color: 'var(--slide-text)', opacity: 0.65 }}
              >
                {body}
              </span>
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}
