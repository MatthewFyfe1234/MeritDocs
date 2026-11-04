import type { ReactNode } from 'react';

/**
 * Revision mark: wraps content added or reworded since the paper was submitted. Inline by default, wrapping a phrase
 * or sentence; pass `block` to wrap whole paragraphs, equations or figures. Highlighted only while the paper's
 * Revisions toggle is on (see PaperConfig.revisions); otherwise it renders as plain content. Deletions are not marked.
 * Inside SVG figures, give a revised <text> className="paper-rev-svg" instead; it follows the same toggle.
 */
export function Rev({ block, children }: { block?: boolean; children: ReactNode }) {
  return block ? <div className="paper-rev paper-rev-block">{children}</div> : <span className="paper-rev">{children}</span>;
}

/** Image, SVG or diagram with a caption. Kept together on one page when printed. */
export function Figure({ caption, children }: { caption?: ReactNode; children: ReactNode }) {
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
