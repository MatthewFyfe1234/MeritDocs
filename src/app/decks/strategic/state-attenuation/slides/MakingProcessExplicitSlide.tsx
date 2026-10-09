import { SlideLayout } from '@/components/slides/SlideLayout';

const sprawlNodes = [
  { cx: 14,  cy: 14 }, { cx: 38,  cy: 8  }, { cx: 60,  cy: 20 }, { cx: 84,  cy: 10 },
  { cx: 106, cy: 24 }, { cx: 22,  cy: 34 }, { cx: 48,  cy: 32 }, { cx: 72,  cy: 36 },
  { cx: 96,  cy: 34 }, { cx: 10,  cy: 50 }, { cx: 34,  cy: 52 }, { cx: 58,  cy: 50 },
  { cx: 82,  cy: 54 }, { cx: 104, cy: 48 }, { cx: 46,  cy: 66 }, { cx: 68,  cy: 64 },
];

const sprawlEdges = [
  [0,1],[1,2],[2,3],[3,4],[0,5],[1,6],[2,6],[3,7],[4,8],[5,9],[5,10],
  [6,10],[6,11],[7,11],[7,12],[8,12],[8,13],[10,14],[11,14],[11,15],[12,15],
];

const pathNodes = [
  { cx: 16, cy: 20, label: 'Spec' },
  { cx: 46, cy: 20, label: 'Step' },
  { cx: 76, cy: 20, label: 'Step' },
  { cx: 106, cy: 20, label: 'Step' },
];

export function MakingProcessExplicitSlide() {
  return (
    <SlideLayout title="Making Process Explicit" subtitle="Two things turn a sprawling map into a usable interface">
      <div className="flex-1 flex gap-8 min-h-0">

        {/* Left - argument */}
        <div className="flex-1 flex flex-col gap-4 justify-center">

          <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.85 }}>
            An explicit master process is only useful if an operator can navigate it on one job, and if it stays
            current with how work is actually done. Two things make that possible.
          </p>

          <div className="flex flex-col gap-3">
            {[
              {
                label: 'Coupling to Product',
                body: 'A master process written for every material and every path is too sprawling to act as an interface. Coupling it to a spec selects only the steps that job requires. The spec is what turns an unusable universal map into a navigable one.',
                note: null,
              },
              {
                label: 'Step-Level Data',
                body: 'Marking when a step starts and completes, at whatever fidelity is available, is what lets the process populate and correct itself instead of calcifying into a static document. A manual mark is sufficient. Passive telemetry is preferable, not required.',
                note: 'The threshold is data at the step, not the sophistication of the capture method.',
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
            Without both, what exists is a map nobody can use and nobody keeps current.
            With both, it is a shared interface that improves with every job that runs.
          </p>

        </div>

        {/* Right - sprawl to path diagram */}
        <div className="w-60 flex flex-col justify-center shrink-0 gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--slide-text)', opacity: 0.35 }}>
            Undifferentiated process
          </p>
          <svg viewBox="0 0 116 76" style={{ width: '100%' }}>
            {sprawlEdges.map(([a, b], i) => (
              <line
                key={i}
                x1={sprawlNodes[a].cx} y1={sprawlNodes[a].cy}
                x2={sprawlNodes[b].cx} y2={sprawlNodes[b].cy}
                stroke="var(--slide-border-primary)" strokeWidth="0.6" strokeOpacity="0.35"
              />
            ))}
            {sprawlNodes.map(({ cx, cy }, i) => (
              <circle key={i} cx={cx} cy={cy} r="2.6" fill="var(--slide-border-primary)" fillOpacity="0.4" />
            ))}
          </svg>

          <div className="flex items-center gap-2 justify-center">
            <span className="text-[9px] italic" style={{ color: 'var(--slide-text)', opacity: 0.4 }}>+ spec, + step data</span>
            <svg width="28" height="12" viewBox="0 0 28 12">
              <line x1="0" y1="6" x2="22" y2="6" stroke="var(--slide-accent)" strokeOpacity="0.6" strokeWidth="1.4" />
              <path d="M22,2 L28,6 L22,10 z" fill="var(--slide-accent)" fillOpacity="0.6" />
            </svg>
          </div>

          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--slide-text)', opacity: 0.35 }}>
            Navigable interface
          </p>
          <svg viewBox="0 0 122 40" style={{ width: '100%' }}>
            {pathNodes.slice(0, -1).map((n, i) => (
              <line
                key={i}
                x1={n.cx + 12} y1={n.cy}
                x2={pathNodes[i + 1].cx - 12} y2={pathNodes[i + 1].cy}
                stroke="var(--slide-accent)" strokeOpacity="0.6" strokeWidth="1.2"
              />
            ))}
            {pathNodes.map(({ cx, cy, label }, i) => (
              <g key={i}>
                <rect
                  x={cx - 15} y={cy - 8} width="30" height="16" rx="3"
                  fill={i === 0 ? 'var(--slide-bg-accent-muted)' : 'var(--slide-bg-card)'}
                  stroke={i === 0 ? 'var(--slide-accent)' : 'var(--slide-border)'}
                  strokeWidth={i === 0 ? 1 : 0.8}
                />
                <text x={cx} y={cy + 3} textAnchor="middle" fontSize="6.5" fill={i === 0 ? 'var(--slide-accent)' : 'var(--slide-text)'} fillOpacity={i === 0 ? 0.9 : 0.7} fontWeight={i === 0 ? 600 : 400}>
                  {label}
                </text>
                {i > 0 && (
                  <circle cx={cx + 11} cy={cy - 10} r="2.2" fill="var(--slide-accent)" fillOpacity="0.55" />
                )}
              </g>
            ))}
            <text x="122" y="36" textAnchor="end" fontSize="5.5" fontStyle="italic" fill="var(--slide-text)" fillOpacity="0.35">
              marks = step data
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
 * This slide sits between Delivery Composition / Master Process and Best Process, establishing why
 * an explicit master process has not simply been written down already: a full map of every material
 * and every path, undifferentiated, is too sprawling to act as an interface for anyone. Two things
 * give it utility.
 *
 * Coupling to product: a spec selects the subset of the master process a given job actually needs,
 * the same union-of-component-steps mechanism used elsewhere in the platform (spec -> components ->
 * process). This is what turns an unusable universal map into something one operator can navigate on
 * one job.
 *
 * Step-level data: marking when a step starts and completes is what lets the process populate and
 * self-correct rather than calcify into a static prescriptive document, the RIBA Plan of Work failure
 * mode described in Natural Authors. The capture method's sophistication does not matter, a manual
 * mark clears the bar. Passive telemetry is a preferable upgrade, not a precondition.
 *
 * Deliberately makes no claim about why this is possible now versus earlier, and no claim about
 * capitalism's trajectory. This is a set of observations about what gives a written process utility,
 * not a historical-necessity or political argument. See feedback_deck_argument_construction memory.
 */
