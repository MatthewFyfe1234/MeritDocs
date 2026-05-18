import { SlideLayout } from '@/components/slides/SlideLayout';

export function AuditableRecordSlide() {
  const vW = 660; const vH = 262;

  const cards = [
    {
      label:   'Insurance',
      icon:    'Up to 40%',
      iconSub: 'premium reduction under full usage-based insurance programmes',
      ref:     18 as number | null,
      body:    'Operators with a Merit execution record present granular, tamper-proof safety data at renewal. Insurers who can see real risk price it accordingly. The record is the leverage.',
      col:     0,
    },
    {
      label:   'Litigation',
      icon:    'Irrefutable',
      iconSub: 'timestamped sequence of every step',
      ref:     null as number | null,
      body:    'When an incident occurs, the question is always: who did what, in what order, and when. The Merit record answers it with a precision no written report can match. Liability is attributable.',
      col:     1,
    },
    {
      label:   'Compliance',
      icon:    '2.71×',
      iconSub: 'higher cost of non-compliance vs maintaining it',
      ref:     11 as number | null,
      body:    'Stage gates prevent advancement until required certifications and documentation are in place. Compliance is embedded in the process, not checked at the end. Auditors see a complete record.',
      col:     0,
    },
    {
      label:   'Safety',
      icon:    '$42K',
      iconSub: 'average cost per preventable workplace accident',
      ref:     12 as number | null,
      body:    'The process enforces correct sequencing. A step cannot be skipped. A tool cannot be used outside its parameters without the deviation being recorded. Prevention is structural, not instructional.',
      col:     1,
    },
  ];

  const padX = 14; const padY = 10;
  const cols = 2;
  const colGap = 14;
  const colW = (vW - padX * 2 - colGap) / cols;
  const rows = 2;
  const rowGap = 10;
  const rowH = (vH - padY * 2 - rowGap) / rows;

  const cardX = (col: number) => padX + col * (colW + colGap);
  const cardY = (row: number) => padY + row * (rowH + rowGap);

  const cardsByRow = [
    cards.filter((_, i) => i < 2),
    cards.filter((_, i) => i >= 2),
  ];

  return (
    <SlideLayout
      title="The Auditable Record"
      subtitle="Every step, every timestamp, every deviation - an irrefutable record that converts operational data into legal, financial, and regulatory protection."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox={`0 0 ${vW} ${vH}`} style={{ width: '100%', height: '100%' }}>

          {cardsByRow.map((row, ri) =>
            row.map(({ label, icon, iconSub, ref, body, col }) => {
              const x = cardX(col);
              const y = cardY(ri);
              const w = colW; const h = rowH;
              const sepX = x + 100;
              return (
                <g key={label}>
                  <rect x={x} y={y} width={w} height={h} rx="8"
                    fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)" strokeWidth="1.5" />

                  {/* Left: stat */}
                  <text x={x + 12} y={y + 22} fontSize="7" fontWeight="700" letterSpacing="0.4"
                    fill="var(--slide-primary)" opacity="0.5">{label.toUpperCase()}</text>
                  <text x={x + 12} y={y + 44} fontSize="16" fontWeight="700"
                    fill="var(--slide-primary)">{icon}</text>
                  <foreignObject x={x + 10} y={y + 48} width={sepX - x - 14} height={h - 52}>
                    <div
                      // @ts-ignore
                      xmlns="http://www.w3.org/1999/xhtml"
                      style={{ fontSize: '6.5px', lineHeight: 1.5, color: 'var(--slide-text)', opacity: 0.45 }}
                    >
                      {iconSub}{ref && <sup style={{ color: 'var(--slide-accent)', fontWeight: 700, marginLeft: '1px' }}>[{ref}]</sup>}
                    </div>
                  </foreignObject>

                  {/* Separator */}
                  <line x1={sepX} y1={y + 12} x2={sepX} y2={y + h - 12}
                    stroke="var(--slide-border-primary)" strokeWidth="1" opacity="0.35" />

                  {/* Right: description */}
                  <foreignObject x={sepX + 10} y={y + 10} width={w - (sepX - x) - 18} height={h - 20}>
                    <div
                      // @ts-ignore
                      xmlns="http://www.w3.org/1999/xhtml"
                      style={{ display: 'flex', alignItems: 'center', height: '100%', fontSize: '8px', lineHeight: 1.55, color: 'var(--slide-text)', opacity: 0.72 }}
                    >
                      {body}
                    </div>
                  </foreignObject>
                </g>
              );
            })
          )}

        </svg>
      </div>
    </SlideLayout>
  );
}
