import { useSyncExternalStore } from 'react';
import { infections } from './data';
import type { Infection, Stage, Status, SystemId } from './data';

// Browser-local overrides on top of the defaults in data.ts.
// Shared across slides so the overview heat map follows edits on system slides.

const KEY = 'annie-scaffold-v1';

interface ScaffoldState {
  status: Record<string, Status>;
  stage: Record<string, Stage>;
  attempted: Record<string, boolean>;
  comments: Record<string, string>;
}

const empty: ScaffoldState = { status: {}, stage: {}, attempted: {}, comments: {} };

function load(): ScaffoldState {
  try { return { ...empty, ...JSON.parse(localStorage.getItem(KEY) ?? '{}') }; }
  catch { return empty; }
}

let state = load();
const listeners = new Set<() => void>();

function commit(next: ScaffoldState) {
  state = next;
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage unavailable */ }
  listeners.forEach(l => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

export function useScaffold() {
  return useSyncExternalStore(subscribe, () => state);
}

export const statusOf = (s: ScaffoldState, inf: Infection) => s.status[inf.id] ?? inf.status;
export const stageOf = (s: ScaffoldState, inf: Infection) => s.stage[inf.id] ?? inf.stage;
export const attemptedOf = (s: ScaffoldState, inf: Infection, i: number) =>
  s.attempted[`${inf.id}:${i}`] ?? inf.options[i].attempted ?? false;

export function setStatus(inf: Infection, status: Status) {
  commit({ ...state, status: { ...state.status, [inf.id]: status } });
}

export function setStage(inf: Infection, stage: Stage) {
  commit({ ...state, stage: { ...state.stage, [inf.id]: stage } });
}

export function toggleAttempted(inf: Infection, i: number) {
  const key = `${inf.id}:${i}`;
  commit({ ...state, attempted: { ...state.attempted, [key]: !attemptedOf(state, inf, i) } });
}

export function setComment(key: string, text: string) {
  commit({ ...state, comments: { ...state.comments, [key]: text } });
}

// ---------------------------------------------------------------------------
// Heat map: worst outstanding status among a system's infections.
//   ruled-out = every infection ruled out
//   amber     = any confirmed and still untreated or treating
//   green     = all remaining resolved (or recurred)
//   grey      = otherwise (suspected / untested)
//   ring      = something recurred
// ---------------------------------------------------------------------------

export type Heat = 'grey' | 'amber' | 'green' | 'ruled-out';

export function systemHeat(s: ScaffoldState, id: SystemId): { heat: Heat; ring: boolean } {
  const members = infections.filter(i => i.system === id || i.alsoIn?.includes(id));
  const live = members.filter(i => statusOf(s, i) !== 'ruled out');
  if (live.length === 0) return { heat: 'ruled-out', ring: false };

  const stages = live.map(i => stageOf(s, i));
  const ring = stages.includes('recurred');
  const outstandingConfirmed = live.some(i =>
    statusOf(s, i) === 'confirmed' && ['untreated', 'treating'].includes(stageOf(s, i)));

  if (outstandingConfirmed) return { heat: 'amber', ring };
  if (stages.every(st => st === 'resolved' || st === 'recurred')) return { heat: 'green', ring };
  return { heat: 'grey', ring };
}
