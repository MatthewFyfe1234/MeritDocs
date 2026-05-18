import { SlideLayout } from '@/components/slides/SlideLayout';

export function ForecastsSlide() {
  const steps = [
    { label: 'Estimation',   days: 1.5, executions: 62 },
    { label: 'Design',       days: 3.5, executions: 58 },
    { label: 'Fabrication',  days: 8,   executions: 61 },
    { label: 'Installation', days: 4,   executions: 55 },
    { label: 'Quality',      days: 1,   executions: 63 },
  ];

  const total = steps.reduce((sum, s) => sum + s.days, 0);

  const stepW    = 100;
  const stepH    = 50;
  const stepGap  = 25;
  const startX   = 30;
  const stepY    = 14;
  const badgeY   = 112;
  const badgeH   = 66;
  const barY     = 222;
  const barH     = 18;
  const barLeft  = startX;
  const barWidth = steps.length * stepW + (steps.length - 1) * stepGap;

  const stepCx = (i: number) => startX + i * (stepW + stepGap) + stepW / 2;

  let segX = barLeft;
  const segments = steps.map((s) => {
    const w = (s.days / total) * barWidth;
    const x = segX;
    segX += w;
    return { ...s, x, w };
  });

  const segOpacity = [0.45, 0.5, 0.65, 0.5, 0.4];

  return (
    <SlideLayout
      title="Delivery Forecasts"
      subtitle="Past execution records for each step roll up into an end-to-end delivery forecast."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox="0 0 660 268" style={{ width: '100%', height: '100%' }}>
          <defs>
            <marker id="arrowhead-pr" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto" markerUnits="userSpaceOnUse">
              <polygon points="0 0, 8 3, 0 6" fill="var(--slide-primary)" opacity="0.5" />
            </marker>
          </defs>

          {/* ── STEP BOXES ── */}
          {steps.map((step, i) => {
            const x = startX + i * (stepW + stepGap);
            const cx = stepCx(i);
            const isLast = i === steps.length - 1;
            return (
              <g key={step.label}>
                <rect x={x} y={stepY} width={stepW} height={stepH} rx="6"
                  fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)" strokeWidth="1.5" />
                <text x={cx} y={stepY + stepH / 2 + 4} textAnchor="middle" fontSize="9.5" fontWeight="600"
                  fill="var(--slide-primary)">{step.label}</text>
                {!isLast && (
                  <line
                    x1={x + stepW + 2} y1={stepY + stepH / 2}
                    x2={x + stepW + stepGap - 12} y2={stepY + stepH / 2}
                    stroke="var(--slide-primary)" strokeWidth="1.3" opacity="0.4"
                    markerEnd="url(#arrowhead-pr)" />
                )}
                <line x1={cx} y1={stepY + stepH} x2={cx} y2={badgeY - 2}
                  stroke="var(--slide-primary)" strokeWidth="1" opacity="0.25"
                  strokeDasharray="3,3" />
                <rect x={cx - 47} y={badgeY} width="94" height={badgeH} rx="6"
                  fill="var(--slide-bg-card)" stroke="var(--slide-border-primary)" strokeWidth="1.2" />
                <text x={cx} y={badgeY + 28} textAnchor="middle" fontSize="14" fontWeight="700"
                  fill="var(--slide-primary)">
                  ~{step.days % 1 === 0 ? step.days : step.days.toFixed(1)} days
                </text>
                <text x={cx} y={badgeY + 46} textAnchor="middle" fontSize="7.5"
                  fill="var(--slide-text)" opacity="0.45">based on {step.executions} executions</text>
              </g>
            );
          })}

          {/* ── TOTAL BAR ── */}
          <text x={barLeft} y={barY - 8} fontSize="8" fontWeight="600"
            fill="var(--slide-text)" opacity="0.4">END-TO-END DELIVERY</text>
          <rect x={barLeft} y={barY} width={barWidth} height={barH} rx="4"
            fill="var(--slide-bg-muted)" />
          {segments.map((seg, i) => (
            <rect key={seg.label}
              x={seg.x} y={barY} width={Math.max(seg.w - 1, 1)} height={barH}
              rx={i === 0 ? '4 0 0 4' : i === segments.length - 1 ? '0 4 4 0' : '0'}
              fill="var(--slide-primary)" opacity={segOpacity[i]} />
          ))}
          {segments.slice(1).map((seg) => (
            <line key={`div-${seg.label}`}
              x1={seg.x} y1={barY} x2={seg.x} y2={barY + barH}
              stroke="var(--slide-bg-card)" strokeWidth="1.5" opacity="0.6" />
          ))}
          <text x={barLeft + barWidth / 2} y={barY + barH + 22} textAnchor="middle"
            fontSize="16" fontWeight="700" fill="var(--slide-accent)">~{total} days</text>
        </svg>
      </div>
    </SlideLayout>
  );
}
