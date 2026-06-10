import { SlideLayout } from '@/components/slides/SlideLayout';

export function ProcessAuthoritySlide() {
  return (
    <SlideLayout>
      <div className="flex-1 min-h-0 flex flex-col justify-center gap-6 px-4">
        <div>
          <p className="text-3xl font-bold leading-tight mb-3" style={{ color: 'var(--slide-primary)', opacity: 0.4 }}>
            Every engineering software company has an origin story. A story in which the problem was not the worker or the material, but the missing structure.
          </p>
          <p className="text-3xl font-bold leading-tight mb-3" style={{ color: 'var(--slide-primary)', opacity: 0.6 }}>
            Which came first, the process or the software? They emerged together. The software encodes the process. The process demands the software.
          </p>
          <p className="text-3xl font-bold leading-tight" style={{ color: 'var(--slide-primary)' }}>
            You are the natural author of process.
          </p>
        </div>

        <p className="text-sm leading-relaxed max-w-2xl" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>
          The software embodies your best understanding of how the work should be done. Its design reflects the correct sequence, the certified calculation, the compliance requirement - years of domain knowledge, encoded in computation. That understanding rarely travels further. It ships with documentation. It lives in the heads of the people who built it. Operators learn approximations of it. What actually happens in the field - where it deviates, what works, what the next version of the software could do differently - does not return.
        </p>
      </div>
    </SlideLayout>
  );
}
