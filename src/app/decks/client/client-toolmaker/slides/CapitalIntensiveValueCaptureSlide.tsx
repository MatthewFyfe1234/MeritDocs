import { SlideLayout } from '@/components/slides/SlideLayout';

export function CapitalIntensiveValueCaptureSlide() {
  const vW = 660; const vH = 268;

  const barW = 95;
  const barH = 249;
  const barTop = 8;
  const barLeft = 165;

  const segments = [
    { key: 'coord',     label: 'Coordination',         pctLabel: '~5%',  pct: 0.05 },
    { key: 'insurance', label: 'Insurance',            pctLabel: '~8%',  pct: 0.08 },
    { key: 'maint',     label: 'Maintenance',          pctLabel: '~12%', pct: 0.12 },
    { key: 'labour',    label: 'Operator labour',      pctLabel: '~15%', pct: 0.15 },
    { key: 'fuel',      label: 'Fuel / Energy',        pctLabel: '~15%', pct: 0.15 },
    { key: 'capital',   label: 'Capital / Equipment',  pctLabel: '~45%', pct: 0.45 },
  ];

  let cy = barTop;
  const segs = segments.map(s => {
    const h = s.pct * barH;
    const y = cy;
    cy += h;
    return { ...s, y, h, midY: y + h / 2 };
  });

  const capitalSeg = segs.find(s => s.key === 'capital')!;
  const influenced = new Set(['fuel', 'labour', 'maint', 'insurance', 'coord']);

  type Annotation =
    | { key: string; text: string; kind: 'normal' }
    | { key: string; text: string; kind: 'muted' }
    | { key: string; kind: 'you-are-here' };

  const annotations: Annotation[] = [
    { key: 'coord',     text: 'Enforce process execution - eliminate coordination waste',                    kind: 'normal' },
    { key: 'insurance', text: 'Issue a tamper-proof compliance record per job',                              kind: 'normal' },
    { key: 'maint',     text: 'Return failure patterns to predict and prevent - shift from reactive to planned',     kind: 'normal' },
    { key: 'labour',    text: 'Guide every operator through your specification - fewer deviations, more throughput', kind: 'normal' },
    { key: 'fuel',      text: 'Return usage profiles - surface inefficient running and reduce consumption',   kind: 'normal' },
    { key: 'capital',   kind: 'you-are-here' },
  ];

  const annX = barLeft + barW + 22;
  const arrowTipX = barLeft + barW;
  const arrowBaseX = arrowTipX + 9;

  return (
    <SlideLayout
      title="From the Machine to the Whole Job"
      subtitle="Your equipment dominates the cost of every job it runs. The process layer makes that position defensible and gives you the data to improve it."
    >
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-3">
        <svg viewBox={`0 0 ${vW} ${vH}`} style={{ width: '100%', height: '100%' }}>

          {/* Bar segments */}
          {segs.map(({ key, y, h, midY, pctLabel }) => {
            const isCapital = key === 'capital';
            return (
              <g key={key}>
                <rect x={barLeft} y={y} width={barW} height={h}
                  fill={isCapital ? 'var(--slide-bg-accent-muted)' : 'var(--slide-bg-primary-muted)'}
                  fillOpacity={isCapital ? 1 : 0.65}
                  stroke="var(--slide-bg)" strokeWidth="1" />
                <text x={barLeft + barW / 2} y={midY + 3.5}
                  textAnchor="middle"
                  fontSize={h < 20 ? '5.5' : '7'}
                  fontWeight="600"
                  fill={isCapital ? 'var(--slide-accent)' : 'var(--slide-text)'}
                  opacity={isCapital ? 0.85 : 0.45}>
                  {pctLabel}
                </text>
              </g>
            );
          })}

          {/* Bar outer border */}
          <rect x={barLeft} y={barTop} width={barW} height={barH}
            fill="none" stroke="var(--slide-border-primary)" strokeWidth="1" rx="2" />

          {/* Accent border box around capital segment */}
          <rect x={barLeft} y={capitalSeg.y} width={barW} height={capitalSeg.h}
            fill="none" stroke="var(--slide-accent)" strokeWidth="1.5" />

          {/* Left influence strips */}
          {segs.map(({ key, y, h }) => {
            const isCapital = key === 'capital';
            if (!influenced.has(key) && !isCapital) return null;
            return (
              <rect key={`strip-${key}`}
                x={barLeft - 5} y={y} width={5} height={h}
                fill={isCapital ? 'var(--slide-accent)' : 'var(--slide-primary)'}
                opacity="0.55" rx="1" />
            );
          })}

          {/* Segment labels — left */}
          {segs.map(({ key, label, midY }) => (
            <text key={`lbl-${key}`}
              x={barLeft - 12} y={midY + 3.5}
              textAnchor="end" fontSize="7.5"
              fill="var(--slide-text)"
              opacity={0.55}>
              {label}
            </text>
          ))}

          {/* Right annotations */}
          {annotations.map(ann => {
            const seg = segs.find(s => s.key === ann.key)!;

            if (ann.kind === 'you-are-here') {
              return (
                <g key="ann-capital">
                  <polygon
                    points={`${arrowTipX},${seg.midY} ${arrowBaseX},${seg.midY - 4} ${arrowBaseX},${seg.midY + 4}`}
                    fill="var(--slide-accent)" opacity="0.7" />
                  <line x1={arrowBaseX} y1={seg.midY} x2={annX - 4} y2={seg.midY}
                    stroke="var(--slide-accent)" strokeWidth="1" opacity="0.6" />
                  <text x={annX} y={seg.midY + 3.5}
                    fontSize="9" fontWeight="700" fill="var(--slide-accent)">
                    You are here
                  </text>
                </g>
              );
            }

            return (
              <g key={`ann-${ann.key}`}>
                <line x1={barLeft + barW + 5} y1={seg.midY}
                  x2={annX - 5} y2={seg.midY}
                  stroke="var(--slide-border-primary)" strokeWidth="0.8" opacity="0.45" />
                <circle cx={barLeft + barW + 5} cy={seg.midY} r="1.5"
                  fill="var(--slide-primary)" opacity="0.4" />
                <text x={annX} y={seg.midY + 3.5}
                  fontSize="7.5" fill="var(--slide-text)" opacity="0.65">
                  {ann.text}
                </text>
              </g>
            );
          })}

        </svg>
        <p className="text-center text-xs" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>
          Merit enables you to operate across every component on the stack.
        </p>
        <p className="text-center" style={{ fontSize: '0.6rem', color: 'var(--slide-text)', opacity: 0.25 }}>
          Indicative, based on sector data across agricultural, forestry, and capital-intensive equipment operations.
        </p>
      </div>
    </SlideLayout>
  );
}
