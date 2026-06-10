import { LucideIcon, Network, ClipboardList, GraduationCap, FileCheck, BarChart2, MessageSquare } from 'lucide-react';
import { SlideLayout } from '@/components/slides/SlideLayout';

type Capability =
  | { Icon: LucideIcon; title: string; body: string }
  | { Icon: LucideIcon; title: string; intro: string; bullets: string[] };

const capabilities: Capability[] = [
  {
    Icon: Network,
    title: 'Process Mapping',
    body: 'A live map of the entire delivery ecosystem, from factory through to site installation. IoT inputs feed into the model at step level, so the record reflects how work actually happens - not how it was planned to happen.',
  },
  {
    Icon: ClipboardList,
    title: 'Project Management',
    body: 'When a spec is confirmed, the project plan is generated from the master process. Steps, resources, and schedule are derived from the model and refined by historical execution data - not assembled from scratch on each project.',
  },
  {
    Icon: MessageSquare,
    title: 'CRM',
    body: 'Feedback from each delivery attributed to the specific steps and resources that produced it. Patterns across projects surface recurring issues at step or resource level - turning contractor feedback into a direct signal for process improvement.',
  },
  {
    Icon: GraduationCap,
    title: 'Training and Onboarding',
    intro: 'The process model is the training structure. Guidance, certifications, and onboarding are anchored to the steps that need them.',
    bullets: [
      'Training materials attached to the specific steps they relate to',
      'New operatives onboard in the context of the delivery model',
      'Installation methods and time benchmarks available at step level',
      'Operative certifications validated against the skillset each step requires',
    ],
  },
  {
    Icon: FileCheck,
    title: 'Document Management and Control',
    intro: 'Document requirements are defined in the model against the objects that need them - enforced at the point of planning or execution, not checked after the fact.',
    bullets: [
      'A stage gate cannot advance without the required output documents',
      'A tool cannot be assigned without a valid service record',
      'An executor cannot be selected without confirmed certifications',
      'A material cannot be used without a certificate of conformance',
    ],
  },
  {
    Icon: BarChart2,
    title: 'Process Analytics',
    intro: 'Any metric, at any level. The delivery structure is the analytics framework.',
    bullets: [
      'Cost and carbon per step, material, and resource',
      'Comparative executor, tool, and material performance',
      'Defect and rework rates by step, operative, or specification',
      'Programme adherence - planned vs. actual step completion',
      'Delivery shortfall - scoped vs. executed volume',
      'Training ROI - before and after, at step level',
    ],
  },
];

export function MeritOSSlide() {
  return (
    <SlideLayout title="Merit OI: An Operating System for Complex Product Delivery">

      {/* Positioning statement */}
      <div
        className="shrink-0 mb-4 rounded-lg px-5 py-4"
        style={{ backgroundColor: 'var(--slide-bg-primary-muted)', borderLeft: '4px solid var(--slide-primary)' }}
      >
        <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--slide-primary)' }}>
          Merit OI is a unified operating system: one model connecting spec, delivery, compliance, and performance. Because every function works from the same execution record, transparency is not a pursued principle - it is a foundational attribute of the platform.
        </p>
      </div>

      {/* Capabilities grid */}
      <div className="flex-1 min-h-0 grid grid-cols-3 grid-rows-2 gap-4">
        {capabilities.map((cap) => (
          <div
            key={cap.title}
            className="bg-white rounded-lg border p-4 flex flex-col shadow-sm"
            style={{ borderColor: 'var(--slide-border)', borderTop: '3px solid var(--slide-primary)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="p-1.5 rounded-md shrink-0"
                style={{ backgroundColor: 'var(--slide-bg-primary-muted)' }}
              >
                <cap.Icon className="w-4 h-4" style={{ color: 'var(--slide-primary)' }} />
              </div>
              <h3 className="text-sm font-bold" style={{ color: 'var(--slide-primary)' }}>
                {cap.title}
              </h3>
            </div>
            {'body' in cap ? (
              <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.75 }}>
                {cap.body}
              </p>
            ) : (
              <div className="flex flex-col gap-1.5">
                <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.75 }}>
                  {cap.intro}
                </p>
                <ul className="flex flex-col gap-0.5">
                  {cap.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-1.5 text-xs leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.75 }}>
                      <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--slide-primary)', opacity: 0.5 }} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

    </SlideLayout>
  );
}
