import { SlideLayout } from '@/components/slides/SlideLayout';

const facets = [
  { label: 'People', body: 'the executor who ran it' },
  { label: 'Inventory', body: 'the tool itself' },
  { label: 'Process', body: 'the method being executed' },
  { label: 'Product', body: 'what came out the other end' },
];

export function IndivisibleEventSlide() {
  return (
    <SlideLayout
      title="Why the Target Can't Narrow"
      subtitle="Detecting a tool usage doesn't hand you one signal to optimise. It hands you four, because the event was never separable."
    >
      <div className="flex-1 min-h-0 flex flex-col justify-center gap-4">
        <div
          className="rounded-xl p-1.5"
          style={{ backgroundColor: 'var(--slide-bg-accent-muted)', border: '2px solid var(--slide-accent)' }}
        >
          <p className="text-center text-xs font-bold uppercase tracking-widest pt-2 pb-1" style={{ color: 'var(--slide-accent)' }}>
            One Execution Event
          </p>
          <div className="grid grid-cols-2 gap-1.5 p-1.5">
            {facets.map(({ label, body }) => (
              <div
                key={label}
                className="rounded-lg px-4 py-3 flex flex-col gap-0.5"
                style={{ backgroundColor: 'var(--slide-bg-card)' }}
              >
                <span className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--slide-primary)' }}>
                  {label}
                </span>
                <span className="text-xs" style={{ color: 'var(--slide-text)', opacity: 0.7 }}>
                  {body}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm leading-relaxed text-center" style={{ color: 'var(--slide-text)', opacity: 0.75 }}>
          These aren't four channels a payout gets routed through. They're four facets of one indivisible event: the
          moment a tool usage is detected at all, all four are already present, by construction. Reward computed off
          the whole event leaves no facet unpriced for gaming to escape into.
        </p>

        <p className="text-sm leading-relaxed text-center mt-1" style={{ color: 'var(--slide-accent)' }}>
          There's no narrow target to optimise in isolation, because there was never a narrow event to begin with.
        </p>
      </div>
    </SlideLayout>
  );
}
