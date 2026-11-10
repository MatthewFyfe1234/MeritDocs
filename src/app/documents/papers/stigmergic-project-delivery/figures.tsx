import { mappingPath, mappingSegments, polylinesPath, terminalIn, terminalOut, type Box } from './figure-routing';

/** Figure 1 geometry shared with Figures 2 and 3, which isolate component A and its two steps in place. */
const MI_W = 62, MI_H = 22;
const miBox = (cx: number, cy: number): Box => ({ cx, cy, w: MI_W, h: MI_H });
const MI_P1 = miBox(316, 62);
const MI_Q2 = miBox(430, 114);
const MI_A_MAP = mappingSegments([104, 78], 130, [{ channelY: 46, box: MI_P1 }, { channelY: 90, box: MI_Q2 }]);

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

/** Figure labels renamed since submission, a change of wording only, shown with the minor revision mark
 *  (paper-rev-svg-minor) while revisions are on. Steps are named as verbs and specification nodes as nouns. */
const REVISED_LABELS = new Set([
  'Mark Out', 'Lay Out', 'Nail Frame', 'Fix Sheathing',
  'Scan', 'Resect', 'Prepare', 'Induce', 'Recover', 'Biliary Tract', 'Peritoneum', 'Abdominal Wall', 'Triage',
]);
const revClass = (label: string) => (REVISED_LABELS.has(label) ? 'paper-rev-svg-minor' : undefined);

/** Canvas for the forecast plots. */
const FIG_VIEWBOX = '0 0 480 215';
const FIG_WIDTH_PCT = '65%';

/** Figure 2 (mapping): a stripped subset of MasterInstanceFigure, showing only component A and the two steps it
 *  necessitates, p1 and q2, in the same coordinates, palette and lane bands as Figure 1, so the equivalence is
 *  seen rather than asserted. Nothing carries a height yet; height enters in the scaling figure. The two steps
 *  fall in different skillset lanes, which the mapping, not the lettering, ties to A. */
export function MappingFigure() {
  return (
    <svg viewBox="16 4 480 148" style={{ width: '73%', height: 'auto', display: 'block', margin: '0 auto' }}>
      <rect x={180} y={30} width={300} height={56} fill="#faf9f7" stroke="#e6e4e0" strokeWidth={1} />
      <rect x={180} y={86} width={300} height={56} fill="#f3f1ec" stroke="#e6e4e0" strokeWidth={1} />
      <text x={186} y={61} fontSize={8.5} fill="#999" textAnchor="start" fontStyle="italic">Skillset 1</text>
      <text x={186} y={117} fontSize={8.5} fill="#999" textAnchor="start" fontStyle="italic">Skillset 2</text>

      <text x={67} y={18} fontSize={9} fill="#999" textAnchor="middle" fontStyle="italic">Master specification</text>
      <text x={330} y={18} fontSize={9} fill="#999" textAnchor="middle" fontStyle="italic">Master process, by skillset</text>

      <path d={polylinesPath(MI_A_MAP)} stroke="#999" strokeWidth={0.8} strokeDasharray="3 2" fill="none" />

      <rect x={58} y={66} width={46} height={24} rx={3} fill="#efe9e0" stroke="#8a6d4a" strokeWidth={1} />
      <text x={81} y={81} fontSize={9} fill="#4a3c28" textAnchor="middle">A</text>

      <rect x={285} y={51} width={62} height={22} rx={3} fill="#efe9e0" stroke="#8a6d4a" strokeWidth={1} />
      <text x={316} y={65} fontSize={9} fill="#4a3c28" textAnchor="middle">p1</text>

      <rect x={399} y={103} width={62} height={22} rx={3} fill="#efe9e0" stroke="#8a6d4a" strokeWidth={1} />
      <text x={430} y={117} fontSize={9} fill="#4a3c28" textAnchor="middle">q2</text>
    </svg>
  );
}

/** Figure 3 (scaling): the same A, p1 and q2 as Figure 2, now carrying a height. The skillset lanes become a
 *  floor receding in the boxes' own oblique projection, Skillset 2 in front and Skillset 1 behind, and each step
 *  stands on its lane at its Figure 2 x position, shifted only by the projection of its depth. Descriptor d is
 *  read off A's height and metric y off each step's; the relation is stochastic, x scaling the distribution y
 *  is drawn from rather than fixing it. */
