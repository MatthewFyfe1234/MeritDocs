import { SlideLayout } from '@/components/slides/SlideLayout';

const stats = [
  {
    value: '~15',
    label: 'the sympathy group ceiling',
    detail: 'Dunbar\'s research identifies the sympathy group - typically 12-15 people - as the upper limit of close mutual accountability without formal structure. Beyond it, informal social ties can no longer do the governance work',
    ref: 3,
  },
  {
    value: '15-20',
    label: 'members before democratic participation measurably declines',
    detail: 'Case study of the Suma cooperative found that decision quality and participation rates began to deteriorate beyond this threshold. A case-based finding rather than large-sample, but consistent with the broader literature on group cognitive limits',
    ref: 4,
  },
  {
    value: '19.1%',
    label: 'of members participate in any governance decision at scale',
    detail: 'From platform cooperative research - the pattern is consistent with the broader cooperative literature: as organisations scale, participation concentrates in a small minority. Affective commitment is the primary driver, not size alone',
    ref: 2,
  },
  {
    value: '~10yrs',
    label: 'before measurable drift toward managerial concentration',
    detail: 'The typical window before a scaling cooperative shows organisational degeneration: constitutional drift, cultural shift away from founding values, and effective power concentrating in operational leadership',
    ref: 1,
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
      title="The Evidence Base"
      subtitle="What research and post-mortems say about how cooperatives actually perform at scale"
    >
      <div className="flex-1 min-h-0 grid grid-cols-2 gap-4">
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
          <span style={{ color: 'var(--slide-accent)', fontWeight: 700 }}>The pattern is consistent: </span>
          countries are governed by democracy. The difference is institutional infrastructure: formal rules, visible records, clear accountability. Cooperatives that scale without building that infrastructure are not failing at democracy; they are failing to give democracy the tools it needs.
        </p>
      </div>
    </SlideLayout>
  );
}
