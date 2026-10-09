import { SlideLayout } from '@/components/slides/SlideLayout';

const layers = [
  {
    name: 'System Cluster',
    basis: 'requires and delivers systems',
    description: 'The set of jobs functionally required to deliver a system.',
    blurb: 'A system is a product — just the name reserved for what a system cluster delivers.',
    tie: false,
  },
  {
    name: 'Job',
    basis: 'aggregates into a system cluster',
    description: 'A process, named and treated as one thing.',
    blurb: 'Requires and delivers products at its own two boundaries, the same way any step does internally.',
    tie: false,
  },
  {
    name: 'Process',
    basis: 'named as one unit, aggregates into a job',
    description: 'An ordered sequence of steps, linked by the products they require and deliver.',
    blurb: 'This is exactly the layer the previous slide showed.',
    tie: true,
  },
  {
    name: 'Sub-Process',
    basis: 'a step of the process above, zoomed in',
    description: 'Not a separate unit chained alongside others — just one step of that process, viewed up close.',
    blurb: 'It turns out to be its own smaller process, built from finer actions.',
    tie: false,
  },
  {
    name: 'Action',
    basis: 'composes into a sub-process',
    description: 'The primitive unit: one function, delivered by a tool, or done manually.',
    blurb: "Doesn't decompose further — this is where the ladder bottoms out.",
    tie: false,
  },
];

export function ScaleSlide() {
  return (
    <SlideLayout
      title="The Same Graph Repeats at Every Scale"
      subtitle="Orthogonal to the graph itself is a granularity axis: this layer aggregates up into jobs and system clusters, and decomposes down into finer processes and actions."
    >
      <div className="flex-1 min-h-0 flex flex-col justify-center gap-2.5">
        {layers.map(({ name, basis, description, blurb, tie }) => (
          <div
            key={name}
            className="grid grid-cols-[150px_1fr_260px] gap-x-5 items-center rounded-lg px-4 py-2.5"
            style={{
              backgroundColor: tie ? 'var(--slide-bg-accent-muted)' : 'var(--slide-bg-card)',
              border: `1px solid ${tie ? 'var(--slide-accent)' : 'var(--slide-border)'}`,
            }}
          >
            <div>
              <span
                className="text-sm font-bold"
                style={{ color: tie ? 'var(--slide-accent)' : 'var(--slide-text)' }}
              >
                {name}
              </span>
              <div
                className="text-[10px] uppercase tracking-wide mt-0.5"
                style={{ color: tie ? 'var(--slide-primary)' : 'var(--slide-text)', opacity: tie ? 0.85 : 0.45 }}
              >
                {basis}
              </div>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.85 }}>
              {description}
            </p>
            <p className="text-xs leading-relaxed italic" style={{ color: 'var(--slide-text)', opacity: 0.55 }}>
              {blurb}
            </p>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}
