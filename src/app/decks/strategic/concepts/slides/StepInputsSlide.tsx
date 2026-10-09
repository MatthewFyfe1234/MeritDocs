import { SlideLayout } from '@/components/slides/SlideLayout';

interface Pill { label: string; known: boolean; }

export function StepInputsSlide() {
  const leftX = 8; const leftW = 210;

  const materialY = 10; const materialH = 112;
  const toolingY  = 130; const toolingH = 100;
  const agenticY  = 238; const agenticH = 82;

  const materialCy = materialY + materialH / 2;
  const toolingCy  = toolingY + toolingH / 2;
  const agenticCy  = agenticY + agenticH / 2;

  const stepX = 470; const stepW = 182; const stepY = 60; const stepH = 154;
  const stepCy = stepY + stepH / 2;

  const targetY = [stepY + 34, stepCy, stepY + stepH - 34];

  const renderPills = (pills: Pill[], boxX: number, boxW: number, y: number) => {
    const gap = 6;
    const widths = pills.map(p => p.label.length * 5.4 + 18);
    const totalW = widths.reduce((s, w) => s + w, 0) + gap * (pills.length - 1);
    let px = boxX + (boxW - totalW) / 2;
    return pills.map(({ label, known }, i) => {
      const w = widths[i];
      const x = px;
      px += w + gap;
      return (
        <g key={label}>
          <rect x={x} y={y} width={w} height={20} rx="10"
            fill="var(--slide-bg-card)" stroke="var(--slide-primary)" strokeWidth="1"
            strokeDasharray={known ? undefined : '3,2'} opacity={known ? 0.55 : 0.65} />
          <text x={x + w / 2} y={y + 14} textAnchor="middle" fontSize="8" fontWeight="600"
            fill="var(--slide-primary)" opacity={known ? 0.9 : 0.6}>{label}</text>
        </g>
      );
    });
  };

  return (
    <SlideLayout
      title="Every Step Has Measurable Inputs"
      subtitle="Material, tooling, and agentic (organisations, individuals, potentially AI) inputs are determinable at the outset. The step itself is where reality is realised through execution, starting with how long it takes."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox="0 0 660 358" style={{ width: '100%', height: '100%' }}>
          <defs>
            <marker id="arrowhead-step" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--slide-primary)" opacity="0.55" />
            </marker>
          </defs>

          {/* ── MATERIAL ── */}
          <rect x={leftX} y={materialY} width={leftW} height={materialH} rx="6"
            fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)" strokeWidth="1.2" />
          <text x={leftX + leftW / 2} y={materialY + 17} textAnchor="middle" fontSize="10" fontWeight="700"
            fill="var(--slide-primary)">Material</text>
          <text x={leftX + leftW / 2} y={materialY + 29} textAnchor="middle" fontSize="7.5" fontStyle="italic"
            fill="var(--slide-text)" opacity="0.45">e.g. eggs, flour, sugar</text>
          <text x={leftX + leftW / 2} y={materialY + 40} textAnchor="middle" fontSize="6.7" fontStyle="italic"
            fill="var(--slide-text)" opacity="0.4">derived from the spec (pre-wastage)</text>
          <line x1={leftX + 12} y1={materialY + 48} x2={leftX + leftW - 12} y2={materialY + 48}
            stroke="var(--slide-border-primary)" strokeWidth="0.8" opacity="0.4" />
          {renderPills([{ label: 'Quantity', known: true }, { label: 'Weight', known: true }], leftX, leftW, materialY + 56)}
          {renderPills([{ label: 'Embodied Carbon', known: true }], leftX, leftW, materialY + 82)}

          {/* ── TOOLING ── */}
          <rect x={leftX} y={toolingY} width={leftW} height={toolingH} rx="6"
            fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)" strokeWidth="1.2" />
          <text x={leftX + leftW / 2} y={toolingY + 17} textAnchor="middle" fontSize="10" fontWeight="700"
            fill="var(--slide-primary)">Tooling</text>
          <text x={leftX + leftW / 2} y={toolingY + 29} textAnchor="middle" fontSize="7.5" fontStyle="italic"
            fill="var(--slide-text)" opacity="0.45">e.g. whisk, mixer</text>
          <line x1={leftX + 12} y1={toolingY + 36} x2={leftX + leftW - 12} y2={toolingY + 36}
            stroke="var(--slide-border-primary)" strokeWidth="0.8" opacity="0.4" />
          {renderPills([{ label: 'Energy Rating', known: true }, { label: 'Max Decibels', known: true }], leftX, leftW, toolingY + 44)}
          {renderPills([{ label: 'Embodied Carbon', known: true }], leftX, leftW, toolingY + 70)}

          {/* ── AGENTIC ── */}
          <rect x={leftX} y={agenticY} width={leftW} height={agenticH} rx="6"
            fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)" strokeWidth="1.2" />
          <text x={leftX + leftW / 2} y={agenticY + 17} textAnchor="middle" fontSize="10" fontWeight="700"
            fill="var(--slide-primary)">Agentic</text>
          <text x={leftX + leftW / 2} y={agenticY + 27} textAnchor="middle" fontSize="6.7"
            fill="var(--slide-text)" opacity="0.45">(organisations, individuals, potentially AI)</text>
          <text x={leftX + leftW / 2} y={agenticY + 38} textAnchor="middle" fontSize="7.5" fontStyle="italic"
            fill="var(--slide-text)" opacity="0.45">e.g. baker</text>
          <line x1={leftX + 12} y1={agenticY + 45} x2={leftX + leftW - 12} y2={agenticY + 45}
            stroke="var(--slide-border-primary)" strokeWidth="0.8" opacity="0.4" />
          {renderPills([{ label: 'Electricity Rate', known: true }, { label: 'Salary', known: true }], leftX, leftW, agenticY + 53)}

          {/* ── CONVERGING LINES ── */}
          <line x1={leftX + leftW} y1={materialCy} x2={stepX - 12} y2={targetY[0]}
            stroke="var(--slide-primary)" strokeWidth="1.5" opacity="0.4" markerEnd="url(#arrowhead-step)" />
          <line x1={leftX + leftW} y1={toolingCy} x2={stepX - 12} y2={targetY[1]}
            stroke="var(--slide-primary)" strokeWidth="1.5" opacity="0.4" markerEnd="url(#arrowhead-step)" />
          <line x1={leftX + leftW} y1={agenticCy} x2={stepX - 12} y2={targetY[2]}
            stroke="var(--slide-primary)" strokeWidth="1.5" opacity="0.4" markerEnd="url(#arrowhead-step)" />

          {/* ── STEP ── */}
          <rect x={stepX} y={stepY} width={stepW} height={stepH} rx="8"
            fill="var(--slide-bg-accent-muted)" stroke="var(--slide-accent)" strokeWidth="2" />
          <text x={stepX + stepW / 2} y={stepY + 26} textAnchor="middle" fontSize="13" fontWeight="700"
            fill="var(--slide-accent)">Mix</text>
          <text x={stepX + stepW / 2} y={stepY + 40} textAnchor="middle" fontSize="7.5"
            fill="var(--slide-text)" opacity="0.45">the step itself</text>
          <line x1={stepX + 14} y1={stepY + 50} x2={stepX + stepW - 14} y2={stepY + 50}
            stroke="var(--slide-accent)" strokeWidth="0.8" opacity="0.25" />

          <text x={stepX + stepW / 2} y={stepY + 72} textAnchor="middle" fontSize="8" fontWeight="700"
            letterSpacing="0.5" fill="var(--slide-text)" opacity="0.4">ONE PROPERTY OF THE STEP</text>
          {renderPills([{ label: 'Duration', known: false }], stepX, stepW, stepY + 82)}

          <text x={stepX + stepW / 2} y={stepY + stepH - 14} textAnchor="middle" fontSize="7.5"
            fill="var(--slide-accent)" opacity="0.7">part of the reality realised through execution, not one of the outset knowns</text>

          {/* ── LEGEND ── */}
          <g transform="translate(190, 336)">
            <rect x={0} y={0} width={14} height={14} rx="7"
              fill="var(--slide-bg-card)" stroke="var(--slide-primary)" strokeWidth="1" opacity="0.55" />
            <text x={20} y={11} fontSize="8" fill="var(--slide-text)" opacity="0.7">
              Determinable at the outset
            </text>
          </g>
          <g transform="translate(370, 336)">
            <rect x={0} y={0} width={14} height={14} rx="7"
              fill="var(--slide-bg-card)" stroke="var(--slide-primary)" strokeWidth="1" strokeDasharray="3,2" opacity="0.65" />
            <text x={20} y={11} fontSize="8" fill="var(--slide-text)" opacity="0.7">
              Realised through execution
            </text>
          </g>
        </svg>
      </div>
    </SlideLayout>
  );
}
