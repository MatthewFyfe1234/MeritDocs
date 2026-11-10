/**
 * Shared routing conventions for the master specification / master process figures, so every figure draws its
 * connectors the same way:
 *
 * - A mapping leaves its specification node's right edge horizontally, turns onto a vertical trunk in the gap
 *   between the masters, runs along a channel inside the lanes, and enters each step at its top-left corner (or
 *   bottom-left, where the channel lies below the step). Products keep the top-centre and side entries, so the
 *   two kinds of path stay distinct.
 * - Products crossing the process boundary flow downwards: in through the top of the first step, out through the
 *   bottom of the last, each crossing the edge of the lanes.
 */

export type Box = { cx: number; cy: number; w: number; h: number };

/** How far in from a step's left edge a mapping enters it. */
export const MAP_INSET = 8;

const top = (b: Box) => b.cy - b.h / 2;
const bottom = (b: Box) => b.cy + b.h / 2;
const left = (b: Box) => b.cx - b.w / 2;

type Pt = [number, number];
type MapTarget = { channelY: number; box: Box };

/**
 * Segments of a mapping from a specification node to the steps it necessitates, as polylines, so a figure can
 * draw them flat or project them (Figure 3). `from` is the point on the node's right edge; `trunkX` the vertical
 * trunk; each target gives the channel y it is reached along. Targets sharing a channel share one horizontal run.
 */
export function mappingSegments(from: Pt, trunkX: number, targets: MapTarget[]): Pt[][] {
  const [fx, fy] = from;
  const ys = [fy, ...targets.map(t => t.channelY)];
  const segs: Pt[][] = [[[fx, fy], [trunkX, fy]], [[trunkX, Math.min(...ys)], [trunkX, Math.max(...ys)]]];
  const byChannel = new Map<number, Box[]>();
  for (const { channelY, box } of targets) byChannel.set(channelY, [...(byChannel.get(channelY) ?? []), box]);
  for (const [y, boxes] of byChannel) {
    segs.push([[trunkX, y], [Math.max(...boxes.map(b => left(b) + MAP_INSET)), y]]);
    for (const b of boxes) {
      const x = left(b) + MAP_INSET;
      segs.push([[x, y], [x, y < top(b) ? top(b) : bottom(b)]]);
    }
  }
  return segs;
}

/** SVG path data for a set of polylines. */
export const polylinesPath = (segs: Pt[][]) =>
  segs.map(seg => seg.map(([x, y], i) => `${i ? 'L' : 'M'}${x},${y}`).join(' ')).join(' ');

/** SVG path data for a mapping, drawn flat. */
export const mappingPath = (from: Pt, trunkX: number, targets: MapTarget[]) =>
  polylinesPath(mappingSegments(from, trunkX, targets));

/** A product entering the process from outside, dropping into the top-centre of a step. */
export function terminalIn(b: Box, length = 23) {
  return { x1: b.cx, y1: top(b) - 2 - length, x2: b.cx, y2: top(b) - 2 };
}

/** A product leaving the process, dropping from the bottom-centre of a step. */
export function terminalOut(b: Box, length = 31) {
  return { x1: b.cx, y1: bottom(b), x2: b.cx, y2: bottom(b) + length };
}
