import { SlideLayout } from '@/components/slides/SlideLayout';

const columns = [
  {
    heading: 'Merit brings',
    color: 'var(--slide-primary)',
    items: [
      'Verified execution records for every job',
      'Step-level process model, factory and site',
      'Document verification tied to real work',
      'Anonymised cross-member analytics',
      'Stage-gate enforcement by default',
    ],
  },
  {
    heading: 'FTMA brings',
    color: 'var(--slide-primary)',
    items: [
      'A member network with real scale',
      'Sector authority and negotiating relationships',
      'Direct access to insurers, regulators, and suppliers',
      'The mandate to act on behalf of members',
    ],
  },
  {
    heading: 'Together',
    color: 'var(--slide-accent)',
    items: [
      'Insurance you could not negotiate individually',
      'A talent market no single firm could build',
      'Compliance credibility no firm could establish alone',
      'Procurement leverage no individual buyer could achieve',
      'A sector that compounds, rather than competes, on data',
    ],
  },
];

export function NextStepsSlide() {
  return (
    <SlideLayout
      title="The Opportunity"
      subtitle="Neither Merit nor FTMA can do this alone. Together, the infrastructure and the coordination are both present."
    >
      <div className="flex-1 min-h-0 flex gap-5">
        {columns.map(({ heading, color, items }, ci) => (
          <div
            key={heading}
            className="flex-1 flex flex-col"
            style={{ borderTop: `2px solid ${color}` }}
          >
            <div
              className="text-xs font-bold uppercase tracking-widest mt-2 mb-3"
              style={{ color }}
            >
              {heading}
            </div>
            <div className="flex flex-col gap-2">
              {items.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <div
                    className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: color, opacity: 0.5 }}
                  />
                  <span
                    className="text-xs leading-relaxed"
                    style={{ color: 'var(--slide-text)', opacity: 0.7 }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-4 pt-3 shrink-0 text-xs"
        style={{
          borderTop: '1px solid var(--slide-border-primary)',
          color: 'var(--slide-text)',
          opacity: 0.45,
        }}
      >
        Proposed next step: a pilot with five to ten FTMA members to build the first sector data package and test one collective service.
      </div>
    </SlideLayout>
  );
}
