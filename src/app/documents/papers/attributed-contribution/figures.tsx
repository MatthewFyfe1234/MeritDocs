/** Figure 1 (the attributed step): one node of the specification, carrying its descriptors, maps to the one step it
 *  necessitates, and the step holds the record each delivery leaves: the agent, tools and materials involved and the
 *  metrics recorded, including any measures of its output. The output itself lies outside the record and passes to
 *  the steps that follow. Each node shows only its name, with its details in an inner box, and the record sits inside
 *  the step rather than beside it, since it is what the step leaves, not a further stage. The boxes grow with the
 *  longest list. Palette and labelling follow the companion SPD figures: browns for specification and process, grey
 *  italic headers. */
export function AttributedStepFigure({
  node = 'A',
  step = 'p1',
  descriptors = ['area', 'height', 'grade of material'],
  resources = ['agent', 'tools', 'materials'],
  metrics = ['time taken', 'material used'],
  output = 'output',
}: {
  node?: string; step?: string; descriptors?: string[]; resources?: string[]; metrics?: string[]; output?: string;
} = {}) {
  const rows = Math.max(3, descriptors.length, resources.length, metrics.length);
  const ih = 28 + rows * 12, oh = ih + 36, mid = 28 + oh / 2;
  return (
    <svg viewBox={`20 4 490 ${oh + 32}`} style={{ width: '84%', height: 'auto', display: 'block', margin: '0 auto' }}>
      <defs>
        <marker id="out-arrow" viewBox="0 0 6 6" refX={5} refY={3} markerWidth={6} markerHeight={6} orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#999" />
        </marker>
      </defs>
      <text x={95} y={18} fontSize={9} fill="#999" textAnchor="middle" fontStyle="italic">Specification</text>
      <text x={290} y={18} fontSize={9} fill="#999" textAnchor="middle" fontStyle="italic">Process</text>

      {/* Specification node A, its descriptors in an inner box */}
      <rect x={40} y={28} width={110} height={oh} rx={3} fill="#efe9e0" stroke="#8a6d4a" strokeWidth={1} />
      <text x={95} y={44} fontSize={9} fill="#4a3c28" textAnchor="middle">{node}</text>
      <rect x={50} y={54} width={90} height={ih} rx={2} fill="#faf9f7" stroke="#d9d5ce" strokeWidth={1} />
      <text x={58} y={65} fontSize={7.5} fill="#999" fontStyle="italic">descriptors</text>
      {descriptors.map((d, i) => (
        <text key={d} x={58} y={79 + i * 12} fontSize={8.5} fill="#8a6d4a">{d}</text>
      ))}

      <path d={`M150,${mid} H210`} stroke="#999" strokeWidth={0.8} strokeDasharray="3 2" fill="none" />

      {/* Process step p1, its record in an inner box */}
      <rect x={210} y={28} width={170} height={oh} rx={3} fill="#efe9e0" stroke="#8a6d4a" strokeWidth={1} />
      <text x={295} y={44} fontSize={9} fill="#4a3c28" textAnchor="middle">{step}</text>
      <rect x={220} y={54} width={150} height={ih} rx={2} fill="#faf9f7" stroke="#d9d5ce" strokeWidth={1} />
      <text x={228} y={65} fontSize={7.5} fill="#999" fontStyle="italic">record</text>
      {resources.map((r, i) => (
        <text key={r} x={228} y={79 + i * 12} fontSize={8.5} fill="#666">{r}</text>
      ))}
      {metrics.map((m, i) => (
        <text key={m} x={292} y={79 + i * 12} fontSize={8.5} fontWeight={600} fill="#444">{m}</text>
      ))}

      {/* The output, outside the record, passed to the steps that follow */}
      <path d={`M380,${mid} H410`} stroke="#999" strokeWidth={0.8} strokeDasharray="3 2" fill="none" markerEnd="url(#out-arrow)" />
      <text x={416} y={mid - 6} fontSize={7.5} fill="#999" fontStyle="italic">output</text>
      <text x={416} y={mid + 7} fontSize={8.5} fill="#4a3c28">{output}</text>
    </svg>
  );
}

/** Mix a hex colour toward white by t (0 = colour, 1 = white), or toward black where t is negative. */
function shade(hex: string, t: number): string {
  const n = parseInt(hex.slice(1), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) =>
    Math.round(t >= 0 ? c + (255 - c) * t : c * (1 + t)),
  );
  return `#${ch.map((c) => c.toString(16).padStart(2, '0')).join('')}`;
}

