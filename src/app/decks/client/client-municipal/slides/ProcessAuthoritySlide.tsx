import { SlideLayout } from '@/components/slides/SlideLayout';

export function ProcessAuthoritySlide() {
  return (
    <SlideLayout>

      <div className="flex-1 min-h-0 flex flex-col justify-center gap-6 px-4">
        <div>
          <p className="text-3xl font-bold leading-tight mb-3" style={{ color: 'var(--slide-primary)', opacity: 0.4 }}>
            Every municipal vehicle manufacturer has an origin story. A story in which the worker blamed their tool, but not as an excuse.
          </p>
          <p className="text-3xl font-bold leading-tight mb-3" style={{ color: 'var(--slide-primary)', opacity: 0.6 }}>
            Which came first, the process or the tool? They emerged together. The vehicle encodes the process. The process demands the vehicle.
          </p>
          <p className="text-3xl font-bold leading-tight" style={{ color: 'var(--slide-primary)' }}>
            You are the natural author of process.
          </p>
        </div>

        <p className="text-sm leading-relaxed max-w-2xl" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>
          The vehicle embodies your best understanding of how the work should be done. Its design reflects the correct maintenance sequence, the safe operating loads, the service intervals - years of domain knowledge, encoded in the machine. That understanding rarely travels further. It ships with a manual. It lives in the heads of the engineers who built it. Operators learn approximations of it, municipalities rely on assurances, and what actually happens on the route - how the vehicle is operated, whether maintenance sequences are followed, where failures originate - does not return. The next contract is priced on the same assumptions. The next generation of the vehicle is designed with the same gaps.
        </p>
      </div>

    </SlideLayout>
  );
}
