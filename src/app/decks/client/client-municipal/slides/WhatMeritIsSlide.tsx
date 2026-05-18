import { SlideLayout } from '@/components/slides/SlideLayout';

const leftItems = [
  {
    label: 'Route Planning',
    detail: 'Define a route by distance, collection points, area classification and vehicle type. Merit calculates predicted cycle time and fuel consumption before the job begins.',
  },
  {
    label: 'Staff & Asset Scheduling',
    detail: 'Calendar-based scheduling for operators and vehicles. Conflicts and availability visible across the fleet before dispatch.',
  },
  {
    label: 'Job Execution',
    detail: 'Vehicle telemetry triggers the process model. Every step is recorded against the specification as it happens.',
  },
  {
    label: 'Documentation',
    detail: 'Process documents, compliance certificates, training records and vehicle history stored against the relevant asset or person.',
  },
];

const rightItems = [
  'A verified record of every job, every asset, every operator',
  'Actual vs predicted performance for every route',
  'A continuously refined benchmark built from real operational data',
  'An auditable trail that exists as a byproduct of normal work, not additional administration',
];

export function WhatMeritIsSlide() {
  return (
    <SlideLayout
      title="What Merit Is"
      subtitle="An operational platform. The audit record is a byproduct."
    >
      <div className="flex-1 min-h-0 flex flex-col gap-3">
        <div className="flex-1 min-h-0 flex flex-row gap-5">

          {/* Left: what operators do */}
          <div className="flex flex-col flex-1 min-w-0 gap-1.5">
            <div className="text-xs font-semibold uppercase tracking-widest px-1"
              style={{ color: 'var(--slide-primary)', opacity: 0.55 }}>
              What operators do in Merit every day
            </div>
            <div className="flex-1 min-h-0 flex flex-col"
              style={{ borderTop: '1px solid var(--slide-border-primary)' }}>
              {leftItems.map(({ label, detail }) => (
                <div
                  key={label}
                  className="grid gap-x-4 items-center py-2 flex-1"
                  style={{
                    gridTemplateColumns: '140px 1fr',
                    borderBottom: '1px solid var(--slide-border-primary)',
                  }}
                >
                  <span className="text-xs font-semibold px-1" style={{ color: 'var(--slide-primary)' }}>
                    {label}
                  </span>
                  <span className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>
                    {detail}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-px self-stretch shrink-0" style={{ backgroundColor: 'var(--slide-border-primary)', opacity: 0.3 }} />

          {/* Right: what this produces */}
          <div className="flex flex-col gap-1.5" style={{ width: '36%' }}>
            <div className="text-xs font-semibold uppercase tracking-widest px-1"
              style={{ color: 'var(--slide-accent)', opacity: 0.75 }}>
              What this produces
            </div>
            <div className="flex flex-col flex-1 rounded-lg overflow-hidden"
              style={{ border: '1px solid var(--slide-accent)', backgroundColor: 'var(--slide-bg-accent-muted)' }}>
              {rightItems.map((item, i) => (
                <div
                  key={i}
                  className="flex-1 flex items-center px-4 gap-3"
                  style={{ borderTop: i > 0 ? '1px solid var(--slide-border-primary)' : 'none' }}
                >
                  <div className="shrink-0 w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: 'var(--slide-accent)', opacity: 0.8 }} />
                  <span className="text-xs leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.75 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        <p className="shrink-0 text-xs italic text-center"
          style={{ color: 'var(--slide-text)', opacity: 0.35 }}>
          Merit sits inside the daily operation. The compliance record, the warranty evidence, and the contract intelligence are what the data becomes, not what the operator has to create.
        </p>
      </div>
    </SlideLayout>
  );
}
