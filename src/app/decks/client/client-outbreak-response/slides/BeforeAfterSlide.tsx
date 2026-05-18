import { Eye, Package, FileCheck, Radio, ClipboardX, ArrowRight } from 'lucide-react';
import { SlideLayout } from '@/components/slides/SlideLayout';

const todayStages = [
  { name: 'Notify',     partner: 'Official vet', dataTag: 'Manual'    },
  { name: 'Quarantine', partner: 'Authorities',  dataTag: 'Manual'    },
  { name: 'Appraise',   partner: 'Authority',    dataTag: 'Manual'    },
  { name: 'Depopulate', partner: 'Contractors',  dataTag: 'Manual'    },
  { name: 'Certify',    partner: 'Lab / Authority', dataTag: 'Manual'    },
];

const meritStages = [
  { name: 'Notify',     partner: 'FADD'         },
  { name: 'Quarantine', partner: 'Authorities'  },
  { name: 'Appraise',   partner: 'Automated'   },
  { name: 'Depopulate', partner: 'Contractors' },
  { name: 'Certify',    partner: 'Lab / Authority' },
];

const pairs = [
  {
    ProblemIcon: Radio,
    problemTitle: 'No shared operational picture',
    problemText: 'Incident management systems are delayed and inaccurate in the early stages of an event. Incident Command cannot allocate resources effectively. Each party is working from a different, out-of-date version of events.',
    SolutionIcon: Eye,
    solutionTitle: 'Live status visible to all authorised parties',
    solutionText: 'Every stage gate, resource assignment, and appraisal decision is logged in real time. Incident Command, state authority, and national regulator see the same operational picture simultaneously.',
  },
  {
    ProblemIcon: Package,
    problemTitle: 'Resources contended with no live visibility',
    problemText: 'Culling teams, diagnostic labs, transport, and PPE are shared across simultaneous incidents. No system shows availability. Coordinators call around manually during the window that matters most.',
    SolutionIcon: Package,
    solutionTitle: 'Available resources found and allocated automatically',
    solutionText: 'The system holds real-time availability for contracted culling crews, certified labs, and transport assets. On outbreak confirmation, the plan is instantiated and resources are slotted based on current availability and certification status.',
  },
  {
    ProblemIcon: ClipboardX,
    problemTitle: 'Compliance reconstructed after the fact',
    problemText: 'Biosecurity audit evidence, movement records, appraisal documentation, and C&D completion records are assembled from scattered sources after the fact - often under time pressure from indemnity deadlines or trade zoning requirements.',
    SolutionIcon: FileCheck,
    solutionTitle: 'Every gate documented as it closes',
    solutionText: 'Stage gates require documented completion before the next stage opens. The appraisal sign-off, depopulation record, and C&D clearance are captured in sequence. The audit trail exists at the point of each action, not weeks later.',
  },
];

export function BeforeAfterSlide() {
  return (
    <SlideLayout
      title="Today vs. With Merit OI"
      subtitle="One coordinated response environment across every party in the chain"
    >
      <div className="flex-1 min-h-0 grid grid-cols-2 gap-6">

        {/* Left: Today */}
        <div className="flex flex-col gap-3 min-h-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold" style={{ color: '#6b7a85' }}>Today</span>
            <span className="rounded-full px-2 py-0.5 text-xs font-semibold shrink-0" style={{ backgroundColor: '#fff7ed', color: '#c2410c', border: '1px solid #fed7aa' }}>
              Fragmented, manual, and consistently too slow
            </span>
          </div>

          {/* Today workflow band */}
          <div className="flex items-stretch">
            {todayStages.flatMap((stage, i) => {
              const card = (
                <div
                  key={stage.name}
                  className="flex-1 flex flex-col justify-between rounded-lg border p-2"
                  style={{ backgroundColor: 'var(--slide-bg-muted)', borderColor: '#dde1e4' }}
                >
                  <span className="font-semibold truncate" style={{ color: '#5a6a75', fontSize: 'var(--slide-sz-sm)' }}>{stage.name}</span>
                  <div className="flex flex-col gap-0.5">
                    <span className="rounded px-1 py-px" style={{ backgroundColor: '#e4e8ec', color: '#6b7a85', fontSize: 'var(--slide-sz-tag)' }}>{stage.partner}</span>
                    <span className="rounded px-1 py-px" style={{ backgroundColor: '#fff7ed', color: '#c2410c', border: '1px solid #fed7aa', fontSize: 'var(--slide-sz-tag)' }}>Isolated</span>
                    <span className="rounded px-1 py-px" style={{ backgroundColor: '#e4e8ec', color: '#6b7a85', fontSize: 'var(--slide-sz-tag)' }}>{stage.dataTag}</span>
                  </div>
                </div>
              );
              if (i < todayStages.length - 1) {
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
            <span className="rounded-full px-2 py-0.5 text-xs font-semibold shrink-0" style={{ backgroundColor: 'var(--slide-bg-primary-muted)', color: 'var(--slide-primary)', border: '1px solid var(--slide-border-primary)' }}>
              Pre-planned, instantly instantiated, evidence-gated
            </span>
          </div>

          {/* Merit workflow band */}
          <div className="flex items-stretch">
            {meritStages.flatMap((stage, i) => {
              const card = (
                <div
                  key={stage.name}
                  className="flex-1 flex flex-col justify-between rounded-lg border p-2"
                  style={{ backgroundColor: 'var(--slide-bg-primary-muted)', borderColor: 'var(--slide-border-primary)' }}
                >
                  <span className="font-semibold truncate" style={{ color: 'var(--slide-primary)', fontSize: 'var(--slide-sz-sm)' }}>{stage.name}</span>
                  <div className="flex flex-col gap-0.5">
                    <span className="rounded px-1 py-px" style={{ color: '#5a6a75', fontSize: 'var(--slide-sz-tag)' }}>{stage.partner}</span>
                    <span className="self-start rounded px-1.5 py-0.5 text-white font-semibold" style={{ backgroundColor: 'var(--slide-primary)', fontSize: 'var(--slide-sz-tag)' }}>Embedded</span>
                    <span className="self-start rounded px-1.5 py-0.5 font-semibold" style={{ backgroundColor: 'var(--slide-bg-primary-muted)', color: 'var(--slide-primary)', fontSize: 'var(--slide-sz-tag)' }}>Documented</span>
                  </div>
                </div>
              );
              if (i < meritStages.length - 1) {
                return [card, (
                  <div key={`conn-${i}`} className="flex flex-col items-center justify-center shrink-0" style={{ width: '20px' }}>
                    <div style={{ width: '100%', borderTop: '1.5px solid var(--slide-primary)', opacity: 0.35 }} />
                    <ArrowRight className="w-2.5 h-2.5" style={{ color: 'var(--slide-primary)', opacity: 0.5, marginTop: '2px' }} />
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
