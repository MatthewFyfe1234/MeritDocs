import { Bell, ShieldOff, ClipboardCheck, Trash2, CheckCircle, ArrowRight } from 'lucide-react';
import { SlideLayout } from '@/components/slides/SlideLayout';

const stages = [
  {
    Icon: Bell,
    name: 'Notify',
    description: 'Sick animals reported; accredited official veterinarian dispatched; presumptive positive result reported to state and national authority',
    participants: ['Farm manager', 'Private vet / Official', 'State animal health'],
    target: null,
  },
  {
    Icon: ShieldOff,
    name: 'Quarantine',
    description: 'Movement restrictions imposed on infected premises; infected and buffer zones established; law enforcement engaged for road blocks',
    participants: ['State authority', 'National authority', 'Local law enforcement'],
    target: 'Immediate',
  },
  {
    Icon: ClipboardCheck,
    name: 'Appraise',
    description: 'Fair market value of animals established; administrative eligibility confirmed; indemnity agreement signed before depopulation is authorised to proceed',
    participants: ['Regulatory appraiser', 'Farm owner', 'State official'],
    target: '< 12 hours',
  },
  {
    Icon: Trash2,
    name: 'Depopulate',
    description: 'Infected and exposed animals destroyed; carcass disposal managed by burial, composting, or incineration; contaminated materials secured',
    participants: ['Culling contractors', 'Farm personnel', 'Disposal teams'],
    target: '< 24 hours',
  },
  {
    Icon: CheckCircle,
    name: 'Certify',
    description: 'Premises cleaned and disinfected; environmental sampling confirms pathogen freedom; biosecurity audit passed before restock clearance granted',
    participants: ['C&D teams', 'Diagnostic lab', 'Regulatory auditor'],
    target: 'Before restock',
  },
];

export function ResponseWorkflowSlide() {
  return (
    <SlideLayout
      title="The Response Framework"
      subtitle="A sequence of mandated stages. Dozens of parties. Targets measured in hours."
    >
      <div className="flex-1 min-h-0 flex items-stretch gap-2">
        {stages.map((stage, i) => (
          <div key={stage.name} className="flex items-stretch gap-2 flex-1 min-w-0">
            <div
              className="flex-1 min-w-0 bg-white rounded-lg border flex flex-col p-4 shadow-sm"
              style={{ borderColor: 'var(--slide-border)', borderTop: '3px solid var(--slide-primary)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-md shrink-0" style={{ backgroundColor: 'var(--slide-bg-primary-muted)' }}>
                  <stage.Icon className="w-3.5 h-3.5" style={{ color: 'var(--slide-primary)' }} />
                </div>
                <span className="text-sm font-bold leading-tight" style={{ color: 'var(--slide-primary)' }}>
                  {stage.name}
                </span>
              </div>

              <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>
                {stage.description}
              </p>

              <div className="mt-auto flex flex-col gap-2">
                {stage.target && (
                  <div>
                    <div className="text-xs font-semibold mb-1 tracking-wide" style={{ color: 'var(--slide-accent)', opacity: 0.85 }}>
                      TARGET
                    </div>
                    <span
                      className="rounded px-1.5 py-0.5 text-xs font-semibold"
                      style={{ backgroundColor: 'var(--slide-bg-accent-muted)', color: 'var(--slide-accent)', border: '1px solid var(--slide-border-accent)' }}
                    >
                      {stage.target}
                    </span>
                  </div>
                )}
                <div>
                  <div className="text-xs font-semibold mb-1 tracking-wide" style={{ color: 'var(--slide-primary)', opacity: 0.55 }}>
                    PARTIES
                  </div>
                  <div className="flex flex-col gap-1">
                    {stage.participants.map((p) => (
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
            </div>

            {i < stages.length - 1 && (
              <div className="shrink-0 flex items-center justify-center" style={{ width: '20px' }}>
                <ArrowRight className="w-4 h-4" style={{ color: 'var(--slide-primary)', opacity: 0.3 }} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div
        className="shrink-0 mt-4 rounded-lg p-3"
        style={{ backgroundColor: 'var(--slide-bg-primary-muted)', border: '1px solid var(--slide-border-primary)' }}
      >
        <p className="text-xs font-medium" style={{ color: 'var(--slide-primary)' }}>
          <span style={{ color: 'var(--slide-accent)', fontWeight: 700 }}>The bottleneck is the handoff. </span>
          Each stage transition requires coordination across parties who are not connected. Appraisal stalls depopulation. Resource contention delays culling. Compliance documentation is assembled after the fact from scattered, disconnected records.
        </p>
      </div>
    </SlideLayout>
  );
}
