// The panels other than the master process: Agents, Tools and materials, the master specification with its
// descriptors, and the Projects drawer; the mapping lines drawn over them; and redrawing them all.

import { el, svgEl, svgTitle, measure, box } from "./util.js";
import { state, fadedNode, executionsIn, necessitating } from "./state.js";
import { renderProcess } from "./process.js";
import { buildSoon, deleteProject, resumeRun } from "./run.js";
import { showProject } from "./main.js";

// Every panel, drawn again from the model and the state
export function redraw() {
  renderAgents(state.model);
  renderProjects(state.model);
  renderSpecification(state.model);
  renderProcess(state.model);
}

// A type (skillset, material, tool) and the instances of it
function typeCard(name, id, instances) {
  const card = el("div", "type");
  card.dataset.id = id;
  const title = el("div", "type-name", name);
  title.append(el("small", null, id));
  const list = el("div", "instances");
  for (const i of instances) {
    const chip = el("span", "instance" + (i.faded ? " faded" : "") + (i.holder ? " holder" : ""), i.id);
    if (i.count) chip.append(el("small", "count", i.count));
    chip.dataset.id = i.id;
    chip.title = i.title;
    list.append(chip);
  }
  card.append(title, list);
  return card;
}

// Agents, under each job they are qualified for (an agent may appear under several). With a project
// shown, the jobs with no steps in it are faded, and once it is offered, so are the agents not in Elig(j).
// Once a job's contract is taken, the agent holding it is marked.
export function renderAgents(M) {
  const view = state.view;
  const body = document.querySelector("#agents .body");
  const agents = Object.values(M.agents);
  if (!agents.length) return body.replaceChildren(el("div", "empty", "No agents in this dataset"));
  const types = el("div", "types");
  const inProject = j => !view || [...view.steps].some(s => M.G.steps[s].job === j);
  for (const job of Object.values(M.G.jobs)) {
    const qualified = agents.filter(a => a.qualifications.includes(job.id));
    const elig = view?.eligible?.[job.id];
    const card = typeCard(job.name, job.id, qualified.map(a => {
      const faded = elig !== undefined && !elig.includes(a.id);
      const holder = (view?.taken?.[job.id]?.split(", ") ?? []).includes(a.id);
      const note = holder ? `\nholds ${job.name}'s contract` : faded ? `\nnot eligible for ${job.name}` : "";
      // Experience in this job so far: its executions here on the chip, and each step's on hover
      const mine = Object.entries(state.experience[a.id] ?? {}).filter(([s]) => M.G.steps[s].job === job.id);
      const count = executionsIn(M, a.id, job.id);
      const detail = mine.map(([s, amounts]) => `\n${s}: ` + Object.entries(amounts).map(([m, v]) =>
        m === "executions" ? `${v} executed` : `${m} ${+v.toFixed(2)}`).join(", ")).join("");
      return { id: a.id, title: a.name + note + (detail ? `\nexperience:${detail}` : "\nno experience yet"), faded, holder, count };
    }));
    if (!inProject(job.id)) card.classList.add("faded");
    types.append(card);
  }
  body.replaceChildren(types);
}

export function renderResources(M) {
  const body = document.querySelector("#resources .body");
  body.replaceChildren();
  for (const [label, items] of [["Tools", M.tools], ["Materials", M.materials]]) {
    const group = el("div", "group");
    group.append(el("div", "group-label", label));
    const list = Object.values(items);
    if (!list.length) {
      group.append(el("div", "empty", "None in this dataset"));
    } else {
      const chips = el("div", "instances");
      for (const x of list) Object.assign(chips.appendChild(el("span", "instance", x.name)), { title: x.id });
      group.append(chips);
    }
    body.append(group);
  }
}

// A past project shown, not one being built: its selection is fixed, its ticks only showing it
export const pastShown = () => state.view !== null && state.draft === null;

