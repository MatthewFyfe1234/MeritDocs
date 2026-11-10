import type { ReactNode } from 'react';

/**
 * Revision mark: wraps content added or reworded since the paper was submitted. Inline by default, wrapping a phrase
 * or sentence; pass `block` to wrap whole paragraphs, equations or figures. Highlighted only while the paper's
 * Revisions toggle is on (see PaperConfig.revisions); otherwise it renders as plain content. Deletions are not marked.
 * Inside SVG figures, give a revised <text> className="paper-rev-svg" instead; it follows the same toggle.
 * Pass `existing` to mark text that was already in the submitted version but that a reviewer asked for, so it can be
 * pointed to without implying it changed; it takes a different colour under the same toggle.
 * Pass `minor` to mark a change of wording only, shown as a faint underline rather than a fill, so substantive
 * revisions stand out.
 */
export function Rev({ block, existing, minor, children }: { block?: boolean; existing?: boolean; minor?: boolean; children: ReactNode }) {
  const cls = `paper-rev${block ? ' paper-rev-block' : ''}${existing ? ' paper-rev-existing' : ''}${minor ? ' paper-rev-minor' : ''}`;
  return block ? <div className={cls}>{children}</div> : <span className={cls}>{children}</span>;
}

/** Image, SVG or diagram with a caption. Kept together on one page when printed. Pass `table` to number it as
 *  "Table n" on its own counter, leaving figure numbers unchanged. */
export function Figure({ caption, table, children }: { caption?: ReactNode; table?: boolean; children: ReactNode }) {
  return (
    <figure className={`paper-figure${table ? ' paper-table' : ''}`}>
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
