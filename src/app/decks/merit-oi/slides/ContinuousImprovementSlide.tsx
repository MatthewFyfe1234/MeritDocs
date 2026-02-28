import { Target, Brain, TrendingUp } from 'lucide-react';

const loop = [
  { n: '01', top: 'Project',  bottom: 'Completes'   },
  { n: '02', top: 'Outcomes', bottom: 'Captured'    },
  { n: '03', top: 'Patterns', bottom: 'Recognised'  },
  { n: '04', top: 'Next Job', bottom: 'Improves'    },
];

const compounds = [
  {
    Icon: Target,
    title: 'Estimate accuracy compounds',
    text: 'Each quote draws on every completed job. Margin predictability improves as the dataset grows. The further in, the closer your estimate is to your actual cost.',
  },
  {
    Icon: Brain,
    title: 'Knowledge survives turnover',
    text: 'When your best estimator leaves, the learning stays. Process decisions, what worked and what did not, are embedded in the system, not the person.',
  },
  {
    Icon: TrendingUp,
    title: 'Improvement becomes measurable',
    text: 'Not a one-time initiative. Every function can see whether performance is improving, when it changed, and what drove it.',
  },
];

export function ContinuousImprovementSlide() {
  return (
    <div className="w-full h-full p-8 flex flex-col">

      {/* Header */}
      <div className="mb-4 shrink-0">
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--slide-primary)' }}>
          The Organisation That Gets Smarter
        </h2>
        <div className="w-20 h-1" style={{ backgroundColor: 'var(--slide-accent)' }} />
        <p className="text-xs mt-2" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>
          Other tools store your data. Merit OI turns it into open-box intelligence built and owned by your ever-evolving team.
        </p>
      </div>

      <div className="flex-1 min-h-0 flex flex-col gap-4">

        {/* Learning loop */}
        <div className="shrink-0">
          <div className="flex items-stretch">
            {loop.flatMap((stage, i) => {
              const box = (
                <div
                  key={stage.n}
                  className="flex-1 flex flex-col items-center justify-center rounded-lg py-3 px-2 text-center"
                  style={{ backgroundColor: 'var(--slide-bg-primary-muted)', border: '1px solid var(--slide-border-primary)' }}
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center mb-1.5 text-white font-bold shrink-0"
                    style={{ backgroundColor: 'var(--slide-primary)', fontSize: '0.55rem' }}
                  >
                    {stage.n}
                  </div>
                  <span className="text-xs font-semibold" style={{ color: 'var(--slide-primary)' }}>{stage.top}</span>
                  <span className="text-xs font-semibold" style={{ color: 'var(--slide-primary)' }}>{stage.bottom}</span>
                </div>
              );
              if (i < loop.length - 1) {
                return [
                  box,
                  <div
                    key={`arr-${i}`}
                    className="flex flex-col items-center justify-center shrink-0"
                    style={{ width: '26px' }}
                  >
                    <div style={{ width: '100%', borderTop: '1.5px solid var(--slide-primary)', opacity: 0.35 }} />
                    <span style={{ fontSize: '0.75rem', color: 'var(--slide-primary)', opacity: 0.5, marginTop: '3px' }}>→</span>
                  </div>,
                ];
              }
              return [box];
            })}
          </div>
          {/* Return label */}
          <div className="mt-1.5 flex items-center gap-2">
            <div style={{ flex: 1, borderTop: '1.5px dashed var(--slide-accent)', opacity: 0.2 }} />
            <span className="text-xs font-medium" style={{ color: 'var(--slide-accent)', opacity: 0.6 }}>
              ↺ every project refines the next
            </span>
            <div style={{ flex: 1, borderTop: '1.5px dashed var(--slide-accent)', opacity: 0.2 }} />
          </div>
        </div>

        {/* Compound benefit cards */}
        <div className="flex-1 min-h-0 grid grid-cols-3 gap-4">
          {compounds.map((c) => (
            <div
              key={c.title}
              className="min-h-0 bg-white rounded-lg border p-4 shadow-sm flex flex-col"
              style={{ borderColor: 'var(--slide-border)', borderLeft: '3px solid var(--slide-accent)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-md shrink-0" style={{ backgroundColor: '#f5f0ff' }}>
                  <c.Icon className="w-4 h-4" style={{ color: 'var(--slide-accent)' }} />
                </div>
                <h4 className="text-sm font-semibold leading-tight" style={{ color: 'var(--slide-primary)' }}>{c.title}</h4>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.8 }}>{c.text}</p>
            </div>
          ))}
        </div>

        {/* Callout */}
        <div
          className="shrink-0 rounded-lg px-4 py-2.5"
          style={{ backgroundColor: '#faf5ff', border: '1px solid #e9d5ff' }}
        >
          <p className="text-xs font-medium" style={{ color: 'var(--slide-primary)' }}>
            <span style={{ color: 'var(--slide-accent)', fontWeight: 700 }}>The compounding advantage: </span>
            A manufacturer using Merit OI for three years has not just a better tool. They have a proprietary dataset: real margin actuals, process performance history, skill and capacity records. That is an institutional asset no competitor can replicate by switching software.
          </p>
        </div>

      </div>
    </div>
  );
}