// The master specification T: boxes, one per row, indented by depth, joined by elbow connectors, each
// with a box beside it, ticked when the project shown includes it: the project being built, open to
// change, or a past project, fixed, its ticks greyed until it is closed in the drawer
export function renderSpecification(M) {
  const rowH = 30, boxH = 22, indent = 22, x0 = 6, y0 = 4;
  const children = {};
  for (const [parent, child] of M.T.relations) (children[parent] ??= []).push(child);
  const rows = [];
  const walk = (id, depth, parent) => {
    const n = M.T.nodes[id];
    const row = { n, depth, parent, w: measure(n.name) + 16 };
    rows.push(row);
    for (const c of children[id] ?? []) walk(c, depth + 1, row);
  };
  walk(M.T.root, 0, null);
  rows.forEach((r, i) => { r.x = x0 + r.depth * indent; r.y = y0 + i * rowH; });

  const tickW = 10, tickGap = 6;
  const width = Math.max(...rows.map(r => r.x + r.w)) + tickGap + tickW + x0;
  const svg = svgEl("svg", { width, height: y0 + rows.length * rowH });
  for (const r of rows) {
    if (!r.parent) continue;
    const p = r.parent;
    const faded = fadedNode(r.n.id) ? " faded" : "";
    svg.append(svgEl("path", { class: "branch" + faded, d: `M${p.x + 10},${p.y + boxH} V${r.y + boxH / 2} H${r.x}` }));
  }
  for (const r of rows) {
    const descriptors = r.n.descriptors.map(d => `${d.name} (${d.kind})`).join(", ") || "none";
    const tip = `${r.n.name}\nsteps: ${M.mu.steps[r.n.id].join(", ") || "none"}\ndescriptors: ${descriptors}`;
    const g = box("spec", r.x + r.w / 2, r.y + boxH / 2, r.w, boxH, [r.n.name], tip, r.n.id, fadedNode(r.n.id));
    if (r.n.id === state.focus) g.classList.add("focused");
    svg.append(g);

    const tx = r.x + r.w + tickGap, ty = r.y + boxH / 2 - tickW / 2;
    const past = pastShown();
    const tick = svgEl("g", { class: past ? "tick fixed" : "tick", "data-id": r.n.id });
    const ticked = past ? state.view.nodes.has(r.n.id) : state.draft?.nodes.has(r.n.id);
    tick.append(svgTitle(past ? `In project ${state.view.id}${ticked ? "" : ": not selected"}. Close it in the Projects drawer to start a new one.`
      : ticked ? "In the new project: click to remove" : "Click to add to a new project"));
    tick.append(svgEl("rect", { x: tx, y: ty, width: tickW, height: tickW, rx: 2 }));
    if (ticked) tick.append(svgEl("path", { d: `M${tx + 2},${ty + 5} L${tx + 4.5},${ty + 7.5} L${tx + 8},${ty + 2.5}` }));
    svg.append(tick);
  }
  document.querySelector("#specification .body").replaceChildren(svg, descriptorsSection(M));
}

// "Descriptors: <node>": the chosen node's descriptors and their kinds, whether the new project includes
// the node, and, where it does, the values bound on its instance (the model needs every one bound)
function descriptorsSection(M) {
  const section = el("div", "descriptors");
  const focus = state.focus;
  if (focus === null) return section;
  const node = M.T.nodes[focus];
  section.append(el("h3", null, `Descriptors: ${node.name}`));

  const included = state.draft?.nodes.has(focus) ?? false;
  const fixed = state.running?.locked.has(focus) ?? false;   // bound in the project in progress: it stays
  if (!node.descriptors.length) section.append(el("small", null, "None"));
  for (const d of node.descriptors) {
    const label = el("label", null, `${d.name} =`);
    const input = Object.assign(el("input"), {
      type: d.kind === "numerical" ? "number" : "text",
      value: state.draft?.values[focus]?.[d.name] ?? "",
      disabled: !included || fixed,
    });
    if (d.range) Object.assign(input, { min: d.range[0], max: d.range[1] });
    // Live: the project is offered again as the value is typed
    input.addEventListener("input", () => {
      const values = (state.draft.values[focus] ??= {});
      if (input.value === "") delete values[d.name];
      else values[d.name] = d.kind === "numerical" ? Number(input.value) : input.value;
      buildSoon();
    });
    label.append(input, el("small", null, d.kind + (d.range ? `, ${d.range[0]} to ${d.range[1]}` : "")));
    section.append(label);
  }
  section.append(el("div", "problem", state.problem));
  return section;
}

