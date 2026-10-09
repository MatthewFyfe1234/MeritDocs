import { SlideLayout } from '@/components/slides/SlideLayout';

const beats: { label: string; body: string }[] = [
  {
    label: 'An Individual',
    body: 'Holds knowledge of how they actually work, gained over years, that nobody else can see and that leaves with them when they do.',
  },
  {
    label: 'An Organisation',
    body: 'Knows its own operation, but not how it fits into the larger process it is one part of, or how its inputs compare to any other provider.',
  },
  {
    label: 'A Tool',
    body: 'Runs, wears, and performs, but none of that performance is ever recorded against the step it was used for.',
  },
];

export function ProblemRestatementSlide() {
  return (
    <SlideLayout
      title="The Problem: Silos, Redefined"
      subtitle="A silo has always meant a team or a department. It's broader than that: from an individual to a tool to an entire organisation, it's the same object, just walled off differently."
    >
      <div className="flex-1 min-h-0 flex flex-col justify-center gap-4">
        <div className="grid grid-cols-3 gap-4">
          {beats.map(({ label, body }) => (
            <div
              key={label}
              className="rounded-lg px-5 py-4 flex flex-col gap-2"
              style={{ backgroundColor: 'var(--slide-bg-card)' }}
            >
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--slide-accent)' }}>
                {label}
              </span>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.85 }}>
                {body}
              </p>
            </div>
          ))}
        </div>

        <p className="text-base leading-relaxed text-center" style={{ color: 'var(--slide-accent)' }}>
          At every scale, the object is the same: something producing real information about the process,
          walled off from anyone who could use it.
        </p>
      </div>
    </SlideLayout>
  );
}
