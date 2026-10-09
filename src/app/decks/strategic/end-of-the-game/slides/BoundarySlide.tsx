import { SlideLayout } from '@/components/slides/SlideLayout';

const gaps = [
  {
    label: 'Unmeasured Qualities',
    body: 'Working conditions, long-term durability, anything nobody thought to meter yet. Wherever that\'s true, the old dynamics apply by default: guesswork, reputation, negotiation.',
  },
  {
    label: 'Unmeasured Time Horizons',
    body: 'A metric with a short window can be satisfied without satisfying the thing it was standing in for. The gap between the two is exactly where competing interest re-enters.',
  },
];

export function BoundarySlide() {
  return (
    <SlideLayout
      title="The Boundary"
      subtitle="This holds only where the process is metered. It is worth being exact about where that stops."
    >
      <div className="flex-1 min-h-0 flex flex-col justify-center gap-3">
        {gaps.map(({ label, body }) => (
          <div
            key={label}
            className="rounded-lg px-5 py-4 flex flex-col gap-1.5"
            style={{ backgroundColor: 'var(--slide-bg-muted)', border: '1.5px dashed var(--slide-border)' }}
          >
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--slide-text)', opacity: 0.55 }}>
              {label}
            </span>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.75 }}>
              {body}
            </p>
          </div>
        ))}

        <p className="text-sm leading-relaxed text-center mt-1" style={{ color: 'var(--slide-accent)' }}>
          Not a flaw in the argument. A scope boundary worth being honest about: the frontier of this claim is the
          frontier of what actually gets measured.
        </p>
      </div>
    </SlideLayout>
  );
}
