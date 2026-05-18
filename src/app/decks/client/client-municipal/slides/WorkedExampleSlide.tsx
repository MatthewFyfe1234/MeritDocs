import { SlideLayout } from '@/components/slides/SlideLayout';
import trashcollect from '../trashcollect.jpg';

const specRows = [
  { label: 'Route length',               value: '3.2 miles',              key: false, tag: 'affects forecasting', tagType: 'forecast' as const },
  { label: 'Area classification',        value: 'Light urban',            key: false, tag: 'affects forecasting', tagType: 'forecast' as const },
  { label: 'Collection points',          value: '320 bins',               key: false, tag: 'affects forecasting', tagType: 'forecast' as const },
  { label: 'Vehicle type',               value: 'Rear-loader, 26t',       key: false, tag: 'affects process',     tagType: 'plan'     as const },
  { label: 'Ambient temp',               value: '-2°C (sub-zero)',        key: false, tag: 'affects process',     tagType: 'plan'     as const },
  { label: 'Predicted cycle time',       value: '4h 20m',                 key: true,  tag: null,                tagType: null                },
  { label: 'Predicted fuel consumption', value: '18.4 litres',            key: true,  tag: null,                tagType: null                },
];

const recordRows = [
  { label: 'Actual cycle time',  value: '4h 51m',                                               key: true,  highlight: false },
  { label: 'Actual fuel',        value: '23.1 litres',                                          key: true,  highlight: false },
  { label: 'Deviation',          value: '+31 minutes / +4.7 litres',                            key: true,  highlight: true  },
  { label: 'Cause flagged',      value: 'Two unscheduled stops, operative change at 2.1 miles', key: false, highlight: true  },
  { label: 'Crew confirmed',     value: 'Driver ID 041, Operatives 12, 17, 23',                 key: false, highlight: false },
  { label: 'Vehicle',            value: 'Fleet asset MX71 RKL',                                 key: false, highlight: false },
  { label: 'Record',             value: 'Timestamped, tamper-proof, FOI-ready',                 key: false, highlight: false },
];

function TimelineCol({ color, isLast }: { color: string; isLast: boolean }) {
  return (
    <div className="flex flex-col items-center shrink-0" style={{ width: '14px' }}>
      <div className="shrink-0 rounded-full mt-0.5"
        style={{ width: '10px', height: '10px', backgroundColor: color, opacity: 0.85 }} />
      {!isLast && (
        <div className="flex-1 mt-1"
          style={{ width: '1px', backgroundColor: 'var(--slide-border-primary)', opacity: 0.3 }} />
      )}
    </div>
  );
}

function DataRow({ label, value, valueColor = 'muted', highlight = false, tag, tagType }: {
  label: string;
  value: string;
  valueColor?: 'primary' | 'accent' | 'muted';
  highlight?: boolean;
  tag?: string | null;
  tagType?: 'forecast' | 'plan' | null;
}) {
  return (
    <div className="flex-1 flex items-center min-h-0 gap-x-2"
      style={{
        borderBottom: '1px solid var(--slide-border-primary)',
        backgroundColor: highlight ? 'var(--slide-bg-accent-muted)' : 'transparent',
        paddingLeft: highlight ? '3px' : undefined,
        paddingRight: highlight ? '3px' : undefined,
      }}>
      <span className={`text-xs shrink-0 ${highlight ? 'font-medium' : ''}`}
        style={{ width: '200px', color: 'var(--slide-text)', opacity: highlight ? 0.7 : 0.5 }}>
        {label}
      </span>
      <span className={`text-xs flex-1 ${valueColor !== 'muted' || highlight ? 'font-bold' : ''}`}
        style={{
          color: valueColor === 'primary' ? 'var(--slide-primary)'
            : valueColor === 'accent' || highlight ? 'var(--slide-accent)'
            : 'var(--slide-text)',
          opacity: valueColor === 'muted' && !highlight ? 0.65 : 1,
        }}>
        {value}
      </span>
      {tag && (
        <span className="shrink-0 text-xs italic"
          style={{
            fontSize: '0.6rem',
            color: tagType === 'forecast' ? 'var(--slide-primary)' : 'var(--slide-text)',
            opacity: tagType === 'forecast' ? 0.55 : 0.3,
          }}>
          {tag}
        </span>
      )}
    </div>
  );
}

export function WorkedExampleSlide() {
  return (
    <SlideLayout
      title="A Refuse Round. Fully Specified."
      subtitle="What Merit knows before the job begins, and what it records when it ends."
    >
      <div className="flex-1 min-h-0 flex flex-row gap-5">

        {/* Image */}
        <div className="relative shrink-0 rounded-lg overflow-hidden" style={{ width: '38%' }}>
          <img
            src={trashcollect}
            alt="Refuse collection vehicle"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Timeline */}
        <div className="flex-1 min-h-0 flex flex-col">

          {/* PRE-DISPATCH */}
          <div className="flex-1 min-h-0 flex flex-row gap-x-3">
            <TimelineCol color="var(--slide-primary)" isLast={false} />
            <div className="flex-1 min-h-0 flex flex-col pb-3">
              <div className="shrink-0 text-xs font-semibold uppercase tracking-widest pb-1"
                style={{ color: 'var(--slide-primary)', opacity: 0.6 }}>
                Pre-Dispatch
              </div>
              <div className="flex-1 min-h-0 flex flex-col"
                style={{ borderTop: '1px solid var(--slide-border-primary)' }}>
                {specRows.map(({ label, value, key, tag, tagType }) => (
                  <DataRow key={label} label={label} value={value}
                    valueColor={key ? 'primary' : 'muted'} tag={tag} tagType={tagType} />
                ))}
              </div>
              <p className="shrink-0 text-xs italic pt-0.5"
                style={{ color: 'var(--slide-text)', opacity: 0.35 }}>
                Derived from route specification and vehicle type. Calculated before dispatch.
              </p>
            </div>
          </div>

          {/* IN EXECUTION */}
          <div className="shrink-0 flex flex-row gap-x-3">
            <TimelineCol color="#9CA3AF" isLast={false} />
            <div className="py-1.5">
              <p className="text-xs italic" style={{ color: 'var(--slide-text)', opacity: 0.45 }}>
                07:14 - Job commenced
              </p>
            </div>
          </div>

          {/* JOB COMPLETE */}
          <div className="flex-1 min-h-0 flex flex-row gap-x-3">
            <TimelineCol color="var(--slide-accent)" isLast={true} />
            <div className="flex-1 min-h-0 flex flex-col">
              <div className="shrink-0 text-xs font-semibold uppercase tracking-widest pb-1"
                style={{ color: 'var(--slide-accent)', opacity: 0.75 }}>
                Job Complete
              </div>
              <div className="flex-1 min-h-0 flex flex-col"
                style={{ borderTop: '1px solid var(--slide-border-primary)' }}>
                {recordRows.map(({ label, value, key, highlight }) => (
                  <DataRow key={label} label={label} value={value}
                    valueColor={key || highlight ? 'accent' : 'muted'}
                    highlight={highlight} />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom line */}
          <div className="shrink-0 text-center pt-2 mt-1">
            <p className="text-sm font-semibold" style={{ color: 'var(--slide-accent)' }}>
              Every round. Every asset. Every deviation. Automatically.
            </p>
          </div>

        </div>
      </div>
    </SlideLayout>
  );
}
