// Building a project and running it: the selection as it is ticked and given values, offered by the model
// as it goes; Play, Step, Reset and Autoplay at the left of the master process; and projects deleted or
// taken up again from the drawer.

import { wait, datasetId, refusal } from "./util.js";
import { state, PLAY_MS, canRun, parentOf, childrenOf } from "./state.js";
import { dialog, refreshPane } from "./dialog.js";
import { redraw, renderAgents, renderProjects, showProblem, pastShown } from "./panels.js";
import { showProject } from "./main.js";
import { renderProcess } from "./process.js";
import { animate, clearTokens } from "./animate.js";

const playButton = document.querySelector("#process .play");
const stepButton = document.querySelector("#process .step");
const resetButton = document.querySelector("#process .reset");
const autoButton = document.querySelector("#process .autoplay");
// The confidence level r forecasts are read at
const rInput = document.querySelector("#process .confidence");
rInput.disabled = false;
rInput.addEventListener("input", () => { if (state.draft && !state.playing) buildSoon(); });

// Each agent's experience so far at each step, as the model measures it
export async function loadExperience() {
  const response = await fetch(`/api/experience?id=${encodeURIComponent(datasetId())}`);
  if (!response.ok) {
    dialog.add({ kind: "error", text: `Could not load the agents' experience (${response.status} ${response.statusText}).` });
    return;
  }
  state.experience = await response.json();
}

// The draft as a selection in the nested JSON form, from the root down through the selected nodes
function draftTree(M) {
  const draft = state.draft;
  const instance = x => ({
    id: `${draft.id}-${x}`, node: x, values: draft.values[x] ?? {},
    children: childrenOf(M, x).filter(c => draft.nodes.has(c)).map(instance),
  });
  return instance(M.T.root);
}

// A new project's id, i1, i2 and so on, the first not taken
function newId(M) {
  const taken = new Set(Object.keys(M.selections));
  let n = taken.size + 1;
  while (taken.has(`i${n}`)) n++;
  return `i${n}`;
}

// While a value is being typed, builds once typing pauses, so the forecast follows it live
export function buildSoon() {
  clearTimeout(state.buildTimer);
  state.buildTimer = setTimeout(() => build(false), 200);   // the tree is left alone, keeping the box typed in
}

// Sends the draft's selection, as it now stands, to the model: its process is derived again and, once
// every selected node's descriptors have values, offered with its forecasts at r. The tree is redrawn
// too unless only a value changed. Only the latest build counts: one overtaken while it was on its way,
// by a later change, is dropped, so an answer to a value already replaced is never shown.
export async function build(redrawTree = true) {
  const mine = ++state.builds;
  const response = await fetch(`/api/build?id=${encodeURIComponent(datasetId())}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ selection: draftTree(state.model), project: state.draft.id, r: Number(rInput.value) }),
  });
  const reply = response.ok ? await response.json() : await response.text();
  if (mine !== state.builds || !state.draft || (state.playing && !state.running)) return;   // overtaken, or moved on
  if (!response.ok) {
    const reason = refusal(reply, response);
    if (!state.playing) dialog.state([{ kind: "error", text: `Could not derive the selection: ${reason}.` }]);
    showProblem(`${reason}.`);
    if (state.view) Object.assign(state.view, { forecasts: null, values: null, contracts: null, eligible: null });
    showButtons();                                       // nothing to play until it is put right
    renderAgents(state.model);
    renderProcess(state.model);
    return;
  }
  const result = reply;
  if (result.late?.length) return result.late;           // an extension refused: the caller undoes it
  // Not yet forecast: a node selected still needs values, perhaps one added as a parent. It is chosen in
  // the tree, its descriptors open below it, saying what to enter.
  const M = state.model, draft = state.draft;
  const waiting = result.offer ? [] : [...draft.nodes].filter(x =>
    M.T.nodes[x].descriptors.some(d => draft.values[x]?.[d.name] === undefined));
  if (waiting.length) {
    if (!waiting.includes(state.focus)) {
      state.focus = waiting[0];
      redrawTree = true;                                 // the chosen node's descriptors open
    }
    const missing = waiting.flatMap(x => M.T.nodes[x].descriptors
      .filter(d => draft.values[x]?.[d.name] === undefined).map(d => `${M.T.nodes[x].name}'s ${d.name}`));
    showProblem(`Enter ${missing.join(" and ")} to forecast the project.`);
  } else {
    showProblem("");
  }
  if (!state.playing) dialog.state(result.events);       // while a run plays, the dialog follows it
  // A project in progress keeps its run: who holds each contract, and the steps executed so far
  const view = state.view;
  const run = state.running && view?.id === state.running.id
    ? { taken: view.taken, recorded: view.recorded, progress: view.progress } : {};
  state.view = {
    id: draft.id, nodes: new Set(draft.nodes), steps: new Set(result.process.steps), carried: new Set(result.process.carried), leaving: new Set(result.process.leaving),
    forecasts: result.offer?.forecasts ?? null, values: result.offer?.values ?? null, r: Number(rInput.value),
    contracts: result.offer?.contracts ?? null, eligible: result.offer?.eligible ?? null, ...run,
  };
  showButtons();                                         // ready to play once the forecast is
  if (redrawTree) return redraw();
  renderAgents(state.model);
  renderProjects(state.model);
  renderProcess(state.model);
}

