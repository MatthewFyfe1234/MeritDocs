import { SlideLayout } from '@/components/slides/SlideLayout';

const mechanisms = [
  {
    label: 'Per-Task Pay',
    body: 'You get paid for the task you ran, whether or not the trial improved anything. Running the trial is never a cost you eat on the hope of a better number.',
  },
  {
    label: 'Gain-Share',
    body: 'If the trial does improve the measured outcome, you keep a share of that gain. Finding the improvement is worth more than hiding one.',
  },
];

export function IncentiveSlide() {
  return (
    <SlideLayout
      title="Incentive, Solved Without a Bolt-On"
      subtitle="Per-task pay plus gain-share aligns the incentive to actually run the trial, without a separate reward mechanism layered on top."
    >
      <div className="flex-1 min-h-0 flex flex-col justify-center gap-4">
        <div className="grid grid-cols-2 gap-4">
          {mechanisms.map(({ label, body }) => (
            <div
              key={label}
              className="rounded-lg px-5 py-4 flex flex-col gap-1.5"
              style={{ backgroundColor: 'var(--slide-bg-accent-muted)', border: '1px solid var(--slide-accent)' }}
            >
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--slide-accent)' }}>
                {label}
              </span>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.85 }}>
                {body}
              </p>
            </div>
          ))}
        </div>

        <p className="text-sm leading-relaxed text-center mt-1" style={{ color: 'var(--slide-accent)' }}>
          Honest participation isn't persuaded. It's what the pay structure already rewards, so nobody has to be
          asked to trust the process on faith.
        </p>
      </div>
    </SlideLayout>
  );
}
