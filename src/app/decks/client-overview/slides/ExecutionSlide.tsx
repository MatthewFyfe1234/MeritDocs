import { Layers } from 'lucide-react';

export function ExecutionSlide() {
  const cardW = 175;
  const cardH = 50;

  const layers = [
    { x: 191, y: 89,  opacity: 0.38 },
    { x: 179, y: 101, opacity: 0.55 },
    { x: 167, y: 113, opacity: 0.75 },
    { x: 155, y: 125, opacity: 1.0  },
  ];

  const arrowTargetX = 381;
  const arrowTargetY = 150;

  const datasetX = 395;
  const datasetY = 105;
  const datasetW = 175;
  const datasetH = 90;

  return (
    <div className="w-full h-full p-8 flex flex-col">

      {/* Header */}
      <div className="mb-5 shrink-0">
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--slide-primary)' }}>
          One Dataset
        </h2>
        <div className="w-20 h-1 mb-2" style={{ backgroundColor: 'var(--slide-accent)' }} />
        <p className="text-sm" style={{ color: 'var(--slide-text)', opacity: 0.7 }}>
          Every project contributes to a single dataset. Every function reads from it. The organisation gets smarter with each job completed.
        </p>
      </div>

      {/* Diagram */}
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox="0 0 700 230" style={{ width: '100%', height: '100%' }}>
          <defs>
            <marker id="arrowhead-ex2" markerWidth="14" markerHeight="10" refX="0" refY="5" orient="auto" markerUnits="userSpaceOnUse">
              <polygon points="0 0, 14 5, 0 10" fill="var(--slide-primary)" opacity="0.5" />
            </marker>
          </defs>

          {/* ── FEEDBACK: Support Functions → Delivery Functions (dashed top line) ── */}
          <line x1="570" y1="35" x2="144" y2="35"
            stroke="var(--slide-primary)" strokeWidth="1.5" opacity="0.35"
            strokeDasharray="5,3"
            markerEnd="url(#arrowhead-ex2)" />
          <text x="357" y="26" textAnchor="middle" fontSize="8"
            fill="var(--slide-text)" opacity="0.4">informs changes to</text>

          {/* ── DELIVERY FUNCTIONS BOX ── */}
          <rect x="20" y="15" width="110" height="40" rx="6"
            fill="var(--slide-bg-card)" stroke="var(--slide-primary)" strokeWidth="2" />
          <text x="75" y="32" textAnchor="middle" fontSize="9.5" fontWeight="600"
            fill="var(--slide-primary)">Delivery</text>
          <text x="75" y="46" textAnchor="middle" fontSize="9.5" fontWeight="600"
            fill="var(--slide-primary)">Functions</text>

          {/* Arrow: Delivery Functions → execution stack */}
          <path d="M75,55 V142 A8,8,0,0,0,83,150 H141"
            stroke="var(--slide-primary)" strokeWidth="1.5" fill="none" opacity="0.4"
            markerEnd="url(#arrowhead-ex2)" />

          {/* Implied depth */}
          <text x="260" y="80" textAnchor="middle" fontSize="14"
            fill="var(--slide-border-primary)" opacity="0.5" letterSpacing="4">· · ·</text>

          {/* ── STACKED EXECUTION LAYERS ── */}
          {layers.map(({ x, y, opacity }) => (
            <g key={`${x}-${y}`} opacity={opacity}>
              <rect x={x} y={y + cardH} width={cardW} height={5} rx={2}
                fill="var(--slide-border-primary)" />
              <rect x={x} y={y} width={cardW} height={cardH} rx="6"
                fill="var(--slide-bg-primary-muted)"
                stroke="var(--slide-border-primary)"
                strokeWidth="1.5" />
              <text x={x + cardW / 2} y={y + cardH / 2 + 4} textAnchor="middle"
                fontSize="10" fontWeight="500" fill="var(--slide-primary)">Execution</text>
            </g>
          ))}

          {/* ── CONVERGING ARROWS: stack → dataset ── */}
          {layers.map(({ x, y }, i) => {
            const isFront = i === layers.length - 1;
            return (
              <line key={`a-${x}`}
                x1={x + cardW} y1={y + cardH / 2}
                x2={arrowTargetX} y2={arrowTargetY}
                stroke="var(--slide-primary)" strokeWidth="1.2"
                opacity={isFront ? 0.4 : 0.2}
                markerEnd={isFront ? "url(#arrowhead-ex2)" : undefined} />
            );
          })}

          {/* ── DATASET BOX ── */}
          <rect x={datasetX} y={datasetY} width={datasetW} height={datasetH} rx="8"
            fill="var(--slide-bg-accent-muted)" stroke="var(--slide-accent)" strokeWidth="2" />
          <foreignObject x={datasetX + 30} y={datasetY + datasetH / 2 - 10} width="20" height="20">
            <div style={{
              width: '100%', height: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--slide-accent)',
            }}>
              <Layers size={16} strokeWidth={1.5} />
            </div>
          </foreignObject>
          <text x={datasetX + 56} y={datasetY + 28} textAnchor="start" fontSize="13" fontWeight="700"
            fill="var(--slide-accent)">Aggregated</text>
          <text x={datasetX + 56} y={datasetY + 44} textAnchor="start" fontSize="13" fontWeight="700"
            fill="var(--slide-accent)">Dataset</text>
          <text x={datasetX + 56} y={datasetY + 61} textAnchor="start" fontSize="8.5"
            fill="var(--slide-text)" opacity="0.6">One shared picture</text>
          <text x={datasetX + 56} y={datasetY + 73} textAnchor="start" fontSize="8.5"
            fill="var(--slide-text)" opacity="0.6">of the operation</text>

          {/* Arrow: Dataset → Support Functions */}
          <path d="M570,150 H617 A8,8,0,0,0,625,142 V69"
            stroke="var(--slide-primary)" strokeWidth="1.5" fill="none" opacity="0.4"
            markerEnd="url(#arrowhead-ex2)" />

          {/* ── SUPPORT FUNCTIONS BOX ── */}
          <rect x="570" y="15" width="110" height="40" rx="6"
            fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)" strokeWidth="1.5" />
          <text x="625" y="32" textAnchor="middle" fontSize="9.5" fontWeight="600"
            fill="var(--slide-primary)">Support</text>
          <text x="625" y="46" textAnchor="middle" fontSize="9.5" fontWeight="600"
            fill="var(--slide-primary)">Functions</text>

        </svg>
      </div>
    </div>
  );
}
