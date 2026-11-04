import type { CSSProperties, ReactNode } from 'react';
import { STAGES, STATUSES } from './data';
import type { Burden, BurdenRange, Consensus, Infection, Stage, Status } from './data';
import { attemptedOf, setComment, setStage, setStatus, stageOf, statusOf, toggleAttempted, useScaffold } from './store';

export const HEAT = {
  grey:  { fill: '#eef0f2', stroke: '#9ca3af', text: '#4b5563' },
  amber: { fill: '#fdecc8', stroke: '#d97706', text: '#92400e' },
  green: { fill: '#dcf2e3', stroke: '#16a34a', text: '#166534' },
  ring:  '#d97706',
};

const STATUS_STYLE: Record<Status, { bg: string; fg: string; strike?: boolean }> = {
  'suspected': { bg: '#eef0f2', fg: '#4b5563' },
  'confirmed': { bg: '#fdecc8', fg: '#92400e' },
  'ruled out': { bg: 'transparent', fg: '#9ca3af', strike: true },
};

const STAGE_STYLE: Record<Stage, { bg: string; fg: string }> = {
  untreated: { bg: '#ffffff', fg: '#6b7280' },
  treating:  { bg: '#e0ecfb', fg: '#1d4ed8' },
  resolved:  { bg: '#dcf2e3', fg: '#166534' },
  recurred:  { bg: '#fde2d8', fg: '#b4441c' },
};

export const BURDEN_STYLE: Record<Burden, { bg: string; fg: string }> = {
  none:     { bg: '#dcf2e3', fg: '#166534' },
  low:      { bg: '#e2f3f1', fg: '#0f766e' },
  moderate: { bg: '#fdecc8', fg: '#92400e' },
  high:     { bg: '#fbd5d5', fg: '#b91c1c' },
};

const pillBase = 'inline-flex items-center rounded-full font-semibold whitespace-nowrap leading-none';

function PillSelect<T extends string>({ value, options, onChange, style }: {
  value: T;
  options: T[];
  onChange: (v: T) => void;
  style: CSSProperties;
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value as T)}
      className={`${pillBase} appearance-none text-[9px] px-1.5 py-[3px] cursor-pointer outline-none text-center`}
      style={style}
    >
      {options.map(o => <option key={o} value={o} style={{ color: '#252525', backgroundColor: '#fff', textDecoration: 'none' }}>{o}</option>)}
    </select>
  );
}

export function StatusPill({ inf }: { inf: Infection }) {
  const s = useScaffold();
  const status = statusOf(s, inf);
  const st = STATUS_STYLE[status];
  return (
    <PillSelect value={status} options={STATUSES} onChange={v => setStatus(inf, v)}
      style={{ backgroundColor: st.bg, color: st.fg, border: `1px solid ${st.fg}40`, textDecoration: st.strike ? 'line-through' : undefined }} />
  );
}

export function StagePill({ inf }: { inf: Infection }) {
  const s = useScaffold();
  const stage = stageOf(s, inf);
  const st = STAGE_STYLE[stage];
  return (
    <PillSelect value={stage} options={STAGES} onChange={v => setStage(inf, v)}
      style={{ backgroundColor: st.bg, color: st.fg, border: `1px dashed ${st.fg}80` }} />
  );
}

export function BurdenPill({ burden }: { burden: BurdenRange }) {
  const levels = burden.to ? [burden.from, burden.to] : [burden.from];
  return (
    <span className="inline-flex flex-col items-start gap-0.5">
      <span className="inline-flex items-center gap-0.5">
        {levels.map((b, i) => (
          <span key={i} className="inline-flex items-center gap-0.5">
            {i > 0 && <span className="text-[9px]" style={{ color: 'var(--slide-text-muted)' }}>→</span>}
            <span className={`${pillBase} text-[9px] px-1.5 py-[3px] uppercase tracking-wide`}
              style={{ backgroundColor: BURDEN_STYLE[b].bg, color: BURDEN_STYLE[b].fg }}>
              {b}
            </span>
          </span>
        ))}
      </span>
      {burden.note && <span className="text-[8px] italic" style={{ color: 'var(--slide-text-muted)' }}>{burden.note}</span>}
    </span>
  );
}

const tagBase = 'inline-flex items-center justify-center rounded-sm font-bold leading-none shrink-0 text-[7.5px] py-[2px]';

export function AbxTag({ abx }: { abx: boolean }) {
  return abx
    ? <span className={`${tagBase} w-[34px]`} style={{ backgroundColor: '#fbd5d5', color: '#b91c1c' }}>abx</span>
    : <span className={`${tagBase} w-[34px]`} style={{ backgroundColor: '#dcf2e3', color: '#166534' }}>non-abx</span>;
}

export function ConsensusTag({ consensus }: { consensus: Consensus }) {
  return consensus === 'guideline'
    ? <span className={`${tagBase} w-[46px]`} style={{ backgroundColor: 'var(--slide-primary)', color: '#fff' }}>guideline</span>
    : <span className={`${tagBase} w-[46px]`} style={{ border: '1px dashed var(--slide-accent)', color: 'var(--slide-accent)' }}>contested</span>;
}

export function AttemptedBox({ inf, i }: { inf: Infection; i: number }) {
  const s = useScaffold();
  return (
    <input type="checkbox" checked={attemptedOf(s, inf, i)} onChange={() => toggleAttempted(inf, i)}
      className="w-3 h-3 cursor-pointer" style={{ accentColor: 'var(--slide-primary)' }} />
  );
}

export function CaveatBanner() {
  return (
    <div className="rounded-md px-3 py-1.5 text-[10px] leading-snug"
      style={{ backgroundColor: '#fff7e6', border: '1px solid #f3c77a', color: '#7c4a03' }}>
      <strong>Working scaffold for discussion with Annie's clinician, not a treatment plan.</strong>{' '}
      Status fields to be set from actual test results. Dosing and sequencing require medical oversight.
    </div>
  );
}

export function CommentsBox({ id, label, className = '' }: { id: string; label: string; className?: string }) {
  const s = useScaffold();
  return (
    <div className={`rounded-md flex flex-col min-h-0 ${className}`}
      style={{ backgroundColor: 'var(--slide-bg-muted)', border: '1px dashed var(--slide-border-primary)' }}>
      <span className="text-[9px] font-semibold uppercase tracking-widest px-2 pt-1.5 shrink-0"
        style={{ color: 'var(--slide-primary)', opacity: 0.8 }}>
        {label}
      </span>
      <textarea
        value={s.comments[id] ?? ''}
        onChange={e => setComment(id, e.target.value)}
        placeholder="Type here…"
        className="flex-1 min-h-0 resize-none bg-transparent px-2 py-1 text-[10px] leading-snug outline-none"
        style={{ color: 'var(--slide-text)' }}
      />
    </div>
  );
}

export function EditFooter({ children }: { children?: ReactNode }) {
  return (
    <p className="text-[8.5px] mt-1.5 shrink-0" style={{ color: 'var(--slide-text-muted)' }}>
      {children}
      Status and stage pills are dropdowns; they and the checkboxes save in this browser only. To make a value permanent, set it in data.ts.
    </p>
  );
}
