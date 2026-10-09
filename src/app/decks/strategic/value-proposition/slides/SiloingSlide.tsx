import { SlideLayout } from '@/components/slides/SlideLayout';

type Align = 'center-top' | 'center-bottom' | 'left' | 'right';

const functions: {
  lines: string[];
  angle: number;
  primary?: boolean;
  tag: string;
  align: Align;
}[] = [
  { lines: ['Operations'], angle: -90, align: 'center-top', tag: 'reacts to fires, not patterns' },
  { lines: ['HR /', 'People'], angle: -30, align: 'right', tag: 'hires and reviews on reputation' },
  { lines: ['Finance'], angle: 30, align: 'right', tag: 'reads invoices, not reality' },
  { lines: ['Execution /', 'Delivery'], angle: 90, primary: true, align: 'center-bottom', tag: 'sees only its own deliverable' },
  { lines: ['Estimating'], angle: 150, align: 'left', tag: 'quotes from memory, not data' },
  { lines: ['QA /', 'Quality'], angle: 210, align: 'left', tag: 'checks output, not the process' },
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

export function SiloingSlide() {
  return (
    <SlideLayout
      title="The Same Problem, Inside One Organisation"
      subtitle="The same shape, one scale down: internal functions arranged around the same invisible process."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox="0 0 680 330" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%' }}>
          <defs>
            <filter id="silo-cloud-blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="13" />
            </filter>
          </defs>

          {/* The formless, shared process - unmetered */}
          <g filter="url(#silo-cloud-blur)">
            {cloudPuffs.map(({ dx, dy, r }, i) => (
              <circle key={i} cx={center.x + dx} cy={center.y + dy} r={r} fill="var(--slide-text)" opacity="0.14" />
            ))}
          </g>
          <text x={center.x} y={center.y - 2} textAnchor="middle" fontSize="17" fontWeight="700" fontStyle="italic" fill="var(--slide-text)" opacity="0.55">
            Process
          </text>
          <text x={center.x} y={center.y + 15} textAnchor="middle" fontSize="9" fontStyle="italic" fill="var(--slide-text)" opacity="0.4">
            unmetered
          </text>

          {/* Faint, unresolved lines reaching toward the cloud */}
          {functions.map(({ angle }, i) => {
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

          {/* Internal functions, ringed around the cloud, each with why they're blind */}
          {functions.map(({ lines, angle, primary, tag, align }, i) => {
            const nx = center.x + rx * Math.cos(toRad(angle));
            const ny = center.y + ry * Math.sin(toRad(angle));
            const r = primary ? 25 : 18;

            let noteBox: { x: number; y: number; w: number; h: number; textAlign: string };
            if (align === 'center-top') {
              noteBox = { x: nx - 80, y: 30, w: 160, h: r + 26, textAlign: 'center' };
            } else if (align === 'center-bottom') {
              noteBox = { x: nx - 90, y: ny + r + 6, w: 180, h: 34, textAlign: 'center' };
            } else if (align === 'right') {
              noteBox = { x: nx + r + 8, y: ny - 16, w: 110, h: 34, textAlign: 'left' };
            } else {
              noteBox = { x: nx - r - 8 - 110, y: ny - 16, w: 110, h: 34, textAlign: 'right' };
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
                        fontSize: '7.5px',
                        fontStyle: 'italic',
                        lineHeight: 1.35,
                        textAlign: noteBox.textAlign as 'left' | 'right' | 'center',
                        color: 'var(--slide-text)',
                        opacity: 0.6,
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

      <p className="text-xs leading-relaxed text-center" style={{ color: 'var(--slide-text)', opacity: 0.75 }}>
        Inside a single organisation, the execution team, operations, HR, finance, each look into the <strong>same</strong> cloud,
        each seeing only their own corner.
      </p>

      <p className="text-sm font-bold leading-relaxed text-center mt-2" style={{ color: 'var(--slide-text)', opacity: 0.9 }}>
        With no metered process to work from, coordination runs on hearsay, vibes and prejudice: decisions made on
        impressions, because there's nothing measured to make them on.
      </p>

      <p className="text-sm leading-relaxed text-center mt-2" style={{ color: 'var(--slide-accent)' }}>
        We can't resolve the whole ecosystem from zero. But this, the same problem, at the scale of one
        organisation, is where we can start.
      </p>
    </SlideLayout>
  );
}
