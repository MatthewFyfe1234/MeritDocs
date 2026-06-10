import { SlideLayout } from '@/components/slides/SlideLayout';

export function SoftwarePlusProductValueCaptureSlide() {
  const vW = 660; const vH = 340;

  const barW = 95;
  const barH = 249;
  const barTop = 43;
  const barLeft = 95;

  const segments = [
    { key: 'software',  label: 'Design software', pctLabel: 'free',  pct: 0.01 },
    { key: 'component', label: 'Your component',  pctLabel: '~5%',   pct: 0.05 },
    { key: 'materials', label: 'Materials',        pctLabel: '~26%',  pct: 0.26 },
    { key: 'tooling',   label: 'Tooling',          pctLabel: '~10%',  pct: 0.10 },
    { key: 'labour',    label: 'Labour',           pctLabel: '~33%',  pct: 0.33 },
    { key: 'coord',     label: 'Coordination',     pctLabel: '~10%',  pct: 0.10 },
    { key: 'rework',    label: 'Rework & waste',   pctLabel: '~8%',   pct: 0.08 },
    { key: 'insurance', label: 'Insurance',        pctLabel: '~7%',   pct: 0.07 },
  ];

  let cy = barTop;
  const segs = segments.map(s => {
    const h = s.pct * barH;
    const y = cy;
    cy += h;
    return { ...s, y, h, midY: y + h / 2 };
  });

  const yourProducts = ['software', 'component'];
  const influenced   = new Set(['coord', 'rework', 'materials', 'labour', 'insurance', 'tooling']);

  const softSeg      = segs.find(s => s.key === 'software')!;
  const componentSeg = segs.find(s => s.key === 'component')!;
  const bracketTop    = softSeg.y;
  const bracketBottom = componentSeg.y + componentSeg.h;
  const bracketMidY   = (bracketTop + bracketBottom) / 2;

  const annX = barLeft + barW + 22;

  const annotations = [
    {
      key:     'component',
      annY:    20,
      design:  'Your design permeates every cost category on this bar',
      process: 'Process layer: execution data closes the loop - field behaviour informs the next design revision',
      example: 'e.g. The component appearing most frequently in deviation records across all jobs is the next design iteration',
    },
    {
      key:     'materials',
      annY:    60,
      design:  'Specification determines what is ordered and in what quantity',
      process: 'Process layer: connect prescription to procurement before waste is locked in',
      example: 'e.g. If one designer\'s outputs consistently require more site correction than another\'s, the software has the data to close that gap',
    },
    {
      key:     'tooling',
      annY:    104,
      design:  'Execution data captures how tools perform against each job - cycle times, load profiles, deviation events',
      process: 'Process layer: a data partnership - operational records extend tool lifetime and sharpen the next generation of equipment',
      example: 'e.g. Usage patterns across thousands of press cycles reveal which operating conditions accelerate wear - the toolmaker ships the next model knowing',
    },
    {
      key:     'labour',
      annY:    148,
      design:  'Design scope determines crew composition and task sequence',
      process: 'Process layer: orchestrate that sequence in the field, worker by worker',
      example: 'e.g. If plate-setting adds 40 min per job across a thousand jobs, that\'s a design revision - not a training note',
    },
    {
      key:     'coord',
      annY:    192,
      design:  'Specification bridges the engineer\'s intent to the shop floor',
      process: 'Process layer: carry that specification all the way to installation',
      example: 'e.g. If shop-floor queries cluster around one design step, the specification is ambiguous - not the operator',
    },
    {
      key:     'rework',
      annY:    236,
      design:  'Design defines what correct execution looks like',
      process: 'Process layer: surface deviations as they happen, not after',
      example: 'e.g. If the same deviation recurs across multiple contractors, the design assumption is wrong - not the installer',
    },
    {
      key:     'insurance',
      annY:    278,
      design:  'Certification implies a compliance obligation on every job',
      process: 'Process layer: a verifiable record of process followed, per job executed',
      example: 'e.g. Aggregate claim data across software versions and truss types reveals which design configurations carry higher failure rates - the next version ships knowing',
    },
  ];

  return (
    <SlideLayout
      title="From the Specification to the Whole Job"
      subtitle="Your software is free. Your component is a small slice. Your design, however, permeates every cost component of the project, and it implies a process."
    >
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-3">
        <svg viewBox={`0 0 ${vW} ${vH}`} style={{ width: '100%', height: '100%' }}>

          {/* Bar segments */}
          {segs.map(({ key, y, h, midY, pctLabel }) => {
            const isYours = yourProducts.includes(key);
            const rectY = key === 'component' ? barTop : y;
            const rectH = key === 'component' ? h + (y - barTop) : h;
            return (
              <g key={key}>
                <rect x={barLeft} y={rectY} width={barW} height={rectH}
                  fill={isYours ? 'var(--slide-bg-accent-muted)' : 'var(--slide-bg-primary-muted)'}
                  fillOpacity={key === 'component' ? 0.7 : isYours ? 1 : 0.65}
                  stroke="var(--slide-bg)" strokeWidth="1" />
                {key !== 'software' && (
                  <text x={barLeft + barW / 2} y={(key === 'component' ? (barTop + y + h) / 2 - 1 : midY) + 3.5}
                    textAnchor="middle"
                    fontSize={h < 16 ? '5' : '7'}
                    fontWeight="600"
                    fill={isYours ? 'var(--slide-accent)' : 'var(--slide-text)'}
                    opacity={isYours ? 0.85 : 0.45}>
                    {pctLabel}
                  </text>
                )}
              </g>
            );
          })}

          {/* Segment dividers */}
          {segs.slice(0, -1).filter(seg => seg.key !== 'software').map(seg => (
            <line key={`div-${seg.key}`}
              x1={barLeft} y1={seg.y + seg.h}
              x2={barLeft + barW} y2={seg.y + seg.h}
              stroke="var(--slide-border-primary)" strokeWidth="1" opacity="0.6" />
          ))}

          {/* Outer border */}
          <rect x={barLeft} y={barTop} width={barW} height={barH}
            fill="none" stroke="var(--slide-border-primary)" strokeWidth="1" rx="2" />

          {/* Influence stripes */}
          {segs.map(({ key, y, h }) => {
            if (!influenced.has(key)) return null;
            return (
              <rect key={`strip-${key}`}
                x={barLeft - 5} y={y} width={5} height={h}
                fill="var(--slide-primary)" opacity="0.55" rx="1" />
            );
          })}

          {/* Segment labels (left) */}
          {segs.filter(s => !yourProducts.includes(s.key)).map(({ key, label, midY }) => (
            <text key={`lbl-${key}`}
              x={barLeft - 12} y={midY + 3.5}
              textAnchor="end" fontSize="7.5"
              fill="var(--slide-text)" opacity="0.55">
              {label}
            </text>
          ))}
          <text x={barLeft - 12} y={bracketMidY + 3.5}
            textAnchor="end" fontSize="7.5"
            fill="var(--slide-accent)" opacity="0.7">
            Your products
          </text>

          {/* Annotations - angled connectors */}
          {annotations.map(ann => {
            const seg = segs.find(s => s.key === ann.key)!;
            return (
              <g key={`ann-${ann.key}`}>
                <line x1={barLeft + barW + 5} y1={seg.midY}
                  x2={annX - 5} y2={ann.annY + 8}
                  stroke="var(--slide-border-primary)" strokeWidth="0.8" opacity="0.45" />
                <circle cx={barLeft + barW + 5} cy={seg.midY} r="1.5"
                  fill="var(--slide-primary)" opacity="0.4" />
                <text x={annX} y={ann.annY + 8}
                  fontSize="7.5" fill="var(--slide-text)" opacity="0.65">
                  {ann.design}
                </text>
                <text x={annX} y={ann.annY + 19}
                  fontSize="6.5" fontStyle="italic" fill="var(--slide-text)" opacity="0.4">
                  {ann.process}
                </text>
                <foreignObject x={annX} y={ann.annY + 22} width={vW - annX - 10} height={20}>
                  <div
                    // @ts-ignore
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{ fontSize: '6px', lineHeight: 1.45, color: 'var(--slide-text)', opacity: 0.28, fontStyle: 'italic' }}
                  >
                    {ann.example}
                  </div>
                </foreignObject>
              </g>
            );
          })}

        </svg>
        <p className="text-center" style={{ fontSize: '0.6rem', color: 'var(--slide-text)', opacity: 0.25 }}>
          Indicative, based on sector data across structural fabrication and construction operations [6][7][8].
        </p>
      </div>
    </SlideLayout>
  );
}
