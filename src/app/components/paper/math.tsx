import katex from 'katex';
import 'katex/dist/katex.min.css';

/** Inline mathematics, typeset with KaTeX. Use within a sentence: <M>{"G = (V, E)"}</M>. */
export function M({ children }: { children: string }) {
  const html = katex.renderToString(children, { displayMode: false, throwOnError: false });
  return <span style={{ color: 'inherit' }} dangerouslySetInnerHTML={{ __html: html }} />;
}

/** A display equation, auto-numbered on the right as "(n)". Refer to it in prose by that number. */
export function Eq({ children }: { children: string }) {
  const html = katex.renderToString(children, { displayMode: true, throwOnError: false });
  return (
    <div className="paper-eq">
      <span className="paper-eq-body" style={{ color: 'inherit' }} dangerouslySetInnerHTML={{ __html: html }} />
      <span className="paper-eq-num" />
    </div>
  );
}
