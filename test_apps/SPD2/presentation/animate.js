// Playing a run back on the board: agents as tokens taking their contracts and moving from step to step,
// each step hatched as it executes, the experience it gives rising from it, and the project delivered.

import { el, wait } from "./util.js";
import { state, tokenOf, PLAY_MS, executionsIn } from "./state.js";
import { dialog } from "./dialog.js";
import { renderAgents } from "./panels.js";
import { renderProcess } from "./process.js";

// Takes the tokens off the board: a gain still rising stays, and a token going home finishes its way
export const clearTokens = () => {
  for (const t of document.querySelectorAll(".tokens .token:not(.home)")) t.remove();
  for (const j of Object.keys(tokenOf)) delete tokenOf[j];
};

// Plays back the part of a run just executed, as a board game. Each job newly taken has its agent, a
// token, self-select the contract, moving from the Agents panel to its lane. Then the project's time runs
// over the steps executed, at PLAY_MS[speed] for the whole project: each token moves to its job's next
// step, waiting there until the step's inputs arrive, and the step is hatched as it executes, its start
// and finish those the model accumulates from the recorded values. The tokens stay on the board while the
// project is in progress, and leave once it is delivered. The dialog follows the run's events.
export async function animate(run, fresh = true) {
  const mine = state.runs;                               // stops where a Reset changes runs
  const later = ["taken", "recorded", "delivered"];
  if (fresh) dialog.state(run.events.filter(e => !later.includes(e.kind)));   // later waves add to it
  const tokens = document.querySelector(".tokens");
  const place = (token, rect, at) => {
    const [x, y] = at(rect);
    token.style.transform = `translate(${x - token.offsetWidth / 2}px, ${y - token.offsetHeight / 2}px)`;
  };
  const labelsLeft = document.querySelector("#process .labels").getBoundingClientRect().left;
  const beside = r => [labelsLeft + 18, r.top + r.height / 2];      // at the left of a lane's label
  const corner = r => [r.left + 4, r.top + 2];                      // on a step's top-left corner
  const laneLabel = j => document.querySelector(`#process .lane-label[data-id="${j}"]`);
  const stepBox = s => document.querySelector(`#process .node.step[data-id="${s}"] rect`);

  // The project as it now stands, grown by any extension, with the steps executed so far
  const executed = run.executed;
  Object.assign(state.view, {
    steps: new Set(run.process.steps), carried: new Set(run.process.carried), leaving: new Set(run.process.leaving),
    taken: state.view.taken ?? {}, recorded: state.view.recorded ?? {}, progress: state.view.progress ?? {},
  });
  for (const s of executed) state.view.progress[s] = 0;
  renderProcess(state.model);

  // Tokens: those already on the board where the page was reloaded, then the contracts newly taken, one
  // job after another. A job that has ended has gone home, unless an extension has given it more steps.
  const jobOf = s => state.model.G.steps[s].job;
  const ended = j => [...state.view.steps].filter(s => jobOf(s) === j).every(s => s in state.view.recorded);
  // A token carries its agent's experience in the job, executions so far, as its chip does
  const token = (j, agent) => {
    const t = el("span", "instance token", agent);
    t.append(el("small", "count", executionsIn(state.model, agent, j)));
    return tokens.appendChild(t);
  };
  // A handover: the agent no longer eligible at the steps added goes home, and the new holder comes on
  for (const [j, agent] of Object.entries(run.taken)) {
    const before = state.view.taken[j];
    if (!before || before === agent) continue;
    const t = tokenOf[j];
    delete tokenOf[j];
    delete state.view.taken[j];
    run.events.filter(e => e.kind === "handed over" && e.refs[0] === j).forEach(e => dialog.add(e));
    if (!t) continue;
    const chip = document.querySelector(`#agents .type[data-id="${j}"] .instance[data-id="${before}"]`);
    t.classList.add("home");
    t.style.transition = "transform 1s ease, opacity 1s ease";
    if (chip) place(t, chip.getBoundingClientRect(), r => [r.left + r.width / 2, r.top + r.height / 2]);
    t.style.opacity = 0;
    setTimeout(() => t.remove(), 1000);
  }
  for (const [j, agent] of Object.entries(state.view.taken)) {
    if (tokenOf[j] || ended(j)) continue;
    const t = tokenOf[j] = token(j, agent);
    t.style.transition = "none";
    place(t, laneLabel(j).getBoundingClientRect(), beside);
    t.getBoundingClientRect();
    t.style.transition = "";
  }
  let selecting = false;
  for (const [j, agent] of Object.entries(run.taken)) {
    if (state.view.taken[j]) continue;
    selecting = true;
    const chip = document.querySelector(`#agents .type[data-id="${j}"] .instance[data-id="${agent}"]`);
    const t = tokenOf[j] = token(j, agent);
    t.style.transition = "none";
    place(t, chip.getBoundingClientRect(), r => [r.left + r.width / 2, r.top + r.height / 2]);
    t.getBoundingClientRect();                                       // settles the start before moving
    t.style.transition = "";
    place(t, laneLabel(j).getBoundingClientRect(), beside);
    await wait(550);
    if (state.runs !== mine) return;                                 // Reset stops the run here
    state.view.taken[j] = agent;
    run.events.filter(e => e.kind === "taken" && e.refs[0] === j).forEach(e => dialog.add(e));
    renderAgents(state.model);
    renderProcess(state.model);
  }
  if (selecting) await wait(300);
  if (state.runs !== mine) return;
  if (!executed.length) return deliver();                // nothing left to execute: straight to delivery

  // Execution: when each step executed now starts and finishes, in the project's time, its share of the
  // project's forecast time played over PLAY_MS[speed]
  const m = Object.keys(run.delivery.accumulated)[0];
  const start = {}, finish = {};
  if (m !== undefined && executed.every(s => s in run.delivery.accumulated[m])) {
    for (const s of executed) [start[s], finish[s]] = [run.delivery.arrived[m][s], run.delivery.accumulated[m][s]];
  } else {
    executed.forEach((s, k) => { start[s] = k; finish[s] = k + 1; });    // no time metric: one by one
  }
  const t0 = Math.min(...executed.map(s => start[s])), t1 = Math.max(...executed.map(s => finish[s]));
  const whole = run.offer?.values?.[m] > 0 ? run.offer.values[m] : t1 - t0 || 1;
  const sequence = Object.fromEntries(Object.keys(run.taken).map(j =>
    [j, executed.filter(s => jobOf(s) === j).sort((a, b) => start[a] - start[b])]).filter(([, steps]) => steps.length));
  const at = {};
  const finished = new Set();
  // Each step that finishes adds to its agent's experience there, on the board where the work is: the gain
  // rises from the step, executions first, then any floor's measure, and the token's count and the chip's
  // take it, the model's own figures reloaded once the run stops
  const gain = s => {
    const j = jobOf(s), agent = run.agents?.[s] ?? state.view.taken[j];
    const amounts = run.delivery.gained[agent]?.[s] ?? {};
    const shown = ((state.experience[agent] ??= {})[s] ??= {});
    for (const [m, v] of Object.entries(amounts)) shown[m] = (shown[m] ?? 0) + v;
    const count = tokenOf[j]?.querySelector(".count");
    if (count) count.textContent = executionsIn(state.model, agent, j);
    renderAgents(state.model);
    const text = Object.entries(amounts).sort(([a], [b]) => (b === "executions") - (a === "executions"))
      .map(([m, v]) => m === "executions" ? `+${v}` : `+${+v.toFixed(2)} ${m.split(".").pop()}`).join(" · ");
    const r = stepBox(s)?.getBoundingClientRect();
    if (!r || !text) return;
    const pop = tokens.appendChild(el("span", "gain", text));
    Object.assign(pop.style, { left: `${r.left + r.width / 2}px`, top: `${r.top - 4}px` });
    setTimeout(() => pop.remove(), 3300);
  };
  // A job ends once all its steps in the project are executed: its token goes quietly home to the chip
  const centre = r => [r.left + r.width / 2, r.top + r.height / 2];
  const goHome = async j => {
    const t = tokenOf[j], agent = state.view.taken[j];
    delete tokenOf[j];
    const chip = document.querySelector(`#agents .type[data-id="${j}"] .instance[data-id="${agent}"]`);
    t.classList.add("home");
    t.style.transition = "transform 1s ease, opacity 1s ease";
    if (chip) place(t, chip.getBoundingClientRect(), centre);
    t.style.opacity = 0;
    await wait(1000);
    t.remove();
  };
  // A replay follows who executed each step, as recorded: where another agent executed a job's next step,
  // the one before goes home and the next comes on from its chip
  const takeOver = (j, agent) => {
    goHome(j);
    state.view.taken[j] = agent;
    run.events.filter(e => e.kind === "took over" && e.refs[0] === j && e.refs[2] === agent).forEach(e => dialog.add(e));
    const chip = document.querySelector(`#agents .type[data-id="${j}"] .instance[data-id="${agent}"]`);
    const t = tokenOf[j] = token(j, agent);
    t.style.transition = "none";
    if (chip) place(t, chip.getBoundingClientRect(), centre);
    t.getBoundingClientRect();
    t.style.transition = "";
    renderAgents(state.model);
    renderProcess(state.model);
  };
  await new Promise(resolve => {
    let last = performance.now(), share = 0;             // share: how much of this part has played
    const frame = now => {
      if (state.runs !== mine) return resolve();
      const span = Math.max(t1 - t0, 1e-9);
      share = Math.min(1, share + (now - last) / (PLAY_MS[state.speed] * span / whole));   // a faster speed carries on
      last = now;
      const t = t0 + share * span;
      let changed = false;
      for (const s of executed) {
        const span = finish[s] - start[s];
        const done = span > 0 ? Math.max(0, Math.min(1, (t - start[s]) / span)) : t >= start[s] ? 1 : 0;
        state.view.progress[s] = done;
        const hatch = document.querySelector(`#process .hatch[data-id="${s}"]`);
        if (hatch) hatch.setAttribute("width", hatch.dataset.w * done);
        if (done >= 1 && !finished.has(s)) {
          finished.add(s);
          state.view.recorded[s] = run.delivery.recorded[s];
          run.events.filter(e => e.kind === "recorded" && e.refs[0] === s).forEach(e => dialog.add(e));
          changed = true;
          gain(s);
          if (tokenOf[jobOf(s)] && ended(jobOf(s))) goHome(jobOf(s));
        }
      }
      if (changed) renderProcess(state.model);
      for (const [j, steps] of Object.entries(sequence)) {
        if (!tokenOf[j]) continue;                       // gone home: its job has ended
        const next = steps.find(s => !finished.has(s)) ?? steps[steps.length - 1];
        if (at[j] !== next) {
          at[j] = next;
          const recorded = run.agents?.[next];
          if (recorded && recorded !== state.view.taken[j] && !finished.has(next)) takeOver(j, recorded);
          place(tokenOf[j], stepBox(next).getBoundingClientRect(), corner);
        }
      }
      if (finished.size < executed.length) requestAnimationFrame(frame);
      else resolve();
    };
    requestAnimationFrame(frame);
  });
  return deliver();

  // Delivery: the tokens leave, and the project's value is read against its forecast. In progress, the
  // tokens stay where they are.
  async function deliver() {
    if (state.runs !== mine || !run.done) return;
    await wait(400);
    if (state.runs !== mine) return;
    for (const t of Object.values(tokenOf)) t.style.opacity = 0;
    state.view.delivered = run.delivery.value;
    run.events.filter(e => e.kind === "delivered").forEach(e => dialog.add(e));
    await wait(400);
    clearTokens();
  }
}
