import { Plug } from 'lucide-react';
import { SlideLayout } from '@/components/slides/SlideLayout';

type Align = 'center-top' | 'center-bottom' | 'left' | 'right';

const entities: {
  lines: string[];
  angle: number;
  distScale?: number;
  distinguished?: boolean;
  tag: string;
  align: Align;
}[] = [
  { lines: ['Toolmaker'], angle: -90, distScale: 1.35, align: 'center-top', tag: 'sees how tools perform, in use' },
  { lines: ['Materials', 'Supplier'], angle: -30, align: 'right', tag: 'sees how materials perform downstream' },
  { lines: ['Educator'], angle: 30, align: 'right', tag: 'sees which training produces capability' },
  { lines: ['The Company'], angle: 90, distScale: 1.35, distinguished: true, align: 'center-bottom', tag: 'sees the true performance of everything it depends on' },
  { lines: ['Legislator'], angle: 150, align: 'left', tag: 'sees where intervention actually helps' },
  { lines: ['Insurer'], angle: 210, align: 'left', tag: 'prices on real risk, not proxies' },
];

const center = { x: 340, y: 190 };
const rx = 230;
const ry = 80;
const nodeR = 18;
const shapeHalf = 58;

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function nodePos(angle: number, distScale = 1) {
  return {
    x: center.x + rx * distScale * Math.cos(toRad(angle)),
    y: center.y + ry * distScale * Math.sin(toRad(angle)),
  };
}

export function ResolutionSlide() {
  return (
    <SlideLayout
      title="The Cloud, Resolved"
      subtitle="Same ring, same parties. But the process is no longer a haze: it's a structure they can see, and plug into."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox="0 0 680 400" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%' }}>
          {/* Solid, resolved connections: entity -> structured process */}
          {entities.map(({ angle, distScale }, i) => {
            const { x: nx, y: ny } = nodePos(angle, distScale);
            const vx = center.x - nx, vy = center.y - ny;
            const dist = Math.sqrt(vx * vx + vy * vy);
            const ux = vx / dist, uy = vy / dist;
            const x1 = nx + ux * nodeR, y1 = ny + uy * nodeR;
            const targetR = shapeHalf + 14;
            const x2 = center.x - ux * targetR, y2 = center.y - uy * targetR;
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="var(--slide-primary)" strokeWidth="1.5" opacity="0.45" />
            );
          })}

          {/* Plugs, where each connection meets the process */}
          {entities.map(({ angle, distScale }, i) => {
            const { x: nx, y: ny } = nodePos(angle, distScale);
            const vx = center.x - nx, vy = center.y - ny;
            const dist = Math.sqrt(vx * vx + vy * vy);
            const ux = vx / dist, uy = vy / dist;
            const plugR = shapeHalf + 6;
            const px = center.x - ux * plugR, py = center.y - uy * plugR;
            const rotate = (angle + 90);
            return (
              <foreignObject key={i} x={px - 10} y={py - 10} width="20" height="20">
                {/* @ts-ignore */}
                <div xmlns="http://www.w3.org/1999/xhtml" style={{
                  width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transform: `rotate(${rotate}deg)`,
                }}>
                  <Plug size={15} color="var(--slide-accent)" strokeWidth={2} />
                </div>
              </foreignObject>
            );
          })}

          {/* The structured process: simple, crisp, no longer a haze */}
          <rect x={center.x - shapeHalf} y={center.y - shapeHalf} width={shapeHalf * 2} height={shapeHalf * 2} rx="12"
            fill="var(--slide-bg-accent-muted)" stroke="var(--slide-accent)" strokeWidth="2" />
          {[-1, 0, 1].filter(v => v !== 0).map(v => (
            <line key={`v${v}`} x1={center.x + v * (shapeHalf * 2 / 3)} y1={center.y - shapeHalf + 6}
              x2={center.x + v * (shapeHalf * 2 / 3)} y2={center.y + shapeHalf - 6}
              stroke="var(--slide-accent)" strokeWidth="1" opacity="0.25" />
          ))}
          {[-1, 0, 1].filter(v => v !== 0).map(v => (
            <line key={`h${v}`} x1={center.x - shapeHalf + 6} y1={center.y + v * (shapeHalf * 2 / 3)}
              x2={center.x + shapeHalf - 6} y2={center.y + v * (shapeHalf * 2 / 3)}
              stroke="var(--slide-accent)" strokeWidth="1" opacity="0.25" />
          ))}

          <text x={center.x} y={center.y + 4} textAnchor="middle" fontSize="13.5" fontWeight="700" fill="var(--slide-accent)">Process</text>

          <text x={center.x} y={center.y + shapeHalf + 20} textAnchor="middle" fontSize="8.5" fontStyle="italic" fill="var(--slide-text)" opacity="0.5">
            structured, shared
          </text>

          {/* Ecosystem entities, ringed around the resolved process */}
          {entities.map(({ lines, angle, distScale, distinguished, tag, align }, i) => {
            const { x: nx, y: ny } = nodePos(angle, distScale);

            let noteBox: { x: number; y: number; w: number; h: number; textAlign: string };
            if (align === 'center-top') {
              noteBox = { x: nx - 90, y: 10, w: 180, h: nodeR + 26, textAlign: 'center' };
            } else if (align === 'center-bottom') {
              noteBox = { x: nx - 100, y: ny + nodeR + 6, w: 200, h: 34, textAlign: 'center' };
            } else if (align === 'right') {
              noteBox = { x: nx + nodeR + 8, y: ny - 16, w: 120, h: 34, textAlign: 'left' };
            } else {
              noteBox = { x: nx - nodeR - 8 - 120, y: ny - 16, w: 120, h: 34, textAlign: 'right' };
            }

            return (
              <g key={i}>
                <circle cx={nx} cy={ny} r={nodeR}
                  fill={distinguished ? 'var(--slide-bg-accent-muted)' : 'var(--slide-bg-card)'}
                  stroke={distinguished ? 'var(--slide-accent)' : 'var(--slide-border-primary)'}
                  strokeWidth="1.5" />
                {lines.map((line, li) => (
                  <text key={li} x={nx} y={ny + (li - (lines.length - 1) / 2) * 10 + 3} textAnchor="middle"
                    fontSize="8.5" fontWeight={distinguished ? 700 : 600}
                    fill={distinguished ? 'var(--slide-accent)' : 'var(--slide-primary)'}>
                    {line}
                  </text>
                ))}

                <foreignObject x={noteBox.x} y={noteBox.y} width={noteBox.w} height={noteBox.h}>
                  {/* @ts-ignore */}
                  <div
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: align === 'center-top' ? 'flex-end' : 'flex-start',
                      justifyContent: 'center',
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: '7.5px',
                        fontWeight: 600,
                        lineHeight: 1.35,
                        textAlign: noteBox.textAlign as 'left' | 'right' | 'center',
                        color: 'var(--slide-primary)',
                        opacity: 0.8,
                      }}
                    >
                      {tag}
                    </p>
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>

      <p className="text-sm leading-relaxed text-center mt-1" style={{ color: 'var(--slide-accent)' }}>
        Same ring. Same parties. But now there's something to plug into, and everyone can see everyone else's contribution.
      </p>
    </SlideLayout>
  );
}
