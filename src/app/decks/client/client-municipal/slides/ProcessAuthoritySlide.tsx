import { SlideLayout } from '@/components/slides/SlideLayout';

const domains = [
  {
    label:  'Vehicle as Specification',
    detail: 'Your vehicle already encodes the process. The maintenance sequence, the operating parameters, the safe load limits - it is built into the design. Merit makes it explicit and executable in the field.',
  },
  {
    label:  'Process as Contract',
    detail: 'The process you designed for ships with every vehicle. When it is followed, performance is predictable. When it is not, you need a record that says so. Your domain knowledge becomes a defensible position in every service contract renewal.',
  },
  {
    label:  'Execution as Feedback',
    detail: 'Field data returns to you. What actually happens on the route and in the workshop refines what you thought you knew - and feeds directly into how you price the next contract and design the next generation.',
  },
];

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
