import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Download, Pencil } from 'lucide-react';
import { PaperProvider } from './PaperContext';
import type { PaperConfig } from './types';

// Plain scholarly layout: serif body, Inter headings in the brand green. No letterhead, logo or
// contact footer — just the title block and the body, the way a preprint looks.
const CSS = `
.paper-sheet { width: 210mm; background: #fff; box-shadow: 0 10px 40px rgba(0,0,0,.15); margin: 0 auto; }
.paper-body-cell { padding: 8mm 11mm 6mm; }

.paper { font-family: Georgia, "Times New Roman", serif; font-size: 11pt; line-height: 1.5; color: #222; font-variant-numeric: lining-nums; }
.paper h1, .paper h2, .paper h3, .paper h4 { font-family: "Inter", sans-serif; color: var(--slide-primary); font-weight: 700; break-after: avoid; }
.paper h1 { font-size: 20pt; line-height: 1.2; margin: 0 0 3mm; }
.paper h2 { font-size: 13pt; line-height: 1.3; margin: 1.6em 0 .5em; }
.paper h3 { font-size: 11pt; margin: 1.3em 0 .4em; }
.paper h4 { font-size: 10.5pt; font-weight: 600; margin: 1.1em 0 .35em; }
.paper p { margin: 0 0 .8em; text-align: justify; hyphens: auto; orphans: 3; widows: 3; }
.paper a { color: inherit; text-decoration: underline; word-break: break-word; }
.paper ul, .paper ol { margin: 0 0 .8em; padding-left: 1.4em; }
.paper ul { list-style: disc; }
.paper ol { list-style: decimal; }
.paper li { margin-bottom: .25em; }
.paper blockquote { margin: 0 0 .8em 8mm; font-style: italic; }
.paper-body-cell table { width: 100%; border-collapse: collapse; margin: 0 0 1em; font-size: 10pt; border-top: 1.5px solid #222; border-bottom: 1.5px solid #222; break-inside: avoid; }
.paper-body-cell th { text-align: left; font-weight: 700; border-bottom: 1px solid #222; padding: 1.5mm 2mm; }
.paper-body-cell td { padding: 1.2mm 2mm; vertical-align: top; }

.paper-subtitle { font-size: 12pt; margin: 0 0 2mm; text-align: left !important; }
.paper-byline { font-family: "Inter", sans-serif; font-size: 9pt; margin: 0 0 6mm; opacity: .7; text-align: left !important; }
.paper-abstract { margin: 0 8mm 6mm; font-size: 10.5pt; break-inside: avoid; }
.paper-abstract-label { font-family: "Inter", sans-serif; font-size: 9pt; font-weight: 700; margin-bottom: 1mm; }
.paper-abstract p { margin: 0; }

.paper-figure { margin: 0 0 1em; break-inside: avoid; }
.paper-figure svg, .paper-figure img { max-width: 100%; height: auto; display: block; margin: 0 auto; }
.paper-figure figcaption { font-size: 9.5pt; margin-top: 1.5mm; }

.paper-bibliography h2 { margin-top: 1.8em; }
.paper-bib-numbered { display: flex; padding-left: 0; text-indent: 0; }
.paper-bib-num { flex: none; width: 10mm; }
.paper-bib-entry { font-size: 10pt; padding-left: 8mm; text-indent: -8mm; margin-bottom: .5em !important; text-align: left !important; }

.paper { counter-reset: sec def prop fig eq; }
.paper-numbered h2 { counter-increment: sec; counter-reset: sub; }
.paper-numbered h2::before { content: counter(sec) "."; margin-right: .6em; }
.paper-numbered h3 { counter-increment: sub; }
.paper-numbered h3::before { content: counter(sec) "." counter(sub); margin-right: .6em; }
.paper-numbered .paper-bibliography h2 { counter-increment: none; }
.paper-numbered .paper-bibliography h2::before { content: none; }
.paper-figure figcaption::before { counter-increment: fig; content: "Figure " counter(fig) ". "; font-weight: 700; }

.paper-thm { margin: 0 0 1em; break-inside: avoid; }
.paper-thm > :last-child { margin-bottom: 0; }
.paper-thm-head { display: inline; font-weight: 700; padding-right: .4em; }
.paper-thm-name { font-weight: 400; }
.paper-thm-head + p { display: inline; }
.paper-prop { font-style: italic; }
.paper-def .paper-thm-label::before { counter-increment: def; content: "Definition " counter(def) "."; }
.paper-prop .paper-thm-label::before { counter-increment: prop; content: "Proposition " counter(prop) "."; }
.paper-todo { font-style: italic; opacity: .55; }
/* Review aid: a dull highlighter marking content the reader has not yet checked. */
.paper-unchecked { background-color: rgba(224, 196, 96, 0.55); border-radius: 1px; box-decoration-break: clone; -webkit-box-decoration-break: clone; }

.paper-eq { display: grid; grid-template-columns: 1fr auto; align-items: center; column-gap: 1em; margin: .4em 0 1em; break-inside: avoid; }
.paper-eq-body { text-align: center; }
.paper-eq-body .katex-display { margin: 0; }
.paper-eq-num { font-size: 10.5pt; white-space: nowrap; }
.paper-eq-num::before { counter-increment: eq; content: "(" counter(eq) ")"; }

@media screen {
  .paper-toolbar { position: sticky; top: 0; z-index: 10; }
  .paper-sheet { min-height: 297mm; }
}
@media print {
  /* Page margins live here, not as padding on the content box: @page margin is a per-page
     property the browser re-applies on every printed page, whereas padding on a box that
     fragments across pages only applies to that box's first and last fragment. */
  @page { size: A4; margin: 8mm 11mm 6mm; }
  html, body { background: #fff !important; }
  .paper-toolbar, .paper-screen-pad { display: none !important; }
  .paper-sheet { box-shadow: none; margin: 0; width: auto; }
  .paper-body-cell { padding: 0 !important; }
  .paper-page { padding: 0 !important; background: #fff !important; }
  * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}
`;

