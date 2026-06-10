import { SlideLayout } from '@/components/slides/SlideLayout';

type Ask =
  | { number: string; title: string; transparencyAngle: string }
  | { number: string; title: string; intro: string; bullets: string[]; offScript?: boolean; mutedBullets?: number[] };

const asks: Ask[] = [
  {
    number: '01',
    title: 'Driving demand at scale',
    intro: 'The theoretical value proposition is clear. Delivery becomes muddy - and that muddiness is what stops demand scaling.',
    bullets: [
      'When something goes wrong, the manufacturer cannot isolate the cause: product, process, people, or installation.',
      'Insurers price that opacity as risk. Erectors price it as contingency.',
      'Without a verifiable record, trust stays relationship-driven - and demand stays small.',
    ],
  },
  {
    number: '02',
    title: 'Embedding sustainability and driving net zero carbon',
    intro: 'Waste, oversupply, and overengineering are generated across processes, people, tools, and materials.',
    bullets: [
      'Attribution of waste to its source in each dimension.',
      'Identification of worst offenders and champions.',
      'Leverage of best practice across the ecosystem.',
    ],
  },
  {
    number: '03',
    title: 'Delivering digital transformation',
    intro: 'Transformation is easy when the evidence is available and clear.',
    bullets: [
      'Technology adoption has relied on marketing, word of mouth, and trends.',
      'Resistance to these is growing - and with it, stagnation.',
      'Without evidence of what works, in what circumstances, and by how much, inertia wins.',
    ],
  },
  {
    number: '04',
    title: 'Incentivising quality assurance and setting robust standards',
    intro: 'Incentives and quality are currently decoupled - in the factory and on site. An executor or erector who introduces a defect is paid the same as one who doesn\'t.',
    bullets: [
      'Merit tracks quality metrics at individual level across both environments: defect rates, QC outcomes, rework incidence.',
      'Those metrics can be made explicit: these are the standards we value, in production and in installation.',
      'Tie compensation to performance, and quality becomes self-enforcing throughout the ecosystem.',
    ],
  },
  {
    number: '05',
    title: 'Value based procurement',
    intro: 'The metrics that matter most to procurement are the hardest to demonstrate.',
    bullets: [
      'Carbon, quality, and defect rates can be captured and verified - but currently are not.',
      'Longevity - the metric that drives whole-life value decisions - cannot be proven upfront. You build it and see.',
      'Tool procurement is currently decided on price and marketing claims. Field performance data - which brand, which specification, on which step - changes that calculus.',
    ],
    mutedBullets: [0, 1],
  },
  {
    number: '06',
    title: 'Developing workforce initiative with offsite specific training',
    intro: 'Knowledge of how the work should be done isn\'t reaching the people who need to do it.',
    bullets: [
      'Operatives enter the industry with no structured reference for their role - learning by approximation rather than by process.',
      'Erectors receive the kit without installation methods or time benchmarks - making accurate pricing nearly impossible.',
      'Overpricing makes offsite uncompetitive. Underpricing leads to losses, withdrawal from the market, and reputational damage to the systems themselves.',
    ],
    offScript: true,
  },
];

export function CommonThreadSlide() {
  return (
    <SlideLayout
      title="One Root, Six Branches"
      subtitle="The six priorities in the BOS Manifesto share one precondition: transparency"
    >
      <div className="absolute top-8 right-8 flex flex-col gap-2 items-end">
        {[
          { label: 'Process unity ("collaborative frameworks")', accent: true },
          { label: 'Data transparency', accent: false },
        ].map(({ label, accent }) => (
          <div key={label} className="flex items-center gap-2">
            <span className="text-xs" style={{ color: 'var(--slide-text)', opacity: 0.45 }}>{label}</span>
            <div
              className="w-6 h-3 rounded-sm"
              style={{
                border: `1px solid ${accent ? 'var(--slide-accent)' : 'var(--slide-border)'}`,
                borderTopWidth: accent ? '3px' : '1px',
              }}
            />
          </div>
        ))}
      </div>

      <div className="flex-1 min-h-0 flex flex-col gap-4">

        <div className="flex-1 min-h-0 grid grid-cols-3 grid-rows-2 gap-3">
          {asks.map((ask) => (
            <div
              key={ask.number}
              className="bg-white rounded-lg border p-3 flex flex-col shadow-sm"
              style={{
                borderColor: 'offScript' in ask && ask.offScript ? 'var(--slide-accent)' : 'var(--slide-border)',
                borderTopWidth: 'offScript' in ask && ask.offScript ? '3px' : '1px',
              }}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-start gap-2">
                  <span
                    className="text-xs font-bold shrink-0 mt-px"
                    style={{ color: 'var(--slide-accent)' }}
                  >
                    {ask.number}
                  </span>
                  <h3 className="text-xs font-semibold leading-snug" style={{ color: 'var(--slide-primary)' }}>
                    {ask.title}
                  </h3>
                </div>
              </div>
              <div
                className="flex-1 rounded px-2 py-1.5 text-xs leading-relaxed flex flex-col gap-1.5"
                style={{ backgroundColor: 'var(--slide-bg-muted)', color: 'var(--slide-text)', opacity: 0.85 }}
              >
                {'intro' in ask ? (
                  <>
                    <p>{ask.intro}</p>
                    <ul className="flex flex-col gap-0.5">
                      {ask.bullets.map((b, i) => {
                        const muted = 'mutedBullets' in ask && ask.mutedBullets?.includes(i);
                        return (
                        <li key={b} className="flex items-start gap-1.5" style={{ opacity: muted ? 0.4 : 1 }}>
                          <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--slide-accent)', opacity: 0.6 }} />
                          <span>{b}</span>
                        </li>
                        );
                      })}
                    </ul>
                  </>
                ) : (
                  ask.transparencyAngle
                )}
              </div>
            </div>
          ))}
        </div>

        <div
          className="shrink-0 rounded-lg px-5 py-3 flex items-center gap-4"
          style={{ backgroundColor: 'var(--slide-bg-primary-muted)', border: '1px solid var(--slide-border-primary)' }}
        >
          <div
            className="shrink-0 rounded-full w-2 h-2"
            style={{ backgroundColor: 'var(--slide-accent)' }}
          />
          <p className="text-sm font-medium leading-snug" style={{ color: 'var(--slide-primary)' }}>
            The common dependency:{' '}
            <span className="font-bold">transparency of delivery.</span>{' '}
            Every ask requires an evidence base that can only be built by recording what actually happens on every project.
          </p>
        </div>

      </div>
    </SlideLayout>
  );
}
