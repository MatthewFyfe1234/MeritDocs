// The Dialog: a drawer over the right of the page. Now shows the current state, a run's events as they
// happen; Story and Measures tell and measure the projects run, fetched each time they are shown.

import { el, svgEl, datasetId } from "./util.js";
import { state } from "./state.js";

// A run's events, each {kind, text, refs}, refs naming the steps, jobs or agents involved
export const dialog = {
  drawer: document.querySelector(".dialog"),
  toggle: document.querySelector(".dialog-toggle"),
  list: document.querySelector(".dialog .events"),
  open(open = true) {
    this.drawer.classList.toggle("open", open);
    this.toggle.setAttribute("aria-expanded", open);
  },
  clear() {
    this.list.replaceChildren(el("li", "event empty", "No events yet. Run a project to see them here."));
  },
  add(event) {
    this.list.querySelector(".empty")?.remove();
    const heading = ["dataset", "project", "played"].includes(event.kind);
    const item = el("li", heading ? "event heading" : "event", event.text);
    this.list.append(item);
    item.scrollIntoView({ block: "nearest" });
  },
  // The current state only: the dataset's when no project is shown, the project's while one is. Each
  // change replaces it.
  dataset: [],
  state(project = null) {
    this.list.replaceChildren();
    (project ?? this.dataset).forEach(event => this.add(event));
  },
};
dialog.toggle.addEventListener("click", () => { dialog.open(); refreshPane(); });
dialog.drawer.querySelector(".dialog-close").addEventListener("click", () => dialog.open(false));
dialog.clear();

// The dialog's tabs: Now, the current state; Story and Measures, over the projects run, fetched each time
// they are shown, so they follow Autoplay as it goes
const paneTabs = document.querySelectorAll(".dialog-tabs button");
for (const tab of paneTabs) tab.addEventListener("click", () => showPane(tab.dataset.pane));
function showPane(name) {
  state.pane = name;
  for (const tab of paneTabs) tab.setAttribute("aria-selected", tab.dataset.pane === name);
  for (const p of document.querySelectorAll(".dialog .pane")) p.hidden = p.dataset.pane !== name;
  document.querySelector(".dialog .instructions").hidden = name !== "now";     // room for the story and charts
  if (name === "story") renderStory();
  if (name === "measures") renderMeasures();
}
export const refreshPane = () => { if (dialog.drawer.classList.contains("open") && state.pane !== "now") showPane(state.pane); };

// Story: the series in brief, saying what the measures show, then each project, as the simulation tells it
async function renderStory() {
  const body = document.querySelector(".dialog .story");
  const response = await fetch(`/api/story?id=${encodeURIComponent(datasetId())}`);
  if (!response.ok) return body.replaceChildren(el("p", "empty", `Could not tell the story (${response.status} ${response.statusText}).`));
  const told = await response.json();
  const brief = el("div", "brief");
  for (const line of told.summary) brief.append(el("p", null, line));
  const projects = told.projects.map(({ project, lines }) => {
    const p = el("p", "project");
    p.append(el("b", null, project + " "), [lines[0].slice(project.length + 1), ...lines.slice(1)].join(" "));
    return p;
  });
  body.replaceChildren(brief, ...projects);
}

// Measures: the forecasting test over the recorded projects first, then three small charts over the
// projects run, in the order run, and the same as a table
const SERIES = ["#2a78d6", "#eb6834", "#1baf7a"];     // categorical, validated (see the dataviz skill)
const pct = v => v === null || v === undefined ? "–" : `${Math.round(v * 100)}%`;
async function renderMeasures() {
  const body = document.querySelector(".dialog .measures");
  const dataset = datasetId();
  const tested = el("section", "evaluation"), runs = el("section");
  tested.append(el("p", "empty", "Testing the forecasts on the recorded projects…"));
  body.replaceChildren(tested, runs);
  renderEvaluation(tested, dataset);
  const response = await fetch(`/api/measures?id=${encodeURIComponent(dataset)}`);
  if (!response.ok) return runs.replaceChildren(el("p", "empty", `Could not measure (${response.status} ${response.statusText}).`));
  const { projects: rows, summary } = await response.json();
  if (!rows.length) return runs.replaceChildren(el("p", "empty", "No project has been run yet. Play one, or Autoplay, and its measures begin here."));
  const ids = rows.map(r => r.project);
  const jobs = Object.keys(summary.pool_first);
  runs.replaceChildren(
    el("h4", null, "Projects run"),
    lineChart("Steps exceeding their forecast at r",
      `Share so far, against the ${pct(summary.target)} that r allows (dashed)`, ids,
      [{ name: "share so far", values: rows.map(r => r.running), colour: SERIES[0] }],
      { max: 1, format: pct, reference: { value: summary.target, label: `allowed ${pct(summary.target)}` } }),
    lineChart("A step's typical miss", "Against its median forecast, project by project", ids,
      [{ name: "typical miss", values: rows.map(r => r.error), colour: SERIES[0] }],
      { max: Math.max(0.1, ...rows.map(r => r.error ?? 0)), format: pct }),
    lineChart("Agents eligible, by job", "Each job's pool as offered, project by project", ids,
      jobs.map((j, k) => ({ name: state.model.G.jobs[j]?.name ?? j, values: rows.map(r => r.eligible[j] ?? null), colour: SERIES[k % SERIES.length] })),
      { max: Math.max(1, ...rows.flatMap(r => Object.values(r.eligible))), format: v => v === null ? "–" : String(v), whole: true }),
    measuresTable(rows, jobs, pct),
  );
}

