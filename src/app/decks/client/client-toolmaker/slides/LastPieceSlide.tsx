import { SlideLayout } from '@/components/slides/SlideLayout';

function Ref({ n }: { n: number }) {
  return (
    <sup className="font-semibold ml-px" style={{ color: 'var(--slide-accent)', fontSize: '0.6rem' }}>
      [{n}]
    </sup>
  );
}

export function LastPieceSlide() {
  return (
    <SlideLayout
      title="The Last Piece of the Picture"
      subtitle="The field is wired. The business case is proven. The process layer is the only unclaimed position."
    >
      <div className="flex-1 min-h-0 flex flex-col gap-3">

        <div className="flex flex-row gap-4 flex-1 min-h-0">

          {/* Card 1 — Infrastructure */}
          <div className="flex-1 flex flex-col rounded-lg p-4 gap-2"
            style={{ backgroundColor: 'var(--slide-bg-primary-muted)', border: '1px solid var(--slide-border-primary)' }}>
            <div className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--slide-primary)', opacity: 0.55 }}>
              The Infrastructure
            </div>
            <div className="text-4xl font-bold leading-tight" style={{ color: 'var(--slide-primary)' }}>
              85-95%
            </div>
            <div className="text-xs leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.55 }}>
              of new capital equipment now ships with integrated telemetry<Ref n={14} />
            </div>
            <div className="w-full h-px shrink-0" style={{ backgroundColor: 'var(--slide-border-primary)', opacity: 0.25 }} />
            <div className="text-xs leading-relaxed flex-1" style={{ color: 'var(--slide-text)', opacity: 0.5 }}>
              The hardware investment has already happened. OEM-integrated sensors ship as standard on new equipment. Sandvik reports 60% of customers using automated or digital solutions as of 2024, one year ahead of their own internal target.<Ref n={14} /> The field is wired. The gap is not connectivity - it is what to do with the signal once you have it.
            </div>
          </div>

          {/* Card 2 — Revenue Shift */}
          <div className="flex-1 flex flex-col rounded-lg p-4 gap-2"
            style={{ backgroundColor: 'var(--slide-bg-primary-muted)', border: '1px solid var(--slide-border-primary)' }}>
            <div className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--slide-primary)', opacity: 0.55 }}>
              The Revenue Shift
            </div>
            <div className="text-4xl font-bold leading-tight" style={{ color: 'var(--slide-primary)' }}>
              49.9%
            </div>
            <div className="text-xs leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.55 }}>
              CAGR - EaaS market projected to reach $28B by 2030 (Grand View Research)<Ref n={15} />
            </div>
            <div className="w-full h-px shrink-0" style={{ backgroundColor: 'var(--slide-border-primary)', opacity: 0.25 }} />
            <div className="text-xs leading-relaxed flex-1" style={{ color: 'var(--slide-text)', opacity: 0.5 }}>
              Customers are moving from CAPEX ownership to guaranteed outcomes. The EaaS market is growing at 49.9% annually - faster than any adjacent equipment sector - driven by demand for performance certainty and predictable operational costs.<Ref n={15} /> The manufacturers who move first set the contract terms, the integration standards, and the switching costs. Everyone who follows competes on their terms.
            </div>
          </div>

          {/* Card 3 — The Vacuum */}
          <div className="flex-1 flex flex-col rounded-lg p-4 gap-2"
            style={{ backgroundColor: 'var(--slide-bg-accent-muted)', border: '1.5px solid var(--slide-accent)' }}>
            <div className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--slide-accent)', opacity: 0.75 }}>
              The Vacuum
            </div>
            <div className="text-4xl font-bold leading-tight" style={{ color: 'var(--slide-accent)' }}>
              Zero
            </div>
            <div className="text-xs leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>
              platforms bridge manufacturer spec to contractor process to auditable record
            </div>
            <div className="w-full h-px shrink-0" style={{ backgroundColor: 'var(--slide-accent)', opacity: 0.2 }} />
            <div className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.55 }}>
              OEM telematics track the machine. Fleet managers aggregate the data. Field management software orchestrates specific workflows. None of them span the full chain from manufacturer specification to contractor execution to auditable record. The hardware exists. The commercial pull exists. The layer that connects them does not.
            </div>
            <div className="flex flex-col gap-1 mt-1">
              <div className="text-xs leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.4 }}>
                — 86% of construction firms use telematics. Only 23% use the data to make decisions.<Ref n={16} />
              </div>
              <div className="text-xs leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.4 }}>
                — Nearly half of fleet managers say they have too much data and no clarity on how to act.<Ref n={17} />
              </div>
            </div>
          </div>

        </div>

        {/* Bottom synthesis bar */}
        <div className="shrink-0 rounded-lg px-5 py-3"
          style={{ backgroundColor: 'var(--slide-bg-muted)', border: '1px solid var(--slide-border-primary)' }}>
          <p className="text-xs leading-relaxed text-center"
            style={{ color: 'var(--slide-text)', opacity: 0.5 }}>
            The infrastructure investment has been made. The revenue model is already moving. The only question is who claims the position that connects them.
          </p>
        </div>

      </div>
    </SlideLayout>
  );
}
