import { SlideLayout } from '@/components/slides/SlideLayout';

export function ComponentsSlide() {
  const masterSteps = ['Mix', 'Bake', 'Cool', 'Prepare', 'Apply', 'Insert'];

  // Each component is delivered by a slice of the master process (shown here as a contiguous
  // range, since this example simplifies to a strict chain — see the poset note below).
  const components = [
    { label: 'Sponge',  range: [0, 2] as [number, number] },
    { label: 'Icing',   range: [3, 4] as [number, number] },
    { label: 'Candles', range: [5, 5] as [number, number] },
  ];

  const stepW = 80; const stepGap = 22;
  const groupGap = 12;

  // x-position accounts for the extra gap inserted between component groups.
  const stepX = (i: number) => {
    const groupIdx = components.findIndex(c => i >= c.range[0] && i <= c.range[1]);
    return 20 + i * (stepW + stepGap) + groupIdx * groupGap;
  };

  const stepCx = (i: number) => stepX(i) + stepW / 2;

  const bracketY = 52;
  const stepY = 84; const stepH = 50;
  const labelY = bracketY - 12;

  return (
    <SlideLayout
      title="Product Components Are Delivered by Slices of the Master Process"
      subtitle="The master process is one abstract, ordered sequence of steps. A component is delivered by a slice of it, given a name."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox="0 0 660 220" style={{ width: '100%', height: '100%' }}>
          <defs>
            <marker id="arrowhead-comp" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--slide-primary)" opacity="0.6" />
            </marker>
          </defs>

          <text x={20} y={16} fontSize="8" fontWeight="700" letterSpacing="0.5"
            fill="var(--slide-text)" opacity="0.4">FIXED ORDER MASTER PROCESS</text>

          {components.map(({ label, range }) => {
            const x1 = stepX(range[0]) + 6;
            const x2 = stepX(range[1]) + stepW - 6;
            return (
              <g key={label}>
                <text x={(x1 + x2) / 2} y={labelY} textAnchor="middle" fontSize="10" fontWeight="700"
                  fill="var(--slide-accent)">{label}</text>
                <line x1={x1} y1={bracketY} x2={x2} y2={bracketY}
                  stroke="var(--slide-accent)" strokeWidth="1.5" opacity="0.6" />
                <line x1={x1} y1={bracketY} x2={x1} y2={bracketY + 6}
                  stroke="var(--slide-accent)" strokeWidth="1.5" opacity="0.6" />
                <line x1={x2} y1={bracketY} x2={x2} y2={bracketY + 6}
                  stroke="var(--slide-accent)" strokeWidth="1.5" opacity="0.6" />
              </g>
            );
          })}

          {masterSteps.slice(1).map((_, i) => (
            <line key={`arrow-${i}`}
              x1={stepX(i) + stepW} y1={stepY + stepH / 2}
              x2={stepX(i + 1) - 12} y2={stepY + stepH / 2}
              stroke="var(--slide-primary)" strokeWidth="1.5" opacity="0.5"
              markerEnd="url(#arrowhead-comp)" />
          ))}

          {masterSteps.map((step, i) => (
            <g key={step}>
              <rect x={stepX(i)} y={stepY} width={stepW} height={stepH} rx="6"
                fill="var(--slide-bg-accent-muted)" stroke="var(--slide-accent)" strokeWidth="1.5" />
              <text x={stepCx(i)} y={stepY + stepH / 2 + 4} textAnchor="middle"
                fontSize="9.5" fontWeight="600" fill="var(--slide-accent)">{step}</text>
            </g>
          ))}

          <foreignObject x={20} y={158} width={620} height={40}>
            <div
              // @ts-ignore
              xmlns="http://www.w3.org/1999/xhtml"
              style={{ fontSize: '8.5px', lineHeight: 1.5, color: 'var(--slide-text)', opacity: 0.55 }}
            >
              Simplified here as a strict chain. The real process model is a poset: steps can branch and merge, not just follow one line, and a component can draw on any consistent sub-order of it.
            </div>
          </foreignObject>
        </svg>
      </div>
    </SlideLayout>
  );
}
