import { SlideLayout } from '@/components/slides/SlideLayout';

const groups: { label: string; rows: { who: string; benefit: string }[]; boxed?: boolean; column: number }[] = [
  {
    label: 'Organisation-Wide Process Commons',
    boxed: true,
    column: 0,
    rows: [
      { who: 'Operations', benefit: 'Coordinates from a live, measured picture of the process, instead of status meetings and guesswork.' },
      { who: 'HR', benefit: 'Pays proportionally to value delivered, instead of to tenure or impression.' },
      { who: 'Finance', benefit: 'Forecasts cost and cash flow from actual execution data, instead of historical averages.' },
      { who: 'The Worker', benefit: 'Identifies their own weaknesses and improves against a measured record.' },
      { who: 'Stock / Inventory', benefit: 'Tracks exactly which materials and tools each step actually consumed, instead of periodic stocktakes.' },
    ],
  },
  {
    label: 'Organisation, Industry-Wide Process Commons',
    column: 1,
    rows: [
      { who: 'The Organisation', benefit: 'Benchmarks its own performance against other providers, instead of operating blind.' },
      { who: 'The Organisation', benefit: 'Gains as insurers, toolmakers, and educators all improve from the same shared data, instead of improving in isolation.' },
      { who: 'The Employee', benefit: 'Carries an industry-wide transferable record, not just proof for one employer to the next.' },
      { who: 'The Employer', benefit: 'Can buy and sell process itself on a shared marketplace, instead of only buying labour or materials.' },
      { who: 'A Small Organisation', benefit: 'Gets industry-wide performance benchmarks, HR included, as infrastructure by default, instead of building it alone.' },
    ],
  },
  {
    label: 'At the Ecosystem Level',
    column: 2,
    rows: [
      { who: 'The Insurer', benefit: 'Prices risk accurately, instead of on proxies and averages.' },
      { who: 'The Toolmaker', benefit: 'Identifies their own weaknesses, instead of improving on guesswork.' },
      { who: 'Material Manufacturers', benefit: 'See how their materials perform downstream, instead of guessing from returns.' },
      { who: 'The Educator', benefit: 'Stays at the leading edge of practice, instead of teaching from memory.' },
      { who: 'The Regulator', benefit: 'Sees the impact of their own interventions, instead of legislating blind.' },
    ],
  },
  {
    label: 'The Client / Consumer',
    column: 2,
    rows: [
      { who: 'The Client / Consumer', benefit: 'Chooses which company and product to buy from a verified track record, instead of marketing claims.' },
    ],
  },
];

function GroupBlock({ label, rows, boxed }: { label: string; rows: { who: string; benefit: string }[]; boxed?: boolean }) {
  return (
    <div className={`relative flex flex-col gap-2 rounded-lg${boxed ? ' flex-1' : ''}`} style={boxed ? { padding: '12px' } : undefined}>
      {boxed && (
        <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%" preserveAspectRatio="none">
          <rect x="1.8" y="1.8" width="calc(100% - 3.6px)" height="calc(100% - 3.6px)" rx="8"
            fill="none" stroke="var(--slide-text)" strokeWidth="3.6" strokeDasharray="15 9" />
        </svg>
      )}
      <div>
        <span className="block text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--slide-primary)', opacity: 0.7 }}>
          {label}
        </span>
        {boxed && (
          <p className="text-xs italic mt-1.5" style={{ color: 'var(--slide-text)', opacity: 0.55 }}>
            self-contained within one company
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        {rows.map(({ who, benefit }, i) => (
          <div
            key={i}
            className="grid gap-x-3 items-start rounded-lg pl-1 pr-4 py-3"
            style={{ gridTemplateColumns: '115px 1fr', backgroundColor: 'var(--slide-bg-card)' }}
          >
            <span className="text-sm font-bold" style={{ color: 'var(--slide-accent)', minWidth: 0, overflowWrap: 'break-word' }}>{who}</span>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.85 }}>{benefit}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PayoffSlide() {
  const columns = [0, 1, 2].map(col => groups.filter(g => g.column === col));

  return (
    <SlideLayout
      title="The Beneficiaries"
      subtitle="An explicit process commons: a shared data backbone for delivery and optimisation, across one organisation or an entire industry."
    >
      <div className="flex-1 min-h-0 grid grid-cols-3 gap-8">
        {columns.map((colGroups, i) => (
          <div key={i} className="flex flex-col gap-4">
            {colGroups.map(({ label, rows, boxed }) => (
              <GroupBlock key={label} label={label} rows={rows} boxed={boxed} />
            ))}
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}
