import { SlideLayout } from '@/components/slides/SlideLayout';

const beats = [
  {
    label: 'The Failure',
    body: "BPMN's notation has no concept of execution-time measurement at all. Any logging is left to whatever engine runs it, layered on afterwards.",
  },
  {
    label: 'The Question It Forced',
    body: 'A metric is only meaningful relative to a step — but which steps does a given project actually touch? Recording data against the wrong step, or none, makes it useless.',
  },
  {
    label: 'The Realisation',
    body: "Specification components imply process steps. Not known at the outset — it was first thought a step could simply be tracked whenever it ran. Working through what a project's data should attach to is what surfaced the mechanism.",
    highlight: true,
  },
];

export function MeasurementFoundationSlide() {
  return (
    <SlideLayout
      title="Measurement Needed to Know Which Steps a Project Touches"
      subtitle="The same necessity, maturing into the mechanism that answers it."
    >
      <div className="flex-1 min-h-0 flex flex-col justify-center gap-3">
        {beats.map(({ label, body, highlight }, i) => (
          <div key={label} className="flex flex-col items-center gap-3">
            {i > 0 && (
              <span className="text-lg leading-none" style={{ color: 'var(--slide-accent)', opacity: 0.4 }}>↓</span>
            )}
            <div
              className="w-full rounded-lg px-5 py-4 flex flex-col gap-1.5"
              style={{
                backgroundColor: highlight ? 'var(--slide-bg-accent-muted)' : 'var(--slide-bg-card)',
                border: highlight ? '1px solid var(--slide-accent)' : undefined,
              }}
            >
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: highlight ? 'var(--slide-accent)' : 'var(--slide-text)', opacity: highlight ? 1 : 0.5 }}
              >
                {label}
              </span>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: highlight ? 0.95 : 0.8 }}>
                {body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}
