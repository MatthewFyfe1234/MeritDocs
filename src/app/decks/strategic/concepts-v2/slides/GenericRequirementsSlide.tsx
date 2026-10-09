import { SlideLayout } from '@/components/slides/SlideLayout';

const genY = 50; const genH = 34;
const genLineY = genY + genH / 2;
const orgY = 147;
const supportY = 179; const supportH = 36;
const exeY = 223; const exeH = 36;
const orgBoxH = exeY + exeH - orgY + 14;
const exeLineY = orgY + orgBoxH / 2;
const procY = 340;

const orgX = 310; const orgW = 155;

const generic = [
  { label: 'Insurers',                x: 115, w: 64 },
  { label: 'Legislators',             x: 187, w: 64 },
  { label: 'Educators',               x: 267, w: 72 },
  { label: 'Toolmakers',              x: 347, w: 70 },
  { label: 'Material Manufacturers',  x: 425, w: 98 },
];

const deliversX = 259;

const boxX = 320; const boxW = 136;

const optimiseGenericsX = 64;
const optimiseExeX = 120;

const closedX = 12; const closedY = 28; const closedW = 539; const closedH = 346;

const clientX = 625; const clientY = 126; const clientW = 140; const clientH = 150;
const clientEntry1Y = 190;
const clientEntry2Y = exeY + exeH / 2;

const readsColor = '#2563eb';
const optimisesColor = '#b45309';

const legend = [
  { label: 'Executes (contributes data)', color: 'var(--slide-primary)' },
  { label: 'Reads data from', color: readsColor },
  { label: 'Optimises',       color: optimisesColor },
  { label: 'Delivers to',     color: 'var(--slide-text)', dashed: true },
];

const layerBrackets = [
  { label: 'Generics',  y1: genY - 14,     y2: genY + genH + 6 },
  { label: 'Delivery',  y1: 120,           y2: 290 },
  { label: 'Process',   y1: procY - 20,    y2: procY + 28 },
];

