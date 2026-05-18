import { SlideLayout } from '@/components/slides/SlideLayout';

export function LongGameSlide() {
  const viewW = 660;
  const viewH = 268;

  // Three tiers stacked vertically, left side
  const tierX = 14; const tierW = 240;
  const tierH = 58; const tierGap = 16;
  const tier1Y = 14;
  const tier2Y = tier1Y + tierH + tierGap;
  const tier3Y = tier2Y + tierH + tierGap;

  const tierCx = tierX + tierW / 2;
  const tierCy = (y: number) => y + tierH / 2;

  // Right side: outcome rows
  const divX  = 290;
  const rx     = divX + 14;
  const rw     = viewW - rx - 14;
  const rowH   = 52; const rowGap = 12;

  const outcomes = [
    {
      label:   'Tool Layer',
      color:   'var(--slide-primary)',
      bg:      'var(--slide-bg-primary-muted)',
      border:  'var(--slide-border-primary)',
      heading: 'Equipment that guides its own use',
      body:    'Every tool ships with a configurable process layer. The operator runs their spec through Merit and receives a structured process plan, time forecasts, and safety gates - all tailored to the job.',
    },
    {
      label:   'Fleet Layer',
      color:   'var(--slide-primary)',
      bg:      'var(--slide-bg-primary-muted)',
      border:  'var(--slide-border-primary)',
      heading: 'A live view across every connected tool',
      body:    'The toolmaker sees utilization, performance, and maintenance signals across their entire installed base in real time. Customer success becomes proactive, not reactive.',
    },
    {
      label:   'Sector Layer',
      color:   'var(--slide-accent)',
      bg:      'var(--slide-bg-accent-muted)',
      border:  'var(--slide-accent)',
      heading: 'The operational standard for the sector',
      body:    'As adoption grows, the toolmaker\'s process model becomes the reference point for the sector. They set the standard, coordinate the ecosystem, and administer performance across every operator and associated organization using their equipment.',
    },
  ];

  const arrowY = [
    tier1Y + tierH + 2,
    tier2Y + tierH + 2,
  ];

  return (
    <SlideLayout
      title="The Sector Play"
      subtitle="The toolmaker begins with a better product. Over time, they become the infrastructure their sector runs on."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox={`0 0 ${viewW} ${viewH}`} style={{ width: '100%', height: '100%' }}>
          <defs>
            <marker id="arr-lg-down" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto" markerUnits="userSpaceOnUse">
              <polygon points="0 0, 8 3, 0 6" fill="var(--slide-primary)" opacity="0.45" />
            </marker>
            <marker id="arr-lg" markerWidth="9" markerHeight="7" refX="0" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
              <polygon points="0 0, 9 3.5, 0 7" fill="var(--slide-primary)" opacity="0.45" />
            </marker>
            <marker id="arr-lg-acc" markerWidth="9" markerHeight="7" refX="0" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
              <polygon points="0 0, 9 3.5, 0 7" fill="var(--slide-accent)" opacity="0.55" />
            </marker>
          </defs>

          {/* ── TIER BOXES ── */}
          {outcomes.map(({ label, bg, border, color }, i) => {
            const y = [tier1Y, tier2Y, tier3Y][i];
            const isAccent = i === 2;
            return (
              <g key={label}>
                <rect x={tierX} y={y} width={tierW} height={tierH} rx="8"
                  fill={bg} stroke={border} strokeWidth={isAccent ? 2 : 1.5} />
                <text x={tierCx} y={y + 22} textAnchor="middle" fontSize="11" fontWeight="700"
                  fill={color}>{label}</text>
                <line x1={tierX + 16} y1={y + 30} x2={tierX + tierW - 16} y2={y + 30}
                  stroke={border} strokeWidth="0.8" opacity="0.3" />
                {i === 0 && (
                  <text x={tierCx} y={y + 45} textAnchor="middle" fontSize="7.5"
                    fill="var(--slide-text)" opacity="0.5">connected tools · job-level process</text>
                )}
                {i === 1 && (
                  <text x={tierCx} y={y + 45} textAnchor="middle" fontSize="7.5"
                    fill="var(--slide-text)" opacity="0.5">fleet visibility · predictive maintenance</text>
                )}
                {i === 2 && (
                  <text x={tierCx} y={y + 45} textAnchor="middle" fontSize="7.5"
                    fill="var(--slide-accent)" opacity="0.65">sector standard · ecosystem administration</text>
                )}
              </g>
            );
          })}

          {/* ── DOWN ARROWS between tiers ── */}
          {arrowY.map((y, i) => (
            <line key={i}
              x1={tierCx} y1={y + 2}
              x2={tierCx} y2={y + tierGap - 8}
              stroke="var(--slide-primary)" strokeWidth="1.3" opacity="0.35"
              markerEnd="url(#arr-lg-down)" />
          ))}

          {/* ── DIVIDER ── */}
          <line x1={divX} y1={12} x2={divX} y2={viewH - 16}
            stroke="var(--slide-border-primary)" strokeWidth="1" opacity="0.2" />

          {/* ── RIGHT COLUMN OUTCOMES ── */}
          {outcomes.map(({ label, heading, body, color, border }, i) => {
            const y = tier1Y + i * (rowH + rowGap);
            const isAccent = i === 2;
            const connY = tierCy([tier1Y, tier2Y, tier3Y][i]);
            return (
              <g key={`out-${label}`}>
                {/* Connector line */}
                <path
                  d={`M ${tierX + tierW + 2} ${connY} H ${divX - 2}`}
                  fill="none"
                  stroke={isAccent ? 'var(--slide-accent)' : 'var(--slide-primary)'}
                  strokeWidth="1.1"
                  strokeDasharray="4,3"
                  opacity="0.25"
                  markerEnd={isAccent ? 'url(#arr-lg-acc)' : 'url(#arr-lg)'}
                />

                <text x={rx} y={y + 13} fontSize="8" fontWeight="700"
                  fill={color} opacity="0.85">{heading}</text>
                <foreignObject x={rx} y={y + 16} width={rw} height={rowH - 14}>
                  <div
                    // @ts-ignore
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{ fontSize: '8px', lineHeight: 1.55, color: 'var(--slide-text)', opacity: 0.7 }}
                  >
                    {body}
                  </div>
                </foreignObject>
                {i < outcomes.length - 1 && (
                  <line x1={rx} y1={y + rowH + rowGap / 2} x2={rx + rw} y2={y + rowH + rowGap / 2}
                    stroke="var(--slide-border-primary)" strokeWidth="0.5" opacity="0.2" />
                )}
              </g>
            );
          })}

          {/* ── BOTTOM NOTE ── */}
          <line x1={16} y1={viewH - 20} x2={viewW - 16} y2={viewH - 20}
            stroke="var(--slide-border-primary)" strokeWidth="0.6" opacity="0.18" />
          <text x={viewW / 2} y={viewH - 7} textAnchor="middle" fontSize="7"
            fill="var(--slide-text)" opacity="0.28">
            The toolmaker does not need to build a platform. Merit is the platform. They configure and deploy.
          </text>
        </svg>
      </div>
    </SlideLayout>
  );
}
