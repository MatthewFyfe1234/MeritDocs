import { SlideLayout } from '@/components/slides/SlideLayout';

const toCustomer = [
  {
    label: 'Executable Process',
    detail: 'The specification becomes the job plan. Scheduling, workforce allocation, document control, and compliance record - all driven from your design output. The customer gets a structured way to execute what you specified.',
  },
  {
    label: 'Knowledge That Stays',
    detail: 'Your specification defines how the work is done. That knowledge lives in the platform - not in a senior technician\'s notebook or a contractor\'s informal practice. Every job runs against the same design standard. The specification does not degrade.',
  },
  {
    label: 'Compliance Record',
    detail: 'Every step documented against your specification. Certification, audit trail, and liability record managed as a byproduct of normal operations - not a separate admin burden.',
  },
];

const toSoftwareVendor = [
  {
    label: 'Usage Intelligence',
    detail: 'Which workflows are actually followed, which are adapted, and which fail - returned from every job your software runs. Not support tickets. Continuous operational data.',
  },
  {
    label: 'Design Accuracy Feedback',
    detail: 'Where your model\'s assumptions diverged from field conditions - wrong inputs, material substitutions, changed parameters. The gap between specified and executed, at job resolution.',
  },
  {
    label: 'Failure Attribution',
    detail: 'For any failure, the record shows what was specified, what was built, and what deviated. Design fault or execution error - established by the data before the dispute begins.',
  },
];

const competitive = [
  {
    label: 'Performance Evidence',
    detail: 'Specification-to-outcome data the customer generated themselves. Compliance rate, deviation frequency, rework cost - across every job. Not your claim. Their record.',
  },
  {
    label: 'Defensible Liability Position',
    detail: 'When a structural failure occurs, the record shows whether the design was followed. Whether the cause was execution deviation or a design assumption is established by the process record. Your exposure is defined by the data.',
  },
  {
    label: 'Platform Stickiness',
    detail: 'A customer with a year of operational history in the platform does not switch software vendors. The specification history, deviation patterns, and compliance records all live in the platform. Switching cost is structural, not contractual.',
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
      title="What Ships With the Software"
      subtitle="The specification layer sits above execution. For the customer, it is the authority that defines the job. For you, it is the intelligence that improves the next version."
    >
      <div className="flex-1 min-h-0 flex flex-row gap-5 items-stretch">

        <div className="flex flex-col justify-center gap-4 shrink-0" style={{ width: '22%' }}>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>
            The process layer sits inside the daily operation of every customer that runs it. Site teams plan work, coordinate crews, execute jobs, and store documentation within the platform. Every step is recorded against your specification as a byproduct of that normal work.
          </p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>
            For the customer, this means a verified record of what was done - without additional administration. For you, it means a continuous feed of real operational data: how your specification performs in the field, where it diverges from reality, and what the next version should fix.
          </p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>
            The customer gets the process. You get the intelligence.
          </p>
        </div>

        <div className="w-px self-stretch shrink-0" style={{ backgroundColor: 'var(--slide-border-primary)', opacity: 0.3 }} />

        <Column heading="Delivered to the customer" items={toCustomer} />
        <Column heading="Returned to the software vendor" items={toSoftwareVendor} muted />
        <Column heading="Why it wins renewals" items={competitive} accent />

      </div>
    </SlideLayout>
  );
}
