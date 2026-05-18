import { ShieldCheck, AlertTriangle, TrendingDown } from 'lucide-react';
import { SlideLayout } from '@/components/slides/SlideLayout';

const phases = [
  {
    Icon: ShieldCheck,
    phase: 'The Protocol',
    title: 'A mandated, stage-gated response framework',
    description: 'Mandated outbreak response frameworks provide clear regulatory guidance: notify, quarantine, appraise, depopulate, clean and disinfect. Response targets are explicit. Indemnity is now conditional on documented biosecurity audit compliance. The framework itself is not the problem.',
    items: [
      'Stage-gated response workflow with regulatory backing and defined timelines',
      'Depopulation target: within 24 hours of presumptive positive',
      'Quarantine and movement restrictions: imposed immediately',
      'Indemnity eligibility increasingly conditional on documented biosecurity audit compliance',
    ],
    tone: 'positive' as const,
  },
  {
    Icon: AlertTriangle,
    phase: 'The Friction',
    title: 'A coordination structure that cannot keep up',
    description: 'An effective response requires synchronized action across national regulatory agencies, state and regional veterinary services, accredited diagnosticians, culling contractors, diagnostic labs, and disposal companies. None of them share an operational environment. Information moves by phone, email, and paper.',
    items: [
      '32-day mean detection lag before investigation is triggered; up to 43 days in some cases',
      'Incident management systems are delayed and inaccurate in the early, chaotic stages of an incident',
      'Appraisal bottleneck: indemnity paid only for live animals creates a financial incentive to wait',
      'Culling crews, transport, and loading crews outsourced to providers not integrated into the biosecurity chain',
    ],
    tone: 'warning' as const,
  },
  {
    Icon: TrendingDown,
    phase: 'The Cascade',
    title: 'Delays that compound non-linearly',
    description: 'Each hour past the 24-hour target is additional viral shedding, environmental contamination, and exposure window for contractors moving between premises. The gap between regulatory target and operational reality is where outbreaks become catastrophic and endemic.',
    items: [
      'Every hour of delayed depopulation extends the viral shedding and contamination window',
      'Resource contention: culling teams, labs, and transport are pooled but not visible in real time',
      '$35 billion difference between eradicated and endemic ASF in the US over ten years',
      'Repeat infections increasingly trigger mandatory review; documentation gaps create indemnity risk',
    ],
    tone: 'negative' as const,
  },
];

const toneStyles = {
  positive: {
    border: '#16a34a',
    bg: '#f0fdf4',
    headerBg: '#dcfce7',
    headerBorder: '#bbf7d0',
    iconBg: '#bbf7d0',
    iconColor: '#16a34a',
    titleColor: '#15803d',
    dotColor: '#16a34a',
  },
  warning: {
    border: '#d97706',
    bg: '#fffbeb',
    headerBg: '#fef3c7',
    headerBorder: '#fde68a',
    iconBg: '#fde68a',
    iconColor: '#d97706',
    titleColor: '#b45309',
    dotColor: '#d97706',
  },
  negative: {
    border: '#dc2626',
    bg: '#fef2f2',
    headerBg: '#fee2e2',
    headerBorder: '#fecaca',
    iconBg: '#fecaca',
    iconColor: '#dc2626',
    titleColor: '#b91c1c',
    dotColor: '#dc2626',
  },
};

export function FailurePointsSlide() {
  return (
    <SlideLayout
      title="Why Responses Fail"
      subtitle="The framework is sound. The execution infrastructure is not."
    >
      <div className="flex-1 min-h-0 grid grid-cols-3 gap-5">
        {phases.map((p) => {
          const s = toneStyles[p.tone];
          return (
            <div
              key={p.title}
              className="min-h-0 rounded-lg border flex flex-col overflow-hidden shadow-sm"
              style={{ borderColor: s.border, borderTop: `3px solid ${s.border}`, backgroundColor: s.bg }}
            >
              <div
                className="p-4 pb-3 shrink-0"
                style={{ backgroundColor: s.headerBg, borderBottom: `1px solid ${s.headerBorder}` }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1.5 rounded-md shrink-0" style={{ backgroundColor: s.iconBg }}>
                    <p.Icon className="w-4 h-4" style={{ color: s.iconColor }} />
                  </div>
                  <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: s.titleColor, opacity: 0.6 }}>
                    {p.phase}
                  </span>
                </div>
                <h3 className="text-sm font-bold leading-tight" style={{ color: s.titleColor }}>
                  {p.title}
                </h3>
              </div>

              <p className="px-4 pt-3 pb-2 text-xs leading-relaxed shrink-0" style={{ color: '#374151', opacity: 0.75 }}>
                {p.description}
              </p>

              <ul className="flex-1 px-4 pb-4 space-y-1.5">
                {p.items.map((item) => (
                  <li key={item} className="flex items-start gap-1.5 text-xs" style={{ color: '#374151' }}>
                    <span className="shrink-0 mt-0.5" style={{ color: s.dotColor }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div
        className="shrink-0 mt-4 rounded-lg p-3"
        style={{ backgroundColor: 'var(--slide-bg-primary-muted)', border: '1px solid var(--slide-border-primary)' }}
      >
        <p className="text-xs font-medium leading-relaxed" style={{ color: 'var(--slide-primary)' }}>
          <span style={{ color: 'var(--slide-accent)', fontWeight: 700 }}>The bottleneck is not the protocol. </span>
          It is what happens when a multi-party, time-critical process is executed without a shared operational environment. Every handoff is a manual coordination task. Every delay is exponential.
        </p>
      </div>
    </SlideLayout>
  );
}
