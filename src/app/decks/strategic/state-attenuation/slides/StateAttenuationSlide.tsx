import { SlideLayout } from '@/components/slides/SlideLayout';

const examples: { type: 'Delivery' | 'Maintenance'; name: string; note?: string }[] = [
  { type: 'Delivery',     name: 'Building a house',       note: 'from 0' },
  { type: 'Maintenance',  name: 'Road patching' },
  { type: 'Delivery',     name: 'Cooking a meal',         note: 'from 0' },
  { type: 'Maintenance',  name: 'Restocking a kitchen' },
  { type: 'Delivery',     name: 'Heart surgery' },
  { type: 'Maintenance',  name: 'Post-operative care' },
  { type: 'Delivery',     name: 'Forest fire response' },
  { type: 'Maintenance',  name: 'Forest management' },
];

export function StateAttenuationSlide() {
  return (
    <SlideLayout title="State Attenuation" subtitle="The foundational definition">
      <div className="flex-1 flex gap-8 min-h-0">

        {/* Left - argument */}
        <div className="flex-1 flex flex-col gap-4 justify-center">

          <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.85 }}>
            All economic activity closes the gap between current state and desired state.
            The mechanism is always one of two things.
          </p>

          <div className="flex flex-col gap-3">
            {[
              {
                label: 'Delivery',
                body: 'Current state is zero. The full desired state must be produced. Discrete, spec-driven, with a completion point.',
                note: 'Production — making things from nothing — is delivery from a 0 state. It is not a separate category.',
              },
              {
                label: 'Maintenance',
                body: 'Current state has deviated from desired. The gap must be closed. Continuous, state-driven, with no completion point.',
                note: null,
              },
            ].map(({ label, body, note }) => (
              <div
                key={label}
                className="rounded-lg p-4 flex flex-col gap-1.5"
                style={{ backgroundColor: 'var(--slide-bg-card)' }}
              >
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--slide-accent)' }}>
                  {label}
                </span>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.75 }}>
                  {body}
                </p>
                {note && (
                  <p className="text-xs italic leading-relaxed" style={{ color: 'var(--slide-primary)', opacity: 0.65 }}>
                    {note}
                  </p>
                )}
              </div>
            ))}
          </div>

          <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>
            The difference between delivery and maintenance is the magnitude of the gap, not the nature of the activity.
            Both are the same operation.
          </p>

          {/* Cross diagram */}
          <div className="flex justify-center">
            <svg viewBox="0 0 220 220" style={{ width: '150px', height: '150px' }}>
              <line x1="45" y1="110" x2="175" y2="110" stroke="var(--slide-border-primary)" strokeWidth="1" strokeOpacity="0.7" />
              <line x1="110" y1="45" x2="110" y2="175" stroke="var(--slide-border-primary)" strokeWidth="1" strokeOpacity="0.7" />

              <text x="110" y="28" textAnchor="middle" fontSize="8" fontWeight="700" letterSpacing="0.8" fill="var(--slide-accent)" fillOpacity="0.8">SPECULATIVE</text>
              <text x="110" y="40" textAnchor="middle" fontSize="6" fontStyle="italic" fill="var(--slide-text)" fillOpacity="0.4">increasing risk / uncertainty</text>

              <text x="110" y="204" textAnchor="middle" fontSize="8" fontWeight="700" letterSpacing="0.8" fill="var(--slide-accent)" fillOpacity="0.8">GOODS</text>

              <text x="40" y="107" textAnchor="end" fontSize="8" fontWeight="700" letterSpacing="0.8" fill="var(--slide-accent)" fillOpacity="0.8">PERSONAL</text>

              <text x="180" y="107" textAnchor="start" fontSize="8" fontWeight="700" letterSpacing="0.8" fill="var(--slide-accent)" fillOpacity="0.8">COMMON</text>
              <text x="180" y="118" textAnchor="start" fontSize="6" fontStyle="italic" fill="var(--slide-text)" fillOpacity="0.4">collective reach</text>
            </svg>
          </div>

        </div>

        {/* Right - examples */}
        <div className="w-52 flex flex-col gap-2 justify-center shrink-0">
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--slide-text)', opacity: 0.35 }}>
            Examples
          </p>
          {examples.map(({ type, name, note }) => (
            <div
              key={name}
              className="flex items-baseline gap-2"
              style={{ borderBottom: '1px solid var(--slide-border)' }}
            >
              <span
                className="text-xs font-semibold shrink-0 py-1.5"
                style={{ color: type === 'Delivery' ? 'var(--slide-accent)' : 'var(--slide-primary)', opacity: 0.8, width: '72px' }}
              >
                {type}
              </span>
              <span className="text-xs py-1.5" style={{ color: 'var(--slide-text)', opacity: 0.7 }}>
                {name}{note && <span style={{ opacity: 0.5 }}> ({note})</span>}
              </span>
            </div>
          ))}

          <div className="mt-2 rounded-lg p-3" style={{ backgroundColor: 'var(--slide-bg-muted)', borderLeft: '2px solid var(--slide-border-primary)' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--slide-text)', opacity: 0.35 }}>
              Coexistence
            </p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.55 }}>
              Every delivery project runs within a maintained enabling system. A meal depends on a maintained kitchen. A surgery depends on a maintained hospital.
            </p>
          </div>
        </div>

      </div>
    </SlideLayout>
  );
}

/*
 * NOTES
 *
 * All economic activity, without exception, is either the delivery of a desired state or the
 * maintenance of one. This is the claim the rest of the deck builds on.
 *
 * A desired state is defined first - by a client, a community, a specification. Economic activity
 * is the process of closing the gap between where things are and where they should be.
 *
 * Example: a restaurant operates two simultaneous models. Each meal is a discrete delivery project
 * - the order is the spec, the kitchen brigade is the process, service is the completion point.
 * The restaurant itself is a continuous maintenance model - ingredients are consumed and must be
 * restocked, restrooms deviate from clean and must be restored, equipment degrades and must be
 * serviced. Both are running in parallel, at different timescales, with the same underlying logic.
 *
 * This reframes what an economy fundamentally is: not a production machine oriented toward growth
 * and output, but a state maintenance system oriented toward defined human and ecological outcomes.
 *
 * It also dissolves the artificial sectoral boundaries - healthcare, construction, environmental
 * management, infrastructure - that currently fragment the economy into separate industries with
 * separate logics. In this framework, they are all the same thing.
 */
