import { Search, FileText, Hammer, Key, Mail, Users, Clock, LineChart, FileX, FileCheck2 } from 'lucide-react';
import { SlideLayout } from '@/components/slides/SlideLayout';

const stages = [
  { Icon: Search,    name: 'Appraise & Design', partner: 'Consultants, Planners' },
  { Icon: FileText,  name: 'Procurement',        partner: 'Contractors, QS' },
  { Icon: Hammer,    name: 'Construction',        partner: 'Main Contractor, Subs' },
  { Icon: Key,       name: 'Completion',          partner: 'FM, Letting, PM' },
];

const pairs = [
  {
    ProblemIcon: Mail,
    problemTitle: 'Coordination runs through scattered email chains',
    problemText: 'Project teams spend an average of 14 hours a week on non-productive tasks, primarily searching for information across fragmented tools. 62% of contractors cite fragmented communication as their top productivity barrier.',
    SolutionIcon: Users,
    solutionTitle: 'All parties work in a shared environment',
    solutionText: 'Contractors, consultants, and specialists access their timelines, view obligations, and submit documents directly through the platform. Information lives where decisions are made, not in inboxes.',
  },
  {
    ProblemIcon: Clock,
    problemTitle: 'Progress is measured by self-assessment',
    problemText: 'Contractors report they are 60% complete. That number reflects their judgment, their interest in the next drawdown, and nothing else. There is no objective basis to challenge it.',
    SolutionIcon: LineChart,
    solutionTitle: 'Completion tracked through process steps',
    solutionText: 'Every stage is broken into defined process steps. Progress is recorded when steps are completed, not estimated. Cost and programme data follows automatically from what has actually been done.',
  },
  {
    ProblemIcon: FileX,
    problemTitle: 'Required documents assembled at the end, or not at all',
    problemText: 'Completion certificates, warranties, and regulatory sign-offs are chased at handover from partners who have moved on. Gaps surface too late to action.',
    SolutionIcon: FileCheck2,
    solutionTitle: 'Each stage gate closes only when its documents are in place',
    solutionText: 'Document requirements are defined per stage, per associate. Partners are accountable for submissions within the system. Nothing advances until the record is complete.',
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
              85% of projects miss their budget<sup style={{ fontSize: '0.55rem' }}>1</sup>
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
