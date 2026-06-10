import { SlideLayout } from '@/components/slides/SlideLayout';

const toCity = [
  {
    label: 'Uptime Visibility',
    detail: 'Live view of fleet readiness, scheduled maintenance status, and SLA compliance across the contract. Nothing hidden, nothing assumed.',
  },
  {
    label: 'Certified Process',
    detail: 'Every technician works from the manufacturer\'s specification. The correct procedure is enforced, not advised. Deviations are recorded. The process lives in the platform - not in anyone\'s head. Staff turnover does not take the knowledge with it.',
  },
  {
    label: 'Network Consistency',
    detail: 'What the best technician does becomes what every technician does. Service quality is a system property, not an individual one.',
  },
];

const toManufacturer = [
  {
    label: 'Usage Intelligence',
    detail: 'How equipment is actually operated and maintained - what procedures were followed, what was skipped, what preceded each failure - returned from every vehicle in service.',
  },
  {
    label: 'Warranty Intelligence',
    detail: 'Failure patterns visible before the claims arrive. Design feedback from real operational data rather than warranty logs and service reports.',
  },
  {
    label: 'Audit Trail',
    detail: 'Every service event documented against your specification, with the crew who performed it. When warranty claims arrive, the record establishes whether procedure was followed - before it becomes a dispute.',
  },
];

const competitive = [
  {
    label: 'SLA Performance as Evidence',
    detail: 'A Merit service record converts your uptime commitment into a documented, timestamped proof of delivery. Contract renewal is a data review, not a negotiation.',
  },
  {
    label: 'Total Cost of Ownership Case',
    detail: 'Predictive maintenance data, parts ordering efficiency, and fewer emergency callouts create a measurable TCO advantage. The numbers are in the record.',
  },
  {
    label: 'Defensible Liability Position',
    detail: 'When an incident occurs, the Merit record shows what was done, in what order, by whom. Whether the cause was operator conduct or a manufacturing defect is established by the record, not argued after the fact. Your liability is defined by the process, not disputed in court.',
  },
];

function Column({
  heading,
  items,
  muted,
  accent,
}: {
  heading: string;
  items: { label: string; detail: string }[];
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

export function HighlightsSlide() {
  return (
    <SlideLayout
      title="Aligned by Evidence"
      subtitle="The process layer sits above the hardware. For the city, it is the proof of service. For you, it is the intelligence that makes the next contract unassailable."
    >
      <div className="flex-1 min-h-0 flex flex-row gap-5 items-stretch">

        <div className="flex flex-col justify-center gap-4 shrink-0" style={{ width: '22%' }}>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>
            Merit sits inside the daily operation of every municipal fleet that runs it. Operators plan routes, schedule staff, execute jobs and store documentation within the platform. The process layer records every step against the manufacturer's specification as a byproduct of that normal work.
          </p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>
            For the city, this means provable service delivery without additional administration. For you, it means a continuous feed of real operational data - how your equipment actually performs, where failures originate, and what the next contract should cost.
          </p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>
            The city gets the proof. You get the intelligence.
          </p>
        </div>

        <div className="w-px self-stretch shrink-0" style={{ backgroundColor: 'var(--slide-border-primary)', opacity: 0.3 }} />

        <Column heading="Delivered to the city" items={toCity} />
        <Column heading="Returned to the manufacturer" items={toManufacturer} muted />
        <Column heading="Why it wins renewals" items={competitive} accent />

      </div>
    </SlideLayout>
  );
}
