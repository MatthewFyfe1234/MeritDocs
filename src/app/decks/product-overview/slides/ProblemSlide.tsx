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
    quote?: string;
    quoteRefs?: number[];
    stat: string | null;
    statDetail: string;
    refs?: number[];
  }[] = [
    {
      dimension:  'Measurability',
      problem:    'Performance is not captured or measured, only estimated or felt. Strategic decisions rest on intuition rather than evidence.',
      stat:       '3×',
      statDetail: 'More likely to report significant improvements in decision-making at data-driven organisations',
      refs:       [1],
    },
    {
      dimension:  'Predictability',
      problem:    'Delivery is managed through estimates and ranges. Reactive adjustment is the norm: most organisations have no objective basis for predicting outcomes.',
      quote:      'Static project plans in a dynamic system are a form of denial.',
      quoteRefs:  [3],
      stat:       '$97M',
      statDetail: 'Wasted per $1 billion invested due to poor project performance',
      refs:       [2],
    },
    {
      dimension:  'Transparency',
      problem:    'There is no live picture. Progress is communicated through meetings and reports. Problems are only visible after the fact.',
      stat:       '4×',
      statDetail: 'Outperformance by companies rated as trustworthy, relative to peers, by market value',
      refs:       [4],
    },
    {
      dimension:  'Planning',
      problem:    'Every delivery is planned from scratch. Past deliveries generate knowledge, but it remains unstructured and is never systematically applied.',
      stat:       '3–4 hrs',
      statDetail: 'Lost daily per employee to automatable tasks',
      refs:       [5],
    },
    {
      dimension:  'Evaluation',
      problem:    'Selection and compensation both rest on subjective judgement. Neither reflects what people actually deliver.',
      stat:       '75%',
      statDetail: 'Average weight managers place on subjective impressions when evaluating employee performance',
      refs:       [7],
    },
    {
      dimension:  'Integration',
      problem:    'Data is fragmented by function. Knowledge is fragmented by individual. Neither gap is visible until something breaks.',
      quote:      'Replacing a person is usually easier than replacing what they know.',
      quoteRefs:  [6],
      stat:       '20–30%',
      statDetail: 'Revenue lost to data silos',
      refs:       [8],
    },
  ];

  return (
    <div className="w-full h-full p-8 flex flex-col">

      <div className="mb-2 shrink-0">
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--slide-primary)' }}>
          The Fragmented Status Quo
        </h2>
        <div className="w-20 h-1 mb-2" style={{ backgroundColor: 'var(--slide-accent)' }} />
        <p className="text-sm" style={{ color: 'var(--slide-text)', opacity: 0.7 }}>
          Six structural failures. Each measurable. Each addressable.
        </p>
      </div>

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
        {rows.map(({ dimension, problem, quote, quoteRefs, stat, statDetail, refs }) => (
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
              {quote && (
                <span className="text-xs italic leading-snug" style={{ color: 'var(--slide-primary)', opacity: 0.6 }}>
                  "{quote}"<Refs nums={quoteRefs} />
                </span>
              )}
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

    </div>
  );
}
