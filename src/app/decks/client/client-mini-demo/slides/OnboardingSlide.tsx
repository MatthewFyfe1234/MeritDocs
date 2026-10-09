import { Users, Cog, Rocket, CalendarRange, Clock3 } from 'lucide-react';
import { SlideLayout } from '@/components/slides/SlideLayout';

const steps = [
  {
    meet: 'First meet',
    meetDetail: 'Understand skillsets, tools and materials required, and scope of products',
    duration: '1 hour',
    role: 'Whole-operation perspective',
    build: 'Preliminary base configuration',
    buildDuration: '1 week',
  },
  {
    meet: 'Second meet',
    meetDetail: 'Review preliminary base configuration for process, result and inventory',
    duration: '1 hour',
    role: 'Whole-operation perspective',
    build: 'Refine the configuration',
    buildDuration: '1 week',
  },
  {
    meet: 'Build a first spec',
    meetDetail: 'Discuss rules typically used to create a specification, and product types',
    duration: '60–90 min',
    role: 'Estimator',
    build: 'Configure specification calculations and reports',
    buildDuration: '1–2 weeks',
  },
  {
    meet: 'Review spec',
    meetDetail: 'Review specification and reports',
    duration: '30–60 min',
    role: 'Estimator',
    build: 'Implement any changes or additions required',
    buildDuration: '1 week',
  },
];

export function OnboardingSlide() {
  return (
    <SlideLayout
      title="Where We Begin"
      subtitle="A handful of short meetings, each followed by a week or two of configuration work on our side."
    >
      <div className="flex-1 min-h-0 flex flex-col gap-2">

        <div className="flex-1 min-h-0 flex gap-4">

          {/* Left: summary panel */}
          <div className="shrink-0 flex flex-col gap-3" style={{ width: '420px' }}>

            <div className="flex-1 min-h-0 rounded-lg p-4 flex flex-col items-center justify-center text-center gap-1.5"
              style={{ backgroundColor: 'var(--slide-bg-primary-muted)', border: '1px solid var(--slide-border-primary)' }}>
              <CalendarRange className="w-5 h-5" style={{ color: 'var(--slide-primary)' }} />
              <div className="text-3xl font-bold leading-tight" style={{ color: 'var(--slide-primary)' }}>~1 month</div>
              <div className="text-xs leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>Overall, first meet to running project</div>
            </div>

            <div className="flex-1 min-h-0 rounded-lg p-4 flex flex-col items-center justify-center text-center gap-1.5"
              style={{ backgroundColor: 'var(--slide-bg-accent-muted)', border: '1.5px solid var(--slide-accent)' }}>
              <Clock3 className="w-5 h-5" style={{ color: 'var(--slide-accent)' }} />
              <div className="text-3xl font-bold leading-tight" style={{ color: 'var(--slide-accent)' }}>~5–10 hrs</div>
              <div className="text-xs leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>Client time, distributed across the team</div>
            </div>

          </div>

          {/* Right: step breakdown */}
          <div className="flex-1 min-h-0 flex flex-col gap-1.5">

            {steps.map((s, i) => (
              <div key={s.meet} className="flex-1 min-h-0 flex items-stretch gap-2">

                {/* Step number */}
                <div className="shrink-0 flex items-start pt-1" style={{ width: '20px' }}>
                  <span className="text-xs font-bold" style={{ color: 'var(--slide-primary)', opacity: 0.4 }}>{i + 1}</span>
                </div>

                {/* Meeting card */}
                <div className="flex-1 min-h-0 min-w-0 flex flex-col justify-center rounded-lg px-3 py-2"
                  style={{ backgroundColor: 'var(--slide-bg-primary-muted)', border: '1px solid var(--slide-border-primary)' }}>
                  <div className="flex items-center gap-2 mb-0.5">
                    <Users className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--slide-primary)' }} />
                    <span className="text-xs font-semibold" style={{ color: 'var(--slide-primary)' }}>{s.meet}</span>
                    <span className="text-[10px] shrink-0 ml-auto" style={{ color: 'var(--slide-text)', opacity: 0.5 }}>{s.duration} · {s.role}</span>
                  </div>
                  <p className="text-xs leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.7 }}>{s.meetDetail}</p>
                </div>

                {/* Arrow */}
                <div className="shrink-0 flex items-center" style={{ width: '20px' }}>
                  <div style={{ flex: 1, borderTop: '1.5px solid var(--slide-border-primary)' }} />
                </div>

                {/* Our work card */}
                <div className="shrink-0 flex flex-col justify-center rounded-lg px-3 py-2" style={{ width: '210px' }}>
                  <div className="flex items-center gap-2 mb-0.5">
                    <Cog className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--slide-accent)' }} />
                    <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: 'var(--slide-accent)', opacity: 0.8 }}>{s.buildDuration}</span>
                  </div>
                  <p className="text-xs leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.7 }}>{s.build}</p>
                </div>

              </div>
            ))}

          </div>

        </div>

        {/* Run project - full width */}
        <div className="shrink-0 flex items-center gap-2 rounded-lg px-5 py-2.5"
          style={{ backgroundColor: 'var(--slide-bg-accent-muted)', borderLeft: '4px solid var(--slide-accent)' }}>
          <Rocket className="w-4 h-4 shrink-0" style={{ color: 'var(--slide-accent)' }} />
          <span className="text-sm font-semibold" style={{ color: 'var(--slide-accent)' }}>Run project</span>
        </div>

      </div>
    </SlideLayout>
  );
}
