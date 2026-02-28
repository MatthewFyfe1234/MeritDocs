export function ChangesSlide() {
  const changes = [
    {
      dimension: 'Measurability',
      before: 'Performance not captured or measured, only estimated or felt',
      after:  'Every execution is recorded against the master model and contributes to the shared dataset',
      how:    'The master model provides the consistent structure that makes measurement possible across all deliveries',
    },
    {
      dimension: 'Predictability',
      before: 'Delivery managed through estimates and ranges, with no objective basis for predicting outcomes',
      after:  'Modelled as a deterministic network. Predictions, not estimates.',
      how:    'The process model, trained on execution data, generates predictions rather than estimates',
    },
    {
      dimension: 'Transparency',
      before: 'No live picture. Progress communicated through meetings and reports. Problems visible only after the fact.',
      after:  'Full visibility into the performance of every agent, partner, tool, material and process step',
      how:    'The aggregated dataset surfaces performance across all model components, not just at audit',
    },
    {
      dimension: 'Planning',
      before: 'Every delivery planned from scratch. Manual, expertise-dependent and periodically refreshed.',
      after:  'The project map is generated automatically from the spec and the master model',
      how:    'The spec determines which process steps are needed; recommendations for people and inventory follow from delivery history and availability',
    },
    {
      dimension: 'Evaluation',
      before: 'Selection and compensation based on subjective judgement. Neither reflects actual performance.',
      after:  'Selection ranked by demonstrated performance and availability. Compensation grounded in what was delivered.',
      how:    'The dataset records individual contribution at the delivery level; recommendations and reward follow from the data',
    },
    {
      dimension: 'Integration',
      before: 'Each function holds its own data. Individual knowledge is unstructured and invisible to the organisation.',
      after:  'One shared, live picture across the delivery ecosystem',
      how:    'The master model captures what was previously held only in individuals; a single dataset eliminates the need for cross-function reconciliation',
    },
  ];

  return (
    <div className="w-full h-full p-8 flex flex-col">

      <div className="mb-4 shrink-0">
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--slide-primary)' }}>
          What Changes
        </h2>
        <div className="w-20 h-1" style={{ backgroundColor: 'var(--slide-accent)' }} />
      </div>

      {/* Column headers */}
      <div className="grid gap-x-3 mb-1 shrink-0 px-1"
        style={{ gridTemplateColumns: '130px 1fr 20px 1fr' }}>
        <div />
        <div className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--slide-text)', opacity: 0.35 }}>Before</div>
        <div />
        <div className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--slide-primary)', opacity: 0.6 }}>With Merit OI</div>
      </div>

      {/* Rows */}
      <div className="flex-1 min-h-0 flex flex-col" style={{ borderTop: '1px solid var(--slide-border-primary)' }}>
        {changes.map(({ dimension, before, after, how }) => (
          <div
            key={dimension}
            className="grid gap-x-3 items-start py-1.5 flex-1"
            style={{
              gridTemplateColumns: '130px 1fr 20px 1fr',
              borderBottom: '1px solid var(--slide-border-primary)',
            }}
          >
            <span className="text-xs font-semibold px-1 pt-0.5" style={{ color: 'var(--slide-primary)' }}>
              {dimension}
            </span>

            <span className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.4 }}>
              {before}
            </span>

            <span className="text-xs text-center pt-0.5" style={{ color: 'var(--slide-primary)', opacity: 0.3 }}>→</span>

            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-medium leading-relaxed" style={{ color: 'var(--slide-primary)' }}>
                {after}
              </span>
              <span className="text-xs leading-snug italic" style={{ color: 'var(--slide-text)', opacity: 0.5 }}>
                {how}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
