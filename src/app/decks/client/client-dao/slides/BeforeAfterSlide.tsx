import { UserX, HelpCircle, RefreshCw, Users, BarChart2, BookOpen } from 'lucide-react';
import { SlideLayout } from '@/components/slides/SlideLayout';

const workflowStages = [
  { name: 'Propose', partner: 'Members, board' },
  { name: 'Plan',    partner: 'MD, PM, members' },
  { name: 'Execute', partner: 'Site / factory' },
  { name: 'Review',  partner: 'PM, peers' },
  { name: 'Reward',  partner: 'Finance, AGM' },
];

const pairs = [
  {
    ProblemIcon: UserX,
    problemTitle: 'Accountability lives in whoever accepted the manager role',
    problemText: 'In the absence of a neutral authority, operational accountability concentrates in a person, which means it is personal, political, and resented. Enforcing a stage gate requires social capital the PM may not have and cannot afford to spend.',
    SolutionIcon: Users,
    solutionTitle: 'Accountability lives in the process model',
    solutionText: 'Stage gates are system states, not management decisions. A step is complete when its outputs exist, not when someone says so. The PM points to the model; the model points to the gap. No personal authority required.',
  },
  {
    ProblemIcon: HelpCircle,
    problemTitle: 'Surplus divided by politics, not contribution',
    problemText: 'At year end, the cooperative has no objective record of who delivered what. Distribution defaults to seniority, relationships, or whoever argued most convincingly at the AGM. The founding logic inverts.',
    SolutionIcon: BarChart2,
    solutionTitle: 'Every delivery builds an objective contribution record',
    solutionText: 'Every completed step, verified output, and closed stage gate is attributed to the member who delivered it. Surplus distribution is based on an accumulated record built continuously, not reconstructed at year end.',
  },
  {
    ProblemIcon: RefreshCw,
    problemTitle: 'Organisational knowledge resets with member turnover',
    problemText: 'When experienced members leave, their process knowledge and project context leave with them. Each cohort rediscovers what the previous one learned. The organisation does not get smarter. It restarts.',
    SolutionIcon: BookOpen,
    solutionTitle: 'Every project builds on the last',
    solutionText: 'Completed projects accumulate into a shared dataset. Future planning, estimation, and resource allocation all improve from what past projects actually produced. The organisation gets smarter with every delivery, independent of who stays.',
  },
];

