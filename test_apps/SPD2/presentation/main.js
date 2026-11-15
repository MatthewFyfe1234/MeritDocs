// SPD2's page: the dataset tabs, showing a dataset and a project in it, and the clicks on the master
// specification. The panels, the runs and the dialog are in their own modules:
//   util.js      helpers: elements, SVG, the paper's box, the dataset in the URL
//   state.js     the page's shared state
//   panels.js    Agents, Tools and materials, the master specification, the Projects drawer
//   process.js   the master process panel
//   run.js       building a project, and Play, Step, Reset and Autoplay
//   animate.js   a run played back on the board
//   dialog.js    the Dialog: Now, Story and Measures

import { el, datasetId, refusal } from "./util.js";
import { state } from "./state.js";
import { dialog, refreshPane } from "./dialog.js";
import { redraw, renderAgents, renderResources, renderProjects, renderSpecification, showCredit, projectsToggle, pastShown } from "./panels.js";
import { renderProcess } from "./process.js";
import { toggleNode, resumeRun, showButtons, showAuto, forgetRun, loadExperience } from "./run.js";
import { clearTokens } from "./animate.js";

// Shows a past project against the master, or, for null, none. A delivered project shows as it ended: who
// executed each job, each step's recorded values, every step hatched, and the project's value. One not yet
// run shows its derivation only.
export async function showProject(i) {
  state.draft = null;                                    // choosing a past project leaves any new one
  state.problem = "";
  clearTokens();                                         // the project in progress, if any, waits off the board
  if (state.replaying) {                                 // a replay playing stops, the experience the dataset's
    state.runs++;
    Object.assign(state, { playing: false, replaying: null });
    await loadExperience();
  }
  showButtons();
  const dataset = datasetId();
  state.view = null;
  if (i !== null) {
    const delivered = state.model.trace.some(r => r.project === i);
    const response = await fetch(`/api/${delivered ? "delivery" : "derivation"}?id=${encodeURIComponent(dataset)}&i=${encodeURIComponent(i)}`);
    if (!response.ok) {
      dialog.add({ kind: "error", text: `Could not show project ${i} (${response.status} ${response.statusText}).` });
    } else {
      const result = await response.json();
      const process = delivered ? result.process : result;
      const nodes = new Set(Object.values(state.model.selections[i].instances).map(x => x.node));
      state.view = { id: i, nodes, steps: new Set(process.steps), carried: new Set(process.carried), leaving: new Set(process.leaving) };
      if (delivered) {
        const d = result.delivery;
        Object.assign(state.view, {
          taken: Object.fromEntries(Object.entries(d.agents).map(([j, a]) => [j, a.join(", ")])),
          recorded: d.recorded,
          progress: Object.fromEntries(Object.keys(d.recorded).map(s => [s, 1])),
          delivered: d.value,
        });
      }
    }
  }
  history.replaceState(null, "", "#" + dataset + (state.view ? "/" + state.view.id : ""));
  redraw();
  showButtons();                                         // a past project with records can be replayed
}

// Shows a dataset, and optionally a project in it, leaving whatever was shown and stopping any run
async function show(id, project = null) {
  location.hash = id;
  for (const tab of document.querySelectorAll(".tab")) tab.setAttribute("aria-selected", tab.dataset.id === id);
  showCredit(state.datasets.find(d => d.id === id));
  Object.assign(state, { model: null, view: null, draft: null, problem: "", running: null, autoplaying: false,
                         playing: false, replaying: null, focus: null });
  state.runs++;                                          // stops any run playing in the dataset left
  clearTokens();
  showButtons();
  forgetRun();
  dialog.clear();
  const response = await fetch(`/api/model?id=${encodeURIComponent(id)}`);
  if (!response.ok) {
    // The dataset failed its checks (see business/checks.py): say why in each panel
    const reason = refusal(await response.text(), response);
    for (const body of document.querySelectorAll(".panel .body")) body.replaceChildren(el("div", "empty", reason));
    document.querySelector(".projects-body").replaceChildren();
    projectsToggle.textContent = "Projects";
    return;
  }
  state.model = await response.json();
  showAuto();
  state.experience = {};
  await loadExperience();
  renderAgents(state.model);
  renderResources(state.model);
  renderProjects(state.model);
  renderSpecification(state.model);
  renderProcess(state.model);
  if (project !== null && project in state.model.selections) await showProject(project);

  // The dialog opens on the dataset's state before any run. A failure is said, never swallowed.
  const opening = await fetch(`/api/overview?id=${encodeURIComponent(id)}`);
  if (!opening.ok) {
    dialog.add({ kind: "error", text: `Could not load the dataset's state (${opening.status} ${opening.statusText}).` });
    return;
  }
  dialog.dataset = await opening.json();
  dialog.state();
  refreshPane();

  // A project part-way through is taken up again where it was left
  const progress = await fetch(`/api/running?id=${encodeURIComponent(id)}`);
  if (!progress.ok) {
    dialog.add({ kind: "error", text: `Could not tell whether a project is in progress (${progress.status} ${progress.statusText}).` });
    return;
  }
  const open = (await progress.json()).project;
  if (open !== null) {
    state.running = { id: open, locked: new Set() };     // set fully as it is taken up
    if (project === null || project === open) await resumeRun(open);
    else renderProjects(state.model);
  }
}

// Clicking a node of the master specification chooses it, showing its descriptors below the tree;
// clicking the box beside it adds it to the new project or removes it (and chooses it too)
document.addEventListener("click", event => {
  if (!state.model) return;
  const tick = event.target.closest?.("#specification .tick[data-id]");
  const node = event.target.closest?.("#specification .node.spec[data-id]");
  if (tick) {
    state.focus = tick.dataset.id;
    if (pastShown()) return renderSpecification(state.model);   // a past project's selection is fixed
    toggleNode(tick.dataset.id);
  } else if (node) {
    state.focus = node.dataset.id;
    renderSpecification(state.model);
  }
});

// The dataset tabs: the selected dataset is kept in the URL hash, with a project shown in it, if any:
// #dataset or #dataset/project
fetch("/api/datasets")
  .then(r => r.json())
  .then(list => {
    state.datasets = list;
    const tabs = document.querySelector(".tabs");
    for (const d of list) {
      const tab = el("button", "tab", d.name);
      tab.dataset.id = d.id;
      tab.setAttribute("role", "tab");
      tab.addEventListener("click", () => show(d.id));
      tabs.append(tab);
    }
    tabs.append(el("span", "credit"));
    const [wanted, project] = decodeURIComponent(location.hash.slice(1)).split("/");
    if (list.some(d => d.id === wanted)) show(wanted, project ?? null);
    else show(list[0].id);

    // The master process is laid out to its panel, so drawn again when the panel's size changes
    const body = document.querySelector("#process .body");
    let size = "";
    new ResizeObserver(() => {
      const now = body.clientWidth + "x" + body.clientHeight;
      if (state.model && now !== size) { size = now; renderProcess(state.model); }
    }).observe(body);
  });