/** A solid isometric column divided into bands, drawn as one box: opaque front and side faces split into bands, and
 *  a single top face, so the stack reads as one object rather than separate open boxes. */
function SolidStack({ x, baseline, width, depth, bands, labels }: {
  x: number; baseline: number; width: number; depth: number;
  bands: { h: number; color: string }[]; labels?: string[];
}) {
  const dx = depth * 0.87, dy = depth * 0.5;
  let y = baseline;
  const parts = bands.map((b, i) => {
    const y0 = y, y1 = y - b.h;
    y = y1;
    return { ...b, y0, y1, i };
  });
  const top = y;
  return (
    <g>
      {parts.map((p) => (
        <polygon key={`s${p.i}`} points={`${x + width},${p.y1} ${x + width + dx},${p.y1 - dy} ${x + width + dx},${p.y0 - dy} ${x + width},${p.y0}`}
          fill={shade(p.color, -0.18)} stroke="#fff" strokeWidth={0.6} />
      ))}
      {parts.map((p) => (
        <rect key={`f${p.i}`} x={x} y={p.y1} width={width} height={p.y0 - p.y1} fill={p.color} stroke="#fff" strokeWidth={0.6} />
      ))}
      <polygon points={`${x},${top} ${x + width},${top} ${x + width + dx},${top - dy} ${x + dx},${top - dy}`}
        fill={shade(parts[parts.length - 1].color, 0.25)} stroke="#333" strokeWidth={1} />
      <polygon points={`${x},${top} ${x + width},${top} ${x + width},${baseline} ${x},${baseline}`} fill="none" stroke="#333" strokeWidth={1.2} />
      <polygon points={`${x + width},${top} ${x + width + dx},${top - dy} ${x + width + dx},${baseline - dy} ${x + width},${baseline}`} fill="none" stroke="#333" strokeWidth={1} />
      {labels && parts.map((p) => (p.y0 - p.y1 >= 11 && labels[p.i] ? (
        <text key={`l${p.i}`} x={x + width / 2} y={(p.y0 + p.y1) / 2 + 3} fontSize={7.5} fontWeight={600} fill="#fff" textAnchor="middle">{labels[p.i]}</text>
      ) : null))}
    </g>
  );
}

type Group = { label: string; share: number; dev: number };
const GROUP_COLOURS = ['#157f8f', '#8a6d4a', '#5a7d3a', '#7a5a8a', '#c0703a', '#4a6a9a'];

/** A specification node stacked by delivery, each slab's height its size and its shade a second descriptor, beside
 *  one column per metric of its step, each layered by one component of the trace. A group keeps its colour across
 *  columns; each layer's height is its share of that metric and its label is its deviation from what the descriptors
 *  would predict. Where the deliveries are too many to label, a run of them is drawn enlarged beside the stack. */
