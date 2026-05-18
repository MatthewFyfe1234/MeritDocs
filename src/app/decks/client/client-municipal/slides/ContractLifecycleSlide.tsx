import { SlideLayout } from '@/components/slides/SlideLayout';

export function ContractLifecycleSlide() {
  const vW = 660; const vH = 278;

  const lPad = 8;
  const colW = 95;
  const colGap = 8;
  const colXs = [lPad, lPad + colW + colGap, lPad + 2 * (colW + colGap)];
  const statsX = colXs[2] + colW + colGap;
  const statsW = 110;
  const divX = statsX + statsW + 10;
  const meritX = divX + 16;
  const meritW = vW - meritX - 6;

  const colTop = 4;
  const bodyTop = 36;
  const bodyH = vH - 22 - bodyTop;

  const years = [
    {
      label: 'YEAR 1', sub: 'The Honeymoon',
      color: '#4E8B5F',
      body: 'The contract is priced on standard assumptions - predicted duty cycles, estimated maintenance intervals, historical failure rates. The vehicle is under warranty. The model looks credible. The exposure is already built in.',
    },
    {
      label: 'YEAR 2', sub: 'The Divergence',
      color: '#6B8C74',
      body: 'Operator behaviour diverges from the assumed profile. Reactive maintenance replaces planned. Emergency parts cost more than stocked. The margin is leaving. Nothing in the record shows where it went.',
    },
    {
      label: 'YEAR 3', sub: 'The Reckoning',
      color: '#64748B',
      body: 'The contract is loss-making. The cause is disputed - manufacturer, operator, specification. The next contract is quoted from the same spreadsheet. Same assumptions. Same exposure.',
    },
  ];

  const meritItems = [
    {
      val: 'Evidenced pricing',
      desc: "The next contract starts from the last one's verified operational record. The assumptions that built the year 1 exposure are replaced with what actually happened.",
    },
    {
      val: 'Attributable costs',
      desc: 'Operator-induced failures are identified and documented before claims arrive. The margin absorbed in year 2 becomes excludable from the next price.',
    },
    {
      val: 'Defined renewal',
      desc: 'Each contract leaves a verified record. Renewal is a data review, not a negotiation from scratch on the same assumptions.',
    },
  ];

  const meritStatH = bodyH / meritItems.length;

  const erosionItems = [
    { stat: '15–20%',    label: 'of planned margin gone before erosion is detected',       ref:  8 },
    { stat: '+28%',      label: 'technician wage inflation 2019–2024, rarely indexed',     ref:  9 },
    { stat: '3–5×',      label: 'cost of reactive vs planned maintenance',                 ref:  7 },
    { stat: '200–300%',  label: 'emergency parts premium above contract price',            ref: 10 },
    { stat: '400–800bps',label: 'revenue leakage from pricing discipline',                 ref:  5 },
  ];
  const erosionTotal = { stat: '1 in 4', label: 'service contracts ends in loss for the provider', ref: 11 };
  const itemH = Math.floor((bodyH - 32) / erosionItems.length);
  const erosionDividerY = bodyTop + erosionItems.length * itemH + 4;

  return (
    <SlideLayout
      title="Every Contract You Price Is a Bet"
      subtitle="Without operational data, every service contract is priced on assumptions. Merit turns the next one into evidence."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox={`0 0 ${vW} ${vH}`} style={{ width: '100%', height: '100%' }}>

          {/* ── YEAR COLUMNS ── */}
          {years.map(({ label, sub, color, body }, ci) => {
            const x = colXs[ci];
            return (
              <g key={label}>
                <rect x={x} y={colTop} width={colW} height={3} fill={color} opacity="0.55" rx="1" />
                <text x={x + 4} y={colTop + 14} fontSize="7.5" fontWeight="700" letterSpacing="0.6"
                  fill={color} opacity="0.85">{label}</text>
                <text x={x + 4} y={colTop + 25} fontSize="7"
                  fill="var(--slide-text)" opacity="0.4">{sub}</text>
                <line x1={x} y1={colTop + 30} x2={x + colW} y2={colTop + 30}
                  stroke={color} strokeWidth="0.5" opacity="0.2" />
                <foreignObject x={x + 4} y={bodyTop} width={colW - 8} height={bodyH}>
                  <div
                    // @ts-ignore
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{ fontSize: '7px', lineHeight: 1.55, color: 'var(--slide-text)', opacity: 0.62 }}
                  >
                    {body}
                  </div>
                </foreignObject>
              </g>
            );
          })}

          {/* ── EROSION STATS COLUMN ── */}
          <rect x={statsX} y={colTop} width={statsW} height={3} fill="var(--slide-primary)" opacity="0.3" rx="1" />
          <text x={statsX + 4} y={colTop + 14} fontSize="7.5" fontWeight="700" letterSpacing="0.6"
            fill="var(--slide-primary)" opacity="0.45">THE EROSION</text>
          <line x1={statsX} y1={colTop + 30} x2={statsX + statsW} y2={colTop + 30}
            stroke="var(--slide-primary)" strokeWidth="0.5" opacity="0.15" />

          {erosionItems.map((item, i) => {
            const y = bodyTop + i * itemH;
            return (
              <g key={i}>
                <text x={statsX + 4} y={y + 11} fontSize="9.5" fontWeight="700"
                  fill="var(--slide-primary)" opacity="0.75">{item.stat}</text>
                <foreignObject x={statsX + 4} y={y + 13} width={statsW - 8} height={itemH - 14}>
                  <div
                    // @ts-ignore
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{ fontSize: '6px', lineHeight: 1.4, color: 'var(--slide-text)', opacity: 0.5 }}
                  >
                    {item.label}
                    <sup style={{ color: 'var(--slide-accent)', fontWeight: 600, fontSize: '5px', marginLeft: '1px' }}>[{item.ref}]</sup>
                  </div>
                </foreignObject>
              </g>
            );
          })}

          <line x1={statsX} y1={erosionDividerY} x2={statsX + statsW} y2={erosionDividerY}
            stroke="var(--slide-border-primary)" strokeWidth="0.8" opacity="0.3" />

          <text x={statsX + 4} y={erosionDividerY + 13} fontSize="11" fontWeight="700"
            fill="var(--slide-accent)" opacity="0.85">{erosionTotal.stat}</text>
          <foreignObject x={statsX + 4} y={erosionDividerY + 16} width={statsW - 8} height={22}>
            <div
              // @ts-ignore
              xmlns="http://www.w3.org/1999/xhtml"
              style={{ fontSize: '6px', lineHeight: 1.4, color: 'var(--slide-text)', opacity: 0.55 }}
            >
              {erosionTotal.label}
              <sup style={{ color: 'var(--slide-accent)', fontWeight: 600, fontSize: '5px', marginLeft: '1px' }}>[{erosionTotal.ref}]</sup>
            </div>
          </foreignObject>

          {/* ── DIVIDING LINE ── */}
          <line x1={divX} y1={colTop} x2={divX} y2={vH - 22}
            stroke="var(--slide-accent)" strokeWidth="1" opacity="0.35" strokeDasharray="4,3" />

          {/* ── MERIT PANEL ── */}
          <rect x={meritX} y={colTop} width={meritW} height={3}
            fill="var(--slide-accent)" opacity="0.55" rx="1" />
          <text x={meritX + 4} y={colTop + 14} fontSize="7.5" fontWeight="700" letterSpacing="0.6"
            fill="var(--slide-accent)" opacity="0.85">WITH MERIT</text>
          <line x1={meritX} y1={colTop + 30} x2={meritX + meritW} y2={colTop + 30}
            stroke="var(--slide-accent)" strokeWidth="0.5" opacity="0.2" />
          {meritItems.map((item, i) => (
            <foreignObject key={i} x={meritX + 4} y={bodyTop + i * meritStatH} width={meritW - 8} height={meritStatH - 4}>
              <div
                // @ts-ignore
                xmlns="http://www.w3.org/1999/xhtml"
                style={{ fontSize: '6.5px', lineHeight: 1.5 }}
              >
                <strong style={{ color: 'var(--slide-accent)', fontSize: '7px' }}>{item.val} </strong>
                <span style={{ color: 'var(--slide-text)', opacity: 0.62 }}>{item.desc}</span>
              </div>
            </foreignObject>
          ))}

          {/* ── CLOSING STATEMENT ── */}
          <line x1={lPad} y1={vH - 20} x2={vW - 8} y2={vH - 20}
            stroke="var(--slide-border-primary)" strokeWidth="0.5" opacity="0.18" />
          <text x={vW / 2} y={vH - 7} textAnchor="middle"
            fontSize="8" fontWeight="600" fontStyle="italic"
            fill="var(--slide-text)" opacity="0.5">
            "The data from this contract is the pricing model for the next one."
          </text>

        </svg>
      </div>
    </SlideLayout>
  );
}
