import { SlideLayout } from '@/components/slides/SlideLayout';

const problems: { label: string; body: string }[] = [
  {
    label: 'The Black Box Problem',
    body: 'Outcomes are computed from named, deterministic formulas over recorded data. Every result traces back to the specific step, agent, tool, or material that produced it, not to an opaque set of trained weights.',
  },
  {
    label: 'The Hallucination Problem',
    body: "A generative model can produce a plausible answer with no factual basis. This model can't: every output is computed from data that was actually recorded, not generated.",
  },
  {
    label: 'Catastrophic Forgetting',
    body: 'A network trained on new data can overwrite what it learned from old data. Here, every historic process and its data is retained, not overwritten: learning only ever adds to the record.',
  },
  {
    label: 'Continuous Learning',
    body: 'Most neural networks treat learning as a distinct phase: train once, freeze the weights, then serve. Liquid Neural Networks are a recent, narrow exception. This model never had that separation: every execution updates the record directly, as it happens.',
  },
];

export function NeuralNetworkProblemsSlide() {
  return (
    <SlideLayout
      title="Problems Neural Networks Don't Solve, In This Domain"
      subtitle="Not a general critique of AI: within production estimation and coordination, these are among its most persistent open problems."
    >
      <div className="flex-1 min-h-0 grid grid-cols-2 grid-rows-2 gap-4">
        {problems.map(({ label, body }) => (
          <div
            key={label}
            className="rounded-lg px-5 py-4 flex flex-col gap-2"
            style={{ backgroundColor: 'var(--slide-bg-card)' }}
          >
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--slide-accent)' }}>
              {label}
            </span>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.85 }}>
              {body}
            </p>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}
