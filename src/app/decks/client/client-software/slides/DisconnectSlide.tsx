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

export function DisconnectSlide() {
  const rows: {
    dimension: string;
    problem: string;
    example: string;
    stat: string | null;
    statDetail: string;
    refs?: number[];
  }[] = [
    {
      dimension:  'Product Blindspot',
      problem:    'The next version of the software is built from the same assumptions as the last one. No usage data returns from the field to inform what should change.',
      example:    'e.g. A revised heel joint geometry ships in v4.2. Failures cluster in high-humidity sites at 8 months. The pattern surfaces through warranty claims 14 months later. The team is already shipping v4.5 with the same assumption.',
      stat:       '96%',
      statDetail: 'Of construction data generated on projects is never analysed or returned to the design system.',
      refs:       [3],
    },
    {
      dimension:  'Strict Liability',
      problem:    'Under the revised EU Product Liability Directive (effective December 2026), software is legally a product. If a calculation is challenged, the burden of proof shifts to the software provider.',
      example:    'e.g. A structural design file contains a load path error. A component fails. The claimant shows plausible malfunction. The court presumes the software was defective. The developer must now prove it was not.',
      stat:       '25yr',
      statDetail: 'Latent liability window under the revised EU PLD - extended from 10 years. Any substantial software update restarts the clock.',
      refs:       [2],
    },
    {
      dimension:  'Warranty',
      problem:    'The software certifies the design and generates the output. The installation is invisible. When a structural claim arrives, there is no record to show the specification was followed.',
      example:    'e.g. Roof trusses collapse during erection. The software\'s parameters were correct for fully braced conditions. Without a timestamped site record, the manufacturer spends months proving the bracing failure was the installer\'s.',
      stat:       '$250K',
      statDetail: 'First-year defense and expert fees per party - before any settlement. Defending costs 3-5× what settling costs.',
      refs:       [1],
    },
    {
      dimension:  'Insurance',
      problem:    'Without verified installation records, underwriters cannot price structural risk accurately. That uncertainty is loaded into the premium.',
      example:    'e.g. A structural software provider\'s E&O runs $30-42K annually. The same provider, with verified records enabling LDI compliance, can unlock 10-30% underwriting discounts for every builder using their software.',
      stat:       '$30–42K',
      statDetail: 'Annual structural E&O premium. Verified installation records unlock 10–30% LDI premium discounts for builders.',
      refs:       [4],
    },
    {
      dimension:  'Customer Risk',
      problem:    'When a warranty dispute arises and there is no field record, the manufacturer must choose: absorb a claim they did not cause, or fight it and risk the account.',
      example:    'e.g. A distributor representing 15% of net sales experiences a structural failure. The manufacturer cannot prove incorrect installation caused it. They settle the claim - or lose the relationship.',
      stat:       '0.5–5%',
      statDetail: 'Warranty cost as a proportion of revenue for structural manufacturers - accrued against claims that are unresolvable without field records.',
      refs:       [5],
    },
  ];

  return (
    <SlideLayout
      title="The Hard Cutoff"
      subtitle="At the point of output generation, the software's visibility ends. The field runs dark - and the liability does not."
    >
      <div className="grid gap-x-4 mb-1 shrink-0 px-1"
        style={{ gridTemplateColumns: '110px 1fr 250px' }}>
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
            className="grid gap-x-4 items-center py-1.5 flex-1"
            style={{
              gridTemplateColumns: '110px 1fr 250px',
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