export function ScalingFigure() {
  // Figure 2 is the floor plan: its x stays x, and its y becomes depth, the front edge of the floor being Figure 2's
  // y = 142 (the bottom of Skillset 2). Projection shared with IsoBox: a unit of depth moves 0.87 right and 0.5 up.
  const k = 0.7; // depth per unit of Figure 2 y
  const floorFront = 138;
  const proj = (x: number, y: number): [number, number] => {
    const d = k * (142 - y);
    return [x + d * 0.87, floorFront - d * 0.5];
  };
  const rect = (x0: number, y0: number, x1: number, y1: number) =>
    [proj(x0, y1), proj(x1, y1), proj(x1, y0), proj(x0, y0)].map(p => p.join(',')).join(' ');
  const route = (points: [number, number][]) =>
    points.map(([x, y], i) => `${i ? 'L' : 'M'}${proj(x, y).join(',')}`).join(' ');

  // Figure 2 footprints [x0, y0, x1, y1], extruded by height, with the side the dimension bracket sits on (q2's
  // left is crowded by p1, so its bracket measures the back-right edge instead); drawn back to front.
  const boxes: { fp: [number, number, number, number]; h: number; label: string; fill: string; dim: string; dimColor: string; side: 'left' | 'right' }[] = [
    { fp: [58, 66, 104, 90], h: 56, label: 'A', fill: '#8a6d4a', dim: 'descriptor d', dimColor: '#8a6d4a', side: 'left' },
    { fp: [285, 51, 347, 73], h: 36, label: 'p1', fill: '#666', dim: 'metric y', dimColor: '#444', side: 'left' },
    { fp: [399, 103, 461, 125], h: 52, label: 'q2', fill: '#666', dim: 'metric y', dimColor: '#444', side: 'right' },
  ];
  // A height bracket at x from yBottom up h, ticks pointing back at the box, label set outside it.
  const bracket = (x: number, yBottom: number, h: number, side: 'left' | 'right', text: string, color: string) => {
    const s = side === 'left' ? -1 : 1;
    const lx = x + s * 9;
    const ly = yBottom - h / 2;
    return (
      <>
        <path d={`M${x},${yBottom} H${x - s * 4} M${x},${yBottom} V${yBottom - h} M${x},${yBottom - h} H${x - s * 4}`} stroke="#444" strokeWidth={1} fill="none" />
        <text x={lx} y={ly} fontSize={8.5} fontWeight={600} fill={color} textAnchor="middle" dominantBaseline="central" transform={`rotate(-90 ${lx} ${ly})`} className={text.startsWith('descriptor') ? 'paper-rev-svg-minor' : undefined}>{text}</text>
      </>
    );
  };

  return (
    <svg viewBox="16 36 540 112" style={{ width: '82%', height: 'auto', display: 'block', margin: '0 auto' }}>
      <polygon points={rect(40, 30, 122, 142)} fill="#faf9f7" stroke="#d9d5ce" strokeWidth={1} />
      <polygon points={rect(180, 30, 480, 86)} fill="#faf9f7" stroke="#d9d5ce" strokeWidth={1} />
      <polygon points={rect(180, 86, 480, 142)} fill="#f3f1ec" stroke="#d9d5ce" strokeWidth={1} />
      <text x={proj(186, 47)[0]} y={proj(186, 47)[1]} fontSize={8.5} fill="#999" textAnchor="start" fontStyle="italic">Skillset 1</text>
      <text x={proj(186, 136)[0]} y={proj(186, 136)[1]} fontSize={8.5} fill="#999" textAnchor="start" fontStyle="italic">Skillset 2</text>

      <text x={105} y={48} fontSize={9} fill="#999" textAnchor="middle" fontStyle="italic">Master specification</text>
      <text x={360} y={48} fontSize={9} fill="#999" textAnchor="middle" fontStyle="italic">Master process, by skillset</text>

      {/* Figure 2's mapping connectors, laid on the floor */}
      <path d={MI_A_MAP.map(route).join(' ')} stroke="#999" strokeWidth={0.8} strokeDasharray="3 2" fill="none" />

      {boxes.map(({ fp: [x0, y0, x1, y1], h, label, fill, dim, dimColor, side }) => {
        const [sx, base] = proj(x0, y1);
        const w = x1 - x0;
        const depth = k * (y1 - y0);
        return (
          <g key={label}>
            <IsoBox x={sx} baseline={base} width={w} height={h} depth={depth} fill={fill} />
            <text x={sx + w / 2} y={base - 5} fontSize={9} fill="#fff" textAnchor="middle">{label}</text>
            {side === 'left'
              ? bracket(sx - 6, base, h, 'left', dim, dimColor)
              : bracket(sx + w + depth * 0.87 + 6, base - depth * 0.5, h, 'right', dim, dimColor)}
          </g>
        );
      })}
    </svg>
  );
}

/** Figure 4: metric y scales with descriptor d (Figure 3). On a new project d is known from the specification
 *  but y is not; the accumulated (d, y) history fits the relationship, and y at the new d is read off it as a
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
      <text x={242} y={198} fontSize={12} fontWeight={600} fill="#8a6d4a" textAnchor="middle" className="paper-rev-svg-minor">descriptor d</text>

      <circle cx={80} cy={30} r={3} fill="#666" />
      <text x={88} y={33} fontSize={9.5} fill="#444">history</text>
      <circle cx={150} cy={30} r={3} fill="#157f8f" />
      <text x={158} y={33} fontSize={9.5} fill="#157f8f">forecast</text>

      <line x1={px(0.2)} y1={py(trend(0.2))} x2={px(8.4)} y2={py(trend(8.4))} stroke="#8a6d4a" strokeWidth={1.2} strokeDasharray="5 3" />
      {history.map(([dx, dy], i) => (
        <circle key={i} cx={px(dx)} cy={py(dy)} r={3} fill="#666" />
      ))}

      <line x1={px(newX)} y1={178} x2={px(newX)} y2={py(fY + spread) - 6} stroke="#999" strokeWidth={1} strokeDasharray="3 2" />
      <text x={px(newX)} y={190} fontSize={9} fill="#666" textAnchor="middle" className="paper-rev-svg-minor">new d</text>

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
 *  drop stays within a safe range. The counterpart of the wall frame's Project 3. */
