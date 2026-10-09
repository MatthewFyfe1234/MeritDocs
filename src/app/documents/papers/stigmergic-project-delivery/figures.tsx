/**
 * A pseudo-3D bar in isometric projection: a front face at full colour, top and side faces at
 * reduced opacity to suggest depth without needing real colour math. `baseline` is the y coordinate
 * shared by every box in a figure, so several boxes read as a common ground plane.
 */
function IsoBox({
  x, baseline, width, height, depth = 15, fill, stroke = '#333', dashed = false,
}: {
  x: number; baseline: number; width: number; height: number; depth?: number;
  fill: string; stroke?: string; dashed?: boolean;
}) {
  const dx = depth * 0.87;
  const dy = depth * 0.5;
  const yTop = baseline - height;
  const front = `${x},${yTop} ${x + width},${yTop} ${x + width},${baseline} ${x},${baseline}`;
  const top = `${x},${yTop} ${x + width},${yTop} ${x + width + dx},${yTop - dy} ${x + dx},${yTop - dy}`;
  const side = `${x + width},${yTop} ${x + width + dx},${yTop - dy} ${x + width + dx},${baseline - dy} ${x + width},${baseline}`;
  const dash = dashed ? '4 3' : undefined;
  return (
    <g>
      <polygon points={side} fill={fill} fillOpacity={0.35} stroke={stroke} strokeWidth={1.1} strokeDasharray={dash} />
      <polygon points={top} fill={fill} fillOpacity={0.55} stroke={stroke} strokeWidth={1.1} strokeDasharray={dash} />
      <polygon points={front} fill={fill} fillOpacity={dashed ? 0.15 : 0.85} stroke={stroke} strokeWidth={1.3} strokeDasharray={dash} />
    </g>
  );
}

/** Shared canvas for all three figures, so the same box read as a flat footprint in Figure 1 is
 *  recognisably the same box carrying a height in Figures 2 and 3. */
const FIG_VIEWBOX = '0 0 480 215';
const FIG_WIDTH_PCT = '65%';
const FIG_BASELINE = 175;

/** Component A's steps (p1, q2 from Figure 1): component on the left, steps on the right. The two
 *  letters differ because A's steps fall in different skillset lanes; the mapping, not the lettering,
 *  ties them to A. */
const LEFT_COMPONENT_STEPS = [
  { x: 270, label: 'p1' },
  { x: 350, label: 'q2' },
];

/** Mapping figure: component A maps deterministically to the steps it necessitates. Nothing carries a height
 *  here, component and steps are flat footprints, because no descriptor or metric value exists yet; height
 *  enters only in the scaling figure. Same footprint, position and baseline as the other figures. */
export function MappingFigure() {
  const top = FIG_BASELINE - 40;
  const h = 40;
  const busY = 118;
  const lastX = LEFT_COMPONENT_STEPS[LEFT_COMPONENT_STEPS.length - 1].x + 22;
  return (
    <svg viewBox={FIG_VIEWBOX} style={{ width: FIG_WIDTH_PCT, height: 'auto', display: 'block', margin: '0 auto' }}>
      <defs>
        <marker id="arrow-map" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="#8a6d4a" />
        </marker>
      </defs>
      <rect x={50} y={top} width={65} height={h} rx={3} fill="#8a6d4a" stroke="#5a4630" strokeWidth={1} />
      <text x={82} y={FIG_BASELINE + 20} textAnchor="middle" fontSize={12} fontWeight={600} fill="#8a6d4a">Component A</text>
      <path d={`M82,${top} V${busY} H${lastX}`} fill="none" stroke="#8a6d4a" strokeWidth={1.3} />
      {LEFT_COMPONENT_STEPS.map(s => (
        <g key={s.label}>
          <rect x={s.x} y={top} width={45} height={h} rx={3} fill="#666" stroke="#444" strokeWidth={1} />
          <text x={s.x + 22} y={FIG_BASELINE + 20} textAnchor="middle" fontSize={11} fill="#4a3c28">{s.label}</text>
          <path d={`M${s.x + 22},${busY} V${top - 2}`} fill="none" stroke="#8a6d4a" strokeWidth={1.3} markerEnd="url(#arrow-map)" />
        </g>
      ))}
      <text x={240} y={211} textAnchor="middle" fontSize={10.5} fontStyle="italic" fill="#666">
        deterministic: fixed by the mapping, the same on every instance
      </text>
    </svg>
  );
}

/** Figure 2: descriptor x scales metric y at each step, but the relation is stochastic, not fixed. Both
 *  descriptor x and metric y are read off the height of a box, not its colour or position. */
