import { SlideLayout } from '@/components/slides/SlideLayout';

export function ExecutionRefinesForecastSlide() {
  const boxW = 180; const boxY = 70; const boxH = 150;
  const gap = 40;
  const box1X = 20;
  const box2X = box1X + boxW + gap;
  const box3X = box2X + boxW + gap;

  const cy = boxY + boxH / 2;
  const bottom = boxY + boxH;

  const steps = [
    {
      x: box1X,
      label: 'Initialise',
      description: "From the physical relationship between a component's descriptors and a step's quantities.",
    },
    {
      x: box2X,
      label: 'Review',
      description: 'On a periodic basis, the forecast is checked against what the step actually produced.',
    },
    {
      x: box3X,
      label: 'Update',
      description: 'From data recorded manually or via telemetry, the relationship itself is refined, not just the number.',
    },
  ];

  return (
    <SlideLayout
      title="Execution Refines the Forecast"
      subtitle="The forecast isn't fixed at the outset. It's a loop: initialise from a physical relationship, review periodically, update from what actually happened, and carry the refined relationship into the next forecast."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox="0 0 660 290" style={{ width: '100%', height: '100%' }}>
          <defs>
            <marker id="arrowhead-refine" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--slide-primary)" opacity="0.6" />
            </marker>
          </defs>

          {steps.map((step, i) => (
            <g key={step.label}>
              <rect x={step.x} y={boxY} width={boxW} height={boxH} rx="8"
                fill="var(--slide-bg-accent-muted)" stroke="var(--slide-accent)" strokeWidth="2" />
              <text x={step.x + boxW / 2} y={boxY + 26} textAnchor="middle" fontSize="13" fontWeight="700"
                fill="var(--slide-accent)">{step.label}</text>
              <line x1={step.x + 14} y1={boxY + 36} x2={step.x + boxW - 14} y2={boxY + 36}
                stroke="var(--slide-accent)" strokeWidth="0.8" opacity="0.3" />

              <foreignObject x={step.x + 12} y={boxY + 44} width={boxW - 24} height={i === 0 ? 66 : 96}>
                <div
                  // @ts-ignore
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{ fontSize: '8px', lineHeight: 1.5, color: 'var(--slide-text)', opacity: 0.75 }}
                >
                  {step.description}
                </div>
              </foreignObject>

              {i === 0 && (
                <g>
                  <rect x={step.x + 12} y={boxY + 116} width={boxW - 24} height={22} rx="4"
                    fill="var(--slide-bg-card)" stroke="var(--slide-accent)" strokeWidth="1" opacity="0.9" />
                  <text x={step.x + boxW / 2} y={boxY + 130} textAnchor="middle" fontSize="8" fontWeight="700"
                    fill="var(--slide-accent)">Mix Time ≈ f(Volume)</text>
                </g>
              )}
            </g>
          ))}

          <line x1={box1X + boxW} y1={cy} x2={box2X - 12} y2={cy}
            stroke="var(--slide-primary)" strokeWidth="1.5" opacity="0.5" markerEnd="url(#arrowhead-refine)" />
          <line x1={box2X + boxW} y1={cy} x2={box3X - 12} y2={cy}
            stroke="var(--slide-primary)" strokeWidth="1.5" opacity="0.5" markerEnd="url(#arrowhead-refine)" />

          <path
            d={`M ${box3X + boxW / 2} ${bottom} C ${box3X + boxW / 2} ${bottom + 46}, ${box1X + boxW / 2} ${bottom + 46}, ${box1X + boxW / 2} ${bottom + 4}`}
            stroke="var(--slide-primary)" strokeWidth="1.5" opacity="0.4" fill="none"
            markerEnd="url(#arrowhead-refine)" />
          <text x={(box1X + box3X + boxW) / 2} y={bottom + 40} textAnchor="middle" fontSize="8" fontWeight="600"
            fill="var(--slide-text)" opacity="0.55">refines the relationship for the next forecast</text>
        </svg>
      </div>
    </SlideLayout>
  );
}
