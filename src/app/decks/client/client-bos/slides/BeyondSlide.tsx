import { SlideLayout } from '@/components/slides/SlideLayout';

const stats = [
  {
    figure: '44.1%',
    label: 'of offsite defects globally attributable to on-site assembly workmanship. No cross-system training pathway exists to address it.',
  },
  {
    figure: '75%',
    label: 'of UK mortgage lending evaluates MMC case-by-case. No shared evidence base exists to underwrite the sector at scale. No individual manufacturer can build one. (UK Finance, 2023)',
  },
  {
    figure: '£10m+',
    label: 'a single modular insurance claim across 400 bathroom pods - the same installation defect, repeated. Systemic problems require systemic records.',
  },
];

export function BeyondSlide() {
  return (
    <SlideLayout>
      <div className="flex-1 min-h-0 flex flex-row gap-8">

        <div className="shrink-0 w-52 flex flex-col justify-center gap-3 border-r pr-6" style={{ borderColor: 'var(--slide-border)' }}>
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--slide-accent)', opacity: 0.5 }}>BOS Manifesto</p>
          {[
            'collaborative frameworks and partnerships at the heart of deploying performance specifications',
            'enable greater project delivery at scale',
            'evidence-based assessments',
            'delivering evidence-based guidance',
            'an outcome-based approach focused on value, performance and sustainability',
            'good practice solutions identified, and offsite construction normalised',
          ].map((q) => (
            <p key={q} className="text-xs italic leading-snug" style={{ color: 'var(--slide-accent)', opacity: 0.7 }}>"{q}"</p>
          ))}
        </div>

        <div className="flex-1 flex flex-col justify-center gap-6 px-4">
          <div>
            <p className="text-3xl font-bold leading-tight mb-3" style={{ color: 'var(--slide-primary)', opacity: 0.3 }}>
              A master process, master product, and master inventory can be held by each individual manufacturer - or at a level above the manufacturer.
            </p>
            <p className="text-3xl font-bold leading-tight mb-3" style={{ color: 'var(--slide-primary)', opacity: 0.6 }}>
              The manifesto commitments on the left each require data no individual manufacturer can generate.
            </p>
            <p className="text-3xl font-bold leading-tight" style={{ color: 'var(--slide-primary)' }}>
              Some things are only possible at the association level.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {stats.map((s) => (
              <div key={s.figure} className="flex items-start gap-4">
                <p className="shrink-0 text-2xl font-bold w-16 leading-tight" style={{ color: 'var(--slide-accent)' }}>{s.figure}</p>
                <p className="text-xs leading-relaxed pl-4" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </SlideLayout>
  );
}
