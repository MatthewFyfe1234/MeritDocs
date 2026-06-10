import { SlideLayout } from '@/components/slides/SlideLayout';

function Ref({ n }: { n: number }) {
  return (
    <sup className="font-semibold ml-px" style={{ color: 'var(--slide-accent)', fontSize: '0.6rem' }}>
      [{n}]
    </sup>
  );
}

function Column({
  heading,
  items,
  muted,
  accent,
}: {
  heading: string;
  items: { label: string; detail: React.ReactNode }[];
  muted?: boolean;
  accent?: boolean;
}) {
  const borderColor = accent ? 'var(--slide-accent)' : 'var(--slide-border-primary)';
  const bg = accent ? 'var(--slide-bg-accent-muted)' : muted ? 'var(--slide-bg-muted)' : 'var(--slide-bg-primary-muted)';
  const labelColor = accent ? 'var(--slide-accent)' : 'var(--slide-primary)';
  const headingOpacity = muted ? 0.45 : accent ? 1 : 0.7;

  return (
    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
      <div
        className="text-xs font-semibold uppercase tracking-widest px-1"
        style={{ color: labelColor, opacity: headingOpacity }}
      >
        {heading}
      </div>
      <div
        className="flex flex-col flex-1 rounded-lg overflow-hidden"
        style={{ border: `1px solid ${borderColor}` }}
      >
        {items.map((item, i) => (
          <div
            key={item.label}
            className="flex-1 flex flex-col justify-center px-4 py-3 gap-1"
            style={{
              backgroundColor: bg,
              borderTop: i > 0 ? `1px solid ${borderColor}` : 'none',
            }}
          >
            <div
              className="text-xs font-semibold"
              style={{ color: labelColor, opacity: muted ? 0.7 : 1 }}
            >
              {item.label}
            </div>
            <div
              className="text-xs leading-relaxed"
              style={{ color: 'var(--slide-text)', opacity: 0.55 }}
            >
              {item.detail}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const designLayer: { label: string; detail: React.ReactNode }[] = [
  {
    label: '87% adoption',
    detail: <>of AEC firms now use digital design or specification software as a primary delivery tool<Ref n={14} /></>,
  },
  {
    label: '$18.4B by 2030',
    detail: <>construction and engineering software market at 22.5% CAGR - customers are moving toward verified outcomes<Ref n={15} /></>,
  },
  {
    label: 'Specification-first',
    detail: 'The design data is structured, machine-readable, and job-specific. It already defines what correct execution looks like.',
  },
];

const equipmentLayer: { label: string; detail: React.ReactNode }[] = [
  {
    label: '72% connected',
    detail: <>of contractors use IoT-enabled equipment telematics - connectivity has crossed the mainstream threshold<Ref n={16} /></>,
  },
  {
    label: '6.8M active systems',
    detail: <>telematics units in construction today, on track to double to 12.1M by 2028<Ref n={17} /></>,
  },
  {
    label: 'Data is live',
    detail: 'Every press cycle, sensor reading, and fault event is logged. The stream is continuous. Volume is not the constraint.',
  },
];

const openPosition: { label: string; detail: React.ReactNode }[] = [
  {
    label: 'Zero platforms',
    detail: <>connect tool telemetry to the design specification that governed the job<Ref n={18} /></>,
  },
  {
    label: 'Fleet-layer only',
    detail: 'Location, utilisation, fuel, fault codes - no job, no process step, no specification. The record has no meaning without the layer above it.',
  },
  {
    label: 'Unclaimed',
    detail: 'The vendor who closes this loop sets the integration standard and becomes the reference point for every compliance and liability question that follows.',
  },
];

export function LastPieceSlide() {
  return (
    <SlideLayout
      title="The Last Piece of the Picture"
      subtitle="The specification layer and the equipment layer are both digital. Neither knows the other exists."
    >
      <div className="flex-1 min-h-0 flex flex-row gap-5 items-stretch">

        <div className="flex flex-col justify-center gap-4 shrink-0" style={{ width: '22%' }}>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>
            87% of AEC firms<Ref n={14} /> deliver from digital design software. 72% of contractors<Ref n={16} /> run IoT-enabled equipment. The specification exists. The execution data exists.
          </p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>
            All of that equipment data is fleet-layer: location, utilisation, fuel consumption, fault codes. None of the major telematics platforms connect to a design specification. The data has no semantic context - it does not know what job it is on, what step in what process, or what the specification required.
          </p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>
            The record exists. It does not mean anything without the specification layer above it.
          </p>
        </div>

        <div className="w-px self-stretch shrink-0" style={{ backgroundColor: 'var(--slide-border-primary)', opacity: 0.3 }} />

        <Column heading="The design layer" items={designLayer} />
        <Column heading="The equipment layer" items={equipmentLayer} muted />
        <Column heading="The open position" items={openPosition} accent />

      </div>
    </SlideLayout>
  );
}
