import { SlideLayout } from '@/components/slides/SlideLayout';

const directions = [
  {
    label: 'Diagnose',
    body: 'The same formulas pinpoint cost, carbon, safety, and energy sinks in a process that already ran.',
  },
  {
    label: 'Forecast',
    body: "The same formulas, applied before the fact, forecast those same metrics for a project that hasn't started yet.",
  },
];

const consequences = [
  {
    label: 'Automated Estimation and Coordination',
    body: 'An organisation estimates and coordinates from measured relationships, rather than from intuition or an org chart.',
  },
  {
    label: 'Located Improvement',
    body: 'A generic input provider sees exactly where their offering underperforms, rather than asserting quality.',
  },
  {
    label: 'Comparable Claims',
    body: 'A client compares projects on the same measured basis, rather than on claims made about them.',
  },
];

export function ImplicationsSlide() {
  return (
    <SlideLayout
      title="The Same Formulas Diagnose and Forecast"
      subtitle="Applied to a step that already ran, a formula diagnoses. Applied before a project starts, the same formula forecasts."
    >
      <div className="flex-1 min-h-0 flex flex-col justify-center gap-4">
        <div className="grid grid-cols-2 gap-3">
          {directions.map(({ label, body }) => (
            <div
              key={label}
              className="rounded-lg px-5 py-3.5 flex flex-col gap-1.5"
              style={{ backgroundColor: 'var(--slide-bg-accent-muted)', border: '1px solid var(--slide-accent)' }}
            >
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--slide-accent)' }}>
                {label}
              </span>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.9 }}>
                {body}
              </p>
            </div>
          ))}
        </div>

        <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.55 }}>
          Because the same formula runs in both directions, for anyone with access to it:
        </p>

        <div className="grid grid-cols-3 gap-3">
          {consequences.map(({ label, body }) => (
            <div
              key={label}
              className="rounded-lg px-4 py-3.5 flex flex-col gap-1.5"
              style={{ backgroundColor: 'var(--slide-bg-card)' }}
            >
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--slide-text)', opacity: 0.55 }}>
                {label}
              </span>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.8 }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
