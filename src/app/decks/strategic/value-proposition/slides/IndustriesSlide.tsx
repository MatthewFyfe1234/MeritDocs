import { SlideLayout } from '@/components/slides/SlideLayout';

const industries: { label: string; body: string }[] = [
  {
    label: 'Agriculture',
    body: 'Yield, soil, and equipment data collected per field or per season, rarely structured against the process that produced it.',
  },
  {
    label: 'Construction',
    body: 'Specifications, schedules, and site records collected per project, rarely carried forward to inform the next one.',
  },
  {
    label: 'Health',
    body: 'Patient and equipment data collected per encounter, rarely connected to the care process that generated it.',
  },
  {
    label: 'Manufacturing',
    body: 'Machine and material data collected per line, rarely attributed to the specific step that produced it.',
  },
  {
    label: 'Telecommunications',
    body: 'Network performance and maintenance data collected per site or per fault, rarely attributed to the process that caused or resolved it.',
  },
  {
    label: 'Incident Response',
    body: 'Response times, resources, and outcomes recorded per incident, rarely compared across incidents to see what actually works.',
  },
  {
    label: 'Utilities',
    body: 'Energy, water, and grid maintenance data collected per site or per outage, rarely attributed to the process that caused or resolved it.',
  },
];

export function IndustriesSlide() {
  return (
    <SlideLayout
      title="Where Value Applies"
      subtitle="MeritOI releases value wherever data is collected but remains unstructured, with its potential untapped."
    >
      <div className="flex-1 min-h-0 flex flex-col justify-center gap-5">
        <div className="grid grid-cols-4 grid-rows-2 gap-4">
          {industries.map(({ label, body }) => (
            <div
              key={label}
              className="rounded-lg px-5 py-4 flex flex-col gap-2"
              style={{ backgroundColor: 'var(--slide-bg-card)' }}
            >
              <span className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--slide-accent)' }}>
                {label}
              </span>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.85 }}>
                {body}
              </p>
            </div>
          ))}
        </div>

        <p className="text-base leading-relaxed text-center" style={{ color: 'var(--slide-accent)' }}>
          The pattern generalises to any industry with the same shape: process, product, and data that never meet.
        </p>
      </div>
    </SlideLayout>
  );
}
