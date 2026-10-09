import { SlideLayout } from '@/components/slides/SlideLayout';

const conflicts = [
  {
    pair: 'Insurer vs. Company',
    over: 'risk pricing',
    body: 'Because neither side can observe how work actually gets done, only what gets claimed about it.',
  },
  {
    pair: 'Worker vs. Employer',
    over: 'effort',
    body: 'Because output is easy to see and effort is not, so pay ends up negotiated on trust rather than measured on contribution.',
  },
  {
    pair: 'Trainer vs. Trainee',
    over: 'credit for improvement',
    body: 'Because when both act on the same outcome, nobody can cleanly say whose contribution moved it.',
  },
];

export function WhyLieSlide() {
  return (
    <SlideLayout
      title="Why the Game Gets Played"
      subtitle="A payoff depends on what others believe, not on the verifiable fact. Wherever the fact can't be checked, misrepresenting it can pay."
    >
      <div className="flex-1 min-h-0 flex flex-col justify-center gap-3">
        {conflicts.map(({ pair, over, body }) => (
          <div
            key={pair}
            className="grid grid-cols-[220px_1fr] gap-x-5 items-center rounded-lg px-5 py-4"
            style={{ backgroundColor: 'var(--slide-bg-card)' }}
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-bold" style={{ color: 'var(--slide-text)' }}>
                {pair}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--slide-accent)' }}>
                over {over}
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.75 }}>
              {body}
            </p>
          </div>
        ))}

        <p className="text-sm leading-relaxed text-center mt-1" style={{ color: 'var(--slide-accent)' }}>
          Not one of these is a story about bad actors. Each is a story about a fact that was too expensive to check.
        </p>
      </div>
    </SlideLayout>
  );
}
