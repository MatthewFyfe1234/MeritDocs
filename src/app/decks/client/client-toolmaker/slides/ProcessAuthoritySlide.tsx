import { SlideLayout } from '@/components/slides/SlideLayout';

export function ProcessAuthoritySlide() {
  return (
    <SlideLayout>

      <div className="flex-1 min-h-0 flex flex-col justify-center gap-6 px-4">
        <div>
          <p className="text-3xl font-bold leading-tight mb-3" style={{ color: 'var(--slide-primary)', opacity: 0.4 }}>
            Every toolmaker has an origin story. A story in which the worker blamed their tool, but not as an excuse.
          </p>
          <p className="text-3xl font-bold leading-tight mb-3" style={{ color: 'var(--slide-primary)', opacity: 0.6 }}>
            So which came first, the process or the tool? They emerged together. The tool encodes the process. The process demands the tool.
          </p>
          <p className="text-3xl font-bold leading-tight" style={{ color: 'var(--slide-primary)' }}>
            You are the natural author of process.
          </p>
        </div>

        <p className="text-sm leading-relaxed max-w-2xl" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>
          The tool embodies your best understanding of how the work should be done. Its design reflects the correct sequence, the safe operation, the optimal configuration - years of domain knowledge, encoded in hardware. That understanding rarely travels further. It ships with a manual. It lives in the heads of the people who built it. Operators learn approximations of it. What actually happens in the field - where it deviates, what works, what the next generation of the tool could do differently - doesn't return.
        </p>
      </div>

    </SlideLayout>
  );
}
