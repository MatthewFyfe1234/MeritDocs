import { SlideLayout } from '@/components/slides/SlideLayout';

export function ValueStackSlide() {
  const vW = 660; const vH = 262;

  const layers = [
    {
      label:  'Hardware + IoT Connection',
      tag:    'Entry point',
      body:   'The manufacturer ships the tool with telemetry and onboards the operator to Merit. The process layer activates. This is the door.',
      accent: false,
      h:      38,
    },
    {
      label:  'Predictive Maintenance',
      tag:    'First return',
      body:   'Usage patterns detected before failure. Planned maintenance replaces emergency repair. The cost difference is 3-9x per intervention.',
      accent: false,
      h:      38,
    },
    {
      label:  'Process Licensing',
      tag:    'Recurring revenue',
      body:   'Every operator running the process pays a subscription. The manufacturer\'s IP - their process knowledge - generates income per job, not per unit shipped.',
      accent: false,
      h:      38,
    },
    {
      label:  'Data Monetisation',
      tag:    'Ecosystem value',
      body:   'Insurers, regulators, and data partners pay for access to aggregated, anonymised field performance. The dataset earns independently of hardware sales.',
      accent: false,
      h:      38,
    },
    {
      label:  'Sector Administration',
      tag:    'Category ownership',
      body:   'The manufacturer administers the process standard for their sector. They credential operators, set benchmarks, coordinate the ecosystem. This is not a product. It is infrastructure.',
      accent: true,
      h:      44,
    },
  ];

  const stackX = 14; const stackW = 280;
  const stackGap = 6;
  const totalH = layers.reduce((s, l) => s + l.h, 0) + stackGap * (layers.length - 1);
  const stackY0 = (vH - totalH) / 2;

  const layerY = (i: number) => stackY0 + layers.slice(0, i).reduce((s, l) => s + l.h + stackGap, 0);

  const divX = stackX + stackW + 20;
  const rx = divX + 12;
  const rw = vW - rx - 12;

  // Right side detail rows - map to each layer
  const details = layers.map((l, i) => ({
    ...l,
    y: layerY(i),
  }));

  return (
    <SlideLayout
      title="The Manufacturer Value Stack"
      subtitle="Each layer builds on the one below it. The first connection funds the next. The top layer is unreachable by any competitor who hasn't climbed all the others."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox={`0 0 ${vW} ${vH}`} style={{ width: '100%', height: '100%' }}>
          <defs>
            <marker id="arr-vs" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto" markerUnits="userSpaceOnUse">
              <polygon points="0 0, 8 3, 0 6" fill="var(--slide-primary)" opacity="0.45" />
            </marker>
          </defs>

          {/* ── STACK LAYERS ── */}
          {layers.map(({ label, tag, accent, h }, i) => {
            const y = layerY(i);
            const cx = stackX + stackW / 2;
            const isTop = i === layers.length - 1;
            const indentL = (layers.length - 1 - i) * 6;
            const lx = stackX + indentL;
            const lw = stackW - indentL * 2;
            return (
              <g key={label}>
                <rect x={lx} y={y} width={lw} height={h} rx="6"
                  fill={accent ? 'var(--slide-bg-accent-muted)' : 'var(--slide-bg-primary-muted)'}
                  stroke={accent ? 'var(--slide-accent)' : 'var(--slide-border-primary)'}
                  strokeWidth={accent ? 2 : 1.3} />
                <text x={cx} y={y + (isTop ? 16 : 14)} textAnchor="middle"
                  fontSize={accent ? 10 : 9} fontWeight="700"
                  fill={accent ? 'var(--slide-accent)' : 'var(--slide-primary)'}>{label}</text>
                <text x={cx} y={y + (isTop ? 30 : 26)} textAnchor="middle" fontSize="7"
                  fill={accent ? 'var(--slide-accent)' : 'var(--slide-text)'}
                  opacity={accent ? 0.65 : 0.4}>{tag}</text>
              </g>
            );
          })}

          {/* ── DIVIDER ── */}
          <line x1={divX} y1={8} x2={divX} y2={vH - 8}
            stroke="var(--slide-border-primary)" strokeWidth="1" opacity="0.2" />

          {/* ── RIGHT SIDE DESCRIPTIONS ── */}
          {details.map(({ label, body, accent, y, h }) => {
            const connY = y + h / 2;
            return (
              <g key={`det-${label}`}>
                {/* Connector */}
                <path d={`M ${stackX + stackW + 2} ${connY} H ${divX - 2}`}
                  fill="none"
                  stroke={accent ? 'var(--slide-accent)' : 'var(--slide-primary)'}
                  strokeWidth="1" strokeDasharray="3,3" opacity="0.2" />

                <text x={rx} y={y + 12} fontSize="7" fontWeight="700"
                  fill={accent ? 'var(--slide-accent)' : 'var(--slide-primary)'}
                  opacity="0.75">{label.toUpperCase()}</text>
                <foreignObject x={rx} y={y + 14} width={rw} height={h - 12}>
                  <div
                    // @ts-ignore
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{ fontSize: '8px', lineHeight: 1.55, color: 'var(--slide-text)', opacity: 0.7 }}
                  >
                    {body}
                  </div>
                </foreignObject>
              </g>
            );
          })}

        </svg>
      </div>
    </SlideLayout>
  );
}
