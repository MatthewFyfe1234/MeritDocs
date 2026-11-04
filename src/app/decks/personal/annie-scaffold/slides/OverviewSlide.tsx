import type { CSSProperties } from 'react';
import { SlideLayout } from '@/components/slides/SlideLayout';
import { infectionsIn, systems } from '../data';
import type { SystemId } from '../data';
import { systemHeat, useScaffold } from '../store';
import { CaveatBanner, CommentsBox, EditFooter, HEAT, StagePill, StatusPill } from '../components';

// Node geometry in SVG units (viewBox 500 × 320)
const nodes: Record<SystemId, { cx: number; cy: number; w: number; h: number }> = {
  vector:        { cx: 65,  cy: 36,  w: 110, h: 44 },
  gut:           { cx: 190, cy: 36,  w: 110, h: 44 },
  intracellular: { cx: 315, cy: 36,  w: 110, h: 44 },
  viral:         { cx: 440, cy: 36,  w: 110, h: 44 },
  immune:        { cx: 252, cy: 156, w: 170, h: 46 },
  nervous:       { cx: 135, cy: 280, w: 140, h: 42 },
  endocrine:     { cx: 375, cy: 280, w: 140, h: 42 },
};

const sources: SystemId[] = ['vector', 'gut', 'intracellular', 'viral'];
const listOrder: SystemId[] = ['vector', 'gut', 'intracellular', 'viral', 'immune', 'endocrine', 'nervous'];

const edgeStyle = { stroke: 'var(--slide-primary)', strokeWidth: 1.4, opacity: 0.55, fill: 'none' };

function Graph() {
  const s = useScaffold();
  const hub = nodes.immune;

  return (
    <svg viewBox="0 0 500 320" className="w-full h-full">
      <defs>
        <marker id="annie-arrow" markerWidth="9" markerHeight="7" refX="9" refY="3.5" orient="auto-start-reverse" markerUnits="userSpaceOnUse">
          <polygon points="0 0, 9 3.5, 0 7" fill="var(--slide-primary)" opacity="0.7" />
        </marker>
      </defs>

      {/* Sources feed the hub; Gut is bidirectional */}
      {sources.map((id, i) => {
        const n = nodes[id];
        const tx = hub.cx + (i - 1.5) * 42;
        return (
          <line key={id} x1={n.cx} y1={n.cy + n.h / 2 + 2} x2={tx} y2={hub.cy - hub.h / 2 - 2} {...edgeStyle}
            markerEnd="url(#annie-arrow)" markerStart={id === 'gut' ? 'url(#annie-arrow)' : undefined} />
        );
      })}

      {/* Hub drives the downstream systems; endocrine drives nervous */}
      <line x1={hub.cx - 40} y1={hub.cy + hub.h / 2 + 2} x2={nodes.nervous.cx + 20} y2={nodes.nervous.cy - nodes.nervous.h / 2 - 2} {...edgeStyle} markerEnd="url(#annie-arrow)" />
      <line x1={hub.cx + 40} y1={hub.cy + hub.h / 2 + 2} x2={nodes.endocrine.cx - 20} y2={nodes.endocrine.cy - nodes.endocrine.h / 2 - 2} {...edgeStyle} markerEnd="url(#annie-arrow)" />
      <line x1={nodes.endocrine.cx - nodes.endocrine.w / 2 - 2} y1={nodes.endocrine.cy} x2={nodes.nervous.cx + nodes.nervous.w / 2 + 2} y2={nodes.nervous.cy} {...edgeStyle} markerEnd="url(#annie-arrow)" />

      {/* Straddle: Bartonella and neuroborreliosis sit in both Vector-borne and Nervous */}
      <path d={`M 22 ${nodes.vector.cy + nodes.vector.h / 2} Q 2 170 ${nodes.nervous.cx - nodes.nervous.w / 2} ${nodes.nervous.cy - 6}`}
        stroke="var(--slide-accent)" strokeWidth="1.2" strokeDasharray="4 3" fill="none" opacity="0.6" />
      <text x="16" y="168" fontSize="8.5" fontStyle="italic" fill="var(--slide-accent)" opacity="0.8">
        <tspan x="16">Bartonella,</tspan>
        <tspan x="16" dy="10">neuroborreliosis</tspan>
        <tspan x="16" dy="10">straddle both</tspan>
      </text>

      {systems.map(sys => {
        const n = nodes[sys.id];
        const { heat, ring } = systemHeat(s, sys.id);
        const ruledOut = heat === 'ruled-out';
        const c = HEAT[ruledOut ? 'grey' : heat];
        const x = n.cx - n.w / 2;
        const y = n.cy - n.h / 2;
        const count = infectionsIn(sys.id).length;
        const lineH = 12;
        const top = n.cy - ((sys.lines.length - 1) * lineH) / 2 - 3;
        return (
          <g key={sys.id} opacity={ruledOut ? 0.4 : 1}>
            {ring && (
              <rect x={x - 4} y={y - 4} width={n.w + 8} height={n.h + 8} rx="11"
                fill="none" stroke={HEAT.ring} strokeWidth="2.2" />
            )}
            <rect x={x} y={y} width={n.w} height={n.h} rx="8"
              fill={c.fill} stroke={c.stroke} strokeWidth={sys.role === 'hub' ? 2 : 1.2} />
            {sys.lines.map((line, i) => (
              <text key={i} x={n.cx} y={top + i * lineH} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={c.text}>
                {line}
              </text>
            ))}
            <text x={n.cx} y={y + n.h - 5} textAnchor="middle" fontSize="7.5" fill={c.text} opacity="0.7">
              {count} candidate{count === 1 ? '' : 's'}
            </text>
            {ruledOut && (
              <line x1={x + 6} y1={n.cy} x2={x + n.w - 6} y2={n.cy} stroke={c.stroke} strokeWidth="1.5" />
            )}
          </g>
        );
      })}
    </svg>
  );
}

