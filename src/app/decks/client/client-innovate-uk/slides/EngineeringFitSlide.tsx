import { ArrowRight } from 'lucide-react';
import { SlideLayout } from '@/components/slides/SlideLayout';

const stages = [
  {
    code: 'ETO',
    name: 'Engineer-to-Order',
    body: "Design starts from the customer's spec. Every job is already its own project.",
    fit: 'Clean fit',
    clean: true,
  },
  {
    code: 'MTO',
    name: 'Make-to-Order',
    body: 'Known design, built on receipt of an order. One job, one spec, one execution record.',
    fit: 'Clean fit',
    clean: true,
  },
  {
    code: 'ATO',
    name: 'Assemble-to-Order',
    body: 'Stocked components, configured and assembled to the order.',
    fit: 'Clean fit',
    clean: true,
  },
  {
    code: 'MTS',
    name: 'Make-to-Stock',
    body: 'Produced ahead of any order, against a forecast rather than a spec.',
    fit: 'Needs reframing',
    clean: false,
  },
];

export function EngineeringFitSlide() {
  return (
    <SlideLayout
      title="Where We Sit, in Manufacturing"
      subtitle="Across the engineering-to-stock spectrum, the model fits cleanly wherever a unit of work carries its own specification. It weakens where production runs ahead of any order."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        {stages.map((s, i) => (
          <div key={s.code} className="contents">
            <div
              className="flex-1 h-full rounded-lg p-4 flex flex-col gap-2 shadow-md"
              style={{
                backgroundColor: s.clean ? 'var(--slide-bg-primary-muted)' : 'var(--slide-bg-muted)',
                border: s.clean ? '1.5px solid var(--slide-border-primary)' : '1.5px dashed var(--slide-border)',
              }}
            >
              <div className="text-2xl font-bold" style={{ color: 'var(--slide-primary)' }}>
                {s.code}
              </div>
              <div className="text-xs font-semibold" style={{ color: 'var(--slide-text)', opacity: 0.75 }}>
                {s.name}
              </div>
              <div className="w-8 h-px" style={{ backgroundColor: 'var(--slide-border-primary)' }} />
              <p className="text-xs leading-relaxed flex-1" style={{ color: 'var(--slide-text)', opacity: 0.7 }}>
                {s.body}
              </p>
              <div
                className="self-start text-xs font-semibold uppercase tracking-wide px-2 py-1 rounded"
                style={{
                  color: s.clean ? 'var(--slide-accent)' : 'var(--slide-text)',
                  backgroundColor: s.clean ? 'var(--slide-bg-accent-muted)' : 'var(--slide-bg)',
                  opacity: s.clean ? 1 : 0.7,
                }}
              >
                {s.fit}
              </div>
            </div>
            {i < stages.length - 1 && (
              <ArrowRight className="w-5 h-5 shrink-0 mx-2" style={{ color: 'var(--slide-primary)', opacity: 0.4 }} />
            )}
          </div>
        ))}
      </div>

      <p className="text-sm leading-relaxed text-center mt-4" style={{ color: 'var(--slide-accent)' }}>
        The first three are native: every job already carries a spec. MTS asks the model to treat a production run,
        not an order, as the project - a real question, and a different one.
      </p>
    </SlideLayout>
  );
}
