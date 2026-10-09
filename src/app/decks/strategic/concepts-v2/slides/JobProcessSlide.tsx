import { SlideLayout } from '@/components/slides/SlideLayout';

const steps = ['Cut', 'Weld', 'Paint', 'Inspect'];
const products = ['Cut Panels', 'Welded Frame', 'Painted Frame'];

const stepW = 110; const stepH = 48;
const stepGap = 60;
const stepX = (i: number) => 80 + i * (stepW + stepGap);
const stepCx = (i: number) => stepX(i) + stepW / 2;
const stepY = 110;

const boundaryGap = 60;

export function JobProcessSlide() {
  return (
    <SlideLayout
      title="A Job's Process Is a Chain of Steps Linked by Products"
      subtitle="Each step requires the product handed to it and produces the product the next step needs. At the two ends of the job, that same handoff crosses into neighbouring jobs."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox="0 0 780 260" style={{ width: '100%', height: '100%' }}>
          <defs>
            <marker id="arrowhead-flow" markerWidth="10" markerHeight="7" refX="5" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--slide-primary)" opacity="0.6" />
            </marker>
            <marker id="arrowhead-boundary" markerWidth="9" markerHeight="7" refX="4.5" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
              <polygon points="0 0, 9 3.5, 0 7" fill="var(--slide-accent)" opacity="0.8" />
            </marker>
          </defs>

          <text x={80} y={20} fontSize="8" fontWeight="700" letterSpacing="0.5"
            fill="var(--slide-text)" opacity="0.4">JOB N</text>

          {/* incoming product from job n-1, vertically from above */}
          <text x={stepCx(0)} y={stepY - boundaryGap - 4} textAnchor="middle"
            fontSize="7.5" fontWeight="600" fill="var(--slide-accent)">from Job n-1</text>
          <line
            x1={stepCx(0)} y1={stepY - boundaryGap + 6}
            x2={stepCx(0)} y2={stepY - 4}
            stroke="var(--slide-accent)" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.75"
            markerEnd="url(#arrowhead-boundary)"
          />

          {/* outgoing product to job n+1, vertically below */}
          <text x={stepCx(steps.length - 1)} y={stepY + stepH + boundaryGap + 12} textAnchor="middle"
            fontSize="7.5" fontWeight="600" fill="var(--slide-accent)">to Job n+1</text>
          <line
            x1={stepCx(steps.length - 1)} y1={stepY + stepH + 4}
            x2={stepCx(steps.length - 1)} y2={stepY + stepH + boundaryGap - 4}
            stroke="var(--slide-accent)" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.75"
            markerEnd="url(#arrowhead-boundary)"
          />

          {/* step -> step edges within the job, product name labels the edge */}
          {steps.slice(1).map((_, i) => (
            <g key={`edge-${i}`}>
              <line
                x1={stepX(i) + stepW} y1={stepY + stepH / 2}
                x2={stepX(i + 1) - 4} y2={stepY + stepH / 2}
                stroke="var(--slide-primary)" strokeWidth="1.5" opacity="0.5"
                markerEnd="url(#arrowhead-flow)"
              />
              <text
                x={stepX(i) + stepW + stepGap / 2} y={stepY + stepH / 2 - 8}
                textAnchor="middle" fontSize="7.5" fontWeight="600" fill="var(--slide-primary)"
              >
                {products[i]}
              </text>
            </g>
          ))}

          {steps.map((step, i) => (
            <g key={step}>
              <rect x={stepX(i)} y={stepY} width={stepW} height={stepH} rx="6"
                fill="var(--slide-bg-accent-muted)" stroke="var(--slide-accent)" strokeWidth="1.5" />
              <text x={stepCx(i)} y={stepY + stepH / 2 + 4} textAnchor="middle"
                fontSize="10" fontWeight="600" fill="var(--slide-accent)">{step}</text>
            </g>
          ))}
        </svg>
      </div>
    </SlideLayout>
  );
}