// Clicking a node of the master specification builds a new project: an unselected node is added with
// any unselected ancestors, a selected one removed with its descendants; removing the root discards
// the project. Each change is derived again by the model, and the dialog states the project as it stands.
// While a project is in progress, its selection can only grow, the paper's extension: its nodes stay, and
// a node whose steps would come before steps already executed is refused, those steps crossed out.
export async function toggleNode(x) {
  const M = state.model;
  if (state.playing && !state.running) return;           // a new project waits until its run has begun
  if (state.running) {
    if (state.view?.id !== state.running.id || state.draft?.nodes.has(x)) return;
    const before = new Set(state.draft.nodes);
    const parent = parentOf(M);
    for (let y = x; y !== undefined && !state.draft.nodes.has(y); y = parent[y]) state.draft.nodes.add(y);
    const late = await build();
    if (late?.length) {
      state.draft.nodes = before;
      await build();
      state.view.late = new Set(late);
      renderProcess(state.model);
    }
    return;
  }
  forgetRun();                                           // a new selection: the last run stays as played
  if (!state.draft) state.draft = { id: newId(M), nodes: new Set(), values: {} };
  const draft = state.draft;
  if (draft.nodes.has(x)) {
    const drop = y => { draft.nodes.delete(y); delete draft.values[y]; childrenOf(M, y).filter(c => draft.nodes.has(c)).forEach(drop); };
    drop(x);
  } else {
    const parent = parentOf(M);
    for (let y = x; y !== undefined && !draft.nodes.has(y); y = parent[y]) draft.nodes.add(y);
  }
  if (!draft.nodes.has(M.T.root)) {
    state.draft = null;
    state.view = null;
    state.problem = "";
    showButtons();
    dialog.state();
    return redraw();
  }
  await build();
}

// Deletes a project from the drawer: its selection and its records leave the dataset
export async function deleteProject(i) {
  const dataset = datasetId();
  const response = await fetch(`/api/delete?id=${encodeURIComponent(dataset)}&i=${encodeURIComponent(i)}`, { method: "POST" });
  if (!response.ok) {
    dialog.state([{ kind: "error", text: `Could not delete project ${i}: ${refusal(await response.text(), response)}.` }]);
    return;
  }
  const reloaded = await fetch(`/api/model?id=${encodeURIComponent(dataset)}`);
  if (!reloaded.ok) {
    dialog.state([{ kind: "error", text: `Project ${i} deleted, but the dataset could not be reloaded (${reloaded.status}).` }]);
    return;
  }
  state.model = await reloaded.json();
  await loadExperience();
  if (state.lastRun?.id === i) forgetRun();
  if (state.running?.id === i) {
    state.running = null;
    state.draft = null;
    clearTokens();
    showButtons();
  }
  if (state.view?.id === i) {
    state.view = null;
    history.replaceState(null, "", "#" + dataset);
    dialog.state();
  }
  redraw();
}