export function AnaesthesiaForecastFigure() {
  const px = (d: number) => 64 + d * 42;
  const py = (v: number) => 178 - v * 17;
  const history: [number, number][] = [
    [1, 1.4], [1.7, 1.1], [2.4, 2.4], [3.1, 2.0], [3.9, 3.3], [4.7, 3.0], [5.4, 4.5], [6.2, 4.1], [6.9, 5.3],
  ];
  const intercept = 0.4, slope = 0.7;
  const trend = (d: number) => intercept + slope * d;
  const proposed = 7.4; // keeps the top of the spread (≈6.9) under the safe limit (7.0)
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

      {(() => {
        // Drafting break: studs drawn shortened, true height given by the dimension.
        const mid = (top + bottom) / 2;
        const x0 = originX - 5, x1 = originX + w + 5, xm = originX + w / 2;
        return (
          <g>
            <rect x={x0} y={mid - 10} width={x1 - x0} height={20} fill="#fff" />
            <path d={`M${x0},${mid} L${xm - 7},${mid} L${xm - 3},${mid - 5} L${xm + 3},${mid + 5} L${xm + 7},${mid} L${x1},${mid}`} stroke="#444" strokeWidth={0.8} fill="none" />
          </g>
        );
      })()}

      {sheathed && (
        <text x={originX + w + 14} y={top + 14} fontSize={9.5} fill="#a3824f">sheathing</text>
      )}
      <text x={originX + w / 2} y={143} textAnchor="middle" fontSize={9.5} fill="#666">
        {memberCounts(widthMm).studCount} studs @ 600mm centres
      </text>
    </svg>
  );
}

/** Timeline for a framing panel. Steps run left to right, each boundary marked with its time in minutes; the
 *  nailing step is bounded by telemetric nail signals, the preceding steps carry no signal and are assumed to split
 *  the lead time evenly. Numbers illustrative. */
export function AssemblyTimeline({ T, nails, steps }: {
  T: number;
  nails: number[];
  steps: { label: string; end: number; measured?: boolean; rev?: boolean; isNew?: boolean }[];
}) {
  const x0 = 24, x1 = 340;
  const px = (t: number) => x0 + (t / T) * (x1 - x0);
  const rowY = 48, rowH = 22;
  const nailStart = nails[0], nailEnd = nails[nails.length - 1];
  let cursor = 0;
  const segs = steps.map(s => {
    const seg = { label: s.label, start: cursor, end: s.end, measured: !!s.measured, rev: !!s.rev, isNew: !!s.isNew };
    cursor = s.end;
    return seg;
  });
  // Steps before the first nail carry no signal and split that time; the nailing step is bounded by its nails;
  // any step after the last nail carries no signal either, bounded by it and by the recorded end of the job.
  const firstMeasured = segs.find(s => s.measured);
  const assumedEnd = firstMeasured ? firstMeasured.start : T;
  const telemetryEnd = firstMeasured ? firstMeasured.end : T;
  return (
    <svg viewBox="0 0 404 96" style={{ width: '85%', height: 'auto', display: 'block', margin: '0.5rem auto' }}>
      <line x1={x0 - 20} y1={34} x2={x1 + 36} y2={34} stroke="#b0b0b0" strokeWidth={1} />
      <polygon points={`${x1 + 36},34 ${x1 + 30},31 ${x1 + 30},37`} fill="#b0b0b0" />
      <text x={x1 + 21} y={47} fontSize={8} fill="#b0b0b0" textAnchor="middle" fontStyle="italic">time</text>
      {[0, ...segs.map(s => s.end)].map((t, i, all) => (
        <g key={`b${i}`}>
          <line x1={px(t)} y1={28} x2={px(t)} y2={40} stroke="#888" strokeWidth={1} />
          <text x={px(t)} y={15} fontSize={8.5} fill="#666" textAnchor="middle" className={i ? 'paper-rev-svg' : undefined}>
            {`${i ? (t / 60).toFixed(1) : '0'}${i === all.length - 1 ? ' min' : ''}`}
          </text>
        </g>
      ))}
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
        <text key={i} x={(px(s.start) + px(s.end)) / 2} y={rowY + 14} fontSize={8.5} fill={s.measured ? '#5a4630' : '#555'} textAnchor="middle" className={s.isNew ? 'paper-rev-svg' : s.rev ? 'paper-rev-svg-minor' : undefined}>{s.label}</text>
      ))}
      <text x={(px(0) + px(assumedEnd)) / 2} y={rowY + rowH + 12} fontSize={7.5} fill="#999" textAnchor="middle">assumed, 50% each</text>
      <text x={(px(assumedEnd) + px(telemetryEnd)) / 2} y={rowY + rowH + 12} fontSize={7.5} fill="#8a6d4a" textAnchor="middle">measured from telemetry</text>
      {telemetryEnd < T && (
        <text x={(px(telemetryEnd) + px(T)) / 2} y={rowY + rowH + 12} fontSize={7.5} fill="#999" textAnchor="middle" className="paper-rev-svg">no signal, to job end</text>
      )}
    </svg>
  );
}

/** Worked-example overview, drawn as Figure 1: a fragment of the panel's master specification (left) mapped to its
 *  master process by skillset (right), with an unsheathed panel's selection solid (Projects 1 and 2) and the
 *  Sheathing node, the steps it necessitates and their products faded (selected too in Project 3). */
