import { SlideLayout } from '@/components/slides/SlideLayout';

export function AttributionSlide() {
  return (
    <SlideLayout
      title="Attribution, Solved at the Source"
      subtitle="Execution-level trials isolate cause and effect directly, so credit doesn't have to be inferred after the fact."
    >
      <div className="flex-1 min-h-0 flex flex-col justify-center gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div
            className="rounded-lg px-5 py-4 flex flex-col gap-1.5"
            style={{ backgroundColor: 'var(--slide-bg-muted)', border: '1.5px dashed var(--slide-border)' }}
          >
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--slide-text)', opacity: 0.55 }}>
              Apportioned After the Fact
            </span>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.75 }}>
              Multiple contributors act on the same outcome, and credit has to be computed backward, Shapley-value
              style: run every combination, disentangle who moved what. Contestable by construction, because the
              apportionment is a model of the event, not the event itself.
            </p>
          </div>

          <div
            className="rounded-lg px-5 py-4 flex flex-col gap-1.5"
            style={{ backgroundColor: 'var(--slide-bg-accent-muted)', border: '1.5px solid var(--slide-accent)' }}
          >
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--slide-accent)' }}>
              Isolated at the Source
            </span>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.85 }}>
              A trial changes one thing, holds the rest constant, and measures the delta directly. The credit isn't
              computed after the event: the trial design already tells you what caused what, at the moment it happened.
            </p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-center mt-1" style={{ color: 'var(--slide-accent)' }}>
          You don't need to disentangle a claim you never let get tangled in the first place.
        </p>

        <p className="text-xs leading-relaxed text-center" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>
          And it isn't one trial: the same signal, recurring across many independent deliveries and isolating to the
          same source each time, is what gives the delta statistical weight. Noise and confounds wash out with N;
          real effects don't.
        </p>
      </div>
    </SlideLayout>
  );
}
