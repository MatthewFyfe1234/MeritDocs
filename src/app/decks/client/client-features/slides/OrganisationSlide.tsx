import { SlideLayout } from '@/components/slides/SlideLayout';

const groupsBase: { label: string; items: string[] }[] = [
  {
    label: 'Jobs',
    items: [
      'Quote more accurately as your cost history grows',
      'Know which jobs made money and why',
      'Understand what went wrong on those that didn\'t',
      'See which bids didn\'t convert, what they cost to estimate, and why you lost them',
      'Identify where supply fell short of capacity - which job types, which clients',
    ],
  },
  {
    label: 'People',
    items: [
      'Set pay rates grounded in what work actually costs',
      'Schedule leave without creating capacity gaps',
      'Identify where training would improve outcomes',
      'Know when to hire before a skills gap limits capacity',
    ],
  },
  {
    label: 'Tools and Materials',
    items: [
      'Rank performance across suppliers and products',
      'Spot which tools are being overworked',
      'Time purchases before availability becomes a constraint',
      'Predict maintenance needs before tools fail on a job',
    ],
  },
  {
    label: 'Stock',
    items: [
      'Hold the right amount, calibrated to actual demand',
    ],
  },
];

export function OrganisationSlide({ notes = {} }: { notes?: Record<string, string> }) {
  const groups = groupsBase.map(g => ({ ...g, note: notes[g.label] }));

  return (
    <SlideLayout
      title="The Feedback Loop"
      subtitle="If you capture outcomes against delivery, the platform builds a picture of how your business actually performs."
    >
      <div
        className="flex-1 min-h-0 grid gap-x-8 gap-y-5"
        style={{ gridTemplateColumns: '1fr 1fr', alignContent: 'start' }}
      >
        {groups.map(({ label, items, note }) => (
          <div key={label} className="flex flex-col gap-2">
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--slide-primary)', opacity: 0.7 }}
            >
              {label}
            </span>
            <div
              className="flex flex-col gap-1.5"
              style={{ borderTop: '1px solid var(--slide-border-primary)', paddingTop: '0.5rem' }}
            >
              {items.map((item) => (
                <div key={item} className="flex gap-2 items-start">
                  <span
                    className="shrink-0 mt-1"
                    style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: 'var(--slide-accent)', opacity: 0.6, display: 'inline-block' }}
                  />
                  <span className="text-xs leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.7 }}>
                    {item}
                  </span>
                </div>
              ))}
              {note && (
                <p className="text-xs leading-snug italic mt-1" style={{ color: 'var(--slide-text)', opacity: 0.45 }}>
                  {note}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}
