import { SlideLayout } from '@/components/slides/SlideLayout';

const rows = [
  {
    label: 'Generic Inputs',
    body: 'Materials, education, insurance, legislation — not just tools. Every generic input can use the same perspective and the same data to improve its own offering, the way the toolmaker did.',
  },
  {
    label: 'State-Attenuation Problems',
    body: 'Any production is a matter of moving toward a desired state. The same graph, and the same transparency, apply wherever that’s true — not only in construction.',
  },
  {
    label: 'The Generic Product Consumer',
    body: 'Transparency doesn’t stop at the producing organisation. Whoever consumes the product gets the same visibility into how it was actually delivered.',
  },
];

export function GeneralisationSlide() {
  return (
    <SlideLayout
      title="Nothing Here Was Ever Specific"
      subtitle="Construction was the domain. Tools were the entry point. The argument doesn't need either."
    >
      <div className="flex-1 min-h-0 flex flex-col justify-center gap-3">
        {rows.map(({ label, body }) => (
          <div
            key={label}
            className="rounded-lg px-5 py-4 flex flex-col gap-1.5"
            style={{ backgroundColor: 'var(--slide-bg-card)' }}
          >
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--slide-accent)' }}>
              {label}
            </span>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.8 }}>
              {body}
            </p>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}
