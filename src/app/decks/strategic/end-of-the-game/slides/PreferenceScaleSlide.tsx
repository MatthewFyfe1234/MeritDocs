import { SlideLayout } from '@/components/slides/SlideLayout';

const cols = 16;
const rows = 5;
const startX = 46;
const startY = 24;
const stepX = (680 - startX * 2) / (cols - 1);
const stepY = 20;
const highlightIndex = 42;

export function PreferenceScaleSlide() {
  const dots: { x: number; y: number; i: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push({ x: startX + c * stepX, y: startY + r * stepY, i: r * cols + c });
    }
  }
  const gridBottom = startY + (rows - 1) * stepY;
  const nodeY = gridBottom + 62;
  const highlighted = dots[highlightIndex];

  return (
    <SlideLayout
      title="Preference, Solved by Scale"
      subtitle="At large-N, flat-power scale, no individual's preference is tied to their own outcome. There's nothing to gain by misrepresenting it."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox="0 0 680 230" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%' }}>
          {/* Faint funnel suggesting aggregation of everyone's input */}
          <polygon
            points={`${startX},${gridBottom + 4} ${680 - startX},${gridBottom + 4} ${340 + 60},${nodeY - 20} ${340 - 60},${nodeY - 20}`}
            fill="var(--slide-primary)" opacity="0.05"
          />

          {dots.map(({ x, y, i }) => (
            <circle key={i} cx={x} cy={y} r={i === highlightIndex ? 5 : 2.5}
              fill={i === highlightIndex ? 'var(--slide-accent)' : 'var(--slide-primary)'}
              opacity={i === highlightIndex ? 1 : 0.28} />
          ))}

          {highlighted && (
            <>
              <line x1={highlighted.x} y1={highlighted.y + 8} x2={340} y2={nodeY - 22}
                stroke="var(--slide-accent)" strokeWidth="1.5" opacity="0.6" />
              <text x={highlighted.x} y={highlighted.y - 10} textAnchor="middle" fontSize="8.5" fontWeight="700"
                fill="var(--slide-accent)">
                you: 1 of millions
              </text>
            </>
          )}

          <rect x={340 - 110} y={nodeY - 20} width="220" height="44" rx="8"
            fill="var(--slide-bg-accent-muted)" stroke="var(--slide-accent)" strokeWidth="2" />
          <text x="340" y={nodeY - 1} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--slide-accent)">
            One Ecosystem-Wide Parameter
          </text>
          <text x="340" y={nodeY + 12} textAnchor="middle" fontSize="8" fontStyle="italic" fill="var(--slide-text)" opacity="0.5">
            set by everyone, owned by no one
          </text>
        </svg>
      </div>

      <p className="text-sm leading-relaxed text-center" style={{ color: 'var(--slide-accent)' }}>
        No individual's weight preference is tied to their own relationship or outcome, so misrepresenting it buys
        nothing. This is the condition under which even stating what you want becomes safe.
      </p>
    </SlideLayout>
  );
}
