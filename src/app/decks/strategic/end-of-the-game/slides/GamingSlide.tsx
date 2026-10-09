import { SlideLayout } from '@/components/slides/SlideLayout';

export function GamingSlide() {
  return (
    <SlideLayout
      title="Two Ways to Game This"
      subtitle="Goodhart's law isn't one failure mode. It's worth splitting into the two it actually is, and answering each on its own terms."
    >
      <div className="flex-1 min-h-0 flex flex-col justify-center gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div
            className="rounded-lg px-5 py-5 flex flex-col gap-1.5"
            style={{ backgroundColor: 'var(--slide-bg-accent-muted)', border: '1.5px solid var(--slide-accent)' }}
          >
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--slide-accent)' }}>
              Fabrication-Gaming
            </span>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.9 }}>
              Claiming something happened that didn't, or claiming more credit than is due. A false claim has to
              survive comparison against every independently-sourced signal touching the same event, and keep
              surviving as more evidence accumulates. The cost of faking it convincingly approaches the cost of
              just doing the real thing.
            </p>
          </div>

          <div
            className="rounded-lg px-5 py-5 flex flex-col gap-1.5"
            style={{ backgroundColor: 'var(--slide-bg-muted)', border: '1.5px dashed var(--slide-border)' }}
          >
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--slide-text)', opacity: 0.55 }}>
              Target-Narrowing
            </span>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.8 }}>
              Genuinely optimising for exactly what's metered, and letting everything the metric doesn't capture
              slide. No fabrication involved: the number goes up, and something the number never asked about
              quietly gets worse.
            </p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-center mt-1" style={{ color: 'var(--slide-accent)' }}>
          The first is solved by making a claim hard to fake. The second needs a different answer: making the
          target itself hard to narrow.
        </p>
      </div>
    </SlideLayout>
  );
}
