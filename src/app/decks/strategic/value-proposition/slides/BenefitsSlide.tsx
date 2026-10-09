import { SlideLayout } from '@/components/slides/SlideLayout';

const silos: { label: string; body: string }[] = [
  { label: 'An Individual', body: 'Holds knowledge that leaves with them when they go.' },
  { label: 'An Organisation', body: "Is blind to its place in the larger process it's part of." },
  { label: 'A Tool', body: 'Performs, but that performance is never recorded against the step.' },
];

const groups: { label: string; rows: { who: string; benefit: string }[] }[] = [
  {
    label: 'At the Ecosystem Level',
    rows: [
      { who: 'The Insurer', benefit: 'Prices risk accurately, instead of on proxies and averages.' },
      { who: 'The Toolmaker', benefit: 'Identifies their own weaknesses, instead of improving on guesswork.' },
      { who: 'The Educator', benefit: 'Stays at the leading edge of practice, instead of teaching from memory.' },
      { who: 'The Regulator', benefit: 'Sees the impact of their own interventions, instead of legislating blind.' },
    ],
  },
  {
    label: 'Inside One Organisation',
    rows: [
      { who: 'HR', benefit: 'Pays proportionally to value delivered, instead of to tenure or impression.' },
      { who: 'The Worker', benefit: 'Identifies their own weaknesses and improves against a measured record.' },
      { who: 'The Worker', benefit: 'Carries a demonstrable record of work done, when changing employer.' },
      { who: 'The Employer', benefit: 'Verifies that record, instead of trusting a résumé or an interview.' },
    ],
  },
];

export function BenefitsSlide() {
  return (
    <SlideLayout
      title="The Silos, Removed"
      subtitle="What each party gains once the process, not the cloud, is what they're looking at."
    >
      <div className="flex-1 min-h-0 flex flex-col justify-center gap-8">
        <div className="flex justify-center items-stretch gap-0 rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--slide-bg-card)' }}>
          {silos.map(({ label, body }, i) => (
            <div
              key={label}
              className="flex-1 flex flex-col items-center text-center gap-2 px-6 py-5"
              style={i > 0 ? { borderLeft: '1px solid var(--slide-border)' } : undefined}
            >
              <span className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--slide-accent)' }}>
                {label}
              </span>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.75 }}>
                {body}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8">
          {groups.map(({ label, rows }) => (
            <div key={label} className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--slide-primary)', opacity: 0.7 }}>
                {label}
              </span>
              <div className="flex flex-col gap-2.5">
                {rows.map(({ who, benefit }, i) => (
                  <div
                    key={i}
                    className="grid gap-x-4 items-start rounded-lg px-5 py-3.5"
                    style={{ gridTemplateColumns: '110px 1fr', backgroundColor: 'var(--slide-bg-card)' }}
                  >
                    <span className="text-sm font-bold" style={{ color: 'var(--slide-accent)' }}>{who}</span>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.85 }}>{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
