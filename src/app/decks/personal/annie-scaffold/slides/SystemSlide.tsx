import { Fragment } from 'react';
import { SlideLayout } from '@/components/slides/SlideLayout';
import { infectionsIn, systemOf } from '../data';
import type { Infection, SystemId } from '../data';
import { AbxTag, AttemptedBox, BurdenPill, CommentsBox, ConsensusTag, EditFooter, StagePill, StatusPill } from '../components';

// Infection | Status · Stage | Treatment options | Burden | Key risk | Attempted?
// Each option is its own grid row so its Attempted checkbox lines up with it.
const cols = '1.2fr 0.85fr 3.7fr 1.05fr 2.4fr 0.6fr';

function Row({ inf }: { inf: Infection }) {
  const span = (col: number) => ({ gridColumn: col, gridRow: `1 / span ${inf.options.length}` });
  const straddle = inf.alsoIn?.map(id => systemOf(id).label).join(', ');
  return (
    <div className="grid gap-x-3 gap-y-[3px] py-1.5 items-start"
      style={{ gridTemplateColumns: cols, borderBottom: '1px solid var(--slide-border)' }}>
      <div style={span(1)} className="flex flex-col gap-0.5">
        <span className="text-[10.5px] font-semibold leading-tight" style={{ color: 'var(--slide-primary)' }}>{inf.name}</span>
        {inf.flag && (
          <span className="text-[8px] font-bold leading-tight" style={{ color: 'var(--slide-accent)' }}>★ {inf.flag}</span>
        )}
        {straddle && (
          <span className="text-[8px] italic leading-tight" style={{ color: 'var(--slide-text-muted)' }}>also in {straddle}</span>
        )}
      </div>
      <div style={span(2)} className="flex flex-col items-start gap-1">
        <StatusPill inf={inf} />
        <StagePill inf={inf} />
      </div>
      {inf.options.map((opt, i) => (
        <Fragment key={i}>
          <div style={{ gridColumn: 3, gridRow: i + 1 }} className="flex items-center gap-1 text-[9.5px] leading-snug">
            <AbxTag abx={opt.abx} />
            <ConsensusTag consensus={opt.consensus} />
            <span className="ml-0.5" style={{ color: 'var(--slide-text)' }}>{opt.label}</span>
          </div>
          <div style={{ gridColumn: 6, gridRow: i + 1 }} className="flex justify-center items-center h-full">
            <AttemptedBox inf={inf} i={i} />
          </div>
        </Fragment>
      ))}
      <div style={span(4)}><BurdenPill burden={inf.burden} /></div>
      <div style={{ ...span(5), color: 'var(--slide-text)' }} className="text-[9px] leading-snug">{inf.risk}</div>
    </div>
  );
}

export function SystemSlide({ system, ids, part }: { system: SystemId; ids?: string[]; part?: string }) {
  const sys = systemOf(system);
  const rows = infectionsIn(system).filter(i => !ids || ids.includes(i.id));
  return (
    <SlideLayout title={part ? `${sys.label} (${part})` : sys.label} subtitle={sys.cascade}>
      <div className="flex-1 min-h-0 flex flex-col gap-2">
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
          <div className="grid gap-x-3 pb-1 text-[8.5px] font-bold uppercase tracking-wider shrink-0"
            style={{ gridTemplateColumns: cols, color: 'var(--slide-primary)', borderBottom: '2px solid var(--slide-border-primary)' }}>
            <span>Infection</span>
            <span>Status · Stage</span>
            <span>Treatment options</span>
            <span>Antibiotic burden</span>
            <span>Key risk / note for Annie</span>
            <span className="text-center">Attempted?</span>
          </div>
          {rows.map(inf => <Row key={inf.id} inf={inf} />)}
        </div>
        <CommentsBox id={`system:${system}`} label={`${sys.label}: comments`} className="h-[64px] shrink-0" />
      </div>
      <EditFooter />
    </SlideLayout>
  );
}
