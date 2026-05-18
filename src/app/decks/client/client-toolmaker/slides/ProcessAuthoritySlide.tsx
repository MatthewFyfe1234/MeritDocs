import { SlideLayout } from '@/components/slides/SlideLayout';

const domains = [
  {
    label:  'Tool as Specification',
    detail: 'Your tool already encodes the process. The sequence, the parameters, the safe operation - it is built into the function. Merit makes it explicit and executable.',
  },
  {
    label:  'Process as Product',
    detail: 'The process ships with the tool. Every operator runs from your specification. Your domain knowledge becomes a deliverable in its own right.',
  },
  {
    label:  'Execution as Feedback',
    detail: 'Field data returns to you. What actually happens in practice refines what you thought you knew - and feeds directly into how you design the next generation.',
  },
];

export function ProcessAuthoritySlide() {
  return (
    <SlideLayout>

      <div className="flex-1 min-h-0 flex flex-col justify-center gap-6 px-4">
        <div>
          <p className="text-3xl font-bold leading-tight mb-3" style={{ color: 'var(--slide-primary)', opacity: 0.4 }}>
            Every toolmaker has an origin story. A story in which the worker blamed their tool, but not as an excuse.
          </p>
          <p className="text-3xl font-bold leading-tight mb-3" style={{ color: 'var(--slide-primary)', opacity: 0.6 }}>
            Which came first, the process or the tool? They emerged together. The tool encodes the process. The process demands the tool.
          </p>
          <p className="text-3xl font-bold leading-tight" style={{ color: 'var(--slide-primary)' }}>
            You are the natural author of process.
          </p>
        </div>

        <p className="text-sm leading-relaxed max-w-2xl" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>
          The tool embodies your best understanding of how the work should be done. Its design reflects the correct sequence, the safe operation, the optimal configuration - years of domain knowledge, encoded in hardware. That understanding rarely travels further. It ships with a manual. It lives in the heads of the people who built it. Operators learn approximations of it. What actually happens in the field - where it deviates, what works, what the next generation of the tool could do differently - doesn't return.
        </p>
      </div>

      <div
        className="shrink-0 flex items-stretch gap-px rounded-lg overflow-hidden"
        style={{ border: '1px solid var(--slide-border-primary)' }}
      >
        {domains.map((d, i) => (
          <div
            key={d.label}
            className="flex-1 flex flex-col justify-center px-5 py-3 gap-1"
            style={{
              backgroundColor: 'var(--slide-bg-primary-muted)',
              borderLeft: i > 0 ? '1px solid var(--slide-border-primary)' : 'none',
            }}
          >
            <div className="text-xs font-semibold" style={{ color: 'var(--slide-primary)' }}>{d.label}</div>
            <div className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.55 }}>{d.detail}</div>
          </div>
        ))}
      </div>

    </SlideLayout>
  );
}