export function ScalingFigure() {
  const componentHeight = 100;
  const heights = [58, 82]; // metric y recorded at steps p1, q2 on this instance
  return (
    <svg viewBox={FIG_VIEWBOX} style={{ width: FIG_WIDTH_PCT, height: 'auto', display: 'block', margin: '0 auto' }}>
      <IsoBox x={50} baseline={FIG_BASELINE} width={65} height={componentHeight} fill="#8a6d4a" />
      <path
        d={`M40,${FIG_BASELINE} L36,${FIG_BASELINE} M40,${FIG_BASELINE} L40,${FIG_BASELINE - componentHeight} M36,${FIG_BASELINE - componentHeight} L40,${FIG_BASELINE - componentHeight}`}
        stroke="#444" strokeWidth={1}
      />
      <text x={16} y={FIG_BASELINE - componentHeight / 2} fontSize={12} fontWeight={600} fill="#8a6d4a" textAnchor="middle" transform={`rotate(-90 16 ${FIG_BASELINE - componentHeight / 2})`}>
        descriptor x
      </text>
      <text x={82} y={FIG_BASELINE + 20} textAnchor="middle" fontSize={12} fontWeight={600} fill="#8a6d4a">Component A</text>

      <text x={222} y={FIG_BASELINE - 40} fontSize={12} fontWeight={600} fill="#444" textAnchor="middle" transform={`rotate(-90 222 ${FIG_BASELINE - 40})`}>
        metric y
      </text>
      {LEFT_COMPONENT_STEPS.map((s, i) => (
        <g key={s.label}>
          <IsoBox x={s.x} baseline={FIG_BASELINE} width={45} height={heights[i]} fill="#666" />
          <text x={s.x + 22} y={FIG_BASELINE + 20} textAnchor="middle" fontSize={11} fill="#4a3c28">{s.label}</text>
          <path
            d={`M118,${FIG_BASELINE - 55} C170,${FIG_BASELINE - 60} ${s.x - 40},${FIG_BASELINE - heights[i]} ${s.x},${FIG_BASELINE - heights[i] / 2}`}
            fill="none" stroke="#999" strokeWidth={1} strokeDasharray="3 3"
          />
        </g>
      ))}
      <text x={240} y={211} textAnchor="middle" fontSize={10.5} fontStyle="italic" fill="#666">
        stochastic: descriptor x scales the distribution of metric y, not a fixed value
      </text>
    </svg>
  );
}

/** Figure 4: metric y scales with descriptor x (Figure 3). On a new project x is known from the specification
 *  but y is not; the accumulated (x, y) history fits the relationship, and y at the new x is read off it as a
 *  forecast with a spread, not a fixed value. An x-y plot, not the iso boxes, since this is the relationship. */
export function ForecastFigure() {
  const px = (dx: number) => 64 + dx * 42;
  const py = (dy: number) => 178 - dy * 17;
  const history: [number, number][] = [
    [1, 1.2], [1.8, 1.0], [2.5, 2.3], [3.3, 2.0], [4.0, 3.4], [4.8, 3.1], [5.5, 4.6], [6.3, 4.1], [7.0, 5.4],
  ];
  const intercept = 0.35, slope = 0.72;
  const trend = (dx: number) => intercept + slope * dx;
  const newX = 8.2;
  const fY = trend(newX);
  const spread = 1.3;
  return (
    <svg viewBox={FIG_VIEWBOX} style={{ width: FIG_WIDTH_PCT, height: 'auto', display: 'block', margin: '0 auto' }}>
      <line x1={64} y1={40} x2={64} y2={178} stroke="#444" strokeWidth={1} />
      <line x1={64} y1={178} x2={426} y2={178} stroke="#444" strokeWidth={1} />
      <text x={26} y={108} fontSize={12} fontWeight={600} fill="#444" textAnchor="middle" transform="rotate(-90 26 108)">metric y</text>
      <text x={242} y={198} fontSize={12} fontWeight={600} fill="#8a6d4a" textAnchor="middle">descriptor x</text>

      <circle cx={80} cy={30} r={3} fill="#666" />
      <text x={88} y={33} fontSize={9.5} fill="#444">history</text>
      <circle cx={150} cy={30} r={3} fill="#157f8f" />
      <text x={158} y={33} fontSize={9.5} fill="#157f8f">forecast</text>

      <line x1={px(0.2)} y1={py(trend(0.2))} x2={px(8.4)} y2={py(trend(8.4))} stroke="#8a6d4a" strokeWidth={1.2} strokeDasharray="5 3" />
      {history.map(([dx, dy], i) => (
        <circle key={i} cx={px(dx)} cy={py(dy)} r={3} fill="#666" />
      ))}

      <line x1={px(newX)} y1={178} x2={px(newX)} y2={py(fY + spread) - 6} stroke="#999" strokeWidth={1} strokeDasharray="3 2" />
      <text x={px(newX)} y={190} fontSize={9} fill="#666" textAnchor="middle">new x</text>

      <line x1={px(newX)} y1={py(fY - spread)} x2={px(newX)} y2={py(fY + spread)} stroke="#157f8f" strokeWidth={1.5} />
      <line x1={px(newX) - 4} y1={py(fY - spread)} x2={px(newX) + 4} y2={py(fY - spread)} stroke="#157f8f" strokeWidth={1.5} />
      <line x1={px(newX) - 4} y1={py(fY + spread)} x2={px(newX) + 4} y2={py(fY + spread)} stroke="#157f8f" strokeWidth={1.5} />
      <circle cx={px(newX)} cy={py(fY)} r={4} fill="#157f8f" />
      <text x={px(newX) + 8} y={py(fY) + 3} fontSize={9.5} fontWeight={700} fill="#157f8f" textAnchor="start">forecast y</text>
    </svg>
  );
}

