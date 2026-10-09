import type { ReactNode } from 'react';
import type { CslItem, CslName } from './types';

// Author-year formatting (APA-like) over CSL-JSON.

function familyName(n: CslName): string {
  return n.literal ?? n.family ?? '';
}

function initials(given?: string): string {
  if (!given) return '';
  return given
    .split(/\s+/)
    .filter(Boolean)
    .map(t => (t.includes('.') ? t.replace(/\.(?=[A-Za-z])/g, '. ') : `${t[0].toUpperCase()}.`))
    .join(' ');
}

function bibName(n: CslName): string {
  if (n.literal) return n.literal;
  const i = initials(n.given);
  return i ? `${n.family}, ${i}` : (n.family ?? '');
}

function joinNames(names: string[]): string {
  if (names.length <= 1) return names[0] ?? '';
  return `${names.slice(0, -1).join(', ')}, & ${names[names.length - 1]}`;
}

function baseYear(item: CslItem): string {
  const y = item.issued?.['date-parts']?.[0]?.[0];
  if (y !== undefined) return String(y);
  const raw = item.issued?.literal ?? item.issued?.raw;
  const m = raw?.match(/\d{4}/);
  return m ? m[0] : 'n.d.';
}

/** Year plus an a/b/c suffix when the same authors have several works in one year. */
export function yearOf(item: CslItem): string {
  return baseYear(item) + (typeof item._suffix === 'string' ? item._suffix : '');
}

/**
 * Returns copies of the items with a suffix (a, b, ...) wherever authors and year collide,
 * ordered by title. Computed over the whole library so the suffix is stable across papers.
 */
export function withYearSuffixes(items: CslItem[]): CslItem[] {
  const groups = new Map<string, CslItem[]>();
  for (const it of items) {
    const who = (it.author ?? it.editor ?? []).map(n => n.literal ?? `${n.family},${n.given}`).join(';');
    const key = `${who}|${baseYear(it)}`;
    groups.set(key, [...(groups.get(key) ?? []), it]);
  }
  const suffix = new Map<string, string>();
  for (const group of groups.values()) {
    if (group.length < 2) continue;
    [...group]
      .sort((a, b) => (a.title ?? '').toLowerCase().localeCompare((b.title ?? '').toLowerCase()))
      .forEach((it, n) => suffix.set(it.id, String.fromCharCode(97 + n)));
  }
  return items.map(it => (suffix.has(it.id) ? { ...it, _suffix: suffix.get(it.id) } : it));
}

/** "Reijers", "Wolff & Resnick", "Murphy et al." Falls back to the short title. */
export function shortAuthors(item: CslItem): string {
  const people = item.author?.length ? item.author : item.editor;
  if (!people?.length) return item['title-short'] ?? item.title ?? item.id;
  if (people.length === 1) return familyName(people[0]);
  if (people.length === 2) return `${familyName(people[0])} & ${familyName(people[1])}`;
  return `${familyName(people[0])} et al.`;
}

/** Inline citation text, without surrounding parentheses. */
export function inlineCitation(item: CslItem, page?: string): string {
  const loc = page ? `, ${/[-–,]/.test(page) ? 'pp.' : 'p.'} ${page}` : '';
  return `${shortAuthors(item)}, ${yearOf(item)}${loc}`;
}

export function sortKey(item: CslItem): string {
  const first = item.author?.[0] ?? item.editor?.[0];
  const who = first ? familyName(first) : (item.title ?? item.id);
  return `${who.toLowerCase()} ${yearOf(item)} ${(item.title ?? '').toLowerCase()}`;
}

/** [1, 3-5, 9]: sorted, with runs of three or more collapsed to a range. */
export function formatNumbers(nums: number[]): string {
  const sorted = [...new Set(nums)].sort((a, b) => a - b);
  const parts: string[] = [];
  for (let i = 0; i < sorted.length; ) {
    let j = i;
    while (j + 1 < sorted.length && sorted[j + 1] === sorted[j] + 1) j++;
    parts.push(j - i >= 2 ? `${sorted[i]}-${sorted[j]}` : sorted.slice(i, j + 1).join(', '));
    i = j + 1;
  }
  return parts.join(', ');
}

function Ital({ children }: { children: ReactNode }) {
  return <em>{children}</em>;
}

function withStop(s: string): string {
  return /[.?!]$/.test(s) ? s : `${s}.`;
}

/** Full bibliography entry. */
export function BibEntry({ item }: { item: CslItem }) {
  const people = item.author?.length ? item.author : item.editor;
  const who = people?.length ? joinNames(people.map(bibName)) : '';
  const lead = who ? `${withStop(who)} ` : '';
  const year = `(${yearOf(item)}). `;
  const title = item.title ?? '';
  const link = item.DOI ? `https://doi.org/${item.DOI}` : item.URL;
  const linkNode = link ? <> <a href={link}>{link}</a></> : null;

  if (item.type === 'article-journal' || item.type === 'article-magazine' || item.type === 'article-newspaper') {
    const vol = item.volume !== undefined ? <>, <Ital>{item.volume}</Ital></> : null;
    const iss = item.issue !== undefined ? `(${item.issue})` : '';
    const pages = item.page ? `, ${item.page}` : '';
    return (
      <>
        {lead}{year}{withStop(title)} <Ital>{item['container-title']}</Ital>{vol}{iss}{pages}.{linkNode}
      </>
    );
  }

  if (item.type === 'paper-conference') {
    const vol = item.volume !== undefined ? `Vol. ${item.volume}` : '';
    const pp = item.page ? `pp. ${item.page}` : '';
    const loc = [vol, pp].filter(Boolean).join(', ');
    return (
      <>
        {lead}{year}{withStop(title)} In <Ital>{item['container-title']}</Ital>{loc ? ` (${loc})` : ''}.{linkNode}
      </>
    );
  }

  if (item.type === 'chapter') {
    const eds = item.editor?.length
      ? `In ${joinNames(item.editor.map(e => (e.literal ?? `${initials(e.given)} ${e.family}`)))} (${item.editor.length > 1 ? 'Eds.' : 'Ed.'}), `
      : 'In ';
    const pages = item.page ? ` (pp. ${item.page})` : '';
    return (
      <>
        {lead}{year}{withStop(title)} {eds}<Ital>{item['container-title']}</Ital>{pages}.
        {item.publisher ? ` ${withStop(item.publisher)}` : ''}{linkNode}
      </>
    );
  }

  if (item.type === 'thesis') {
    const bracket = [item.genre, item.publisher].filter(Boolean).join(', ');
    return (
      <>
        {lead}{year}<Ital>{title}</Ital>{bracket ? ` [${bracket}]` : ''}.{linkNode}
      </>
    );
  }

  if (item.type === 'report') {
    const num = [item.genre, item.number].filter(Boolean).join(' ');
    return (
      <>
        {lead}{year}<Ital>{title}</Ital>{num ? ` (${num})` : ''}.
        {item.publisher ? ` ${withStop(item.publisher)}` : ''}{linkNode}
      </>
    );
  }

  if (item.type === 'book') {
    const ed = item.edition ? ` (${item.edition} ed.)` : '';
    return (
      <>
        {lead}{year}<Ital>{title}</Ital>{ed}.
        {item.publisher ? ` ${withStop(item.publisher)}` : ''}{linkNode}
      </>
    );
  }

  return (
    <>
      {lead}{year}{withStop(title)}
      {item['container-title'] ? <> <Ital>{withStop(item['container-title'])}</Ital></> : null}
      {item.publisher ? ` ${withStop(item.publisher)}` : ''}{linkNode}
    </>
  );
}