export function PaperViewer({ paper }: { paper: PaperConfig }) {
  useEffect(() => {
    const prev = document.title;
    document.title = paper.exportFilename?.replace(/\.pdf$/i, '') ?? paper.title;
    return () => { document.title = prev; };
  }, [paper]);

  // Wait for fonts, images and a settled layout before opening the print dialog. Printing too early gives the
  // browser a not-yet-ready page, which is a common cause of a first-save PDF that opens as a zero-page/corrupt
  // file until the browser is refreshed.
  const handlePrint = async () => {
    try {
      await document.fonts?.ready;
      const imgs = Array.from(document.querySelectorAll<HTMLImageElement>('.paper-sheet img'));
      await Promise.all(
        imgs.map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise<void>((res) => { img.onload = img.onerror = () => res(); })
        )
      );
      await new Promise<void>((res) =>
        requestAnimationFrame(() => requestAnimationFrame(() => res()))
      );
    } catch {
      // fall through and print anyway
    }
    window.print();
  };

  const [editMode, setEditMode] = useState(false);
  const [sel, setSel] = useState<{ text: string; top: number; left: number } | null>(null);
  const [draft, setDraft] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // In edit mode, a prose selection in the sheet opens an editor for its wording.
  const onSheetMouseUp = () => {
    if (!editMode) return;
    const s = window.getSelection();
    if (!s || s.isCollapsed || !s.rangeCount) return;
    const range = s.getRangeAt(0);
    if (!sheetRef.current || !sheetRef.current.contains(range.commonAncestorContainer)) return;
    if (range.cloneContents().querySelector('.katex')) {
      setSel(null);
      setStatus('That selection includes an equation — select plain prose only.');
      return;
    }
    const text = s.toString();
    if (text.trim().length < 3) { setSel(null); return; }
    const rect = range.getBoundingClientRect();
    setDraft(text);
    setSel({ text, top: rect.bottom + window.scrollY + 6, left: rect.left + window.scrollX });
    setStatus(null);
  };

  const applyEdit = async () => {
    if (!sel) return;
    setStatus('Saving…');
    try {
      const r = await fetch('/__edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ find: sel.text, replace: draft }),
      });
      const j = await r.json();
      if (j.ok) {
        setStatus(`Saved to ${j.file}`);
        setSel(null);
        window.getSelection()?.removeAllRanges();
      } else {
        setStatus(j.reason || 'Could not apply the edit.');
      }
    } catch (e) {
      setStatus('Edit failed: ' + String(e));
    }
  };

  const byline = [paper.authors?.join(', '), paper.date].filter(Boolean).join('  •  ');
  const dev = import.meta.env.DEV;

  return (
    <div className="paper-page min-h-screen" style={{ backgroundColor: 'var(--slide-bg)', fontFamily: '"Inter", sans-serif' }}>
      <style>{CSS}</style>

      <div
        className="paper-toolbar flex items-center justify-between px-6 py-3"
        style={{ backgroundColor: 'var(--slide-bg-card)', borderBottom: '1px solid var(--slide-border-primary)' }}
      >
        <a href={window.location.pathname} className="flex items-center gap-2 text-sm" style={{ color: 'var(--slide-primary)' }}>
          <ArrowLeft className="w-4 h-4" />
          All documents
        </a>
        <div className="flex items-center gap-2">
          {dev && (
            <button
              onClick={() => { setEditMode((m) => !m); setSel(null); setStatus(null); }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
              style={{
                backgroundColor: editMode ? 'var(--slide-primary)' : 'var(--slide-bg-muted)',
                color: editMode ? '#fff' : 'var(--slide-text)',
                border: '1px solid var(--slide-border)',
              }}
              title="Select prose in the paper, then edit its wording in place (dev only)"
            >
              <Pencil className="w-4 h-4" />
              {editMode ? 'Editing' : 'Edit'}
            </button>
          )}
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
            style={{ backgroundColor: 'var(--slide-accent)', color: '#fff' }}
            title="Opens the print dialog: choose Save as PDF"
          >
            <Download className="w-4 h-4" />
            Save as PDF
          </button>
        </div>
      </div>

      <div className="paper-screen-pad py-8" />
      <div
        ref={sheetRef}
        onMouseUp={onSheetMouseUp}
        className={`paper-sheet paper${paper.numbered ? ' paper-numbered' : ''}`}
        style={editMode ? { outline: '2px solid var(--slide-accent)', outlineOffset: 4 } : undefined}
      >
        <div className="paper-body-cell">
          <PaperProvider references={paper.references} style={paper.citationStyle}>
            <h1>{paper.title}</h1>
            {paper.subtitle && <p className="paper-subtitle">{paper.subtitle}</p>}
            {byline && <p className="paper-byline">{byline}</p>}
            {paper.abstract && (
              <div className="paper-abstract">
                <div className="paper-abstract-label">Abstract</div>
                {paper.abstract}
              </div>
            )}
            {paper.content}
          </PaperProvider>
        </div>
      </div>
      <div className="paper-screen-pad py-8" />

      {sel && (
        <div
          style={{
            position: 'absolute', top: sel.top, left: sel.left, zIndex: 50, width: 'min(520px, 90vw)',
            background: 'var(--slide-bg-card)', border: '1px solid var(--slide-border-primary)',
            borderRadius: 8, boxShadow: '0 8px 30px rgba(0,0,0,.25)', padding: 12,
          }}
        >
          <div className="text-xs font-semibold mb-1" style={{ color: 'var(--slide-primary)' }}>Edit wording</div>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={Math.min(8, Math.max(2, Math.ceil(draft.length / 60)))}
            className="w-full text-sm p-2 rounded"
            style={{ background: 'var(--slide-bg)', color: 'var(--slide-text)', border: '1px solid var(--slide-border)', fontFamily: 'inherit', resize: 'vertical' }}
            autoFocus
          />
          <div className="flex items-center justify-end gap-2 mt-2">
            <button onClick={() => { setSel(null); setStatus(null); }} className="px-3 py-1.5 rounded text-sm" style={{ color: 'var(--slide-text)' }}>Cancel</button>
            <button onClick={applyEdit} className="px-3 py-1.5 rounded text-sm font-semibold" style={{ background: 'var(--slide-accent)', color: '#fff' }}>Apply</button>
          </div>
        </div>
      )}

      {status && (
        <div
          onClick={() => setStatus(null)}
          style={{
            position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 60,
            background: 'var(--slide-bg-card)', color: 'var(--slide-text)', border: '1px solid var(--slide-border-primary)',
            borderRadius: 8, padding: '8px 14px', fontSize: 13, boxShadow: '0 6px 24px rgba(0,0,0,.2)', cursor: 'pointer',
          }}
        >
          {status}
        </div>
      )}
    </div>
  );
}
