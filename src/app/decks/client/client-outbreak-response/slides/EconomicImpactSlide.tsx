import { TrendingUp, RefreshCw } from 'lucide-react';
import { SlideLayout } from '@/components/slides/SlideLayout';

const pricePressure = [
  { label: 'Egg price: $1.80 → $8.15', detail: 'US retail eggs moved from under $1.80 in 2021 to $4.95 in January 2025 and $8.15 by March 2025 - driven by cumulative HPAI flock losses across three years. From staple to considered purchase for millions of households.' },
  { label: 'A sustained burden, not a spike', detail: 'Across sustained outbreak cycles, price pressure persists long after any individual event resolves. Repeated flock losses reshape the supply baseline more durably than a single incident - the 2022-2025 HPAI pattern being the clearest recent example.' },
  { label: 'Prices establish new floors in affected markets', detail: 'Following major disease events, markets have shown a pattern of sustained elevated price floors rather than returning to pre-outbreak baselines. The restructuring of supply chains and herd inventories locks in the new level.' },
  { label: 'Rapid culling is the one exception', detail: 'Well-coordinated, speed-first response is the only documented pathway back to baseline within a single production cycle. Endemic or delayed scenarios show no equivalent recovery.' },
];

const feedbackLoop = [
  { label: 'Supply shock triggers sustained price pressure', detail: 'A major flock or herd loss hits supply immediately. Across repeated outbreak cycles, the cumulative effect on the supply baseline outlasts any individual event - prices reflect the pattern, not just the incident.' },
  { label: 'Livestock disease coverage is under pressure', detail: 'Repeated outbreak cycles are straining loss ratios in the livestock insurance market. The long-term availability of disease coverage is an emerging concern for producers already facing significant uninsured exposure.' },
  { label: 'Indemnity conditions tighten', detail: 'The December 2024 USDA interim rule makes indemnity contingent on biosecurity audit compliance. Farms that cannot document their protocols face disqualification - at the moment they most need support.' },
  { label: 'Indemnity uncertainty creates notification risk', detail: 'A producer uncertain of eligibility faces a structural incentive to delay formal confirmation. This mechanism - acknowledged in FAD preparedness literature even where direct measurement is difficult - extends the viral window at the most critical point.' },
];

export function EconomicImpactSlide() {
  return (
    <SlideLayout
      title="Delay Is a Compounding Factor"
      subtitle="The economic damage from a slow response is not linear - it locks in structural price floors and weakens the system for the next event"
    >
      <div className="flex-1 min-h-0 grid grid-cols-2 gap-6">

        <div className="flex flex-col gap-3 min-h-0">
          <div className="flex items-center gap-2 shrink-0">
            <div className="p-1.5 rounded-md" style={{ backgroundColor: 'var(--slide-bg-primary-muted)' }}>
              <TrendingUp className="w-4 h-4" style={{ color: 'var(--slide-primary)' }} />
            </div>
            <div>
              <div className="text-sm font-bold" style={{ color: 'var(--slide-primary)' }}>Price Pressure</div>
              <div className="text-xs" style={{ color: 'var(--slide-text)', opacity: 0.55 }}>What consumers and producers absorb when response is slow or incomplete</div>
            </div>
          </div>
          <div className="flex-1 min-h-0 flex flex-col gap-2">
            {pricePressure.map((item) => (
              <div
                key={item.label}
                className="rounded-lg px-3 py-2.5 flex items-start gap-3 bg-white border shadow-sm"
                style={{ borderColor: 'var(--slide-border)', borderLeft: '3px solid var(--slide-primary)' }}
              >
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold" style={{ color: 'var(--slide-primary)' }}>{item.label}</div>
                  <div className="text-xs mt-0.5 leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 min-h-0">
          <div className="flex items-center gap-2 shrink-0">
            <div className="p-1.5 rounded-md" style={{ backgroundColor: 'var(--slide-bg-accent-muted)' }}>
              <RefreshCw className="w-4 h-4" style={{ color: 'var(--slide-accent)' }} />
            </div>
            <div>
              <div className="text-sm font-bold" style={{ color: 'var(--slide-primary)' }}>The Feedback Loop</div>
              <div className="text-xs" style={{ color: 'var(--slide-text)', opacity: 0.55 }}>How each slow response makes the next outbreak harder to contain</div>
            </div>
          </div>
          <div className="flex-1 min-h-0 flex flex-col gap-2">
            {feedbackLoop.map((item, i) => (
              <div
                key={item.label}
                className="rounded-lg px-3 py-2.5 flex items-start gap-3 bg-white border shadow-sm"
                style={{ borderColor: 'var(--slide-border)', borderLeft: '3px solid var(--slide-accent)' }}
              >
                <span
                  className="shrink-0 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5"
                  style={{ backgroundColor: 'var(--slide-bg-accent-muted)', color: 'var(--slide-accent)', fontSize: '0.6rem' }}
                >
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold" style={{ color: 'var(--slide-primary)' }}>{item.label}</div>
                  <div className="text-xs mt-0.5 leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div
        className="shrink-0 mt-4 rounded-lg p-3"
        style={{ backgroundColor: 'var(--slide-bg-primary-muted)', border: '1px solid var(--slide-border-primary)' }}
      >
        <p className="text-xs font-medium leading-relaxed" style={{ color: 'var(--slide-primary)' }}>
          <span style={{ color: 'var(--slide-accent)', fontWeight: 700 }}>The cost is not just financial. </span>
          Repeated, visible supply shocks erode the industry's social licence - consumer price pressure becomes a policymaker concern, which becomes regulatory tightening, which the industry then has to operate inside. Faster, better-documented response is the only intervention point that breaks the cycle.
          <sup style={{ fontSize: '0.6em' }}> [7]</sup>
          <span style={{ opacity: 0.5 }}> Egg price data: American Farm Bureau Federation market basket survey.</span>
        </p>
      </div>
    </SlideLayout>
  );
}
