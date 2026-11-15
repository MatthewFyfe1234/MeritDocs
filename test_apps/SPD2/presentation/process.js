// The master process panel: G drawn in job lanes, with the project shown against it, its forecasts, and,
// as it runs, its hatching, records and crosses.

import { el, svgEl, svgTitle, measure, arrowMarker, box, wrap } from "./util.js";
import { state, fadedStep, necessitating } from "./state.js";

// The master process G, in job lanes as in the paper's figures (the model has no layout; it is worked out
// here from the arcs), keeping the graph narrow and its lines short.
// Placement: steps in topological order, each in the first column that keeps its lane in order and comes
// no earlier than its suppliers. A supplier in another job may share the column, where nothing lies
// between, so the product drops straight down (or up) between the boxes, as in the paper's figures.
// Each arc carries a product. Within a job (brown): a straight arrow, or over the lane's boxes where
// others lie between. Between jobs (teal, dashed): straight where the steps share a column; otherwise the
// producer drops into its lane's out channel (below the boxes), which runs to the gap after it; one
// vertical there joins every lane involved; each consumer's lane carries it in its in channel (above the
// boxes) and down into the consumer, so no line crosses a box. Lines sharing a channel or gap are offset.
// Into and out of the process: vertical, as in the paper.
export function renderProcess(M) {
  const view = state.view;
  const body = document.querySelector("#process .body");
  const W = body.clientWidth, H = body.clientHeight;
  const labelW = 140, nodeW = 100, colW = 116, padTop = 20;
  const jobs = Object.values(M.G.jobs), steps = Object.values(M.G.steps), arcs = M.G.arcs;

  // Each step's text: its name, then a line per metric, its forecast where the project shown has one, or
  // once executed, its recorded value beside its forecast, with the error, the recorded value's
  // difference from the forecast as a share of it. Every box is as tall as the most lines need.
  const fixed = v => +v.toFixed(2);
  const values = id => {
    const forecast = view?.forecasts?.[id], recorded = view?.recorded?.[id];
    if (recorded) return Object.entries(recorded).flatMap(([m, v]) => forecast?.[m] !== undefined
      ? [`${m} ${fixed(v)} / ${fixed(forecast[m])}`, ...error(v, forecast[m])] : [`${m} ${fixed(v)}`]);
    return forecast ? Object.entries(forecast).map(([m, v]) => `${m} ${fixed(v)}`) : [];
  };
  // The error of a recorded value against its forecast, "+12%" over it or "−8%" under; where the forecast
  // is not above zero, as a fall in blood pressure that is forecast as a rise, a share of it means
  // nothing, so the difference in the metric's own units, "+59.4"
  function error(actual, forecast) {
    const sign = v => v > 0 ? "+" : v < 0 ? "−" : "±";
    if (forecast > 0) {
      const e = Math.round(100 * (actual - forecast) / forecast);
      return [`${sign(e)}${Math.abs(e)}%`];
    }
    const d = actual - forecast;
    return [`${sign(d)}${+Math.abs(d).toFixed(2)}`];
  }
  const text = Object.fromEntries(steps.map(s => [s.id, [...wrap(s.name), ...values(s.id)]]));
  const nodeH = Math.max(34, 8 + 13 * Math.max(...Object.values(text).map(lines => lines.length)));
  const minLaneH = nodeH + 56;                        // room above and below the boxes for the products
  const jobOf = id => M.G.steps[id].job;
  const lane = Object.fromEntries(jobs.map((j, i) => [j.id, i]));
  const laneOf = id => lane[jobOf(id)];
  const suppliers = id => arcs.filter(e => e.tgt === id && e.src !== null).map(e => e.src);

  const order = [], placed = new Set();
  while (order.length < steps.length) {
    for (const s of steps) {
      if (!placed.has(s.id) && suppliers(s.id).every(p => placed.has(p))) { placed.add(s.id); order.push(s.id); }
    }
  }
  // Cells, "lane,column", strictly between two lanes in one column
  const between = (a, b, c) => {
    const cells = [];
    for (let l = Math.min(a, b) + 1; l < Math.max(a, b); l++) cells.push(l + "," + c);
    return cells;
  };
  const column = {}, last = {}, boxes = new Set(), used = new Set();   // used: boxes and straight drops
  for (const id of order) {
    const L = laneOf(id);
    const blocked = c => used.has(L + "," + c) || suppliers(id).some(p =>
      laneOf(p) !== L && column[p] === c && between(laneOf(p), L, c).some(k => used.has(k)));
    let c = Math.max((last[L] ?? -1) + 1, ...suppliers(id).map(p => column[p] + (laneOf(p) === L ? 1 : 0)));
    while (blocked(c)) c++;
    column[id] = c;
    last[L] = c;
    boxes.add(L + "," + c);
    used.add(L + "," + c);
    for (const p of suppliers(id)) {
      if (laneOf(p) !== L && column[p] === c) between(laneOf(p), L, c).forEach(k => used.add(k));
    }
  }
  const straight = (a, b) => column[a] === column[b];

  const columns = Math.max(...Object.values(column)) + 1;
  const graphW = Math.max(W - labelW, columns * colW + 80);
  const n = jobs.length;
  const laneH = Math.max(minLaneH, (H - 1) / n);
  const laneY = i => i * laneH;
  const graphH = n * laneH;

  const pos = {};
  for (const s of steps) {
    const i = lane[s.job];
    pos[s.id] = { x: column[s.id] * colW + colW / 2, y: laneY(i) + laneH / 2, lane: i };
  }
  const top = id => pos[id].y - nodeH / 2, bottom = id => pos[id].y + nodeH / 2;
  // Product channels: in above the boxes, out below
  const prodIn = i => laneY(i) + laneH / 2 - nodeH / 2 - padTop / 2;
  const prodOut = i => laneY(i) + laneH / 2 + nodeH / 2 + 10;

  const lanes = (svg, w) => jobs.forEach((_, i) => {
    svg.append(svgEl("rect", { class: "lane " + (i % 2 ? "b" : "a"), x: 0, y: laneY(i), width: w, height: laneH }));
  });

  // Lane labels (fixed)
  const labels = svgEl("svg", { width: labelW, height: graphH });
  lanes(labels, labelW);
  // With a project shown, a job with no steps in it is faded; once offered, each job's label carries its
  // contract's forecasts, phi(j), and once taken, the agent holding it. Each part wraps to the label's
  // width, the lines centred on the lane.
  const room = labelW - 20;                            // the label's width, short of its margins
  const fits = text => measure(text) * 12 / 11 <= room;   // the label's 12px against measure's 11px
  const wrapTo = (text, by = " ") => {
    const lines = [];
    for (const word of text.split(by)) {
      const next = lines.length ? lines[lines.length - 1] + by + word : null;
      if (next !== null && fits(next)) lines[lines.length - 1] = next;
      else lines.push(word);
    }
    return lines;
  };
  jobs.forEach((k, i) => {
    const inProject = !view || [...view.steps].some(s => jobOf(s) === k.id);
    const t = svgEl("text", { class: inProject ? "lane-label" : "lane-label faded", x: labelW - 12, y: laneY(i) + laneH / 2, "text-anchor": "end", "dominant-baseline": "middle", "data-id": k.id });
    const phi = view?.contracts?.[k.id]?.forecasts;
    const holder = view?.taken?.[k.id];
    const lines = [...wrapTo(k.name).map(text => ({ text }))];
    if (holder) lines.push(...wrapTo(`· ${holder}`, ", ").map((text, n, all) => ({ text: text + (n < all.length - 1 ? "," : "") })));
    if (phi) lines.push(...wrapTo(Object.entries(phi).map(([m, v]) => `${m} ${+v.toFixed(2)}`).join(", "), ", ")
      .map((text, n, all) => ({ text: text + (n < all.length - 1 ? "," : ""), cls: "contract" })));
    lines.forEach(({ text, cls }, n) => {
      const line = svgEl("tspan", { x: labelW - 12, dy: n ? "1.2em" : `${-(lines.length - 1) * 0.6}em` });
      if (cls) line.setAttribute("class", cls);
      line.textContent = text;
      t.append(line);
    });
    if (phi) t.prepend(svgTitle(`Contract C(${k.id}): forecast at r ${view.r}, over the job's steps together`));
    labels.append(t);
  });

  // Graph (scrolls)
  const svg = svgEl("svg", { width: graphW, height: graphH });
  const defs = svgEl("defs");
  defs.append(arrowMarker("arrow-precedence", "#8a6d4a"), arrowMarker("arrow-product", "#157f8f"),
              arrowMarker("arrow-faded", "#cfcfcf"),
              arrowMarker("arrow-precedence-reasoned", "#c4ad8f"), arrowMarker("arrow-product-reasoned", "#86bcc4"));
  const hatching = svgEl("pattern", { id: "hatch", width: 6, height: 6, patternUnits: "userSpaceOnUse", patternTransform: "rotate(45)" });
  hatching.append(svgEl("line", { x1: 0, y1: 0, x2: 0, y2: 6, stroke: "#8a6d4a", "stroke-width": 1.6, "stroke-opacity": .45 }));
  defs.append(hatching);
  svg.append(defs);
  lanes(svg, graphW);

  // With a project shown, each arc is solid where the project derives both its ends (outside counting as
  // derived), bridged where the model says it carries a product through steps the project skips (u ~> v,
  // see business carried), and faded otherwise. A bridged arc is drawn as the paper's squiggle through
  // the skipped steps (see path).
  const derived = id => view === null || id === null || view.steps.has(id);
  const carriedArc = e => view !== null && view.carried.has(arcs.indexOf(e));
  const arcState = e => view === null || (derived(e.src) && derived(e.tgt)) ? "" : carriedArc(e) ? "bridged" : "faded";
  // A product's label is faded where it is not made, its source skipped, though its line may be bridged
  const fadedArc = e => arcState(e) === "faded" || !derived(e.src);
  // The skipped steps a carried product passes on through
  const skippedOnBridge = new Set(arcs.filter(e => carriedArc(e) && !derived(e.src)).map(e => e.src));
  // A run shared by several arcs takes the strongest of their states
  const strongest = states => states.includes("") ? "" : states.includes("bridged") ? "bridged" : "faded";

  // A path's corners, from its "M x,y H x V y" form
  const corners = d => {
    const pts = [];
    for (const [, cmd, a, b] of d.matchAll(/([MHV])\s*(-?[\d.]+)(?:,(-?[\d.]+))?/g)) {
      const last = pts[pts.length - 1];
      pts.push(cmd === "M" ? { x: +a, y: +b } : cmd === "H" ? { x: +a, y: last.y } : { x: last.x, y: +a });
    }
    return pts;
  };
  // A bridged line is drawn as usual, to and from the skipped steps on its path; through each of them, from
  // where a line arrives to where one leaves, runs the paper's squiggle (~>)
  const skippedAt = p => [...skippedOnBridge].find(id =>
    Math.abs(p.x - pos[id].x) <= nodeW / 2 + 3 && Math.abs(p.y - pos[id].y) <= nodeH / 2 + 3);
  const arrivals = {}, departures = {};             // at each skipped step: [{ point, vertical, cls }]
  // Straight runs, with a zigzag in the middle of the horizontal travel (or of the longest run, where
  // there is none)
  const wavy = pts => {
    const amp = 3, teeth = 4, w = 16;
    const runs = pts.slice(1).map((b, i) => [pts[i], b]);
    const horizontal = runs.filter(([a, b]) => a.y === b.y && a.x !== b.x);
    const length = ([a, b]) => Math.hypot(b.x - a.x, b.y - a.y);
    const zigzagged = horizontal.length ? horizontal : [runs.reduce((p, q) => length(q) > length(p) ? q : p)];
    let d = `M${pts[0].x},${pts[0].y}`;
    for (const run of runs) {
      const [a, b] = run, L = length(run);
      if (zigzagged.includes(run) && L > w) {
        const ux = (b.x - a.x) / L, uy = (b.y - a.y) / L, start = (L - w) / 2;
        d += ` L${a.x + ux * start},${a.y + uy * start}`;
        for (let k = 1; k <= teeth; k++) {
          const t = start + (w * (k - .5)) / teeth, side = k % 2 ? 1 : -1;
          d += ` L${a.x + ux * t - uy * amp * side},${a.y + uy * t + ux * amp * side}`;
        }
        d += ` L${a.x + ux * (start + w)},${a.y + uy * (start + w)}`;
      }
      d += ` L${b.x},${b.y}`;
    }
    return d;
  };

  // A line, in its look: "" solid, "bridged" or "faded"; one an importer reasoned, rather than read from
  // the data, drawn in a lighter shade of its colour (see each arc's basis)
  const path = (cls, d, marker, tip, look = "", byImporter = false) => {
    if (look === "bridged") {
      const pts = corners(d), [a, b] = [pts[0], pts[1]], [y, z] = [pts[pts.length - 2], pts[pts.length - 1]];
      const out = skippedAt(a), into = skippedAt(z);
      if (out) (departures[out] ??= []).push({ point: a, vertical: a.x === b.x, cls });
      if (into) (arrivals[into] ??= []).push({ point: z, vertical: y.x === z.x, cls });
    }
    const shade = byImporter && look !== "faded";
    const p = svgEl("path", { class: `flow ${cls}${look ? " " + look : ""}${shade ? " reasoned" : ""}`, d });
    if (marker) p.setAttribute("marker-end", `url(#arrow-${look === "faded" ? "faded" : marker + (shade ? "-reasoned" : "")})`);
    if (tip) p.append(svgTitle(tip + (byImporter ? "\nreasoned: added by the importer, not in the data" : "")));
    svg.append(p);
    return p;
  };
  const reasoned = e => e.basis === "reasoned";

  // Through a skipped step: from each arrival to each departure, straight across, or along the way it
  // arrived and then across to where it leaves. Drawn last, over the faded box.
  const squiggles = svgEl("g");
  const throughSteps = () => {
    for (const s of Object.keys(arrivals)) {
      for (const a of arrivals[s]) {
        for (const d of departures[s] ?? []) {
          const corner = a.vertical ? { x: a.point.x, y: d.point.y } : { x: d.point.x, y: a.point.y };
          const pts = [a.point, corner, d.point].filter((p, i, all) => i === 0 || p.x !== all[i - 1].x || p.y !== all[i - 1].y);
          squiggles.append(svgEl("path", { class: `flow ${d.cls} through`, d: wavy(pts) }));
        }
      }
    }
  };

  const tipOf = e => {
    const formulas = Object.entries(e.formulas).map(([m, f]) => `\n${m} = ${f}`).join("");
    return `${e.product}\n${e.src ?? "outside"} → ${e.tgt ?? "outside"}${formulas}`;
  };
  const label = (text, x, y, anchor = "middle", faded = false, shade = false) => {
    const t = svgEl("text", { class: `product-label${faded ? " faded" : shade ? " reasoned" : ""}`, x, y, "text-anchor": anchor });
    t.textContent = text;
    svg.append(t);
    return t;
  };

  // Lines sharing a channel or gap are offset from one another
  const taken = {};
  const offset = key => ((taken[key] = (taken[key] ?? -1) + 1) % 3) * 4;

  // Within a job: a straight arrow, or over the lane's boxes where others lie between
  const crossing = [];
  for (const e of arcs) {
    if (e.src !== null && e.tgt !== null && jobOf(e.src) === jobOf(e.tgt)) {
      const a = pos[e.src], b = pos[e.tgt];
      const inWay = steps.some(s => laneOf(s.id) === a.lane && column[s.id] > column[e.src] && column[s.id] < column[e.tgt]);
      const d = inWay
        ? `M${a.x},${top(e.src)} V${prodIn(a.lane) - offset("in" + a.lane)} H${b.x} V${top(e.tgt) - 2}`
        : `M${a.x + nodeW / 2},${a.y} H${b.x - nodeW / 2 - 2}`;
      path("precedence", d, "precedence", tipOf(e), arcState(e), reasoned(e));
    } else {
      crossing.push(e);
    }
  }

  // Into and out of the process, as in the paper's figures: vertical, entering a step's top-centre from
  // above and dropping from its bottom-centre, labelled beside the line
  for (const e of crossing.filter(e => e.src === null)) {
    const t = pos[e.tgt], y2 = top(e.tgt) - 2, y1 = y2 - 23;
    path("product", `M${t.x},${y1} V${y2}`, "product", tipOf(e), arcState(e), reasoned(e));
    label(e.product, t.x + 6, y1 + 8, "start", fadedArc(e), reasoned(e));
  }
  // Where the master has many exits, each one's label shows only while the pointer is on it, so the
  // labels do not crowd those of the products below the boxes
  const quiet = arcs.filter(e => e.tgt === null).length > 2;
  const exit = (src, product, tip, look, shade = false) => {
    const s = pos[src], y1 = bottom(src), y2 = y1 + 31;
    const line = path("product", `M${s.x},${y1} V${y2}`, "product", tip, look, shade);
    const text = label(product, s.x + 6, y2 - 4, "start", look === "faded", shade);
    if (!quiet) return;
    const g = svgEl("g", { class: "exit" });
    const hit = svgEl("path", { class: "hit", d: `M${s.x},${y1} V${y2}` });
    hit.append(svgTitle(tip));
    text.classList.add("exit-label");
    svg.append(g);
    g.append(line, text, hit);
  };
  for (const e of crossing.filter(e => e.tgt === null)) exit(e.src, e.product, tipOf(e), fadedArc(e) ? "faded" : arcState(e), reasoned(e));
  // With a project shown, a product leaving through steps it skips leaves from its own step, the last the
  // project executes on that path (see business leaving), once for each step and product
  const leavingVia = view === null ? [] : arcs.filter(e => e.tgt !== null && view.leaving.has(arcs.indexOf(e)));
  const exits = {};
  for (const e of leavingVia) (exits[e.src + "\u0000" + e.product] ??= []).push(e);
  for (const group of Object.values(exits)) {
    exit(group[0].src, group[0].product, `${group[0].product}\n${group[0].src} → outside, through skipped steps`, "");
  }

  // Between jobs, straight where the steps share a column: down from the producer's bottom into the
  // consumer's top, or up from its top into the consumer's bottom
  const linked = crossing.filter(e => e.src !== null && e.tgt !== null);
  for (const e of linked.filter(e => straight(e.src, e.tgt))) {
    const a = pos[e.src], down = pos[e.tgt].lane > a.lane;
    const y1 = down ? bottom(e.src) : top(e.src), y2 = down ? top(e.tgt) - 2 : bottom(e.tgt) + 2;
    path("product", `M${a.x},${y1} V${y2}`, "product", tipOf(e), arcState(e), reasoned(e));
    if (!(exits[e.src + "\u0000" + e.product] && arcState(e) === "faded")) label(e.product, a.x + 6, (y1 + y2) / 2, "start", fadedArc(e), reasoned(e));
  }

  // Otherwise through the channels, grouped by producer and product, so one product needed by several
  // steps is drawn as one line that branches
  const groups = {};
  for (const e of linked.filter(e => !straight(e.src, e.tgt))) (groups[e.src + "\u0000" + e.product] ??= []).push(e);
  for (const group of Object.values(groups)) {
    const src = group[0].src, product = group[0].product;
    const to = group.map(e => e.tgt);
    const tip = group.map(tipOf).join("\n\n");
    const home = pos[src].lane, base = pos[src].x + colW / 2;
    const gap = base + offset("gap" + base), out = prodOut(home) + offset("out" + home);
    const joins = [out];
    const trunk = strongest(group.map(arcState));            // a shared run takes its branches' strongest state
    const trunkFaded = trunk === "faded";
    const stateTo = id => arcState(group.find(e => e.tgt === id));
    const reasonedTo = id => reasoned(group.find(e => e.tgt === id));
    const allReasoned = group.every(reasoned);              // a shared run is reasoned only if all its arcs are

    path("product", `M${pos[src].x},${bottom(src)} V${out} H${gap}`, null, tip, trunk, allReasoned);
    const byLane = {};
    for (const id of to) (byLane[pos[id].lane] ??= []).push(id);
    for (const [i, ids] of Object.entries(byLane)) {
      const y = prodIn(i) - offset("in" + i);
      path("product", `M${gap},${y} H${Math.max(...ids.map(id => pos[id].x))}`, null, tip, strongest(ids.map(stateTo)), ids.every(reasonedTo));
      for (const id of ids) path("product", `M${pos[id].x},${y} V${top(id) - 2}`, "product", tip, stateTo(id), reasonedTo(id));
      joins.push(y);
    }
    if (joins.length > 1) path("product", `M${gap},${Math.min(...joins)} V${Math.max(...joins)}`, null, tip, trunk, allReasoned);
    // A product leaving from here is labelled at its exit instead
    if (!(exits[src + "\u0000" + product] && trunkFaded)) label(product, (pos[src].x + gap) / 2, out + 11, "middle", trunkFaded || !derived(src), allReasoned);
  }

  // Steps, each with the nodes that necessitate it, and its forecast where the project shown has one; once
  // executed, its recorded value beside its forecast. A step executing, or executed, is hatched as far as
  // it has got.
  for (const s of steps) {
    const { x, y } = pos[s.id];
    const nodes = necessitating(M, s.id);
    const shown = values(s.id).join(", ");
    const tip = `${s.name}\njob: ${M.G.jobs[s.job].name}\nnecessitated by: ${nodes.join(", ") || "none"}` +
                (shown ? (view?.recorded?.[s.id] ? `\nrecorded / forecast: ${shown}` : `\nforecast at r ${view.r}: ${shown}`) : "");
    const g = box("step", x, y, nodeW, nodeH, text[s.id], tip, s.id, fadedStep(s.id));
    const done = view?.progress?.[s.id];
    if (done !== undefined) {
      g.querySelector("rect").after(svgEl("rect", { class: "hatch", "data-id": s.id, "data-w": nodeW,
        x: x - nodeW / 2, y: y - nodeH / 2, width: nodeW * done, height: nodeH, rx: 3, fill: "url(#hatch)" }));
    }
    if (view?.late?.has(s.id)) {
      const [l, r, t, b] = [x - nodeW / 2 + 4, x + nodeW / 2 - 4, y - nodeH / 2 + 3, y + nodeH / 2 - 3];
      g.append(svgEl("path", { class: "late", d: `M${l},${t} L${r},${b} M${l},${b} L${r},${t}` }));
      g.querySelector("title").textContent += "\nwould come before steps already executed, so the extension cannot add it";
    }
    svg.append(g);
  }
  throughSteps();
  svg.append(squiggles);
  // The labels of the skipped steps a squiggle runs through, again over it, haloed so it breaks around them
  const halos = svgEl("g", { class: "node faded" });
  for (const id of Object.keys(arrivals)) {
    for (const t of svg.querySelectorAll(`.node.faded[data-id="${id}"] text`)) {
      const c = t.cloneNode(true);
      c.classList.add("halo");
      halos.append(c);
    }
  }
  svg.append(halos);

  // The project's own value, in the panel's header
  const value = document.querySelector("#process .project-value");
  value.textContent = view?.delivered
    ? "Delivered: " + Object.entries(view.delivered).map(([m, v]) =>
        `${m} ${+v.toFixed(2)}` + (view.values?.[m] !== undefined
          ? `, against ${+view.values[m].toFixed(2)} forecast` + error(v, view.values[m]).map(e => ` (${e})`).join("") : "")).join("; ") + (view.values ? ` at r ${view.r}` : "")
    : view?.values
    ? "Project: " + Object.entries(view.values).map(([m, v]) => `${m} ${+v.toFixed(2)}`).join(", ") + ` at r ${view.r}`
    : "";

  const labelBox = el("div", "labels"), graphBox = el("div", "graph");
  labelBox.append(labels);
  graphBox.append(svg);
  graphBox.addEventListener("scroll", () => { labelBox.scrollTop = graphBox.scrollTop; });
  body.replaceChildren(labelBox, graphBox);
  // The graph's horizontal scrollbar takes some of its height: the labels leave as much room at their
  // foot, so the two scroll together all the way down
  labelBox.style.paddingBottom = `${graphBox.offsetHeight - graphBox.clientHeight}px`;
}
