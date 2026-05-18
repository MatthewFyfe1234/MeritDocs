import { SlideLayout } from '@/components/slides/SlideLayout';

export function NetworkEffectSlide() {
  const vW = 660; const vH = 312;

  const cx = 188; const cy = vH / 2 + 4;
  const r = 62;
  const hubR = 44;

  const nodes = [
    {
      label:    'Cities',
      sub:      'municipal operators',
      angle:    -90,
      pull:     'Cities contracting for guaranteed uptime need evidence. Operators with a Merit service record can demonstrate SLA compliance, predict failures before they occur, and negotiate renewals from data rather than assurance. They pull themselves in.',
      distance: r + 42,
      rowH: 65,
    },
    {
      label:    'Service Partners',
      sub:      'certified technician network',
      angle:    0,
      pull:     'A distributed technician network generates normalised service data across equipment types, geographies, and operators. Certified partners who participate build measurable quality records. The data they create becomes their competitive advantage in a market that increasingly demands evidence of capability.',
      distance: r + 42,
      rowH: 80,
    },
    {
      label:    'Insurers',
      sub:      'risk underwriting',
      angle:    90,
      pull:     'Public fleet operators with a Merit maintenance record present granular, tamper-proof risk data at renewal. Insurers who can see real maintenance compliance price it accordingly. The platform earns preferential terms without lobbying for them.',
      distance: r + 42,
      rowH: 65,
    },
    {
      label:    'Regulators',
      sub:      'audit and compliance',
      angle:    180,
      pull:     'Public procurement increasingly mandates auditable maintenance trails. Government audit bodies that recognise a Merit service record no longer need to verify compliance independently. The timestamp becomes the standard.',
      distance: r + 42,
    },
  ];

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const nodePos = (angle: number, dist: number) => ({
    x: cx + Math.cos(toRad(angle)) * dist,
    y: cy + Math.sin(toRad(angle)) * dist,
  });

  const divX = 355;
  const rx = divX + 14;
  const rw = vW - rx - 12;
  const defaultRowH = 52; const rowGap = 8;
  const rowHeights = nodes.map((n: any) => n.rowH ?? defaultRowH);
  const rowOffsets = rowHeights.reduce<number[]>((acc, _, i) => {
    acc.push(i === 0 ? 10 : acc[i - 1] + rowHeights[i - 1] + rowGap);
    return acc;
  }, []);

  return (
    <SlideLayout
      title="The Network Effect"
      subtitle="Each stakeholder that joins the platform makes it more valuable for all the others. The gravity is structural, not sales-driven."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox={`0 0 ${vW} ${vH}`} style={{ width: '100%', height: '100%' }}>

          {nodes.map(({ angle, distance }) => {
            const inner = nodePos(angle, hubR + 4);
            const outer = nodePos(angle, distance - 36);
            return (
              <line key={angle}
                x1={inner.x} y1={inner.y}
                x2={outer.x} y2={outer.y}
                stroke="var(--slide-primary)" strokeWidth="1.2" opacity="0.25"
                strokeDasharray="5,4" />
            );
          })}

          {nodes.map(({ label, sub, angle, distance }) => {
            const pos = nodePos(angle, distance);
            const bw = 108; const bh = 38;
            return (
              <g key={label}>
                <rect x={pos.x - bw / 2} y={pos.y - bh / 2} width={bw} height={bh} rx="6"
                  fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)" strokeWidth="1.5" />
                <text x={pos.x} y={pos.y - 4} textAnchor="middle" fontSize="9" fontWeight="700"
                  fill="var(--slide-primary)">{label}</text>
                <text x={pos.x} y={pos.y + 10} textAnchor="middle" fontSize="7"
                  fill="var(--slide-text)" opacity="0.4">{sub}</text>
              </g>
            );
          })}

          <circle cx={cx} cy={cy} r={hubR + 8}
            fill="var(--slide-bg-muted)" stroke="var(--slide-border-primary)" strokeWidth="0.8" opacity="0.4" />
          <circle cx={cx} cy={cy} r={hubR}
            fill="var(--slide-bg-card)" stroke="var(--slide-primary)" strokeWidth="2" />
          <text x={cx} y={cy - 6} textAnchor="middle" fontSize="11" fontWeight="700"
            fill="var(--slide-primary)">Manufacturer</text>
          <text x={cx} y={cy + 8} textAnchor="middle" fontSize="7.5"
            fill="var(--slide-text)" opacity="0.45">+ Merit platform</text>

          <line x1={divX} y1={8} x2={divX} y2={vH - 8}
            stroke="var(--slide-border-primary)" strokeWidth="1" opacity="0.2" />

          {nodes.map(({ label, pull }, i) => {
            const y = rowOffsets[i];
            const h = rowHeights[i];
            return (
              <g key={`pull-${label}`}>
                <text x={rx} y={y + 11} fontSize="7" fontWeight="700" letterSpacing="0.4"
                  fill="var(--slide-primary)" opacity="0.7">{label.toUpperCase()}</text>
                <foreignObject x={rx} y={y + 14} width={rw} height={h - 14}>
                  <div
                    // @ts-ignore
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{ fontSize: '8px', lineHeight: 1.55, color: 'var(--slide-text)', opacity: 0.7 }}
                  >
                    {pull}
                  </div>
                </foreignObject>
                {i < nodes.length - 1 && (
                  <line x1={rx} y1={y + h + rowGap / 2} x2={rx + rw} y2={y + h + rowGap / 2}
                    stroke="var(--slide-border-primary)" strokeWidth="0.5" opacity="0.18" />
                )}
              </g>
            );
          })}

        </svg>
      </div>
    </SlideLayout>
  );
}