// Play and Step run the project in the simulation, saving it as they go, then play the run back. Play
// runs every step left, to delivery. Step runs the next wave, the steps that start together next, and
// leaves the project in progress, its selection open to grow between steps: the paper's extension. While
// a run plays, Play fast-forwards it: its steps take each of PLAY_MS in turn, carrying on from where they are.
// Step never closes a project: once it has run the last step of the selection as it stands, the project
// stays in progress, to be extended and stepped on, or delivered with Play. Step waits, disabled, while
// the project has nothing left to run.
export const showButtons = () => {
  const { playing, speed, running, view } = state;
  playButton.textContent = !playing ? "▶ Play" : speed === 0 ? "▶▶" : "▶▶▶";
  playButton.title = !playing ? (replayable()
      ? "Replay the project as recorded: who executed each step and what was recorded, against its forecast from the other projects"
      : "Play the project to delivery, once its forecast is ready: its agents take their contracts, then its steps execute")
    : speed < PLAY_MS.length - 1 ? `Playing at ${PLAY_MS[speed] / 1000} s a project: click to play faster` : `Playing at ${PLAY_MS[speed] / 1000} s a project`;
  playButton.disabled = playing ? speed === PLAY_MS.length - 1 : !canRun() && !replayable();
  const nothingLeft = running && view?.id === running.id && [...(view.steps ?? [])].every(s => s in (view.recorded ?? {}));
  stepButton.disabled = playing || !canRun() || nothingLeft;
};
// A past project shown, with records, can be replayed
const replayable = () => pastShown() && !!state.model?.trace.some(r => r.project === state.view.id);
playButton.addEventListener("click", () => {
  if (!state.playing && replayable()) return replay(state.view.id);
  if (!state.playing && !state.autoplaying) return advanceRun(true);
  state.speed = Math.min(state.speed + 1, PLAY_MS.length - 1);   // Autoplay runs its own projects: only faster
  showButtons();
});
stepButton.addEventListener("click", () => advanceRun(false, true));