// Says why the selection cannot be offered, below the values, without redrawing the box being typed in
export function showProblem(text) {
  state.problem = text;
  const shown = document.querySelector("#specification .descriptors .problem");
  if (shown) shown.textContent = text;
}

// Projects: the dataset's projects, each with its records in the trace. Choosing one shows it against
// the master, its selected nodes and derived steps solid, the rest faded; choosing it again clears it.
export const projectsToggle = document.querySelector(".drawer-toggle");
projectsToggle.addEventListener("click", () => {
  const open = document.querySelector(".projects").classList.toggle("open");
  projectsToggle.setAttribute("aria-expanded", open);
});

export function renderProjects(M) {
  const body = document.querySelector(".projects-body");
  projectsToggle.textContent = `Projects (${Object.keys(M.selections).length})`;
  const ids = Object.keys(M.selections);
  body.replaceChildren();
  const draft = state.draft;
  if (draft && !(draft.id in M.selections)) {
    const list = el("ul", "project-list");
    const item = el("li", null, draft.id);
    item.append(el("small", null, "new"));
    item.setAttribute("aria-selected", true);
    list.append(item);
    body.append(list);
  }
  if (!ids.length) return body.append(el("div", "empty", "No past projects yet"));
  const list = el("ul", "project-list");
  for (const i of ids) {
    const records = M.trace.filter(r => r.project === i).length;
    const item = el("li", null, i);
    const side = el("span");
    side.append(el("small", null, state.running?.id === i ? "in progress" : `${records} records`));
    const remove = Object.assign(el("button", "delete", "×"), { title: `Delete project ${i}: its selection and its records` });
    remove.addEventListener("click", event => {
      event.stopPropagation();
      if (!state.playing) deleteProject(i);
    });
    side.append(remove);
    item.append(side);
    item.setAttribute("aria-selected", state.view?.id === i);
    // Choosing a project shows it against the master; choosing it again closes it. The project in
    // progress is taken up again, open to step on and grow.
    item.addEventListener("click", () => {
      if (state.playing) return;
      if (state.running?.id === i) { if (state.view?.id !== i) resumeRun(i); }
      else showProject(state.view?.id === i ? null : i);
    });
    list.append(item);
  }
  body.append(list);
}

// The dataset's source, linked, with its citation on hover
export function showCredit(dataset) {
  const credit = document.querySelector(".credit");
  credit.replaceChildren();
  if (!dataset.credit) return;
  credit.append("Data: ");
  const link = Object.assign(el("a", null, dataset.credit.source), { href: dataset.credit.url, target: "_blank", rel: "noopener" });
  credit.append(link);
  credit.title = dataset.credit.citation;
}

// Mapping lines, drawn on demand over both panels: hovering a node draws its lines to the steps it
// necessitates, mu(x); hovering a step draws the lines from every node that necessitates it
const mapping = document.querySelector(".mapping");
function drawMapping(pairs) {
  const graph = document.querySelector("#process .graph")?.getBoundingClientRect();
  mapping.replaceChildren();
  for (const [node, step] of pairs) {
    const a = document.querySelector(`#specification .node[data-id="${CSS.escape(node)}"] rect`)?.getBoundingClientRect();
    const b = document.querySelector(`#process .node[data-id="${CSS.escape(step)}"] rect`)?.getBoundingClientRect();
    if (!a || !b || !graph || b.right < graph.left || b.left > graph.right || b.bottom < graph.top || b.top > graph.bottom) continue;
    const x1 = a.right, y1 = a.top + a.height / 2, x2 = b.left + b.width / 2, y2 = b.top;
    mapping.append(svgEl("path", { d: `M${x1},${y1} C${(x1 + x2) / 2},${y1} ${x2},${(y1 + y2) / 2} ${x2},${y2}` }));
  }
}
document.addEventListener("mouseover", event => {
  const node = event.target.closest?.(".node[data-id]");
  if (!node || !state.model) return drawMapping([]);
  const id = node.dataset.id;
  drawMapping(node.classList.contains("spec")
    ? state.model.mu.steps[id].map(step => [id, step])
    : necessitating(state.model, id).map(x => [x, id]));
});
document.addEventListener("scroll", () => drawMapping([]), true);