/** Concrete instance of ForecastFigure for the patient example: the anaesthetist reads the expected fall in blood
 *  pressure for a proposed dose off prior cases with matching descriptors, and settles on a dose whose forecast
 *  drop stays within a safe range. The counterpart of the wall frame's Panel 3. */
export function AnaesthesiaForecastFigure() {
  const px = (d: number) => 64 + d * 42;
  const py = (v: number) => 178 - v * 17;
  const history: [number, number][] = [
    [1, 1.4], [1.7, 1.1], [2.4, 2.4], [3.1, 2.0], [3.9, 3.3], [4.7, 3.0], [5.4, 4.5], [6.2, 4.1], [6.9, 5.3],
  ];
  const intercept = 0.4, slope = 0.7;
  const trend = (d: number) => intercept + slope * d;
  const proposed = 8.0;
  const fY = trend(proposed);
  const spread = 1.3;
  const safe = 7.0;
  return (
    <svg viewBox={FIG_VIEWBOX} style={{ width: FIG_WIDTH_PCT, height: 'auto', display: 'block', margin: '0 auto' }}>
      <line x1={64} y1={40} x2={64} y2={178} stroke="#444" strokeWidth={1} />
      <line x1={64} y1={178} x2={426} y2={178} stroke="#444" strokeWidth={1} />
      <text x={26} y={108} fontSize={12} fontWeight={600} fill="#444" textAnchor="middle" transform="rotate(-90 26 108)">pressure drop</text>
      <text x={242} y={198} fontSize={12} fontWeight={600} fill="#444" textAnchor="middle">dose (material)</text>

      <circle cx={70} cy={30} r={3} fill="#666" />
      <text x={78} y={33} fontSize={9.5} fill="#444">prior cases</text>
      <circle cx={162} cy={30} r={3} fill="#157f8f" />
      <text x={170} y={33} fontSize={9.5} fill="#157f8f">forecast</text>

      <line x1={64} y1={py(safe)} x2={426} y2={py(safe)} stroke="#b08968" strokeWidth={1} strokeDasharray="2 3" />
      <text x={422} y={py(safe) - 4} fontSize={8.5} fill="#b08968" textAnchor="end">safe limit</text>

      <line x1={px(0.2)} y1={py(trend(0.2))} x2={px(8.4)} y2={py(trend(8.4))} stroke="#8a6d4a" strokeWidth={1.2} strokeDasharray="5 3" />
      {history.map(([d, v], i) => (
        <circle key={i} cx={px(d)} cy={py(v)} r={3} fill="#666" />
      ))}

      <line x1={px(proposed)} y1={178} x2={px(proposed)} y2={py(fY + spread) - 6} stroke="#999" strokeWidth={1} strokeDasharray="3 2" />
      <text x={px(proposed)} y={190} fontSize={9} fill="#666" textAnchor="middle">chosen</text>

      <line x1={px(proposed)} y1={py(fY - spread)} x2={px(proposed)} y2={py(fY + spread)} stroke="#157f8f" strokeWidth={1.5} />
      <line x1={px(proposed) - 4} y1={py(fY - spread)} x2={px(proposed) + 4} y2={py(fY - spread)} stroke="#157f8f" strokeWidth={1.5} />
      <line x1={px(proposed) - 4} y1={py(fY + spread)} x2={px(proposed) + 4} y2={py(fY + spread)} stroke="#157f8f" strokeWidth={1.5} />
      <circle cx={px(proposed)} cy={py(fY)} r={4} fill="#157f8f" />
      <text x={px(proposed) + 8} y={py(fY) + 3} fontSize={9.5} fontWeight={700} fill="#157f8f" textAnchor="start">forecast</text>
    </svg>
  );
}

/**
 * Studs at 600mm centres, always including one flush with the far edge even where that leaves a
 * short final gap. E.g. 1500mm -> [0, 600, 1200, 1500] (last gap 300mm, not 600mm).
 */
function studPositions(widthMm: number): number[] {
  const pos = [0];
  let p = 600;
  while (p < widthMm) { pos.push(p); p += 600; }
  if (pos[pos.length - 1] !== widthMm) pos.push(widthMm);
  return pos;
}

const STUD_LENGTH_MM = 2376;
const RAIL_COUNT = 2;

function memberCounts(widthMm: number) {
  const studCount = studPositions(widthMm).length;
  return { railCount: RAIL_COUNT, studCount, memberCount: RAIL_COUNT + studCount };
}

/** Deterministic minimum wood: sum of member lengths, before waste. */
export function minimalWoodMm(widthMm: number): number {
  const { studCount } = memberCounts(widthMm);
  return widthMm * RAIL_COUNT + STUD_LENGTH_MM * studCount;
}

/** Deterministic minimum nails: 4 per stud (2 into each rail), before misfires. */
export function minimalNails(widthMm: number): number {
  return 4 * memberCounts(widthMm).studCount;
}

