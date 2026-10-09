import { SlideLayout } from '@/components/slides/SlideLayout';

type Ref = { who: string; what: string; where: string };

const graph: Ref[] = [
  { who: 'Kelley & Walker (1959)', what: 'Critical-Path Planning and Scheduling', where: 'Proc. Eastern Joint Computer Conf.' },
];

const semirings: Ref[] = [
  { who: 'Mohri (2002)', what: 'Semiring Frameworks and Algorithms for Shortest-Distance Problems', where: 'J. Automata, Lang. & Comb.' },
  { who: 'Baras & Theodorakopoulos (2010)', what: 'Path Problems in Networks', where: 'Morgan & Claypool' },
  { who: 'Fita Sanmartín et al. (2022)', what: 'The Algebraic Path Problem for Graph Metrics', where: 'ICML' },
];

const differentiable: Ref[] = [
  { who: 'Mensch & Blondel (2018)', what: 'Differentiable Dynamic Programming for Structured Prediction and Attention', where: 'ICML' },
  { who: 'Gould, Hartley & Campbell (2022)', what: 'Deep Declarative Networks', where: 'IEEE TPAMI' },
  { who: 'Kuck et al. (2020)', what: 'Belief Propagation Neural Networks', where: 'NeurIPS' },
  { who: 'Hashemi, Pasque, Teska & Yoshida (2025)', what: 'Tropical Attention: Neural Algorithmic Reasoning for Combinatorial Algorithms', where: 'NeurIPS' },
];

function Group({ heading, refs }: { heading: string; refs: Ref[] }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: 'var(--slide-accent)', opacity: 0.85 }}>
        {heading}
      </span>
      {refs.map((r, i) => (
        <p key={i} className="text-xs leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.8 }}>
          <span style={{ fontWeight: 600 }}>{r.who}</span>. <i>{r.what}</i>. <span style={{ opacity: 0.7 }}>{r.where}</span>.
        </p>
      ))}
    </div>
  );
}

export function ReferencesSlide() {
  return (
    <SlideLayout
      title="References"
      subtitle="The established lines this work draws on: the components it combines."
    >
      <div className="flex-1 min-h-0 flex flex-row gap-10" style={{ paddingTop: 8 }}>
        <div className="flex-1 flex flex-col gap-6">
          <Group heading="Graph and scheduling" refs={graph} />
          <Group heading="Algebraic path and multi-metric semirings" refs={semirings} />
        </div>
        <div className="flex-1 flex flex-col gap-6">
          <Group heading="Differentiable algorithms and learning" refs={differentiable} />
        </div>
      </div>
    </SlideLayout>
  );
}
