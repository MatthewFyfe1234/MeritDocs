import { FlaskConical, ShieldCheck, Banknote } from 'lucide-react';
import { SlideLayout } from '@/components/slides/SlideLayout';

const asks = [
  {
    icon: FlaskConical,
    title: 'Testing',
    headline: 'A live pilot in a real production environment',
    body: 'A real production environment to run the process, product, agent and inventory model against, generating specification and execution data from actual jobs rather than hypothetical ones.',
  },
  {
    icon: ShieldCheck,
    title: 'Validation',
    headline: 'Independent measurement of the results',
    body: 'Independent evaluation of the productivity, cost and predictability gains, so improvements are demonstrated against a baseline, not just asserted.',
  },
  {
    icon: Banknote,
    title: 'Money',
    headline: 'Runway to keep going, pre-revenue',
    body: 'Working capital to sustain the team through this stage, before the pilot converts into paying deployment.',
  },
];

export function AskSlide() {
  return (
    <SlideLayout
      title="What We're Asking For"
      subtitle="Three things to take Merit from a working model to a validated deployment."
    >
      <div className="flex-1 min-h-0 grid grid-cols-3 gap-5">
        {asks.map(({ icon: Icon, title, headline, body }) => (
          <div
            key={title}
            className="bg-white rounded-lg p-5 shadow-md border flex flex-col gap-3"
            style={{ borderColor: 'var(--slide-border)' }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--slide-bg)' }}>
                <Icon className="w-5 h-5" style={{ color: 'var(--slide-primary)' }} />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wide" style={{ color: 'var(--slide-accent)' }}>
                {title}
              </h3>
            </div>
            <h4 className="text-base font-semibold leading-snug" style={{ color: 'var(--slide-text)' }}>
              {headline}
            </h4>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.8 }}>
              {body}
            </p>
          </div>
        ))}
      </div>

      <p className="text-sm leading-relaxed text-center mt-5" style={{ color: 'var(--slide-accent)' }}>
        Together, these turn Merit from a working model into a proven, funded case for the next application.
      </p>
    </SlideLayout>
  );
}
