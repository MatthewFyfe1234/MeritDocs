import { SlideLayout } from '@/components/slides/SlideLayout';

function Refs({ nums }: { nums?: number[] }) {
  if (!nums?.length) return null;
  return (
    <>
      {nums.map((n) => (
        <sup key={n} className="font-semibold ml-px" style={{ color: 'var(--slide-accent)', fontSize: '0.6rem' }}>
          [{n}]
        </sup>
      ))}
    </>
  );
}

export function DisconnectSlide() {
  const rows: {
    dimension: string;
    problem: string;
    example: string;
    stat: string | null;
    statDetail: string;
    refs?: number[];
  }[] = [
    {
      dimension:  'Visibility',
      problem:    'After delivery, the toolmaker has no view of how their equipment is being used.',
      example:    'e.g. A machine ships configured for one material class. The operator uses it on another. Nobody knows until the warranty claim arrives.',
      stat:       null,
      statDetail: 'Zero operational data returned to the manufacturer post-sale in most tooling relationships',
    },
    {
      dimension:  'Safety',
      problem:    'Correct operating procedure lives in a manual, not in the process itself.',
      example:    'e.g. A step is skipped under time pressure. The tool is used outside its rated parameters. The incident is preventable and untraceable.',
      stat:       '108K',
      statDetail: 'Construction workers killed on site every year - 30% of all occupational fatalities globally (ILO)',
      refs:       [1],
    },
    {
      dimension:  'Maintenance',
      problem:    'Failures are discovered, not anticipated. Maintenance is reactive by default.',
      example:    'e.g. A bearing fails on the third shift. The line stops for 11 hours. The wear pattern had been visible in the usage data for weeks.',
      stat:       '3-5×',
      statDetail: 'Higher cost of reactive vs planned maintenance (US Department of Energy)',
      refs:       [2],
    },
    {
      dimension:  'Performance',
      problem:    'Which configurations underperform, and why, is invisible to the maker.',
      example:    'e.g. A batch of units from a revised component spec begins failing at 70% of the rated cycle count. The signal takes months to reach the design team.',
      stat:       '80%',
      statDetail: 'Of failures are traceable to just 20% of identifiable failure modes - patterns in the field data that never return to the maker.',
      refs:       [3],
    },
    {
      dimension:  'Improvement',
      problem:    'Field data never reaches the people who can act on it.',
      example:    'e.g. The design team relies on warranty logs and service reports, not real usage data. Each product generation starts from the same blind spot.',
      stat:       null,
      statDetail: 'R&D cycles informed by service reports rather than continuous operational data',
    },
  ];

  return (
    <SlideLayout
      title="The Hard Cutoff"
      subtitle="At the point of sale, the toolmaker's visibility ends. The field runs dark."
    >
      <div className="grid gap-x-4 mb-1 shrink-0 px-1"
        style={{ gridTemplateColumns: '100px 1fr 220px' }}>
        <div />
        <div className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--slide-text)', opacity: 0.35 }}>The gap</div>
        <div className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--slide-primary)', opacity: 0.6 }}>The cost</div>
      </div>

      <div className="flex-1 min-h-0 flex flex-col"
        style={{ borderTop: '1px solid var(--slide-border-primary)' }}>
        {rows.map(({ dimension, problem, example, stat, statDetail, refs }) => (
          <div
            key={dimension}
            className="grid gap-x-4 items-center py-1.5 flex-1"
            style={{
              gridTemplateColumns: '100px 1fr 220px',
              borderBottom: '1px solid var(--slide-border-primary)',
            }}
          >
            <span className="text-xs font-semibold px-1" style={{ color: 'var(--slide-primary)' }}>
              {dimension}
            </span>

            <div className="flex flex-col gap-0.5">
              <span className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.7 }}>
                {problem}
              </span>
              <span className="text-xs leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.45 }}>
                {example}
              </span>
            </div>

            <div className="flex flex-col gap-0.5">
              {stat && (
                <span className="text-xl font-bold leading-tight"
                  style={{ color: 'var(--slide-accent)' }}>
                  {stat}
                </span>
              )}
              <span className="text-xs leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>
                {statDetail}<Refs nums={refs} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}
