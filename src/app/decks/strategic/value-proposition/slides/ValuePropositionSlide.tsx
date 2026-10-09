import { SlideLayout } from '@/components/slides/SlideLayout';

export function ValuePropositionSlide() {
  return (
    <SlideLayout title="What MeritOI Is">
      <div className="flex-1 min-h-0 flex items-center justify-center px-16">
        <p
          className="text-xl italic leading-relaxed text-center max-w-3xl"
          style={{ color: 'var(--slide-text)', opacity: 0.85 }}
        >
          MeritOI is a fully automated delivery orchestration platform, which uses currently siloed execution data
          and institutional knowledge to automate the estimation of time, costs and materials, and the coordination
          of people and tools.
          <br /><br />
          While orchestrating operations, MeritOI provides management with unified process-centric analytics,
          surfacing performance and highlighting opportunities to reduce costs and improve quality and customer
          service.
          <br /><br />
          MeritOI releases value across industries, from agriculture to construction, and from health to
          manufacturing, wherever data is collected but remains unstructured, with its potential untapped.
        </p>
      </div>
    </SlideLayout>
  );
}
