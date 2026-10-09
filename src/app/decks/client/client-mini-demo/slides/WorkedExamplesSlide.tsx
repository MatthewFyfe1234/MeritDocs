import { Zap, Cpu, Clock, Receipt, Plus, Equal, DollarSign, CalendarDays, TrendingDown, Waypoints } from 'lucide-react';
import { SlideLayout } from '@/components/slides/SlideLayout';

const energyFlow = [
  { Icon: Zap, label: 'Electricity Rate', sub: '$/kWh, company-wide' },
  { Icon: Cpu, label: "Tool's Draw Rate", sub: 'kWh per hour of use' },
  { Icon: Clock, label: 'Time on This Step', sub: 'hours the tool runs' },
];

const idleFlow = [
  { Icon: DollarSign, label: 'Salary Rate', sub: 'per worker' },
  { Icon: Clock, label: 'Time Worked', sub: 'hours logged, this month' },
  { Icon: CalendarDays, label: 'Time on Projects', sub: 'from the calendar' },
];

const knockOnTriggers = [
  'A step that runs long',
  'A tool reassigned mid-job',
  'A spec that changes after work has started',
];

export function WorkedExamplesSlide() {
  return (
    <SlideLayout
      title="Combining Metrics Across the Sources"
      subtitle="Worked examples of what the convergence actually calculates."
    >
      <div className="flex-1 min-h-0 flex gap-3">

        <div className="flex-1 min-h-0 flex flex-col gap-3">

          {/* Worked example: energy cost of a tool, rolled into a quotation */}
          <div className="flex-1 min-h-0 rounded-lg p-3 flex flex-col gap-2"
            style={{ backgroundColor: 'var(--slide-bg-primary-muted)', border: '1px solid var(--slide-border-primary)' }}>
            <span className="text-xs font-semibold" style={{ color: 'var(--slide-primary)' }}>
              Worked Example: a Tool's Energy Cost, Rolled Into the Quotation
            </span>
            <div className="flex items-center gap-2">
              {energyFlow.map(({ Icon, label, sub }, i) => (
                <div key={label} className="flex items-center gap-2">
                  {i > 0 && <Plus className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--slide-primary)', opacity: 0.4 }} />}
                  <div className="flex-1 flex flex-col items-center text-center rounded-md px-2 py-1.5 gap-0.5"
                    style={{ backgroundColor: 'var(--slide-bg-card)', border: '1px solid var(--slide-border-primary)' }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: 'var(--slide-primary)' }} />
                    <span className="text-xs font-semibold leading-tight" style={{ color: 'var(--slide-primary)' }}>{label}</span>
                    <span className="text-[10px] leading-tight" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>{sub}</span>
                  </div>
                </div>
              ))}
              <Equal className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--slide-accent)' }} />
              <div className="flex-1 flex flex-col items-center text-center rounded-md px-2 py-1.5 gap-0.5"
                style={{ backgroundColor: 'var(--slide-bg-accent-muted)', border: '1.5px solid var(--slide-accent)' }}>
                <Receipt className="w-3.5 h-3.5" style={{ color: 'var(--slide-accent)' }} />
                <span className="text-xs font-semibold leading-tight" style={{ color: 'var(--slide-accent)' }}>Energy Cost, This Tool</span>
                <span className="text-[10px] leading-tight" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>for this job, this step</span>
              </div>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.7 }}>
              Summed with the same calculation for every other tool used on the job, this becomes a direct, defensible line in the quotation, not an estimate.
            </p>
          </div>

          {/* Worked example: value of time not spent on projects */}
          <div className="flex-1 min-h-0 rounded-lg p-3 flex flex-col gap-2"
            style={{ backgroundColor: 'var(--slide-bg-primary-muted)', border: '1px solid var(--slide-border-primary)' }}>
            <span className="text-xs font-semibold" style={{ color: 'var(--slide-primary)' }}>
              Worked Example: the Value of Time Not Spent on Projects
            </span>
            <div className="flex items-center gap-2">
              {idleFlow.map(({ Icon, label, sub }, i) => (
                <div key={label} className="flex items-center gap-2">
                  {i > 0 && <Plus className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--slide-primary)', opacity: 0.4 }} />}
                  <div className="flex-1 flex flex-col items-center text-center rounded-md px-2 py-1.5 gap-0.5"
                    style={{ backgroundColor: 'var(--slide-bg-card)', border: '1px solid var(--slide-border-primary)' }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: 'var(--slide-primary)' }} />
                    <span className="text-xs font-semibold leading-tight" style={{ color: 'var(--slide-primary)' }}>{label}</span>
                    <span className="text-[10px] leading-tight" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>{sub}</span>
                  </div>
                </div>
              ))}
              <Equal className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--slide-accent)' }} />
              <div className="flex-1 flex flex-col items-center text-center rounded-md px-2 py-1.5 gap-0.5"
                style={{ backgroundColor: 'var(--slide-bg-accent-muted)', border: '1.5px solid var(--slide-accent)' }}>
                <TrendingDown className="w-3.5 h-3.5" style={{ color: 'var(--slide-accent)' }} />
                <span className="text-xs font-semibold leading-tight" style={{ color: 'var(--slide-accent)' }}>Idle Cost, Last Month</span>
                <span className="text-[10px] leading-tight" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>per worker, summed up</span>
              </div>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.7 }}>
              Summed across every worker, this is what time not spent on any project cost last month, visible before it becomes a pattern.
            </p>
          </div>

        </div>

        {/* Knock-on effects: a third class, spanning both worked examples */}
        <div className="shrink-0 flex flex-col gap-2 rounded-lg p-3" style={{ width: '352px', backgroundColor: 'var(--slide-bg-accent-muted)', border: '1.5px solid var(--slide-accent)' }}>
          <div className="flex items-center gap-2">
            <Waypoints className="w-4 h-4 shrink-0" style={{ color: 'var(--slide-accent)' }} />
            <span className="text-xs font-semibold" style={{ color: 'var(--slide-accent)' }}>
              Knock-On Effects
            </span>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.75 }}>
            Not every calculation lives inside a single job. A change in one can ripple into every job downstream of it that shares the same resource or queue:
          </p>
          <ul className="flex flex-col gap-1">
            {knockOnTriggers.map((t) => (
              <li key={t} className="text-xs leading-snug flex items-start gap-2" style={{ color: 'var(--slide-text)', opacity: 0.75 }}>
                <span className="mt-1 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: 'var(--slide-accent)' }} />
                {t}
              </li>
            ))}
          </ul>
          <p className="text-xs leading-relaxed flex-1" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>
            The same model that prices one job also shows what moves when that job does.
          </p>
        </div>

      </div>
    </SlideLayout>
  );
}
