import { SlideLayout } from '@/components/slides/SlideLayout';

export function ValueCaptureSlide() {
  const vW = 660; const vH = 310;
  const barW = 95; const barH = 249; const barTop = 8; const barLeft = 165;

  const segments = [
    { key: 'labour',     label: 'Operator Labour',     pctLabel: '~28%', pct: 0.28 },
    { key: 'fuel',       label: 'Fuel & Energy',        pctLabel: '~14%', pct: 0.14 },
    { key: 'compliance', label: 'Compliance & Admin',   pctLabel: '~5%',  pct: 0.05 },
    { key: 'dispatch',   label: 'Route & Dispatch',     pctLabel: '~10%', pct: 0.10 },
    { key: 'insurance',  label: 'Insurance',            pctLabel: '~7%',  pct: 0.07 },
    { key: 'sla',        label: 'Fault & Liability',    pctLabel: '~8%',  pct: 0.08 },
    { key: 'parts',      label: 'Parts & Maintenance',  pctLabel: '~16%', pct: 0.16 },
    { key: 'asset',      label: 'Asset / Equipment',    pctLabel: '~12%', pct: 0.12 },
  ];

  let cy = barTop;
  const segs = segments.map(s => {
    const h = s.pct * barH;
    const y = cy; cy += h;
    return { ...s, y, h, midY: y + h / 2 };
  });

  const zones = [
    { key: 'theirs', label: 'THEIR TERRITORY', segKeys: ['labour', 'fuel', 'compliance', 'dispatch'], color: '#64748B' },
    { key: 'grey',   label: 'GREY ZONE',        segKeys: ['insurance', 'sla'],                         color: '#8B806A' },
    { key: 'yours',  label: 'YOUR TERRITORY',   segKeys: ['parts', 'asset'],                           color: 'var(--slide-accent)' },
  ] as const;

  type ZoneKey = typeof zones[number]['key'];

  const zoneSpans = zones.map(z => {
    const zSegs = segs.filter(s => (z.segKeys as readonly string[]).includes(s.key));
    const topY = Math.min(...zSegs.map(s => s.y));
    const botY = Math.max(...zSegs.map(s => s.y + s.h));
    return { ...z, topY, botY, midY: (topY + botY) / 2, height: botY - topY };
  });

  const bracketX = 9;

  const annX = barLeft + barW + 22;
  const rw = vW - annX - 10;

  const zoneColor: Record<ZoneKey, string> = {
    yours:  'var(--slide-accent)',
    grey:   '#8B806A',
    theirs: '#64748B',
  };

  const segZone: Record<string, ZoneKey> = {};
  zones.forEach(z => (z.segKeys as readonly string[]).forEach(k => { segZone[k] = z.key; }));

  const annotations: { key: string; text: string; zone: ZoneKey; annY: number }[] = [
    { key: 'labour',    zone: 'theirs', annY: 4,   text: 'Every operator runs the route differently. When performance varies or an incident occurs, no record establishes what actually happened or whether correct procedure was followed.' },
    { key: 'fuel',      zone: 'theirs', annY: 40,  text: 'Idle time, route deviation, and operator behaviour all drive consumption. Without a verified activity record, none of it can be attributed, challenged, or reduced at renewal.' },
    { key: 'compliance',zone: 'theirs', annY: 76,  text: 'Every audit and FOI request demands a verified record the city struggles to produce. When the documentation trail does not exist, the contractor carries blame regardless of where fault lies.' },
    { key: 'dispatch',  zone: 'theirs', annY: 112, text: 'Routes run long and the cause is never established - equipment, operator, or scheduling. The problem recurs because nothing was recorded well enough to identify it.' },
    { key: 'insurance', zone: 'grey',   annY: 150, text: 'Premium calculations ignore actual maintenance compliance. When incidents occur, insurers pursue comparative negligence aggressively, and without a process record, fault attribution defaults to whoever has least leverage.' },
    { key: 'sla',       zone: 'grey',   annY: 186, text: 'The service history shows the part was replaced, not whether the prescribed procedure was followed or what the equipment was doing beforehand. Chassis OEM and body builder disputes intensify as the asset ages.' },
    { key: 'parts',     zone: 'yours',  annY: 224, text: 'Emergency procurement runs at 30-60% premium. Records capture what was replaced, not how the vehicle was operated before the failure - the only information that would allow you to predict and prevent the next one.' },
    { key: 'asset',     zone: 'yours',  annY: 260, text: 'You know what failed - because you replaced it. But not how the vehicle was being operated in the hours and days before. Without that operational record, the next design iteration corrects the wrong assumption.' },
  ];

  return (
    <SlideLayout
      title="After the Handshake"
      subtitle="The contract defines what you committed to. The council experiences what they got."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox={`0 0 ${vW} ${vH}`} style={{ width: '100%', height: '100%' }}>

          {/* ── BAR SEGMENTS ── */}
          {segs.map(({ key, y, h, midY, pctLabel }) => {
            const zone = segZone[key];
            const isYours = zone === 'yours';
            const fill = isYours ? 'var(--slide-bg-accent-muted)' : 'var(--slide-bg-muted)';
            return (
              <g key={key}>
                <rect x={barLeft} y={y} width={barW} height={h}
                  fill={fill} fillOpacity={0.7}
                  stroke="var(--slide-bg)" strokeWidth="1" />
                {h >= 10 && (
                  <text x={barLeft + barW / 2} y={midY + 3.5}
                    textAnchor="middle" fontSize={h < 22 ? '5.5' : '7'} fontWeight="600"
                    fill={isYours ? 'var(--slide-accent)' : 'var(--slide-text)'}
                    opacity={isYours ? 0.85 : 0.45}>
                    {pctLabel}
                  </text>
                )}
              </g>
            );
          })}

          {/* Bar border */}
          <rect x={barLeft} y={barTop} width={barW} height={barH}
            fill="none" stroke="var(--slide-border-primary)" strokeWidth="1" rx="2" />

          {/* Zone boundary dashes across bar */}
          {zoneSpans.slice(0, 2).map(z => (
            <line key={`zbnd-${z.key}`}
              x1={barLeft} y1={z.botY} x2={barLeft + barW} y2={z.botY}
              stroke="var(--slide-border-primary)" strokeWidth="0.8" opacity="0.5" strokeDasharray="3,2" />
          ))}

          {/* Segment labels */}
          {segs.map(({ key, label, midY }) => (
            <text key={`lbl-${key}`}
              x={barLeft - 12} y={midY + 3.5}
              textAnchor="end" fontSize="6.5"
              fill="var(--slide-text)" opacity={0.55}>
              {label}
            </text>
          ))}

          {/* ── ZONE BRACKETS ── */}
          {zoneSpans.map(({ key, label, topY, botY, midY, height, color }) => (
            <g key={`zone-${key}`}>
              <line x1={bracketX} y1={topY + 1} x2={bracketX} y2={botY - 1}
                stroke={color} strokeWidth="1.5" opacity="0.5" />
              <line x1={bracketX} y1={topY + 1} x2={bracketX + 6} y2={topY + 1}
                stroke={color} strokeWidth="1.5" opacity="0.5" />
              <line x1={bracketX} y1={botY - 1} x2={bracketX + 6} y2={botY - 1}
                stroke={color} strokeWidth="1.5" opacity="0.5" />
              {height >= 35 ? (
                <text x={bracketX - 3} y={midY} textAnchor="middle"
                  fontSize="5.5" fontWeight="700" letterSpacing="0.5"
                  fill={color} opacity="0.65"
                  transform={`rotate(-90, ${bracketX - 3}, ${midY})`}>
                  {label}
                </text>
              ) : (
                <text x={bracketX + 9} y={midY + 2} textAnchor="start"
                  fontSize="5" fontWeight="700" letterSpacing="0.4"
                  fill={color} opacity="0.7">
                  {label}
                </text>
              )}
            </g>
          ))}

          {/* ── RIGHT ANNOTATIONS ── */}
          {annotations.map(({ key, text, zone, annY }) => {
            const seg = segs.find(s => s.key === key)!;
            const color = zoneColor[zone];
            return (
              <g key={`ann-${key}`}>
                <line
                  x1={barLeft + barW + 5} y1={seg.midY}
                  x2={annX - 5} y2={annY + 6}
                  stroke={color} strokeWidth="0.8" opacity="0.3" />
                <circle cx={barLeft + barW + 5} cy={seg.midY} r="1.5"
                  fill={color} opacity="0.45" />
                <foreignObject x={annX} y={annY} width={rw} height={36}>
                  <div
                    // @ts-ignore
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{ fontSize: '7px', lineHeight: 1.45, color: 'var(--slide-text)', opacity: 0.65 }}
                  >
                    {text}
                  </div>
                </foreignObject>
              </g>
            );
          })}

          {/* Footer */}
          <text x={vW / 2} y={vH - 2} textAnchor="middle" fontSize="5.5"
            fill="var(--slide-text)" opacity="0.28">
            Indicative, based on sector data across municipal fleet and public works service contracts. Merit reduces absolute cost, not cost share.
          </text>

        </svg>
      </div>
    </SlideLayout>
  );
}
