import { FileText, Pencil, Hammer, Key, Calculator, ArrowRight } from 'lucide-react';
import { SlideLayout } from '@/components/slides/SlideLayout';

const stages = [
  {
    Icon: FileText,
    name: 'Tender',
    description: 'Estimating, risk allocation, and bid submission',
    partners: ['Estimators', 'QS consultants', 'Specialist suppliers'],
  },
  {
    Icon: Pencil,
    name: 'Pre-construction',
    description: 'Design coordination, subcontractor procurement, programme',
    partners: ['Architects', 'Engineers', 'Specialist subs'],
  },
  {
    Icon: Hammer,
    name: 'Construction',
    description: 'Building works, variation management, safety oversight',
    partners: ['Subcontractors', 'HSE consultants', 'Site supervisor'],
  },
  {
    Icon: Key,
    name: 'Completion',
    description: 'Handover, snagging, and certification',
    partners: ['Client', 'Regulatory authority', 'FM providers'],
  },
  {
    Icon: Calculator,
    name: 'Final Account',
    description: 'Variation settlement, retention release, close-out',
    partners: ['Client QS', 'Legal advisors', 'Insurers'],
  },
];

export function WorkflowSlide() {
  return (
    <SlideLayout
      title="How Projects Run"
      subtitle="Five stages. Five sets of external partners. Value eroded at every gap in the record."
    >
      {/* Stage cards */}
      <div className="flex-1 min-h-0 flex items-stretch gap-2">
        {stages.map((stage, i) => (
          <div key={stage.name} className="flex items-stretch gap-2 flex-1 min-w-0">
            <div
              className="flex-1 min-w-0 bg-white rounded-lg border flex flex-col p-4 shadow-sm"
              style={{ borderColor: 'var(--slide-border)', borderTop: '3px solid var(--slide-primary)' }}
            >
              {/* Stage header */}
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-md shrink-0" style={{ backgroundColor: 'var(--slide-bg-primary-muted)' }}>
                  <stage.Icon className="w-3.5 h-3.5" style={{ color: 'var(--slide-primary)' }} />
                </div>
                <span className="text-sm font-bold leading-tight" style={{ color: 'var(--slide-primary)' }}>
                  {stage.name}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>
                {stage.description}
              </p>

              {/* Partners */}
              <div className="mt-auto">
                <div className="text-xs font-semibold mb-1.5 tracking-wide" style={{ color: 'var(--slide-primary)', opacity: 0.55 }}>
                  KEY PARTIES
                </div>
                <div className="flex flex-col gap-1">
                  {stage.partners.map((p) => (
                    <span
                      key={p}
                      className="rounded px-1.5 py-0.5 text-xs"
                      style={{ backgroundColor: 'var(--slide-bg)', color: '#5a6a75', border: '1px solid #dde4e8' }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Connector arrow */}
            {i < stages.length - 1 && (
              <div className="shrink-0 flex items-center justify-center" style={{ width: '20px' }}>
                <ArrowRight className="w-4 h-4" style={{ color: 'var(--slide-primary)', opacity: 0.3 }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Insight callout */}
      <div
        className="shrink-0 mt-4 rounded-lg p-3"
        style={{ backgroundColor: 'var(--slide-bg-primary-muted)', border: '1px solid var(--slide-border-primary)' }}
      >
        <p className="text-xs font-medium" style={{ color: 'var(--slide-primary)' }}>
          <span style={{ color: 'var(--slide-accent)', fontWeight: 700 }}>The gap: </span>
          A GC's margin is fixed at tender and eroded continuously in delivery. A missed variation instruction, an undocumented RAMS, a disputed account that runs for 12 months or more after handover. The GC carries the delivery risk; the question is how much of the record it controls.
        </p>
      </div>
    </SlideLayout>
  );
}
