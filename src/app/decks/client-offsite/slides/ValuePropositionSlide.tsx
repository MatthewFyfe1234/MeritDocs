import { Layers, BarChart2, Brain } from 'lucide-react';

const pillars = [
  {
    Icon: Layers,
    stage: 'The starting point',
    title: 'One connected workflow',
    text: 'Excel, standalone ERPs, and disconnected PM tools replaced by a single platform. The right information reaches the right person at each stage. Sales commits to dates the factory can actually keep.',
    isAccent: false,
  },
  {
    Icon: BarChart2,
    stage: 'The medium-term payoff',
    title: 'Execution becomes measurable',
    text: "Every executor's experience, delivery record, and calendar are tracked in one place, enabling assignment by merit rather than familiarity. Material and inventory inputs are rated by speed, cost, and post-delivery quality, so procurement improves with every order placed.",
    isAccent: false,
  },
  {
    Icon: Brain,
    stage: 'The compounding advantage',
    title: 'Every project makes the next one sharper',
    text: 'Accumulated performance data feeds the whole organisation: procurement identifies which suppliers to favour, HR benchmarks salaries against delivery performance, and operations identifies which process variants produce the best margins. Institutional knowledge that stays in the business, not the individual.',
    isAccent: true,
  },
];

export function ValuePropositionSlide() {
  return (
    <div className="w-full h-full p-8 flex flex-col">

      {/* Header */}
      <div className="mb-4 shrink-0">
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--slide-primary)' }}>
          What Merit OI Delivers
        </h2>
        <div className="w-20 h-1" style={{ backgroundColor: 'var(--slide-accent)' }} />
      </div>

      {/* Value statement */}
      <div
        className="shrink-0 mb-5 rounded-lg px-5 py-4"
        style={{ backgroundColor: 'var(--slide-bg-primary-muted)', borderLeft: '4px solid var(--slide-primary)' }}
      >
        <p className="text-base font-medium leading-relaxed" style={{ color: 'var(--slide-primary)' }}>
          Merit OI gives offsite structural fabricators one connected workflow that generates deterministic cost and delivery forecasts at the point of spec, replacing the fragmented tool stack that causes margin leakage and turning every completed project into sharper estimates, more reliable commitments, and institutional knowledge that compounds.
        </p>
      </div>

      {/* Three pillars */}
      <div className="flex-1 min-h-0 grid grid-cols-3 gap-5">
        {pillars.map((p) => (
          <div
            key={p.title}
            className="min-h-0 bg-white rounded-lg border flex flex-col overflow-hidden shadow-sm"
            style={{ borderColor: p.isAccent ? 'var(--slide-accent)' : 'var(--slide-border)' }}
          >
            {/* Card header */}
            <div
              className="p-4 pb-3 shrink-0"
              style={{
                backgroundColor: p.isAccent ? '#faf5ff' : 'var(--slide-bg-primary-muted)',
                borderBottom: `1px solid ${p.isAccent ? '#e9d5ff' : '#cfe0db'}`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="p-1.5 rounded-md shrink-0"
                  style={{ backgroundColor: p.isAccent ? '#f3e8ff' : 'var(--slide-bg)' }}
                >
                  <p.Icon className="w-4 h-4" style={{ color: p.isAccent ? 'var(--slide-accent)' : 'var(--slide-primary)' }} />
                </div>
                <span
                  className="text-xs font-semibold tracking-wide uppercase"
                  style={{ color: p.isAccent ? 'var(--slide-accent)' : 'var(--slide-primary)', opacity: 0.6 }}
                >
                  {p.stage}
                </span>
              </div>
              <h3
                className="text-sm font-bold leading-tight"
                style={{ color: p.isAccent ? 'var(--slide-accent)' : 'var(--slide-primary)' }}
              >
                {p.title}
              </h3>
            </div>

            {/* Card body */}
            <div className="flex-1 p-4">
              <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.8 }}>
                {p.text}
              </p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