// A small line chart: one value per project, each series a line, a hover line and tooltip over the
// project nearest the pointer, a dashed reference where given, and the series named at their ends
function lineChart(title, note, ids, series, { max, format, reference, whole }) {
  const fig = el("figure");
  const caption = el("figcaption", null, title);
  caption.append(el("small", null, note));
  fig.append(caption);
  if (series.length > 1) {
    const legend = el("div", "legend");
    for (const s of series) {
      const item = el("span");
      const swatch = el("i");
      swatch.style.background = s.colour;
      item.append(swatch, s.name);
      legend.append(item);
    }
    fig.append(legend);
  }
  const W = 360, H = 120, left = 30, right = 70, top = 8, bottom = 18;
  const x = k => left + (ids.length === 1 ? (W - left - right) / 2 : k * (W - left - right) / (ids.length - 1));
  const y = v => top + (1 - v / max) * (H - top - bottom);
  const svg = svgEl("svg", { width: W, height: H, viewBox: `0 0 ${W} ${H}` });
  const ticks = whole ? [...new Set([0, Math.round(max / 2), max])] : [0, max / 2, max];
  for (const t of ticks) {
    svg.append(svgEl("line", { class: "grid", x1: left, x2: W - right, y1: y(t), y2: y(t) }));
    const label = svgEl("text", { x: left - 4, y: y(t) + 3, "text-anchor": "end" });
    label.textContent = format(t);
    const g = svgEl("g", { class: "axis" });
    g.append(label);
    svg.append(g);
  }
  const axis = svgEl("g", { class: "axis" });
  for (const k of [0, ids.length - 1].filter((k, n, all) => all.indexOf(k) === n)) {
    const label = svgEl("text", { x: x(k), y: H - 4, "text-anchor": k ? "end" : "start" });
    label.textContent = ids[k];
    axis.append(label);
  }
  svg.append(axis);
  if (reference) {
    svg.append(svgEl("line", { class: "reference", x1: left, x2: W - right, y1: y(reference.value), y2: y(reference.value) }));
    const label = svgEl("text", { class: "label", x: W - right + 4, y: y(reference.value) + 3 });
    label.textContent = reference.label;
    svg.append(label);
  }
  const ends = [];
  for (const s of series) {
    const points = s.values.map((v, k) => v === null ? null : [x(k), y(v)]);
    const d = points.map((p, k) => p ? `${k && points[k - 1] ? "L" : "M"}${p[0]},${p[1]}` : "").join(" ");
    svg.append(svgEl("path", { class: "line", d, stroke: s.colour }));
    points.forEach(p => p && ids.length <= 30 && svg.append(svgEl("circle", { class: "mark", cx: p[0], cy: p[1], r: 3.5, fill: s.colour })));
    const end = points.map((p, k) => [p, k]).filter(([p]) => p).pop();
    if (end && (series.length > 1 || !reference)) ends.push({ y: end[0][1], text: series.length > 1 ? s.name : format(s.values[end[1]]) });
  }
  // The series named at their ends, spaced apart where they meet
  ends.sort((a, b) => a.y - b.y);
  ends.forEach((e, k) => { if (k && e.y - ends[k - 1].y < 11) e.y = ends[k - 1].y + 11; });
  for (const e of ends) {
    const label = svgEl("text", { class: "label", x: W - right + 6, y: e.y + 3 });
    label.textContent = e.text;
    svg.append(label);
  }
  // Hover: the project nearest the pointer, a line through it and its values
  const cursor = svgEl("line", { class: "cursor", y1: top, y2: H - bottom, visibility: "hidden" });
  svg.append(cursor);
  const tip = el("div", "tip");
  tip.hidden = true;
  svg.addEventListener("mousemove", event => {
    const box = svg.getBoundingClientRect();
    const px = event.clientX - box.left;
    let k = 0;
    ids.forEach((_, n) => { if (Math.abs(x(n) - px) < Math.abs(x(k) - px)) k = n; });
    cursor.setAttribute("x1", x(k));
    cursor.setAttribute("x2", x(k));
    cursor.setAttribute("visibility", "visible");
    tip.replaceChildren(el("b", null, ids[k]), ...series.map(s => el("div", null, `${s.name}: ${format(s.values[k])}`)));
    tip.hidden = false;
    tip.style.left = `${Math.min(x(k) + 8, W - 120)}px`;
    tip.style.top = `${top + 30}px`;
  });
  svg.addEventListener("mouseleave", () => { cursor.setAttribute("visibility", "hidden"); tip.hidden = true; });
  fig.append(svg, tip);
  return fig;
}

