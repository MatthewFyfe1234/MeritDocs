import { SlideLayout } from '@/components/slides/SlideLayout';

const technologies: { label: string; body: string }[] = [
  {
    label: 'IoT / Telemetry',
    body: 'Execution data captured live from sensors and devices during the step, not only entered manually after the fact.',
  },
  {
    label: 'Digital Twin',
    body: 'A structured process graph, kept live against actual execution, so the model tracks production as it runs rather than as it was planned.',
  },
  {
    label: 'Business Intelligence',
    body: 'Unified, process-centric dashboards and reporting, surfacing performance and highlighting where cost, quality, and service can improve.',
  },
  {
    label: 'Operational Intelligence',
    body: 'Live execution data used to automate operational decisions directly, such as estimation and coordination. As compared with AI, outcomes are computed deterministically from formulas over recorded data, not inferred by a trained, black-box model.',
  },
];

export function TechnologiesSlide() {
  return (
    <SlideLayout
      title="Technologies"
      subtitle="What the model is built on."
    >
      <div className="flex-1 min-h-0 grid grid-cols-2 grid-rows-2 gap-3">
        {technologies.map(({ label, body }) => (
          <div
            key={label}
            className="rounded-lg px-5 py-4 flex flex-col gap-1.5"
            style={{ backgroundColor: 'var(--slide-bg-card)' }}
          >
            <span className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--slide-accent)' }}>
              {label}
            </span>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.8 }}>
              {body}
            </p>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}
