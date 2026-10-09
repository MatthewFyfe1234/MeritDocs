import { SlideLayout } from '@/components/slides/SlideLayout';
import { ArrowDefs, EdgeLabel, ProductEdge, StepNode, SymbolKey, Tex, it } from '../parts';

export function GraphSlide() {
  return (
    <SlideLayout title="The Graph" subtitle="A directed, acyclic graph: steps are nodes, products are edges; each is a member.">
      <div className="flex-1 min-h-0 flex flex-col" style={{ paddingTop: 72 }}>
        <div
          className="flex-1 min-h-0 rounded-lg flex flex-col gap-4 px-8 py-6"
          style={{ backgroundColor: 'var(--slide-bg-muted)', border: '1px solid var(--slide-border)' }}
        >
          <div className="shrink-0 flex flex-row items-center gap-5">
            <div className="flex-1" style={{ color: 'var(--slide-text)', fontSize: '1.5rem' }}>
              <Tex>{"G = (V_s, E_{sp})"}</Tex>
            </div>
            <span className="text-sm" style={{ color: 'var(--slide-text)', opacity: 0.45 }}>(1)</span>
          </div>
          <div className="flex-1 min-h-0 flex items-center justify-center">
            <svg viewBox="0 0 420 120" style={{ width: '100%', height: '100%' }}>
              <ArrowDefs id="arrow-graph" />
              <StepNode x={10} y={35} w={90} h={50} label={it('u')} sub="step" />
              <ProductEdge x1={100} y1={60} x2={320} y2={60} markerId="arrow-graph" />
              <EdgeLabel x={210} y={46} label={<>{it('e')} = ({it('u')}, {it('v')})</>} />
              <EdgeLabel x={210} y={78} label="product" />
              <StepNode x={320} y={35} w={90} h={50} label={it('v')} sub="step" />
            </svg>
          </div>
        </div>
        <SymbolKey
          entries={[
            { sym: "G = (V_s, E_{sp})", def: 'the process network' },
            { sym: "V_s", def: 'set of steps (nodes)' },
            { sym: "E_{sp}", def: 'set of step-products (edges)' },
            { sym: "e = (u, v)", def: 'a step-product, step u to step v' },
          ]}
        />
      </div>
    </SlideLayout>
  );
}
