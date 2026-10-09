import { SlideLayout } from '@/components/slides/SlideLayout';

const rows = [
  {
    question: 'Where would dialogue help?',
    reducesTo: 'Proximity in the process',
    answer: 'Read directly off the graph: two holdings whose steps sit adjacent, or share a boundary product, already have something to say to each other.',
  },
  {
    question: 'Where to expand?',
    reducesTo: 'Concentration in the process',
    answer: 'Visible in the same structure: wherever several jobs draw on the same generic input or converge on the same product, that concentration is the opportunity.',
  },
  {
    question: 'Where to innovate?',
    reducesTo: 'Pathology in the execution data',
    answer: 'Not a hunch either: the derived metrics — cost, delay, injury rate — surface exactly where the measured process is hurting.',
  },
  {
    question: 'What will the industry look like in 5–10 years?',
    reducesTo: 'Trajectory in the execution data',
    answer: 'The same data, read over time instead of as a snapshot: where costs, durations, and risks are trending, before they show up as a crisis.',
  },
];

export function PayoffSlide() {
  return (
    <SlideLayout
      title="The Same Four Questions, Now Answered"
      subtitle="Not by intuition, and not by an org chart — by the graph and the data it carries."
    >
      <div className="flex-1 min-h-0 flex flex-col justify-center gap-2.5">
        {rows.map(({ question, reducesTo, answer }) => (
          <div
            key={question}
            className="grid grid-cols-[220px_220px_1fr] gap-x-5 items-center rounded-lg px-4 py-3"
            style={{ backgroundColor: 'var(--slide-bg-accent-muted)', border: '1px solid var(--slide-accent)' }}
          >
            <span className="text-sm font-bold" style={{ color: 'var(--slide-text)' }}>
              {question}
            </span>
            <span className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--slide-accent)' }}>
              {reducesTo}
            </span>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.85 }}>
              {answer}
            </p>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}
