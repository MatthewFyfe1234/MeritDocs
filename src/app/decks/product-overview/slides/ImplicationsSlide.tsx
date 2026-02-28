export function ImplicationsSlide() {
  const concepts = [
    {
      title: 'Meritocratic culture',
      points: [
        'Selection of people, tools and partners is determined by demonstrated performance, not habit or relationship',
        'Performance evaluation becomes objective and continuous, not periodic and subjective',
        'Compensation can be grounded directly in what was delivered. The data makes it defensible.',
      ],
      trends: [
        'Pay transparency legislation',
        'Outcome-based employment models',
        'AI-enabled performance measurement',
      ],
      question: 'How does productivity shift when pay is tied directly to what each person delivers?',
    },
    {
      title: 'Trustless systems',
      points: [
        'Individual submissions are validated against objective constraints: contracted hours, budgets and process timelines',
        'The system flags what does not add up. No submission is taken at face value.',
        'Coordination no longer depends on taking anyone at their word',
      ],
      trends: [
        'Hybrid and distributed work',
        'ESG auditability pressure',
        'Real-time performance monitoring',
      ],
      question: 'What happens to the management role when the model handles coordination and reporting?',
    },
    {
      title: 'Organisational memory',
      points: [
        'Knowledge that previously walked out the door with individuals is captured in the dataset',
        'Every execution improves future deliveries. The organisation gets smarter automatically.',
        'Onboarding, skills transfer and succession become less dependent on any individual',
      ],
      trends: [
        'Great Resignation and high turnover',
        'Aging workforce and succession risk',
        'AI knowledge management',
      ],
      question: 'How does this change the economics of hiring and skills development?',
    },
  ];

  return (
    <div className="w-full h-full p-8 flex flex-col">

      <div className="mb-6 shrink-0">
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--slide-primary)' }}>
          The Organisation It Creates
        </h2>
        <div className="w-20 h-1 mb-2" style={{ backgroundColor: 'var(--slide-accent)' }} />
        <p className="text-sm" style={{ color: 'var(--slide-text)', opacity: 0.7 }}>
          Operational change at this scale has cultural consequences. Some of them are open questions.
        </p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-3 gap-4">
        {concepts.map(({ title, points, trends, question }) => (
          <div
            key={title}
            className="flex flex-col rounded-lg overflow-hidden"
            style={{
              backgroundColor: 'var(--slide-bg-primary-muted)',
              border: '1px solid var(--slide-border-primary)',
            }}
          >
            {/* Top half — title + bullets */}
            <div className="flex flex-col p-5 overflow-hidden" style={{ height: '50%' }}>
              <p className="text-sm font-semibold mb-3 shrink-0" style={{ color: 'var(--slide-primary)' }}>
                {title}
              </p>
              <ul className="flex flex-col gap-2 min-h-0 overflow-hidden">
                {points.map(point => (
                  <li key={point} className="flex items-start gap-2">
                    <span
                      className="mt-1.5 shrink-0 w-1 h-1 rounded-full"
                      style={{ backgroundColor: 'var(--slide-primary)', opacity: 0.4 }}
                    />
                    <span className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.75 }}>
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Inset divider */}
            <div style={{ height: '1px', backgroundColor: 'var(--slide-border-primary)', margin: '0 20px' }} />

            {/* Bottom half — macro trends + question */}
            <div className="flex flex-col p-5" style={{ height: '50%' }}>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-2 shrink-0"
                style={{ color: 'var(--slide-primary)', opacity: 0.4 }}
              >
                Macro trends
              </p>
              <div className="flex flex-wrap gap-1.5 shrink-0">
                {trends.map(trend => (
                  <span
                    key={trend}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      border: '1px solid var(--slide-border-primary)',
                      color: 'var(--slide-primary)',
                      opacity: 0.65,
                    }}
                  >
                    {trend}
                  </span>
                ))}
              </div>
              <p
                className="text-xs leading-relaxed italic mt-auto"
                style={{ color: 'var(--slide-primary)', opacity: 0.5 }}
              >
                {question}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
