import { FileText, Hammer, Key, Calculator, AlertTriangle, ShieldCheck, ClipboardX, ClipboardCheck, Clock, LineChart } from 'lucide-react';
import { SlideLayout } from '@/components/slides/SlideLayout';

const stages = [
  { Icon: FileText,   name: 'Pre-construction', partner: 'Designers, QS' },
  { Icon: Hammer,     name: 'Construction',      partner: 'Subcontractors, HSE' },
  { Icon: Key,        name: 'Completion',         partner: 'Client, Regulatory authority' },
  { Icon: Calculator, name: 'Final Account',      partner: 'Client QS, Legal' },
];

const pairs = [
  {
    ProblemIcon: ClipboardX,
    problemTitle: 'Variations tracked in emails and spreadsheets',
    problemText: 'When change work is performed, labor efficiency drops 30% and disruptions increase by 50%. That cost is absorbed on site before it can be quantified, and without a contemporaneous record it cannot be recovered at final account.',
    SolutionIcon: ClipboardCheck,
    solutionTitle: 'Every change event documented at source',
    solutionText: 'Variation instructions are logged against the programme in real time. Notice periods and contractual response windows are tracked as milestones. The commercial manager works from a complete record, not a reconstructed one.',
  },
  {
    ProblemIcon: AlertTriangle,
    problemTitle: 'RAMS and permits assembled on request',
    problemText: 'Risk assessments, method statements, and permits to work are filed across inboxes and folders. When an incident triggers an investigation, the first question is whether the documentation was in place and communicated to site.',
    SolutionIcon: ShieldCheck,
    solutionTitle: 'Process gated; operatives credentialled',
    solutionText: 'RAMS and method statements are stage-gated into each process step: work cannot proceed until documentation is in place. Each operative\'s credentials, site access permits and trade competency cards, are collected and verified at onboarding. The platform holds the record; regulation and the industry set the standard. When an incident triggers investigation, the audit trail already exists.',
  },
  {
    ProblemIcon: Clock,
    problemTitle: 'Progress reported by the subcontractor',
    problemText: 'The programme depends on subcontractor self-reports. Performance history lives in the memory of the project team. The next selection decision draws on the same instinct that the last one did.',
    SolutionIcon: LineChart,
    solutionTitle: 'Completion recorded by process steps',
    solutionText: 'Every subcontractor scope is broken into defined steps. Progress is recorded when steps are completed, not when the sub claims completion. Each engagement builds the delivery record that sharpens future selection decisions.',
  },
];

export function BeforeAfterSlide() {
  return (
    <SlideLayout
      title="Today vs. With Merit OI"
      subtitle="One evidence base across your whole portfolio"
    >
      {/* Two-column body */}
      <div className="flex-1 min-h-0 grid grid-cols-2 gap-6">

        {/* Left: Today */}
        <div className="flex flex-col gap-3 min-h-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold" style={{ color: '#6b7a85' }}>Today</span>
            <span className="rounded-full px-2 py-0.5 text-xs font-semibold shrink-0" style={{ backgroundColor: '#fff7ed', color: '#c2410c', border: '1px solid #fed7aa' }}>
              30% efficiency loss during change work — rarely recovered<sup style={{ fontSize: '0.55rem' }}>1</sup>
            </span>
          </div>

          {/* Problem workflow band */}
          <div className="flex items-stretch" style={{ height: '90px' }}>
            {stages.flatMap((stage, i) => {
              const card = (
                <div
                  key={stage.name}
                  className="flex-1 flex flex-col justify-between rounded-lg border p-2"
                  style={{ backgroundColor: 'var(--slide-bg-muted)', borderColor: '#dde1e4' }}
                >
                  <div className="flex items-center gap-1.5">
                    <stage.Icon className="w-3 h-3 shrink-0" style={{ color: '#8a9ba8' }} />
                    <span className="font-semibold truncate" style={{ color: '#5a6a75', fontSize: 'var(--slide-sz-sm)' }}>{stage.name}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="rounded px-1 py-px" style={{ backgroundColor: '#e4e8ec', color: '#6b7a85', fontSize: 'var(--slide-sz-tag)' }}>{stage.partner}</span>
                    <span className="rounded px-1 py-px" style={{ backgroundColor: '#fff7ed', color: '#c2410c', border: '1px solid #fed7aa', fontSize: 'var(--slide-sz-tag)' }}>No record</span>
                  </div>
                </div>
              );
              if (i < stages.length - 1) {
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
              Every partner, every project, one evidence base
            </span>
          </div>

          {/* Solution workflow band */}
          <div className="flex items-stretch" style={{ height: '90px' }}>
            {stages.flatMap((stage, i) => {
              const card = (
                <div
                  key={stage.name}
                  className="flex-1 flex flex-col justify-between rounded-lg border p-2"
                  style={{ backgroundColor: 'var(--slide-bg-primary-muted)', borderColor: 'var(--slide-border-primary)' }}
                >
                  <div className="flex items-center gap-1.5">
                    <stage.Icon className="w-3 h-3 shrink-0" style={{ color: 'var(--slide-primary)' }} />
                    <span className="font-semibold truncate" style={{ color: 'var(--slide-primary)', fontSize: 'var(--slide-sz-sm)' }}>{stage.name}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="rounded px-1 py-px" style={{ color: '#5a6a75', fontSize: 'var(--slide-sz-tag)' }}>{stage.partner}</span>
                    <span className="self-start rounded px-1.5 py-0.5 text-white font-semibold" style={{ backgroundColor: 'var(--slide-primary)', fontSize: 'var(--slide-sz-tag)' }}>
                      Merit OI
                    </span>
                  </div>
                </div>
              );
              if (i < stages.length - 1) {
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
