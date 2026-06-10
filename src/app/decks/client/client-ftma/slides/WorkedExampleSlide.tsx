import { SlideLayout } from '@/components/slides/SlideLayout';

const steps = [
  {
    label: '01',
    title: 'Members record',
    body: 'Each manufacturer uses Merit to record jobs: who did what, what equipment was used, any safety events, and the final outcome.',
  },
  {
    label: '02',
    title: 'FTMA aggregates',
    body: 'After six months, FTMA pulls anonymised incident rates, safety compliance scores, and defect rates across all participating members.',
  },
  {
    label: '03',
    title: 'FTMA presents',
    body: 'FTMA delivers a verified sector risk profile to underwriters. Not estimates. Not surveys. Actual execution records.',
  },
  {
    label: '04',
    title: 'Sector benefits',
    body: 'Insurer offers a sector-wide policy at better rates. Risk is now quantified and pooled. The premium reflects it.',
  },
];

export function WorkedExampleSlide() {
  const bw = 136, bh = 110, bgap = 24;
  const totalW = steps.length * bw + (steps.length - 1) * bgap;
  const startX = (660 - totalW) / 2;
  const bY = 18;
  const arrowY = bY + bh / 2;

  return (
    <SlideLayout
      title="Worked Example: Collective Insurance"
      subtitle="The same logic applies to procurement, compliance, and talent. The infrastructure is the same. The coordinator changes what it builds on top."
    >
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="flex-1 min-h-0 flex items-start justify-center">
          <svg viewBox="0 0 660 200" style={{ width: '100%', height: '100%' }}>
            <defs>
              <marker id="arrow-example" markerWidth="10" markerHeight="7" refX="0" refY="3.5"
                orient="auto" markerUnits="userSpaceOnUse">
                <polygon points="0 0, 10 3.5, 0 7" fill="var(--slide-primary)" opacity="0.5" />
              </marker>
            </defs>

            {steps.map(({ label, title, body }, i) => {
              const x = startX + i * (bw + bgap);
              const cx = x + bw / 2;
              const nextX = x + bw + bgap;
              const arrowX2 = nextX - 6;

              return (
                <g key={label}>
                  {/* Step box */}
                  <rect x={x} y={bY} width={bw} height={bh} rx="6"
                    fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)"
                    strokeWidth="1.5" />

                  {/* Step number */}
                  <text x={cx} y={bY + 16} textAnchor="middle" fontSize="8" fontWeight="700"
                    letterSpacing="0.5" fill="var(--slide-accent)" opacity="0.6">{label}</text>

                  {/* Step title */}
                  <text x={cx} y={bY + 30} textAnchor="middle" fontSize="9" fontWeight="700"
                    fill="var(--slide-primary)">{title}</text>

                  {/* Divider */}
                  <line x1={x + 12} y1={bY + 36} x2={x + bw - 12} y2={bY + 36}
                    stroke="var(--slide-border-primary)" strokeWidth="0.75" opacity="0.4" />

                  {/* Step body text */}
                  <foreignObject x={x + 8} y={bY + 42} width={bw - 16} height={bh - 50}>
                    <div
                      // @ts-ignore
                      xmlns="http://www.w3.org/1999/xhtml"
                      style={{
                        fontSize: '7px',
                        lineHeight: 1.55,
                        color: 'var(--slide-text)',
                        opacity: 0.65,
                      }}
                    >
                      {body}
                    </div>
                  </foreignObject>

                  {/* Arrow to next step */}
                  {i < steps.length - 1 && (
                    <line x1={x + bw + 3} y1={arrowY} x2={arrowX2} y2={arrowY}
                      stroke="var(--slide-primary)" strokeWidth="1.2" opacity="0.4"
                      markerEnd="url(#arrow-example)" />
                  )}
                </g>
              );
            })}

            {/* Outcome bar */}
            <rect x={16} y={148} width={628} height={40} rx="6"
              fill="var(--slide-bg-accent-muted)" stroke="var(--slide-border)" strokeWidth="1" />
            <text x={330} y={163} textAnchor="middle" fontSize="8" fontWeight="700"
              fill="var(--slide-accent)" opacity="0.7">OUTCOME</text>
            <text x={330} y={179} textAnchor="middle" fontSize="8"
              fill="var(--slide-text)" opacity="0.65">
              The insurer sees a sector, not individual firms. Risk is quantified. The premium reflects it.
            </text>
          </svg>
        </div>
      </div>
    </SlideLayout>
  );
}
