export function CultureSlide() {
  const shifts = [
    {
      dimension: 'Accountability',
      from: '"We did our best with the information available"',
      to:   'Performance is visible, attributable, and continuously improving',
    },
    {
      dimension: 'Trust',
      from: 'Decisions deferred to the most experienced person in the room',
      to:   'Decisions grounded in what the data shows actually works',
    },
    {
      dimension: 'Collaboration',
      from: 'Each function optimises for its own view of the world',
      to:   'All functions operate from — and contribute to — the same picture',
    },
    {
      dimension: 'Recognition',
      from: 'Seniority and relationships determine who gets the work',
      to:   'Merit determines who, what, and how',
    },
    {
      dimension: 'Improvement',
      from: 'Retrospectives and periodic reviews',
      to:   'Learning is continuous and embedded in every execution',
    },
  ];

  return (
    <div className="w-full h-full p-8 flex flex-col">

      <div className="mb-4 shrink-0">
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--slide-primary)' }}>
          Cultural Shifts
        </h2>
        <div className="w-20 h-1" style={{ backgroundColor: 'var(--slide-accent)' }} />
      </div>

      {/* Column headers */}
      <div className="grid gap-x-3 mb-1 shrink-0 px-1"
        style={{ gridTemplateColumns: '130px 1fr 20px 1fr' }}>
        <div />
        <div className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--slide-text)', opacity: 0.35 }}>From</div>
        <div />
        <div className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--slide-primary)', opacity: 0.6 }}>To</div>
      </div>

      {/* Rows */}
      <div className="flex-1 min-h-0 flex flex-col" style={{ borderTop: '1px solid var(--slide-border-primary)' }}>
        {shifts.map(({ dimension, from, to }) => (
          <div
            key={dimension}
            className="grid gap-x-3 items-center py-2 flex-1"
            style={{
              gridTemplateColumns: '130px 1fr 20px 1fr',
              borderBottom: '1px solid var(--slide-border-primary)',
            }}
          >
            <span className="text-xs font-semibold px-1" style={{ color: 'var(--slide-primary)' }}>
              {dimension}
            </span>
            <span className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.4 }}>
              {from}
            </span>
            <span className="text-xs text-center" style={{ color: 'var(--slide-primary)', opacity: 0.3 }}>→</span>
            <span className="text-xs font-medium leading-relaxed" style={{ color: 'var(--slide-primary)' }}>
              {to}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
