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
    label: 'Process Mining',
    body: "Discovers and conforms a process model from a real execution log, but only where digital systems already produce one, and only after the fact. Telemetry generates that log live instead, for any physical, field-executed work, and feeds it forward to the next instance, so process-level optimisation, mining's classical output, is only a small part of what the record then supports.",
  },
  {
    label: 'Business Intelligence',
    body: 'Unified, process-centric dashboards and reporting, surfacing performance and highlighting where cost, quality, and service can improve.',
  },
  {
    label: 'Master Data Management',
    body: "Not a general knowledge graph: a fixed set of canonical entities, people, tools, materials, specs, and process steps, each the single authoritative record for what attaches to it, training or licensing, maintenance, a certificate of conformance, a worker's output, legislation.",
  },
];

export function TechnologiesSlide() {
  return (
    <SlideLayout
      title="The Technology Stack"
      subtitle="What the model is built on, and where it sits within AI."
    >
      <div className="flex-1 min-h-0 grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-2.5">
          {technologies.map(({ label, body }) => (
            <div
              key={label}
              className="rounded-lg px-4 py-3 flex flex-col gap-1"
              style={{ backgroundColor: 'var(--slide-bg-card)' }}
            >
              <span className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--slide-accent)' }}>
                {label}
              </span>
              <p className="text-xs leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.8 }}>
                {body}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-lg px-5 py-5 flex flex-col gap-3 h-full" style={{ backgroundColor: 'var(--slide-bg-muted)' }}>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--slide-primary)', opacity: 0.6 }}>
            AI for Production
          </span>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.75 }}>
            This model aligns most closely with <strong>swarm intelligence</strong>, which treats learning as
            continuous rather than a separate, time-boxed phase. Unlike neural networks, the shape isn't
            guessed: the graph's breadth and depth follow directly from the process itself, and every node is
            initialised against named factors, not a blank weight. Training fits the coefficients between them,
            and reveals how far the data still points to factors the model hasn't accounted for. The swarm
            submits the data, but a person reviews and approves what it implies, e.g. that a door takes five
            minutes to hang, before it's adopted: <strong>human-in-the-loop</strong>, not unsupervised.
          </p>
        </div>
      </div>
    </SlideLayout>
  );
}
