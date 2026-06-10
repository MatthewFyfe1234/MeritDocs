import { SlideLayout } from '@/components/slides/SlideLayout';

export function PropositionSlide() {
  return (
    <SlideLayout>

      <div className="flex-1 min-h-0 flex flex-col justify-center px-4">
        <p className="text-3xl font-bold leading-tight mb-4" style={{ color: 'var(--slide-primary)', opacity: 0.7 }}>
          For your members: a purpose-built delivery platform to outcompete onsite construction.
        </p>
        <p className="text-3xl font-bold leading-tight" style={{ color: 'var(--slide-primary)' }}>
          For driving demand: a case study for every project.
        </p>
      </div>


</SlideLayout>
  );
}
