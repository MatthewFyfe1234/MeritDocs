import { SlideLayout } from '@/components/slides/SlideLayout';
import { ArrowDefs, EdgeLabel, Formulas, PlainReading, ProductEdge, StepNode, SymbolKey, it } from '../parts';

export function PositionSlide() {
  return (
    <SlideLayout
      title="Position"
      subtitle="A value accumulates through the graph: extend along each product, merge where products meet at a step."
    >
      <div className="flex-1 min-h-0 flex flex-col gap-6" style={{ paddingTop: 8 }}>
        <div className="shrink-0" style={{ maxWidth: 1180 }}>
          <Formulas
            rows={[
              { label: "product (one source)", tex: "X(p) = X(\\mathrm{src}\\,p)\\;\\otimes\\;m(p)", num: 6 },
              { label: "step (many incoming)", tex: "X(s) = \\Bigl(\\,\\bigoplus\\nolimits_{p\\,\\in\\,\\mathrm{in}(s)} X(p)\\Bigr)\\;\\otimes\\;m(s)", num: 7 },
            ]}
          />
        </div>

        <div className="flex-1 min-h-0 flex items-center justify-center">
          <svg viewBox="0 0 480 220" style={{ width: '100%', height: '100%' }}>
            <ArrowDefs id="arrow-pos" />
            <StepNode x={8} y={20} w={70} h={40} label={it('u₁')} />
            <StepNode x={8} y={90} w={70} h={40} label={it('u₂')} />
            <StepNode x={8} y={160} w={70} h={40} label={it('u₃')} />

            <ProductEdge x1={78} y1={40} x2={250} y2={100} markerId="arrow-pos" />
            <ProductEdge x1={78} y1={110} x2={250} y2={110} markerId="arrow-pos" />
            <ProductEdge x1={78} y1={180} x2={250} y2={120} markerId="arrow-pos" />

            <EdgeLabel x={150} y={58} label={<>{it('X')}({it('p')})</>} />

            <StepNode x={250} y={85} w={90} h={50} label={it('s')} />
            <text x={295} y={78} textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--slide-accent)">merge, then extend</text>

            <ProductEdge x1={340} y1={110} x2={472} y2={110} markerId="arrow-pos" />
            <EdgeLabel x={406} y={100} label={<>{it('X')}({it('s')})</>} />
          </svg>
        </div>
      </div>

      <PlainReading
        entries={[
          { expr: "\\textstyle\\bigoplus\\nolimits_{p\\,\\in\\,\\mathrm{in}(s)} X(p)", reading: 'merge the accumulated values of all products arriving at step s' },
        ]}
      />

      <SymbolKey
        entries={[
          { sym: "X(\\cdot)", def: 'value accumulated forward, up to this point' },
          { sym: "m(\\cdot)", def: 'local magnitude (slide 3)' },
          { sym: "s,\\; p,\\; u_i", def: 'a step, a product, steps feeding s' },
          { sym: "\\mathrm{src}\\,p", def: 'the step a product comes from' },
          { sym: "\\mathrm{in}(s)", def: 'products arriving at step s' },
          { sym: "\\in", def: 'is a member of' },
          { sym: "\\textstyle\\bigoplus", def: 'merge over the incoming products' },
          { sym: "\\otimes", def: 'extend, along the path' },
        ]}
      />
    </SlideLayout>
  );
}
