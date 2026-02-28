export function ContextSlide() {
  const desires = [
    {
      title: 'To run leaner, without losing visibility or control',
      description: 'Every leadership team wants a thinner management layer. The blocker is always the same: what replaces the oversight?',
      quote: "I can't tell you anything that's missing. Stuff we used to do in the past that we're not doing today. And if we're doing it today, we're doing it actually better.",
      attribution: 'Leo Quinn, Group CEO, Balfour Beatty — Full Year 2018 Results',
    },
    {
      title: 'To know, with certainty, who and what actually performs',
      description: 'Not feel. Not reputation. Not who is most vocal in the room. Leaders want objective ground truth on people, tools and partners.',
      quote: 'A centralised source of truth helps us at a project level, but also at an executive level because we have real data with integrity to base our decisions on.',
      attribution: 'Abhilash Kunnatoor Margabandu, Vantage Data Centers — Procore, 2024',
    },
    {
      title: 'To make decisions on evidence, not expertise or politics',
      description: 'Senior leaders consistently say they want data-driven cultures. The gap is that the data has never been structured around how work actually happens.',
      quote: '58% of respondents say their companies base at least half of their regular business decisions on gut feel or experience rather than being driven by data and information.',
      attribution: 'BARC Research — Global Survey on Data-Driven Decision-Making, 2016',
    },
  ];

  return (
    <div className="w-full h-full p-8 flex flex-col">

      <div className="mb-6 shrink-0">
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--slide-primary)' }}>
          What Leaders Want
        </h2>
        <div className="w-20 h-1 mb-2" style={{ backgroundColor: 'var(--slide-accent)' }} />
        <p className="text-sm" style={{ color: 'var(--slide-text)', opacity: 0.7 }}>
          Three desires that sit at the top of almost every leadership agenda.
        </p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-3 gap-4">
        {desires.map(({ title, description, quote, attribution }) => (
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
            <div
              className="mt-auto pt-4 border-t"
              style={{ borderColor: 'var(--slide-border-primary)' }}
            >
              <p className="text-xs italic leading-relaxed mb-2" style={{ color: 'var(--slide-primary)', opacity: 0.7 }}>
                "{quote}"
              </p>
              <p className="text-xs" style={{ color: 'var(--slide-text)', opacity: 0.45 }}>
                {attribution}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
