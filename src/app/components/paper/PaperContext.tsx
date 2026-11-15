import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { CslItem, PaperConfig } from './types';
import { BibEntry, formatNumbers, inlineCitation, shortAuthors, sortKey, withYearSuffixes, yearOf } from './citations';

interface PaperCtx {
  style: NonNullable<PaperConfig['citationStyle']>;
  references: CslItem[];
  numberOf: Map<string, number>;
  byId: Map<string, CslItem>;
  cited: string[];
  register: (ids: string[]) => () => void;
}

const Ctx = createContext<PaperCtx | null>(null);

export function PaperProvider({
  references,
  style = 'author-year',
  children,
}: {
  references: CslItem[];
  style?: PaperCtx['style'];
  children: ReactNode;
}) {
  const byId = useMemo(
    () => new Map((style === 'numeric' ? references : withYearSuffixes(references)).map(r => [r.id, r])),
    [references, style],
  );
  // How many mounted Cites name each reference, so a reference whose last Cite is removed drops out
  const [counts, setCounts] = useState<Map<string, number>>(() => new Map());
  // Numeric style numbers references in order of first citation, read from the document itself: each Cite leaves
  // a marker, and the markers are taken in DOM order. Registration order can't be trusted, as a Cite added
  // during live editing registers last wherever it sits
  const [cited, setCited] = useState<string[]>([]);
  useLayoutEffect(() => {
    const order = new Set<string>();
    document.querySelectorAll('[data-cite]').forEach(el =>
      el.getAttribute('data-cite')!.split('|').forEach(id => { if (counts.has(id)) order.add(id); }),
    );
    const next = [...order];
    setCited(prev => (prev.length === next.length && prev.every((id, i) => id === next[i]) ? prev : next));
  }, [counts]);
  const numberOf = useMemo(() => new Map(cited.map((id, i) => [id, i + 1])), [cited]);

  const register = useCallback((ids: string[]) => {
    setCounts(prev => {
      const next = new Map(prev);
      ids.forEach(i => next.set(i, (next.get(i) ?? 0) + 1));
      return next;
    });
    return () =>
      setCounts(prev => {
        const next = new Map(prev);
        ids.forEach(i => {
          const n = (next.get(i) ?? 0) - 1;
          if (n > 0) next.set(i, n);
          else next.delete(i);
        });
        return next;
      });
  }, []);

  return <Ctx.Provider value={{ style, references, numberOf, byId, cited, register }}>{children}</Ctx.Provider>;
}

function usePaper(): PaperCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('Cite and Bibliography must be rendered inside a paper');
  return ctx;
}

/**
 * Author-year citation.
 *   <Cite id="reijers2003" />                ->  (Reijers et al., 2003)
 *   <Cite id="reijers2003" page="229" />     ->  (Reijers et al., 2003, p. 229)
 *   <Cite id={['a', 'b']} />                 ->  (A, 2001; B, 2010)
 *   <Cite id="reijers2003" narrative />      ->  Reijers et al. (2003)
 * With citationStyle 'numeric' the same calls give [3], [1, 3-5], [3, p. 229] and "Reijers et al. [3]".
 * `id` is the citation key of the item in the references list.
 */
export function Cite({ id, page, narrative }: { id: string | string[]; page?: string; narrative?: boolean }) {
  const { byId, register, style, numberOf } = usePaper();
  const ids = Array.isArray(id) ? id : [id];
  const items = ids.map(i => byId.get(i));
  const found = ids.filter((_, n) => items[n]);
  const key = found.join('|');

  // A layout effect, so the numbers are in place before the first paint
  useLayoutEffect(() => {
    return register(found);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, register]);

  // Marks the citation's place in the document, from which the provider reads the order of first citation
  const mark = <span data-cite={key} hidden />;

  const missing = ids.filter((_, n) => !items[n]);
  if (missing.length) {
    console.warn(`Cite: unknown reference key(s): ${missing.join(', ')}`);
    return <span style={{ color: '#b91c1c' }}>(?{missing.join(', ')})</span>;
  }

  if (style === 'numeric') {
    const loc = page ? `, ${/[-–,]/.test(page) ? 'pp.' : 'p.'} ${page}` : '';
    if (narrative) {
      return (
        <>
          {mark}
          {items.map((it, n) => {
            const item = it as CslItem;
            return (
              <span key={item.id}>
                {n > 0 ? '; ' : ''}
                {shortAuthors(item)} [{numberOf.get(item.id)}{n === items.length - 1 ? loc : ''}]
              </span>
            );
          })}
        </>
      );
    }
    return <>{mark}[{formatNumbers(ids.map(i => numberOf.get(i) as number))}{loc}]</>;
  }

  if (narrative) {
    return (
      <>
        {mark}
        {items.map((it, n) => {
          const item = it as CslItem;
          const loc = page && n === items.length - 1 ? `, ${/[-–,]/.test(page) ? 'pp.' : 'p.'} ${page}` : '';
          return (
            <span key={item.id}>
              {n > 0 ? '; ' : ''}
              {shortAuthors(item)} ({yearOf(item)}{loc})
            </span>
          );
        })}
      </>
    );
  }

  return (
    <>
      {mark}(
      {items.map((it, n) => {
        const item = it as CslItem;
        return (
          <span key={item.id}>
            {n > 0 ? '; ' : ''}
            {inlineCitation(item, n === items.length - 1 ? page : undefined)}
          </span>
        );
      })}
      )
    </>
  );
}

/** Lists every reference cited in the paper: alphabetically, or in order of first citation in numeric style.
    Renders nothing if none are cited. */
export function Bibliography({ title = 'References' }: { title?: string | null }) {
  const { byId, cited, style, numberOf } = usePaper();

  if (style === 'numeric') {
    const items = cited.map(i => byId.get(i)).filter((i): i is CslItem => !!i);
    if (!items.length) return null;
    return (
      <section className="paper-bibliography">
        {title && <h2>{title}</h2>}
        {items.map(item => (
          <p key={item.id} className="paper-bib-entry paper-bib-numbered">
            <span className="paper-bib-num">[{numberOf.get(item.id)}]</span>
            <span>
              <BibEntry item={item} />
            </span>
          </p>
        ))}
      </section>
    );
  }

  const items = cited
    .map(i => byId.get(i))
    .filter((i): i is CslItem => !!i)
    .sort((a, b) => sortKey(a).localeCompare(sortKey(b)));

  if (!items.length) return null;

  return (
    <section className="paper-bibliography">
      {title && <h2>{title}</h2>}
      {items.map(item => (
        <p key={item.id} className="paper-bib-entry">
          <BibEntry item={item} />
        </p>
      ))}
    </section>
  );
}
