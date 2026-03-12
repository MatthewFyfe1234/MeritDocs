import { LayoutDashboard, Calculator, ShieldCheck } from 'lucide-react';
import { SlideLayout } from '@/components/slides/SlideLayout';

const pillars = [
  {
    Icon: LayoutDashboard,
    stage: 'Project Director / MD',
    title: 'Live project performance, not assembled estimates',
    text: 'Programme progress is recorded by completed process steps, not partner self-assessment. Cost and variation data follows automatically from what has actually been done. Decisions are made against current evidence across every active project.',
    isAccent: false,
  },
  {
    Icon: Calculator,
    stage: 'Commercial Manager / QS',
    title: 'Every variation captured, every notice served',
    text: 'Change events are logged at source against the programme. Contractual notice windows are tracked as milestones. The final account is assembled continuously through the project, not reconstructed at the end when the margin has already been lost. Quantity estimates are reconciled against actual outturn, so every completed project improves the accuracy of the next takeoff.',
    isAccent: false,
  },
  {
    Icon: ShieldCheck,
    stage: 'HSE Manager',
    title: 'An auditable compliance record, always current',
    text: 'RAMS and method statements are stage-gated into the delivery process: each step opens only when documentation is in place. Operative credentials, site access permits and trade competency cards, are collected and verified at onboarding. The compliance record is built in delivery; when an incident occurs, the audit trail already exists.',
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
          Merit OI gives general contractors a live, objective record of project delivery: what is happening on site, what has been claimed and agreed, and what the accumulated evidence says about the partners and projects that protect margin today and sharpen the next tender.
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
