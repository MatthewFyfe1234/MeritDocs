import { SlideLayout } from '@/components/slides/SlideLayout';

const rows = [
  {
    question: 'Where would dialogue help?',
    reducesTo: 'Proximity in the process',
    body: 'Holdings that contribute to adjacent or overlapping steps. Who should be talking to whom is derived from the graph, not guessed from an org chart.',
  },
  {
    question: 'Where to expand?',
    reducesTo: 'Concentration in the process',
    body: 'Wherever inputs cluster — dependency, repeated demand — is somewhere a holding could extend into. A topological property of the graph, not a hunch.',
  },
  {
    question: 'Where to innovate?',
    reducesTo: 'Pathology in the execution data',
    body: 'Bottlenecks, failure modes, cost concentrations, adverse labour-cost trends. Innovation potential is where the measured process hurts.',
  },
  {
    question: 'What will the industry look like in 5–10 years?',
    reducesTo: 'Trajectory in the execution data',
    body: 'The same accumulated data, tracked over time rather than read as a snapshot, shows where costs, durations, and risks are heading before they become critical.',
  },
];

export function ConglomerateProblemSlide() {
  return (
    <SlideLayout
      title="The Classic Conglomerate Problem"
      subtitle="A group of 30+ holdings, mostly suppliers of generic inputs and some services to construction, each knows only its own operation — leaving the parent no basis for growth, innovation, coordination, or foresight beyond intuition and org charts."
    >
      <div className="flex-1 min-h-0 flex flex-col justify-center gap-6">
        <div className="flex flex-col gap-4">
          {rows.map(({ question, reducesTo, body }) => (
            <div
              key={question}
              className="grid grid-cols-[240px_240px_1fr] gap-x-6 items-center rounded-lg px-5 py-5"
              style={{ backgroundColor: 'var(--slide-bg-card)' }}
            >
              <span className="text-base font-bold" style={{ color: 'var(--slide-text)' }}>
                {question}
              </span>
              <span className="text-sm font-bold uppercase tracking-wide" style={{ color: 'var(--slide-accent)' }}>
                {reducesTo}
              </span>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.7 }}>
                {body}
              </p>
            </div>
          ))}
        </div>

        <p className="text-base leading-relaxed text-center" style={{ color: 'var(--slide-accent)' }}>
          All four are "where" questions — answerable only because there's one shared process to ask "where" within.
          Two are answered by its shape. Two are answered by what's recorded against that shape.
        </p>
      </div>
    </SlideLayout>
  );
}
