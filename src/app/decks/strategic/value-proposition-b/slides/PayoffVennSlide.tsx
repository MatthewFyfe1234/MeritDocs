import { SlideLayout } from '@/components/slides/SlideLayout';

const center = { x: 400, y: 280 };
const centerR = 80;

const groups: {
  label: string;
  bracket?: string;
  benefit: string;
  cx: number;
  cy: number;
  r: number;
  textWidth: number;
  scoped?: boolean;
}[] = [
  {
    label: 'Organisation',
    bracket: 'Operations, HR, Finance, Stock / Inventory, Employer, Small Organisation',
    benefit: 'Automated estimation, orchestration, and optimisation (via product-twin / process-twin coupling, intentionally not detailed here).',
    cx: 268, cy: 150, r: 130, textWidth: 200,
    scoped: true,
  },
  {
    label: 'Employee',
    benefit: 'A measured, portable track record that demonstrates their value clearly.',
    cx: 532, cy: 150, r: 130, textWidth: 190,
  },
  {
    label: 'Generic Input Provider',
    bracket: 'Insurer, Toolmaker, Material Manufacturer, Educator, Regulator',
    benefit: 'Optimisation of their inputs, based on visibility of the field.',
    cx: 268, cy: 415, r: 130, textWidth: 200,
  },
  {
    label: 'Client / Consumer',
    benefit: 'The ability to make informed decisions, aligned with their own values.',
    cx: 532, cy: 415, r: 130, textWidth: 190,
  },
];

export function PayoffVennSlide() {
  return (
    <SlideLayout
      title="The Beneficiaries"
      subtitle="An explicit process commons: every party overlaps on the same shared process, and each takes a different benefit from it."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox="0 0 800 555" style={{ width: '100%', height: '100%' }}>
          {groups.map(({ label, cx, cy }) => (
            <line
              key={`line-${label}`}
              x1={center.x} y1={center.y} x2={cx} y2={cy}
              stroke="var(--slide-text)" strokeWidth="1" strokeDasharray="3,4" opacity="0.2"
            />
          ))}

          {groups.map(({ label, bracket, benefit, cx, cy, r, textWidth, scoped }) => (
            <g key={label}>
              <circle
                cx={cx} cy={cy} r={r} fill="var(--slide-bg-card)"
                stroke={scoped ? 'var(--slide-text)' : 'var(--slide-border)'}
                strokeWidth={scoped ? '2.4' : '1.4'}
                strokeDasharray={scoped ? '10 6' : undefined}
                opacity="0.9"
              />
              <foreignObject x={cx - textWidth / 2} y={cy - 75} width={textWidth} height={150}>
                <div
                  // @ts-ignore
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', gap: '5px' }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--slide-accent)' }}>{label}</span>
                  {bracket && (
                    <span style={{ fontSize: '8px', fontStyle: 'italic', color: 'var(--slide-text)', opacity: 0.55, lineHeight: 1.4 }}>
                      ({bracket})
                    </span>
                  )}
                  <span style={{ fontSize: '11px', lineHeight: 1.4, color: 'var(--slide-text)', opacity: 0.85 }}>{benefit}</span>
                </div>
              </foreignObject>
            </g>
          ))}

          <foreignObject x={0} y={40} width={128} height={240}>
            <div
              // @ts-ignore
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                fontSize: '10.5px', lineHeight: 1.5, fontStyle: 'italic', color: 'var(--slide-text)', opacity: 0.75,
                backgroundColor: 'var(--slide-bg-muted)', borderRadius: '8px', padding: '10px',
                display: 'flex', flexDirection: 'column', gap: '10px',
              }}
            >
              <span>
                Benefits to the organisation can be realised alone. Greater ones follow from the wider
                commons: transparency and the data network effect.
              </span>
              <span>
                This is what drives adoption: value first, not a climate pitch. The environmental and
                ethical gains follow as a consequence.
              </span>
            </div>
          </foreignObject>

          <circle cx={center.x} cy={center.y} r={centerR} fill="var(--slide-bg-accent-muted)" stroke="var(--slide-accent)" strokeWidth="1.8" />
          <text x={center.x} y={center.y - 2} textAnchor="middle" fontSize="13" fontWeight="700" fontStyle="italic" fill="var(--slide-accent)">
            Process
          </text>
          <text x={center.x} y={center.y + 14} textAnchor="middle" fontSize="8" fontStyle="italic" fill="var(--slide-accent)" opacity="0.7">
            shared, measured
          </text>
        </svg>
      </div>
    </SlideLayout>
  );
}
