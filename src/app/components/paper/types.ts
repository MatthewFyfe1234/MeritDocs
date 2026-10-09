import type { ReactNode } from 'react';

/** Subset of CSL-JSON, the format Zotero exports ("CSL JSON"). Unknown fields are allowed. */
export interface CslName {
  family?: string;
  given?: string;
  /** Organisations or single-field names */
  literal?: string;
}

export interface CslDate {
  'date-parts'?: (number | string)[][];
  literal?: string;
  raw?: string;
}

export interface CslItem {
  id: string;
  type: string;
  title?: string;
  'title-short'?: string;
  author?: CslName[];
  editor?: CslName[];
  issued?: CslDate;
  'container-title'?: string;
  volume?: string | number;
  issue?: string | number;
  page?: string;
  publisher?: string;
  edition?: string | number;
  DOI?: string;
  URL?: string;
  [key: string]: unknown;
}

export interface PaperConfig {
  title: string;
  subtitle?: string;
  authors?: string[];
  /** Number h2/h3 headings (1, 1.1). The References heading stays unnumbered. */
  numbered?: boolean;
  /**
   * 'author-year' (default): (Reijers et al., 2003), list sorted alphabetically, only cited items.
   * 'numeric': [3], where the number is the item's position in `references`. The list is printed in that
   * order, in full, so put `references` in the order you want the numbers.
   */
  citationStyle?: 'author-year' | 'numeric';
  /** Free text, e.g. "September 2026" */
  date?: string;
  abstract?: string;
  /** Default: derived from the title */
  exportFilename?: string;
  /** CSL-JSON items available to <Cite>. Usually the shared library in papers/references.json. */
  references: CslItem[];
  content: ReactNode;
}
