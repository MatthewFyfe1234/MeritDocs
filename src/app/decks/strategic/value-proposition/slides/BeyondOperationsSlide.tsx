import { SlideLayout } from '@/components/slides/SlideLayout';

const beats: { label: string; body: string }[] = [
  {
    label: 'Environmental Transparency',
    body: 'Material, tool, and energy properties are already recorded against each step. The same formulas that derive cost or time can derive carbon and resource impact, attributed to the exact step, supplier, or project that produced it, not estimated after the fact.',
  },
  {
    label: 'Merit-Based Recognition',
    body: "Because outcomes are attributed to the specific agent who delivered each step, an individual's or organisation's actual measured contribution becomes visible, distinct from tenure, perception, or self-report.",
  },
  {
    label: 'Incentive Alignment',
    body: 'Targets and rewards can be defined directly on the same measured quantities that determine outcomes, rather than on proxies whose relationship to the outcome is only assumed.',
  },
  {
    label: 'Future of Work',
    body: 'A person and an organisation are the same kind of agent, just at a different scale. Once contribution is measured directly, work can be coordinated and compensated across individuals and organisations, not only within a single employer’s hierarchy.',
  },
];

export function BeyondOperationsSlide() {
  return (
    <SlideLayout
      title="Ethical and Societal Strengths"
      subtitle="The same recorded execution data extends to environmental transparency, merit-based recognition, incentive alignment, and the future of work."
    >
      <div className="flex-1 min-h-0 grid grid-cols-2 grid-rows-2 gap-4">
        {beats.map(({ label, body }) => (
          <div
            key={label}
            className="rounded-lg px-5 py-4 flex flex-col gap-2"
            style={{ backgroundColor: 'var(--slide-bg-card)' }}
          >
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--slide-accent)' }}>
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
