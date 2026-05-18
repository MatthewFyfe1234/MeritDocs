import { SlideLayout } from '@/components/slides/SlideLayout';

export function CompetitiveLandscapeSlide() {
  const vW = 660; const vH = 262;

  // Capability columns
  const caps = [
    'Machine telemetry',
    'Fleet aggregation',
    'Process orchestration',
    'Manufacturer spec layer',
    'Fault attribution',
    'Auditable record',
    'Usage benchmarking',
  ];

  // Competitors
  const players = [
    {
      name:     'OEM Telematics',
      examples: '',
      scores:   [true, false, false, false, false, false, false],
      note:     'Machine data only. OEM-locked. No cross-brand view.',
    },
    {
      name:     'Fleet Managers',
      examples: '',
      scores:   [true, true, false, false, false, false, false],
      note:     'Aggregate multi-brand telemetry. Stop at the data layer.',
    },
    {
      name:     'Field Management',
      examples: '',
      scores:   [false, false, true, false, false, false, false],
      note:     'Process focus for specific operations. No manufacturer integration.',
    },
    {
      name:     'DataConnect / iPaaS',
      examples: '',
      scores:   [false, true, false, false, false, false, false],
      note:     'Proves pain: contractors pay to connect silos. Solves nothing upstream.',
    },
    {
      name:     'Merit',
      examples: 'Process as a Service platform',
      scores:   [true, true, true, true, true, true, true],
      note:     'The only platform that spans manufacturer knowledge to contractor execution to auditable record.',
      highlight: true,
    },
  ];

  const padL = 10; const padR = 10;
  const nameW = 130; const exW = 0;
  const capW = (vW - padL - padR - nameW - exW - 10) / caps.length;
  const headerH = 44; const rowH = 33; const rowGap = 5;
  const tableY = -2;
  const rowY = (i: number) => tableY + headerH + i * (rowH + rowGap);

  const capX = (j: number) => padL + nameW + 10 + j * capW + capW / 2;

  return (
    <SlideLayout
      title="Competitive Landscape"
      subtitle="Each existing platform stops short. None closes the loop from manufacturer spec to auditable contractor record."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox={`0 0 ${vW} ${vH}`} style={{ width: '100%', height: '100%' }}>

          {/* ── COLUMN HEADERS ── */}
          {caps.map((cap, j) => (
            <g key={cap}>
              <foreignObject x={capX(j) - capW / 2 + 4} y={tableY} width={capW - 8} height={headerH - 2}>
                <div
                  // @ts-ignore
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '7px', fontWeight: 700, textAlign: 'center', lineHeight: 1.4, color: 'var(--slide-primary)', opacity: 0.55 }}
                >
                  {cap}
                </div>
              </foreignObject>
              <line x1={capX(j) - capW / 2} y1={tableY + headerH - 1}
                x2={capX(j) - capW / 2} y2={tableY + headerH + players.length * (rowH + rowGap) - rowGap}
                stroke="var(--slide-border-primary)" strokeWidth="0.6" opacity="0.2" />
            </g>
          ))}

          <line x1={padL} y1={tableY + headerH - 1}
            x2={vW - padR} y2={tableY + headerH - 1}
            stroke="var(--slide-border-primary)" strokeWidth="1" opacity="0.3" />

          {/* ── PLAYER ROWS ── */}
          {players.map(({ name, examples, scores, highlight }, i) => {
            const y = rowY(i);
            return (
              <g key={name}>
                {highlight && (
                  <rect x={padL - 2} y={y - 2} width={vW - padL - padR + 4} height={rowH + 4} rx="5"
                    fill="var(--slide-bg-accent-muted)" stroke="var(--slide-accent)" strokeWidth="1.5" />
                )}

                {/* Name */}
                <text x={padL + 4} y={y + 13} fontSize={highlight ? 9.5 : 9} fontWeight="700"
                  fill={highlight ? 'var(--slide-accent)' : 'var(--slide-primary)'}
                  opacity={highlight ? 1 : 0.8}>{name}</text>
                <foreignObject x={padL + 4} y={y + 15} width={nameW - 8} height={rowH - 16}>
                  <div
                    // @ts-ignore
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{ fontSize: '6.5px', color: 'var(--slide-text)', opacity: highlight ? 0.6 : 0.35, lineHeight: 1.3 }}
                  >
                    {examples}
                  </div>
                </foreignObject>

                {/* Capability dots */}
                {scores.map((filled, j) => (
                  <circle key={j}
                    cx={capX(j)} cy={y + rowH / 2}
                    r="6"
                    fill={filled ? (highlight ? 'var(--slide-accent)' : 'var(--slide-primary)') : 'none'}
                    stroke={filled ? 'none' : 'var(--slide-border-primary)'}
                    strokeWidth="1.2"
                    opacity={filled ? (highlight ? 0.85 : 0.55) : 0.2} />
                ))}

                {/* Row separator */}
                {!highlight && i < players.length - 1 && (
                  <line x1={padL} y1={y + rowH + rowGap / 2}
                    x2={vW - padR} y2={y + rowH + rowGap / 2}
                    stroke="var(--slide-border-primary)" strokeWidth="0.5" opacity="0.15" />
                )}
              </g>
            );
          })}

          {/* ── GAP LABEL ── */}
          <text x={vW / 2} y={vH - 6} textAnchor="middle" fontSize="7"
            fill="var(--slide-text)" opacity="0.28">
            Each platform captures one part of the picture. None attribute fault, return usage intelligence to the maker, or connect manufacturer specification to an auditable contractor record.
          </text>

        </svg>
      </div>
    </SlideLayout>
  );
}
