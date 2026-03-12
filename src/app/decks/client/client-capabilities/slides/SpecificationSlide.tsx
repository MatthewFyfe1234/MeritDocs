import { SlideLayout } from '@/components/slides/SlideLayout';

export function SpecificationSlide() {
  const capabilities = [
    {
      label: 'Inventory',
      description:
        'Calculation rules set up at onboarding quantify materials from scope. The result feeds directly into stock management.',
    },
    {
      label: 'Project Map',
      description:
        'Associations configured at onboarding link spec components to process steps, auto-generating the delivery plan.',
    },
    {
      label: 'Forecasts',
      description:
        'Execution records for each process step accumulate over time. Historical durations roll up into a delivery timeline.',
    },
    {
      label: 'Executor Selection',
      description:
        'Agent performance against each process step, combined with calendar availability, drives selection recommendations.',
    },
  ];

  // All three left boxes share the same x and width
  const leftX = 8; const leftW = 200; const leftRightX = leftX + leftW; // 208

  // Vertical stack: Config / Spec / Exec
  const configY = 8;  const configH = 60;
  const specY   = 76; const specH   = 92;
  const execY   = 176; const execH  = 60;

  const configCy = configY + configH / 2; // 38
  const specCy   = specY   + specH   / 2; // 122
  const execCy   = execY   + execH   / 2; // 206

  // Right column cards
  const cardsX = 264; const cardW = 388; const cardH = 50; const cardGap = 9;
  const cardY  = (i: number) => 8 + i * (cardH + cardGap);
  const cardCy = (i: number) => cardY(i) + cardH / 2;

  // Tree geometry
  const branchX  = 236;
  const relayX   = 216; // vertical relay just right of spec box — all supplementary paths pass through here

  return (
    <SlideLayout
      title="The Specification"
      subtitle="The spec defines what you are building. From it, and from configuration and accumulated execution data, the platform derives four outputs automatically."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox="0 0 660 244" style={{ width: '100%', height: '100%' }}>
          <defs>
            {/* refX="0" puts the back of the arrowhead at the line endpoint; tip extends forward */}
            <marker id="arrowhead-spec" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--slide-primary)" opacity="0.55" />
            </marker>
          </defs>

          {/* ── CONFIGURATION BOX (top) ── */}
          <rect x={leftX} y={configY} width={leftW} height={configH} rx="6"
            fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)" strokeWidth="1.2" />
          <text x={leftX + leftW / 2} y={configY + 17} textAnchor="middle" fontSize="9.5" fontWeight="700"
            fill="var(--slide-primary)">Configuration</text>
          <text x={leftX + leftW / 2} y={configY + 29} textAnchor="middle" fontSize="7.5"
            fill="var(--slide-text)" opacity="0.45">defined at onboarding</text>
          <line x1={leftX + 10} y1={configY + 35} x2={leftX + leftW - 10} y2={configY + 35}
            stroke="var(--slide-border-primary)" strokeWidth="0.8" opacity="0.4" />
          <text x={leftX + leftW / 2 - 30} y={configY + 50} textAnchor="middle" fontSize="8.5"
            fill="var(--slide-primary)" opacity="0.75">Associations</text>
          <text x={leftX + leftW / 2 + 2} y={configY + 50} fontSize="8.5"
            fill="var(--slide-text)" opacity="0.3">·</text>
          <text x={leftX + leftW / 2 + 30} y={configY + 50} textAnchor="middle" fontSize="8.5"
            fill="var(--slide-primary)" opacity="0.75">Calculations</text>

          {/* ── SPECIFICATION BOX (middle, accent) ── */}
          <rect x={leftX} y={specY} width={leftW} height={specH} rx="8"
            fill="var(--slide-bg-accent-muted)" stroke="var(--slide-accent)" strokeWidth="2" />
          <text x={leftX + leftW / 2} y={specY + 20} textAnchor="middle" fontSize="11" fontWeight="700"
            fill="var(--slide-accent)">Specification</text>
          <text x={leftX + leftW / 2} y={specY + 33} textAnchor="middle" fontSize="7.5"
            fill="var(--slide-text)" opacity="0.45">Provided per delivery</text>
          <line x1={leftX + 12} y1={specY + 40} x2={leftX + leftW - 12} y2={specY + 40}
            stroke="var(--slide-accent)" strokeWidth="0.8" opacity="0.25" />

          {/* Spec pills: Scope / Components / Delivery Date */}
          {(() => {
            const pillDefs = [
              { label: 'Scope',         w: 50 },
              { label: 'Components',    w: 66 },
              { label: 'Delivery Date', w: 64 },
            ];
            const gap = 5;
            const totalW = pillDefs.reduce((s, p) => s + p.w, 0) + gap * (pillDefs.length - 1);
            let px = leftX + (leftW - totalW) / 2;
            return pillDefs.map(({ label, w }) => {
              const x = px;
              px += w + gap;
              return (
                <g key={label}>
                  <rect x={x} y={specY + 50} width={w} height={22} rx="4"
                    fill="var(--slide-bg-card)" stroke="var(--slide-accent)" strokeWidth="1" opacity="0.5" />
                  <text x={x + w / 2} y={specY + 65} textAnchor="middle" fontSize="8.5" fontWeight="600"
                    fill="var(--slide-accent)" opacity="0.9">{label}</text>
                </g>
              );
            });
          })()}

          {/* ── EXECUTION DATA BOX (bottom) ── */}
          <rect x={leftX} y={execY} width={leftW} height={execH} rx="6"
            fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)" strokeWidth="1.2" />
          <text x={leftX + leftW / 2} y={execY + 17} textAnchor="middle" fontSize="9.5" fontWeight="700"
            fill="var(--slide-primary)">Execution Data</text>
          <text x={leftX + leftW / 2} y={execY + 29} textAnchor="middle" fontSize="7.5"
            fill="var(--slide-text)" opacity="0.45">accumulates over time</text>
          <line x1={leftX + 10} y1={execY + 35} x2={leftX + leftW - 10} y2={execY + 35}
            stroke="var(--slide-border-primary)" strokeWidth="0.8" opacity="0.4" />
          <text x={leftX + leftW / 2 - 30} y={execY + 50} textAnchor="middle" fontSize="8.5"
            fill="var(--slide-primary)" opacity="0.75">Duration records</text>
          <text x={leftX + leftW / 2 + 2} y={execY + 50} fontSize="8.5"
            fill="var(--slide-text)" opacity="0.3">·</text>
          <text x={leftX + leftW / 2 + 32} y={execY + 50} textAnchor="middle" fontSize="8.5"
            fill="var(--slide-primary)" opacity="0.75">Performance</text>

          {/* ── MAIN TREE: Spec → all 4 cards ── */}
          <line x1={leftRightX} y1={specCy} x2={branchX} y2={specCy}
            stroke="var(--slide-primary)" strokeWidth="1.5" opacity="0.35" />
          <line x1={branchX} y1={cardCy(0)} x2={branchX} y2={cardCy(3)}
            stroke="var(--slide-primary)" strokeWidth="1.5" opacity="0.35" />
          {capabilities.map((_, i) => (
            <line key={i}
              x1={branchX} y1={cardCy(i)} x2={cardsX - 12} y2={cardCy(i)}
              stroke="var(--slide-primary)" strokeWidth="1.5" opacity="0.45"
              markerEnd="url(#arrowhead-spec)" />
          ))}

          {/*
            ── SUPPLEMENTARY PATHS ──
            Config is above the spec box; its horizontal segment travels at y=38 (above spec top y=76).
            Exec is below the spec box; its horizontal segment travels at y=206 (below spec bottom y=168).
            Both route vertically at x=relayX (216), which is right of spec box edge (208).
            No path crosses the spec box.
          */}
          {[0, 1].map(i => (
            <path key={`cfg-${i}`}
              d={`M ${leftRightX} ${configCy} H ${relayX} V ${cardCy(i)} H ${branchX}`}
              stroke="var(--slide-primary)" strokeWidth="1" opacity="0.2"
              strokeDasharray="4,3" fill="none" />
          ))}
          {[2, 3].map(i => (
            <path key={`exec-${i}`}
              d={`M ${leftRightX} ${execCy} H ${relayX} V ${cardCy(i)} H ${branchX}`}
              stroke="var(--slide-primary)" strokeWidth="1" opacity="0.2"
              strokeDasharray="4,3" fill="none" />
          ))}

          {/* ── CAPABILITY CARDS ── */}
          {capabilities.map(({ label, description }, i) => {
            const y  = cardY(i);
            const cy = cardCy(i);
            const sepX = cardsX + 120;
            return (
              <g key={label}>
                <rect x={cardsX} y={y} width={cardW} height={cardH} rx="6"
                  fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)" strokeWidth="1.5" />
                <text x={cardsX + 12} y={cy + 4} fontSize="11" fontWeight="700"
                  fill="var(--slide-primary)">{label}</text>
                <line x1={sepX} y1={y + 10} x2={sepX} y2={y + cardH - 10}
                  stroke="var(--slide-border-primary)" strokeWidth="1" opacity="0.4" />
                <foreignObject x={sepX + 10} y={y + 7} width={cardW - 132} height={cardH - 14}>
                  <div
                    // @ts-ignore
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{ display: 'flex', alignItems: 'center', height: '100%', fontSize: '8.5px', lineHeight: 1.55, color: 'var(--slide-text)', opacity: 0.7 }}
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
