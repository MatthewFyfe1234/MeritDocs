import { SlideLayout } from '@/components/slides/SlideLayout';

export function UserValueSlide() {
  const capabilities = [
    {
      label: 'Process Guidance',
      description: 'Every job runs against a process generated from the operator\'s own spec. Steps are clear, sequenced, and documented - derived from the toolmaker\'s master model.',
    },
    {
      label: 'Time Forecasts',
      description: 'Delivery dates are calculated from the accumulated execution record. Estimates sharpen with every completed job. Commitments become data-driven.',
    },
    {
      label: 'Safety Enforcement',
      description: 'Stage gates built into the process model prevent progression until required conditions are met. Correct operation is enforced, not assumed.',
    },
    {
      label: 'Live Execution Tracking',
      description: 'The IoT connection records each step as it happens. Every team member sees the same picture, updated in real time. Deviations surface immediately.',
    },
  ];

  const leftX = 8; const leftW = 180; const leftRightX = leftX + leftW;
  const specY = 14; const specH = 80;
  const specCy = specY + specH / 2;

  const cardsX = 240; const cardW = 400; const cardH = 50; const cardGap = 9;
  const cardY  = (i: number) => 8 + i * (cardH + cardGap);
  const cardCy = (i: number) => cardY(i) + cardH / 2;
  const branchX = 218;

  return (
    <SlideLayout
      title="For the Operator"
      subtitle="Merit gives the operator everything they need to run the job well - generated automatically from the spec they provide."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox="0 0 650 244" style={{ width: '100%', height: '100%' }}>
          <defs>
            <marker id="arr-user" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--slide-primary)" opacity="0.55" />
            </marker>
          </defs>

          {/* ── OPERATOR SPEC BOX ── */}
          <rect x={leftX} y={specY} width={leftW} height={specH} rx="8"
            fill="var(--slide-bg-accent-muted)" stroke="var(--slide-accent)" strokeWidth="2" />
          <text x={leftX + leftW / 2} y={specY + 20} textAnchor="middle" fontSize="11" fontWeight="700"
            fill="var(--slide-accent)">Operator Spec</text>
          <text x={leftX + leftW / 2} y={specY + 33} textAnchor="middle" fontSize="7.5"
            fill="var(--slide-text)" opacity="0.45">provided per job</text>
          <line x1={leftX + 12} y1={specY + 40} x2={leftX + leftW - 12} y2={specY + 40}
            stroke="var(--slide-accent)" strokeWidth="0.8" opacity="0.25" />

          {(() => {
            const pillDefs = [
              { label: 'Scope',       w: 48 },
              { label: 'Tool config', w: 62 },
              { label: 'Timeline',    w: 52 },
            ];
            const gap = 5;
            const totalW = pillDefs.reduce((s, p) => s + p.w, 0) + gap * (pillDefs.length - 1);
            let px = leftX + (leftW - totalW) / 2;
            return pillDefs.map(({ label, w }) => {
              const x = px; px += w + gap;
              return (
                <g key={label}>
                  <rect x={x} y={specY + 50} width={w} height={20} rx="4"
                    fill="var(--slide-bg-card)" stroke="var(--slide-accent)" strokeWidth="1" opacity="0.5" />
                  <text x={x + w / 2} y={specY + 64} textAnchor="middle" fontSize="8" fontWeight="600"
                    fill="var(--slide-accent)" opacity="0.9">{label}</text>
                </g>
              );
            });
          })()}

          {/* ── ADDITIONAL CONTEXT: IoT connection ── */}
          <rect x={leftX} y={specY + 104} width={leftW} height={48} rx="7"
            fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)" strokeWidth="1.3" />
          <text x={leftX + leftW / 2} y={specY + 121} textAnchor="middle" fontSize="9" fontWeight="700"
            fill="var(--slide-primary)">IoT Connection</text>
          <text x={leftX + leftW / 2} y={specY + 134} textAnchor="middle" fontSize="7.5"
            fill="var(--slide-text)" opacity="0.45">tool API - live tracking</text>
          <text x={leftX + leftW / 2} y={specY + 145} textAnchor="middle" fontSize="7"
            fill="var(--slide-primary)" opacity="0.6">step-by-step execution record</text>

          {/* ── TREE: Spec to capability cards ── */}
          <line x1={leftRightX} y1={specCy} x2={branchX} y2={specCy}
            stroke="var(--slide-primary)" strokeWidth="1.5" opacity="0.35" />
          <line x1={branchX} y1={cardCy(0)} x2={branchX} y2={cardCy(capabilities.length - 1)}
            stroke="var(--slide-primary)" strokeWidth="1.5" opacity="0.35" />
          {capabilities.map((_, i) => (
            <line key={i}
              x1={branchX} y1={cardCy(i)} x2={cardsX - 12} y2={cardCy(i)}
              stroke="var(--slide-primary)" strokeWidth="1.5" opacity="0.45"
              markerEnd="url(#arr-user)" />
          ))}

          {/* IoT -> card 3 supplement */}
          <path
            d={`M ${leftRightX} ${specY + 128} H ${branchX - 10} V ${cardCy(3)} H ${branchX}`}
            stroke="var(--slide-primary)" strokeWidth="1" opacity="0.2"
            strokeDasharray="4,3" fill="none" />

          {/* ── CAPABILITY CARDS ── */}
          {capabilities.map(({ label, description }, i) => {
            const y  = cardY(i);
            const cy = cardCy(i);
            const sepX = cardsX + 110;
            return (
              <g key={label}>
                <rect x={cardsX} y={y} width={cardW} height={cardH} rx="6"
                  fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)" strokeWidth="1.5" />
                <text x={cardsX + 12} y={cy + 4} fontSize="11" fontWeight="700"
                  fill="var(--slide-primary)">{label}</text>
                <line x1={sepX} y1={y + 10} x2={sepX} y2={y + cardH - 10}
                  stroke="var(--slide-border-primary)" strokeWidth="1" opacity="0.4" />
                <foreignObject x={sepX + 10} y={y + 7} width={cardW - 122} height={cardH - 14}>
                  <div
                    // @ts-ignore
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{ display: 'flex', alignItems: 'center', height: '100%', fontSize: '8px', lineHeight: 1.55, color: 'var(--slide-text)', opacity: 0.7 }}
                  >
                    {description}
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>
    </SlideLayout>
  );
}