// Runs the project a wave at a time, each wave played back as it comes: one wave for Step, every wave
// left for Play. The selection can grow while it plays, each addition joining from the next wave, the
// run waiting while an added node still needs its values. An extension that would add steps before ones
// executed is refused, its late steps crossed out in red, and the run carries on without it.
async function advanceRun(toEnd, keepOpen = false) {
  if (state.playing || !canRun()) return;
  const dataset = datasetId();
  const i = state.draft.id, mine = state.runs;
  state.playing = true;
  if (!state.autoplaying) state.speed = 0;               // Autoplay keeps a fast-forward from project to project
  showButtons();
  let result;
  for (let fresh = true; ; fresh = false) {
    while (!canRun()) {                                  // an added node waits for its values
      await wait(200);
      if (state.runs !== mine) return;
    }
    const sent = { nodes: new Set(state.draft.nodes), values: structuredClone(state.draft.values) };
    const response = await fetch(`/api/step?id=${encodeURIComponent(dataset)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selection: draftTree(state.model), project: i, r: Number(rInput.value), open: keepOpen }),
    });
    if (state.runs !== mine) return;                     // Reset took over
    if (response.status === 409) {                       // an addition came too late: drop it, mark it
      const late = (await response.json()).late;
      state.draft.nodes = new Set(state.running?.locked ?? sent.nodes);
      await build();
      state.view.late = new Set(late);
      renderProcess(state.model);
      if (toEnd && state.running) continue;
      state.playing = false;
      return showButtons();
    }
    if (!response.ok) {
      dialog.add({ kind: "error", text: `Could not run project ${i}: ${refusal(await response.text(), response)}.` });
      state.playing = false;
      return showButtons();
    }
    result = await response.json();
    if (!state.running) {
      state.lastRun = { id: i, ...sent };
      resetButton.disabled = false;
    }
    state.running = { id: i, locked: sent.nodes };
    await animate(result, fresh);
    if (state.runs !== mine) return;
    if (result.done || !toEnd) break;
  }
  state.playing = false;
  const reloaded = await fetch(`/api/model?id=${encodeURIComponent(dataset)}`);
  if (!reloaded.ok) {
    dialog.add({ kind: "error", text: `Project ${i} was run, but the dataset could not be reloaded (${reloaded.status}).` });
    return showButtons();
  }
  state.model = await reloaded.json();
  if (result.done) {
    await loadExperience();                              // in progress, each job's gain came as it ended
    refreshPane();                                       // the story and measures take the project in
    state.running = null;
    state.draft = null;                                  // delivered: no longer a project to run
  }
  history.replaceState(null, "", "#" + dataset + "/" + i);
  showButtons();
  redraw();
  return result.done;                                    // whether the project was delivered
}

// Replays a past project from its records: its agents come on as recorded, its steps execute for the
// times recorded, each against its forecast, and the project is delivered against its forecast at r. The
// forecast is fitted on the other projects, and the agents' experience starts from theirs, rising with
// this project's work. Nothing is written: once played, the experience shown is the dataset's again.
async function replay(i) {
  const dataset = datasetId(), mine = state.runs;
  const response = await fetch(`/api/replay?id=${encodeURIComponent(dataset)}&i=${encodeURIComponent(i)}&r=${Number(rInput.value)}`);
  if (!response.ok) {
    dialog.add({ kind: "error", text: `Could not replay project ${i}: ${refusal(await response.text(), response)}.` });
    return;
  }
  const result = await response.json();
  if (state.runs !== mine || state.view?.id !== i) return;   // moved on while it loaded
  Object.assign(state, { playing: true, replaying: i, speed: 0, experience: result.experience });
  resetButton.disabled = false;
  Object.assign(state.view, {
    forecasts: result.offer?.forecasts ?? null, values: result.offer?.values ?? null, r: Number(rInput.value),
    contracts: result.offer?.contracts ?? null, eligible: null,
    taken: {}, recorded: {}, progress: {}, delivered: null,
  });
  showButtons();
  renderAgents(state.model);
  await animate(result, true);
  if (state.runs !== mine) return;                       // Reset took over
  await endReplay();
}
async function endReplay() {
  Object.assign(state, { playing: false, replaying: null });
  resetButton.disabled = true;
  await loadExperience();
  renderAgents(state.model);
  renderProcess(state.model);                            // delivered, against its forecast
  showButtons();
}

// Takes up the project in progress, as it was left: its selection, open to grow, the contracts held, and
// the steps executed so far, hatched with their records
export async function resumeRun(i) {
  const dataset = datasetId();
  const instances = Object.values(state.model.selections[i].instances);
  const nodes = new Set(instances.map(x => x.node));
  const values = Object.fromEntries(instances.filter(x => Object.keys(x.values).length).map(x => [x.node, { ...x.values }]));
  const response = await fetch(`/api/delivery?id=${encodeURIComponent(dataset)}&i=${encodeURIComponent(i)}`);
  if (!response.ok) {
    dialog.add({ kind: "error", text: `Could not take up project ${i} (${response.status} ${response.statusText}).` });
    return;
  }
  const d = await response.json();
  state.draft = { id: i, nodes, values };
  state.running = { id: i, locked: new Set(nodes) };
  state.lastRun = { id: i, nodes: new Set(nodes), values: structuredClone(values) };
  resetButton.disabled = false;
  state.view = { id: i, taken: d.taken, recorded: d.delivery.recorded,
                 progress: Object.fromEntries(Object.keys(d.delivery.recorded).map(s => [s, 1])) };
  history.replaceState(null, "", "#" + dataset + "/" + i);
  await build();
}

// Reset, beside Play: returns to the state before the project was first played or stepped. It stops the
// animation if a run is playing, removes the project it saved, and brings back its selection and values,
// offered again, ready to play. Nothing else in the dataset changes.
export const forgetRun = () => { state.lastRun = null; resetButton.disabled = true; };
resetButton.addEventListener("click", async () => {
  if (state.replaying) {                                 // a replay stops, the project shown as recorded
    const i = state.replaying;
    state.runs++;
    clearTokens();
    await endReplay();
    return showProject(i);
  }
  if (!state.lastRun) return;
  const run = state.lastRun;
  forgetRun();
  state.autoplaying = false;                             // Reset stops Autoplay too
  state.runs++;                                          // stops the run if it is playing
  const dataset = datasetId();
  const response = await fetch(`/api/delete?id=${encodeURIComponent(dataset)}&i=${encodeURIComponent(run.id)}`, { method: "POST" });
  state.playing = false;
  state.running = null;
  clearTokens();
  showButtons();
  if (!response.ok) {
    dialog.state([{ kind: "error", text: `Could not reset project ${run.id}: ${refusal(await response.text(), response)}.` }]);
    return;
  }
  const reloaded = await fetch(`/api/model?id=${encodeURIComponent(dataset)}`);
  if (!reloaded.ok) {
    dialog.state([{ kind: "error", text: `Project ${run.id} removed, but the dataset could not be reloaded (${reloaded.status}).` }]);
    return;
  }
  state.model = await reloaded.json();
  await loadExperience();
  state.draft = { id: run.id, nodes: run.nodes, values: run.values };
  history.replaceState(null, "", "#" + dataset);
  await build();
});

// Autoplay: projects in a loop. The world draws each new project's selection at random (see
// simulation/world.py). The project begins with the root alone, whose first step defines the
// specification; the rest of the draw then joins it, an extension, any contract whose holder is not
// eligible at the steps added being handed over, and it is played to delivery like Play, its agents'
// experience mounting from project to project. A project already set up, or in progress, is played
// first. A draw that cannot run, such as one with a job no agent is eligible for, is left, and the next
// drawn. Stop ends the loop once the project playing is delivered.
export const showAuto = () => {
  autoButton.textContent = state.autoplaying ? "■ Stop" : "Autoplay";
  autoButton.disabled = !state.model;
};
autoButton.addEventListener("click", () => {
  if (state.autoplaying) {
    state.autoplaying = false;
    autoButton.textContent = "Stopping…";
    return;
  }
  autoplay();
});
async function autoplay() {
  const dataset = datasetId();
  state.autoplaying = true;
  showAuto();
  let misses = 0;
  while (state.autoplaying && misses < 5) {
    if (!canRun()) {
      const i = newId(state.model);
      const response = await fetch(`/api/draw?id=${encodeURIComponent(dataset)}&i=${encodeURIComponent(i)}`);
      const tree = response.ok ? await response.json() : null;
      if (!tree) {
        const reason = response.ok ? "it has no values to draw from" : refusal(await response.text(), response);
        dialog.add({ kind: "error", text: `Autoplay could not draw a project: ${reason}.` });
        break;
      }
      const nodes = new Set(), values = {};
      const walk = item => {
        nodes.add(item.node);
        if (Object.keys(item.values ?? {}).length) values[item.node] = { ...item.values };
        (item.children ?? []).forEach(walk);
      };
      walk(tree);
      forgetRun();
      // The project begins with the root alone: its first step defines the specification, after which
      // the rest of the draw joins the selection, an extension, and the project plays on
      const root = tree.node;
      state.draft = { id: i, nodes: new Set([root]), values: values[root] ? { [root]: values[root] } : {} };
      state.view = null;
      state.problem = "";
      await build();
      await wait(900);                                   // a moment to see where it starts
      if (!state.autoplaying) break;
      if (nodes.size > 1 && canRun()) {
        const stepped = await advanceRun(false, true);   // kept open for the rest to join
        if (stepped === undefined) {
          misses++;
          if (!state.running) state.draft = null;
          dialog.add({ kind: "error", text: "Autoplay left a project it could not run, and draws the next." });
          continue;
        }
        if (!state.autoplaying) break;                   // stopped: the project waits, in progress
        Object.assign(state.draft, { nodes, values });
        await build();
        await wait(900);                                 // a moment to see the selection grown
        if (!state.autoplaying) break;
      }
    }
    const delivered = await advanceRun(true);
    if (!delivered) {
      misses++;
      if (!state.running) state.draft = null;            // could not run: the next is drawn
      dialog.add({ kind: "error", text: "Autoplay left a project it could not run, and draws the next." });
    } else {
      misses = 0;
    }
    if (state.autoplaying) await wait(1500);
  }
  state.autoplaying = false;
  showAuto();
}
