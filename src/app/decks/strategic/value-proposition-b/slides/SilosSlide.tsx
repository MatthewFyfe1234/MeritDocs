import { SlideLayout } from '@/components/slides/SlideLayout';

const rows: { heading: string; items: { label: string; body: string | string[] }[] }[] = [
  {
    heading: "Silos at Every Scale",
    items: [
      {
        label: 'An Individual',
        body: [
          'Holds knowledge that leaves with them when they go.',
          "Can't demonstrate their value to their current employer, or to a new one.",
          'Nothing lets them demonstrate, or drive, change in the process itself, or in how others are trained.',
        ],
      },
      {
        label: 'An Organisation',
        body: [
          "Is blind to its place in the larger process it's part of.",
          'Is unable to demonstrate its own performance to a client, or compare itself against other providers.',
          'Nothing shows it where its own process could improve, or lets it benefit from what other organisations have already learned.',
        ],
      },
    ],
  },
  {
    heading: 'Silos of the Modern Era',
    items: [
      {
        label: 'A Tool',
        body: [
          'Increasingly telemetric, capturing its own performance data, but that data stays locked inside the tool, never recorded against the step it served.',
          "Its actual performance can't be compared against competing tools used for the same step, only against the maker's specifications.",
          'Maintenance and calibration history typically live with the manufacturer or vendor, not attached to the process it actually contributed to.',
        ],
      },
      {
        label: 'Generative AI',
        body: [
          "Its knowledge is spread across billions of uninspectable weights. You can't ask it which source produced a given output.",
          "Impossible to benchmark it against the tools or workers it replaces, on the same terms they're measured on.",
          'No approach to ensuring reporting or documentation on its work is produced, the way it would be for any other agent.',
        ],
      },
    ],
  },
];

export function SilosSlide() {
  return (
    <SlideLayout
      title="The Problem: Silos, Redefined"
      subtitle="A silo has always meant a team or a department. It's broader than that."
    >
      <div className="flex-1 min-h-0 flex flex-col justify-center gap-4">
        {rows.map(({ heading, items }) => (
          <div key={heading} className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--slide-primary)', opacity: 0.6 }}>
              {heading}
            </span>
            <div className="grid grid-cols-2 gap-4">
              {items.map(({ label, body }) => (
                <div
                  key={label}
                  className="rounded-lg px-6 py-5 flex flex-col justify-center gap-2 min-h-[110px]"
                  style={{ backgroundColor: 'var(--slide-bg-card)' }}
                >
                  <span className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--slide-accent)' }}>
                    {label}
                  </span>
                  {Array.isArray(body) ? (
                    <ul className="flex flex-col gap-1.5">
                      {body.map((point, i) => (
                        <li key={i} className="text-sm leading-snug flex items-start gap-1.5" style={{ color: 'var(--slide-text)', opacity: 0.8 }}>
                          <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--slide-accent)', opacity: 0.6 }} />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.8 }}>
                      {body}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}
