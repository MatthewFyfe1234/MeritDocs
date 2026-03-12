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
      dimension:  'Measurability',
      problem:    'Whether a job was profitable is a matter of opinion, not data.',
      example:    'e.g. A panel module delivers two weeks late. Finance closes the job anyway. Nobody can say if it was profitable.',
      stat:       '3×',
      statDetail: 'More likely to report significant improvements in decision-making at data-driven organisations',
      refs:       [1],
    },
    {
      dimension:  'Predictability',
      problem:    'Sales commits to delivery dates the factory has no visibility of.',
      example:    'e.g. Sales books a 10-week delivery. The factory schedule slips on week 3. The client hears about it on week 9.',
      stat:       '$97M',
      statDetail: 'Wasted per $1 billion invested due to poor project performance',
      refs:       [2],
    },
    {
      dimension:  'Transparency',
      problem:    'Progress updates come from whoever you ask, not from the system.',
      example:    'e.g. The status is "on track" until it is "we have a problem", with nothing in between.',
      stat:       '4×',
      statDetail: 'Outperformance by companies rated as trustworthy, relative to peers, by market value',
      refs:       [4],
    },
    {
      dimension:  'Planning',
      problem:    'Every spec starts from scratch, drawing on memory rather than past data.',
      example:    'e.g. Each new spec is assembled from scratch, borrowing from a previous job\'s email thread.',
      stat:       '3–4 hrs',
      statDetail: 'Lost daily per employee to automatable tasks',
      refs:       [5],
    },
    {
      dimension:  'Evaluation',
      problem:    'Selection rests on familiarity rather than what people have actually delivered.',
      example:    'e.g. The same subcontractor is re-engaged because "they\'ve always been fine", despite two late deliveries last year.',
      stat:       '75%',
      statDetail: 'Average weight managers place on subjective impressions when evaluating employee performance',
      refs:       [7],
    },
    {
      dimension:  'Integration',
      problem:    'Each team carries a different picture of the same project.',
      example:    'e.g. The estimator\'s take-off, the factory BOM, and the site delivery note all show different quantities for the same job.',
      stat:       '20–30%',
      statDetail: 'Revenue lost to data silos',
      refs:       [8],
    },
  ];

  return (
    <SlideLayout
      title="The Fragmented Status Quo"
      subtitle="Six structural failures. Each measurable. Each addressable."
    >

      {/* Column headers */}
      <div className="grid gap-x-4 mb-1 shrink-0 px-1"
        style={{ gridTemplateColumns: '120px 1fr 240px' }}>
        <div />
        <div className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--slide-text)', opacity: 0.35 }}>The problem</div>
        <div className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--slide-primary)', opacity: 0.6 }}>The cost</div>
      </div>

      {/* Rows */}
      <div className="flex-1 min-h-0 flex flex-col"
        style={{ borderTop: '1px solid var(--slide-border-primary)' }}>
        {rows.map(({ dimension, problem, example, stat, statDetail, refs }) => (
          <div
            key={dimension}
            className="grid gap-x-4 items-center py-1.5 flex-1"
            style={{
              gridTemplateColumns: '120px 1fr 240px',
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
