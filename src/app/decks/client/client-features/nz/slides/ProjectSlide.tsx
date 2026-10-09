import { SlideLayout } from '@/components/slides/SlideLayout';

type Item = { label: string; note?: string };

const leftItems: Item[]  = [
  { label: 'Forecasting (time, carbon, energy)', note: 'ETS: model the carbon cost of a job before pricing it' },
  { label: 'Delivery Date' },
  { label: 'Quotation (faster, grounded in actual spec data)' },
  { label: 'Team Allocation' },
  { label: 'Progress Monitoring' },
  { label: 'Document Control' },
];
const rightItems: Item[] = [
  { label: 'Material Orders' },
  { label: 'Material Costs' },
  { label: 'Embodied Carbon', note: 'CRD: your customers\' carbon reporting chain' },
  { label: 'Weight' },
];

const rowH     = 17;
const noteH    = 11;
const secStart = 118;

function itemHeight(item: Item) { return rowH + (item.note ? noteH : 0); }
function itemY(items: Item[], index: number) {
  let y = secStart;
  for (let i = 0; i < index; i++) y += itemHeight(items[i]);
  return y;
}
function stemEnd(items: Item[]) { return itemY(items, items.length - 1) + 10; }

export function ProjectSlide() {
  const tmpl  = { x: 240, y: 8,  w: 180, h: 32 };
  const left  = { x: 60,  y: 70, w: 180, h: 32 };
  const right = { x: 420, y: 70, w: 180, h: 32 };

  const cx  = (b: { x: number; w: number }) => b.x + b.w / 2;
  const bb  = (b: { y: number; h: number }) => b.y + b.h;

  const forkY      = 54;
  const elbowY     = bb(left) + 8;
  const leftStemX  = left.x + 5;
  const rightStemX = right.x + 5;

  const lineProps = { stroke: 'var(--slide-primary)', strokeWidth: 1.2, opacity: 0.32 } as const;
  const stemProps = { stroke: 'var(--slide-border-primary)', strokeWidth: 1, opacity: 0.3 } as const;

  return (
    <SlideLayout title="Project" subtitle="What the platform generates downstream of a specification">
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox="0 0 660 268" style={{ width: '100%', height: '100%' }}>

          {/* Fork from template */}
          <line x1={cx(tmpl)} y1={bb(tmpl)} x2={cx(tmpl)} y2={forkY} {...lineProps} />
          <line x1={cx(left)} y1={forkY} x2={cx(right)} y2={forkY} {...lineProps} />
          <line x1={cx(left)}  y1={forkY} x2={cx(left)}  y2={left.y}  {...lineProps} />
          <line x1={cx(right)} y1={forkY} x2={cx(right)} y2={right.y} {...lineProps} />

          {/* Template */}
          <rect x={tmpl.x} y={tmpl.y} width={tmpl.w} height={tmpl.h} rx="5"
            fill="var(--slide-bg-accent-muted)" stroke="var(--slide-accent)" strokeWidth="1.5" />
          <text x={cx(tmpl)} y={tmpl.y + 13} textAnchor="middle" fontSize="9" fontWeight="700"
            fill="var(--slide-accent)">Specification Template</text>
          <text x={cx(tmpl)} y={tmpl.y + 25} textAnchor="middle" fontSize="7"
            fill="var(--slide-accent)" opacity="0.6">manual configuration</text>

          {/* Left primary */}
          <rect x={left.x} y={left.y} width={left.w} height={left.h} rx="5"
            fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)" strokeWidth="1.5" />
          <text x={cx(left)} y={left.y + 20} textAnchor="middle" fontSize="9" fontWeight="700"
            fill="var(--slide-primary)">Delivery Planning</text>

          {/* Right primary */}
          <rect x={right.x} y={right.y} width={right.w} height={right.h} rx="5"
            fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)" strokeWidth="1.5" />
          <text x={cx(right)} y={right.y + 20} textAnchor="middle" fontSize="9" fontWeight="700"
            fill="var(--slide-primary)">Material Quantification</text>

          {/* Left stem + items */}
          <line x1={cx(left)}  y1={bb(left)} x2={cx(left)}  y2={elbowY}          {...stemProps} />
          <line x1={cx(left)}  y1={elbowY}   x2={leftStemX} y2={elbowY}           {...stemProps} />
          <line x1={leftStemX} y1={elbowY}   x2={leftStemX} y2={stemEnd(leftItems)} {...stemProps} />
          {leftItems.map((item, i) => {
            const ny = itemY(leftItems, i) + 10;
            return (
              <g key={item.label}>
                <line x1={leftStemX} y1={ny} x2={leftStemX + 12} y2={ny} {...stemProps} />
                <circle cx={leftStemX + 15} cy={ny} r="2.5" fill="var(--slide-primary)" opacity="0.4" />
                <text x={leftStemX + 21} y={ny + 4} fontSize="8.5" fill="var(--slide-text)" opacity="0.7">{item.label}</text>
                {item.note && (
                  <text x={leftStemX + 21} y={ny + 4 + noteH} fontSize="7" fill="var(--slide-text)" opacity="0.38" fontStyle="italic">{item.note}</text>
                )}
              </g>
            );
          })}

          {/* Right stem + items — elbow left then down, items branch right */}
          <line x1={cx(right)}  y1={bb(right)} x2={cx(right)}  y2={elbowY}           {...stemProps} />
          <line x1={cx(right)}  y1={elbowY}    x2={rightStemX} y2={elbowY}            {...stemProps} />
          <line x1={rightStemX} y1={elbowY}    x2={rightStemX} y2={stemEnd(rightItems)} {...stemProps} />
          {rightItems.map((item, i) => {
            const ny = itemY(rightItems, i) + 10;
            return (
              <g key={item.label}>
                <line x1={rightStemX} y1={ny} x2={rightStemX + 12} y2={ny} {...stemProps} />
                <circle cx={rightStemX + 15} cy={ny} r="2.5" fill="var(--slide-primary)" opacity="0.4" />
                <text x={rightStemX + 21} y={ny + 4} fontSize="8.5" fill="var(--slide-text)" opacity="0.7">{item.label}</text>
                {item.note && (
                  <text x={rightStemX + 21} y={ny + 4 + noteH} fontSize="7" fill="var(--slide-text)" opacity="0.38" fontStyle="italic">{item.note}</text>
                )}
              </g>
            );
          })}

        </svg>
      </div>
    </SlideLayout>
  );
}
