import { Building2, Tractor, Shield } from 'lucide-react';
import { SlideLayout } from '@/components/slides/SlideLayout';

const pillars = [
  {
    Icon: Building2,
    role: 'Association / Industry Body',
    title: 'Network-wide coordination without manual overhead',
    text: 'Pre-built response playbooks instantiate automatically on outbreak confirmation. Every member organisation and contractor in the network operates from the same plan. Certification status, audit compliance, and indemnity documentation are visible in one place, without chasing records.',
    isAccent: false,
  },
  {
    Icon: Tractor,
    role: 'Farm / Producer',
    title: 'An instant response plan, with resources already found',
    text: 'On confirmation, the response plan is created from the pre-configured playbook: stages, gates, assigned contractors, and document requirements are in place before the first call ends. The system finds available culling crews and certified labs based on real-time availability, not who answers the phone first.',
    isAccent: false,
  },
  {
    Icon: Shield,
    role: 'Official Vet / Regulatory Authority',
    title: 'A complete, timestamped audit trail',
    text: 'Every stage gate is documented as it closes: appraisal sign-off, depopulation confirmation, C&D clearance. The biosecurity audit record required for indemnity compliance exists at the point of each action. Zoning and regionalization evidence is available immediately, without reconstruction.',
    isAccent: true,
  },
];

export function ValuePropositionSlide() {
  return (
    <SlideLayout title="What Merit OI Delivers">

      <div
        className="shrink-0 mb-5 rounded-lg px-5 py-4"
        style={{ backgroundColor: 'var(--slide-bg-primary-muted)', borderLeft: '4px solid var(--slide-primary)' }}
      >
        <p className="text-base font-medium leading-relaxed" style={{ color: 'var(--slide-primary)' }}>
          Merit OI gives disease outbreak response networks the operational data layer the response framework has always required: every party coordinated from one plan, every resource found by availability, and every stage gate documented as evidence. When the process governs the response, speed and compliance are not in conflict.
        </p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-3 gap-5">
        {pillars.map((p) => (
          <div
            key={p.title}
            className="min-h-0 bg-white rounded-lg border flex flex-col overflow-hidden shadow-sm"
            style={{ borderColor: p.isAccent ? 'var(--slide-accent)' : 'var(--slide-border)' }}
          >
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
                  {p.role}
                </span>
              </div>
              <h3
                className="text-sm font-bold leading-tight"
                style={{ color: p.isAccent ? 'var(--slide-accent)' : 'var(--slide-primary)' }}
              >
                {p.title}
              </h3>
            </div>

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
