import { Gauge, CalendarClock, Boxes, Timer, Send, Target } from 'lucide-react';
import { SlideLayout } from '@/components/slides/SlideLayout';

const outcomes = [
  {
    Icon: Timer,
    title: 'Less time spent quoting',
    text: 'Estimating is understaffed everywhere. The model carries the forecasting load, not another hire.',
  },
  {
    Icon: Send,
    title: 'Less time until it lands',
    text: "A slower quote can lose the job before it's even delivered. Turnaround is a competitive edge, not just an efficiency gain.",
  },
  {
    Icon: Target,
    title: 'More accurate quotations',
    text: 'Fewer costly surprises after the job is won, and fewer jobs quoted so cautiously that you lose them on price.',
  },
];

const forecasts = [
  {
    Icon: Gauge,
    title: 'Time, Carbon & Energy',
    text: 'Forecast from how comparable work has actually performed, not a rule of thumb.',
  },
  {
    Icon: CalendarClock,
    title: 'Calendar & Scheduling',
    text: 'Dates set against what the whole project team can actually absorb.',
  },
  {
    Icon: Boxes,
    title: 'Material Quantities',
    text: 'Calculated directly from the spec, not re-keyed by hand from drawings.',
  },
];

export function QuotationsSlide() {
  return (
    <SlideLayout
      title="Quotations, Backed by a History of Real Jobs"
      subtitle="Every closed job sharpens the next quote."
    >
      <div className="flex-1 min-h-0 flex gap-4">

        {/* Left: outcomes */}
        <div className="flex flex-col gap-3" style={{ width: '28%' }}>
          {outcomes.map(({ Icon, title, text }) => (
            <div
              key={title}
              className="flex-1 min-h-0 flex flex-col justify-center rounded-lg p-2.5 gap-1"
              style={{ backgroundColor: 'var(--slide-bg-accent-muted)', borderLeft: '4px solid var(--slide-accent)' }}
            >
              <div className="flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--slide-accent)' }} />
                <span className="text-xs font-bold leading-snug" style={{ color: 'var(--slide-accent)' }}>{title}</span>
              </div>
              <p className="text-xs leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.7 }}>{text}</p>
            </div>
          ))}
        </div>

        {/* Right: mechanism, narrower, still a row */}
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <div className="text-xs font-semibold uppercase tracking-widest shrink-0" style={{ color: 'var(--slide-primary)', opacity: 0.5 }}>
            How
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-2">
            {forecasts.map(({ Icon, title, text }) => (
              <div
                key={title}
                className="flex flex-col rounded-lg p-2.5 gap-1.5"
                style={{ backgroundColor: 'var(--slide-bg-primary-muted)', border: '1px solid var(--slide-border-primary)' }}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--slide-primary)' }} />
                <span className="text-xs font-semibold leading-snug" style={{ color: 'var(--slide-primary)' }}>{title}</span>
                <p className="text-xs leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </SlideLayout>
  );
}
