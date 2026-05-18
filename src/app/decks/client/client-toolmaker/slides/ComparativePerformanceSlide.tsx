import { SlideLayout } from '@/components/slides/SlideLayout';

const points = [
  {
    label: 'Platform Agnostic by Design',
    detail: 'Merit records process execution regardless of which tool is running it. A contractor using three manufacturers on the same site generates comparable, normalised data across all of them.',
  },
  {
    label: 'Performance Becomes Evidence',
    detail: 'Cycle time, deviation rate, rework frequency - the data is there across thousands of executions. Comparative performance is no longer a marketing claim. It is a number the contractor produced themselves.',
  },
  {
    label: 'The Best Hardware Sales Tool You Have',
    detail: 'When your tool outperforms the alternative in the data the contractor trusts, that is the close. Not a brochure. Not a demo. Their own record.',
  },
];

export function ComparativePerformanceSlide() {
  return (
    <SlideLayout>

      <div className="flex-1 min-h-0 flex flex-col justify-center gap-6 px-4">
        <div>
          <p className="text-3xl font-bold leading-tight mb-3" style={{ color: 'var(--slide-primary)' }}>
            Merit works with every tool on site - including your competitors'.
          </p>
          <p className="text-3xl font-bold leading-tight" style={{ color: 'var(--slide-primary)', opacity: 0.4 }}>
            That is what makes comparative performance impossible to argue with.
          </p>
        </div>

        <p className="text-sm leading-relaxed max-w-2xl" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>
          The process layer is not locked to your hardware. Contractors adopt Merit to manage process across their whole operation - across suppliers, across job types, across crews. The result is a dataset that spans every tool they run. Where your equipment performs better, that performance is explicit, measured, and owned by the contractor. It is not your claim. It is their data.
        </p>
      </div>

      <div
        className="shrink-0 flex items-stretch gap-px rounded-lg overflow-hidden"
        style={{ border: '1px solid var(--slide-border-primary)' }}
      >
        {points.map((p, i) => (
          <div
            key={p.label}
            className="flex-1 flex flex-col justify-center px-5 py-3 gap-1"
            style={{
              backgroundColor: 'var(--slide-bg-primary-muted)',
              borderLeft: i > 0 ? '1px solid var(--slide-border-primary)' : 'none',
            }}
          >
            <div className="text-xs font-semibold" style={{ color: 'var(--slide-primary)' }}>{p.label}</div>
            <div className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.55 }}>{p.detail}</div>
          </div>
        ))}
      </div>

    </SlideLayout>
  );
}
