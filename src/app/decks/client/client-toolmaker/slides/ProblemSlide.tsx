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

export function ProblemSlide() {
  const rows: {
    dimension: string;
    problem: string;
    example: string;
    stat: string | null;
    statDetail: string;
    refs?: number[];
  }[] = [
    {
      dimension:  'Fragmentation',
      problem:    'Field operations run on disconnected tools. Data lives in different systems for every function.',
      example:    'e.g. The job planner uses one system. The operator uses another. The site manager tracks progress in a spreadsheet. Nobody sees the same picture.',
      stat:       '41%',
      statDetail: 'of global AECO teams cite poor coordination and communication as a leading cause of rework',
      refs:       [8],
    },
    {
      dimension:  'Cost Invisibility',
      problem:    'No one knows which jobs made money until accounts close. By then the pattern is unreadable.',
      example:    'e.g. A contractor completes 40 jobs this quarter. One crew consistently overruns on setup. The signal is invisible until the year-end review.',
      stat:       '$1.8T',
      statDetail: 'lost globally to inaccurate and incomplete field data in a single year',
      refs:       [9],
    },
    {
      dimension:  'Knowledge Loss',
      problem:    'Expertise leaves with the person who holds it. Processes live in heads, not systems.',
      example:    'e.g. A senior operator retires. His ability to read site conditions takes 20 years to replace - or never gets replaced.',
      stat:       '$47M',
      statDetail: 'lost annually per large business from inefficient knowledge sharing',
      refs:       [10],
    },
    {
      dimension:  'Compliance',
      problem:    'Credentialing is manual. Gaps create exposure that only surfaces in claims.',
      example:    'e.g. A subcontractor\'s certification lapses. Nobody checks. The incident happens. The dispute runs for two years.',
      stat:       '2.71×',
      statDetail: 'higher cost of non-compliance vs the cost of maintaining it',
      refs:       [11],
    },
    {
      dimension:  'Accident Liability',
      problem:    'Without process enforcement, safety depends on the operator remembering what they should not do.',
      example:    'e.g. A step is skipped under time pressure. The sequence is wrong. The incident is preventable. The liability is yours.',
      stat:       '$42K',
      statDetail: 'average cost per preventable workplace accident, before legal exposure and premium impact',
      refs:       [12],
    },
  ];

  return (
    <SlideLayout
      title="Your Customer's World"
      subtitle="Five structural failures in contractor operations. Every one measurable. All of them addressable through the process layer."
    >
      <div className="grid gap-x-4 mb-1 shrink-0 px-1"
        style={{ gridTemplateColumns: '110px 1fr 220px' }}>
        <div />
        <div className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--slide-text)', opacity: 0.35 }}>The failure</div>
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
              gridTemplateColumns: '110px 1fr 220px',
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
                <span className="text-xl font-bold leading-tight" style={{ color: 'var(--slide-accent)' }}>
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
