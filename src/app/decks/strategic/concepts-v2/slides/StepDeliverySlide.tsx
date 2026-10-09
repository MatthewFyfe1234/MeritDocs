import { SlideLayout } from '@/components/slides/SlideLayout';

const inputs = [
  {
    label: 'Agent',
    examples: 'e.g. a person, or an organisation',
    note: 'Delivers the step. A person and an organisation are both agents: each is an autonomous cluster of functions, just at a different scale.',
    y: 20,
    h: 92,
    midX: 375,
    targetY: 132,
  },
  {
    label: 'Material',
    examples: 'e.g. paper, steel, sunlight',
    note: 'Consumed by the step. What goes in does not come back out unchanged.',
    y: 128,
    h: 78,
    midX: 375,
    targetY: 167,
  },
  {
    label: 'Tool',
    examples: 'e.g. software, hardware, a vehicle',
    note: 'Used for the step, not consumed by it. The same tool can deliver the same step again.',
    y: 222,
    h: 78,
    midX: 375,
    targetY: 202,
  },
];

const boxX = 8; const boxW = 260;
const stepX = 470; const stepW = 182; const stepY = 100; const stepH = 130;

const elbowR = 10;

function elbowPath(x1: number, y1: number, x2: number, y2: number, midX: number) {
  if (Math.abs(y1 - y2) < 0.5) return `M ${x1} ${y1} L ${x2} ${y2}`;
  const dir = y2 > y1 ? 1 : -1;
  return [
    `M ${x1} ${y1}`,
    `L ${midX - elbowR} ${y1}`,
    `Q ${midX} ${y1} ${midX} ${y1 + elbowR * dir}`,
    `L ${midX} ${y2 - elbowR * dir}`,
    `Q ${midX} ${y2} ${midX + elbowR} ${y2}`,
    `L ${x2} ${y2}`,
  ].join(' ');
}

export function StepDeliverySlide() {
  return (
    <SlideLayout
      title="Every Step Is Delivered by an Agent, Using Materials and Tools"
      subtitle="An agent performs the step. Materials are what it consumes; tools are what it uses without consuming."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox="0 0 660 328" style={{ width: '100%', height: '100%' }}>
          <defs>
            <marker id="arrowhead-delivery" markerWidth="10" markerHeight="7" refX="5" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--slide-primary)" opacity="0.5" />
            </marker>
          </defs>

          {inputs.map(({ label, examples, note, y, h, midX, targetY }) => (
            <g key={label}>
              <rect x={boxX} y={y} width={boxW} height={h} rx="6"
                fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)" strokeWidth="1.2" />
              <text x={boxX + boxW / 2} y={y + 20} textAnchor="middle" fontSize="11" fontWeight="700"
                fill="var(--slide-primary)">{label}</text>
              <text x={boxX + boxW / 2} y={y + 33} textAnchor="middle" fontSize="8" fontStyle="italic"
                fill="var(--slide-text)" opacity="0.45">{examples}</text>
              <foreignObject x={boxX + 14} y={y + 42} width={boxW - 28} height={h - 50}>
                <div
                  // @ts-ignore
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{ fontSize: '8px', lineHeight: 1.5, color: 'var(--slide-text)', opacity: 0.7, textAlign: 'center' }}
                >
                  {note}
                </div>
              </foreignObject>
              <path
                d={elbowPath(boxX + boxW, y + h / 2, stepX - 12, targetY, midX)}
                fill="none" stroke="var(--slide-primary)" strokeWidth="1.5" opacity="0.4"
                markerEnd="url(#arrowhead-delivery)"
              />
            </g>
          ))}

          <rect x={stepX} y={stepY} width={stepW} height={stepH} rx="8"
            fill="var(--slide-bg-accent-muted)" stroke="var(--slide-accent)" strokeWidth="2" />
          <text x={stepX + stepW / 2} y={stepY + 30} textAnchor="middle" fontSize="14" fontWeight="700"
            fill="var(--slide-accent)">Step</text>
          <line x1={stepX + 16} y1={stepY + 42} x2={stepX + stepW - 16} y2={stepY + 42}
            stroke="var(--slide-accent)" strokeWidth="0.8" opacity="0.25" />
          <text x={stepX + stepW / 2} y={stepY + stepH - 38} textAnchor="middle" fontSize="8"
            fill="var(--slide-text)" opacity="0.5">requires a product, delivers a product</text>
          <text x={stepX + stepW / 2} y={stepY + stepH - 20} textAnchor="middle" fontSize="8"
            fill="var(--slide-text)" opacity="0.5">also records data against itself, its agent, and its tool</text>
        </svg>
      </div>
    </SlideLayout>
  );
}