/** Elevation diagram of a wall-frame panel: two rails, studs at 600mm centres, optional sheathing. */
export function FrameDiagram({ widthMm, sheathed, fill }: { widthMm: number; sheathed?: boolean; fill?: boolean }) {
  const scale = 280 / 1800; // 1800mm (the widest panel here) draws at 280px
  const w = widthMm * scale;
  const originX = (360 - w) / 2;
  const top = 34;
  const bottom = 130;
  const railT = 7;
  const studW = 5;
  const heightMm = 2376;
  return (
    <svg viewBox="0 0 360 150" style={{ width: fill ? '100%' : '55%', height: 'auto', display: 'block', margin: fill ? '0' : '0 auto' }}>
      <path d={`M${originX},22 L${originX},27 M${originX},22 L${originX + w},22 M${originX + w},22 L${originX + w},27`} stroke="#444" strokeWidth={1} fill="none" />
      <text x={originX + w / 2} y={17} textAnchor="middle" fontSize={11} fill="#444">{widthMm} mm</text>
      <path d={`M${originX - 8},${top} L${originX - 3},${top} M${originX - 8},${top} L${originX - 8},${bottom} M${originX - 8},${bottom} L${originX - 3},${bottom}`} stroke="#444" strokeWidth={1} fill="none" />
      <text x={originX - 12} y={(top + bottom) / 2} textAnchor="middle" fontSize={11} fill="#444" transform={`rotate(-90 ${originX - 12} ${(top + bottom) / 2})`}>{heightMm} mm</text>

      {sheathed && (
        <rect x={originX - 2} y={top - 2} width={w + 4} height={bottom - top + 2} fill="#c9a876" fillOpacity={0.4} stroke="#a3824f" strokeWidth={1} strokeDasharray="3 2" />
      )}

      <rect x={originX} y={top} width={w} height={railT} fill="#8a6d4a" />
      <rect x={originX} y={bottom - railT} width={w} height={railT} fill="#8a6d4a" />
      {studPositions(widthMm).map(p => {
        const x = originX + p * scale - studW / 2;
        return <rect key={p} x={Math.max(originX, Math.min(originX + w - studW, x))} y={top + railT} width={studW} height={bottom - railT * 2 - top} fill="#8a6d4a" />;
      })}

      {sheathed && (
        <text x={originX + w + 14} y={top + 14} fontSize={9.5} fill="#a3824f">sheathing</text>
      )}
      <text x={originX + w / 2} y={143} textAnchor="middle" fontSize={9.5} fill="#666">
        {memberCounts(widthMm).studCount} studs @ 600mm centres
      </text>
    </svg>
  );
}

/** Timeline for a framing panel. Steps run left to right; the nailing step is bounded by telemetric nail
 *  signals, the preceding steps carry no signal and are assumed to split the lead time evenly. Numbers illustrative. */
export function AssemblyTimeline({ T, endLabel, nails, steps }: {
  T: number;
  endLabel: string;
  nails: number[];
  steps: { label: string; end: number; measured?: boolean }[];
}) {
  const x0 = 24, x1 = 340;
  const px = (t: number) => x0 + (t / T) * (x1 - x0);
  const rowY = 48, rowH = 22;
  const nailStart = nails[0], nailEnd = nails[nails.length - 1];
  let cursor = 0;
  const segs = steps.map(s => {
    const seg = { label: s.label, start: cursor, end: s.end, measured: !!s.measured };
    cursor = s.end;
    return seg;
  });
  const firstMeasured = segs.find(s => s.measured);
  const assumedEnd = firstMeasured ? firstMeasured.start : T;
  return (
    <svg viewBox="0 0 404 96" style={{ width: '85%', height: 'auto', display: 'block', margin: '0.5rem auto' }}>
      <line x1={x0 - 20} y1={34} x2={x1 + 36} y2={34} stroke="#b0b0b0" strokeWidth={1} />
      <polygon points={`${x1 + 36},34 ${x1 + 30},31 ${x1 + 30},37`} fill="#b0b0b0" />
      <text x={x1 + 21} y={47} fontSize={8} fill="#b0b0b0" textAnchor="middle" fontStyle="italic">time</text>
      <line x1={x0} y1={28} x2={x0} y2={40} stroke="#888" strokeWidth={1} />
      <text x={x0} y={15} fontSize={8.5} fill="#666" textAnchor="start">job start</text>
      <text x={x1} y={15} fontSize={8.5} fill="#666" textAnchor="end">{endLabel}</text>
      {nails.map((t, i) => (
        <line key={i} x1={px(t)} y1={28} x2={px(t)} y2={40} stroke="#b4531f" strokeWidth={1} />
      ))}
      <text x={(px(nailStart) + px(nailEnd)) / 2} y={24} fontSize={8} fill="#b4531f" textAnchor="middle">{nails.length} nail signals (telemetry)</text>
      {segs.map((s, i) => (
        <rect key={i} x={px(s.start)} y={rowY} width={px(s.end) - px(s.start)} height={rowH}
          fill={s.measured ? '#8a6d4a' : '#efefef'} fillOpacity={s.measured ? 0.25 : 1}
          stroke={s.measured ? '#8a6d4a' : '#aaa'} strokeWidth={1} strokeDasharray={s.measured ? undefined : '3 2'} />
      ))}
      {segs.map((s, i) => (
        <text key={i} x={(px(s.start) + px(s.end)) / 2} y={rowY + 14} fontSize={8.5} fill={s.measured ? '#5a4630' : '#555'} textAnchor="middle">{s.label}</text>
      ))}
      <text x={(px(0) + px(assumedEnd)) / 2} y={rowY + rowH + 12} fontSize={7.5} fill="#999" textAnchor="middle">assumed, 50% each</text>
      <text x={(px(assumedEnd) + px(T)) / 2} y={rowY + rowH + 12} fontSize={7.5} fill="#8a6d4a" textAnchor="middle">measured from telemetry</text>
    </svg>
  );
}

