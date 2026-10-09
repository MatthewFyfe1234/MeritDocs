import { SlideLayout } from '@/components/slides/SlideLayout';

const sources = [
  {
    label: 'Users, Employees & Associates',
    example: 'Recorded against the individual user, inherited from a group, or from the organisation itself.',
  },
  {
    label: 'Inventory',
    example: 'Inherited from a type of inventory item, or set explicitly for an inventory item.',
  },
  {
    label: 'Specs & Clients',
    example: 'Set during creation of the spec.',
    exception: true,
  },
  {
    label: 'Scheduling',
    example: 'Set automatically or manually on coordination of a project.',
  },
  {
    label: 'Execution Metrics',
    example: 'Gathered telemetrically, recorded manually, or assumed from existing forecasts. Every document or component is gated to a step, with hold-ups attributed automatically.',
  },
];

const boxH = 58;
const gap = 12;
const startY = 10;
const centers = sources.map((_, i) => startY + boxH / 2 + i * (boxH + gap));
const targetY = centers[2];
const boxX = 30;

export function OversightSlide() {
  return (
    <SlideLayout
      title="Everything Converges in One Place"
      subtitle="Everything the systems you run today would give you, plus what none of them can: convergence on one process model."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox="0 0 740 360" style={{ width: '100%', height: '100%' }}>
          <defs>
            <marker id="arrowhead-oversight" markerWidth="12" markerHeight="9" refX="0" refY="4.5" orient="auto" markerUnits="userSpaceOnUse">
              <polygon points="0 0, 12 4.5, 0 9" fill="var(--slide-primary)" opacity="0.5" />
            </marker>
            <marker id="arrowhead-cadence" markerWidth="10" markerHeight="8" refX="0" refY="4" orient="auto" markerUnits="userSpaceOnUse">
              <polygon points="0 0, 10 4, 0 8" fill="var(--slide-accent)" opacity="0.6" />
            </marker>
          </defs>

          {/* Cadence arrow: increasingly automated, increasingly frequent, top to bottom */}
          <line x1="18" y1={centers[0] - boxH / 2 + 40} x2="18" y2={centers[4] + boxH / 2 - 40}
            stroke="var(--slide-accent)" strokeWidth="1.6" opacity="0.5"
            markerEnd="url(#arrowhead-cadence)" />
          <foreignObject x="-308" y="-4" width="258" height="20"
            transform="rotate(-90)">
            {/* @ts-ignore */}
            <div xmlns="http://www.w3.org/1999/xhtml" style={{
              width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '9px', fontStyle: 'italic', color: 'var(--slide-accent)', opacity: 0.65, whiteSpace: 'nowrap',
            }}>
              Increasingly automated, increasingly frequent
            </div>
          </foreignObject>

          {/* Convergence lines: elbowed, each on its own lane so verticals don't overlap */}
          {sources.map((s, i) => {
            const cy = centers[i];
            const r = 14;
            const lane = [425, 395, null, 395, 425][i];
            let d: string;
            if (cy === targetY) {
              d = `M${boxX + 280},${targetY} H440`;
            } else if (cy < targetY) {
              d = `M${boxX + 280},${cy} H${lane! - r} A${r},${r} 0 0,1 ${lane},${cy + r} V${targetY - r} A${r},${r} 0 0,0 ${lane! + r},${targetY} H440`;
            } else {
              d = `M${boxX + 280},${cy} H${lane! - r} A${r},${r} 0 0,0 ${lane},${cy - r} V${targetY + r} A${r},${r} 0 0,1 ${lane! + r},${targetY} H440`;
            }
            return (
              <path key={s.label} d={d}
                stroke="var(--slide-primary)" strokeWidth="1.4" fill="none" opacity="0.35" />
            );
          })}
          <line x1="440" y1={targetY} x2="492" y2={targetY}
            stroke="var(--slide-primary)" strokeWidth="1.4" opacity="0.35"
            markerEnd="url(#arrowhead-oversight)" />

          {/* Source boxes */}
          {sources.map((s, i) => {
            const cy = centers[i];
            return (
              <g key={s.label}>
                <rect x={boxX} y={cy - boxH / 2} width="280" height={boxH} rx="7"
                  fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)" strokeWidth="1" />
                <text x={boxX + 140} y={cy - boxH / 2 + 17} textAnchor="middle" fontSize="12" fontWeight="600"
                  fill="var(--slide-primary)" opacity="0.85">{s.label}</text>
                <foreignObject x={boxX + 10} y={cy - boxH / 2 + 21} width="260" height={boxH - 25}>
                  {/* @ts-ignore */}
                  <div xmlns="http://www.w3.org/1999/xhtml" style={{
                    fontSize: '7.5px', lineHeight: 1.35, textAlign: 'center',
                    color: 'var(--slide-text)', opacity: 0.6,
                  }}>
                    {s.example}
                  </div>
                </foreignObject>
                {s.exception && (
                  <text x={boxX + 270} y={cy - boxH / 2 + 11} textAnchor="end" fontSize="6.5" fontStyle="italic"
                    fill="var(--slide-accent)" opacity="0.7">still manual, like above</text>
                )}
              </g>
            );
          })}

          {/* Process Intelligence bubble */}
          <rect x="500" y={targetY - 70} width="220" height="140" rx="14"
            fill="var(--slide-bg-accent-muted)" stroke="var(--slide-accent)" strokeWidth="2.5" />
          <text x="610" y={targetY - 10} textAnchor="middle" fontSize="17" fontWeight="700"
            fill="var(--slide-accent)">Process</text>
          <text x="610" y={targetY + 12} textAnchor="middle" fontSize="17" fontWeight="700"
            fill="var(--slide-accent)">Intelligence</text>
          <text x="610" y={targetY + 40} textAnchor="middle" fontSize="9.5"
            fill="var(--slide-text)" opacity="0.55">Full coverage of the above,</text>
          <text x="610" y={targetY + 52} textAnchor="middle" fontSize="9.5"
            fill="var(--slide-text)" opacity="0.55">anchored in one process model</text>

        </svg>
      </div>
    </SlideLayout>
  );
}
