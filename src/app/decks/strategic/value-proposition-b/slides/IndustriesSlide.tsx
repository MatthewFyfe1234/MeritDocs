import { SlideLayout } from '@/components/slides/SlideLayout';

const mechanisms: { label: string; body: string }[] = [
  {
    label: 'Delivery',
    body: 'Current state is zero. The full desired state must be produced. Discrete, with a completion point.',
  },
  {
    label: 'Maintenance',
    body: 'Current state has deviated from desired. The gap must be closed. Continuous, with no completion point.',
  },
];

const industries: { label: string; body: string }[] = [
  {
    label: 'Agriculture',
    body: 'Process efficiencies discovered on one farm generalise as measured knowledge usable across the whole industry, not locked to that farm.',
  },
  {
    label: 'Construction',
    body: 'Delivery is enormously complex: many trades, specs, and contributors. The same graph that maps one step maps the whole project, however large.',
  },
  {
    label: 'Health',
    body: "Tracks the experience of care teams, of any size, so a patient is matched with whoever's track record best fits their specific case.",
  },
  {
    label: 'Manufacturing',
    body: 'A defect or a delay is attributed to the specific machine, material, or step responsible, not spread across the whole line as a guess.',
  },
  {
    label: 'Telecommunications',
    body: 'Currently siloed across disparate systems, each holding its own partial picture. Here it unifies into one structured record, tied to the same process.',
  },
  {
    label: 'Incident Response',
    body: 'An incident report functions as a spec: the same mechanism that maps a specification to process steps turns it directly into an action plan.',
  },
  {
    label: 'Utilities',
    body: 'A largely maintenance domain: the same execution data that diagnoses a fault also forecasts the next one, before it happens.',
  },
];

export function IndustriesSlide() {
  return (
    <SlideLayout
      title="Where Value Applies"
      subtitle="Value here follows two independent axes: how complex the process is, and how granularly it can be tracked. More of either raises what the model can do."
    >
      <div className="flex-1 min-h-0 grid grid-cols-2 gap-6">
        <div className="rounded-lg px-5 py-5 flex flex-col gap-3 h-full justify-center" style={{ backgroundColor: 'var(--slide-bg-muted)' }}>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--slide-primary)', opacity: 0.6 }}>
              State Attenuation
            </span>
            <p className="text-xs leading-relaxed mt-0.5" style={{ color: 'var(--slide-text)', opacity: 0.85 }}>
              Taking something from its existing state to a desired state, by coupling state changes to a process.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {mechanisms.map(({ label, body }) => (
              <div key={label} className="rounded-lg px-4 py-3 flex flex-col gap-1" style={{ backgroundColor: 'var(--slide-bg-card)' }}>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--slide-accent)' }}>
                  {label}
                </span>
                <p className="text-xs leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.75 }}>
                  {body}
                </p>
              </div>
            ))}
          </div>

          <p className="text-xs leading-relaxed italic" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>
            A new-build construction process starts from a 0 state and ends at a complete building: delivery.
          </p>

          <p className="text-xs leading-relaxed italic" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>
            We can also consider an activity like putting out a forest fire as going from an initial state to a
            desired state, just like the house. But if we consider it in the broader perspective of activities
            relating to a forest, we can build a much richer, joined-up picture. Forest maintenance is carried
            out against a pre-defined description of the forest, as is putting out the fire. There's a
            mathematical relationship between those two activities, which we can aggregate over all forests.
          </p>

          <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.7 }}>
            Resource, inventory, workforce, and document management are not separate concerns: each is informed by
            this same central objective, closing the gap between current and desired state.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--slide-primary)', opacity: 0.6 }}>
              Example Industries
            </span>
            <p className="text-xs italic leading-snug mt-0.5" style={{ color: 'var(--slide-text)', opacity: 0.5 }}>
              Each card shows the benefit most pertinent to that industry: every capability is shared across all use cases.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {industries.map(({ label, body }) => (
              <div
                key={label}
                className="rounded-lg px-4 py-3 flex flex-col gap-1.5"
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
        </div>
      </div>
    </SlideLayout>
  );
}
