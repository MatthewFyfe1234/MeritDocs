import { SlideLayout } from '@/components/slides/SlideLayout';
import combine from '../example-slides/combine.jpg';

const specRows = [
  { label: 'Field size',             value: '24 acres',   key: false, tag: 'affects forecasting', tagType: 'forecast' as const },
  { label: 'Grain moisture',         value: '19% (wet)',  key: false, tag: 'affects forecasting', tagType: 'forecast' as const },
  { label: 'Field slope',            value: '8% grade',   key: false, tag: 'affects forecasting', tagType: 'forecast' as const },
  { label: 'Crop type',              value: 'Corn',       key: false, tag: 'affects process',     tagType: 'plan'     as const },
  { label: 'Ambient temp',           value: '29°C (cooling checks required)', key: false, tag: 'affects process', tagType: 'plan' as const },
  { label: 'Predicted harvest rate', value: '3.8 ac/hr',  key: true,  tag: null,                  tagType: null                },
  { label: 'Predicted fuel',         value: '168 litres', key: true,  tag: null,                  tagType: null                },
];

const recordRows = [
  { label: 'Actual harvest rate', value: '4.9 ac/hr',                                                              key: true,  highlight: false },
  { label: 'Actual fuel',         value: '214 litres',                                                             key: true,  highlight: false },
  { label: 'Deviation',           value: '+29% above moisture-adjusted speed limit',                               key: true,  highlight: true  },
  { label: 'Cause flagged',       value: 'Speed override at 11:42, 13:15, 14:08 - 38 min outside specification',  key: false, highlight: true  },
  { label: 'Operator',            value: 'Operator ID 014',                                                        key: false, highlight: false },
  { label: 'Machine',             value: 'Serial CMB-7823',                                                        key: false, highlight: false },
  { label: 'Record',              value: 'Timestamped, manufacturer-spec referenced',                              key: false, highlight: false },
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
        style={{ width: '165px', color: 'var(--slide-text)', opacity: highlight ? 0.7 : 0.5 }}>
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
        <span className="shrink-0 italic"
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
      title="A Corn Harvest. Fully Specified."
      subtitle="What Merit knows before the header drops, and what it records when the field is done."
    >
      <div className="flex-1 min-h-0 flex flex-row gap-5">

        {/* Image */}
        <div className="relative shrink-0 rounded-lg overflow-hidden" style={{ width: '38%' }}>
          <img
            src={combine}
            alt="Combine harvester in field"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Timeline */}
        <div className="flex-1 min-h-0 flex flex-col">

          {/* PRE-OPERATION */}
          <div className="flex-1 min-h-0 flex flex-row gap-x-3">
            <TimelineCol color="var(--slide-primary)" isLast={false} />
            <div className="flex-1 min-h-0 flex flex-col pb-3">
              <div className="shrink-0 text-xs font-semibold uppercase tracking-widest pb-1"
                style={{ color: 'var(--slide-primary)', opacity: 0.6 }}>
                Pre-Operation
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
                Derived from field specification, crop type, and detected conditions. Procedure variant selected before the header drops.
              </p>
            </div>
          </div>

          {/* IN EXECUTION */}
          <div className="shrink-0 flex flex-row gap-x-3">
            <TimelineCol color="#9CA3AF" isLast={false} />
            <div className="py-1.5">
              <p className="text-xs italic" style={{ color: 'var(--slide-text)', opacity: 0.45 }}>
                08:45 - Header engaged
              </p>
            </div>
          </div>

          {/* FIELD COMPLETE */}
          <div className="flex-1 min-h-0 flex flex-row gap-x-3">
            <TimelineCol color="var(--slide-accent)" isLast={true} />
            <div className="flex-1 min-h-0 flex flex-col">
              <div className="shrink-0 text-xs font-semibold uppercase tracking-widest pb-1"
                style={{ color: 'var(--slide-accent)', opacity: 0.75 }}>
                Field Complete
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
              Every field. Every condition. Every deviation. Automatically.
            </p>
          </div>

        </div>
      </div>
    </SlideLayout>
  );
}