/** Worked-example overview: the sheathed panel's product tree (left) mapped to its process, grouped by skillset
 *  (right), with product edges (dashed) carrying outputs from one step to the next. Sketch; positions illustrative. */
export function MasterMapFigure() {
  const W = 84, H = 22;
  // [center x, center y, label, tinted]
  const steps: [number, number, string, boolean][] = [
    [300, 58, 'Design Panel', false],
    [300, 114, 'Cut Framing', false],
    [402, 114, 'Cut Sheathing', true],
    [300, 170, 'Marking', false],
    [402, 170, 'Layout', false],
    [504, 170, 'Nailing', false],
    [606, 170, 'Sheathing', true],
  ];
  const specNodes: [number, number, string, boolean][] = [
    [24, 34, 'Panel Set', false],
    [46, 78, 'Panel', false],
    [68, 122, 'Sheathing', true],
  ];
  return (
    <svg viewBox="0 0 680 222" style={{ width: '100%', height: 'auto', display: 'block', margin: '0.5rem auto' }}>
      <defs>
        <marker id="mapPa" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#8a6d4a" /></marker>
        <marker id="mapPr" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#157f8f" /></marker>
      </defs>

      <rect x={196} y={30} width={470} height={56} fill="#faf9f7" stroke="#e6e4e0" strokeWidth={1} />
      <rect x={196} y={86} width={470} height={56} fill="#f3f1ec" stroke="#e6e4e0" strokeWidth={1} />
      <rect x={196} y={142} width={470} height={56} fill="#faf9f7" stroke="#e6e4e0" strokeWidth={1} />
      <text x={242} y={61} fontSize={8.5} fill="#999" textAnchor="end" fontStyle="italic">Designer</text>
      <text x={242} y={117} fontSize={8.5} fill="#999" textAnchor="end" fontStyle="italic">Machinist</text>
      <text x={242} y={173} fontSize={8.5} fill="#999" textAnchor="end" fontStyle="italic">Fabricator</text>

      <text x={92} y={20} fontSize={9} fill="#999" textAnchor="middle" fontStyle="italic">Specification</text>
      <text x={431} y={20} fontSize={9} fill="#999" textAnchor="middle" fontStyle="italic">Process, by skillset</text>

      <path d="M34,58 V90 H46" stroke="#aaa" strokeWidth={1} fill="none" />
      <path d="M56,102 V134 H68" stroke="#aaa" strokeWidth={1} fill="none" />

      <path d="M138,89 H244 M244,58 V170 M244,58 H258 M244,114 H258 M244,170 H258 M244,150 H504 M402,150 V159 M504,150 V159" stroke="#999" strokeWidth={0.8} strokeDasharray="3 2" fill="none" />
      <path d="M160,133 H350 V114 H360" stroke="#999" strokeWidth={0.8} strokeDasharray="3 2" fill="none" />
      <path d="M160,133 H182 V200 H606 V181" stroke="#999" strokeWidth={0.8} strokeDasharray="3 2" fill="none" />

      <line x1={342} y1={114} x2={358} y2={114} stroke="#8a6d4a" strokeWidth={1.2} markerEnd="url(#mapPa)" />
      <line x1={342} y1={170} x2={358} y2={170} stroke="#8a6d4a" strokeWidth={1.2} markerEnd="url(#mapPa)" />
      <line x1={444} y1={170} x2={460} y2={170} stroke="#8a6d4a" strokeWidth={1.2} markerEnd="url(#mapPa)" />
      <line x1={546} y1={170} x2={562} y2={170} stroke="#8a6d4a" strokeWidth={1.2} markerEnd="url(#mapPa)" />

      <line x1={300} y1={69} x2={300} y2={101} stroke="#157f8f" strokeWidth={1} strokeDasharray="4 2" markerEnd="url(#mapPr)" />
      <text x={306} y={87} fontSize={7.5} fill="#157f8f" textAnchor="start">cutting list</text>
      <path d="M258,58 H252 V170 H256" stroke="#157f8f" strokeWidth={1} strokeDasharray="4 2" fill="none" markerEnd="url(#mapPr)" />
      <text x={250} y={82} fontSize={7.5} fill="#157f8f" textAnchor="end">fabrication drawing</text>
      <line x1={300} y1={125} x2={300} y2={157} stroke="#157f8f" strokeWidth={1} strokeDasharray="4 2" markerEnd="url(#mapPr)" />
      <text x={306} y={143} fontSize={7.5} fill="#157f8f" textAnchor="start">framing members</text>
      <path d="M402,125 V145 H606 V157" stroke="#157f8f" strokeWidth={1} strokeDasharray="4 2" fill="none" markerEnd="url(#mapPr)" />
      <text x={504} y={142} fontSize={7.5} fill="#157f8f" textAnchor="middle">sheathing panels</text>

      {specNodes.map(([x, y, label, tint], i) => (
        <g key={`s${i}`}>
          <rect x={x} y={y} width={92} height={22} rx={3} fill={tint ? '#c9a876' : '#f4f1ec'} fillOpacity={tint ? 0.4 : 1} stroke={tint ? '#a3824f' : '#aaa'} strokeWidth={1} />
          <text x={x + 46} y={y + 14} fontSize={9} fill="#4a3c28" textAnchor="middle">{label}</text>
        </g>
      ))}

      {steps.map(([cx, cy, label, tint], i) => (
        <g key={`p${i}`}>
          <rect x={cx - W / 2} y={cy - H / 2} width={W} height={H} rx={3} fill={tint ? '#c9a876' : '#efe9e0'} fillOpacity={tint ? 0.4 : 1} stroke={tint ? '#a3824f' : '#8a6d4a'} strokeWidth={1} />
          <text x={cx} y={cy + 3} fontSize={9} fill="#4a3c28" textAnchor="middle">{label}</text>
        </g>
      ))}
    </svg>
  );
}

