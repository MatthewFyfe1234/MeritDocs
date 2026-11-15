// The page's state, shared by its parts: what is shown, what is being built, and what is running.

export const state = {
  model: null,          // the dataset's model, as /api/model gives it
  datasets: [],         // the datasets, for the tabs
  experience: {},       // each agent's experience so far at each step, {agent: {step: {measure: amount}}}
  view: null,           // the project shown against the master: {id, nodes, steps, ...}, its selected nodes,
                        // derived steps, forecasts, contracts and, once run, its records and progress
  draft: null,          // the project being built, if any: {id, nodes, values}, its selected nodes (one
                        // instance each) and the descriptor values bound on them, {node: {descriptor: value}}
  focus: null,          // the node chosen in the tree, if any, whose descriptors show below it
  problem: "",          // why the selection, as it stands, cannot be offered, if it cannot
  running: null,        // the project in progress: {id, locked}, locked the nodes its saved selection holds
  playing: false,       // while a run plays, the page waits for it
  replaying: null,      // the past project being replayed from its records, if any
  speed: 0,             // the run's speed, an index into PLAY_MS
  autoplaying: false,   // while Autoplay loops
  runs: 0,              // counts Resets: a run playing stops when it changes
  lastRun: null,        // {id, nodes, values}: the selection before its project's first run, for Reset
  builds: 0,            // counts builds: only the latest one's answer is shown
  buildTimer: null,     // a build waiting for typing to pause
  pane: "now",          // the dialog's tab shown
};

// Each job's token on the board, kept while its project is in progress
export const tokenOf = {};

// A run's steps take each of these in turn, for the whole project's time, as Play fast-forwards
export const PLAY_MS = [12000, 6000, 3000];

// Faded against the project shown: a node it does not select, a step it does not derive
export const fadedNode = id => state.view !== null && !state.view.nodes.has(id);
export const fadedStep = id => state.view !== null && !state.view.steps.has(id);

// An agent's executions so far at a job's steps, the count its chip and token carry
export const executionsIn = (M, agent, j) => Object.entries(state.experience[agent] ?? {})
  .filter(([s]) => M.G.steps[s].job === j).reduce((n, [, amounts]) => n + (amounts.executions ?? 0), 0);

// The nodes whose mapping includes a step
export const necessitating = (M, step) => Object.entries(M.mu.steps).filter(([, ss]) => ss.includes(step)).map(([x]) => x);

export const parentOf = M => Object.fromEntries(M.T.relations.map(([p, c]) => [c, p]));
export const childrenOf = (M, x) => M.T.relations.filter(([p]) => p === x).map(([, c]) => c);

// Whether the project being built can run: offered, with its forecasts, as shown
export const canRun = () => !!state.draft && !!state.view?.forecasts && state.view.id === state.draft.id;
