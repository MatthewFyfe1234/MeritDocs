import { SlideLayout } from '@/components/slides/SlideLayout';

export function ProjectMapSlide() {
  const steps = [
    { short: 'Design',   full: 'Design'        },
    { short: 'Fab.',     full: 'Fabrication'   },
    { short: 'Install.', full: 'Installation'  },
    { short: 'Comm.',    full: 'Commissioning' },
    { short: 'Finishing', full: 'Finishing'    },
  ];

  // Master spec: all possible components, some selected for this project
  const components = [
    { label: 'Structural Panels', selected: true,  assoc: [false, true,  true,  false, false] },
    { label: 'MEP Package',       selected: true,  assoc: [false, false, true,  true,  false] },
    { label: 'Design',            selected: false, assoc: [true,  false, false, false, false] },
    { label: 'Fit-Out',           selected: false, assoc: [false, false, false, false, true]  },
  ];

  // Steps needed by at least one selected component
  const stepNeeded = steps.map((_, j) =>
    components.some(c => c.selected && c.assoc[j])
  );

  // Grid geometry
  const gridLeft   = 150;
  const colW       = 44;
  const rowH       = 40;
  const headerH    = 40;
  const gridStartY = 14;
  const dotR       = 9;

  const gridRight  = gridLeft + steps.length * colW;
  const gridBottom = gridStartY + headerH + components.length * rowH;

  const colCx = (j: number) => gridLeft + j * colW + colW / 2;
  const rowCy = (i: number) => gridStartY + headerH + i * rowH + rowH / 2;

  // Project map — all master steps, inactive ones muted; vertically centred against the grid body
  const pmLeft   = 430;
  const pmRight  = 650;
  const pmW      = pmRight - pmLeft;
  const pmItemH  = 26;
  const pmItemGap = 6;
  const pmTotalH = steps.length * pmItemH + (steps.length - 1) * pmItemGap;
  const bodyH    = components.length * rowH;
  const pmStartY = gridStartY + headerH + (bodyH - pmTotalH) / 2;
  const pmItemY  = (i: number) => pmStartY + i * (pmItemH + pmItemGap);
  const pmItemCy = (i: number) => pmItemY(i) + pmItemH / 2;

  const gridCenterY = (gridStartY + gridBottom) / 2;

  return (
    <SlideLayout
      title="The Project Map"
      subtitle="The master spec is mapped to the master process at onboarding. When a spec is created with a subset of components, the platform reads only those rows and generates the corresponding delivery plan."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox="0 0 660 230" style={{ width: '100%', height: '100%' }}>
          <defs>
            <marker id="arrowhead-pm" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--slide-primary)" opacity="0.5" />
            </marker>
            <marker id="arrowhead-pm-down" markerWidth="7" markerHeight="5" refX="0" refY="2.5" orient="auto" markerUnits="userSpaceOnUse">
              <polygon points="0 0, 7 2.5, 0 5" fill="var(--slide-primary)" opacity="0.4" />
            </marker>
          </defs>

          <g transform="translate(-40, 0)">

          {/* ── LEFT: Component labels ── */}
          <text x={gridLeft - 10} y={gridStartY + headerH / 2 - 4} textAnchor="end"
            fontSize="7.5" fontWeight="600" fill="var(--slide-text)" opacity="0.4">MASTER SPEC</text>
          <text x={gridLeft - 10} y={gridStartY + headerH / 2 + 8} textAnchor="end"
            fontSize="7.5" fill="var(--slide-text)" opacity="0.3">components</text>

          {components.map((comp, i) => (
            <text key={comp.label} x={gridLeft - 10} y={rowCy(i) + 4}
              textAnchor="end" fontSize="8.5"
              fill="var(--slide-text)"
              opacity={comp.selected ? 0.85 : 0.3}>{comp.label}</text>
          ))}

          {/* ── GRID: background ── */}
          <rect x={gridLeft} y={gridStartY} width={steps.length * colW} height={headerH + components.length * rowH}
            rx="6" fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)" strokeWidth="1.2" />

          {/* Shade unselected rows */}
          {components.map((comp, i) => !comp.selected && (
            <rect key={`row-shade-${i}`}
              x={gridLeft} y={gridStartY + headerH + i * rowH}
              width={steps.length * colW} height={rowH}
              fill="var(--slide-bg-muted)" opacity="0.55" />
          ))}

          {/* Shade inactive step columns (not needed by any selected component) */}
          {steps.map((_, j) => !stepNeeded[j] && (
            <rect key={`col-shade-${j}`}
              x={gridLeft + j * colW} y={gridStartY + headerH}
              width={colW} height={components.length * rowH}
              fill="var(--slide-bg-muted)" opacity="0.4" />
          ))}

          {/* Header band */}
          <rect x={gridLeft} y={gridStartY} width={steps.length * colW} height={headerH}
            rx="6" fill="var(--slide-bg-card)" />
          <rect x={gridLeft} y={gridStartY + headerH - 6} width={steps.length * colW} height={6}
            fill="var(--slide-bg-card)" />

          {/* Header / body separator */}
          <line x1={gridLeft} y1={gridStartY + headerH}
            x2={gridRight} y2={gridStartY + headerH}
            stroke="var(--slide-border-primary)" strokeWidth="1" opacity="0.6" />

          {/* Vertical column dividers */}
          {steps.slice(1).map((_, j) => (
            <line key={`vcol-${j}`}
              x1={gridLeft + (j + 1) * colW} y1={gridStartY}
              x2={gridLeft + (j + 1) * colW} y2={gridBottom}
              stroke="var(--slide-border-primary)" strokeWidth="0.8" opacity="0.4" />
          ))}

          {/* Horizontal row dividers */}
          {components.slice(1).map((_, i) => (
            <line key={`hrow-${i}`}
              x1={gridLeft} y1={gridStartY + headerH + (i + 1) * rowH}
              x2={gridRight} y2={gridStartY + headerH + (i + 1) * rowH}
              stroke="var(--slide-border-primary)" strokeWidth="0.8" opacity="0.35" />
          ))}

          {/* Step headers */}
          {steps.map((step, j) => (
            <text key={step.short} x={colCx(j)} y={gridStartY + headerH / 2 + 4}
              textAnchor="middle" fontSize="8" fontWeight="600"
              fill={stepNeeded[j] ? 'var(--slide-primary)' : 'var(--slide-text)'}
              opacity={stepNeeded[j] ? 0.85 : 0.3}>{step.short}</text>
          ))}

          {/* Association dots */}
          {components.map((comp, i) =>
            comp.assoc.map((filled, j) => (
              <circle key={`dot-${i}-${j}`}
                cx={colCx(j)} cy={rowCy(i)} r={dotR}
                fill={filled && comp.selected ? 'var(--slide-primary)' : 'none'}
                stroke={filled && comp.selected ? 'none' : 'var(--slide-border-primary)'}
                strokeWidth="1.2"
                opacity={comp.selected ? (filled ? 0.6 : 0.25) : 0.15} />
            ))
          )}

          {/* Selected row left-edge indicators */}
          {components.map((comp, i) => comp.selected && (
            <rect key={`sel-${i}`}
              x={gridLeft} y={gridStartY + headerH + i * rowH + 6}
              width={3} height={rowH - 12} rx="1.5"
              fill="var(--slide-primary)" opacity="0.5" />
          ))}

          {/* ── ARROW: Grid to Project Map ── */}
          <line
            x1={gridRight + 4} y1={gridCenterY}
            x2={pmLeft - 12}   y2={gridCenterY}
            stroke="var(--slide-primary)" strokeWidth="1.5" opacity="0.4"
            markerEnd="url(#arrowhead-pm)" />

          {/* ── RIGHT: Project Map ── */}
          <text x={pmLeft + pmW / 2} y={gridStartY + 16} textAnchor="middle"
            fontSize="10" fontWeight="700" fill="var(--slide-primary)">Project Map</text>
          <rect x={pmLeft + pmW / 2 - 50} y={gridStartY + 21} width={100} height={15} rx="3"
            fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)" strokeWidth="1" />
          <text x={pmLeft + pmW / 2} y={gridStartY + 32} textAnchor="middle"
            fontSize="7" fontWeight="600" fill="var(--slide-primary)" opacity="0.5">AUTO-GENERATED</text>

          {steps.map(({ full }, i) => {
            const active = stepNeeded[i];
            return (
              <g key={full}>
                <rect x={pmLeft} y={pmItemY(i)} width={pmW} height={pmItemH} rx="5"
                  fill={active ? 'var(--slide-bg-primary-muted)' : 'var(--slide-bg-muted)'}
                  stroke="var(--slide-border-primary)" strokeWidth="1.5"
                  opacity={active ? 1 : 0.4} />
                <text x={pmLeft + pmW / 2} y={pmItemCy(i) + 4} textAnchor="middle"
                  fontSize="9.5" fontWeight="500"
                  fill={active ? 'var(--slide-primary)' : 'var(--slide-text)'}
                  opacity={active ? 1 : 0.3}>{full}</text>
                {i < steps.length - 1 && (
                  <line
                    x1={pmLeft + pmW / 2} y1={pmItemY(i) + pmItemH}
                    x2={pmLeft + pmW / 2} y2={pmItemY(i + 1) - 4}
                    stroke="var(--slide-primary)" strokeWidth="1.2"
                    opacity={active && stepNeeded[i + 1] ? 0.4 : 0.15}
                    markerEnd="url(#arrowhead-pm-down)" />
                )}
              </g>
            );
          })}
          </g>
        </svg>
      </div>
    </SlideLayout>
  );
}