function NodeAndMetricsFigure({ node, step, descriptor, deliveries, explode, metrics }: {
  node: string; step: string; descriptor: string;
  deliveries: { size: number; dark: boolean; label: string }[];
  explode?: [number, number];
  metrics: { name: string; groups: Group[] }[];
}) {
  const base = 200, H = 130;
  const spec = { x: explode ? 150 : 64, w: 44, depth: 24 };
  const col = { w: 50, depth: 30, x0: spec.x + 100, gap: 32 };
  const sizeTotal = deliveries.reduce((t, d) => t + d.size, 0);
  const specBands = deliveries.map((d) => ({ h: (d.size / sizeTotal) * H, color: d.dark ? '#6b5236' : '#c2a985' }));
  const bottoms: number[] = [];
  specBands.reduce((y, b) => (bottoms.push(y), y - b.h), base);
  const groupLabels = metrics[0].groups.map((g) => g.label);
  const pct = (d: number) => {
    const n = Math.round(Math.abs(d) * 100);
    return n === 0 ? '0%' : `${d < 0 ? '−' : '+'}${n}%`;
  };
  const right = col.x0 + metrics.length * (col.w + col.depth * 0.87 + col.gap);

  // The enlarged run: its slabs rescaled to a fixed height and placed level with the run in the main stack.
  const mag = explode && (() => {
    const [a, b] = explode;
    const y0 = bottoms[a], y1 = bottoms[b - 1] - specBands[b - 1].h;
    const magH = 90, scale = magH / (y0 - y1);
    const baseline = Math.max(Math.min(base, (y0 + y1) / 2 + magH / 2), 70 + magH);
    return { a, b, y0, y1, x: 60, w: 40, depth: 20, baseline, top: baseline - magH, bands: specBands.slice(a, b).map((s) => ({ h: s.h * scale, color: s.color })) };
  })();
  const labelled = mag
    ? mag.bands.map((s, i) => ({ label: deliveries[mag.a + i].label, h: s.h, x: mag.x }))
    : specBands.map((s, i) => ({ label: deliveries[i].label, h: s.h, x: spec.x }));
  const labelBase = mag ? mag.baseline : base;

  return (
    <svg viewBox={`0 14 ${right + 10} 214`} style={{ width: '88%', height: 'auto', display: 'block', margin: '0 auto' }}>
      <text x={spec.x + spec.w / 2} y={60} fontSize={9} fill="#999" textAnchor="middle" fontStyle="italic">Specification</text>
      <text x={(col.x0 + right) / 2} y={28} fontSize={9} fill="#999" textAnchor="middle" fontStyle="italic">{step}</text>

      {groupLabels.map((l, i) => (
        <g key={`k${i}`}>
          <rect x={col.x0 + i * 62} y={36} width={8} height={8} fill={GROUP_COLOURS[i]} />
          <text x={col.x0 + i * 62 + 11} y={43} fontSize={7.5} fill="#444">{l}</text>
        </g>
      ))}

      <SolidStack x={spec.x} baseline={base} width={spec.w} depth={spec.depth} bands={specBands} />
      {mag && (
        <g>
          <rect x={spec.x} y={mag.y1} width={spec.w} height={mag.y0 - mag.y1} fill="none" stroke="#333" strokeWidth={1} strokeDasharray="3 2" />
          <line x1={spec.x} y1={mag.y1} x2={mag.x + mag.w + 2} y2={mag.top} stroke="#999" strokeWidth={0.8} strokeDasharray="3 2" />
          <line x1={spec.x} y1={mag.y0} x2={mag.x + mag.w + 2} y2={mag.baseline} stroke="#999" strokeWidth={0.8} strokeDasharray="3 2" />
          <SolidStack x={mag.x} baseline={mag.baseline} width={mag.w} depth={mag.depth} bands={mag.bands} />
        </g>
      )}
      {(() => {
        let y = labelBase;
        return labelled.map((d, i) => {
          const mid = y - d.h / 2;
          y -= d.h;
          return <text key={`d${i}`} x={d.x - 4} y={mid + 2.5} fontSize={6.5} fill="#4a3c28" textAnchor="end">{d.label}</text>;
        });
      })()}
      <text x={spec.x + spec.w / 2} y={base + 13} fontSize={8.5} fill="#4a3c28" textAnchor="middle">{node}</text>
      <text x={spec.x + spec.w / 2} y={base + 24} fontSize={7.5} fill="#8a6d4a" textAnchor="middle">{descriptor}</text>

      {metrics.map((m, mi) => {
        const x = col.x0 + mi * (col.w + col.depth * 0.87 + col.gap);
        return (
          <g key={m.name}>
            <SolidStack x={x} baseline={base} width={col.w} depth={col.depth}
              bands={m.groups.map((g, gi) => ({ h: g.share * H, color: GROUP_COLOURS[gi] }))}
              labels={m.groups.map((g) => pct(g.dev))} />
            <text x={x + col.w / 2} y={base + 13} fontSize={8.5} fill="#444" textAnchor="middle">{m.name}</text>
          </g>
        );
      })}
    </svg>
  );
}

/** Build each group's share of a metric and its deviation from the descriptor-only forecast. */
function groupMetric<T>(rows: T[], key: (r: T) => number, n: number, labels: string[], value: (r: T) => number, forecast: (r: T) => number): Group[] {
  const total = rows.reduce((t, r) => t + value(r), 0);
  return Array.from({ length: n }, (_, g) => {
    const rs = rows.filter((r) => key(r) === g);
    const actual = rs.reduce((t, r) => t + value(r), 0);
    const expected = rs.reduce((t, r) => t + forecast(r), 0);
    return { label: labels[g], share: actual / total, dev: actual / expected - 1 };
  });
}
const mean = (xs: number[]) => xs.reduce((t, x) => t + x, 0) / xs.length;

/** Simulated deliveries of step p1 for Figure 2: three sizes and grades of node A, each delivered once by each of
 *  three workers, so nine deliveries. Time and material scale with area, at a rate set by the grade, and each worker
 *  has a habitual speed and wastage. */
