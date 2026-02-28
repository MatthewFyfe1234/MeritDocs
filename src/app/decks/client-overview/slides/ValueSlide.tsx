export function ValueSlide() {
  const columns = [
    {
      horizon: 'Immediately',
      accent: false,
      points: [
        'Delivery is predictable, not estimated',
        'Every decision grounded in real execution data',
        'Every project mapped automatically from the spec',
        'Deviations visible in real time, not discovered at audit',
        'All functions operate from one shared picture',
      ],
      impact: '10–20% productivity uplift',
    },
    {
      horizon: 'Over time',
      accent: false,
      points: [
        'The model learns from every project you complete',
        'Planning quality improves automatically',
        'Selection sharpens as the dataset grows',
        'Management overhead reduces as the model handles coordination and reporting',
      ],
      impact: '10–20% reduction in management costs',
    },
    {
      horizon: 'Enduringly',
      accent: true,
      points: [
        'A proprietary dataset built from your own execution history',
        'Institutional knowledge that outlasts any individual',
        'The longer it runs, the sharper your estimates and the wider your advantage',
      ],
      impact: '5–15% reduction in total operational costs',
    },
  ];

  return (
    <div className="w-full h-full p-8 flex flex-col">

      <div className="mb-6 shrink-0">
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--slide-primary)' }}>
          The Compounding Advantage
        </h2>
        <div className="w-20 h-1 mb-2" style={{ backgroundColor: 'var(--slide-accent)' }} />
        <p className="text-sm" style={{ color: 'var(--slide-text)', opacity: 0.7 }}>
          Every project makes the model smarter. Every job widens the gap.
        </p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-3 gap-4">
        {columns.map(({ horizon, accent, points, impact }) => (
          <div
            key={horizon}
            className="flex flex-col rounded-lg p-5"
            style={{
              backgroundColor: accent ? 'var(--slide-bg-accent-muted)' : 'var(--slide-bg-primary-muted)',
              border: `1px solid ${accent ? 'var(--slide-accent)' : 'var(--slide-border-primary)'}`,
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: accent ? 'var(--slide-accent)' : 'var(--slide-primary)', opacity: accent ? 1 : 0.6 }}
            >
              {horizon}
            </p>
            <ul className="flex flex-col gap-3">
              {points.map(point => (
                <li key={point} className="flex items-start gap-2">
                  <span
                    className="mt-1.5 shrink-0 w-1 h-1 rounded-full"
                    style={{ backgroundColor: accent ? 'var(--slide-accent)' : 'var(--slide-primary)', opacity: 0.5 }}
                  />
                  <span
                    className="text-sm leading-snug"
                    style={{ color: accent ? 'var(--slide-primary)' : 'var(--slide-text)', fontWeight: accent ? 500 : 400 }}
                  >
                    {point}
                  </span>
                </li>
              ))}
            </ul>
            <div
              className="mt-auto pt-3 border-t"
              style={{ borderColor: accent ? 'var(--slide-accent)' : 'var(--slide-border-primary)', opacity: 0.6 }}
            >
              <p className="text-xs font-semibold" style={{ color: accent ? 'var(--slide-accent)' : 'var(--slide-primary)' }}>
                Indicative impact
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--slide-text)' }}>
                {impact}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
