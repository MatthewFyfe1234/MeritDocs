import { SlideLayout } from '@/components/slides/SlideLayout';

type Align = 'center-top' | 'center-bottom' | 'left' | 'right';

const entities: {
  lines: string[];
  angle: number;
  primary?: boolean;
  reason: string;
  align: Align;
}[] = [
  {
    lines: ['Toolmaker'],
    angle: -90,
    align: 'center-top',
    reason: 'Improves on guesswork, blind to how their tools perform in real use.',
  },
  {
    lines: ['Materials', 'Supplier'],
    angle: -30,
    align: 'right',
    reason: 'Blind to how materials behave downstream, or which perform best in practice.',
  },
  {
    lines: ['Educator'],
    angle: 30,
    align: 'right',
    reason: "Can't see whether their training produces capable practitioners in the field.",
  },
  {
    lines: ['The Company'],
    angle: 90,
    primary: true,
    align: 'center-bottom',
    reason: 'Sees only outcomes after the fact, blind to the true performance of its suppliers, tools, people and process.',
  },
  {
    lines: ['Legislator'],
    angle: 150,
    align: 'left',
    reason: "Can't pinpoint where intervention is needed, or measure whether past legislation worked.",
  },
  {
    lines: ['Insurer'],
    angle: 210,
    align: 'left',
    reason: 'Prices on proxies and averages, blind to how clients actually execute or where the real risk lies.',
  },
];

const center = { x: 340, y: 160 };
const rx = 230;
const ry = 80;

const cloudPuffs = [
  { dx: -34, dy: -10, r: 56 },
  { dx: 29, dy: -19, r: 62 },
  { dx: 0, dy: 18, r: 69 },
  { dx: -51, dy: 16, r: 45 },
  { dx: 51, dy: 11, r: 48 },
];

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

export function ShiftInPerspectiveSlide() {
  return (
    <SlideLayout
      title="The Shift in Perspective"
      subtitle="The conglomerate problem generalises: every party in the ecosystem is arranged around the same process, whether or not any of them can see it."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox="0 0 680 330" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%' }}>
          <defs>
            <filter id="cloud-blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="13" />
            </filter>
          </defs>

          {/* The formless, shared process */}
          <g filter="url(#cloud-blur)">
            {cloudPuffs.map(({ dx, dy, r }, i) => (
              <circle key={i} cx={center.x + dx} cy={center.y + dy} r={r} fill="var(--slide-text)" opacity="0.14" />
            ))}
          </g>
          <text x={center.x} y={center.y - 2} textAnchor="middle" fontSize="17" fontWeight="700" fontStyle="italic" fill="var(--slide-text)" opacity="0.55">
            Process
          </text>
          <text x={center.x} y={center.y + 15} textAnchor="middle" fontSize="9" fontStyle="italic" fill="var(--slide-text)" opacity="0.4">
            shared, invisible
          </text>

          {/* Faint, unresolved lines reaching toward the cloud */}
          {entities.map(({ angle }, i) => {
            const nx = center.x + rx * Math.cos(toRad(angle));
            const ny = center.y + ry * Math.sin(toRad(angle));
            const t1 = 0.46, t2 = 0.85;
            const x1 = center.x + t1 * (nx - center.x);
            const y1 = center.y + t1 * (ny - center.y);
            const x2 = center.x + t2 * (nx - center.x);
            const y2 = center.y + t2 * (ny - center.y);
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="var(--slide-text)" strokeWidth="1.2" strokeDasharray="3,4" opacity="0.3" />
            );
          })}

          {/* Ecosystem entities, ringed around the cloud, each with why they're blind */}
          {entities.map(({ lines, angle, primary, reason, align }, i) => {
            const nx = center.x + rx * Math.cos(toRad(angle));
            const ny = center.y + ry * Math.sin(toRad(angle));
            const r = primary ? 25 : 18;

            let noteBox: { x: number; y: number; w: number; h: number; textAlign: string };
            if (align === 'center-top') {
              noteBox = { x: nx - 95, y: 6, w: 190, h: r + 50, textAlign: 'center' };
            } else if (align === 'center-bottom') {
              noteBox = { x: nx - 100, y: ny + r + 6, w: 200, h: 60, textAlign: 'center' };
            } else if (align === 'right') {
              noteBox = { x: nx + r + 8, y: ny - 38, w: 118, h: 76, textAlign: 'left' };
            } else {
              noteBox = { x: nx - r - 8 - 118, y: ny - 38, w: 118, h: 76, textAlign: 'right' };
            }

            return (
              <g key={i}>
                <circle cx={nx} cy={ny} r={r}
                  fill={primary ? 'var(--slide-bg-accent-muted)' : 'var(--slide-bg-card)'}
                  stroke={primary ? 'var(--slide-accent)' : 'var(--slide-border-primary)'}
                  strokeWidth={primary ? 2 : 1.5} />
                {lines.map((line, li) => (
                  <text key={li} x={nx} y={ny + (li - (lines.length - 1) / 2) * 10 + 3} textAnchor="middle"
                    fontSize={primary ? 9.5 : 8.5} fontWeight={primary ? 700 : 600}
                    fill={primary ? 'var(--slide-accent)' : 'var(--slide-primary)'}>
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
                        fontSize: '7px',
                        lineHeight: 1.4,
                        textAlign: noteBox.textAlign as 'left' | 'right' | 'center',
                        color: 'var(--slide-text)',
                        opacity: 0.65,
                      }}
                    >
                      {reason}
                    </p>
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>

      <p className="text-sm leading-relaxed text-center mt-2" style={{ color: 'var(--slide-accent)' }}>
        In the conglomerate's case, that ring is not six entities: it's thirty-plus holdings, many of them toolmakers,
        all staring into the same cloud, each blind to what the others contribute.
      </p>
    </SlideLayout>
  );
}
