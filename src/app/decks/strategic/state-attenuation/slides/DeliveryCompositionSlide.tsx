import { SlideLayout } from '@/components/slides/SlideLayout';

const l3l4Lines = [
  { x1: 8,   x2: 5    },
  { x1: 8,   x2: 14.6 },
  { x1: 32,  x2: 24.2 },
  { x1: 32,  x2: 33.8 },
  { x1: 60,  x2: 53   },
  { x1: 60,  x2: 62.6 },
  { x1: 82,  x2: 72.2 },
  { x1: 82,  x2: 81.8 },
  { x1: 112, x2: 101  },
  { x1: 112, x2: 110.6 },
];

const labels = [
  { y: 21,  text: 'Specified State' },
  { y: 55,  text: 'Cliques (firms)' },
  { y: 89,  text: 'People'         },
  { y: 119, text: 'Steps'          },
  { y: 144, text: 'Sub-steps'      },
  { y: 167, text: 'Actions'        },
];

export function DeliveryCompositionSlide() {
  return (
    <SlideLayout title="Composition of Delivery" subtitle="A hierarchy navigable from specified state to atomic action">
      <div className="flex-1 flex gap-8 min-h-0">

        {/* Left - argument */}
        <div className="flex-1 flex flex-col gap-4 justify-center">

          <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.85 }}>
            The delivery of any specified state is a composition.
            It resolves, at its highest level, into component systems.
            Each component resolves into processes. Each process into steps, sub-steps, and ultimately atomic actions.
            The structure is the same at every level.
          </p>

          <div className="flex flex-col gap-3">
            {[
              {
                label: 'Composition',
                body: 'A product-level poset resolves into component domains at its top abstraction. Each domain is owned by a specialist group who understands and executes it. The product is nothing more than the sum of these compositions, in the correct order.',
                note: null,
              },
              {
                label: 'Decomposition',
                body: 'Each component is itself a poset - decomposable into sub-processes, tasks, and atomic actions. The same dependency logic applies at every level. There is no level at which the structure changes.',
                note: 'This is the basis for full-hierarchy measurement: any state can be tracked, reported, and aggregated from atomic action up to the product as a whole.',
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
            The hierarchy is not an organisational chart. It is a structural property of the delivery itself.
            It exists whether or not a firm wraps it.
          </p>

        </div>

        {/* Right - 6-layer hierarchy tree */}
        <div className="w-60 flex flex-col justify-center shrink-0">
          <svg viewBox="0 0 200 195" style={{ width: '100%', fontFamily: 'inherit' }}>

            {/* L1 → L2 */}
            <line x1={62} y1={26} x2={22}  y2={45.5} stroke="var(--slide-border-primary)" strokeWidth="0.8" strokeOpacity="0.5" />
            <line x1={62} y1={26} x2={100} y2={45.5} stroke="var(--slide-border-primary)" strokeWidth="0.8" strokeOpacity="0.5" />

            {/* L2 → L3 */}
            <line x1={22}  y1={58.5} x2={8}   y2={81.5} stroke="var(--slide-border-primary)" strokeWidth="0.7" strokeOpacity="0.4" />
            <line x1={22}  y1={58.5} x2={32}  y2={81.5} stroke="var(--slide-border-primary)" strokeWidth="0.7" strokeOpacity="0.4" />
            <line x1={100} y1={58.5} x2={60}  y2={81.5} stroke="var(--slide-border-primary)" strokeWidth="0.7" strokeOpacity="0.4" />
            <line x1={100} y1={58.5} x2={82}  y2={81.5} stroke="var(--slide-border-primary)" strokeWidth="0.7" strokeOpacity="0.4" />
            <line x1={100} y1={58.5} x2={112} y2={81.5} stroke="var(--slide-border-primary)" strokeWidth="0.7" strokeOpacity="0.4" />

            {/* L3 → L4 (representative) */}
            {l3l4Lines.map((l, i) => (
              <line key={i} x1={l.x1} y1={90.5} x2={l.x2} y2={113.5} stroke="var(--slide-border-primary)" strokeWidth="0.5" strokeOpacity="0.3" />
            ))}

            {/* L1: Specified State */}
            <circle cx={62} cy={18} r={8} fill="var(--slide-bg-accent-muted)" stroke="var(--slide-accent)" strokeWidth={1} strokeOpacity={0.8} />

            {/* L2: Firms */}
            {[22, 100].map((cx) => (
              <circle key={cx} cx={cx} cy={52} r={6.5} fill="var(--slide-bg-card)" stroke="var(--slide-border-primary)" strokeWidth={0.8} strokeOpacity={0.7} />
            ))}

            {/* L3: People */}
            {[8, 32, 60, 82, 112].map((cx) => (
              <circle key={cx} cx={cx} cy={86} r={4.5} fill="var(--slide-bg-card)" stroke="var(--slide-border)" strokeWidth={0.7} strokeOpacity={0.6} />
            ))}

            {/* L4: Steps */}
            {Array.from({ length: 12 }, (_, i) => 5 + i * 9.6).map((cx) => (
              <circle key={cx} cx={cx} cy={116} r={2.5} fill="var(--slide-border-primary)" fillOpacity={0.45} />
            ))}

            {/* L5: Sub-steps */}
            {Array.from({ length: 20 }, (_, i) => 4 + i * 5.8).map((cx) => (
              <circle key={cx} cx={cx} cy={141} r={1.8} fill="var(--slide-border-primary)" fillOpacity={0.32} />
            ))}

            {/* L6: Actions */}
            {Array.from({ length: 30 }, (_, i) => 3 + i * 3.8).map((cx) => (
              <circle key={cx} cx={cx} cy={164} r={1.2} fill="var(--slide-border-primary)" fillOpacity={0.22} />
            ))}

            {/* Layer labels */}
            {labels.map(({ y, text }) => (
              <text key={text} x={133} y={y} fontSize="7" fill="var(--slide-text)" fillOpacity={0.4} fontStyle="italic">{text}</text>
            ))}

            {/* n^x note */}
            <text x={62} y={184} textAnchor="middle" fontSize="5.5" fill="var(--slide-text)" fillOpacity={0.22} fontStyle="italic">n^x atomic actions</text>

          </svg>
        </div>

      </div>
    </SlideLayout>
  );
}

/*
 * NOTES
 *
 * The delivery of any specified state is a composition. At the highest level it decomposes into
 * component systems - each owned and executed by a specialist group. In the current model these
 * groups are wrapped in firms or company types, but the composition exists regardless of the
 * organisational wrapper. The structure is a property of the delivery, not of the organisation.
 *
 * Fractal structure: each component is itself a poset. The MEP system decomposes into electrical,
 * plumbing, HVAC; each of those decomposes into tasks; tasks into actions. The same dependency
 * logic applies at every level. There is no level at which the structure fundamentally changes.
 *
 * The n^x point: the expansion is exponential. A delivery with 3 components, each with 4 people,
 * each executing 5 steps with 3 sub-steps of 4 actions = thousands of atomic events per delivery.
 * The system can track at every level, aggregate automatically, and surface only the deviations
 * that matter at each layer. A firm today achieves this (imperfectly) through management hierarchy.
 * The model achieves it through structure.
 *
 * Full-hierarchy measurement: because the structure is consistent at every level, data aggregates
 * cleanly upward and decomposes cleanly downward. The state of a delivery at the product level is
 * an aggregate of component states; each component state is an aggregate of sub-process states;
 * and so on to atomic actions. This is what makes accountability without surveillance possible -
 * the context for any action is provided by the structure, not by a manager interpreting it.
 *
 * Audience note: Varoufakis will recognise this as the information structure required for
 * non-hierarchical coordination - the problem he identifies as unsolved in decentralised systems.
 * Murphy will see the audit trail: every action sits within a transparent hierarchy of process.
 * Wolff will see that the hierarchy of composition does not require a hierarchy of authority.
 */
