import { SlideLayout } from '@/components/slides/SlideLayout';

const stats = [
  {
    value: '85%',
    label: 'of projects fail to stay within budget',
    detail: 'Over a 70-year study spanning 20 countries. Financial deviation is the baseline expectation, not the exception',
    ref: 1,
  },
  {
    value: '28%',
    label: 'average cost overrun',
    detail: 'The global average by which projects exceed their original contract value, on development margins typically between 5% and 6%',
    ref: 1,
  },
  {
    value: '25%',
    label: 'of projects meet their original schedule',
    detail: 'Only one in four is delivered on time. The rest absorb prolonged prelims, financing costs, and exposure to material price movements',
    ref: 3,
  },
  {
    value: '70%',
    label: 'of rework is design-induced',
    detail: 'Errors originating in pre-construction decisions that only become visible during execution, at far greater cost to correct',
    ref: 5,
  },
  {
    value: '14 hrs',
    label: 'per week on non-productive tasks',
    detail: 'Project professionals spend 35% of their working week searching for data, resolving conflicts, and managing rework from poor information flow',
    ref: 5,
  },
  {
    value: '12–24',
    label: 'months to know the final profit position',
    detail: 'From practical completion to financial close-out: the standard window before a developer knows whether a scheme made or lost money',
    ref: 4,
  },
];

function Ref({ num }: { num: number }) {
  return (
    <sup className="font-semibold ml-px" style={{ color: 'var(--slide-accent)', fontSize: '0.6rem' }}>
      [{num}]
    </sup>
  );
}

export function GroundTruthSlide() {
  return (
    <SlideLayout
      title="The Case for Ground Truth"
      subtitle="Project delivery benchmarks from global industry research"
    >
      <div className="flex-1 min-h-0 grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <div
            key={s.value + s.label}
            className="bg-white rounded-lg border p-4 flex flex-col shadow-sm"
            style={{ borderColor: 'var(--slide-border)', borderTop: '3px solid var(--slide-primary)' }}
          >
            <div>
              <div className="text-4xl font-bold leading-none" style={{ color: 'var(--slide-primary)' }}>
                {s.value}<Ref num={s.ref} />
              </div>
              <div className="text-xs font-semibold mt-1.5" style={{ color: 'var(--slide-primary)', opacity: 0.7 }}>
                {s.label}
              </div>
            </div>
            <p className="text-xs leading-relaxed mt-3" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>
              {s.detail}
            </p>
          </div>
        ))}
      </div>

      <div
        className="shrink-0 mt-4 rounded-lg p-3"
        style={{ backgroundColor: 'var(--slide-bg-primary-muted)', border: '1px solid var(--slide-border-primary)' }}
      >
        <p className="text-xs font-medium leading-relaxed" style={{ color: 'var(--slide-primary)' }}>
          <span style={{ color: 'var(--slide-accent)', fontWeight: 700 }}>The pattern: </span>
          design errors account for 70% of rework<Ref num={5} /> but only surface during execution, when they are most expensive to fix. By the time the numbers arrive, the window to act has been closed for months — and the final profit position is still 12 to 24 months away.<Ref num={4} />
        </p>
      </div>
    </SlideLayout>
  );
}
