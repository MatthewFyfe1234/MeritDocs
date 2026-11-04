import type { ReactNode } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

/** Inline mathematics, typeset with KaTeX. Use within a sentence: <M>{"G = (V, E)"}</M>. */
export function M({ children }: { children: string }) {
  const html = katex.renderToString(children, { displayMode: false, throwOnError: false });
  return <span style={{ color: 'inherit' }} dangerouslySetInnerHTML={{ __html: html }} />;
}

/** One formula on an equation line, with an optional written reading shown beneath it when `showGloss` is set. */
export type EqPart = { tex: string; gloss?: ReactNode; showGloss?: boolean };

/** A display equation, auto-numbered on the right as "(n)". Refer to it in prose by that number. Pass a single
 *  formula as children (with `gloss` / `showGloss`), or a line of several formulas as `parts`, each carrying its
 *  own reading, which sits under its own formula and wraps to a narrow measure. */
export function Eq({ children, gloss, showGloss = false, parts }: {
  children?: string; gloss?: ReactNode; showGloss?: boolean; parts?: EqPart[];
}) {
  const line: EqPart[] = parts ?? [{ tex: children ?? '', gloss, showGloss }];
  return (
    <div className="paper-eq">
      <span className="paper-eq-body" style={{ color: 'inherit' }}>
        {line.map((p, i) => [
          <span key={`f${i}`} className="paper-eq-part"
            dangerouslySetInnerHTML={{ __html: katex.renderToString(p.tex, { displayMode: true, throwOnError: false }) }} />,
          <span key={`g${i}`} className="paper-eq-gloss">
            {p.gloss && p.showGloss && <span>{p.gloss}</span>}
          </span>,
        ])}
      </span>
      <span className="paper-eq-num" />
    </div>
  );
}
