import { SlideLayout } from '@/components/slides/SlideLayout';

export function PivotSlide() {
  return (
    <SlideLayout
      title="What Doesn't Change, and What Does"
      subtitle="Self-interest isn't suppressed. It's stripped of every strategy except the productive one."
    >
      <div className="flex-1 min-h-0 flex flex-col justify-center gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div
            className="rounded-lg px-5 py-5 flex flex-col gap-1.5"
            style={{ backgroundColor: 'var(--slide-bg-muted)', border: '1.5px solid var(--slide-border)' }}
          >
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--slide-text)', opacity: 0.55 }}>
              Doesn't Change
            </span>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.8 }}>
              "I want more for me than for them" stays exactly as true as it ever was. Nobody stops wanting to win.
            </p>
          </div>

          <div
            className="rounded-lg px-5 py-5 flex flex-col gap-1.5"
            style={{ backgroundColor: 'var(--slide-bg-accent-muted)', border: '1.5px solid var(--slide-accent)' }}
          >
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--slide-accent)' }}>
              Does Change
            </span>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.9 }}>
              Every route to more that doesn't run through actually producing more value. Lying, hiding,
              exaggerating, angling: none of them pay anymore.
            </p>
          </div>
        </div>

        <p className="text-base leading-relaxed text-center mt-1" style={{ color: 'var(--slide-accent)' }}>
          Wanting to win and telling the truth stop being in tension.
        </p>
      </div>
    </SlideLayout>
  );
}
