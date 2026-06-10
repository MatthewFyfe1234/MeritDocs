import { SlideLayout } from '@/components/slides/SlideLayout';

export function ValueCaptureSlide() {
  const vW = 660; const vH = 268;

  const barW = 95;
  const barH = 249;
  const barTop = 8;
  const barLeft = 165;

  const segments = [
    { key: 'coord',     label: 'Coordination',  pctLabel: '~15%', pct: 0.15 },
    { key: 'insurance', label: 'Insurance',      pctLabel: '~8%',  pct: 0.08 },
    { key: 'downtime',  label: 'Downtime',       pctLabel: '~10%', pct: 0.10 },
    { key: 'materials', label: 'Materials',      pctLabel: '~20%', pct: 0.20 },
    { key: 'labour',    label: 'Skilled labour', pctLabel: '~32%', pct: 0.32 },
    { key: 'equipment', label: 'Tools & Equipment', pctLabel: '~15%', pct: 0.15 },
  ];

  let cy = barTop;
  const segs = segments.map(s => {
    const h = s.pct * barH;
    const y = cy;
    cy += h;
    return { ...s, y, h, midY: y + h / 2 };
  });

  const equipSeg = segs.find(s => s.key === 'equipment')!;
  const influenced = new Set(['coord', 'insurance', 'downtime', 'labour']);

  type Annotation =
    | { key: string; text: string; kind: 'normal' }
    | { key: string; text: string; kind: 'muted' }
    | { key: string; kind: 'you-are-here' };

  const annotations: Annotation[] = [
    { key: 'coord',     text: 'Enforce process execution - eliminate coordination waste',    kind: 'normal'       },
    { key: 'insurance', text: 'Issue a tamper-proof compliance record per job',              kind: 'normal'       },
    { key: 'downtime',  text: 'Return usage data to predict and prevent failures',           kind: 'normal'       },
    { key: 'materials', text: 'Direct supply cost - limited scope for direct influence',     kind: 'muted'        },
    { key: 'labour',    text: 'Guide operators through every step - more productive hours',  kind: 'normal'       },
    { key: 'equipment',                                                                       kind: 'you-are-here' },
  ];

  const annX = barLeft + barW + 22;
  const arrowTipX = barLeft + barW;
  const arrowBaseX = arrowTipX + 9;

  return (
    <SlideLayout
      title="From the Tool to the Whole Job"
      subtitle="Your tool represents a fraction of the cost of every job it runs. Entry to process and orchestration changes the value proposition entirely."
    >
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-3">
        <svg viewBox={`0 0 ${vW} ${vH}`} style={{ width: '100%', height: '100%' }}>

          {/* Bar segments */}
          {segs.map(({ key, y, h, midY, pctLabel }) => {
            const isEquip = key === 'equipment';
            const isMat = key === 'materials';
            return (
              <g key={key}>
                <rect x={barLeft} y={y} width={barW} height={h}
                  fill={isEquip ? 'var(--slide-bg-accent-muted)' : 'var(--slide-bg-primary-muted)'}
                  fillOpacity={isEquip ? 1 : isMat ? 0.35 : 0.65}
                  stroke="var(--slide-bg)" strokeWidth="1" />
                <text x={barLeft + barW / 2} y={midY + 3.5}
                  textAnchor="middle"
                  fontSize={h < 20 ? '5.5' : '7'}
                  fontWeight="600"
                  fill={isEquip ? 'var(--slide-accent)' : 'var(--slide-text)'}
                  opacity={isEquip ? 0.85 : isMat ? 0.3 : 0.45}>
                  {pctLabel}
                </text>
              </g>
            );
          })}

          {/* Bar outer border */}
          <rect x={barLeft} y={barTop} width={barW} height={barH}
            fill="none" stroke="var(--slide-border-primary)" strokeWidth="1" rx="2" />

          {/* Accent border box around equipment segment */}
          <rect x={barLeft} y={equipSeg.y} width={barW} height={equipSeg.h}
            fill="none" stroke="var(--slide-accent)" strokeWidth="1.5" />

          {/* Left influence strips */}
          {segs.map(({ key, y, h }) => {
            const isEquip = key === 'equipment';
            if (!influenced.has(key) && !isEquip) return null;
            return (
              <rect key={`strip-${key}`}
                x={barLeft - 5} y={y} width={5} height={h}
                fill={isEquip ? 'var(--slide-accent)' : 'var(--slide-primary)'}
                opacity="0.55" rx="1" />
            );
          })}

          {/* Segment labels — left */}
          {segs.map(({ key, label, midY }) => (
            <text key={`lbl-${key}`}
              x={barLeft - 12} y={midY + 3.5}
              textAnchor="end" fontSize="7.5"
              fill="var(--slide-text)"
              opacity={key === 'materials' ? 0.3 : 0.55}>
              {label}
            </text>
          ))}

          {/* Right annotations */}
          {annotations.map(ann => {
            const seg = segs.find(s => s.key === ann.key)!;

            if (ann.kind === 'muted') {
              return (
                <text key={`ann-${ann.key}`} x={annX} y={seg.midY + 3.5}
                  fontSize="7" fontStyle="italic" fill="var(--slide-text)" opacity="0.25">
                  {ann.text}
                </text>
              );
            }

            if (ann.kind === 'you-are-here') {
              return (
                <g key="ann-equipment">
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
          Indicative, based on sector data across mining, construction, and drilling operations [4][5][6][7].
        </p>
      </div>
    </SlideLayout>
  );
}
