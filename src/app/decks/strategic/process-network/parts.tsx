import { ReactNode } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

// Mathematics, typeset with KaTeX. `block` renders display style (larger, centred).
export function Tex({ children, block = false }: { children: string; block?: boolean }) {
  const html = katex.renderToString(children, { displayMode: block, throwOnError: false });
  const Tag = block ? 'div' : 'span';
  return <Tag style={{ color: 'inherit' }} dangerouslySetInnerHTML={{ __html: html }} />;
}

// One card holding all of a slide's formulas, each an optionally-labelled row
// with an optional right-aligned reference number and an optional plain-text
// explanation. Rows are separated by dividers.
export function Formulas({ rows }: { rows: { label?: string; tex: string; num?: number; note?: ReactNode }[] }) {
  return (
    <div
      className="rounded-lg px-7 py-5 flex flex-col shrink-0"
      style={{ backgroundColor: 'var(--slide-bg-muted)', border: '1px solid var(--slide-border)' }}
    >
      {rows.map((r, i) => (
        <div
          key={i}
          className="flex flex-col gap-1.5"
          style={i > 0 ? { borderTop: '1px solid var(--slide-border)', marginTop: 18, paddingTop: 18 } : undefined}
        >
          {r.label && (
            <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--slide-accent)', opacity: 0.8 }}>
              {r.label}
            </span>
          )}
          <div className="flex flex-row items-center gap-5">
            <div className="flex-1 min-w-0" style={{ color: 'var(--slide-text)', fontSize: '1.4rem' }}>
              <Tex>{`\\displaystyle ${r.tex}`}</Tex>
            </div>
            {r.num != null && (
              <span className="shrink-0 text-sm" style={{ color: 'var(--slide-text)', opacity: 0.45 }}>({r.num})</span>
            )}
          </div>
          {r.note && (
            <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>{r.note}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export function P({ children }: { children: ReactNode }) {
  return (
    <p className="text-lg leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.85 }}>
      {children}
    </p>
  );
}

// Symbol key: a top-right panel defining every symbol used on the slide.
// Each entry's `sym` is a KaTeX string.
export function SymbolKey({ entries }: { entries: { sym: string; def: ReactNode }[] }) {
  return (
    <div
      className="absolute top-6 right-8 flex flex-col gap-1.5 rounded-lg px-4 py-3"
      style={{ backgroundColor: 'var(--slide-bg-muted)', border: '1px solid var(--slide-border)', maxWidth: 340 }}
    >
      <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--slide-accent)', opacity: 0.8 }}>
        Key
      </span>
      {entries.map((e, i) => (
        <div key={i} className="flex items-baseline gap-2 text-xs" style={{ color: 'var(--slide-text)', opacity: 0.8 }}>
          <span className="shrink-0"><Tex>{e.sym}</Tex></span>
          <span style={{ opacity: 0.55 }}>{e.def}</span>
        </div>
      ))}
    </div>
  );
}

// A key for symbolic clusters: each entry is a sub-expression (KaTeX) on the
// left and its plain-English reading on the right. Bottom-right companion to
// the top-right SymbolKey, for while the symbology is still being learned.
export function PlainReading({ entries }: { entries: { expr: string; reading: ReactNode }[] }) {
  return (
    <div
      className="absolute bottom-6 right-8 flex flex-col gap-2 rounded-lg px-4 py-3"
      style={{ backgroundColor: 'var(--slide-bg-primary-muted)', border: '1px solid var(--slide-border-primary)', maxWidth: 420 }}
    >
      <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--slide-primary)', opacity: 0.85 }}>
        In words
      </span>
      {entries.map((e, i) => (
        <div key={i} className="flex items-baseline gap-3 text-xs" style={{ color: 'var(--slide-text)', opacity: 0.85 }}>
          <span className="shrink-0"><Tex>{e.expr}</Tex></span>
          <span style={{ opacity: 0.7 }}>{e.reading}</span>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SVG diagram parts: steps are accent boxes, products are primary arrows
// ---------------------------------------------------------------------------

export function ArrowDefs({ id }: { id: string }) {
  return (
    <defs>
      <marker id={id} markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
        <polygon points="0 0, 10 3.5, 0 7" fill="var(--slide-primary)" />
      </marker>
    </defs>
  );
}

export function StepNode({ x, y, w, h, label, sub }: {
  x: number; y: number; w: number; h: number;
  label: ReactNode;
  sub?: ReactNode;
}) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="6"
        fill="var(--slide-bg-accent-muted)" stroke="var(--slide-accent)" strokeWidth="1.5" />
      <text x={cx} y={sub ? cy - 3 : cy + 4} textAnchor="middle" fontSize="11" fontWeight="700"
        fill="var(--slide-accent)">{label}</text>
      {sub && (
        <text x={cx} y={cy + 11} textAnchor="middle" fontSize="8.5" fill="var(--slide-text)" opacity="0.7">{sub}</text>
      )}
    </g>
  );
}

export function ProductEdge({ x1, y1, x2, y2, markerId }: {
  x1: number; y1: number; x2: number; y2: number; markerId: string;
}) {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--slide-primary)" strokeWidth="1.8"
      markerEnd={`url(#${markerId})`} />
  );
}

export function EdgeLabel({ x, y, label }: { x: number; y: number; label: ReactNode }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--slide-primary)">{label}</text>
  );
}

export const it = (s: string) => <tspan fontStyle="italic">{s}</tspan>;
