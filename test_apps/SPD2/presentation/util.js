// Small helpers shared by the page: building elements and SVG, measuring text, the paper's box style, and
// the dataset the page shows.

export const el = (tag, cls, text) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
};

const SVG = "http://www.w3.org/2000/svg";
export const svgEl = (tag, attrs = {}) => {
  const e = document.createElementNS(SVG, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  return e;
};
export const svgTitle = text => Object.assign(svgEl("title"), { textContent: text });

export const measure = (() => {
  const ctx = document.createElement("canvas").getContext("2d");
  ctx.font = "11px system-ui, -apple-system, 'Segoe UI', sans-serif";
  return text => ctx.measureText(text).width;
})();

export function arrowMarker(id, color) {
  const m = svgEl("marker", { id, markerWidth: 7, markerHeight: 7, refX: 5.5, refY: 3, orient: "auto" });
  m.append(svgEl("path", { d: "M0,0 L6,3 L0,6 Z", fill: color }));
  return m;
}

// A box in the paper's style, centred on (x, y), with one or two lines of text, faded where the project
// shown does not select or derive it
export function box(kind, x, y, w, h, lines, tip, id, faded = false) {
  const g = svgEl("g", { class: `node ${kind}${faded ? " faded" : ""}`, "data-id": id });
  if (tip) g.append(svgTitle(tip));
  g.append(svgEl("rect", { x: x - w / 2, y: y - h / 2, width: w, height: h, rx: 3 }));
  lines.forEach((line, i) => {
    const t = svgEl("text", { x, y: y + (i - (lines.length - 1) / 2) * 13, "text-anchor": "middle", "dominant-baseline": "middle" });
    t.textContent = line;
    g.append(t);
  });
  return g;
}

// Split a label over at most two lines
export function wrap(label, max = 15) {
  const words = label.split(" ");
  let first = "";
  while (words.length && (first + " " + words[0]).trim().length <= max) first = (first + " " + words.shift()).trim();
  if (!first) first = words.shift();
  let second = words.join(" ");
  if (second.length > max) second = second.slice(0, max - 1) + "…";
  return second ? [first, second] : [first];
}

export const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

// The dataset the page shows, from the URL hash: #dataset or #dataset/project
export const datasetId = () => location.hash.slice(1).split("/")[0];

// Why the server refused a request, from its error page, or its status where it gives none
export const refusal = (text, response) => text.match(/<p>Message: (.*?)\.<\/p>/)?.[1] ?? response.statusText;
