import { SlideLayout } from '@/components/slides/SlideLayout';

export function ToolmakerValueSlide() {
  const rows: {
    dimension: string;
    before: string;
    after: string;
  }[] = [
    {
      dimension: 'Maintenance',
      before:    'Failures are discovered when they happen. Service calls are reactive. Warranty costs are unpredictable.',
      after:     'Usage patterns surface wear signals weeks before failure. Maintenance becomes scheduled, not emergency.',
    },
    {
      dimension: 'Safety',
      before:    'Correct operation depends on the operator reading a manual. Errors occur. Liability is hard to attribute.',
      after:     'Stage gates in the process model enforce correct sequencing. Deviation is impossible to overlook.',
    },
    {
      dimension: 'Product Data',
      before:    'Design teams rely on service logs and warranty claims. Feedback is slow, incomplete, and anecdotal.',
      after:     'Every execution contributes to a dataset mapped to configuration, environment, and outcome. R&D draws from the field.',
    },
    {
      dimension: 'Customer Success',
      before:    'The toolmaker cannot see whether customers are achieving good outcomes with their equipment.',
      after:     'Execution data shows which customers are performing well and which need support before problems escalate.',
    },
    {
      dimension: 'Differentiation',
      before:    'Competing on specification alone. Price pressure increases as specifications converge across competitors.',
      after:     'The process layer is a durable differentiator. Competitors can copy the hardware. They cannot copy the operational record.',
    },
  ];

  const colW = '90px 1fr 1fr';

  return (
    <SlideLayout
      title="For the Toolmaker"
      subtitle="Every connected tool returns data that improves the product, de-risks service, and deepens the customer relationship."
    >
      {/* Column headers */}
      <div className="grid gap-x-4 mb-1 shrink-0 px-1"
        style={{ gridTemplateColumns: colW }}>
        <div />
        <div className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--slide-text)', opacity: 0.35 }}>Without Merit</div>
        <div className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--slide-primary)', opacity: 0.6 }}>With Merit</div>
      </div>

      <div className="flex-1 min-h-0 flex flex-col"
        style={{ borderTop: '1px solid var(--slide-border-primary)' }}>
        {rows.map(({ dimension, before, after }) => (
          <div
            key={dimension}
            className="grid gap-x-4 items-center py-1.5 flex-1"
            style={{
              gridTemplateColumns: colW,
              borderBottom: '1px solid var(--slide-border-primary)',
            }}
          >
            <span className="text-xs font-semibold px-1" style={{ color: 'var(--slide-primary)' }}>
              {dimension}
            </span>

            <span className="text-xs leading-relaxed pr-2" style={{ color: 'var(--slide-text)', opacity: 0.4 }}>
              {before}
            </span>

            <span className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.75 }}>
              {after}
            </span>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}
