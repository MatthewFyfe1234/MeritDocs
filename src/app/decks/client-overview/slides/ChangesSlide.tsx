export function ChangesSlide() {
  const changes = [
    {
      dimension: 'Measurability',
      before: 'You cannot tell objectively whether a project made money, or why. Performance stays opinion.',
      after:  'Every execution is recorded against the master model and contributes to the shared dataset',
      how:    'The master model provides the consistent structure that makes measurement possible across all deliveries',
    },
    {
      dimension: 'Predictability',
      before: 'Sales commits to dates the factory cannot see. Delivery is managed reactively: problems surface when they have already cost you.',
      after:  'Modelled as a deterministic network. Predictions, not estimates.',
      how:    'The process model, trained on execution data, generates predictions rather than estimates',
    },
    {
      dimension: 'Transparency',
      before: 'Progress comes from whoever you ask. By the time a problem is visible, you are already dealing with the consequences.',
      after:  'Full visibility into the performance of every agent, partner, tool, material and process step',
      how:    'The aggregated dataset surfaces performance across all model components, not just at audit',
    },
    {
      dimension: 'Planning',
      before: 'Every project starts from memory and habit. What worked last time, and what did not, rarely makes it into the next job.',
      after:  'The project map is generated automatically from the spec and the master model',
      how:    'The spec determines which process steps are needed; recommendations for people and inventory follow from delivery history and availability',
    },
    {
      dimension: 'Evaluation',
      before: 'Who gets the next job, and what they are paid, rests on familiarity rather than what they have actually delivered.',
      after:  'Selection ranked by demonstrated performance and availability. Compensation grounded in what was delivered.',
      how:    'The dataset records individual contribution at the delivery level; recommendations and reward follow from the data',
    },
    {
      dimension: 'Integration',
      before: 'Your estimators, factory, site crew, and finance team all carry different pictures of the same project.',
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
