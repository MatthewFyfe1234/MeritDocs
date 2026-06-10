import { SlideLayout } from '../../../../components/slides/SlideLayout';

function Ref({ n }: { n: number }) {
  return (
    <sup className="font-semibold ml-px" style={{ color: 'var(--slide-accent)', fontSize: '0.6rem' }}>
      [{n}]
    </sup>
  );
}

export function SectorSlide() {
  const rows = [
    {
      dimension: 'Purchasing',
      headline: 'Big buyers win; small operators absorb cost',
      stat: '+45%',
      statDetail: <>building material cost increase since 2021<Ref n={2} /></>,
    },
    {
      dimension: 'Risk',
      headline: 'Each firm carries the risk alone',
      stat: '31,200',
      statDetail: <>ACC claims in 2024, 12 fatalities; construction alone<Ref n={3} /></>,
    },
    {
      dimension: 'Training',
      headline: 'An industry-wide skills gap',
      stat: '135 / 32',
      statDetail: <>active F&T apprentices / graduates in 2024<Ref n={4} /></>,
    },
    {
      dimension: 'Compliance',
      headline: 'The same rules, proved 120 times over',
      stat: 'NZS3604',
      statDetail: <>plus BuiltReady; no shared regulatory evidence base<Ref n={5} /></>,
    },
    {
      dimension: 'Complexity',
      headline: 'Builds getting harder to coordinate',
      stat: '53%',
      statDetail: <>of consents were multi-unit in 2024; rising to 56% by 2030<Ref n={6} /></>,
    },
  ];

  return (
    <SlideLayout
      title="The Sector"
      subtitle="120 registered enterprises. Around seven staff per business. Small, independent, regional operators, each carrying the full overhead of the industry alone."
    >
      <div
        className="grid gap-x-4 mb-1 shrink-0 px-1"
        style={{ gridTemplateColumns: '110px 1fr 180px' }}
      >
        <div />
        <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--slide-text)', opacity: 0.35 }}>
          The challenge
        </div>
        <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--slide-primary)', opacity: 0.6 }}>
          The scale
        </div>
      </div>

      <div className="flex-1 min-h-0 flex flex-col" style={{ borderTop: '1px solid var(--slide-border-primary)' }}>
        {rows.map(({ dimension, headline, stat, statDetail }) => (
          <div
            key={dimension}
            className="grid gap-x-4 items-center py-1.5 flex-1"
            style={{ gridTemplateColumns: '110px 1fr 180px', borderBottom: '1px solid var(--slide-border-primary)' }}
          >
            <span className="text-xs font-semibold px-1" style={{ color: 'var(--slide-primary)' }}>
              {dimension}
            </span>
            <span className="text-sm font-bold leading-snug" style={{ color: 'var(--slide-primary)' }}>
              {headline}
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="text-xl font-bold leading-tight" style={{ color: 'var(--slide-accent)' }}>
                {stat}
              </span>
              <span className="text-xs leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>
                {statDetail}
              </span>
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}
