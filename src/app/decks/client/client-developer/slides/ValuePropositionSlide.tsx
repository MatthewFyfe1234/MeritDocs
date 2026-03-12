import { LayoutDashboard, BarChart2, BadgeCheck } from 'lucide-react';
import { SlideLayout } from '@/components/slides/SlideLayout';

const pillars = [
  {
    Icon: LayoutDashboard,
    stage: 'Development Director',
    title: 'Progress you can trust, forecasts grounded in history',
    text: 'Programme progress is measured by completed process steps, not partner self-assessment. Forward forecasts are generated from your own historical project data. What you see reflects what is actually happening, not what someone chose to report.',
    isAccent: false,
  },
  {
    Icon: BarChart2,
    stage: 'CFO / Finance Director',
    title: 'A cost picture you can trust',
    text: 'Live financial data across every development. Drawdowns are tied to stage gate completion: payment is released when the work is done and the documentation is in. You authorise against a record, not a partner self-report.',
    isAccent: false,
  },
  {
    Icon: BadgeCheck,
    stage: 'Procurement Director',
    title: 'Partners selected on evidence, not memory',
    text: 'Every engagement builds a delivery record. Future partner selection is anchored in performance data, not the last impression or the lowest fee. Each project sharpens the next decision.',
    isAccent: true,
  },
];

export function ValuePropositionSlide() {
  return (
    <SlideLayout title="What Merit OI Delivers">

      {/* Value statement */}
      <div
        className="shrink-0 mb-5 rounded-lg px-5 py-4"
        style={{ backgroundColor: 'var(--slide-bg-primary-muted)', borderLeft: '4px solid var(--slide-primary)' }}
      >
        <p className="text-base font-medium leading-relaxed" style={{ color: 'var(--slide-primary)' }}>
          Merit OI gives property developers a live, objective picture of delivery performance across the whole portfolio: what partners are delivering, what projects are costing, and what the accumulated record says about where to allocate capital next.
        </p>
      </div>

      {/* Three pillars */}
      <div className="flex-1 min-h-0 grid grid-cols-3 gap-5">
        {pillars.map((p) => (
          <div
            key={p.title}
            className="min-h-0 bg-white rounded-lg border flex flex-col overflow-hidden shadow-sm"
            style={{ borderColor: p.isAccent ? 'var(--slide-accent)' : 'var(--slide-border)' }}
          >
            {/* Card header */}
            <div
              className="p-4 pb-3 shrink-0"
              style={{
                backgroundColor: p.isAccent ? '#faf5ff' : 'var(--slide-bg-primary-muted)',
                borderBottom: `1px solid ${p.isAccent ? '#e9d5ff' : '#cfe0db'}`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="p-1.5 rounded-md shrink-0"
                  style={{ backgroundColor: p.isAccent ? '#f3e8ff' : 'var(--slide-bg)' }}
                >
                  <p.Icon className="w-4 h-4" style={{ color: p.isAccent ? 'var(--slide-accent)' : 'var(--slide-primary)' }} />
                </div>
                <span
                  className="text-xs font-semibold tracking-wide uppercase"
                  style={{ color: p.isAccent ? 'var(--slide-accent)' : 'var(--slide-primary)', opacity: 0.6 }}
                >
                  {p.stage}
                </span>
              </div>
              <h3
                className="text-sm font-bold leading-tight"
                style={{ color: p.isAccent ? 'var(--slide-accent)' : 'var(--slide-primary)' }}
              >
                {p.title}
              </h3>
            </div>

            {/* Card body */}
            <div className="flex-1 p-4">
              <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.8 }}>
                {p.text}
              </p>
            </div>

          </div>
        ))}
      </div>

    </SlideLayout>
  );
}
