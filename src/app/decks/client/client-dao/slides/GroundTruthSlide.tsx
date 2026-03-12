import { SlideLayout } from '@/components/slides/SlideLayout';

const stats = [
  {
    value: '8%',
    label: 'worker absenteeism at Fagor vs. 4% industry average',
    detail: 'The productivity gap that emerges when collective ownership fails to maintain the connection between individual contribution and collective outcome. Fagor collapsed with $1.5B in debt in 2013',
    ref: 2,
  },
  {
    value: '85%',
    label: 'of construction projects exceed original budget',
    detail: 'The industry baseline that cooperative firms inherit regardless of governance structure. Democratic decision-making adds coordination overhead on top of a sector already defined by cost deviation',
    ref: 3,
  },
  {
    value: '25%',
    label: 'of projects meet their original schedule',
    detail: 'Only one in four delivered on time. Coordination failure is the primary cause, and cooperative structures compound it when authority to enforce handoff standards is absent or contested',
    ref: 3,
  },
  {
    value: '1–10%',
    label: 'governance participation once organisations scale',
    detail: 'Participation rates in collective decision-making once the organisation grows beyond the threshold where informal social ties can sustain engagement. Direct democracy imposes a participation tax that most members stop paying',
    ref: 6,
  },
  {
    value: '10%',
    label: 'construction productivity growth over 20 years',
    detail: 'Against 50%+ for the global economy. The sector baseline cooperative members are operating within, a structural underperformance that compounds the cooperative\'s own coordination costs',
    ref: 5,
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
      subtitle="What research and post-mortems say about how cooperatives and construction actually perform"
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
          <span style={{ color: 'var(--slide-accent)', fontWeight: 700 }}>The compounding problem: </span>
          cooperative governance adds coordination overhead to a sector already defined by cost overruns and schedule failure. The democratic model absorbs management costs only while the organisation is small enough for informal social ties to do the accountability work. Beyond that threshold, both problems compound simultaneously.
        </p>
      </div>
    </SlideLayout>
  );
}
