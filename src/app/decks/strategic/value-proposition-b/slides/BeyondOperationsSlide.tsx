import { SlideLayout } from '@/components/slides/SlideLayout';

const beats: { label: string; headline: string; body: string }[] = [
  {
    label: 'Environmental Transparency',
    headline: 'Suppliers and projects judged on real impact, not claims.',
    body: 'Material, tool, and energy properties are already recorded against each step. The same formulas that derive cost or time can derive carbon and resource impact, attributed to the exact step, supplier, or project that produced it, not estimated after the fact.',
  },
  {
    label: 'Merit-Based Recognition',
    headline: "Recognised, and rewarded, for what's actually delivered.",
    body: "Because outcomes are attributed to the specific agent who delivered each step, an individual's or organisation's actual measured contribution becomes visible, distinct from tenure, perception, or self-report.",
  },
  {
    label: 'Stakeholder Alignment',
    headline: "Fewer disputes: no one is arguing from a different picture.",
    body: "Every party works from the same measured record, not their own account of it: the customer, third parties affected by their choices (a neighbour, when a house gains another floor), the company, and its employees. Transparency is what aligns their otherwise separate concerns.",
  },
  {
    label: 'Future of Work',
    headline: 'Fair pay, wherever the work happens.',
    body: "A person and an organisation are the same kind of agent, just at a different scale. Once contribution is measured directly, work can be coordinated and compensated across individuals and organisations, not only within a single employer's hierarchy.",
  },
  {
    label: 'Self-Governance',
    headline: 'Trust, without needing a regulator to enforce it.',
    body: 'Monitoring and graduated sanctions emerge from the measured record itself, so the process governs itself internally, rather than needing external authority imposed on it to prevent regression or gaming.',
  },
  {
    label: 'Employee Monitoring',
    headline: 'The record is the worker\'s too, and leaves with them.',
    body: 'Workplace monitoring normally produces a record the employer owns and the worker never sees. Here it is jointly owned: a verified track record the worker carries with them, independent of any single employer.',
  },
];

export function BeyondOperationsSlide() {
  return (
    <SlideLayout
      title="Ethical and Societal Implications"
      subtitle="The same recorded execution data extends to environmental transparency, merit-based recognition, stakeholder alignment, the future of work, self-governance, and employee monitoring."
    >
      <div className="flex-1 min-h-0 grid grid-cols-3 grid-rows-2 gap-4">
        {beats.map(({ label, headline, body }) => (
          <div
            key={label}
            className="rounded-lg px-5 py-4 flex flex-col gap-2"
            style={{ backgroundColor: 'var(--slide-bg-card)' }}
          >
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--slide-accent)' }}>
              {label}
            </span>
            <p className="text-sm font-bold leading-snug" style={{ color: 'var(--slide-text)' }}>
              {headline}
            </p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.75 }}>
              {body}
            </p>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}
