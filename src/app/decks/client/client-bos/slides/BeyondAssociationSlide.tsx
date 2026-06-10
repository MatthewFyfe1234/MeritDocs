import { SlideLayout } from '@/components/slides/SlideLayout';

const pathA = [
  'Merit runs the delivery process for individual manufacturers and contractors',
  'Every project yields a structured, comparable record across process, people, tools, and materials',
  'Quality, carbon, programme, and cost tracked at step level',
  'Partial manifesto delivery at the organisational level',
  'A clear financial value proposition for each member',
];

const pathBIsolated = [
  { title: 'An installer registry', body: 'The STA scheme proved the mechanic. The cross-material version, with performance data rather than qualifications, does not yet exist.' },
  { title: 'Process-integrated training', body: 'A cross-system training pathway anchored to delivery process steps - not classroom theory - is the gap.' },
  { title: 'An offsite plan of works', body: 'The sector has no shared process reference independent of any single manufacturer.' },
];

const pathBIntegrated = [
  { title: 'An industry-wide performance dataset', body: 'Aggregated across the sector, it answers the questions no individual manufacturer can.' },
  { title: 'A demand-side evidence case', body: 'Verified performance data across hundreds of projects is evidence. That distinction changes procurement decisions at scale.' },
  { title: 'The mortgage and insurance market', body: 'Aggregated defect and compliance records are the mechanism that changes underwriting assumptions.' },
];

export function BeyondAssociationSlide() {
  return (
    <SlideLayout title="Every project becomes a case study.">
      <div className="flex-1 min-h-0 flex flex-col gap-4">

        <div className="flex-1 min-h-0 grid grid-cols-2 gap-5">

          {/* Path A */}
          <div
            className="bg-white rounded-lg border p-4 flex flex-col shadow-sm"
            style={{ borderColor: 'var(--slide-border)', borderTop: '3px solid var(--slide-primary)' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold px-2 py-0.5 rounded shrink-0" style={{ backgroundColor: 'var(--slide-bg-primary-muted)', color: 'var(--slide-primary)' }}>A</span>
              <h3 className="text-sm font-bold" style={{ color: 'var(--slide-primary)' }}>Within member organisations</h3>
            </div>
            <ul className="flex flex-col gap-1.5">
              {pathA.map((b) => (
                <li key={b} className="flex items-start gap-2 text-xs leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.75 }}>
                  <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--slide-primary)', opacity: 0.4 }} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Path B */}
          <div
            className="bg-white rounded-lg border p-4 flex flex-col shadow-sm"
            style={{ borderColor: 'var(--slide-border)', borderTop: '3px solid var(--slide-accent)' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold px-2 py-0.5 rounded shrink-0" style={{ backgroundColor: 'var(--slide-bg-accent-muted)', color: 'var(--slide-accent)' }}>B</span>
              <h3 className="text-sm font-bold" style={{ color: 'var(--slide-accent)' }}>Across the sector</h3>
              <p className="text-xs" style={{ color: 'var(--slide-accent)', opacity: 0.55 }}>(An Offsite Plan of Works - that learns)</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--slide-accent)', opacity: 0.5 }}>Isolated resources</span>
              <ul className="flex flex-col gap-1.5">
                {pathBIsolated.map((item) => (
                  <li key={item.title} className="flex items-start gap-2 text-xs leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.75 }}>
                    <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--slide-accent)', opacity: 0.4 }} />
                    <span><span className="font-semibold">{item.title}:</span> {item.body}</span>
                  </li>
                ))}
              </ul>
              <span className="text-xs font-semibold uppercase tracking-wide mt-1" style={{ color: 'var(--slide-accent)', opacity: 0.5 }}>Integrated resources</span>
              <ul className="flex flex-col gap-1.5">
                {pathBIntegrated.map((item) => (
                  <li key={item.title} className="flex items-start gap-2 text-xs leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.75 }}>
                    <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--slide-accent)', opacity: 0.4 }} />
                    <span><span className="font-semibold">{item.title}:</span> {item.body}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        <div
          className="shrink-0 rounded-lg px-5 py-3"
          style={{ backgroundColor: 'var(--slide-bg-primary-muted)', borderLeft: '4px solid var(--slide-primary)' }}
        >
          <p className="text-sm font-medium leading-snug" style={{ color: 'var(--slide-primary)' }}>
            The proposal: start with willing members on Path A. Build toward Path B as the evidence base grows. BOS's role scales with it.
          </p>
        </div>

      </div>
    </SlideLayout>
  );
}
