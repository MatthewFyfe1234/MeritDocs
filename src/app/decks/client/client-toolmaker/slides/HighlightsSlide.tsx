import { SlideLayout } from '@/components/slides/SlideLayout';

const toOperator = [
  {
    label: 'Executable Process',
    detail: 'What is the process, how long will it take, which team members have the experience to carry it out - and when does it fit in the schedule. A full project management tool, driven by your process definition.',
  },
  {
    label: 'Knowledge That Stays',
    detail: 'The process lives in the platform, not in anyone\'s head. What the most experienced operator does is encoded in the action sequence and becomes the standard for every operator. Expertise does not retire when they do.',
  },
  {
    label: 'Compliance Record',
    detail: 'Every step documented. Certification, audit trail, and liability record managed as a byproduct of normal operations.',
  },
];

const toManufacturer = [
  {
    label: 'Usage Intelligence',
    detail: 'How the tool is actually used in the field. Every operator, every job type, every configuration - returned to you.',
  },
  {
    label: 'Fault Attribution Record',
    detail: 'For any failure, the record shows whether the tool was within its rated parameters during each preceding step. Design fault or operator deviation - established by the data before the dispute begins. Warranty exposure defined by the record, not the argument.',
  },
  {
    label: 'Design Feedback',
    detail: 'Deviations, failure patterns, and configuration drift feed directly into the next product generation.',
  },
];

const competitive = [
  {
    label: 'Performance Becomes Evidence',
    detail: 'Cycle time, deviation rate, rework frequency - across thousands of executions. Not a marketing claim. A number the contractor produced themselves.',
  },
  {
    label: 'Defensible Liability Position',
    detail: 'When an incident occurs, the record shows what the operator did, in what order, against your specification. Whether the cause was operator deviation or a product defect is established by the process record. Your exposure is defined by the data, not determined by the argument.',
  },
  {
    label: 'The Best Hardware Sales Tool You Have',
    detail: 'When your tool outperforms the alternative in the data the contractor trusts, that is the close. It is not your claim. It is their data.',
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
      title="What Ships With the Tool"
      subtitle="The hardware is connected. The process layer is the missing piece."
    >
      <div className="flex-1 min-h-0 flex flex-row gap-5 items-stretch">

        <div className="flex flex-col justify-center gap-4 shrink-0" style={{ width: '22%' }}>
          <p className="text-sm font-semibold leading-snug" style={{ color: 'var(--slide-primary)' }}>
            The process layer sits above the hardware.
          </p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>
            Contractors adopt it across their whole operation - across suppliers, across tool types. For you, that creates something no competitor can replicate: a direct line from how your tool is used in the field to how you design the next one.
          </p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>
            The operator gets a process. You get the data.
          </p>
        </div>

        <div className="w-px self-stretch shrink-0" style={{ backgroundColor: 'var(--slide-border-primary)', opacity: 0.3 }} />

        <Column heading="Delivered to the operator" items={toOperator} />
        <Column heading="Returned to the manufacturer" items={toManufacturer} muted />
        <Column heading="Why it wins business" items={competitive} accent />

      </div>
    </SlideLayout>
  );
}