const STEP = (() => {
  const speed = [1.0, 0.85, 1.2], waste = [1.05, 1.2, 1.0];
  const hoursPerM2 = [0.2, 0.3], kgPerM2 = [12, 15];
  const jobs = [{ area: 30, grade: 0 }, { area: 20, grade: 1 }, { area: 45, grade: 1 }];
  // Jobs in an order where neighbours differ; each job's nth occurrence goes to worker (job + n) mod 3.
  const order = [0, 2, 1, 0, 1, 2, 1, 0, 2];
  const seen = [0, 0, 0];
  const deliveries = order.map((j) => {
    const w = (j + seen[j]++) % 3, { area, grade } = jobs[j];
    return { area, grade, w, time: area * hoursPerM2[grade] * speed[w], material: area * kgPerM2[grade] * waste[w] };
  });
  const ms = mean(speed), mw = mean(waste);
  type D = typeof deliveries[number];
  const workers = ['worker 1', 'worker 2', 'worker 3'];
  const byWorker = [
    { name: 'time', groups: groupMetric(deliveries, (d: D) => d.w, 3, workers, (d) => d.time, (d) => d.area * hoursPerM2[d.grade] * ms) },
    { name: 'material', groups: groupMetric(deliveries, (d: D) => d.w, 3, workers, (d) => d.material, (d) => d.area * kgPerM2[d.grade] * mw) },
  ];
  return { byWorker, deliveries: deliveries.map((d) => ({ size: d.area, dark: d.grade === 1, label: `${d.area} m², grade ${d.grade + 1}` })) };
})();

export function StepScalingFigure() {
  return <NodeAndMetricsFigure node="A" step="p1, by worker" descriptor="area, grade" deliveries={STEP.deliveries} metrics={STEP.byWorker} />;
}

/** Simulated tea rounds for the example in Section 4: two workers and two kettles, each worker using each kettle
 *  twice, so eight rounds. Each size and target temperature is made once by each worker on the same kettle,
 *  so the workers are compared on like rounds, and the rounds are ordered so that neighbours differ. Time and energy follow the temperature rise from the tap to the
 *  target. */
const TEA = (() => {
  const overfill = [1.05, 1.6];
  const minPerLitreK = [0.0275, 0.041]; // 3 kW and 2 kW kettles, allowing for losses
  const kwhPerLitreK = [0.00132, 0.00142];
  const inlet = 12; // tap water, °C
  const overhead = 0.3; // minutes
  const cups = [3, 4, 2, 5, 4, 3, 5, 2];
  const target = [100, 80, 80, 100, 80, 100, 100, 80];
  const worker = [0, 1, 0, 1, 0, 1, 0, 1];
  const kettle = [0, 0, 1, 1, 0, 0, 1, 1];
  const rounds = cups.map((c, r) => {
    const w = worker[r], k = kettle[r], need = 0.25 * c, rise = target[r] - inlet;
    const drawn = need * overfill[w];
    return { w, k, cups: c, target: target[r], need, rise, drawn, time: overhead + drawn * rise * minPerLitreK[k], energy: drawn * rise * kwhPerLitreK[k] };
  });
  const mo = mean(overfill), mt = mean(minPerLitreK), me = mean(kwhPerLitreK), mi = inlet;
  type R = typeof rounds[number];
  const metrics = (key: (r: R) => number, labels: string[]) => [
    { name: 'time', groups: groupMetric(rounds, key, 2, labels, (r) => r.time, (r) => overhead + r.need * mo * (r.target - mi) * mt) },
    { name: 'energy', groups: groupMetric(rounds, key, 2, labels, (r) => r.energy, (r) => r.need * mo * (r.target - mi) * me) },
    { name: 'water drawn', groups: groupMetric(rounds, key, 2, labels, (r) => r.drawn, (r) => r.need * mo) },
  ];
  const deliveries = rounds.map((r) => ({ size: r.cups, dark: r.target === 100, label: `${r.cups} cups, ${r.target}°C` }));
  return { byWorker: metrics((r) => r.w, ['worker 1', 'worker 2']), byKettle: metrics((r) => r.k, ['3 kW kettle', '2 kW kettle']), deliveries };
})();

