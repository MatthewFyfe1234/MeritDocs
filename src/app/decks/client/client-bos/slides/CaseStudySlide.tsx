import { Network, Users, Wrench, Package, BadgeCheck, ArrowDown } from 'lucide-react';
import { SlideLayout } from '@/components/slides/SlideLayout';

const dimensions = [
  {
    Icon: Network,
    title: 'Process',
    question: 'Which sequence, method, or specification consistently produces better outcomes - and on which metric?',
    examples: ['Step sequence A vs B on rework rate', 'Prefab vs on-site assembly on programme', 'Kit design variants on installation time'],
    providerFeedback: 'Validated methods contribute to shared sector standards - the evidence base for an offsite plan of works.',
  },
  {
    Icon: Users,
    title: 'People',
    question: 'Which teams, roles, or individuals consistently perform against the metrics that matter?',
    examples: ['Team output against quality sign-off rates', 'Operative performance by role and process step', 'Subcontractor consistency across projects'],
    providerFeedback: 'Individual performance data back to operatives and teams',
  },
  {
    Icon: Wrench,
    title: 'Tools',
    question: 'Which equipment choices produce measurably different outcomes on time, quality, or carbon?',
    examples: ['Tool brand A vs B on step completion time', 'Manual vs powered on error rate', 'Equipment utilisation vs idle cost'],
    providerFeedback: 'Field performance data back to tool manufacturers',
  },
  {
    Icon: Package,
    title: 'Materials',
    question: 'Which material specifications consistently outperform alternatives across the metrics that count?',
    examples: ['Specification A vs B on defect rate', 'Supplier comparison on delivery reliability', 'Material choice vs embodied carbon per step'],
    providerFeedback: 'Usage and defect data back to material suppliers',
  },
  {
    Icon: BadgeCheck,
    title: 'Qualifications',
    question: 'What does certification and training level actually correlate with in delivery performance?',
    examples: ['Certified vs uncertified on quality outcomes', 'Training completion vs rework incidence', 'CPD investment vs productivity trend'],
    providerFeedback: 'Outcome correlation data back to training providers',
  },
];

const metrics = ['Quality', 'Carbon', 'Programme', 'Cost', 'Safety', 'Rework rate', 'Throughput'];

export function CaseStudySlide() {
  return (
    <SlideLayout
      title="Comparative Performance Transparency"
      subtitle="Every dimension of delivery, comparable against any metric"
    >
      <div className="flex-1 min-h-0 flex flex-col gap-4">

        {/* Framing statement */}
        <div
          className="shrink-0 rounded-lg px-5 py-3"
          style={{ backgroundColor: 'var(--slide-bg-accent-muted)', borderLeft: '4px solid var(--slide-accent)' }}
        >
          <p className="text-sm font-medium leading-snug" style={{ color: 'var(--slide-text)' }}>
            Because Merit runs the delivery process, it captures a structured record across every dimension of execution. That record untangles delivery - identifying the source of strengths and weaknesses in the system, to encourage what's good and root out what's bad.
          </p>
        </div>

        {/* Dimension cards */}
        <div className="flex-1 min-h-0 grid grid-cols-5 gap-3">
          {dimensions.map((dim) => (
            <div
              key={dim.title}
              className="bg-white rounded-lg border flex flex-col overflow-hidden shadow-sm"
              style={{ borderColor: 'var(--slide-border)' }}
            >
              {/* Card header */}
              <div
                className="shrink-0 px-3 py-2 flex items-center gap-2"
                style={{ backgroundColor: 'var(--slide-bg-primary-muted)', borderBottom: '1px solid var(--slide-border-primary)' }}
              >
                <dim.Icon className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--slide-primary)' }} />
                <span className="text-xs font-bold" style={{ color: 'var(--slide-primary)' }}>{dim.title}</span>
              </div>

              {/* Question */}
              <div className="shrink-0 px-3 pt-2.5 pb-2">
                <p className="text-xs leading-snug italic" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>
                  {dim.question}
                </p>
              </div>

              {/* Examples */}
              <div className="flex-1 px-3 pb-3 flex flex-col gap-1.5">
                {dim.examples.map((ex) => (
                  <div
                    key={ex}
                    className="rounded px-2 py-1 text-xs leading-snug"
                    style={{ backgroundColor: 'var(--slide-bg-muted)', color: 'var(--slide-text)', opacity: 0.8 }}
                  >
                    {ex}
                  </div>
                ))}
              </div>

              {'providerFeedback' in dim && (
                <div
                  className="shrink-0 px-3 py-2 flex items-start gap-1.5 h-[5rem] overflow-hidden"
                  style={{ borderTop: '1px solid var(--slide-border)', backgroundColor: 'var(--slide-bg-accent-muted)' }}
                >
                  <ArrowDown className="w-3 h-3 shrink-0 mt-px" style={{ color: 'var(--slide-accent)', opacity: 0.7 }} />
                  <p className="text-xs leading-snug italic" style={{ color: 'var(--slide-accent)', opacity: 0.8 }}>{dim.providerFeedback}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Metrics strip */}
        <div
          className="shrink-0 flex items-center gap-3 rounded-lg px-4 py-2.5"
          style={{ backgroundColor: 'var(--slide-bg-primary-muted)', border: '1px solid var(--slide-border-primary)' }}
        >
          <span className="text-xs font-semibold shrink-0" style={{ color: 'var(--slide-primary)' }}>
            Against any metric:
          </span>
          <div className="flex flex-wrap gap-2">
            {metrics.map((m) => (
              <span
                key={m}
                className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                style={{ backgroundColor: 'white', color: 'var(--slide-primary)', border: '1px solid var(--slide-border-primary)' }}
              >
                {m}
              </span>
            ))}
          </div>
        </div>

      </div>
    </SlideLayout>
  );
}
