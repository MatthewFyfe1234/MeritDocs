import type { ReactNode } from 'react';

/** Image, SVG or diagram with a caption. Kept together on one page when printed. */
export function Figure({ caption, children }: { caption?: string; children: ReactNode }) {
  return (
    <figure className="paper-figure">
      {children}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function Thm({ kind, name, children }: { kind: 'def' | 'prop'; name?: string; children: ReactNode }) {
  return (
    <div className={`paper-thm paper-${kind}`}>
      <div className="paper-thm-head">
        <span className="paper-thm-label" />
        {name && <span className="paper-thm-name"> ({name})</span>}
      </div>
      {children}
    </div>
  );
}

/** Auto-numbered "Definition n (name)". Use in the model section for formal structure. */
export function Definition({ name, children }: { name?: string; children: ReactNode }) {
  return <Thm kind="def" name={name}>{children}</Thm>;
}

/** Auto-numbered "Proposition n (name)". */
export function Proposition({ name, children }: { name?: string; children: ReactNode }) {
  return <Thm kind="prop" name={name}>{children}</Thm>;
}
