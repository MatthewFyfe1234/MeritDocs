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
      subtitle="The hardware is standard. The market is moving. The position is vacant."
    >
      <div className="flex-1 min-h-0 flex flex-col gap-3">

        <div className="flex flex-row gap-4 flex-1 min-h-0">

          {/* Card 1 — The Connected Fleet */}
          <div className="flex-1 flex flex-col rounded-lg p-4 gap-2"
            style={{ backgroundColor: 'var(--slide-bg-primary-muted)', border: '1px solid var(--slide-border-primary)' }}>
            <div className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--slide-primary)', opacity: 0.55 }}>
              The Connected Fleet
            </div>
            <div className="text-4xl font-bold leading-tight" style={{ color: 'var(--slide-primary)' }}>
              Standard
            </div>
            <div className="text-xs leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.55 }}>
              OEM telematics now ships as default on new municipal vehicles<Ref n={12} /><Ref n={13} />
            </div>
            <div className="w-full h-px shrink-0" style={{ backgroundColor: 'var(--slide-border-primary)', opacity: 0.25 }} />
            <div className="text-xs leading-relaxed flex-1" style={{ color: 'var(--slide-text)', opacity: 0.5 }}>
              Dennis Eagle fits Terberg Connect to all new UK vehicles from the factory.<Ref n={13} /> McNeilus integrates ClearSky diagnostics into the Volterra line as standard.<Ref n={12} /> The OEMs have already made the connectivity investment. The fleet is wired. The gap is not data - it is what is missing from the record once the data arrives.
            </div>
          </div>

          {/* Card 2 — The Revenue Pull */}
          <div className="flex-1 flex flex-col rounded-lg p-4 gap-2"
            style={{ backgroundColor: 'var(--slide-bg-primary-muted)', border: '1px solid var(--slide-border-primary)' }}>
            <div className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--slide-primary)', opacity: 0.55 }}>
              The Revenue Pull
            </div>
            <div className="text-4xl font-bold leading-tight" style={{ color: 'var(--slide-primary)' }}>
              15.3%
            </div>
            <div className="text-xs leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.55 }}>
              CAGR for fleet managed services - fastest segment in a $37.71B market<Ref n={14} />
            </div>
            <div className="w-full h-px shrink-0" style={{ backgroundColor: 'var(--slide-border-primary)', opacity: 0.25 }} />
            <div className="text-xs leading-relaxed flex-1" style={{ color: 'var(--slide-text)', opacity: 0.5 }}>
              61% of fleet operators rank TCO reduction as their top priority.<Ref n={15} /> Customers are moving from capital ownership to outcome guarantees. The manufacturers who move first into managed services set the terms for everyone who follows. The commercial pull is structural, not cyclical.
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
              platforms close the loop from manufacturer specification to verified operational record
            </div>
            <div className="w-full h-px shrink-0" style={{ backgroundColor: 'var(--slide-accent)', opacity: 0.2 }} />
            <div className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.55 }}>
              Every platform tracks the machine. None verify whether the prescribed procedure was followed. ClearSky shows a fault code. Terberg Connect replicates the dashboard. Samsara aggregates the location. Not one records what the operator actually did - the only evidence that matters when the contract is disputed.
            </div>
            <div className="flex flex-col gap-1 mt-1">
              <div className="text-xs leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.4 }}>
                — Audits consistently find policies exist but verification does not. The gap between what was specified and what was performed remains unresolved.<Ref n={16} />
              </div>
            </div>
          </div>

        </div>

        {/* Bottom synthesis bar */}
        <div className="shrink-0 rounded-lg px-5 py-3"
          style={{ backgroundColor: 'var(--slide-bg-muted)', border: '1px solid var(--slide-border-primary)' }}>
          <p className="text-xs leading-relaxed text-center"
            style={{ color: 'var(--slide-text)', opacity: 0.5 }}>
            The infrastructure investment has been made. The managed services market is growing. The only question is who claims the position that connects them.
          </p>
        </div>

      </div>
    </SlideLayout>
  );
}