export function MasterMapFigure() {
  const W = 76, H = 22, SW = 84;
  // [center x, center y, label, faded, new in revision]
  const steps: [number, number, string, boolean, boolean][] = [
    [248, 58, 'Design Panel', false, false],
    [248, 114, 'Cut Framing', false, false],
    [336, 114, 'Cut Sheathing', true, false],
    [248, 170, 'Mark Out', false, false],
    [336, 170, 'Lay Out', false, false],
    [424, 170, 'Nail Frame', false, false],
    [512, 170, 'Fix Sheathing', true, false],
    [600, 170, 'Stack Panel', false, true],
  ];
  const box = (label: string): Box => {
    const [cx, cy] = steps.find(s => s[2] === label)!;
    return { cx, cy, w: W, h: H };
  };
  const specIn = terminalIn(box('Design Panel'));
  const panelOut = terminalOut(box('Stack Panel'));
  const specNodes: [number, number, string, boolean][] = [
    [8, 34, 'Panel Set', false],
    [24, 78, 'Panel', false],
    [40, 122, 'Sheathing', true],
  ];
  return (
    <svg viewBox="0 0 680 222" style={{ width: '100%', height: 'auto', display: 'block', margin: '0.5rem auto' }}>
      <defs>
        <marker id="mapPa" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#8a6d4a" /></marker>
        <marker id="mapPr" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#157f8f" /></marker>
        <marker id="mapF" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#cfcfcf" /></marker>
      </defs>

      <rect x={150} y={30} width={510} height={56} fill="#faf9f7" stroke="#e6e4e0" strokeWidth={1} />
      <rect x={150} y={86} width={510} height={56} fill="#f3f1ec" stroke="#e6e4e0" strokeWidth={1} />
      <rect x={150} y={142} width={510} height={56} fill="#faf9f7" stroke="#e6e4e0" strokeWidth={1} />
      <text x={192} y={61} fontSize={8.5} fill="#999" textAnchor="end" fontStyle="italic">Designer</text>
      <text x={192} y={117} fontSize={8.5} fill="#999" textAnchor="end" fontStyle="italic">Machinist</text>
      <text x={192} y={173} fontSize={8.5} fill="#999" textAnchor="end" fontStyle="italic">Fabricator</text>

      <text x={66} y={20} fontSize={9} fill="#999" textAnchor="middle" fontStyle="italic">Specification</text>
      <text x={405} y={20} fontSize={9} fill="#999" textAnchor="middle" fontStyle="italic">Process, by skillset</text>

      <path d="M18,56 V89 H24" stroke="#aaa" strokeWidth={1} fill="none" />
      <path d="M34,100 V133 H40" stroke="#dedede" strokeWidth={1} strokeDasharray="3 2" fill="none" />

      <path d={mappingPath([108, 89], 196, [
        { channelY: 40, box: box('Design Panel') },
        { channelY: 98, box: box('Cut Framing') },
        ...['Mark Out', 'Lay Out', 'Nail Frame', 'Stack Panel'].map(l => ({ channelY: 150, box: box(l) })),
      ])} stroke="#999" strokeWidth={0.8} strokeDasharray="3 2" fill="none" />
      <path d={mappingPath([124, 133], 140, [
        { channelY: 91, box: box('Cut Sheathing') },
        { channelY: 191, box: box('Fix Sheathing') },
      ])} stroke="#dedede" strokeWidth={0.8} strokeDasharray="3 2" fill="none" />

      <line x1={286} y1={114} x2={296} y2={114} stroke="#cfcfcf" strokeWidth={1.2} markerEnd="url(#mapF)" />
      <line x1={286} y1={170} x2={296} y2={170} stroke="#8a6d4a" strokeWidth={1.2} markerEnd="url(#mapPa)" />
      <line x1={374} y1={170} x2={384} y2={170} stroke="#8a6d4a" strokeWidth={1.2} markerEnd="url(#mapPa)" />
      <line x1={462} y1={170} x2={472} y2={170} stroke="#cfcfcf" strokeWidth={1.2} markerEnd="url(#mapF)" />
      <line x1={550} y1={170} x2={560} y2={170} stroke="#cfcfcf" strokeWidth={1.2} markerEnd="url(#mapF)" />

      <line x1={248} y1={69} x2={248} y2={101} stroke="#157f8f" strokeWidth={1} strokeDasharray="4 2" markerEnd="url(#mapPr)" />
      <text x={254} y={87} fontSize={7.5} fill="#157f8f" textAnchor="start">cutting list</text>
      <path d="M210,58 H204 V170 H208" stroke="#157f8f" strokeWidth={1} strokeDasharray="4 2" fill="none" markerEnd="url(#mapPr)" />
      <text x={202} y={82} fontSize={7.5} fill="#157f8f" textAnchor="end">fabrication drawing</text>
      <line x1={248} y1={125} x2={248} y2={157} stroke="#157f8f" strokeWidth={1} strokeDasharray="4 2" markerEnd="url(#mapPr)" />
      <text x={254} y={143} fontSize={7.5} fill="#157f8f" textAnchor="start">framing members</text>
      <path d="M336,125 V145 H512 V157" stroke="#cfcfcf" strokeWidth={1} strokeDasharray="4 2" fill="none" markerEnd="url(#mapF)" />
      <text x={424} y={142} fontSize={7.5} fill="#bbb" textAnchor="middle">sheathing panels</text>

      {/* Products crossing the process boundary: the specification in, the panel out. */}
      <line {...specIn} stroke="#157f8f" strokeWidth={1} strokeDasharray="4 2" markerEnd="url(#mapPr)" />
      <text x={specIn.x1 + 6} y={specIn.y1 + 13} fontSize={7.5} fill="#157f8f" textAnchor="start" className="paper-rev-svg">panel specification</text>
      <line {...panelOut} stroke="#157f8f" strokeWidth={1} strokeDasharray="4 2" markerEnd="url(#mapPr)" />
      <text x={panelOut.x1 + 6} y={panelOut.y2 - 4} fontSize={7.5} fill="#157f8f" textAnchor="start" className="paper-rev-svg">panel</text>

      {specNodes.map(([x, y, label, faded], i) => (
        <g key={`s${i}`}>
          <rect x={x} y={y} width={SW} height={22} rx={3} fill={faded ? '#f6f6f6' : '#efe9e0'} stroke={faded ? '#cfcfcf' : '#8a6d4a'} strokeWidth={1} strokeDasharray={faded ? '3 2' : undefined} />
          <text x={x + SW / 2} y={y + 14} fontSize={9} fill={faded ? '#bbb' : '#4a3c28'} textAnchor="middle">{label}</text>
        </g>
      ))}

      {steps.map(([cx, cy, label, faded, isNew], i) => (
        <g key={`p${i}`}>
          <rect x={cx - W / 2} y={cy - H / 2} width={W} height={H} rx={3} fill={faded ? '#f6f6f6' : '#efe9e0'} stroke={faded ? '#cfcfcf' : '#8a6d4a'} strokeWidth={1} strokeDasharray={faded ? '3 2' : undefined} />
          <text x={cx} y={cy + 3} fontSize={9} fill={faded ? '#bbb' : '#4a3c28'} textAnchor="middle" className={isNew ? 'paper-rev-svg' : revClass(label)}>{label}</text>
        </g>
      ))}
    </svg>
  );
}

