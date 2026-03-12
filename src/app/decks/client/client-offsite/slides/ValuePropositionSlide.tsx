import { Activity, ArrowLeftRight, TrendingUp } from 'lucide-react';
import { SlideLayout } from '@/components/slides/SlideLayout';

const pillars = [
  {
    Icon: Activity,
    stage: 'VP of Operations',
    title: 'Shop floor visibility, not a rearview mirror',
    text: 'Capacity is modelled in real time across people, skills, and production slots, not compiled manually from disconnected systems at month-end. Leadership, sales, and project management all see the same picture.',
    isAccent: false,
  },
  {
    Icon: ArrowLeftRight,
    stage: 'Project Manager',
    title: "Handoffs that don't leak",
    text: 'Documents are attached to specific process steps and visible to everyone who needs them. Delivery commitments reflect what the factory can actually absorb. No more chasing drawings, BOMs, and dates across email threads and shared drives.',
    isAccent: false,
  },
  {
    Icon: TrendingUp,
    stage: 'Sales / Estimator',
    title: 'Every job sharpens the next quote',
    text: 'Historical performance flows back into estimates automatically. Quotes are anchored in what past jobs actually cost and how long they took, not in memory or a file no one else can find. Bid faster, bid more, without adding headcount.',
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
          Merit OI gives offsite structural fabricators one connected workflow that generates deterministic cost and delivery forecasts at the point of spec, replacing the fragmented tool stack that causes margin leakage and turning every completed project into sharper estimates, more reliable commitments, and institutional knowledge that compounds.
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