function Legend() {
  const swatch = (fill: string, stroke: string, extra?: CSSProperties) => (
    <span className="inline-block w-3 h-2.5 rounded-sm" style={{ backgroundColor: fill, border: `1px solid ${stroke}`, ...extra }} />
  );
  const items = [
    { el: swatch(HEAT.grey.fill, HEAT.grey.stroke), label: 'all suspected / untested' },
    { el: swatch(HEAT.amber.fill, HEAT.amber.stroke), label: 'confirmed, outstanding' },
    { el: swatch(HEAT.green.fill, HEAT.green.stroke), label: 'all resolved' },
    { el: swatch(HEAT.green.fill, HEAT.green.stroke, { outline: `2px solid ${HEAT.ring}`, outlineOffset: 1 }), label: 'recurred' },
    { el: swatch(HEAT.grey.fill, HEAT.grey.stroke, { opacity: 0.4 }), label: 'ruled out' },
  ];
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1 text-[8.5px] shrink-0" style={{ color: 'var(--slide-text)' }}>
      {items.map(it => (
        <span key={it.label} className="inline-flex items-center gap-1">{it.el}{it.label}</span>
      ))}
    </div>
  );
}

export function OverviewSlide() {
  return (
    <SlideLayout
      title="System Map and Status"
      subtitle="Arrows: dysfunction in A drives or worsens B. Node colour shows the worst outstanding status among that system's infections."
      headerContent={<div className="mt-2"><CaveatBanner /></div>}
    >
      <div className="flex-1 min-h-0 flex gap-5">
        {/* Left: dependency graph + global notes */}
        <div className="w-[44%] flex flex-col gap-2 min-h-0">
          <div className="flex-1 min-h-0"><Graph /></div>
          <Legend />
          <CommentsBox id="strategy" label="Strategy notes / comments" className="h-[88px] shrink-0" />
        </div>

        {/* Right: every candidate infection, grouped by system */}
        <div className="flex-1 min-h-0 flex flex-col">
          <p className="text-[10px] font-semibold mb-1.5 shrink-0" style={{ color: '#b45309' }}>
            Set status/stage from Annie's actual test results before using.
          </p>
          <div className="columns-2 gap-4 flex-1 min-h-0">
            {listOrder.map(id => {
              const sys = systems.find(s => s.id === id)!;
              return (
                <div key={id} className="break-inside-avoid mb-2">
                  <div className="text-[9px] font-bold uppercase tracking-wider pb-0.5 mb-0.5"
                    style={{ color: 'var(--slide-primary)', borderBottom: '1px solid var(--slide-border-primary)' }}>
                    {sys.label}
                  </div>
                  {infectionsIn(id).map(inf => (
                    <div key={inf.id} className="flex items-center gap-1 py-[1.5px]">
                      <span className="flex-1 truncate text-[10px]" style={{ color: 'var(--slide-text)' }}>{inf.name}</span>
                      <StatusPill inf={inf} />
                      <StagePill inf={inf} />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <EditFooter />
    </SlideLayout>
  );
}
