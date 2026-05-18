import { SlideLayout } from '@/components/slides/SlideLayout';

function Refs({ nums }: { nums?: number[] }) {
  if (!nums?.length) return null;
  return (
    <>
      {nums.map((n) => (
        <sup key={n} className="font-semibold ml-px" style={{ color: 'var(--slide-accent)', fontSize: '0.6rem' }}>
          [{n}]
        </sup>
      ))}
    </>
  );
}

export function ObligationGapSlide() {
  const rows: {
    dimension: string;
    problem: string;
    example: string;
    stat: string | null;
    statDetail: string;
    refs?: number[];
  }[] = [
    {
      dimension:  'Uptime Accountability',
      problem:    'Equipment failure is a public event. The city is accountable to residents. The manufacturer is accountable to the city. The SLA defines the obligation - not the cause, and not who bears it.',
      example:    'e.g. A refuse fleet falls behind schedule during a public health event. The city faces political pressure. The manufacturer faces an SLA breach. Neither has a record of why the vehicle was unavailable or whether prescribed operating procedures were followed.',
      stat:       '44%',
      statDetail: 'Increase in vehicle wait times over three years in a city fleet audit - while the SLA clock kept running',
      refs:       [1],
    },
    {
      dimension:  'The Two-Warranty Problem',
      problem:    'Municipal vehicles have two manufacturers. When something fails, each points to the other. The municipality pays while the argument runs.',
      example:    'e.g. A hydraulic system fails on a refuse truck. The chassis dealer attributes the issue to the body integration. The body builder points to a PTO fault. The vehicle sits idle for weeks. Neither party has an operational record of what preceded the failure.',
      stat:       '$3-15K',
      statDetail: 'Per incident for SCR/DPF system failures - frequently absorbed by the manufacturer',
      refs:       [2],
    },
    {
      dimension:  'Operator Conduct',
      problem:    'What the most diligent operators do is not what every operator does. The gap is invisible because no record exists of how each vehicle was actually run.',
      example:    'e.g. One driver pre-warms hydraulics in cold weather, respects load limits on wet routes, completes the pre-shift check unprompted. Another does not. The vehicles accumulate different wear profiles. Neither side connects the pattern to the operator.',
      stat:       '46%',
      statDetail: 'Of major equipment repairs result from unexpected failures rather than scheduled maintenance - a substantial subset attributable to procedural non-compliance and operator misuse',
      refs:       [3],
    },
    {
      dimension:  'Knowledge Loss',
      problem:    "The technician who knows every failure mode on a 12-year-old refuse fleet retires. Their replacement learns by incident. The city's vehicles become the classroom.",
      example:    '',
      stat:       '4.7→1.4',
      statDetail: 'Days average shop time before and after digital records - $128k implementation, $3.09M benefit over 18 months',
      refs:       [4],
    },
    {
      dimension:  'Contract Pricing Blindness',
      problem:    'Every service contract is priced on assumptions - standard duty cycles, ideal maintenance intervals, historical failure rates. None of that is operational data. By Year 3 the contract is loss-making and nobody knows exactly why.',
      example:    '',
      stat:       '5-10%',
      statDetail: 'Margin lost at quoting from rule-of-thumb estimating. 400-800 basis points recoverable through data-driven pricing',
      refs:       [5],
    },
    {
      dimension:  'Audit Exposure',
      problem:    'Municipal operations are subject to FOI requests, budget scrutiny, and political oversight. Every operational decision needs a documented rationale that can survive public examination.',
      example:    'e.g. A councillor requests the operational history of vehicles involved in a missed service period. The records exist across three systems and two paper archives. Assembly takes three days. The story runs before the data is ready.',
      stat:       '2.71×',
      statDetail: 'Higher cost of non-compliance vs maintaining it - audit readiness is a permanent requirement, not an occasional one',
      refs:       [6],
    },
  ];

  return (
    <SlideLayout
      title="Obligations Without Evidence"
      subtitle="The city can't prove what happened. The manufacturer can't price what they don't know. Both problems have the same cause."
    >
      <div className="grid gap-x-4 mb-1 shrink-0 px-1"
        style={{ gridTemplateColumns: '120px 1fr 338px' }}>
        <div />
        <div className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--slide-text)', opacity: 0.35 }}>The gap</div>
        <div className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--slide-primary)', opacity: 0.6 }}>The cost</div>
      </div>

      <div className="flex-1 min-h-0 flex flex-col"
        style={{ borderTop: '1px solid var(--slide-border-primary)' }}>
        {rows.map(({ dimension, problem, example, stat, statDetail, refs }) => (
          <div
            key={dimension}
            className="grid gap-x-4 items-center py-1 flex-1"
            style={{
              gridTemplateColumns: '120px 1fr 338px',
              borderBottom: '1px solid var(--slide-border-primary)',
            }}
          >
            <span className="text-xs font-semibold px-1" style={{ color: 'var(--slide-primary)' }}>
              {dimension}
            </span>

            <div className="flex flex-col gap-0.5">
              <span className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.7 }}>
                {problem}
              </span>
              {example && (
                <span className="text-xs leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.45 }}>
                  {example}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-0.5">
              {stat && (
                <span
                  className="font-bold leading-tight"
                  style={{ color: 'var(--slide-accent)', fontSize: stat === '4.7→1.4' ? '1rem' : '1.25rem' }}
                >
                  {stat}
                </span>
              )}
              <span className="text-xs leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>
                {statDetail}<Refs nums={refs} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}
