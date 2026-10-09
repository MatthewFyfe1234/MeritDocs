import { SlideLayout } from '@/components/slides/SlideLayout';

const parties = [
  { label: 'Tools',                body: 'Constrain what is physically possible, and how work can be sequenced.' },
  { label: 'Materials',            body: 'Constrain inputs, tolerances, and handling.' },
  { label: 'Education & Training', body: 'Encode practice into people, informally and unevenly.' },
  { label: 'Legislators',          body: 'Set a legal floor, by jurisdiction, not by ecosystem.' },
  { label: 'Insurers',             body: 'Set a risk-priced floor, shaping practice through liability.' },
  { label: 'Culture (perhaps)',    body: 'Carries tacit "how it is done here" norms, likely a residue of the other five rather than an independent source.', muted: true },
];

const nodes: { label: string; cx: number; cy: number; muted?: boolean }[] = [
  { label: 'Tools',           cx: 180, cy: 22  },
  { label: 'Materials',       cx: 292, cy: 62  },
  { label: 'Insurers',        cx: 292, cy: 158 },
  { label: 'Legislators',     cx: 180, cy: 198 },
  { label: 'Education',       cx: 68,  cy: 158 },
  { label: 'Culture',         cx: 68,  cy: 62,  muted: true },
];

export function InvisibleProcessSlide() {
  return (
    <SlideLayout title="The Invisible Process" subtitle="Several parties gather round it. None of them own it.">
      <div className="flex-1 flex flex-col gap-5 min-h-0">

        <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.8, maxWidth: '76ch' }}>
          Process is not absent today. It is implicit: the byproduct of several independent parties, each
          constraining or shaping it from their own angle, none coordinating with the others, none accountable
          for it as a whole. What exists is a cloud, not a document. To pursue agreed outcomes, it has to become
          a real, explicit, shared, and visible thing.
        </p>

        {/* Cloud diagram */}
        <div className="flex-1 flex items-center justify-center min-h-0">
          <svg viewBox="0 0 360 220" style={{ width: '100%', maxWidth: '480px', height: 'auto', fontFamily: 'inherit' }}>
            <defs>
              <marker id="cloudArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 z" fill="var(--slide-border-primary)" fillOpacity="0.5" />
              </marker>
            </defs>

            {/* one-way lines in, no coordination between parties */}
            {nodes.map((n, i) => (
              <line
                key={i}
                x1={n.cx} y1={n.cy}
                x2={180 + (n.cx - 180) * 0.35} y2={110 + (n.cy - 110) * 0.35}
                stroke="var(--slide-border-primary)" strokeOpacity={n.muted ? 0.25 : 0.4} strokeWidth="1"
                strokeDasharray={n.muted ? '2,2' : undefined}
                markerEnd="url(#cloudArrow)"
              />
            ))}

            {/* hazy cloud, drawn as overlapping low-opacity blobs */}
            <ellipse cx="180" cy="110" rx="46" ry="34" fill="var(--slide-text)" fillOpacity="0.06" />
            <ellipse cx="162" cy="98"  rx="30" ry="24" fill="var(--slide-text)" fillOpacity="0.05" />
            <ellipse cx="200" cy="122" rx="32" ry="22" fill="var(--slide-text)" fillOpacity="0.05" />
            <ellipse cx="180" cy="110" rx="46" ry="34" fill="none" stroke="var(--slide-text)" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3,3" />
            <text x="180" y="107" textAnchor="middle" fontSize="11" fontStyle="italic" fontWeight="600" fill="var(--slide-text)" fillOpacity="0.45">Process</text>
            <text x="180" y="119" textAnchor="middle" fontSize="6.5" fontStyle="italic" fill="var(--slide-text)" fillOpacity="0.32">unseen, chaotic</text>

            {nodes.map(({ label, cx, cy, muted }, i) => (
              <g key={i}>
                <rect
                  x={cx - 34} y={cy - 9} width="68" height="18" rx="3"
                  fill="var(--slide-bg-card)"
                  stroke="var(--slide-border)"
                  strokeWidth="0.8"
                  strokeDasharray={muted ? '2,2' : undefined}
                  opacity={muted ? 0.7 : 1}
                />
                <text x={cx} y={cy + 3.5} textAnchor="middle" fontSize="8" fill="var(--slide-text)" fillOpacity={muted ? 0.55 : 0.75}>
                  {label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Party descriptions */}
        <div className="grid grid-cols-3 gap-x-6 gap-y-3" style={{ flex: '0 0 auto' }}>
          {parties.map(({ label, body, muted }) => (
            <div key={label} className="flex flex-col gap-1 pt-2" style={{ borderTop: '1px solid var(--slide-border-primary)', opacity: muted ? 0.6 : 1 }}>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--slide-accent)', opacity: 0.8 }}>
                {label}
              </span>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>
                {body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </SlideLayout>
  );
}

/*
 * NOTES
 *
 * Diagnostic slide, precedes Best Process. The claim is not that process is absent today, but that
 * it is implicit and unowned: an emergent residue of several independent parties, each constraining
 * or shaping it from their own angle (tools, materials, training, legislation, insurance, and
 * possibly culture as a residue of the other five rather than an independent source), none of them
 * coordinating with each other, none accountable for the process as a whole.
 *
 * This sets up Best Process's claim (there is a best process, expressible as a poset) as the answer
 * to a stated problem rather than an assertion out of nowhere, and sets up Making Process Explicit's
 * claim (coupling to product, step-level data) as the mechanism that turns the cloud into something
 * usable.
 *
 * Deliberately makes no claim about why the cloud persists (incentive, technology, or otherwise) -
 * it only names the parties and the current state. See feedback_deck_argument_construction memory:
 * keep this to observation, not a "why now" or necessity argument.
 */
