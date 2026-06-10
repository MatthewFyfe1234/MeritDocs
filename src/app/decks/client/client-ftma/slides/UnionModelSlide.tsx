import { SlideLayout } from '@/components/slides/SlideLayout';

const members = ['Maker A', 'Maker B', 'Maker C', 'Maker D', 'Maker E', 'Maker F'];
const capabilities = ['Process model', 'Execution record', 'Document mgmt', 'Analytics', 'Stage gates'];
const services = ['Insurance', 'Procurement', 'Talent', 'Compliance', 'Legal', 'Benchmarks'];

export function UnionModelSlide() {
  const mw = 70, mh = 28, mg = 16;
  const totalMW = members.length * mw + (members.length - 1) * mg;
  const mStart = (660 - totalMW) / 2;
  const mBoxes = members.map((_, i) => ({
    x: mStart + i * (mw + mg),
    cx: mStart + i * (mw + mg) + mw / 2,
  }));
  const mY = -2, mBottom = mY + mh;

  const meritX = 16, meritY = 78, meritW = 628, meritH = 60;
  const meritBottom = meritY + meritH;

  const sw = 72, sh = 28, sg = 14;
  const totalSW = services.length * sw + (services.length - 1) * sg;
  const sStart = (660 - totalSW) / 2;
  const sBoxes = services.map((_, i) => ({
    x: sStart + i * (sw + sg),
    cx: sStart + i * (sw + sg) + sw / 2,
  }));
  const sY = 192;

  const midX = 330;
  const gatherY = mBottom + 10;
  const spreadY = sY - 14;

  const tagW = 108, tagH = 16, tagGap = 8;
  const totalTagW = capabilities.length * tagW + (capabilities.length - 1) * tagGap;
  const tagStart = meritX + (meritW - totalTagW) / 2;

  return (
    <SlideLayout
      title="The 'Union' Model"
      subtitle="Merit provides the shared infrastructure. The association provides the coordination. Together they create leverage no individual manufacturer could achieve alone."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox="0 0 660 238" style={{ width: '100%', height: '100%' }}>
          <defs>
            <marker id="arrow-union" markerWidth="10" markerHeight="7" refX="0" refY="3.5"
              orient="auto" markerUnits="userSpaceOnUse">
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--slide-primary)" opacity="0.5" />
            </marker>
          </defs>

          {/* Zone label: members */}
          <text x={midX} y={mY - 4} textAnchor="middle" fontSize="6.5"
            fill="var(--slide-text)" opacity="0.28" letterSpacing="0.8">
            NZ MANUFACTURERS
          </text>

          {/* Member boxes */}
          {mBoxes.map((b, i) => (
            <g key={members[i]}>
              <rect x={b.x} y={mY} width={mw} height={mh} rx="4"
                fill="var(--slide-bg-card)" stroke="var(--slide-border)" strokeWidth="1" />
              <text x={b.cx} y={mY + mh / 2 + 4} textAnchor="middle" fontSize="7"
                fill="var(--slide-text)" opacity="0.5">{members[i]}</text>
            </g>
          ))}

          {/* Vertical gather lines from member bottoms */}
          {mBoxes.map((b, i) => (
            <line key={`v-gather-${i}`}
              x1={b.cx} y1={mBottom} x2={b.cx} y2={gatherY}
              stroke="var(--slide-border-primary)" strokeWidth="0.75" opacity="0.3" />
          ))}
          {/* Horizontal gather */}
          <line x1={mBoxes[0].cx} y1={gatherY} x2={mBoxes[mBoxes.length - 1].cx} y2={gatherY}
            stroke="var(--slide-border-primary)" strokeWidth="0.75" opacity="0.3" />
          {/* Arrow down into Merit */}
          <line x1={midX} y1={gatherY} x2={midX} y2={gatherY + 26}
            stroke="var(--slide-primary)" strokeWidth="1.2" opacity="0.45"
            markerEnd="url(#arrow-union)" />

          {/* Merit Platform box */}
          <rect x={meritX} y={meritY} width={meritW} height={meritH} rx="6"
            fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)" strokeWidth="1.5" />
          <text x={meritX + 16} y={meritY + 16} fontSize="9.5" fontWeight="700"
            fill="var(--slide-primary)">Merit Platform</text>

          {/* Capability tags inside Merit */}
          {capabilities.map((cap, i) => {
            const tx = tagStart + i * (tagW + tagGap);
            const ty = meritY + 26;
            return (
              <g key={cap}>
                <rect x={tx} y={ty} width={tagW} height={tagH} rx="3"
                  fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)"
                  strokeWidth="0.75" opacity="0.55" />
                <text x={tx + tagW / 2} y={ty + 11} textAnchor="middle" fontSize="6.5"
                  fill="var(--slide-primary)" opacity="0.75">{cap}</text>
              </g>
            );
          })}

          {/* Arrow from Merit down to spread line */}
          <line x1={midX} y1={meritBottom} x2={midX} y2={spreadY - 14}
            stroke="var(--slide-primary)" strokeWidth="1.2" opacity="0.45"
            markerEnd="url(#arrow-union)" />
          {/* Horizontal spread */}
          <line x1={sBoxes[0].cx} y1={spreadY} x2={sBoxes[sBoxes.length - 1].cx} y2={spreadY}
            stroke="var(--slide-border-primary)" strokeWidth="0.75" opacity="0.3" />
          {/* Vertical lines down to service boxes */}
          {sBoxes.map((b, i) => (
            <line key={`v-spread-${i}`}
              x1={b.cx} y1={spreadY} x2={b.cx} y2={sY}
              stroke="var(--slide-border-primary)" strokeWidth="0.75" opacity="0.3" />
          ))}

          {/* Service boxes */}
          {sBoxes.map((b, i) => (
            <g key={services[i]}>
              <rect x={b.x} y={sY} width={sw} height={sh} rx="4"
                fill="var(--slide-bg-accent-muted)" stroke="var(--slide-border)" strokeWidth="1" />
              <text x={b.cx} y={sY + sh / 2 + 4} textAnchor="middle" fontSize="7.5"
                fontWeight="600" fill="var(--slide-accent)" opacity="0.85">{services[i]}</text>
            </g>
          ))}

          {/* Zone label: services */}
          <text x={midX} y={sY + sh + 14} textAnchor="middle" fontSize="6.5"
            fill="var(--slide-text)" opacity="0.28" letterSpacing="0.8">
            COLLECTIVE SERVICES
          </text>
        </svg>
      </div>
    </SlideLayout>
  );
}
