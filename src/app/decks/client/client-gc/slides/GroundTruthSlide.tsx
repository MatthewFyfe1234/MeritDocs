import { SlideLayout } from '@/components/slides/SlideLayout';

const stats = [
  {
    value: '30%',
    label: 'labor efficiency lost during change work',
    detail: 'Construction Industry Institute analysis of 151 weeks of site data found efficiency drops to 70% of normal when change work is being performed. That loss is rarely captured in the change order valuation — it is margin eroded in execution, invisible at tender.',
    ref: 1,
  },
  {
    value: '$88.7bn',
    label: 'lost annually to rework from bad project data',
    detail: 'FMI and Autodesk research across 3,900+ industry leaders found 14% of all construction rework is caused by inaccurate, incomplete, or untimely data. For a contractor at $1bn revenue, that is $7.1M in avoidable losses per year.',
    ref: 7,
  },
  {
    value: '44%',
    label: 'of contractors failed to recover retention',
    detail: 'Nearly half of contractors surveyed have lost retention money to upstream insolvency. Retention typically represents the entirety of net project profit, held by a party whose financial position the GC cannot control.',
    ref: 3,
  },
  {
    value: '12.5',
    label: 'months global average to resolve a dispute',
    detail: 'The 2024 global average, per Arcadis. A disputed final account is not a line item to be cleared; it is a working capital drain that outlasts the project by a year or more. Arcadis identifies poorly drafted and unsubstantiated claims as the leading cause.',
    ref: 4,
  },
  {
    value: '30%',
    label: 'of all fatal work accidents occur in construction',
    detail: 'Construction employs just 7% of the global workforce but accounts for nearly a third of all fatal occupational accidents (ILO). When a fatality triggers investigation, documentation of safety controls is the GC\'s primary legal defence.',
    ref: 5,
  },
  {
    value: '52%',
    label: 'of rework tied to outdated documentation',
    detail: 'More than half of all rework on construction projects is directly linked to subcontractors working from superseded drawings or missing specifications. The document is the instruction.',
    ref: 6,
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
      title="The Commercial Reality"
      subtitle="Where GC margin is eroded: data from global industry research"
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
          a GC's margin is set at tender but eroded continuously in delivery. Every change order costs 30% more in labor to execute than planned work,<Ref num={1} /> rework compounds from documentation failures,<Ref num={6} /> and disputed accounts run for over a year after practical completion.<Ref num={4} /> The record is the margin.
        </p>
      </div>
    </SlideLayout>
  );
}
