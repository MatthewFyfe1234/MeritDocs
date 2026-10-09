import { SlideLayout } from '@/components/slides/SlideLayout';

export function ValuePropositionSlide() {
  return (
    <SlideLayout title="What MeritOI Does">
      <div className="flex-1 min-h-0 flex items-center justify-center px-16">
        <p
          className="text-xl italic leading-relaxed text-center max-w-3xl"
          style={{ color: 'var(--slide-text)', opacity: 0.85 }}
        >
          MeritOI is a platform that automates delivery orchestration, using currently siloed execution data
          and institutional knowledge to estimate time, cost, materials, and more, and to coordinate people and
          tools.
          <br /><br />
          While orchestrating operations, it gives every party connected to the process, whether that's one
          organisation working alone or an entire industry, the same data as the basis for their own decisions,
          from optimisation to maintenance and staffing.
        </p>
      </div>
    </SlideLayout>
  );
}
