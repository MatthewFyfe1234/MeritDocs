import { Layers } from 'lucide-react';
import { SlideLayout } from './SlideLayout';

interface Props {
  title?: string;
  subtitle?: string;
  subNodes?: [string, string, string];
  subNodeSubtexts?: [string | undefined, string | undefined, string | undefined];
  stackLabel?: string;
  supportLabel?: [string, string];
  supportLabel2?: [string, string];
  datasetTitle?: [string, string];
  datasetDescription?: [string, string];
  labelExecutes?: string;
  labelFeeds?: string;
  labelInforms?: string;
  labelRefines?: string;
  labelOutput2?: string;
  splitOutput?: boolean;
  viewBoxMinY?: number;
}

function SubNodeText({ label, cx, y, h, subtext }: {
  label: string; cx: number; y: number; h: number; subtext?: string;
}) {
  const subtextLines = subtext?.split('\n') ?? [];
  const hasSubtext = subtextLines.length > 0;
  const mid = y + h / 2;
  const parts = label.split(' ');

  if (parts.length === 1) {
    return (
      <>
        <text x={cx} y={hasSubtext ? mid - 9 : mid + 4} textAnchor="middle"
          fontSize="9" fontWeight="600" fill="var(--slide-primary)">{label}</text>
        {subtextLines.map((line, i) => (
          <text key={i} x={cx} y={mid + 5 + i * 10} textAnchor="middle"
            fontSize="6" fill="var(--slide-text)" opacity="0.5">{line}</text>
        ))}
      </>
    );
  }

  return (
    <>
      <text x={cx} y={hasSubtext ? mid - 16 : mid - 2} textAnchor="middle"
        fontSize="9" fontWeight="600" fill="var(--slide-primary)">{parts[0]}</text>
      <text x={cx} y={hasSubtext ? mid - 4 : mid + 10} textAnchor="middle"
        fontSize="9" fontWeight="600" fill="var(--slide-primary)">{parts.slice(1).join(' ')}</text>
      {subtextLines.map((line, i) => (
        <text key={i} x={cx} y={mid + 10 + i * 10} textAnchor="middle"
          fontSize="6" fill="var(--slide-text)" opacity="0.5">{line}</text>
      ))}
    </>
  );
}

