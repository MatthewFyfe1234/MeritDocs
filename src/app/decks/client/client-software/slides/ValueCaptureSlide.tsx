import { SlideLayout } from '@/components/slides/SlideLayout';

export function ValueCaptureSlide() {
  const vW = 660; const vH = 268;

  const barW = 95;
  const barH = 249;
  const barTop = 8;
  const barLeft = 165;

  const segments = [
    { key: 'coord',     label: 'Coordination',       pctLabel: '~10%', pct: 0.10 },
    { key: 'insurance', label: 'Insurance',           pctLabel: '~8%',  pct: 0.08 },
    { key: 'rework',    label: 'Rework & waste',      pctLabel: '~10%', pct: 0.10 },
    { key: 'materials', label: 'Materials',           pctLabel: '~25%', pct: 0.25 },
    { key: 'labour',    label: 'Labour',              pctLabel: '~37%', pct: 0.37 },
    { key: 'software',  label: 'Software & design',   pctLabel: '~10%', pct: 0.10 },
  ];

  let cy = barTop;
  const segs = segments.map(s => {
    const h = s.pct * barH;
    const y = cy;
    cy += h;
    return { ...s, y, h, midY: y + h / 2 };
  });

  const softSeg = segs.find(s => s.key === 'software')!;
  const influenced = new Set(['coord', 'insurance', 'rework', 'materials', 'labour']);

  type Annotation =
    | { key: string; text: string; kind: 'normal' }
    | { key: string; text: string; kind: 'muted' }
    | { key: string; kind: 'you-are-here' };

  const annotations: Annotation[] = [
    { key: 'coord',     text: 'Connect specification to execution - eliminate handoff waste',          kind: 'normal'       },
    { key: 'insurance', text: 'Issue a tamper-proof compliance record per design executed',            kind: 'normal'       },
    { key: 'rework',    text: 'Return execution data - surface deviations before they become failures', kind: 'normal'       },
    { key: 'materials', text: 'Flag waste and oversupply at source - specification drives procurement',  kind: 'normal'       },
    { key: 'labour',    text: 'Guide every worker through your specification - fewer deviations',       kind: 'normal'       },
    { key: 'software',                                                                                  kind: 'you-are-here' },
  ];

  const annX = barLeft + barW + 22;
  const arrowTipX = barLeft + barW;
  const arrowBaseX = arrowTipX + 9;

  return (
    <SlideLayout
      title="From the Specification to the Whole Job"
      subtitle="Your software represents a fraction of the cost of every job it specifies. Entry to process and verification changes the value proposition entirely."
    >
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-3">
        <svg viewBox={`0 0 ${vW} ${vH}`} style={{ width: '100%', height: '100%' }}>

          {segs.map(({ key, y, h, midY, pctLabel }) => {
            const isSoft = key === 'software';
            return (
              <g key={key}>
                <rect x={barLeft} y={y} width={barW} height={h}
                  fill={isSoft ? 'var(--slide-bg-accent-muted)' : 'var(--slide-bg-primary-muted)'}
                  fillOpacity={isSoft ? 1 : 0.65}
                  stroke="var(--slide-bg)" strokeWidth="1" />
                <text x={barLeft + barW / 2} y={midY + 3.5}
                  textAnchor="middle"
                  fontSize={h < 20 ? '5.5' : '7'}
                  fontWeight="600"
                  fill={isSoft ? 'var(--slide-accent)' : 'var(--slide-text)'}
                  opacity={isSoft ? 0.85 : 0.45}>
                  {pctLabel}
                </text>
              </g>
            );
          })}

          <rect x={barLeft} y={barTop} width={barW} height={barH}
            fill="none" stroke="var(--slide-border-primary)" strokeWidth="1" rx="2" />

          <rect x={barLeft} y={softSeg.y} width={barW} height={softSeg.h}
            fill="none" stroke="var(--slide-accent)" strokeWidth="1.5" />

          {segs.map(({ key, y, h }) => {
            const isSoft = key === 'software';
            if (!influenced.has(key) && !isSoft) return null;
            return (
              <rect key={`strip-${key}`}
                x={barLeft - 5} y={y} width={5} height={h}
                fill={isSoft ? 'var(--slide-accent)' : 'var(--slide-primary)'}
                opacity="0.55" rx="1" />
            );
          })}

          {segs.map(({ key, label, midY }) => (
            <text key={`lbl-${key}`}
              x={barLeft - 12} y={midY + 3.5}
              textAnchor="end" fontSize="7.5"
              fill="var(--slide-text)"
              opacity="0.55">
              {label}
            </text>
          ))}

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
                <g key="ann-software">
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
          Indicative, based on sector data across construction, fabrication, and engineering operations [6][7][8].
        </p>
      </div>
    </SlideLayout>
  );
}
