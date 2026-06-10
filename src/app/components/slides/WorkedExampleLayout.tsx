import { SlideLayout } from './SlideLayout';

type TagType = 'forecast' | 'plan' | null;

export interface ExSpecRow {
  label: string;
  value: string;
  key?: boolean;
  tag?: string | null;
  tagType?: TagType;
}

export interface ExRecordRow {
  label: string;
  value: string;
  key?: boolean;
  highlight?: boolean;
}

export interface WorkedExampleProps {
  title: string;
  subtitle?: string;
  image: string;
  imageAlt?: string;
  preLabel?: string;
  preCaption?: string;
  midNote: string;
  postLabel?: string;
  specRows: ExSpecRow[];
  recordRows: ExRecordRow[];
  callout?: string;
  labelWidth?: number;
}

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

function DataRow({ label, value, valueColor = 'muted', highlight = false, tag, tagType, labelWidth }: {
  label: string;
  value: string;
  valueColor?: 'primary' | 'accent' | 'muted';
  highlight?: boolean;
  tag?: string | null;
  tagType?: TagType;
  labelWidth: number;
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
        style={{ width: `${labelWidth}px`, color: 'var(--slide-text)', opacity: highlight ? 0.7 : 0.5 }}>
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

export function WorkedExampleLayout({
  title,
  subtitle,
  image,
  imageAlt = '',
  preLabel = 'Pre-Operation',
  preCaption,
  midNote,
  postLabel = 'Complete',
  specRows,
  recordRows,
  callout,
  labelWidth = 165,
}: WorkedExampleProps) {
  return (
    <SlideLayout title={title} subtitle={subtitle}>
      <div className="flex-1 min-h-0 flex flex-row gap-5">

        <div className="relative shrink-0 rounded-lg overflow-hidden" style={{ width: '38%' }}>
          <img src={image} alt={imageAlt} className="w-full h-full object-cover object-center" />
        </div>

        <div className="flex-1 min-h-0 flex flex-col">

          <div className="flex-1 min-h-0 flex flex-row gap-x-3">
            <TimelineCol color="var(--slide-primary)" isLast={false} />
            <div className="flex-1 min-h-0 flex flex-col pb-3">
              <div className="shrink-0 text-xs font-semibold uppercase tracking-widest pb-1"
                style={{ color: 'var(--slide-primary)', opacity: 0.6 }}>
                {preLabel}
              </div>
              <div className="flex-1 min-h-0 flex flex-col"
                style={{ borderTop: '1px solid var(--slide-border-primary)' }}>
                {specRows.map(({ label, value, key, tag, tagType }) => (
                  <DataRow key={label} label={label} value={value}
                    valueColor={key ? 'primary' : 'muted'} tag={tag} tagType={tagType}
                    labelWidth={labelWidth} />
                ))}
              </div>
              {preCaption && (
                <p className="shrink-0 text-xs italic pt-0.5"
                  style={{ color: 'var(--slide-text)', opacity: 0.35 }}>
                  {preCaption}
                </p>
              )}
            </div>
          </div>

          <div className="shrink-0 flex flex-row gap-x-3">
            <TimelineCol color="#9CA3AF" isLast={false} />
            <div className="py-1.5">
              <p className="text-xs italic" style={{ color: 'var(--slide-text)', opacity: 0.45 }}>
                {midNote}
              </p>
            </div>
          </div>

          <div className="flex-1 min-h-0 flex flex-row gap-x-3">
            <TimelineCol color="var(--slide-accent)" isLast={true} />
            <div className="flex-1 min-h-0 flex flex-col">
              <div className="shrink-0 text-xs font-semibold uppercase tracking-widest pb-1"
                style={{ color: 'var(--slide-accent)', opacity: 0.75 }}>
                {postLabel}
              </div>
              <div className="flex-1 min-h-0 flex flex-col"
                style={{ borderTop: '1px solid var(--slide-border-primary)' }}>
                {recordRows.map(({ label, value, key, highlight }) => (
                  <DataRow key={label} label={label} value={value}
                    valueColor={key || highlight ? 'accent' : 'muted'}
                    highlight={highlight} labelWidth={labelWidth} />
                ))}
              </div>
            </div>
          </div>

          {callout && (
            <div className="shrink-0 text-center pt-2 mt-1">
              <p className="text-sm font-semibold" style={{ color: 'var(--slide-accent)' }}>
                {callout}
              </p>
            </div>
          )}

        </div>
      </div>
    </SlideLayout>
  );
}
