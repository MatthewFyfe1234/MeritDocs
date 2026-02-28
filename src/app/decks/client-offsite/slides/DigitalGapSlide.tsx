import { Lightbulb, Pencil, Factory, Hammer, Clock, RotateCcw, FileX, FileCheck, CalendarCheck, TrendingUp } from 'lucide-react';

const workflowStages = [
  {
    Icon: Lightbulb,
    name: 'Sales & Estimation',
    problemTools: ['Excel', 'Sage', 'Spreadsheets', 'Email'],
    retainedTools: ['Sage'],
    mode: 'integrate' as const,
  },
  {
    Icon: Pencil,
    name: 'Design & Procurement',
    problemTools: ['Revit', 'Tekla', 'AutoCAD', 'Email', 'Excel'],
    retainedTools: ['Revit', 'Tekla', 'AutoCAD'],
    mode: 'integrate' as const,
  },
  {
    Icon: Factory,
    name: 'Fabrication',
    problemTools: ['Generic ERP', 'Excel', 'Paper', 'Whiteboards'],
    mode: 'replace' as const,
  },
  {
    Icon: Hammer,
    name: 'Installation',
    problemTools: ['Procore', 'MS Project', 'Paper', 'Email'],
    mode: 'replace' as const,
  },
];

const pairs = [
  {
    ProblemIcon: FileX,
    problemTitle: 'The right information never reaches the right person',
    problemText: 'Revised drawings travel by email. Updated BOMs sit in shared drives. Change orders reach some stakeholders and not others.',
    SolutionIcon: FileCheck,
    solutionTitle: 'The right information, to the right person',
    solutionText: 'Documents are uploaded against specific process steps and available to all who need them. Required documents gate stage progression.',
  },
  {
    ProblemIcon: Clock,
    problemTitle: 'Delivery dates are set blind',
    problemText: 'The factory production queue is invisible to sales and project management. Commitments are made without knowing what the shop floor can absorb.',
    SolutionIcon: CalendarCheck,
    solutionTitle: 'Commitments the factory can keep',
    solutionText: 'Resource planning models people, skills, and factory throughput in real time. Sales can commit to dates the shop floor can actually meet.',
  },
  {
    ProblemIcon: RotateCcw,
    problemTitle: 'Every project starts from scratch',
    problemText: 'Whether a project overruns or performs well, there is no mechanism to understand why. Historical data stays locked in disconnected systems.',
    SolutionIcon: TrendingUp,
    solutionTitle: 'Intelligence that compounds',
    solutionText: 'Every completed project builds institutional knowledge. Historical data informs future estimates, and margin predictability improves with every job.',
  },
];

export function DigitalGapSlide() {
  return (
    <div className="w-full h-full p-8 flex flex-col">

      {/* Header */}
      <div className="mb-4">
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--slide-primary)' }}>
          The Transformation
        </h2>
        <div className="w-20 h-1" style={{ backgroundColor: 'var(--slide-accent)' }} />
        <p className="text-xs mt-2" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>
          One connected system across your whole workflow
        </p>
      </div>

      {/* Two-column body */}
      <div className="flex-1 min-h-0 grid grid-cols-2 gap-6">

        {/* Left: The Status Quo */}
        <div className="flex flex-col gap-3 min-h-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold" style={{ color: '#6b7a85' }}>Today</span>
          </div>

          {/* Problem workflow band */}
          <div className="flex items-stretch" style={{ height: '110px' }}>
            {workflowStages.flatMap((stage, i) => {
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
                  <div className="flex flex-wrap gap-0.5">
                    {stage.problemTools.slice(0, 3).map(t => (
                      <span key={t} className="rounded px-1 py-px" style={{ backgroundColor: '#e4e8ec', color: '#6b7a85', fontSize: 'var(--slide-sz-tag)' }}>{t}</span>
                    ))}
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

        {/* Right: Merit OI */}
        <div className="flex flex-col gap-3 min-h-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold" style={{ color: 'var(--slide-primary)' }}>With Merit OI</span>
            <span className="text-xs" style={{ color: 'var(--slide-text)', opacity: 0.55 }}>
              One system across the whole workflow
            </span>
          </div>

          {/* Solution workflow band */}
          <div className="flex items-stretch" style={{ height: '110px' }}>
            {workflowStages.flatMap((stage, i) => {
              const isIntegrate = stage.mode === 'integrate';
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
                    {isIntegrate && (
                      <div className="flex flex-wrap gap-0.5">
                        {(stage.retainedTools ?? []).map(t => (
                          <span key={t} className="rounded px-1 py-px font-medium" style={{ backgroundColor: 'white', color: 'var(--slide-primary)', border: '1px solid var(--slide-border-primary)', fontSize: 'var(--slide-sz-xs)' }}>{t}</span>
                        ))}
                      </div>
                    )}
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
    </div>
  );
}
