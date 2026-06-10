import { SlideLayout } from '@/components/slides/SlideLayout';

const nodes: { label: string; cx: number; cy: number; accent: boolean }[] = [
  { label: 'Spec',        cx: 80,  cy: 12,  accent: true  },
  { label: 'Foundations', cx: 80,  cy: 40,  accent: false },
  { label: 'Frame',       cx: 80,  cy: 68,  accent: false },
  { label: 'Roofing',     cx: 38,  cy: 96,  accent: false },
  { label: 'Services',    cx: 122, cy: 96,  accent: false },
  { label: 'Fit-out',     cx: 80,  cy: 124, accent: false },
  { label: 'Handover',    cx: 80,  cy: 152, accent: false },
];

const edges = [
  { x1: 80,  y1: 20,  x2: 80,  y2: 32  },
  { x1: 80,  y1: 48,  x2: 80,  y2: 60  },
  { x1: 80,  y1: 76,  x2: 38,  y2: 88  },
  { x1: 80,  y1: 76,  x2: 122, y2: 88  },
  { x1: 38,  y1: 104, x2: 80,  y2: 116 },
  { x1: 122, y1: 104, x2: 80,  y2: 116 },
  { x1: 80,  y1: 132, x2: 80,  y2: 144 },
];

export function BestProcessSlide() {
  return (
    <SlideLayout title="Non-Creative Products Have a Best Process" subtitle="Expressible as a partial order of dependent tasks">
      <div className="flex-1 flex gap-8 min-h-0">

        {/* Left - argument */}
        <div className="flex-1 flex flex-col gap-4 justify-center">

          <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.85 }}>
            For any non-creative product, there is a best process: a structure of tasks with defined dependencies.
            Some tasks must precede others. The rest can run in parallel.
            The constraint is the product, not the organisation.
          </p>

          <div className="flex flex-col gap-3">
            {[
              {
                label: 'Poset',
                body: 'A partially ordered set defines only what must precede what - the minimum necessary constraint. Everything left unordered can run in parallel, and should. The ordering is fixed by the nature of the product.',
                note: null,
              },
              {
                label: 'Creativity',
                body: 'Creativity operates within a bounded solution space and produces a specification. The spec is the poset\'s input node. Below the spec, the problem is engineering.',
                note: 'Creativity is elevated, not eliminated: it has a defined and valued place at the entry point.',
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
            The best process is knowable. It can be defined once, improved over time, and applied to every delivery of that type.
            It belongs to no one.
          </p>

        </div>

        {/* Right - poset diagram */}
        <div className="w-52 flex flex-col justify-center shrink-0">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--slide-text)', opacity: 0.35 }}>
            Construction example
          </p>
          <svg viewBox="0 0 160 175" style={{ width: '100%', fontFamily: 'inherit' }}>
            {edges.map((e, i) => (
              <line
                key={i}
                x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
                stroke="var(--slide-border-primary)"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
            ))}
            {nodes.map(({ label, cx, cy, accent }) => (
              <g key={label}>
                <rect
                  x={cx - 35} y={cy - 8}
                  width={70} height={16}
                  rx={3}
                  fill={accent ? 'var(--slide-bg-accent-muted)' : 'var(--slide-bg-card)'}
                  stroke={accent ? 'var(--slide-accent)' : 'var(--slide-border)'}
                  strokeWidth={accent ? 1 : 0.8}
                />
                <text
                  x={cx} y={cy + 4}
                  textAnchor="middle"
                  fontSize="7"
                  fill={accent ? 'var(--slide-accent)' : 'var(--slide-text)'}
                  fillOpacity={accent ? 0.9 : 0.7}
                  fontWeight={accent ? 600 : 400}
                >
                  {label}
                </text>
              </g>
            ))}
            <text
              x="80" y="170"
              textAnchor="middle"
              fontSize="5.5"
              fill="var(--slide-text)"
              fillOpacity="0.3"
              fontStyle="italic"
            >
              roofing and services run in parallel
            </text>
          </svg>
        </div>

      </div>
    </SlideLayout>
  );
}

/*
 * NOTES
 *
 * The second foundational claim of the deck. State attenuation defines what economic activity is;
 * best process defines how it should be structured.
 *
 * A poset (partially ordered set) captures only the necessary constraints: task A must precede
 * task B, task C must precede task D, but B and C can run simultaneously. This is distinct from a
 * total order (a strict sequence) which eliminates parallelism unnecessarily. The best process is
 * the minimal poset: no more ordering than the product requires.
 *
 * Creativity objection: the most common pushback is "but production involves creativity." The
 * response is precise - creativity is real but localised. It operates within a bounded solution
 * space (materials, regulations, client constraints) and produces a specification. Once the spec
 * exists, everything downstream is non-creative and fully processable. The creative act is the
 * input node, not the process itself.
 *
 * Preserving creativity: the framework elevates rather than erases creative labour. It gives
 * creative work a defined, valued position at the entry point of the poset. What disappears is the
 * fiction that all production requires the same kind of managerial judgment - and the surplus
 * extraction that fiction justifies.
 *
 * Audience note: Varoufakis will recognise the connection to algorithmic coordination of production
 * (his techno-feudalism argument inverted). Murphy will see the process transparency angle.
 * Wolff will see the undermining of managerial hierarchy's justification.
 */