export function GenericRequirementsSlide() {
  return (
    <SlideLayout
      title="A Process-Centric Ecosystem"
      subtitle="Every party that connects to a shared process makes it more valuable to everyone else already on it: a data network effect, applied to production itself."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox="-20 0 800 420" style={{ width: '100%', height: '100%' }}>
          <defs>
            <marker id="arrowhead-gr-dashed" markerWidth="9" markerHeight="7" refX="9" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
              <polygon points="0 0, 9 3.5, 0 7" fill="var(--slide-text)" opacity="0.8" />
            </marker>
            <marker id="arrowhead-gr-primary" markerWidth="9" markerHeight="7" refX="9" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
              <polygon points="0 0, 9 3.5, 0 7" fill="var(--slide-primary)" opacity="0.8" />
            </marker>
            <marker id="arrowhead-gr-reads" markerWidth="9" markerHeight="7" refX="9" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
              <polygon points="0 0, 9 3.5, 0 7" fill={readsColor} opacity="0.85" />
            </marker>
            <marker id="arrowhead-gr-optimises" markerWidth="9" markerHeight="7" refX="9" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
              <polygon points="0 0, 9 3.5, 0 7" fill={optimisesColor} opacity="0.85" />
            </marker>
          </defs>


          <g transform="translate(-22, 0)">

          {/* closed system: everything inside interacts only with itself */}
          <rect x={closedX} y={closedY} width={closedW} height={closedH} rx="10"
            fill="none" stroke="var(--slide-border)" strokeWidth="1.3" />

          {/* delivery + process can also be fully self-contained within one company, without the wider industry */}
          <rect x={104} y={115} width={389} height={235} rx="8"
            fill="none" stroke="var(--slide-text)" strokeWidth="2.4" strokeDasharray="10 6" opacity="1" />
          <text x={114} y={129} textAnchor="start" fontSize="7.5"
            fill="var(--slide-text)" opacity="0.6">
            <tspan fontWeight="700">Organisation-Wide Process Commons: </tspan>
            <tspan fontStyle="italic">self-contained within one company</tspan>
          </text>

          {layerBrackets.map(({ label, y1, y2 }) => {
            const isProcess = label === 'Process';
            const bracketColor = isProcess ? 'var(--slide-accent)' : 'var(--slide-text)';
            return (
              <g key={label}>
                <line x1={38} y1={y1} x2={38} y2={y2} stroke={bracketColor} strokeWidth="1.2" opacity={isProcess ? 0.6 : 0.3} />
                <line x1={32} y1={y1} x2={38} y2={y1} stroke={bracketColor} strokeWidth="1.2" opacity={isProcess ? 0.6 : 0.3} />
                <line x1={32} y1={y2} x2={38} y2={y2} stroke={bracketColor} strokeWidth="1.2" opacity={isProcess ? 0.6 : 0.3} />
                <text
                  transform={`rotate(-90 30 ${(y1 + y2) / 2})`}
                  x={30} y={(y1 + y2) / 2}
                  textAnchor="middle" fontSize="9" fontWeight="700" letterSpacing="0.5"
                  fill={bracketColor} opacity={isProcess ? 0.85 : 0.45}
                >
                  {label.toUpperCase()}
                </text>
              </g>
            );
          })}

          {/* lane boundaries, trimmed to the closed-system box */}
          <line x1={closedX} y1={105} x2={closedX + closedW} y2={105}
            stroke="var(--slide-text)" strokeWidth="1" strokeDasharray="5 5" opacity="0.2" />
          <line x1={closedX} y1={305} x2={closedX + closedW} y2={305}
            stroke="var(--slide-text)" strokeWidth="1" strokeDasharray="5 5" opacity="0.2" />

          {/* the generics layer as a whole — process data flows up to this line, not to any one entry */}
          <line x1={40} y1={genLineY} x2={536} y2={genLineY}
            stroke="var(--slide-text)" strokeWidth="1.2" opacity="0.35" />

          {generic.map(({ label, x, w }) => {
            const cx = x + w / 2;
            return (
              <g key={label}>
                <rect x={x} y={genY} width={w} height={genH} rx="6"
                  fill="var(--slide-bg-card)" stroke="var(--slide-border)" strokeWidth="1.2" />
                <text x={cx} y={genY + genH / 2 + 3.5} textAnchor="middle" fontSize="8" fontWeight="600"
                  fill="var(--slide-text)" opacity="0.75">{label}</text>
              </g>
            );
          })}

          {/* generics optimises process */}
          <line x1={optimiseGenericsX} y1={genLineY} x2={optimiseGenericsX} y2={procY}
            stroke={optimisesColor} strokeWidth="1.4" opacity="0.85" markerEnd="url(#arrowhead-gr-optimises)" />

          {/* the delivery layer as a whole, matches the treatment given to generics and process */}
          <line x1={optimiseExeX - 24} y1={exeLineY} x2={536} y2={exeLineY}
            stroke="var(--slide-text)" strokeWidth="1.2" opacity="0.35" />

          {/* delivery optimises process */}
          <line x1={optimiseExeX} y1={exeLineY} x2={optimiseExeX} y2={procY}
            stroke={optimisesColor} strokeWidth="1.4" opacity="0.85" markerEnd="url(#arrowhead-gr-optimises)" />

          {/* delivery: one layer, containing the organisation and what it employs */}
          {/* trailing copies behind — there are many system clusters, not one */}
          <rect x={orgX + 12} y={orgY - 12} width={orgW} height={orgBoxH} rx="6"
            fill="var(--slide-bg-card)" stroke="var(--slide-border)" strokeWidth="1.2" opacity="0.45" />
          <rect x={orgX + 6} y={orgY - 6} width={orgW} height={orgBoxH} rx="6"
            fill="var(--slide-bg-card)" stroke="var(--slide-border)" strokeWidth="1.2" opacity="0.7" />
          <rect x={orgX} y={orgY} width={orgW} height={orgBoxH} rx="6"
            fill="var(--slide-bg-card)" stroke="var(--slide-border)" strokeWidth="1.2" />
          <text x={orgX + 16} y={orgY + 16} fontSize="9.5" fontWeight="600"
            fill="var(--slide-text)" opacity="0.75">System Cluster</text>
          <text x={orgX + 16} y={orgY + 27} fontSize="7" fontStyle="italic"
            fill="var(--slide-text)" opacity="0.5">(organisation type)</text>

          {/* support functions — sits above the project team, no arrows of its own */}
          <rect x={boxX} y={supportY} width={boxW} height={supportH} rx="6"
            fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)" strokeWidth="1.2" />
          <text x={boxX + boxW / 2} y={supportY + supportH / 2 + 4} textAnchor="middle" fontSize="10" fontWeight="600"
            fill="var(--slide-primary)">Support Functions</text>

          {/* project team — the one entity that executes */}
          <rect x={boxX} y={exeY} width={boxW} height={exeH} rx="6"
            fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)" strokeWidth="1.2" />
          <text x={boxX + boxW / 2} y={exeY + exeH / 2 + 4} textAnchor="middle" fontSize="10" fontWeight="600"
            fill="var(--slide-primary)">Project Team</text>
          <line x1={boxX + boxW / 2} y1={exeY + exeH} x2={boxX + boxW / 2} y2={procY}
            stroke="var(--slide-primary)" strokeWidth="1.4" opacity="0.7" markerEnd="url(#arrowhead-gr-primary)" />

          {/* generics delivers to execution, as one layer to the next */}
          <line x1={deliversX} y1={genLineY} x2={deliversX} y2={exeLineY}
            stroke="var(--slide-text)" strokeWidth="1.3" opacity="0.8" strokeDasharray="4 3"
            markerEnd="url(#arrowhead-gr-dashed)" />

          <line x1={40} y1={procY} x2={536} y2={procY}
            stroke="var(--slide-accent)" strokeWidth="1.5" opacity="0.6" />

          {/* generics reads data from process */}
          <line x1={optimiseGenericsX + 7} y1={procY} x2={optimiseGenericsX + 7} y2={genLineY}
            stroke={readsColor} strokeWidth="1.5" opacity="0.85" markerEnd="url(#arrowhead-gr-reads)" />

          {/* delivery reads data from process */}
          <line x1={optimiseExeX + 7} y1={procY} x2={optimiseExeX + 7} y2={exeLineY}
            stroke={readsColor} strokeWidth="1.5" opacity="0.85" markerEnd="url(#arrowhead-gr-reads)" />

          {/* client: outside the closed system entirely */}

          {/* 1. client reads data from process — a distilled derivation */}
          <path
            d={`M 526 ${procY} L 526 ${clientEntry1Y + 10} Q 526 ${clientEntry1Y} 536 ${clientEntry1Y} L ${clientX} ${clientEntry1Y}`}
            fill="none" stroke={readsColor} strokeWidth="1.5" opacity="0.85"
            markerEnd="url(#arrowhead-gr-reads)"
          />

          {/* 2. project team delivers to client — the product itself */}
          <line x1={boxX + boxW} y1={clientEntry2Y} x2={clientX} y2={clientEntry2Y}
            stroke="var(--slide-text)" strokeWidth="1.3" opacity="0.8" strokeDasharray="4 3"
            markerEnd="url(#arrowhead-gr-dashed)" />

          <rect x={clientX} y={clientY} width={clientW} height={clientH} rx="8"
            fill="var(--slide-bg-card)" stroke="var(--slide-border)" strokeWidth="1.2" />
          <text x={clientX + clientW / 2} y={clientY + 22} textAnchor="middle" fontSize="11" fontWeight="700"
            fill="var(--slide-text)" opacity="0.85">Client</text>

          {/* note 1 sits beside its own entry line */}
          <foreignObject x={clientX + 12} y={clientEntry1Y - 16} width={clientW - 24} height={64}>
            <div
              // @ts-ignore
              xmlns="http://www.w3.org/1999/xhtml"
              style={{ fontSize: '7.5px', lineHeight: 1.6, color: 'var(--slide-text)', opacity: 0.7, fontStyle: 'italic' }}
            >
              1. Decides which company, and which product, to buy, informed by distilled delivery data.
              E.g. a track record of minimising embodied carbon.
            </div>
          </foreignObject>

          {/* note 2 sits below note 1, since note 1 now runs to two lines */}
          <foreignObject x={clientX + 12} y={clientEntry1Y + 44} width={clientW - 24} height={32}>
            <div
              // @ts-ignore
              xmlns="http://www.w3.org/1999/xhtml"
              style={{ fontSize: '7.5px', lineHeight: 1.6, color: 'var(--slide-text)', opacity: 0.7, fontStyle: 'italic' }}
            >
              2. The product itself, delivered
            </div>
          </foreignObject>

          {/* legend */}
          {legend.map(({ label, color, dashed }, i) => (
            <g key={label} transform={`translate(${20 + i * 180}, 388)`}>
              <line x1={0} y1={0} x2={26} y2={0} stroke={color} strokeWidth="1.5" opacity="0.8"
                strokeDasharray={dashed ? '4 3' : undefined} />
              <text x={34} y={3.5} fontSize="8" fill="var(--slide-text)" opacity="0.7">{label}</text>
            </g>
          ))}

          </g>
        </svg>
      </div>
    </SlideLayout>
  );
}