/** Patient care: one master specification and master process, shown in full with unselected parts faded (as in
 *  MasterInstanceFigure). `stage` deepens the selection as each step's finding refines the specification:
 *  Set in a hospital emergency department, as the clinical evaluation is.
 *  0 = triage (the triage nurse selects the abdominal region, mapping to the assessment); 1 = the physician's assessment
 *  localises the biliary tract structure, which necessitates the ultrasound; 2 = the ultrasound confirms the gallstone
 *  issue, which reaches the surgeon and anaesthetist. Nothing is added to the master; more of it is selected.
 *  The Patient root carries the patient-level descriptors (age, weight, ASA). */
export function PatientMasterFigure({ stage = 0 }: { stage?: 0 | 1 | 2 }) {
  const W = 76, H = 22;
  const bili = stage < 1; // biliary tract structure and the ultrasound it necessitates, faded until the physician assesses
  const gall = stage < 2; // gallstone issue and the treatment it necessitates, faded until imaging confirms
  const map = (faded: boolean) => (faded ? '#dedede' : '#999');
  const tree = (faded: boolean) => (faded ? '#dedede' : '#aaa');
  const pre = (faded: boolean) => (faded ? '#cfcfcf' : '#8a6d4a');
  const prod = (faded: boolean) => (faded ? '#cfcfcf' : '#157f8f');
  const preM = (faded: boolean) => (faded ? 'url(#pmPaF)' : 'url(#pmPa)');
  const prodM = (faded: boolean) => (faded ? 'url(#pmPrF)' : 'url(#pmPr)');

  const specNodes: [number, number, number, string, boolean][] = [
    [4, 36, 80, 'Patient', false],
    [20, 73, 80, 'Abdomen', false],
    // Sibling structures span the concept: a lining and space, a tissue region, and an organ.
    [36, 110, 80, 'Peritoneum', true],
    [36, 147, 80, 'Abdominal Wall', true],
    [36, 184, 80, 'Biliary Tract', bili],
    [52, 221, 80, 'Gallstones', gall],
  ];
  const steps: [number, number, string, boolean][] = [
    [280, 60, 'Triage', false],
    [360, 112, 'Assess', false],
    [472, 112, 'Scan', bili],
    [320, 164, 'Plan', gall],
    [432, 164, 'Resect', gall],
    [320, 216, 'Prepare', gall],
    [432, 216, 'Induce', gall],
    [544, 216, 'Recover', gall],
  ];
  const box = (label: string): Box => {
    const [cx, cy] = steps.find(s => s[2] === label)!;
    return { cx, cy, w: W, h: H };
  };
  const patientIn = terminalIn(box('Triage'));
  const patientOut = terminalOut(box('Recover'), 29);
  return (
    <svg viewBox="0 0 660 262" style={{ width: '100%', height: 'auto', display: 'block', margin: '0.5rem auto' }}>
      <defs>
        <marker id="pmPa" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#8a6d4a" /></marker>
        <marker id="pmPaF" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#cfcfcf" /></marker>
        <marker id="pmPr" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#157f8f" /></marker>
        <marker id="pmPrF" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#cfcfcf" /></marker>
      </defs>

      <rect x={160} y={34} width={480} height={52} fill="#faf9f7" stroke="#e6e4e0" strokeWidth={1} />
      <rect x={160} y={86} width={480} height={52} fill="#f3f1ec" stroke="#e6e4e0" strokeWidth={1} />
      <rect x={160} y={138} width={480} height={52} fill="#faf9f7" stroke="#e6e4e0" strokeWidth={1} />
      <rect x={160} y={190} width={480} height={52} fill="#f3f1ec" stroke="#e6e4e0" strokeWidth={1} />
      <text x={230} y={63} fontSize={8.5} fill="#999" textAnchor="end" fontStyle="italic" className="paper-rev-svg-minor">Triage nurse</text>
      <text x={230} y={115} fontSize={8.5} fill="#999" textAnchor="end" fontStyle="italic" className="paper-rev-svg-minor">Physician</text>
      <text x={230} y={167} fontSize={8.5} fill="#999" textAnchor="end" fontStyle="italic">Surgeon</text>
      <text x={230} y={219} fontSize={8.5} fill="#999" textAnchor="end" fontStyle="italic">Anaesthetist</text>

      <text x={68} y={22} fontSize={9} fill="#999" textAnchor="middle" fontStyle="italic">Master specification</text>
      <text x={400} y={22} fontSize={9} fill="#999" textAnchor="middle" fontStyle="italic">Master process, by skillset</text>
      <text x={52} y={68} fontSize={7} fill="#999" textAnchor="middle" fontStyle="italic">age, weight, ASA</text>
      <text x={68} y={105} fontSize={7} fill="#999" textAnchor="middle" fontStyle="italic" className="paper-rev-svg">site, severity</text>
      <text x={52} y={216} fontSize={7} fill={bili ? '#ccc' : '#999'} textAnchor="start" fontStyle="italic" className="paper-rev-svg">wall thickness, duct width</text>

      <path d="M12,58 V84 H20" stroke={tree(false)} strokeWidth={1} fill="none" />
      <path d="M30,95 V195" stroke={tree(true)} strokeWidth={1} strokeDasharray="3 2" fill="none" />
      <path d="M30,121 H36" stroke={tree(true)} strokeWidth={1} strokeDasharray="3 2" fill="none" />
      <path d="M30,158 H36" stroke={tree(true)} strokeWidth={1} strokeDasharray="3 2" fill="none" />
      <path d="M30,195 H36" stroke={tree(bili)} strokeWidth={1} strokeDasharray={bili ? '3 2' : undefined} fill="none" />
      <path d="M46,206 V232 H52" stroke={tree(gall)} strokeWidth={1} strokeDasharray={gall ? '3 2' : undefined} fill="none" />

      <path d={mappingPath([100, 84], 140, [
        { channelY: 40, box: box('Triage') },
        { channelY: 97, box: box('Assess') },
      ])} stroke={map(false)} strokeWidth={0.8} strokeDasharray="3 2" fill="none" />
      <path d={mappingPath([116, 195], 146, [
        { channelY: 92, box: box('Scan') },
      ])} stroke={map(bili)} strokeWidth={0.8} strokeDasharray="3 2" fill="none" />
      <path d={mappingPath([132, 232], 152, [
        ...['Plan', 'Resect'].map(l => ({ channelY: 144, box: box(l) })),
        ...['Prepare', 'Induce', 'Recover'].map(l => ({ channelY: 196, box: box(l) })),
      ])} stroke={map(gall)} strokeWidth={0.8} strokeDasharray="3 2" fill="none" />

      <line x1={398} y1={112} x2={432} y2={112} stroke={pre(bili)} strokeWidth={1.2} markerEnd={preM(bili)} />
      <line x1={358} y1={164} x2={392} y2={164} stroke={pre(gall)} strokeWidth={1.2} markerEnd={preM(gall)} />
      <line x1={358} y1={216} x2={392} y2={216} stroke={pre(gall)} strokeWidth={1.2} markerEnd={preM(gall)} />
      <line x1={470} y1={216} x2={504} y2={216} stroke={pre(gall)} strokeWidth={1.2} markerEnd={preM(gall)} />

      <path d="M318,60 H360 V101" stroke={prod(false)} strokeWidth={1} strokeDasharray="4 2" fill="none" markerEnd={prodM(false)} />
      <text x={366} y={80} fontSize={7.5} fill={prod(false)} textAnchor="start" className="paper-rev-svg-minor">triaged patient</text>
      <path d="M472,123 V131 H320 V153" stroke={prod(gall)} strokeWidth={1} strokeDasharray="4 2" fill="none" markerEnd={prodM(gall)} />
      <text x={478} y={131} fontSize={7.5} fill={prod(gall)} textAnchor="start">referral</text>
      <path d="M320,175 V205" stroke={prod(gall)} strokeWidth={1} strokeDasharray="4 2" fill="none" markerEnd={prodM(gall)} />
      <text x={314} y={187} fontSize={7.5} fill={prod(gall)} textAnchor="end">plan</text>
      {/* The surgeon operates on the anaesthetised patient, and recovery receives the operated patient. */}
      <path d="M432,205 V175" stroke={prod(gall)} strokeWidth={1} strokeDasharray="4 2" fill="none" markerEnd={prodM(gall)} />
      <text x={438} y={193} fontSize={7.5} fill={prod(gall)} textAnchor="start" className="paper-rev-svg">anaesthetised patient</text>
      <path d="M470,164 H544 V205" stroke={prod(gall)} strokeWidth={1} strokeDasharray="4 2" fill="none" markerEnd={prodM(gall)} />
      <text x={507} y={159} fontSize={7.5} fill={prod(gall)} textAnchor="middle" className="paper-rev-svg">operated patient</text>

      {/* Products crossing the process boundary: the arriving patient in, the recovered patient out. */}
      <line {...patientIn} stroke={prod(false)} strokeWidth={1} strokeDasharray="4 2" markerEnd={prodM(false)} />
      <text x={patientIn.x1 + 6} y={patientIn.y1 + 8} fontSize={7.5} fill={prod(false)} textAnchor="start" className="paper-rev-svg">patient</text>
      <line {...patientOut} stroke={prod(gall)} strokeWidth={1} strokeDasharray="4 2" markerEnd={prodM(gall)} />
      <text x={patientOut.x1 + 6} y={patientOut.y2 - 4} fontSize={7.5} fill={prod(gall)} textAnchor="start" className="paper-rev-svg">recovered patient</text>

      {specNodes.map(([x, y, w, label, faded], i) => (
        <g key={`s${i}`}>
          <rect x={x} y={y} width={w} height={22} rx={3} fill={faded ? '#f6f6f6' : '#efe9e0'} stroke={faded ? '#cfcfcf' : '#8a6d4a'} strokeWidth={1} strokeDasharray={faded ? '3 2' : undefined} />
          <text x={x + w / 2} y={y + 15} fontSize={9} fill={faded ? '#bbb' : '#4a3c28'} textAnchor="middle" className={revClass(label)}>{label}</text>
        </g>
      ))}

      {steps.map(([cx, cy, label, faded], i) => (
        <g key={`p${i}`}>
          <rect x={cx - W / 2} y={cy - H / 2} width={W} height={H} rx={3} fill={faded ? '#f6f6f6' : '#efe9e0'} stroke={faded ? '#cfcfcf' : '#8a6d4a'} strokeWidth={1} strokeDasharray={faded ? '3 2' : undefined} />
          <text x={cx} y={cy + 3} fontSize={9} fill={faded ? '#bbb' : '#4a3c28'} textAnchor="middle" className={revClass(label)}>{label}</text>
        </g>
      ))}
    </svg>
  );
}

