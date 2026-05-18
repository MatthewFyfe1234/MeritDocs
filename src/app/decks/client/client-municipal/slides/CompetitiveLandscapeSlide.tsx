import { SlideLayout } from '@/components/slides/SlideLayout';

type Score = boolean | 'partial';

export function CompetitiveLandscapeSlide() {
  const vW = 660; const vH = 262;

  const caps = [
    'Machine telemetry',
    'Fleet aggregation',
    'Process verification',
    'Manufacturer spec',
    'Fault attribution',
    'Auditable record',
    'Route planning',
    'Staff scheduling',
    'Documentation',
    'Deterministic benchmarking',
  ];

  const players: {
    name: string;
    examples: string;
    scores: Score[];
    highlight: boolean;
  }[] = [
    {
      name:     'OEM Telematics',
      examples: 'McNeilus/ClearSky, Dennis Eagle/Terberg, Bucher Connect',
      scores:   [true, false, false, false, false, false, false, false, false, false],
      highlight: false,
    },
    {
      name:     'Fleet Platforms',
      examples: 'Samsara, Geotab, Verizon Connect',
      scores:   [true, true, false, false, false, false, false, false, false, false],
      highlight: false,
    },
    {
      name:     'Maintenance Software',
      examples: 'AssetWorks FleetFocus, Chevin FleetWave',
      scores:   [false, true, false, false, false, false, false, 'partial', 'partial', false],
      highlight: false,
    },
    {
      name:     'Merit',
      examples: 'Process as a Service platform',
      scores:   [true, true, true, true, true, true, true, true, true, true],
      highlight: true,
    },
  ];

  const padL = 10; const padR = 10;
  const nameW = 140;
  const capW = (vW - padL - padR - nameW - 10) / caps.length;
  const headerH = 50; const rowH = 40; const rowGap = 4;
  const tableY = 0;
  const rowY = (i: number) => tableY + headerH + i * (rowH + rowGap);
  const capX = (j: number) => padL + nameW + 10 + j * capW + capW / 2;

  const tableBottom = rowY(players.length) - rowGap;
  const footerY = tableBottom + 8;
  const footerH = vH - footerY - 4;

  const circleFill = (score: Score, highlight: boolean) => {
    if (score === true) return highlight ? 'var(--slide-accent)' : 'var(--slide-primary)';
    if (score === 'partial') return 'var(--slide-primary)';
    return 'none';
  };
  const circleStroke = (score: Score) => {
    if (score === true) return 'none';
    return 'var(--slide-border-primary)';
  };
  const circleOpacity = (score: Score, highlight: boolean) => {
    if (score === true) return highlight ? 0.85 : 0.55;
    if (score === 'partial') return 0.25;
    return 0.2;
  };

  return (
    <SlideLayout
      title="Competitive Landscape"
      subtitle="Each existing platform stops short. None closes the loop from manufacturer specification to auditable process record."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox={`0 0 ${vW} ${vH}`} style={{ width: '100%', height: '100%' }}>

          {/* ── COLUMN HEADERS ── */}
          {caps.map((cap, j) => (
            <g key={cap}>
              <foreignObject x={capX(j) - capW / 2 + 2} y={tableY} width={capW - 4} height={headerH - 4}>
                <div
                  // @ts-ignore
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '6.5px', fontWeight: 700, textAlign: 'center', lineHeight: 1.35, color: 'var(--slide-primary)', opacity: 0.55 }}
                >
                  {cap}
                </div>
              </foreignObject>
              <line x1={capX(j) - capW / 2} y1={tableY + headerH - 1}
                x2={capX(j) - capW / 2} y2={tableBottom}
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

                <text x={padL + 4} y={y + 14} fontSize={highlight ? 9.5 : 9} fontWeight="700"
                  fill={highlight ? 'var(--slide-accent)' : 'var(--slide-primary)'}
                  opacity={highlight ? 1 : 0.8}>{name}</text>
                <foreignObject x={padL + 4} y={y + 17} width={nameW - 8} height={rowH - 18}>
                  <div
                    // @ts-ignore
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{ fontSize: '6.5px', color: 'var(--slide-text)', opacity: highlight ? 0.6 : 0.35, lineHeight: 1.3 }}
                  >
                    {examples}
                  </div>
                </foreignObject>

                {scores.map((score, j) => (
                  <circle key={j}
                    cx={capX(j)} cy={y + rowH / 2}
                    r="5"
                    fill={circleFill(score, highlight)}
                    stroke={circleStroke(score)}
                    strokeWidth="1.2"
                    opacity={circleOpacity(score, highlight)} />
                ))}

                {!highlight && i < players.length - 1 && (
                  <line x1={padL} y1={y + rowH + rowGap / 2}
                    x2={vW - padR} y2={y + rowH + rowGap / 2}
                    stroke="var(--slide-border-primary)" strokeWidth="0.5" opacity="0.15" />
                )}
              </g>
            );
          })}

          {/* ── FOOTER NOTE ── */}
          <foreignObject x={padL} y={footerY} width={vW - padL - padR} height={footerH}>
            <div
              // @ts-ignore
              xmlns="http://www.w3.org/1999/xhtml"
              style={{ textAlign: 'center', fontSize: '6.5px', lineHeight: 1.4, color: 'var(--slide-text)', opacity: 0.28 }}
            >
              ClearSky and Terberg Connect confirm the machine's state. Samsara and Geotab confirm that fleet managers want the data. AssetWorks manages maintenance records and scheduling. None verify whether the prescribed procedure was followed, plan routes against a performance model, or return operational intelligence to the manufacturer.
            </div>
          </foreignObject>

        </svg>
      </div>
    </SlideLayout>
  );
}
