import { SlideLayout } from '@/components/slides/SlideLayout';

const stats = [
  {
    value: '633M+',
    label: 'poultry lost globally, 2005-2024',
    detail: 'The cumulative toll of HPAI across two decades, reaching a single-year peak of 146 million birds in 2022 across 84 countries. The 2025-2026 wave is already tracking above historical baselines for the same period, with 13.6 million culled in the Americas in February 2026 alone.',
    ref: 1,
  },
  {
    value: '32 days',
    label: 'mean time from ASF infection to detection',
    detail: 'UK-based stochastic modelling suggests the virus circulates within a herd for 20-43 days before a substantial rise in mortality triggers investigation. US peer-reviewed literature supports detection lags of two weeks or more for moderately virulent strains - the operational window is real regardless of the precise figure.',
    ref: 2,
  },
  {
    value: '< 24 hrs',
    label: 'regulatory depopulation target on presumptive positive',
    detail: 'Mandated response frameworks set depopulation within 24 hours of a presumptive positive as the primary containment target. In practice, appraisal bottlenecks, resource contention, and coordination lag across multiple parties routinely extend this window - the period of highest viral shedding and environmental contamination.',
    ref: 3,
  },
  {
    value: '$35B',
    label: 'cost difference: eradicated vs. endemic ASF over 10 years (US)',
    detail: 'Failing to eliminate ASF within a two-year window versus it becoming endemic represents $35 billion in additional losses to the US swine industry over ten years. The differential is driven by permanent industry downsizing as export markets do not reopen - 140,000 jobs at risk in the worst case.',
    ref: 4,
  },
];

function Ref({ num }: { num: number }) {
  return (
    <sup className="font-semibold ml-px" style={{ color: 'var(--slide-accent)', fontSize: '0.6rem' }}>
      [{num}]
    </sup>
  );
}

export function LandscapeSlide() {
  return (
    <SlideLayout
      title="The Stakes"
      subtitle="The operational challenge is consistent across livestock pathogens. The failure modes here are not disease-specific."
    >
      <div className="flex-1 min-h-0 grid grid-cols-2 gap-4">
        {stats.map((s) => (
          <div
            key={s.value + s.label}
            className="bg-white rounded-lg border p-4 flex flex-col shadow-sm"
            style={{ borderColor: 'var(--slide-border)', borderTop: '3px solid var(--slide-primary)' }}
          >
            <div>
              <div className="text-4xl font-bold leading-none" style={{ color: 'var(--slide-primary)' }}>
                {s.value}<Ref num={s.ref} />
              </div>
              <div className="text-xs font-semibold mt-1.5" style={{ color: 'var(--slide-primary)', opacity: 0.7 }}>
                {s.label}
              </div>
            </div>
            <p className="text-xs leading-relaxed mt-3" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>
              {s.detail}
            </p>
          </div>
        ))}
      </div>

      <div
        className="shrink-0 mt-4 rounded-lg p-3"
        style={{ backgroundColor: 'var(--slide-bg-primary-muted)', border: '1px solid var(--slide-border-primary)' }}
      >
        <p className="text-xs font-medium leading-relaxed" style={{ color: 'var(--slide-primary)' }}>
          <span style={{ color: 'var(--slide-accent)', fontWeight: 700 }}>The response framework is not the problem. </span>
          The response framework is mandated, well-understood, and consistently too slow. The failures are operational: no shared information environment, no live resource picture, no automated coordination across the parties who must act together in a matter of hours.
        </p>
      </div>
    </SlideLayout>
  );
}