/** Generic master specification and master process, with the subset a project selects highlighted (solid) and
 *  the rest faded (dashed): selecting spec nodes picks out the corresponding process steps via the mapping. */
export function MasterInstanceFigure() {
  const W = MI_W, H = MI_H;
  const specNodes: [number, number, number, string, boolean][] = [
    [30, 30, 46, 'S', false],
    [58, 66, 46, 'A', false],
    [58, 102, 46, 'B', false],
    [58, 138, 46, 'C', true],
  ];
  const steps: [number, number, string, boolean][] = [
    [MI_P1.cx, MI_P1.cy, 'p1', false],
    [240, 62, 'p0', false], // necessitated by the root S, the product as a whole (e.g. estimation); comes first
    [316, 114, 'q1', false],
    [MI_Q2.cx, MI_Q2.cy, 'q2', false],
    [430, 170, 'r1', true],
    [548, 62, 'p2', true],
    [548, 170, 'r2', false],
  ];
  const box = (label: string): Box => {
    const [cx, cy] = steps.find(s => s[2] === label)!;
    return miBox(cx, cy);
  };
  const specIn = terminalIn(box('p0'));
  const productOut = terminalOut(box('r2'));
  return (
    <svg viewBox="0 0 660 218" style={{ width: '100%', height: 'auto', display: 'block', margin: '0.5rem auto' }}>
      <defs>
        <marker id="miPr" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#157f8f" /></marker>
        <marker id="miPa" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#8a6d4a" /></marker>
        <marker id="miF" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#cfcfcf" /></marker>
      </defs>
      <rect x={180} y={30} width={456} height={56} fill="#faf9f7" stroke="#e6e4e0" strokeWidth={1} />
      <rect x={180} y={86} width={456} height={56} fill="#f3f1ec" stroke="#e6e4e0" strokeWidth={1} />
      <rect x={180} y={142} width={456} height={56} fill="#faf9f7" stroke="#e6e4e0" strokeWidth={1} />
      {/* lane labels sit at the right end, leaving the left of Skillset 1 for p0 */}
      <text x={630} y={61} fontSize={8.5} fill="#999" textAnchor="end" fontStyle="italic">Skillset 1</text>
      <text x={630} y={117} fontSize={8.5} fill="#999" textAnchor="end" fontStyle="italic">Skillset 2</text>
      <text x={630} y={173} fontSize={8.5} fill="#999" textAnchor="end" fontStyle="italic">Skillset 3</text>

      <text x={67} y={18} fontSize={9} fill="#999" textAnchor="middle" fontStyle="italic">Master specification</text>
      <text x={420} y={18} fontSize={9} fill="#999" textAnchor="middle" fontStyle="italic">Master process, by skillset</text>

      <path d="M40,54 V114 M40,78 H58 M40,114 H58" stroke="#aaa" strokeWidth={1} fill="none" />
      <path d="M40,114 V150 H58" stroke="#dedede" strokeWidth={1} strokeDasharray="3 2" fill="none" />

      <path d={mappingPath([76, 42], 112, [{ channelY: 34, box: box('p0') }])} stroke="#999" strokeWidth={0.8} strokeDasharray="3 2" fill="none" />
      <path d={polylinesPath(MI_A_MAP)} stroke="#999" strokeWidth={0.8} strokeDasharray="3 2" fill="none" />
      <path d={mappingPath([104, 114], 148, [{ channelY: 97, box: box('q1') }, { channelY: 146, box: box('r2') }])} stroke="#999" strokeWidth={0.8} strokeDasharray="3 2" fill="none" />
      <path d={mappingPath([104, 150], 166, [{ channelY: 40, box: box('p2') }, { channelY: 153, box: box('r1') }])} stroke="#dedede" strokeWidth={0.8} strokeDasharray="3 2" fill="none" />

      <line x1={316} y1={73} x2={316} y2={101} stroke="#157f8f" strokeWidth={1} strokeDasharray="4 2" markerEnd="url(#miPr)" />
      <line x1={271} y1={62} x2={283} y2={62} stroke="#8a6d4a" strokeWidth={1.2} markerEnd="url(#miPa)" />
      <line x1={347} y1={114} x2={397} y2={114} stroke="#8a6d4a" strokeWidth={1.2} markerEnd="url(#miPa)" />
      <line x1={430} y1={125} x2={430} y2={157} stroke="#cfcfcf" strokeWidth={1} strokeDasharray="4 2" markerEnd="url(#miF)" />
      <line x1={347} y1={62} x2={515} y2={62} stroke="#cfcfcf" strokeWidth={1.2} markerEnd="url(#miF)" />
      <line x1={461} y1={170} x2={515} y2={170} stroke="#cfcfcf" strokeWidth={1.2} markerEnd="url(#miF)" />
      <line x1={548} y1={73} x2={548} y2={157} stroke="#cfcfcf" strokeWidth={1} strokeDasharray="4 2" markerEnd="url(#miF)" />

      {/* Products crossing the process boundary: in to the first step, out of the last. */}
      <line {...specIn} stroke="#157f8f" strokeWidth={1} strokeDasharray="4 2" markerEnd="url(#miPr)" />
      <line {...productOut} stroke="#157f8f" strokeWidth={1} strokeDasharray="4 2" markerEnd="url(#miPr)" />

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

/** Figure 5 (instances): Figure 1's master specification laid flat as a floor, and the selection raised above it
 *  as a tree of node instances. B is instanced twice, each instance with its own descriptor value, and both
 *  project onto the one node B below. C is unselected, so it has no instance and stays faded on the floor. */
export function SelectionInstanceFigure() {
  // Oblique projection shared with the scaling figure: a unit of depth moves 0.87 right and 0.5 up, and the
  // selection sits a fixed height above the floor.
  const x0 = 70, base = 200, lift = 96;
  const proj = (x: number, d: number, z = 0): [number, number] => [x0 + x + d * 0.87, base - d * 0.5 - z];
  const BW = 34, BH = 16;
  // Floor nodes of the master specification, in (x, depth): the root S at the left, its children A, B and C.
  const spec: { label: string; x: number; d: number; faded?: boolean }[] = [
    { label: 'S', x: 0, d: 60 },
    { label: 'A', x: 110, d: 100 },
    { label: 'B', x: 110, d: 60 },
    { label: 'C', x: 110, d: 20, faded: true },
  ];
  // Instances: the root, A once, and B twice, the second instance set in front of the first.
  const inst: { label: string; of: string; x: number; d: number; value?: string }[] = [
    { label: 'Ŝ', of: 'S', x: 0, d: 60 },
    { label: 'Â', of: 'A', x: 110, d: 100 },
    { label: 'B̂₁', of: 'B', x: 110, d: 60, value: 'd = 2' },
    { label: 'B̂₂', of: 'B', x: 110, d: 32, value: 'd = 5' },
  ];
  const floor = (lx: number, ld: number, hx: number, hd: number) =>
    [proj(lx, ld), proj(hx, ld), proj(hx, hd), proj(lx, hd)].map(p => p.join(',')).join(' ');
  const tree = (pts: { x: number; d: number }[], parentX: number, parentD: number, z: number) =>
    pts.map(({ x, d }) => {
      const [ax, ay] = proj(parentX + BW / 2, parentD, z);
      const [mx, my] = proj(parentX + BW / 2 + 22, parentD, z);
      const [nx, ny] = proj(parentX + BW / 2 + 22, d, z);
      const [cx, cy] = proj(x - BW / 2, d, z);
      return `M${ax},${ay} L${mx},${my} L${nx},${ny} L${cx},${cy}`;
    }).join(' ');
  const node = (label: string, x: number, d: number, z: number, faded = false, key?: string) => {
    const [cx, cy] = proj(x, d, z);
    return (
      <g key={key ?? label}>
        <rect x={cx - BW / 2} y={cy - BH / 2} width={BW} height={BH} rx={3} fill={faded ? '#f6f6f6' : '#efe9e0'} stroke={faded ? '#cfcfcf' : '#8a6d4a'} strokeWidth={1} strokeDasharray={faded ? '3 2' : undefined} />
        <text x={cx} y={cy + 3} fontSize={9} fill={faded ? '#bbb' : '#4a3c28'} textAnchor="middle">{label}</text>
      </g>
    );
  };
  const s = spec[0];
  const children = spec.slice(1);
  const iRoot = inst[0];
  const iKids = inst.slice(1);
  return (
    <svg viewBox="40 40 420 190" style={{ width: '70%', height: 'auto', display: 'block', margin: '0 auto' }}>
      <polygon points={floor(-30, 0, 160, 120)} fill="#faf9f7" stroke="#d9d5ce" strokeWidth={1} />
      <text x={proj(160, 0)[0] + 6} y={proj(160, 0)[1]} fontSize={9} fill="#999" fontStyle="italic">Master specification</text>
      <text x={proj(160, 0, lift)[0] + 6} y={proj(160, 0, lift)[1]} fontSize={9} fill="#999" fontStyle="italic">Selection</text>

      {/* Each instance projects down onto its node. */}
      {inst.map(({ label, of, x, d }) => {
        const n = spec.find(t => t.label === of)!;
        const [ux, uy] = proj(x, d, lift);
        const [fx, fy] = proj(n.x, n.d);
        return <line key={`drop${label}`} x1={ux} y1={uy + BH / 2} x2={fx} y2={fy - BH / 2} stroke="#bbb" strokeWidth={0.8} strokeDasharray="2 2" />;
      })}

      <path d={tree(children.filter(c => !c.faded), s.x, s.d, 0)} stroke="#aaa" strokeWidth={1} fill="none" />
      <path d={tree(children.filter(c => c.faded), s.x, s.d, 0)} stroke="#dedede" strokeWidth={1} strokeDasharray="3 2" fill="none" />
      {spec.map(({ label, x, d, faded }) => node(label, x, d, 0, faded, `f${label}`))}

      <path d={tree(iKids, iRoot.x, iRoot.d, lift)} stroke="#8a6d4a" strokeWidth={1} fill="none" />
      {inst.map(({ label, x, d }) => node(label, x, d, lift, false, `i${label}`))}
      {inst.filter(i => i.value).map(({ label, x, d, value }) => {
        const [cx, cy] = proj(x + BW / 2 + 4, d, lift);
        return <text key={`v${label}`} x={cx} y={cy + 3} fontSize={8} fill="#8a6d4a" textAnchor="start">{value}</text>;
      })}
    </svg>
  );
}
