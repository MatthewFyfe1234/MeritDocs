import { SlideLayout } from '@/components/slides/SlideLayout';

export function CompetitiveLandscapeSlide() {
  const vW = 660; const vH = 262;

  const caps = [
    'Specification output',
    'Execution monitoring',
    'Process enforcement',
    'Design-execution link',
    'Fault attribution',
    'Auditable record',
    'Field data return',
  ];

  const players = [
    {
      name:     'CAD / Analysis Tools',
      examples: '',
      scores:   [true, false, false, false, false, false, false],
      note:     'Generate design output. Stop at the file. No connection to what was built.',
    },
    {
      name:     'ERP / MES',
      examples: '',
      scores:   [false, true, false, false, false, false, false],
      note:     'Track production throughput. No specification layer. No link back to design.',
    },
    {
      name:     'QMS / Document Control',
      examples: '',
      scores:   [false, false, false, false, false, true, false],
      note:     'Record what was filed. No enforcement. Audit trail without process.',
    },
    {
      name:     'IoT / Machine Telemetry',
      examples: '',
      scores:   [false, true, false, false, false, false, false],
      note:     'Machine-level data. No design spec linkage. Doesn\'t reach the software vendor.',
    },
    {
      name:     'Merit',
      examples: 'Process as a Service platform',
      scores:   [true, true, true, true, true, true, true],
      note:     'The only platform that closes the loop from design specification to execution record to software feedback.',
      highlight: true,
    },
  ];

  const padL = 10; const padR = 10;
  const nameW = 140;
  const capW = (vW - padL - padR - nameW - 10) / caps.length;
  const headerH = 44; const rowH = 33; const rowGap = 5;
  const tableY = -2;
  const rowY = (i: number) => tableY + headerH + i * (rowH + rowGap);
  const capX = (j: number) => padL + nameW + 10 + j * capW + capW / 2;

  return (
    <SlideLayout
      title="Competitive Landscape"
      subtitle="Each existing platform stops short. None closes the loop from design specification to auditable execution record."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox={`0 0 ${vW} ${vH}`} style={{ width: '100%', height: '100%' }}>

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

          {players.map(({ name, examples, scores, highlight }, i) => {
            const y = rowY(i);
            return (
              <g key={name}>
                {highlight && (
                  <rect x={padL - 2} y={y - 2} width={vW - padL - padR + 4} height={rowH + 4} rx="5"
                    fill="var(--slide-bg-accent-muted)" stroke="var(--slide-accent)" strokeWidth="1.5" />
                )}

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

                {scores.map((filled, j) => (
                  <circle key={j}
                    cx={capX(j)} cy={y + rowH / 2}
                    r="6"
                    fill={filled ? (highlight ? 'var(--slide-accent)' : 'var(--slide-primary)') : 'none'}
                    stroke={filled ? 'none' : 'var(--slide-border-primary)'}
                    strokeWidth="1.2"
                    opacity={filled ? (highlight ? 0.85 : 0.55) : 0.2} />
                ))}

                {!highlight && i < players.length - 1 && (
                  <line x1={padL} y1={y + rowH + rowGap / 2}
                    x2={vW - padR} y2={y + rowH + rowGap / 2}
                    stroke="var(--slide-border-primary)" strokeWidth="0.5" opacity="0.15" />
                )}
              </g>
            );
          })}

          <text x={vW / 2} y={vH - 6} textAnchor="middle" fontSize="7"
            fill="var(--slide-text)" opacity="0.28">
            Each platform captures one part of the picture. None link design specification to execution record, attribute fault, or return field performance data to the software vendor.
          </text>

        </svg>
      </div>
    </SlideLayout>
  );
}