/** Patient care: one master specification and master process, shown in full with unselected parts faded (as in
 *  MasterInstanceFigure). `stage` deepens the selection as each step's finding refines the specification:
 *  0 = booking (receptionist selects the abdominal region, mapping to the consult); 1 = the GP's assessment
 *  localises the biliary organ, which necessitates the ultrasound; 2 = the ultrasound confirms the gallstone
 *  issue, which reaches the surgeon and anaesthetist. Nothing is added to the master; more of it is selected.
 *  The Patient root carries the patient-level descriptors (age, weight, ASA). */
export function PatientMasterFigure({ stage = 0 }: { stage?: 0 | 1 | 2 }) {
  const W = 84, H = 22;
  const bili = stage < 1; // biliary organ and the ultrasound it necessitates, faded until the GP assesses
  const gall = stage < 2; // gallstone issue and the treatment it necessitates, faded until imaging confirms
  const map = (faded: boolean) => (faded ? '#dedede' : '#999');
  const tree = (faded: boolean) => (faded ? '#dedede' : '#aaa');
  const pre = (faded: boolean) => (faded ? '#cfcfcf' : '#8a6d4a');
  const prod = (faded: boolean) => (faded ? '#cfcfcf' : '#157f8f');
  const preM = (faded: boolean) => (faded ? 'url(#pmPaF)' : 'url(#pmPa)');
  const prodM = (faded: boolean) => (faded ? 'url(#pmPrF)' : 'url(#pmPr)');

  const specNodes: [number, number, number, string, boolean][] = [
    [4, 36, 80, 'Patient', false],
    [38, 73, 80, 'Abdomen', false],
    [72, 110, 80, 'Stomach', true],
    [72, 147, 80, 'Bowel', true],
    [72, 184, 80, 'Biliary', bili],
    [104, 221, 80, 'Gallstones', gall],
  ];
  const steps: [number, number, string, boolean][] = [
    [260, 60, 'Book', false],
    [340, 112, 'Assess', false],
    [452, 112, 'Ultrasound', bili],
    [300, 164, 'Plan', gall],
    [412, 164, 'Resection', gall],
    [300, 216, 'Pre-op', gall],
    [412, 216, 'Induction', gall],
    [524, 216, 'Emergence', gall],
  ];
  return (
    <svg viewBox="0 0 700 262" style={{ width: '100%', height: 'auto', display: 'block', margin: '0.5rem auto' }}>
      <defs>
        <marker id="pmPa" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#8a6d4a" /></marker>
        <marker id="pmPaF" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#cfcfcf" /></marker>
        <marker id="pmPr" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#157f8f" /></marker>
        <marker id="pmPrF" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#cfcfcf" /></marker>
      </defs>

      <rect x={196} y={34} width={488} height={52} fill="#faf9f7" stroke="#e6e4e0" strokeWidth={1} />
      <rect x={196} y={86} width={488} height={52} fill="#f3f1ec" stroke="#e6e4e0" strokeWidth={1} />
      <rect x={196} y={138} width={488} height={52} fill="#faf9f7" stroke="#e6e4e0" strokeWidth={1} />
      <rect x={196} y={190} width={488} height={52} fill="#f3f1ec" stroke="#e6e4e0" strokeWidth={1} />
      <text x={242} y={63} fontSize={8.5} fill="#999" textAnchor="end" fontStyle="italic">Receptionist</text>
      <text x={242} y={115} fontSize={8.5} fill="#999" textAnchor="end" fontStyle="italic">GP</text>
      <text x={242} y={167} fontSize={8.5} fill="#999" textAnchor="end" fontStyle="italic">Surgeon</text>
      <text x={242} y={219} fontSize={8.5} fill="#999" textAnchor="end" fontStyle="italic">Anaesthetist</text>

      <text x={94} y={22} fontSize={9} fill="#999" textAnchor="middle" fontStyle="italic">Master specification</text>
      <text x={440} y={22} fontSize={9} fill="#999" textAnchor="middle" fontStyle="italic">Master process, by skillset</text>
      <text x={44} y={68} fontSize={7} fill="#999" textAnchor="middle" fontStyle="italic">age, weight, ASA</text>

      <path d="M14,58 V84 H38" stroke={tree(false)} strokeWidth={1} fill="none" />
      <path d="M54,95 V195" stroke={tree(true)} strokeWidth={1} strokeDasharray="3 2" fill="none" />
      <path d="M54,121 H72" stroke={tree(true)} strokeWidth={1} strokeDasharray="3 2" fill="none" />
      <path d="M54,158 H72" stroke={tree(true)} strokeWidth={1} strokeDasharray="3 2" fill="none" />
      <path d="M54,195 H72" stroke={tree(bili)} strokeWidth={1} strokeDasharray={bili ? '3 2' : undefined} fill="none" />
      <path d="M88,206 V232 H104" stroke={tree(gall)} strokeWidth={1} strokeDasharray={gall ? '3 2' : undefined} fill="none" />

      <path d="M118,84 V26 H340 M260,26 V49 M340,26 V101" stroke={map(false)} strokeWidth={0.8} strokeDasharray="3 2" fill="none" />
      <path d="M152,195 H186 V30 H452 V101" stroke={map(bili)} strokeWidth={0.8} strokeDasharray="3 2" fill="none" />
      <path d="M184,232 V146 H412 M300,146 V153 M412,146 V153" stroke={map(gall)} strokeWidth={0.8} strokeDasharray="3 2" fill="none" />
      <path d="M184,232 V198 H524 M300,198 V205 M412,198 V205 M524,198 V205" stroke={map(gall)} strokeWidth={0.8} strokeDasharray="3 2" fill="none" />

      <line x1={382} y1={112} x2={410} y2={112} stroke={pre(bili)} strokeWidth={1.2} markerEnd={preM(bili)} />
      <line x1={342} y1={164} x2={370} y2={164} stroke={pre(gall)} strokeWidth={1.2} markerEnd={preM(gall)} />
      <line x1={342} y1={216} x2={370} y2={216} stroke={pre(gall)} strokeWidth={1.2} markerEnd={preM(gall)} />
      <line x1={454} y1={216} x2={482} y2={216} stroke={pre(gall)} strokeWidth={1.2} markerEnd={preM(gall)} />

      <path d="M260,71 V90 H340 V101" stroke={prod(false)} strokeWidth={1} strokeDasharray="4 2" fill="none" markerEnd={prodM(false)} />
      <text x={300} y={86} fontSize={7.5} fill={prod(false)} textAnchor="middle">appointment</text>
      <path d="M452,123 V140 H300 V153" stroke={prod(gall)} strokeWidth={1} strokeDasharray="4 2" fill="none" markerEnd={prodM(gall)} />
      <text x={392} y={137} fontSize={7.5} fill={prod(gall)} textAnchor="middle">referral</text>
      <path d="M300,175 V205" stroke={prod(gall)} strokeWidth={1} strokeDasharray="4 2" fill="none" markerEnd={prodM(gall)} />
      <text x={294} y={192} fontSize={7.5} fill={prod(gall)} textAnchor="end">plan</text>
      <path d="M300,205 V196 H412 V175" stroke={prod(gall)} strokeWidth={1} strokeDasharray="4 2" fill="none" markerEnd={prodM(gall)} />
      <text x={392} y={191} fontSize={7.5} fill={prod(gall)} textAnchor="middle">prepared patient</text>

      {specNodes.map(([x, y, w, label, faded], i) => (
        <g key={`s${i}`}>
          <rect x={x} y={y} width={w} height={22} rx={3} fill={faded ? '#f6f6f6' : '#efe9e0'} stroke={faded ? '#cfcfcf' : '#8a6d4a'} strokeWidth={1} strokeDasharray={faded ? '3 2' : undefined} />
          <text x={x + w / 2} y={y + 15} fontSize={9} fill={faded ? '#bbb' : '#4a3c28'} textAnchor="middle">{label}</text>
        </g>
      ))}

      {steps.map(([cx, cy, label, faded], i) => (
        <g key={`p${i}`}>
          <rect x={cx - W / 2} y={cy - H / 2} width={W} height={H} rx={3} fill={faded ? '#f6f6f6' : '#efe9e0'} stroke={faded ? '#cfcfcf' : '#8a6d4a'} strokeWidth={1} strokeDasharray={faded ? '3 2' : undefined} />
          <text x={cx} y={cy + 3} fontSize={9} fill={faded ? '#bbb' : '#4a3c28'} textAnchor="middle">{label}</text>
        </g>
      ))}
    </svg>
  );
}

