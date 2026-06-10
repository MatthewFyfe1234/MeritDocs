import { SlideLayout } from '@/components/slides/SlideLayout';

export function TelemetrySlide() {
  return (
    <SlideLayout
      title="The Data Already Exists"
      subtitle="Connected equipment is mainstream. The machines are producing data continuously. None of it is connected to the specification that governed the work."
    >
      <div className="flex-1 min-h-0 flex flex-col gap-3">

        <div className="flex flex-row gap-4 flex-1 min-h-0">

          {/* Card 1 */}
          <div className="flex-1 flex flex-col rounded-lg p-4 gap-2"
            style={{ backgroundColor: 'var(--slide-bg-primary-muted)', border: '1px solid var(--slide-border-primary)' }}>
            <div className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--slide-primary)', opacity: 0.55 }}>
              The Machines
            </div>
            <div className="text-4xl font-bold leading-tight" style={{ color: 'var(--slide-primary)' }}>
              72%
            </div>
            <div className="text-xs leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.55 }}>
              of contractors use IoT-enabled equipment telematics
            </div>
            <div className="w-full h-px shrink-0" style={{ backgroundColor: 'var(--slide-border-primary)', opacity: 0.25 }} />
            <div className="text-xs leading-relaxed flex-1" style={{ color: 'var(--slide-text)', opacity: 0.5 }}>
              Construction equipment connectivity has crossed the mainstream threshold. Presses, saws, cranes, drills - the tools on every job site are generating operational data continuously. The adoption curve has already run.
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex-1 flex flex-col rounded-lg p-4 gap-2"
            style={{ backgroundColor: 'var(--slide-bg-primary-muted)', border: '1px solid var(--slide-border-primary)' }}>
            <div className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--slide-primary)', opacity: 0.55 }}>
              The Scale
            </div>
            <div className="text-4xl font-bold leading-tight" style={{ color: 'var(--slide-primary)' }}>
              6.8M
            </div>
            <div className="text-xs leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.55 }}>
              active telematics systems in construction - on track to double to 12.1M by 2028
            </div>
            <div className="w-full h-px shrink-0" style={{ backgroundColor: 'var(--slide-border-primary)', opacity: 0.25 }} />
            <div className="text-xs leading-relaxed flex-1" style={{ color: 'var(--slide-text)', opacity: 0.5 }}>
              $19.3 billion of IoT infrastructure active in construction in 2026 alone. Every connected press cycle, every sensor reading, every fault event is logged somewhere. The data volume is not the constraint.
            </div>
          </div>

          {/* Card 3 - The Gap */}
          <div className="flex-1 flex flex-col rounded-lg p-4 gap-2"
            style={{ backgroundColor: 'var(--slide-bg-accent-muted)', border: '1.5px solid var(--slide-accent)' }}>
            <div className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--slide-accent)', opacity: 0.75 }}>
              The Gap
            </div>
            <div className="text-4xl font-bold leading-tight" style={{ color: 'var(--slide-accent)' }}>
              Zero
            </div>
            <div className="text-xs leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>
              platforms connect tool telemetry to the design specification that governed the job
            </div>
            <div className="w-full h-px shrink-0" style={{ backgroundColor: 'var(--slide-accent)', opacity: 0.2 }} />
            <div className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.55 }}>
              Every telematics platform knows what the machine did. None of them know what the specification required. Location, utilisation, fault codes - all fleet-layer data. It carries no job, no step, no specification to be compared against. The signal exists. The meaning does not.
            </div>
          </div>

        </div>

        <div className="shrink-0 rounded-lg px-5 py-3"
          style={{ backgroundColor: 'var(--slide-bg-muted)', border: '1px solid var(--slide-border-primary)' }}>
          <p className="text-xs leading-relaxed text-center"
            style={{ color: 'var(--slide-text)', opacity: 0.5 }}>
            The hardware investment is done. The data stream is live. The only missing layer is the one that tells the telemetry what it was supposed to be doing.
          </p>
        </div>

      </div>
    </SlideLayout>
  );
}