export function MechanicsSlide({
  title = 'How It Works',
  subtitle = 'Every project execution feeds a single aggregated dataset. Estimating, sales, and management read from the same picture.',
  subNodes = ['Project Team', 'Inventory', 'Process'],
  subNodeSubtexts,
  stackLabel = 'Project',
  supportLabel = ['Support', 'Functions'],
  supportLabel2 = ['Next Gen', 'Design'],
  datasetTitle = ['Aggregated', 'Dataset'],
  datasetDescription = ['One connected', 'operational picture'],
  labelExecutes = 'executes',
  labelFeeds = 'feeds',
  labelInforms = 'informs',
  labelRefines = 'refines',
  labelOutput2 = 'informs',
  splitOutput = false,
  viewBoxMinY = -18,
}: Props) {
  const cardW = 175;
  const cardH = 50;

  const layers = [
    { x: 110, y: 142, opacity: 0.38 },
    { x:  98, y: 154, opacity: 0.55 },
    { x:  86, y: 166, opacity: 0.75 },
    { x:  74, y: 178, opacity: 1.0  },
  ];

  const datasetX = 435;
  const datasetY = 145;
  const datasetW = 190;
  const datasetH = 90;

  const hasAnySubtext = subNodeSubtexts?.some(Boolean) ?? false;
  const ctX = 45; const ctY = 8; const ctW = 260;
  const ctH = hasAnySubtext ? 80 : 68;
  const snY = ctY + 11; const snH = hasAnySubtext ? 58 : 46; const snW = 76;
  const sn1X = ctX + 8;
  const sn2X = sn1X + snW + 8;
  const sn3X = sn2X + snW + 8;
  const arrowStartY = ctY + ctH + 5;
  const ctMidY = ctY + ctH / 2;
  const iaY = ctMidY - 25;
  const feedbackY = ctMidY;
  const upArrowEndY = ctMidY + 44;


  return (
    <SlideLayout title={title} subtitle={subtitle}>
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox={`0 ${viewBoxMinY} 680 258`} preserveAspectRatio="xMidYMin meet" style={{ width: '100%', height: '100%' }}>
          <defs>
            <marker id="arrowhead-mech" markerWidth="14" markerHeight="10" refX="0" refY="5" orient="auto" markerUnits="userSpaceOnUse">
              <polygon points="0 0, 14 5, 0 10" fill="var(--slide-primary)" opacity="0.5" />
            </marker>
          </defs>

          {/* Dashed refines: support box left → container right */}
          <line x1="460" y1={feedbackY} x2="324" y2={feedbackY}
            stroke="var(--slide-primary)" strokeWidth="1.5" opacity="0.35"
            strokeDasharray="5,3"
            markerEnd="url(#arrowhead-mech)" />
          <text x="384" y={feedbackY - 9} textAnchor="middle" fontSize="8"
            fill="var(--slide-text)" opacity="0.4">{labelRefines}</text>

          {/* Unlabeled outer container */}
          <rect x={ctX} y={ctY} width={ctW} height={ctH} rx="8"
            fill="var(--slide-bg-muted)" stroke="var(--slide-border)" strokeWidth="1" />

          {/* Sub-node 1 */}
          <rect x={sn1X} y={snY} width={snW} height={snH} rx="5"
            fill="var(--slide-bg-card)" stroke="var(--slide-border-primary)" strokeWidth="1.5" />
          <SubNodeText label={subNodes[0]} cx={sn1X + snW / 2} y={snY} h={snH} subtext={subNodeSubtexts?.[0]} />

          {/* Sub-node 2 */}
          <rect x={sn2X} y={snY} width={snW} height={snH} rx="5"
            fill="var(--slide-bg-card)" stroke="var(--slide-border-primary)" strokeWidth="1.5" />
          <SubNodeText label={subNodes[1]} cx={sn2X + snW / 2} y={snY} h={snH} subtext={subNodeSubtexts?.[1]} />

          {/* Sub-node 3 */}
          <rect x={sn3X} y={snY} width={snW} height={snH} rx="5"
            fill="var(--slide-bg-card)" stroke="var(--slide-border-primary)" strokeWidth="1.5" />
          <SubNodeText label={subNodes[2]} cx={sn3X + snW / 2} y={snY} h={snH} subtext={subNodeSubtexts?.[2]} />

          {/* Down arrow: container → stack */}
          <line x1="175" y1={arrowStartY} x2="175" y2="123"
            stroke="var(--slide-primary)" strokeWidth="1.5" opacity="0.4"
            markerEnd="url(#arrowhead-mech)" />
          <text x="183" y="108" textAnchor="start" fontSize="8"
            fill="var(--slide-text)" opacity="0.4">{labelExecutes}</text>

          {/* Implied depth */}
          <text x="255" y="112" textAnchor="middle" fontSize="14"
            fill="var(--slide-border-primary)" opacity="0.5" letterSpacing="4">· · ·</text>

          {/* Stacked project execution layers */}
          {layers.map(({ x, y, opacity }) => (
            <g key={`${x}-${y}`} opacity={opacity}>
              <rect x={x} y={y + cardH} width={cardW} height={5} rx={2}
                fill="var(--slide-border-primary)" />
              <rect x={x} y={y} width={cardW} height={cardH} rx="6"
                fill="var(--slide-bg-primary-muted)"
                stroke="var(--slide-border-primary)"
                strokeWidth="1.5" />
              <text x={x + cardW / 2} y={y + cardH / 2 + 4} textAnchor="middle"
                fontSize="10" fontWeight="500" fill="var(--slide-primary)">{stackLabel}</text>
            </g>
          ))}

          {/* Right arrow: front card → dataset */}
          <line x1="254" y1="190" x2="416" y2="190"
            stroke="var(--slide-primary)" strokeWidth="1.5" opacity="0.4"
            markerEnd="url(#arrowhead-mech)" />
          <text x="338" y="200" textAnchor="middle" fontSize="8"
            fill="var(--slide-text)" opacity="0.4">{labelFeeds}</text>

          {/* Aggregated Dataset */}
          <rect x={datasetX} y={datasetY} width={datasetW} height={datasetH} rx="8"
            fill="var(--slide-bg-accent-muted)" stroke="var(--slide-accent)" strokeWidth="2" />
          <foreignObject x={datasetX} y={datasetY} width={datasetW} height={datasetH}>
            {/* @ts-ignore */}
            <div xmlns="http://www.w3.org/1999/xhtml" style={{
              width: '100%', height: '100%',
              display: 'flex', flexDirection: 'row',
              alignItems: 'center', justifyContent: 'center',
              gap: '8px',
            }}>
              <div style={{ color: 'var(--slide-accent)', flexShrink: 0 }}>
                <Layers size={16} strokeWidth={1.5} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--slide-accent)', lineHeight: 1.2 }}>{datasetTitle[0]}</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--slide-accent)', lineHeight: 1.2 }}>{datasetTitle[1]}</div>
                <div style={{ fontSize: '8.5px', color: 'var(--slide-text)', opacity: 0.6, marginTop: '2px' }}>{datasetDescription[0]}</div>
                <div style={{ fontSize: '8.5px', color: 'var(--slide-text)', opacity: 0.6 }}>{datasetDescription[1]}</div>
              </div>
            </div>
          </foreignObject>

          {/* Up arrow: dataset → support box */}
          <line x1="530" y1="140" x2="530" y2={upArrowEndY}
            stroke="var(--slide-primary)" strokeWidth="1.5" opacity="0.4"
            markerEnd="url(#arrowhead-mech)" />
          <text x="542" y="115" textAnchor="start" fontSize="8"
            fill="var(--slide-text)" opacity="0.4">{labelInforms}</text>

          {/* Support box */}
          <rect x="465" y={iaY} width="130" height="50" rx="6"
            fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)" strokeWidth="1.5" />
          {supportLabel[1] ? (
            <>
              <text x="530" y={iaY + 18} textAnchor="middle" fontSize="9.5" fontWeight="600"
                fill="var(--slide-primary)">{supportLabel[0]}</text>
              <text x="530" y={iaY + 33} textAnchor="middle" fontSize="9.5" fontWeight="600"
                fill="var(--slide-primary)">{supportLabel[1]}</text>
            </>
          ) : (
            <text x="530" y={iaY + 29} textAnchor="middle" fontSize="9.5" fontWeight="600"
              fill="var(--slide-primary)">{supportLabel[0]}</text>
          )}

          {/* Split output: second arrow going upward from support box */}
          {splitOutput && (
            <>
              <line x1="530" y1={iaY - 6} x2="530" y2={iaY - 22}
                stroke="var(--slide-primary)" strokeWidth="1.5" opacity="0.4"
                markerEnd="url(#arrowhead-mech)" />
              <foreignObject x="542" y={iaY - 34} width="60" height="30">
                {/* @ts-ignore */}
                <div xmlns="http://www.w3.org/1999/xhtml" style={{
                  fontSize: '8px', lineHeight: 1.4, color: 'var(--slide-text)', opacity: 0.4,
                }}>
                  {labelOutput2}
                </div>
              </foreignObject>
            </>
          )}

        </svg>
      </div>
    </SlideLayout>
  );
}