export function BeforeAfterSlide() {
  return (
    <SlideLayout
      title="Today vs. With Merit OI"
      subtitle="One accountability structure that scales without surrendering democratic governance"
    >
      <div className="flex-1 min-h-0 grid grid-cols-2 gap-6">

        {/* Left: Today */}
        <div className="flex flex-col gap-3 min-h-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold" style={{ color: '#6b7a85' }}>Today</span>
            <span className="rounded-full px-2 py-0.5 text-xs font-semibold shrink-0" style={{ backgroundColor: '#fff7ed', color: '#c2410c', border: '1px solid #fed7aa' }}>
              Drift toward hierarchy is the default outcome
            </span>
          </div>

          {/* Problem workflow band */}
          <div className="flex items-stretch" style={{ height: '90px' }}>
            {workflowStages.flatMap((stage, i) => {
              const card = (
                <div
                  key={stage.name}
                  className="flex-1 flex flex-col justify-between rounded-lg border p-2"
                  style={{ backgroundColor: 'var(--slide-bg-muted)', borderColor: '#dde1e4' }}
                >
                  <span className="font-semibold truncate" style={{ color: '#5a6a75', fontSize: 'var(--slide-sz-sm)' }}>{stage.name}</span>
                  <div className="flex flex-col gap-0.5">
                    <span className="rounded px-1 py-px" style={{ backgroundColor: '#e4e8ec', color: '#6b7a85', fontSize: 'var(--slide-sz-tag)' }}>{stage.partner}</span>
                    <span className="rounded px-1 py-px" style={{ backgroundColor: '#fff7ed', color: '#c2410c', border: '1px solid #fed7aa', fontSize: 'var(--slide-sz-tag)' }}>No record</span>
                  </div>
                </div>
              );
              if (i < workflowStages.length - 1) {
                return [card, (
                  <div key={`gap-${i}`} className="flex flex-col items-center justify-center shrink-0" style={{ width: '20px' }}>
                    <div style={{ width: '100%', borderTop: '1.5px dashed #c8d4da' }} />
                    <span style={{ fontSize: '10px', color: '#b8c8d2', marginTop: '2px' }}>✗</span>
                  </div>
                )];
              }
              return [card];
            })}
          </div>

          {/* Problem cards */}
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-3">
            {pairs.map((p) => (
              <div
                key={p.problemTitle}
                className="min-h-0 rounded-lg border p-3 flex flex-col"
                style={{ backgroundColor: 'var(--slide-bg-muted)', borderColor: '#dde1e4', borderLeft: '3px solid #9ca8b4' }}
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="p-1 rounded shrink-0" style={{ backgroundColor: '#e4e8ec' }}>
                    <p.ProblemIcon className="w-3.5 h-3.5" style={{ color: '#6b7a85' }} />
                  </div>
                  <h4 className="text-xs font-semibold leading-tight" style={{ color: '#5a6a75' }}>{p.problemTitle}</h4>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>{p.problemText}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: With Merit OI */}
        <div className="flex flex-col gap-3 min-h-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold" style={{ color: 'var(--slide-primary)' }}>With Merit OI</span>
            <span className="text-xs" style={{ color: 'var(--slide-text)', opacity: 0.55 }}>
              Every member, every project, one evidence base
            </span>
          </div>

          {/* Solution workflow band */}
          <div className="flex items-stretch" style={{ height: '90px' }}>
            {workflowStages.flatMap((stage, i) => {
              const card = (
                <div
                  key={stage.name}
                  className="flex-1 flex flex-col justify-between rounded-lg border p-2"
                  style={{ backgroundColor: 'var(--slide-bg-primary-muted)', borderColor: 'var(--slide-border-primary)' }}
                >
                  <span className="font-semibold truncate" style={{ color: 'var(--slide-primary)', fontSize: 'var(--slide-sz-sm)' }}>{stage.name}</span>
                  <div className="flex flex-col gap-0.5">
                    <span className="rounded px-1 py-px" style={{ color: '#5a6a75', fontSize: 'var(--slide-sz-tag)' }}>{stage.partner}</span>
                    <span className="self-start rounded px-1.5 py-0.5 text-white font-semibold" style={{ backgroundColor: 'var(--slide-primary)', fontSize: 'var(--slide-sz-tag)' }}>
                      Merit OI
                    </span>
                  </div>
                </div>
              );
              if (i < workflowStages.length - 1) {
                return [card, (
                  <div key={`conn-${i}`} className="flex flex-col items-center justify-center shrink-0" style={{ width: '20px' }}>
                    <div style={{ width: '100%', borderTop: '1.5px solid var(--slide-primary)', opacity: 0.35 }} />
                    <span style={{ fontSize: '10px', color: 'var(--slide-primary)', opacity: 0.5, marginTop: '2px' }}>→</span>
                  </div>
                )];
              }
              return [card];
            })}
          </div>

          {/* Solution cards */}
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-3">
            {pairs.map((p) => (
              <div
                key={p.solutionTitle}
                className="min-h-0 bg-white rounded-lg border p-3 shadow-sm flex flex-col"
                style={{ borderColor: 'var(--slide-border)', borderLeft: '3px solid var(--slide-primary)' }}
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="p-1 rounded shrink-0" style={{ backgroundColor: 'var(--slide-bg)' }}>
                    <p.SolutionIcon className="w-3.5 h-3.5" style={{ color: 'var(--slide-primary)' }} />
                  </div>
                  <h4 className="text-xs font-semibold leading-tight" style={{ color: 'var(--slide-primary)' }}>{p.solutionTitle}</h4>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.8 }}>{p.solutionText}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </SlideLayout>
  );
}
