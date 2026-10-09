import { ReactNode } from 'react';
import { SlideLayout } from '@/components/slides/SlideLayout';
import { P, SymbolKey, Tex } from '../parts';

function Card({ heading, tone, cite, children }: {
  heading: ReactNode;
  tone: 'accent' | 'primary';
  cite: string;
  children: ReactNode;
}) {
  const color = tone === 'accent' ? 'var(--slide-accent)' : 'var(--slide-primary)';
  return (
    <div
      className="flex-1 min-w-0 rounded-lg px-5 py-4 flex flex-col gap-2"
      style={{ backgroundColor: 'var(--slide-bg-card)', border: '1px solid var(--slide-border)', borderTop: `3px solid ${color}` }}
    >
      <h3 className="text-base font-bold" style={{ color }}>{heading}</h3>
      <div className="flex-1">{children}</div>
      <p className="text-[11px] italic shrink-0" style={{ color: 'var(--slide-text)', opacity: 0.45 }}>{cite}</p>
    </div>
  );
}

export function PositioningSlide() {
  return (
    <SlideLayout
      title="Where This Sits"
      subtitle="Every component is established. The contribution is the combined architecture, not any one part."
    >
      <div className="flex-1 min-h-0 flex flex-col gap-5" style={{ paddingTop: 72 }}>
        <div className="flex-1 min-h-0 flex flex-row gap-4">
          <Card heading="The graph" tone="accent" cite="Kelley 1959 (CPM)">
            <P>
              A modified Activity-on-Node graph: edges are promoted to first-class <b>products</b>, not bare
              precedence links.
            </P>
          </Card>
          <Card heading="The computation" tone="primary" cite="the algebraic path problem">
            <P>
              Each metric rides the same graph with its own <Tex>{"(\\oplus, \\otimes)"}</Tex>. CPM is{' '}
              <Tex>{"(\\max, +)"}</Tex>; carbon is <Tex>{"(+, +)"}</Tex>. The same algebra as shortest path and
              belief propagation.
            </P>
          </Card>
          <Card heading="The learning" tone="accent" cite="Mensch & Blondel 2018">
            <P>
              Fit the step and product functions to the trace by differentiating through the accumulation. This is
              the forecasting leg.
            </P>
          </Card>
        </div>
        <p className="text-base font-semibold text-center shrink-0" style={{ color: 'var(--slide-accent)' }}>
          Established parts, combined: a specification-derived, trace-learned, stigmergically coordinated process graph.
        </p>
      </div>

      <SymbolKey
        entries={[
          { sym: "\\oplus,\\ \\otimes", def: 'merge, extend (per metric)' },
          { sym: "(\\max, +)", def: 'the CPM / critical-path metric' },
          { sym: "(+, +)", def: 'the carbon / cost metric' },
        ]}
      />
    </SlideLayout>
  );
}
