import { SlideLayout } from '@/components/slides/SlideLayout';

export function AdvantageSlide() {
  const outcomes = [
    { dimension: 'Measurability', outcome: 'Know which jobs made money and why, from the data rather than from memory.' },
    { dimension: 'Predictability', outcome: 'Quote delivery dates your factory can stand behind, grounded in your own history.' },
    { dimension: 'Transparency',  outcome: 'Every stakeholder sees the same picture of every project, updated in real time.' },
    { dimension: 'Planning',      outcome: 'Each spec builds on everything you have learned. Nothing starts from scratch.' },
    { dimension: 'Evaluation',    outcome: 'Select and reward people based on what they have actually delivered.' },
    { dimension: 'Integration',   outcome: 'One system. One version of every project, shared across every team.' },
  ];

  // Flywheel geometry
  const bw = 88, bh = 44;
  const hgap = 50, vgap = 44;
  const fl = 22;  // left edge
  const t  = 56;  // top row y

  const boxes = {
    spec: { x: fl,           y: t,          label: 'Specify',  sub: 'the project'       },
    exec: { x: fl+bw+hgap,   y: t,          label: 'Execute',  sub: 'against the plan'  },
    capt: { x: fl+bw+hgap,   y: t+bh+vgap,  label: 'Capture',  sub: 'outcomes & data'   },
    impr: { x: fl,           y: t+bh+vgap,  label: 'Improve',  sub: 'forecasts & plans' },
  };

  const cx = (b: { x: number }) => b.x + bw / 2;
  const cy = (b: { y: number }) => b.y + bh / 2;
  const br = (b: { x: number }) => b.x + bw;   // box right
  const bb = (b: { y: number }) => b.y + bh;   // box bottom

  const mw = 10; // arrowhead marker width

  // Right column
  const divX  = 272;
  const rx    = divX + 14;
  const rw    = 650 - rx;
  const rowH  = 34;
  const rowGap = 5;
  const totalH = outcomes.length * rowH + (outcomes.length - 1) * rowGap;
  const ry0   = (250 - totalH) / 2;

  return (
    <SlideLayout
      title="The Compounding Advantage"
      subtitle="Merit captures what you already do. The data accumulates. Your ability to forecast, plan, and select improves with every project."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox="0 0 660 295" style={{ width: '100%', height: '100%' }}>
          <defs>
            <marker id="arrowhead-adv" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--slide-primary)" opacity="0.5" />
            </marker>
          </defs>

          {/* ── FLYWHEEL BOXES ── */}
          {Object.values(boxes).map(b => (
            <g key={b.label}>
              <rect x={b.x} y={b.y} width={bw} height={bh} rx="6"
                fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)" strokeWidth="1.5" />
              <text x={cx(b)} y={cy(b) - 4} textAnchor="middle" fontSize="9.5" fontWeight="700"
                fill="var(--slide-primary)">{b.label}</text>
              <text x={cx(b)} y={cy(b) + 10} textAnchor="middle" fontSize="7"
                fill="var(--slide-text)" opacity="0.4">{b.sub}</text>
            </g>
          ))}

          {/* ── FLYWHEEL ARROWS ── */}
          {/* Specify → Execute (rightward) */}
          <line x1={br(boxes.spec) + 2}  y1={cy(boxes.spec)}
                x2={boxes.exec.x - mw - 2} y2={cy(boxes.exec)}
                stroke="var(--slide-primary)" strokeWidth="1.3" opacity="0.4"
                markerEnd="url(#arrowhead-adv)" />
          {/* Execute → Capture (downward) */}
          <line x1={cx(boxes.exec)} y1={bb(boxes.exec) + 2}
                x2={cx(boxes.capt)} y2={boxes.capt.y - mw - 2}
                stroke="var(--slide-primary)" strokeWidth="1.3" opacity="0.4"
                markerEnd="url(#arrowhead-adv)" />
          {/* Capture → Improve (leftward) */}
          <line x1={boxes.capt.x - 2}       y1={cy(boxes.capt)}
                x2={br(boxes.impr) + mw + 2} y2={cy(boxes.impr)}
                stroke="var(--slide-primary)" strokeWidth="1.3" opacity="0.4"
                markerEnd="url(#arrowhead-adv)" />
          {/* Improve → Specify (upward) */}
          <line x1={cx(boxes.impr)} y1={boxes.impr.y - 2}
                x2={cx(boxes.spec)} y2={bb(boxes.spec) + mw + 2}
                stroke="var(--slide-primary)" strokeWidth="1.3" opacity="0.4"
                markerEnd="url(#arrowhead-adv)" />

          {/* Centre label */}
          <text x={fl + bw + hgap / 2} y={t + bh + vgap / 2 - 5} textAnchor="middle"
            fontSize="7.5" fill="var(--slide-text)" opacity="0.28">Every project</text>
          <text x={fl + bw + hgap / 2} y={t + bh + vgap / 2 + 7} textAnchor="middle"
            fontSize="7.5" fill="var(--slide-text)" opacity="0.28">builds on the last</text>

          {/* Divider */}
          <line x1={divX} y1={16} x2={divX} y2={242}
            stroke="var(--slide-border-primary)" strokeWidth="1" opacity="0.25" />

          {/* ── OUTCOMES ── */}
          {outcomes.map(({ dimension, outcome }, i) => {
            const y = ry0 + i * (rowH + rowGap);
            return (
              <g key={dimension}>
                <text x={rx} y={y + 11} fontSize="7" fontWeight="700" letterSpacing="0.5"
                  fill="var(--slide-primary)" opacity="0.7">{dimension.toUpperCase()}</text>
                <foreignObject x={rx} y={y + 14} width={rw} height={rowH - 12}>
                  <div
                    // @ts-ignore
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{ fontSize: '8.5px', lineHeight: 1.5, color: 'var(--slide-text)', opacity: 0.7 }}
                  >
                    {outcome}
                  </div>
                </foreignObject>
                {i < outcomes.length - 1 && (
                  <line x1={rx} y1={y + rowH + rowGap / 2} x2={rx + rw - 10} y2={y + rowH + rowGap / 2}
                    stroke="var(--slide-border-primary)" strokeWidth="0.5" opacity="0.2" />
                )}
              </g>
            );
          })}
          {/* ── IMPACT FOOTER ── */}
          <line x1={16} y1={250} x2={644} y2={250}
            stroke="var(--slide-border-primary)" strokeWidth="0.75" opacity="0.2" />
          {[
            { stat: '10–20%', label: 'productivity uplift',                   cx: 110 },
            { stat: '10–20%', label: 'reduction in management costs',          cx: 330 },
            { stat:  '5–15%', label: 'reduction in total operational costs',   cx: 550 },
          ].map(({ stat, label, cx: x }) => (
            <g key={label}>
              <text x={x} y={268} textAnchor="middle" fontSize="13" fontWeight="700"
                fill="var(--slide-primary)" opacity="0.75">{stat}</text>
              <text x={x} y={281} textAnchor="middle" fontSize="7.5"
                fill="var(--slide-text)" opacity="0.4">{label}</text>
            </g>
          ))}
        </svg>
      </div>
    </SlideLayout>
  );
}
