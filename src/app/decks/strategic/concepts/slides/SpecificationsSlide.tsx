import { SlideLayout } from '@/components/slides/SlideLayout';

export function SpecificationsSlide() {
  const masterSteps = [
    { full: 'Mix',     short: 'Mix'  },
    { full: 'Bake',    short: 'Bake' },
    { full: 'Cool',    short: 'Cool' },
    { full: 'Prepare', short: 'Prep' },
    { full: 'Apply',   short: 'Appl' },
    { full: 'Insert',  short: 'Ins'  },
  ];

  const componentRanges: Record<string, [number, number]> = {
    Sponge:  [0, 2],
    Icing:   [3, 4],
    Candles: [5, 5],
  };
  const allComponents = ['Sponge', 'Icing', 'Candles'];

  const specs = [
    { label: 'Candle Cake',      components: ['Sponge', 'Candles'] },
    { label: 'Iced Cake',        components: ['Sponge', 'Icing'] },
    { label: 'Iced Candle Cake', components: ['Sponge', 'Icing', 'Candles'] },
  ];

  const derivedSteps = (specComponents: string[]) =>
    masterSteps.map((_, si) =>
      specComponents.some(c => {
        const [lo, hi] = componentRanges[c];
        return si >= lo && si <= hi;
      })
    );

  const cardW = 200; const cardGap = 15;
  const cardX = (i: number) => 15 + i * (cardW + cardGap);
  const cardY = 16; const cardH = 224;

  const chipsLabelY = cardY + 42;
  const chipY = cardY + 50; const chipH = 20; const chipGap = 6;

  const dividerY = cardY + 92;
  const stepsLabelY = dividerY + 14;

  const stepBoxW = 26; const stepBoxGap = 2.4;
  const stepsRowY = dividerY + 24; const stepBoxH = 30;

  return (
    <SlideLayout
      title="A Specification Combines Components"
      subtitle="Each product picks a set of components. The steps it actually requires are the union of those components' slices of the master process."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox="0 0 660 260" style={{ width: '100%', height: '100%' }}>
          {specs.map((spec) => {
            const x = cardX(specs.indexOf(spec));
            const derived = derivedSteps(spec.components);
            let cx = x + 14;

            return (
              <g key={spec.label}>
                <rect x={x} y={cardY} width={cardW} height={cardH} rx="8"
                  fill="var(--slide-bg-card)" stroke="var(--slide-border-primary)" strokeWidth="1.5" />
                <text x={x + cardW / 2} y={cardY + 22} textAnchor="middle" fontSize="11" fontWeight="700"
                  fill="var(--slide-primary)">{spec.label}</text>

                <text x={x + 14} y={chipsLabelY} fontSize="7" fontWeight="700" letterSpacing="0.5"
                  fill="var(--slide-text)" opacity="0.4">COMPONENTS</text>

                {allComponents.map((comp) => {
                  const included = spec.components.includes(comp);
                  const w = comp.length * 5.6 + 20;
                  const chip = (
                    <g key={comp}>
                      <rect x={cx} y={chipY} width={w} height={chipH} rx="10"
                        fill={included ? 'var(--slide-bg-accent-muted)' : 'var(--slide-bg-muted)'}
                        stroke={included ? 'var(--slide-accent)' : 'var(--slide-border-primary)'}
                        strokeWidth="1" opacity={included ? 1 : 0.35} />
                      <text x={cx + w / 2} y={chipY + chipH / 2 + 3.5} textAnchor="middle"
                        fontSize="8" fontWeight="600"
                        fill={included ? 'var(--slide-accent)' : 'var(--slide-text)'}
                        opacity={included ? 0.95 : 0.4}>{comp}</text>
                    </g>
                  );
                  cx += w + chipGap;
                  return chip;
                })}

                <line x1={x + 14} y1={dividerY} x2={x + cardW - 14} y2={dividerY}
                  stroke="var(--slide-border-primary)" strokeWidth="0.8" opacity="0.4" />
                <text x={x + 14} y={stepsLabelY} fontSize="7" fontWeight="700" letterSpacing="0.5"
                  fill="var(--slide-text)" opacity="0.4">STEPS REQUIRED (DERIVED)</text>

                {masterSteps.map((step, si) => {
                  const included = derived[si];
                  const bx = x + 14 + si * (stepBoxW + stepBoxGap);
                  return (
                    <g key={step.full}>
                      <rect x={bx} y={stepsRowY} width={stepBoxW} height={stepBoxH} rx="4"
                        fill={included ? 'var(--slide-bg-accent-muted)' : 'var(--slide-bg-muted)'}
                        stroke={included ? 'var(--slide-accent)' : 'var(--slide-border-primary)'}
                        strokeWidth={included ? 1.4 : 1}
                        strokeDasharray={included ? undefined : '2,2'}
                        opacity={included ? 1 : 0.45} />
                      <text x={bx + stepBoxW / 2} y={stepsRowY + stepBoxH / 2 + 3} textAnchor="middle"
                        fontSize="6.3" fontWeight="600"
                        fill={included ? 'var(--slide-accent)' : 'var(--slide-text)'}
                        opacity={included ? 1 : 0.4}>{step.short}</text>
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>
    </SlideLayout>
  );
}
