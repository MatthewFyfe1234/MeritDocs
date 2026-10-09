import { SlideLayout } from '@/components/slides/SlideLayout';

export function ForecastingSlide() {
  const leftX = 20; const leftY = 36; const leftW = 280; const boxH = 204;
  const rightX = 380; const rightY = 36; const rightW = 260;

  const arrowY = leftY + boxH / 2;

  const renderPills = (pills: string[], boxX: number, boxW: number, y: number) => {
    const gap = 6;
    const widths = pills.map(p => p.length * 5.4 + 18);
    const totalW = widths.reduce((s, w) => s + w, 0) + gap * (pills.length - 1);
    let px = boxX + (boxW - totalW) / 2;
    return pills.map((label, i) => {
      const w = widths[i];
      const x = px;
      px += w + gap;
      return (
        <g key={label}>
          <rect x={x} y={y} width={w} height={20} rx="10"
            fill="var(--slide-bg-card)" stroke="var(--slide-primary)" strokeWidth="1" opacity="0.55" />
          <text x={x + w / 2} y={y + 14} textAnchor="middle" fontSize="8" fontWeight="600"
            fill="var(--slide-primary)" opacity="0.9">{label}</text>
        </g>
      );
    });
  };

  return (
    <SlideLayout
      title="Many Descriptors Forecast Many Quantities"
      subtitle="Sponge, the component, carries many descriptors on its specification. Mix, one step in making it, has many quantities of its own: duration, rework, downtime, injuries, quality, and material usage."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox="0 0 660 260" style={{ width: '100%', height: '100%' }}>
          <defs>
            <marker id="arrowhead-fc" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--slide-primary)" opacity="0.55" />
            </marker>
          </defs>

          {/* ── SPONGE (COMPONENT) ── */}
          <text x={leftX} y={leftY - 12} fontSize="8" fontWeight="700" letterSpacing="0.5"
            fill="var(--slide-text)" opacity="0.4">COMPONENT</text>
          <rect x={leftX} y={leftY} width={leftW} height={boxH} rx="8"
            fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)" strokeWidth="1.5" />
          <text x={leftX + leftW / 2} y={leftY + 24} textAnchor="middle" fontSize="13" fontWeight="700"
            fill="var(--slide-primary)">Sponge</text>
          <text x={leftX + leftW / 2} y={leftY + 38} textAnchor="middle" fontSize="7.5"
            fill="var(--slide-text)" opacity="0.45">one component of the specification</text>
          <line x1={leftX + 14} y1={leftY + 48} x2={leftX + leftW - 14} y2={leftY + 48}
            stroke="var(--slide-border-primary)" strokeWidth="0.8" opacity="0.4" />

          <text x={leftX + leftW / 2} y={leftY + 62} textAnchor="middle" fontSize="7.5" fontWeight="700" letterSpacing="0.5"
            fill="var(--slide-text)" opacity="0.4">DESCRIPTORS</text>
          {renderPills(['Volume', 'Diameter'], leftX, leftW, leftY + 70)}
          {renderPills(['Layers', 'Recipe Complexity'], leftX, leftW, leftY + 96)}
          {renderPills(['...'], leftX, leftW, leftY + 122)}

          {/* ── ARROW ── */}
          <line x1={leftX + leftW} y1={arrowY} x2={rightX - 12} y2={arrowY}
            stroke="var(--slide-primary)" strokeWidth="1.5" opacity="0.45" markerEnd="url(#arrowhead-fc)" />
          <text x={(leftX + leftW + rightX) / 2} y={arrowY - 8} textAnchor="middle" fontSize="7.5" fontWeight="600"
            fill="var(--slide-text)" opacity="0.5">forecast</text>

          {/* ── MIX (STEP) ── */}
          <text x={rightX} y={rightY - 12} fontSize="8" fontWeight="700" letterSpacing="0.5"
            fill="var(--slide-text)" opacity="0.4">STEP</text>
          <rect x={rightX} y={rightY} width={rightW} height={boxH} rx="8"
            fill="var(--slide-bg-accent-muted)" stroke="var(--slide-accent)" strokeWidth="2" />
          <text x={rightX + rightW / 2} y={rightY + 24} textAnchor="middle" fontSize="13" fontWeight="700"
            fill="var(--slide-accent)">Mix</text>
          <text x={rightX + rightW / 2} y={rightY + 38} textAnchor="middle" fontSize="7.5"
            fill="var(--slide-text)" opacity="0.45">one step in making Sponge</text>
          <line x1={rightX + 14} y1={rightY + 48} x2={rightX + rightW - 14} y2={rightY + 48}
            stroke="var(--slide-accent)" strokeWidth="0.8" opacity="0.3" />

          <text x={rightX + rightW / 2} y={rightY + 62} textAnchor="middle" fontSize="7.5" fontWeight="700" letterSpacing="0.5"
            fill="var(--slide-text)" opacity="0.4">QUANTITIES OF THE STEP</text>
          {renderPills(['Duration', 'Rework', 'Downtime'], rightX, rightW, rightY + 70)}
          {renderPills(['Injuries', 'Quality Score'], rightX, rightW, rightY + 96)}

          <text x={rightX + rightW / 2} y={rightY + 132} textAnchor="middle" fontSize="7" fontWeight="700" letterSpacing="0.5"
            fill="var(--slide-text)" opacity="0.35">MATERIAL USAGE, PER INGREDIENT</text>
          {renderPills(['Eggs', 'Flour', 'Sugar'], rightX, rightW, rightY + 140)}
          {renderPills(['...'], rightX, rightW, rightY + 166)}
        </svg>
      </div>
    </SlideLayout>
  );
}