/** Generic master specification and master process, with the subset a project selects highlighted (solid) and
 *  the rest faded (dashed): selecting spec nodes picks out the corresponding process steps via the mapping. */
export function MasterInstanceFigure() {
  const W = 62, H = 22;
  const specNodes: [number, number, number, string, boolean][] = [
    [30, 30, 46, 'S', false],
    [58, 66, 46, 'A', false],
    [58, 102, 46, 'B', false],
    [58, 138, 46, 'C', true],
  ];
  const steps: [number, number, string, boolean][] = [
    [316, 58, 'p1', false],
    [316, 114, 'q1', false],
    [430, 114, 'q2', false],
    [430, 170, 'r1', true],
    [548, 58, 'p2', true],
    [548, 170, 'r2', false],
  ];
  return (
    <svg viewBox="0 0 660 210" style={{ width: '100%', height: 'auto', display: 'block', margin: '0.5rem auto' }}>
      <defs>
        <marker id="miPr" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#157f8f" /></marker>
        <marker id="miPa" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#8a6d4a" /></marker>
        <marker id="miF" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#cfcfcf" /></marker>
      </defs>
      <rect x={180} y={30} width={456} height={56} fill="#faf9f7" stroke="#e6e4e0" strokeWidth={1} />
      <rect x={180} y={86} width={456} height={56} fill="#f3f1ec" stroke="#e6e4e0" strokeWidth={1} />
      <rect x={180} y={142} width={456} height={56} fill="#faf9f7" stroke="#e6e4e0" strokeWidth={1} />
      <text x={186} y={61} fontSize={8.5} fill="#999" textAnchor="start" fontStyle="italic">Skillset 1</text>
      <text x={186} y={117} fontSize={8.5} fill="#999" textAnchor="start" fontStyle="italic">Skillset 2</text>
      <text x={186} y={173} fontSize={8.5} fill="#999" textAnchor="start" fontStyle="italic">Skillset 3</text>

      <text x={67} y={18} fontSize={9} fill="#999" textAnchor="middle" fontStyle="italic">Master specification</text>
      <text x={420} y={18} fontSize={9} fill="#999" textAnchor="middle" fontStyle="italic">Master process, by skillset</text>

      <path d="M40,54 V114 M40,78 H58 M40,114 H58" stroke="#aaa" strokeWidth={1} fill="none" />
      <path d="M40,114 V150 H58" stroke="#dedede" strokeWidth={1} strokeDasharray="3 2" fill="none" />

      <path d="M104,78 H130 V58 H285 M130,78 V90 H385 V107 H399" stroke="#999" strokeWidth={0.8} strokeDasharray="3 2" fill="none" />
      <path d="M104,114 H285 M130,114 V150 H503 V170 H517" stroke="#999" strokeWidth={0.8} strokeDasharray="3 2" fill="none" />
      <path d="M104,150 H120 V38 H500 V58 H517 M120,150 V170 H399" stroke="#dedede" strokeWidth={0.8} strokeDasharray="3 2" fill="none" />

      <line x1={316} y1={69} x2={316} y2={101} stroke="#157f8f" strokeWidth={1} strokeDasharray="4 2" markerEnd="url(#miPr)" />
      <line x1={347} y1={114} x2={397} y2={114} stroke="#8a6d4a" strokeWidth={1.2} markerEnd="url(#miPa)" />
      <line x1={430} y1={125} x2={430} y2={157} stroke="#cfcfcf" strokeWidth={1} strokeDasharray="4 2" markerEnd="url(#miF)" />
      <line x1={347} y1={58} x2={515} y2={58} stroke="#cfcfcf" strokeWidth={1.2} markerEnd="url(#miF)" />
      <line x1={461} y1={170} x2={515} y2={170} stroke="#cfcfcf" strokeWidth={1.2} markerEnd="url(#miF)" />
      <line x1={548} y1={69} x2={548} y2={157} stroke="#cfcfcf" strokeWidth={1} strokeDasharray="4 2" markerEnd="url(#miF)" />

      {specNodes.map(([x, y, w, label, dropped], i) => (
        <g key={`s${i}`}>
          <rect x={x} y={y} width={w} height={24} rx={3} fill={dropped ? '#f6f6f6' : '#efe9e0'} stroke={dropped ? '#cfcfcf' : '#8a6d4a'} strokeWidth={1} strokeDasharray={dropped ? '3 2' : undefined} />
          <text x={x + w / 2} y={y + 15} fontSize={9} fill={dropped ? '#bbb' : '#4a3c28'} textAnchor="middle">{label}</text>
        </g>
      ))}

      {steps.map(([cx, cy, label, dropped], i) => (
        <g key={`p${i}`}>
          <rect x={cx - W / 2} y={cy - H / 2} width={W} height={H} rx={3} fill={dropped ? '#f6f6f6' : '#efe9e0'} stroke={dropped ? '#cfcfcf' : '#8a6d4a'} strokeWidth={1} strokeDasharray={dropped ? '3 2' : undefined} />
          <text x={cx} y={cy + 3} fontSize={9} fill={dropped ? '#bbb' : '#4a3c28'} textAnchor="middle">{label}</text>
        </g>
      ))}
    </svg>
  );
}
