import { SlideLayout } from '@/components/slides/SlideLayout';

const reasons = [
  {
    heading: 'Every project is a temporary coalition',
    sub: 'The team dissolves when it ends',
    body: 'The learning - what worked, what deviated, what cost more than planned - leaves with the people. There is no persistent structure to capture it.',
  },
  {
    heading: 'The tools capture product, not delivery',
    sub: 'That dimension has never been modelled',
    body: 'Design and fabrication software describes what to build with precision. It does not record how delivery happened - who did what, in what sequence, with what outcome.',
  },
  {
    heading: 'Manual entry is the only fallback',
    sub: 'So it gets skipped, or approximated',
    body: 'Where data collection exists, it depends on people stopping work to record it. That burden means the record cannot be trusted.',
  },
];

export function DiagnosisSlide() {
  return (
    <SlideLayout>
      <div className="flex-1 min-h-0 flex flex-col gap-6">

        <div className="flex-1 flex flex-col justify-center gap-4 px-4">
          <div>
            <p className="text-xs font-semibold tracking-widest mb-3" style={{ color: 'var(--slide-accent)' }}>2018</p>
            <p className="text-3xl font-bold leading-tight mb-2" style={{ color: 'var(--slide-primary)', opacity: 0.4 }}>
              "The offsite sector is not a mature sector, so it is very challenging to provide data transparency and evidence of the benefits. This is a point the industry needs to address."
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.5 }}>
              The McAvoy Group, evidence submitted to UK Parliament. UK offsite manufacturer, 40+ years of experience.
            </p>
          </div>
          <p className="text-3xl font-bold leading-tight" style={{ color: 'var(--slide-primary)' }}>
            Nothing has changed.
          </p>
          <ul className="flex flex-col gap-1.5 max-w-2xl">
            {[
              { label: 'No delivery record, no institutional trust', body: 'Systemic failure to collect and publish performance data has prevented the sector from building trust with mortgage lenders, insurers, and structural warranty providers - the gatekeepers of market scale.', source: 'Prefabs Sprouting, ESRC / University of Leeds, 2025' },
              { label: 'Public money, no public accountability', body: 'Homes England contracted £137m to local authorities to deliver 9,969 MMC homes. No assessment of outcomes was ever published.', source: 'Lords Built Environment Committee, 2024' },
            ].map((b) => (
              <li key={b.label} className="flex items-start gap-2 text-sm leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>
                <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--slide-accent)', opacity: 0.6 }} />
                <span>
                  <span className="font-semibold">{b.label}:</span> {b.body}{' '}
                  <span className="italic" style={{ opacity: 0.6 }}>({b.source})</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="shrink-0 grid grid-cols-3 gap-4">
          {reasons.map((r) => (
            <div
              key={r.heading}
              className="bg-white rounded-lg border flex flex-col overflow-hidden shadow-sm"
              style={{ borderColor: 'var(--slide-border)' }}
            >
              <div
                className="shrink-0 px-4 py-3"
                style={{ backgroundColor: 'var(--slide-bg-muted)', borderBottom: '1px solid var(--slide-border)' }}
              >
                <p className="text-sm font-bold" style={{ color: 'var(--slide-primary)' }}>{r.heading}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--slide-text)', opacity: 0.5 }}>{r.sub}</p>
              </div>
              <div className="p-4 flex items-start">
                <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.75 }}>{r.body}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </SlideLayout>
  );
}
