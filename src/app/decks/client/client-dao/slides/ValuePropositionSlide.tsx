import { Compass, PiggyBank, HardHat } from 'lucide-react';
import { SlideLayout } from '@/components/slides/SlideLayout';

const pillars = [
  {
    Icon: Compass,
    stage: 'Managing Director / CEO',
    title: 'Operational authority without political cost',
    text: 'The process model governs execution, not you. Deviations are flagged by the system, not by a manager making a judgment call. You can lead operationally without accumulating the authority that slowly undermines your democratic mandate.',
    isAccent: false,
  },
  {
    Icon: PiggyBank,
    stage: 'Finance / Surplus Distribution',
    title: 'Surplus divided by record, not politics',
    text: 'Every member\'s contribution is tracked against the process model throughout the year, not reconstructed at year end from memory and advocacy. Surplus distribution is based on what was actually delivered. The argument doesn\'t start because the record already exists.',
    isAccent: false,
  },
  {
    Icon: HardHat,
    stage: 'Project Manager / Site Foreman',
    title: 'Coordination without authority',
    text: 'You don\'t need to tell people what to do. The model does. Stage gates define exactly what is required and who is responsible at each point. Progress is visible to every member. There is no request to refuse.',
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
          Merit OI gives worker cooperatives in construction and manufacturing the data layer their principles have always required: every member's contribution objectively recorded, every delivery governed by the process model rather than a manager, and every completed project making the next one sharper. When governance has the right evidence, the decisions it was designed to make become straightforward.
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
