import { SlideLayout } from '@/components/slides/SlideLayout';

export function PaaSSlide() {
  const vW = 660; const vH = 268;

  // Two model columns
  const oldX = 14;  const oldW = 246;
  const newX = 400; const newW = 246;
  const midX = oldX + oldW + (newX - oldX - oldW) / 2;

  const colH = 210;
  const colY = 30;

  // Old model rows
  const oldRows = [
    { label: 'Revenue',    val: 'One-time sale',         dim: true },
    { label: 'Visibility', val: 'Ends at delivery',      dim: true },
    { label: 'Data',       val: 'None returned',         dim: true },
    { label: 'Margin',     val: 'Compresses over time',  dim: true },
    { label: 'Retention',  val: 'Next tender cycle',     dim: true },
  ];

  // New model rows
  const newRows = [
    { label: 'Revenue',    val: 'Recurring subscription + outcomes' },
    { label: 'Visibility', val: 'Every job, in real time'           },
    { label: 'Data',       val: 'Full execution record returned'    },
    { label: 'Margin',     val: 'Expands as the dataset matures'    },
    { label: 'Retention',  val: 'Embedded in the operator\'s process' },
  ];

  const rowH = 30; const rowGap = 6; const rowY0 = colY + 44;
  const rowCy = (i: number) => rowY0 + i * (rowH + rowGap) + rowH / 2;

  // EaaS stats at the bottom
  const stats = [
    { val: '25%',     label: 'higher lifecycle revenue vs one-time sale' },
    { val: '6%',      label: 'CAGR for EaaS models through 2032'         },
    { val: '$2T',     label: 'total EaaS potential in manufacturing (McKinsey)' },
  ];

  return (
    <SlideLayout
      title="Process as a Service"
      subtitle="The hardware sale is a one-time event. The process relationship is permanent. The manufacturer who enables both owns the customer."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox={`0 0 ${vW} ${vH}`} style={{ width: '100%', height: '100%' }}>
          <defs>
            <marker id="arr-paas" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--slide-primary)" opacity="0.5" />
            </marker>
          </defs>

          {/* ── OLD MODEL ── */}
          <rect x={oldX} y={colY} width={oldW} height={colH} rx="8"
            fill="var(--slide-bg-muted)" stroke="var(--slide-border)" strokeWidth="1.3" opacity="0.7" />
          <text x={oldX + oldW / 2} y={colY + 18} textAnchor="middle" fontSize="10" fontWeight="700"
            fill="var(--slide-text)" opacity="0.4">Hardware Sale</text>
          <text x={oldX + oldW / 2} y={colY + 30} textAnchor="middle" fontSize="7"
            fill="var(--slide-text)" opacity="0.3">deliver, invoice, disappear</text>

          {oldRows.map(({ label, val }, i) => (
            <g key={label}>
              <rect x={oldX + 10} y={rowY0 + i * (rowH + rowGap)} width={oldW - 20} height={rowH} rx="4"
                fill="var(--slide-bg-muted)" stroke="var(--slide-border)" strokeWidth="0.8" opacity="0.5" />
              <text x={oldX + 20} y={rowCy(i) - 3} fontSize="6.5" fontWeight="700"
                fill="var(--slide-text)" opacity="0.3">{label.toUpperCase()}</text>
              <text x={oldX + 20} y={rowCy(i) + 10} fontSize="8"
                fill="var(--slide-text)" opacity="0.35">{val}</text>
            </g>
          ))}

          {/* ── ARROW ── */}
          <line x1={oldX + oldW + 8} y1={colY + colH / 2}
            x2={newX - 10} y2={colY + colH / 2}
            stroke="var(--slide-primary)" strokeWidth="1.5" opacity="0.4"
            markerEnd="url(#arr-paas)" />
          <text x={midX} y={colY + colH / 2 - 8} textAnchor="middle" fontSize="7.5" fontWeight="700"
            fill="var(--slide-primary)" opacity="0.55">Merit</text>
          <text x={midX} y={colY + colH / 2 + 5} textAnchor="middle" fontSize="6.5"
            fill="var(--slide-text)" opacity="0.3">process layer</text>

          {/* ── NEW MODEL ── */}
          <rect x={newX} y={colY} width={newW} height={colH} rx="8"
            fill="var(--slide-bg-card)" stroke="var(--slide-primary)" strokeWidth="2" />
          <text x={newX + newW / 2} y={colY + 18} textAnchor="middle" fontSize="10" fontWeight="700"
            fill="var(--slide-primary)">Process as a Service</text>
          <text x={newX + newW / 2} y={colY + 30} textAnchor="middle" fontSize="7"
            fill="var(--slide-text)" opacity="0.45">spec, execute, improve, repeat</text>

          {newRows.map(({ label, val }, i) => (
            <g key={label}>
              <rect x={newX + 10} y={rowY0 + i * (rowH + rowGap)} width={newW - 20} height={rowH} rx="4"
                fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)" strokeWidth="1.2" />
              <text x={newX + 20} y={rowCy(i) - 3} fontSize="6.5" fontWeight="700"
                fill="var(--slide-primary)" opacity="0.55">{label.toUpperCase()}</text>
              <text x={newX + 20} y={rowCy(i) + 10} fontSize="8" fontWeight="500"
                fill="var(--slide-primary)" opacity="0.85">{val}</text>
            </g>
          ))}

          {/* ── BOTTOM STATS ── */}
          <line x1={14} y1={vH - 38} x2={vW - 14} y2={vH - 38}
            stroke="var(--slide-border-primary)" strokeWidth="0.6" opacity="0.2" />
          {stats.map(({ val, label }, i) => {
            const cx = 110 + i * 220;
            return (
              <g key={label}>
                <text x={cx} y={vH - 20} textAnchor="middle" fontSize="14" fontWeight="700"
                  fill="var(--slide-primary)" opacity="0.75">{val}</text>
                <text x={cx} y={vH - 7} textAnchor="middle" fontSize="7"
                  fill="var(--slide-text)" opacity="0.4">{label}</text>
              </g>
            );
          })}
        </svg>
      </div>
    </SlideLayout>
  );
}