/** Simulated harvests for the second example in Section 4: a contractor's three operators and two combine models
 *  over 36 fields of 10 to 60 hectares of wheat or barley, each combination of operator, combine, crop and moisture
 *  band occurring once. Each operator drives at a habitual pace, which shortens time but raises grain loss; each
 *  combine has its own work rate and fuel use; a damp standing crop
 *  slows the combine and raises fuel use and grain loss. Forecasts condition on area and crop and average over the
 *  rest. Values are illustrative, within the ranges field studies report. */
const HARVEST = (() => {
  const pace = [1.0, 1.2, 0.9];
  const lossRate = [1.1, 2.0, 1.0]; // per cent of yield
  const workRate = [4.6, 3.1]; // hectares per hour
  const fuelPerHour = [90, 65]; // litres per hour
  const cropRate = [1.0, 1.1], yieldT = [8, 6.5], crops = ['wheat', 'barley'];
  const moistRate = [1.0, 0.9, 0.75], moistFuel = [1.0, 1.05, 1.12], moistLoss = [1.0, 1.15, 1.5];
  // Fields are taken in the order i × 5 mod 36, so that neighbours in the stack differ.
  const fields = Array.from({ length: 36 }, (_, i) => {
    const r = (i * 5) % 36, o = r % 3, c = r % 2, block = Math.floor(r / 6), crop = block % 2, moist = block % 3;
    const area = 10 + 10 * ((r * 5 + (r >> 2)) % 6);
    const time = area / (cropRate[crop] * workRate[c] * pace[o] * moistRate[moist]);
    return { o, c, crop, moist, area, time, fuel: time * fuelPerHour[c] * moistFuel[moist], lost: (area * yieldT[crop] * lossRate[o] * moistLoss[moist]) / 100 };
  });
  const inv = (xs: number[]) => mean(xs.map((x) => 1 / x));
  const mt = inv(workRate) * inv(pace) * inv(moistRate);
  const mf = mean(fuelPerHour.map((f, i) => f / workRate[i])) * inv(pace) * mean(moistFuel.map((f, i) => f / moistRate[i]));
  const ml = mean(lossRate) * mean(moistLoss);
  type F = typeof fields[number];
  const metrics = (key: (r: F) => number, labels: string[]) => [
    { name: 'time', groups: groupMetric(fields, key, labels.length, labels, (r) => r.time, (r) => (r.area / cropRate[r.crop]) * mt) },
    { name: 'fuel', groups: groupMetric(fields, key, labels.length, labels, (r) => r.fuel, (r) => (r.area / cropRate[r.crop]) * mf) },
    { name: 'grain lost', groups: groupMetric(fields, key, labels.length, labels, (r) => r.lost, (r) => (r.area * yieldT[r.crop] * ml) / 100) },
  ];
  const deliveries = fields.map((r) => ({ size: r.area, dark: r.crop === 0, label: `${r.area} ha, ${crops[r.crop]}` }));
  return {
    byOperator: metrics((r) => r.o, ['operator 1', 'operator 2', 'operator 3']),
    byCombine: metrics((r) => r.c, ['combine A', 'combine B']),
    byMoisture: metrics((r) => r.moist, ['dry', 'moderate', 'damp']),
    deliveries,
  };
})();

export function TeaByWorkerFigure() {
  return <NodeAndMetricsFigure node="hot water" step="fill and boil kettle, by worker" descriptor="cups, target temperature" deliveries={TEA.deliveries} metrics={TEA.byWorker} />;
}

export function TeaByKettleFigure() {
  return <NodeAndMetricsFigure node="hot water" step="fill and boil kettle, by kettle" descriptor="cups, target temperature" deliveries={TEA.deliveries} metrics={TEA.byKettle} />;
}

const HARVEST_EXPLODE: [number, number] = [9, 14];

export function HarvestByOperatorFigure() {
  return <NodeAndMetricsFigure node="harvested crop" step="harvest field, by operator" descriptor="area, crop" deliveries={HARVEST.deliveries} explode={HARVEST_EXPLODE} metrics={HARVEST.byOperator} />;
}

export function HarvestByCombineFigure() {
  return <NodeAndMetricsFigure node="harvested crop" step="harvest field, by combine" descriptor="area, crop" deliveries={HARVEST.deliveries} explode={HARVEST_EXPLODE} metrics={HARVEST.byCombine} />;
}

export function HarvestByMoistureFigure() {
  return <NodeAndMetricsFigure node="harvested crop" step="harvest field, by moisture of the crop" descriptor="area, crop" deliveries={HARVEST.deliveries} explode={HARVEST_EXPLODE} metrics={HARVEST.byMoisture} />;
}
