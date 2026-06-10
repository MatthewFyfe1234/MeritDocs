import { SlideLayout } from '@/components/slides/SlideLayout';

function sineWavePath(x1: number, x2: number, cy: number, amp: number, period: number): string {
  let d = `M ${x1} ${cy}`;
  for (let x = x1 + 2; x <= x2; x += 2) {
    d += ` L ${x} ${cy + amp * Math.sin((2 * Math.PI * (x - x1)) / period)}`;
  }
  return d;
}

function arcPath(cx: number, cy: number, r: number, halfDeg: number): string {
  const h = (halfDeg * Math.PI) / 180;
  const x1 = cx + r * Math.cos(-h); const y1 = cy + r * Math.sin(-h);
  const x2 = cx + r * Math.cos(h);  const y2 = cy + r * Math.sin(h);
  return `M ${x1} ${y1} A ${r} ${r} 0 ${halfDeg > 90 ? 1 : 0} 1 ${x2} ${y2}`;
}

export function SignalDecaySlide() {
  const vW = 920, vH = 345;
  const waveH = 248;
  const midY = 122;
  const slitHalf = 22;

  const srcX = 55, b1X = 230, b2X = 455, b3X = 680, scnX = 910;

  const wallH = 68, trussH = 109;
  const trussY = wallH, roofY = wallH + trussH;

  const waveYs = Array.from({ length: 13 }, (_, i) => 10 + i * 18);

  const zones = [
    { cx: b1X, clipId: 'zc2', x0: b1X, w: b2X - b1X, spread: 55,  color: 'var(--slide-accent)',   base: 0.52, fade: 0.07 },
    { cx: b2X, clipId: 'zc3', x0: b2X, w: b3X - b2X, spread: 76,  color: 'var(--slide-primary)',  base: 0.34, fade: 0.05 },
    { cx: b3X, clipId: 'zc4', x0: b3X, w: scnX - b3X, spread: 92, color: 'var(--slide-text)',     base: 0.18, fade: 0.025 },
  ];

  const labelY = waveH + 12;

  return (
    <SlideLayout
      title="The Specification Diffracts"
      subtitle="Every handoff is a slit. What arrives at installation is a probability distribution of the original intent."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox={`0 0 ${vW} ${vH}`} style={{ width: '100%', height: '100%' }}>
          <defs>
            {zones.map(z => (
              <clipPath key={z.clipId} id={z.clipId}>
                <rect x={z.x0} y={0} width={z.w} height={waveH} />
              </clipPath>
            ))}
            <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="var(--slide-accent)" stopOpacity="0"    />
              <stop offset="38%"  stopColor="var(--slide-accent)" stopOpacity="0.12" />
              <stop offset="50%"  stopColor="var(--slide-accent)" stopOpacity="0.55" />
              <stop offset="62%"  stopColor="var(--slide-accent)" stopOpacity="0.12" />
              <stop offset="100%" stopColor="var(--slide-accent)" stopOpacity="0"    />
            </linearGradient>
          </defs>

          {/* System bands */}
          <rect x={0} y={0}      width={vW} height={wallH}           fill="var(--slide-bg-primary-muted)" fillOpacity="0.12" />
          <rect x={0} y={trussY} width={vW} height={trussH}          fill="var(--slide-bg-accent-muted)"  fillOpacity="0.20" />
          <rect x={0} y={roofY}  width={vW} height={waveH - roofY}   fill="var(--slide-bg-primary-muted)" fillOpacity="0.12" />

          <line x1={0} y1={trussY} x2={vW} y2={trussY} stroke="var(--slide-border-primary)" strokeWidth="0.8" opacity="0.4" />
          <line x1={0} y1={roofY}  x2={vW} y2={roofY}  stroke="var(--slide-border-primary)" strokeWidth="0.8" opacity="0.4" />

          <text x={12} y={13}          fontSize="6.5" fontWeight="600" fill="var(--slide-text)"   opacity="0.35">Upstream systems</text>
          <text x={12} y={trussY + 13} fontSize="6.5" fontWeight="600" fill="var(--slide-accent)" opacity="0.60">Engineered system</text>
          <text x={12} y={roofY  + 13} fontSize="6.5" fontWeight="600" fill="var(--slide-text)"   opacity="0.35">Site conditions</text>

          {/* Source */}
          <circle cx={srcX} cy={midY} r="5"  fill="var(--slide-accent)" opacity="0.65" />
          <circle cx={srcX} cy={midY} r="10" fill="none" stroke="var(--slide-accent)" strokeWidth="1" opacity="0.22" />

          {/* Coherent plane waves — zone 1 */}
          {waveYs.map((y, i) => (
            <path key={i}
              d={sineWavePath(srcX + 13, b1X - 3, y, 5.5, 28)}
              fill="none" stroke="var(--slide-accent)" strokeWidth="1" opacity="0.48" />
          ))}

          {/* Slit barriers */}
          {[b1X, b2X, b3X].map(bx => (
            <g key={bx}>
              <rect x={bx - 2.5} y={0}               width={5} height={midY - slitHalf} fill="var(--slide-text)" opacity="0.45" />
              <rect x={bx - 2.5} y={midY + slitHalf} width={5} height={waveH - midY - slitHalf} fill="var(--slide-text)" opacity="0.45" />
            </g>
          ))}

          {/* Diffracted arcs */}
          {zones.map(z => (
            <g key={z.clipId} clipPath={`url(#${z.clipId})`}>
              {Array.from({ length: 7 }, (_, i) => (
                <path key={i}
                  d={arcPath(z.cx, midY, 22 + i * 30, z.spread)}
                  fill="none"
                  stroke={z.color}
                  strokeWidth={Math.max(0.5, 1.05 - i * 0.07)}
                  opacity={Math.max(0.03, z.base - i * z.fade)} />
              ))}
            </g>
          ))}

          {/* Screen */}
          <rect x={scnX - 10} y={0} width={10} height={waveH} fill="url(#screenGrad)" />
          <text x={scnX - 5} y={14} textAnchor="end" fontSize="6.5" fontStyle="italic" fill="var(--slide-text)" opacity="0.3">what gets built</text>

          {/* Label divider */}
          <line x1={srcX - 10} y1={waveH + 3} x2={b3X + 60} y2={waveH + 3}
            stroke="var(--slide-border-primary)" strokeWidth="0.5" opacity="0.3" />

          {/* Structural Engineer */}
          <text x={srcX} y={labelY + 12} textAnchor="middle" fontSize="7.5" fontWeight="600" fill="var(--slide-text)" opacity="0.50">Structural</text>
          <text x={srcX} y={labelY + 25} textAnchor="middle" fontSize="7.5" fontWeight="600" fill="var(--slide-text)" opacity="0.50">Engineer</text>

          {/* Truss Designer — "you are here" */}
          <polygon points={`${b1X - 5},${labelY - 1} ${b1X + 5},${labelY - 1} ${b1X},${waveH + 5}`}
            fill="var(--slide-accent)" opacity="0.65" />
          <text x={b1X} y={labelY + 10} textAnchor="middle" fontSize="7" fontWeight="700" fill="var(--slide-accent)" opacity="0.85">
            your software is used here
          </text>
          <text x={b1X} y={labelY + 24} textAnchor="middle" fontSize="7.5" fontWeight="600" fill="var(--slide-accent)" opacity="0.70">Design Technician</text>

          {/* Fabricator */}
          <text x={b2X} y={labelY + 12} textAnchor="middle" fontSize="7.5" fontWeight="600" fill="var(--slide-text)" opacity="0.50">Fabricator /</text>
          <text x={b2X} y={labelY + 25} textAnchor="middle" fontSize="7.5" fontWeight="600" fill="var(--slide-text)" opacity="0.50">Contractor</text>

          {/* Installer */}
          <text x={b3X} y={labelY + 12} textAnchor="middle" fontSize="7.5" fontWeight="600" fill="var(--slide-text)" opacity="0.50">Site</text>
          <text x={b3X} y={labelY + 25} textAnchor="middle" fontSize="7.5" fontWeight="600" fill="var(--slide-text)" opacity="0.50">Crew</text>

        </svg>
      </div>
    </SlideLayout>
  );
}
