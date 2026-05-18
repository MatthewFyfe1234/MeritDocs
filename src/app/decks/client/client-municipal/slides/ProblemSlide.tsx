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

export function ProblemSlide() {
  const rows: {
    dimension: string;
    problem: string;
    example: string;
    stat: string | null;
    statDetail: string;
    refs?: number[];
  }[] = [
    {
      dimension:  'Public Uptime',
      problem:    'Equipment failure is a public event. A snowplow down during a blizzard, a refuse truck off route, an emergency vehicle out of service.',
      example:    'e.g. A city\'s winter maintenance fleet fails to clear an arterial road during a storm. The contractor\'s SLA breach is reported. The procurement story runs the following week.',
      stat:       null,
      statDetail: 'Uptime is not an operational target for municipal operators - it is a public safety obligation with political consequences',
    },
    {
      dimension:  'Budget Rigidity',
      problem:    'Procurement cycles are annual and politically governed. Emergency repairs outside budget create administrative exposure and erode trust.',
      example:    'e.g. An unexpected hydraulic failure in March triggers an emergency procurement. The repair cost lands outside the approved maintenance budget. The audit finding follows.',
      stat:       '3-5×',
      statDetail: 'Higher cost of reactive vs planned maintenance (US Department of Energy)',
      refs:       [7],
    },
    {
      dimension:  'SLA Complexity',
      problem:    'Cities are writing tighter contracts: guaranteed response times, certified technicians, remote monitoring, 24/7 hotlines. Compliance requires evidence.',
      example:    'e.g. A municipal tender requires documented proof of SLA adherence over the previous contract period. Without a service record system, the response is a spreadsheet and a hope.',
      stat:       '2.71×',
      statDetail: 'Higher cost of non-compliance vs maintaining it',
      refs:       [4],
    },
    {
      dimension:  'Knowledge Risk',
      problem:    'Municipal maintenance teams are aging. Experienced technicians retire carrying institutional knowledge that no manual captures.',
      example:    'e.g. The technician who knows every failure mode on the 12-year-old refuse fleet retires. His replacement learns by incident. The city\'s vehicles become the classroom.',
      stat:       '$47M',
      statDetail: 'Lost annually per large business from inefficient knowledge sharing',
      refs:       [3],
    },
    {
      dimension:  'Audit Exposure',
      problem:    'Public bodies are subject to FOI requests, budget scrutiny, and political oversight. Every maintenance decision needs a documented rationale.',
      example:    'e.g. A councillor requests the maintenance history of vehicles involved in a road incident. The records exist across three systems and two paper archives. Assembly takes three days.',
      stat:       null,
      statDetail: 'Audit readiness is a permanent operational requirement for public sector fleet operators, not an occasional burden',
    },
  ];

  return (
    <SlideLayout
      title="Your Customer's World"
      subtitle="Five structural pressures on municipal fleet operators. Every one visible in the contract terms they write."
    >
      <div className="grid gap-x-4 mb-1 shrink-0 px-1"
        style={{ gridTemplateColumns: '110px 1fr 220px' }}>
        <div />
        <div className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--slide-text)', opacity: 0.35 }}>The pressure</div>
        <div className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--slide-primary)', opacity: 0.6 }}>The cost</div>
      </div>

      <div className="flex-1 min-h-0 flex flex-col"
        style={{ borderTop: '1px solid var(--slide-border-primary)' }}>
        {rows.map(({ dimension, problem, example, stat, statDetail, refs }) => (
          <div
            key={dimension}
            className="grid gap-x-4 items-center py-1.5 flex-1"
            style={{
              gridTemplateColumns: '110px 1fr 220px',
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
              <span className="text-xs leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.45 }}>
                {example}
              </span>
            </div>

            <div className="flex flex-col gap-0.5">
              {stat && (
                <span className="text-xl font-bold leading-tight" style={{ color: 'var(--slide-accent)' }}>
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
