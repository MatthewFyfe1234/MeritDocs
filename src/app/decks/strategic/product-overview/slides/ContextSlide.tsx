import { SlideLayout } from '@/components/slides/SlideLayout';

export function ContextSlide() {
  const desires = [
    {
      title: 'To run leaner, without losing visibility or control',
      description: 'Every leadership team wants a thinner management layer. The blocker is always the same: what replaces the oversight?',
    },
    {
      title: 'To know, with certainty, who and what actually performs',
      description: 'Not feel. Not reputation. Not who is most vocal in the room. Leaders want objective ground truth on people, tools and partners.',
    },
    {
      title: 'To make decisions on evidence, not expertise or politics',
      description: 'Senior leaders consistently say they want data-driven cultures. The gap is that the data has never been structured around how work actually happens.',
    },
  ];

  return (
    <SlideLayout
      title="What Leaders Want"
      subtitle="Three desires that sit at the top of almost every leadership agenda."
    >

      <div className="flex-1 min-h-0 grid grid-cols-3 gap-4">
        {desires.map(({ title, description }) => (
          <div
            key={title}
            className="flex flex-col rounded-lg p-5"
            style={{
              backgroundColor: 'var(--slide-bg-primary-muted)',
              border: '1px solid var(--slide-border-primary)',
            }}
          >
            <p className="text-sm font-semibold leading-snug mb-3" style={{ color: 'var(--slide-primary)' }}>
              {title}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.7 }}>
              {description}
            </p>
          </div>
        ))}
      </div>

    </SlideLayout>
  );
}
