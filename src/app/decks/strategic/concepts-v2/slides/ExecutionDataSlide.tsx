import { SlideLayout } from '@/components/slides/SlideLayout';

const sources = [
  {
    label: 'Time Spent',
    organ: 'Process',
    note: 'Primary quantity, captured live during the step — manually, or telemetrically.',
    y: 30,
    targetY: 142,
  },
  {
    label: "Tool's Power Rating",
    organ: 'Inventory',
    note: 'A known property of the tool used, recorded once against it.',
    y: 130,
    targetY: 167,
  },
  {
    label: "Agent's Energy Rate",
    organ: 'Agents',
    note: "A known property of whoever's charged for the energy, recorded once against them.",
    y: 230,
    targetY: 192,
  },
];

const boxX = 20; const boxW = 220; const boxH = 74;
const resultX = 470; const resultW = 170; const resultY = 125; const resultH = 84;

const elbowMidX = 350;
const elbowR = 10;

function elbowPath(x1: number, y1: number, x2: number, y2: number) {
  if (Math.abs(y1 - y2) < 0.5) return `M ${x1} ${y1} L ${x2} ${y2}`;
  const dir = y2 > y1 ? 1 : -1;
  return [
    `M ${x1} ${y1}`,
    `L ${elbowMidX - elbowR} ${y1}`,
    `Q ${elbowMidX} ${y1} ${elbowMidX} ${y1 + elbowR * dir}`,
    `L ${elbowMidX} ${y2 - elbowR * dir}`,
    `Q ${elbowMidX} ${y2} ${elbowMidX + elbowR} ${y2}`,
    `L ${x2} ${y2}`,
  ].join(' ');
}

export function ExecutionDataSlide() {
  return (
    <SlideLayout
      title='Execution Data Combines Across "Organs"'
      subtitle="An organ is one of the model's basic entities: Process, Product, Agents, Inventory. Any number of defining properties can be attached to each, which can then be combined into formulas."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox="0 0 680 330" style={{ width: '100%', height: '100%' }}>
          <defs>
            <marker id="arrowhead-ed" markerWidth="9" markerHeight="7" refX="9" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
              <polygon points="0 0, 9 3.5, 0 7" fill="var(--slide-primary)" opacity="0.6" />
            </marker>
          </defs>

          {sources.map(({ label, organ, note, y, targetY }) => (
            <g key={label}>
              <rect x={boxX} y={y} width={boxW} height={boxH} rx="8"
                fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)" strokeWidth="1.2" />
              <text x={boxX + 14} y={y + 20} fontSize="7.5" fontWeight="700" letterSpacing="0.5"
                fill="var(--slide-primary)" opacity="0.6">{organ.toUpperCase()}</text>
              <text x={boxX + 14} y={y + 36} fontSize="11" fontWeight="700" fill="var(--slide-primary)">{label}</text>
              <foreignObject x={boxX + 14} y={y + 42} width={boxW - 28} height={boxH - 46}>
                <div
                  // @ts-ignore
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{ fontSize: '7.5px', lineHeight: 1.4, color: 'var(--slide-text)', opacity: 0.6 }}
                >
                  {note}
                </div>
              </foreignObject>

              <path
                d={elbowPath(boxX + boxW, y + boxH / 2, resultX - 14, targetY)}
                fill="none" stroke="var(--slide-primary)" strokeWidth="1.4" opacity="0.4"
                markerEnd="url(#arrowhead-ed)"
              />
            </g>
          ))}

          {sources.slice(1).map(({ label, y }, i) => (
            <text
              key={label}
              x={boxX + boxW / 2} y={(sources[i].y + boxH + y) / 2 + 4}
              textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--slide-text)" opacity="0.4"
            >
              ×
            </text>
          ))}

          <rect x={resultX} y={resultY} width={resultW} height={resultH} rx="8"
            fill="var(--slide-bg-accent-muted)" stroke="var(--slide-accent)" strokeWidth="1.8" />
          <text x={resultX + resultW / 2} y={resultY + 20} fontSize="7.5" fontWeight="700" letterSpacing="0.5"
            textAnchor="middle" fill="var(--slide-accent)" opacity="0.7">DERIVED</text>
          <text x={resultX + resultW / 2} y={resultY + 44} fontSize="13" fontWeight="700"
            textAnchor="middle" fill="var(--slide-accent)">Energy Cost</text>
          <text x={resultX + resultW / 2} y={resultY + 62} fontSize="7.5" fontStyle="italic"
            textAnchor="middle" fill="var(--slide-text)" opacity="0.5">exists nowhere until combined</text>
        </svg>
      </div>
    </SlideLayout>
  );
}
