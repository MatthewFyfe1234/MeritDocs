import { SlideLayout } from '@/components/slides/SlideLayout';

export function OriginGapSlide() {
  const vW = 660;
  const vH = 290;

  const toolBandTop = 14;
  const toolBandH = 120;
  const gapH = 20;
  const spineY = toolBandTop + toolBandH + gapH / 2;     // 144
  const processBandTop = toolBandTop + toolBandH + gapH; // 154
  const processBandH = 120;
  const lPad = 14;
  const rPad = 14;
  const rightEdge = vW - rPad; // 646

  const origSmCx = 46;  const origSmCy = processBandTop + processBandH / 2; // (46, 214) — centered in operator band
  const origSmR  = 30;
  const origCx   = 128; const origCy = spineY; const origR = 42; // larger radius straddles both bands
  const wallX1   = origCx + origR; // 170

  const meritCx = 464; const meritCy = spineY; const meritR = 30;
  const mTop = meritCy - meritR; // 114
  const mBot = meritCy + meritR; // 174
  const wallX2 = meritCx - meritR; // 434

  const contentX = wallX1 + 18; // 168
  const formX    = origCx;       // 120
  const nowX     = 424;

  // Originator movement arrow: center-to-center, stopping at each circle's perimeter
  const dxOrig  = origCx - origSmCx;
  const dyOrig  = origCy - origSmCy;
  const lenOrig = Math.sqrt(dxOrig * dxOrig + dyOrig * dyOrig);
  const uxOrig  = dxOrig / lenOrig;
  const uyOrig  = dyOrig / lenOrig;
  const origLineX1 = origSmCx + origSmR * uxOrig;
  const origLineY1 = origSmCy + origSmR * uyOrig;
  const origLineX2 = origCx   - origR   * uxOrig;
  const origLineY2 = origCy   - origR   * uyOrig;

  // "becomes" label along the Worker→Pioneer arrow
  const arrowAngleDeg = Math.atan2(dyOrig, dxOrig) * 180 / Math.PI;
  const becomesLabelX = (origLineX1 + origLineX2) / 2;
  const becomesLabelY = (origLineY1 + origLineY2) / 2;

  // Arrows: inside the Merit rectangle, crossing at the horizontal band lines.
  // Positioned to the right of the arc so the crossing is clean and the
  // insideL tip only pokes a short way into Merit.
  const vX1       = 522; // input (→ Merit)
  const vX2       = 550; // return (← Merit)
  const topCrossY = mTop; // 114 — Merit's top horizontal line
  const botCrossY = mBot; // 174 — Merit's bottom horizontal line
  const outsideL  = 72;  // extent into band (carries 5 bullet labels)
  const insideL   = 10;  // extent into Merit (tip only)

  // 5 bullets per arrow, 9px spacing, anchored at the outer tip
  const tBulletY = [topCrossY - outsideL + 9,  topCrossY - outsideL + 21, topCrossY - outsideL + 33, topCrossY - outsideL + 45, topCrossY - outsideL + 57];
  const pBulletY = [botCrossY + outsideL - 57, botCrossY + outsideL - 45, botCrossY + outsideL - 33, botCrossY + outsideL - 21, botCrossY + outsideL - 9];

  const bL = vX1 - 6; // 516 — bullet label x for input arrows (textAnchor="end")
  const bR = vX2 + 6; // 556 — bullet label x for return arrows (textAnchor="start")

  return (
    <SlideLayout
      title="The Origin of the Gap"
      subtitle="Process and tool were once the same thing. Scale separated them. Merit reconnects them."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox={`0 0 ${vW} ${vH}`} style={{ width: '100%', height: '100%' }}>
          <defs>
            <marker id="og-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--slide-accent)" opacity="0.7" />
            </marker>
            <marker id="og-orig-arr" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
              <path d="M0,0 L5,2.5 L0,5 Z" fill="var(--slide-primary)" opacity="0.4" />
            </marker>
          </defs>

          {/* ── BANDS ── */}
          <rect x={0} y={toolBandTop} width={vW} height={toolBandH}
            fill="var(--slide-primary)" fillOpacity="0.04" />
          <rect x={0} y={processBandTop} width={vW} height={processBandH}
            fill="var(--slide-primary)" fillOpacity="0.04" />

          <text x={lPad + 4} y={toolBandTop + 13} fontSize="6" fontWeight="700" letterSpacing="0.8"
            fill="var(--slide-primary)" opacity="0.35">TOOLMAKER</text>
          <text x={lPad + 4} y={processBandTop + 13} fontSize="6" fontWeight="700" letterSpacing="0.8"
            fill="var(--slide-primary)" opacity="0.35">OPERATOR</text>

          {/* Gap zone: content in each band describes this period — from originator exit to Merit adoption */}
          <rect x={wallX1} y={toolBandTop} width={wallX2 - wallX1} height={toolBandH}
            fill="var(--slide-primary)" fillOpacity="0.05" />
          <rect x={wallX1} y={processBandTop} width={wallX2 - wallX1} height={processBandH}
            fill="var(--slide-primary)" fillOpacity="0.05" />

          {/* Spine */}
          <line x1={lPad} y1={spineY} x2={rightEdge} y2={spineY}
            stroke="var(--slide-border-primary)" strokeWidth="0.6" opacity="0.4" />

          {/* ── WORKER ── */}
          <circle cx={origSmCx} cy={origSmCy} r={origSmR}
            fill="var(--slide-primary)" fillOpacity="0.05"
            stroke="var(--slide-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x={origSmCx} y={origSmCy + 3} fontSize="6.5" fontWeight="700"
            fill="var(--slide-primary)" opacity="0.6" textAnchor="middle">Worker</text>

          {/* Movement arrow: center-to-center, stopping at perimeters */}
          <line
            x1={origLineX1} y1={origLineY1}
            x2={origLineX2} y2={origLineY2}
            stroke="var(--slide-primary)" strokeWidth="1" opacity="0.35"
            markerEnd="url(#og-orig-arr)" />
          <text
            x={becomesLabelX} y={becomesLabelY - 5}
            fontSize="6" fontStyle="italic"
            fill="var(--slide-primary)" opacity="0.5" textAnchor="middle"
            transform={`rotate(${arrowAngleDeg}, ${becomesLabelX}, ${becomesLabelY})`}
          >becomes</text>

          {/* ── ORIGINATOR ── */}
          <circle cx={origCx} cy={origCy} r={origR}
            fill="var(--slide-primary)" fillOpacity="0.07"
            stroke="var(--slide-primary)" strokeWidth="1.5" strokeOpacity="0.4" />
          <text x={origCx} y={origCy - 2} fontSize="6.5" fontWeight="700"
            fill="var(--slide-primary)" opacity="0.6" textAnchor="middle">Pioneer</text>
          <text x={origCx} y={origCy + 9} fontSize="5"
            fill="var(--slide-primary)" opacity="0.32" textAnchor="middle">Process and tool, one</text>

          {/* ── WALL ── */}
          <line x1={wallX1} y1={spineY} x2={wallX2} y2={spineY}
            stroke="var(--slide-text)" strokeWidth="5" strokeOpacity="0.65" />

          {/* ── TIMELINE ── */}
          <path d={`M ${rightEdge - 6} ${spineY - 3} L ${rightEdge} ${spineY} L ${rightEdge - 6} ${spineY + 3} Z`}
            fill="var(--slide-border-primary)" opacity="0.5" />

          <line x1={formX} y1={toolBandTop} x2={formX} y2={processBandTop + processBandH}
            stroke="var(--slide-text)" strokeWidth="0.8" strokeDasharray="2,2" opacity="0.22" />
          <text x={formX} y={toolBandTop - 3} fontSize="5" fontWeight="700" letterSpacing="0.5"
            fill="var(--slide-text)" opacity="0.5" textAnchor="middle">TOOLMAKER FORMATION</text>

          <line x1={nowX} y1={toolBandTop} x2={nowX} y2={processBandTop + processBandH}
            stroke="var(--slide-text)" strokeWidth="0.8" opacity="0.35" />
          <text x={nowX} y={toolBandTop - 3} fontSize="5.5" fontWeight="700" letterSpacing="0.7"
            fill="var(--slide-text)" opacity="0.45" textAnchor="middle">NOW</text>

          <text x={555} y={toolBandTop - 3} fontSize="5.5" fontWeight="700" letterSpacing="0.7"
            fill="var(--slide-accent)" opacity="0.65" textAnchor="middle">MERIT</text>

          {/* ── BAND CONTENT ── */}
          <text x={contentX} y={toolBandTop + 34} fontSize="5" fontWeight="700" letterSpacing="0.7"
            fill="var(--slide-primary)" opacity="0.45">WHY THEIR VIEW OF THE NEED NARROWS</text>
          <text x={contentX} y={toolBandTop + 50} fontSize="6.5"
            fill="var(--slide-text)" opacity="0.5">Every workaround in the field is an unreturned design note.</text>
          <text x={contentX} y={toolBandTop + 64} fontSize="6.5"
            fill="var(--slide-text)" opacity="0.5">Without it, they optimise the tool rather than re-examine the problem.</text>
          <text x={contentX} y={toolBandTop + 78} fontSize="6.5"
            fill="var(--slide-text)" opacity="0.5">The next generation inherits the same untested assumptions.</text>

          <text x={contentX} y={processBandTop + 34} fontSize="5" fontWeight="700" letterSpacing="0.7"
            fill="var(--slide-primary)" opacity="0.45">WHY THE SIGNAL NEVER REACHES THEM</text>
          <text x={contentX} y={processBandTop + 50} fontSize="6.5"
            fill="var(--slide-text)" opacity="0.5">What they've learned to live with, they've stopped noticing.</text>
          <text x={contentX} y={processBandTop + 64} fontSize="6.5"
            fill="var(--slide-text)" opacity="0.5">They don't know what to ask for, because they don't know what's achievable.</text>
          <text x={contentX} y={processBandTop + 78} fontSize="6.5"
            fill="var(--slide-text)" opacity="0.5">When it gets bad enough, they switch suppliers. Not give feedback.</text>

          {/* ── MERIT ── */}
          <path
            d={`M ${meritCx} ${mTop} A ${meritR} ${meritR} 0 0 0 ${meritCx} ${mBot} L ${rightEdge} ${mBot} L ${rightEdge} ${mTop} Z`}
            fill="var(--slide-accent)" fillOpacity="0.05"
          />
          <path
            d={`M ${meritCx} ${mTop} A ${meritR} ${meritR} 0 0 0 ${meritCx} ${mBot}`}
            fill="none"
            stroke="var(--slide-accent)" strokeWidth="1.5" strokeDasharray="5,3" strokeOpacity="0.65"
          />
          <line x1={meritCx} y1={mTop} x2={rightEdge} y2={mTop}
            stroke="var(--slide-accent)" strokeWidth="1.5" strokeDasharray="5,3" strokeOpacity="0.65" />
          <line x1={meritCx} y1={mBot} x2={rightEdge} y2={mBot}
            stroke="var(--slide-accent)" strokeWidth="1.5" strokeDasharray="5,3" strokeOpacity="0.65" />
          <text x={555} y={meritCy + 4}
            fontSize="11" fontWeight="700" fill="var(--slide-accent)" opacity="0.82" textAnchor="middle">Merit</text>
          <text x={555} y={meritCy + 16}
            fontSize="5" fill="var(--slide-text)" opacity="0.5" textAnchor="middle">The process model. Held in data.</text>

          {/* ── VERTICAL ARROWS + BULLET LISTS ── */}

          {/* Maker → Merit: mostly in toolmaker band, tip just crosses arc */}
          <line x1={vX1} y1={topCrossY - outsideL} x2={vX1} y2={topCrossY + insideL}
            stroke="var(--slide-accent)" strokeWidth="0.9" opacity="0.6"
            markerEnd="url(#og-arr)" />
          <text x={bL} y={tBulletY[0]} fontSize="6.5" fill="var(--slide-text)" opacity="0.42" textAnchor="end">· Specification</text>
          <text x={bL} y={tBulletY[1]} fontSize="6.5" fill="var(--slide-text)" opacity="0.42" textAnchor="end">· Process sequence</text>
          <text x={bL} y={tBulletY[2]} fontSize="6.5" fill="var(--slide-text)" opacity="0.42" textAnchor="end">· Operating limits</text>
          <text x={bL} y={tBulletY[3]} fontSize="6.5" fill="var(--slide-text)" opacity="0.42" textAnchor="end">· Safety constraints</text>
          <text x={bL} y={tBulletY[4]} fontSize="6.5" fill="var(--slide-text)" opacity="0.42" textAnchor="end">· Performance targets</text>

          {/* Merit → Maker: tail just inside Merit, exits into toolmaker band */}
          <line x1={vX2} y1={topCrossY + insideL} x2={vX2} y2={topCrossY - outsideL}
            stroke="var(--slide-accent)" strokeWidth="0.9" opacity="0.6"
            markerEnd="url(#og-arr)" />
          <text x={bR} y={tBulletY[0]} fontSize="6.5" fill="var(--slide-text)" opacity="0.42" textAnchor="start">· Field performance data</text>
          <text x={bR} y={tBulletY[1]} fontSize="6.5" fill="var(--slide-text)" opacity="0.42" textAnchor="start">· Deviation patterns</text>
          <text x={bR} y={tBulletY[2]} fontSize="6.5" fill="var(--slide-text)" opacity="0.42" textAnchor="start">· Failure causes</text>
          <text x={bR} y={tBulletY[3]} fontSize="6.5" fill="var(--slide-text)" opacity="0.42" textAnchor="start">· Usage patterns</text>
          <text x={bR} y={tBulletY[4]} fontSize="6.5" fill="var(--slide-text)" opacity="0.42" textAnchor="start">· Operator needs</text>

          {/* Operator → Merit: mostly in operator band, tip just crosses arc */}
          <line x1={vX1} y1={botCrossY + outsideL} x2={vX1} y2={botCrossY - insideL}
            stroke="var(--slide-accent)" strokeWidth="0.9" opacity="0.6"
            markerEnd="url(#og-arr)" />
          <text x={bL} y={pBulletY[0]} fontSize="6.5" fill="var(--slide-text)" opacity="0.42" textAnchor="end">· Execution records</text>
          <text x={bL} y={pBulletY[1]} fontSize="6.5" fill="var(--slide-text)" opacity="0.42" textAnchor="end">· Deviations</text>
          <text x={bL} y={pBulletY[2]} fontSize="6.5" fill="var(--slide-text)" opacity="0.42" textAnchor="end">· Actual outcomes</text>
          <text x={bL} y={pBulletY[3]} fontSize="6.5" fill="var(--slide-text)" opacity="0.42" textAnchor="end">· Resource usage</text>
          <text x={bL} y={pBulletY[4]} fontSize="6.5" fill="var(--slide-text)" opacity="0.42" textAnchor="end">· Document submissions</text>

          {/* Merit → Operator: tail just inside Merit, exits into operator band */}
          <line x1={vX2} y1={botCrossY - insideL} x2={vX2} y2={botCrossY + outsideL}
            stroke="var(--slide-accent)" strokeWidth="0.9" opacity="0.6"
            markerEnd="url(#og-arr)" />
          <text x={bR} y={pBulletY[0]} fontSize="6.5" fill="var(--slide-text)" opacity="0.42" textAnchor="start">· Process to execute</text>
          <text x={bR} y={pBulletY[1]} fontSize="6.5" fill="var(--slide-text)" opacity="0.42" textAnchor="start">· Forecasts</text>
          <text x={bR} y={pBulletY[2]} fontSize="6.5" fill="var(--slide-text)" opacity="0.42" textAnchor="start">· Schedule</text>
          <text x={bR} y={pBulletY[3]} fontSize="6.5" fill="var(--slide-text)" opacity="0.42" textAnchor="start">· Stage gates</text>
          <text x={bR} y={pBulletY[4]} fontSize="6.5" fill="var(--slide-text)" opacity="0.42" textAnchor="start">· Compliance record</text>

        </svg>
      </div>
    </SlideLayout>
  );
}
