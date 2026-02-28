import { Lightbulb, Pencil, Factory, Hammer, FileCheck, CalendarCheck, TrendingUp } from 'lucide-react';

const stages = [
  {
    Icon: Lightbulb,
    name: 'Sales & Estimation',
    mode: 'integrate',
    retainedTools: ['Sage'],
  },
  {
    Icon: Pencil,
    name: 'Design & Procurement',
    mode: 'integrate',
    retainedTools: ['Revit', 'Tekla', 'AutoCAD'],
  },
  {
    Icon: Factory,
    name: 'Fabrication',
    mode: 'replace',
  },
  {
    Icon: Hammer,
    name: 'Installation',
    mode: 'replace',
  },
];

const solutions = [
  {
    Icon: FileCheck,
    title: 'The right information, to the right person',
    text: 'Documents are uploaded against specific process steps and available to all who need them. Required documents gate stage progression: the master process determines what is ready to move forward, not individual reporting.',
  },
  {
    Icon: CalendarCheck,
    title: 'Commitments the factory can keep',
    text: 'Resource planning models people, skills, and factory throughput in real time. Sales can commit to dates the shop floor can actually meet, and project managers see capacity constraints before they become problems.',
  },
  {
    Icon: TrendingUp,
    title: 'Intelligence that compounds',
    text: 'Every completed project builds institutional knowledge. Historical data informs future estimates, process steps capture what worked and what did not, and margin predictability improves with every job.',
  },
];

export function MeritOISlide() {
  return (
    <div className="w-full h-full p-8 flex flex-col">

      {/* Header */}
      <div className="mb-5">
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--slide-primary)' }}>
          Merit Operational Intelligence
        </h2>
        <div className="w-20 h-1" style={{ backgroundColor: 'var(--slide-accent)' }} />
        <p className="text-xs mt-2" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>
          One system across the whole workflow: process mapping, business intelligence, and organisational memory built for the project-based manufacturer
        </p>
      </div>

      <div className="flex-1 min-h-0 flex flex-col gap-4">

        {/* Workflow band */}
        <div className="flex-1 min-h-0 flex items-stretch">
          {stages.flatMap((stage, i) => {
            const isIntegrate = stage.mode === 'integrate';

            const card = (
              <div
                key={stage.name}
                className="flex-1 flex flex-col justify-between rounded-lg border p-2.5"
                style={{ backgroundColor: 'var(--slide-bg-primary-muted)', borderColor: 'var(--slide-border-primary)' }}
              >
                <div className="flex items-center gap-1.5">
                  <stage.Icon className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--slide-primary)' }} />
                  <span className="font-semibold" style={{ color: 'var(--slide-primary)', fontSize: 'var(--slide-sz-md)' }}>{stage.name}</span>
                </div>

                <div className="flex flex-col gap-1">
                  {isIntegrate && (
                    <div className="flex flex-wrap gap-1">
                      {(stage.retainedTools ?? []).map(t => (
                        <span
                          key={t}
                          className="rounded px-1.5 py-px font-medium"
                          style={{ backgroundColor: 'white', color: 'var(--slide-primary)', border: '1px solid var(--slide-border-primary)', fontSize: 'var(--slide-sz-xs)' }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  <span
                    className="self-start rounded px-1.5 py-0.5 text-white font-semibold"
                    style={{ backgroundColor: 'var(--slide-primary)', fontSize: 'var(--slide-sz-tag)' }}
                  >
                    Merit OI
                  </span>
                </div>
              </div>
            );

            if (i < stages.length - 1) {
              return [
                card,
                <div
                  key={`conn-${i}`}
                  className="flex flex-col items-center justify-center shrink-0"
                  style={{ width: '26px' }}
                >
                  <div style={{ width: '100%', borderTop: '1.5px solid var(--slide-primary)', opacity: 0.35 }} />
                  <span style={{ fontSize: 'var(--slide-sz-md)', color: 'var(--slide-primary)', opacity: 0.5, marginTop: '3px' }}>→</span>
                </div>,
              ];
            }
            return [card];
          })}
        </div>

        {/* Solution cards */}
        <div className="flex-1 min-h-0 grid grid-cols-3 gap-4">
          {solutions.map((s) => (
            <div
              key={s.title}
              className="min-h-0 bg-white rounded-lg border p-4 shadow-sm flex flex-col"
              style={{ borderColor: 'var(--slide-border)', borderLeft: '3px solid var(--slide-primary)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-md shrink-0" style={{ backgroundColor: 'var(--slide-bg)' }}>
                  <s.Icon className="w-4 h-4" style={{ color: 'var(--slide-primary)' }} />
                </div>
                <h4 className="text-sm font-semibold leading-tight" style={{ color: 'var(--slide-primary)' }}>{s.title}</h4>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.8 }}>{s.text}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