// The forecasting test (the paper's Evaluation): each recorded project held out and forecast from the
// others, by the model, step by step, and by a baseline over the whole project. At each r, the share of
// projects delivering over the forecast against the 1 - r allowed, with how far chance alone stretches it
// (two standard errors); the typical error at the median forecast; and each project's errors at r 0.8.
async function renderEvaluation(section, dataset) {
  const response = await fetch(`/api/evaluation?id=${encodeURIComponent(dataset)}`);
  if (datasetId() !== dataset) return;
  if (!response.ok) return section.replaceChildren(el("p", "empty", `Could not test the forecasts (${response.status} ${response.statusText}).`));
  const e = await response.json();
  if (!e.projects.length) return section.replaceChildren(el("p", "empty", "No recorded project to test the forecasts on."));
  const signed = v => v === null ? "–" : `${v > 0 ? "+" : v < 0 ? "−" : "±"}${Math.abs(Math.round(v * 100))}%`;
  const err = (actual, forecast) => forecast ? (actual - forecast) / forecast : null;
  const fixed = v => v === null || v === undefined ? "–" : String(+v.toFixed(1));
  const table = (head, rows) => {
    const t = el("table");
    const tr = el("tr");
    head.forEach(h => tr.append(el("th", null, h)));
    t.append(tr);
    for (const row of rows) {
      const r = el("tr");
      row.forEach(v => r.append(el("td", null, String(v))));
      t.append(r);
    }
    return t;
  };
  const verdict = (share, s) => share === null ? "" : share > s.nominal + s.slack ? " optimistic" : share < s.nominal - s.slack ? " cautious" : "";
  const n = e.projects.length;
  const judged = kind => e.projects.filter(p => p[kind]["0.5"] !== null).length;
  const caption = el("figcaption", null, "Forecasts against the recorded projects");
  caption.append(el("small", null, `Each of ${n} projects forecast from the others: the model step by step, the baseline over the whole project (${judged("baseline")} it can forecast). Over: the share delivering more than the forecast at r.`));
  const at = "0.8";
  const details = el("details");
  details.append(el("summary", null, `Each project at r ${at}`),
    table(["Project", `Actual ${e.metric}`, "Model", "Error", "Baseline", "Error"],
      e.projects.map(p => [p.project, fixed(p.actual), fixed(p.model[at]), signed(err(p.actual, p.model[at])),
                           fixed(p.baseline[at]), signed(err(p.actual, p.baseline[at]))])));
  section.replaceChildren(
    el("h4", null, "Recorded projects"),
    caption,
    table(["r", "Allowed over", "Model over", "Baseline over"],
      e.rs.map(r => { const s = e.summary[String(r)];
        return [r, `${pct(s.nominal)} ± ${pct(s.slack)}`, pct(s.model) + verdict(s.model, s), pct(s.baseline) + verdict(s.baseline, s)]; })),
    el("p", "note", `Typical error at the median forecast: model ${pct(e.typical.model)}, baseline ${pct(e.typical.baseline)}.`),
    details,
  );
}

// The measures as a table, project by project, for reading the values exactly
function measuresTable(rows, jobs, pct) {
  const details = el("details");
  details.append(el("summary", null, "The measures as a table"));
  const table = el("table");
  const head = el("tr");
  for (const h of ["Project", "Steps", "Over r", "So far", "Miss", ...jobs]) head.append(el("th", null, h));
  table.append(head);
  for (const r of rows) {
    const tr = el("tr");
    for (const v of [r.project, r.steps, r.overruns, pct(r.running), pct(r.error), ...jobs.map(j => r.eligible[j] ?? "–")]) tr.append(el("td", null, String(v)));
    table.append(tr);
  }
  details.append(table);
  return details;
}
