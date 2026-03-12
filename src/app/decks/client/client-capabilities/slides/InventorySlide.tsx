import { SlideLayout } from '@/components/slides/SlideLayout';

export function InventorySlide() {
  const rules = [
    { label: 'Cladding sheets', rule: 'floor area x 1.10' },
    { label: 'Fixings',         rule: 'cladding sheets x 6' },
    { label: 'Membrane',        rule: 'floor area x 1.00' },
    { label: 'Sealant',         rule: 'cladding sheets / 9' },
  ];

  const boq = [
    { item: 'Cladding sheets', qty: '242 units' },
    { item: 'Fixings',         qty: '1,450' },
    { item: 'Membrane',        qty: '220 m²' },
    { item: 'Sealant',         qty: '28 tubes' },
  ];

  const inventory = [
    { item: 'Cladding',  required: '242',    stock: '350',     ok: true },
    { item: 'Fixings',   required: '1,450',  stock: '820',     ok: false },
    { item: 'Membrane',  required: '220 m²', stock: '300 m²',  ok: true },
    { item: 'Sealant',   required: '28',     stock: '52',      ok: true },
  ];

  // Box dimensions
  const boxY = 8;
  const boxH = 200;
  const boxBottom = boxY + boxH; // 208

  // Column widths / positions
  const specX  = 8;   const specW  = 165;
  const boqX   = 198; const boqW   = 165;
  const invX   = 388; const invW   = 264;

  // Shared row layout (same for all three boxes)
  const headerY    = boxY + 22;     // box title
  const subtitleY  = boxY + 36;     // box subtitle
  const dividerY   = boxY + 43;
  const colLabelY  = boxY + 56;
  const rowStartY  = boxY + 64;
  const rowH       = 26;
  const rowStep    = 32;

  // Row centers (text baseline offset from row rect top)
  const rowTextDY = 17;

  return (
    <SlideLayout
      title="Inventory"
      subtitle="Calculation rules embedded in the spec quantify materials against the scope. The bill of quantities feeds directly into stock management."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox="0 0 660 212" style={{ width: '100%', height: '100%' }}>
          <defs>
            <marker id="arrowhead-inv" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--slide-primary)" opacity="0.5" />
            </marker>
          </defs>

          {/* ── SPECIFICATION BOX ── */}
          <rect x={specX} y={boxY} width={specW} height={boxH} rx="8"
            fill="var(--slide-bg-accent-muted)" stroke="var(--slide-accent)" strokeWidth="1.5" />
          <text x={specX + specW / 2} y={headerY} textAnchor="middle" fontSize="11" fontWeight="700"
            fill="var(--slide-accent)">Specification</text>
          <line x1={specX + 10} y1={dividerY} x2={specX + specW - 10} y2={dividerY}
            stroke="var(--slide-accent)" strokeWidth="0.8" opacity="0.3" />

          <text x={specX + 12} y={boxY + 55} fontSize="7.5" fontWeight="600"
            fill="var(--slide-text)" opacity="0.4">SCOPE INPUT</text>
          <text x={specX + 12} y={boxY + 68} fontSize="9.5"
            fill="var(--slide-text)" opacity="0.85">Floor area: 220 m²</text>

          <text x={specX + 12} y={boxY + 84} fontSize="7.5" fontWeight="600"
            fill="var(--slide-text)" opacity="0.4">CALCULATION RULES</text>
          {rules.map(({ label, rule }, i) => (
            <g key={label}>
              <text x={specX + 12} y={boxY + 97 + i * 27} fontSize="8.5" fontWeight="600"
                fill="var(--slide-primary)" opacity="0.9">{label}</text>
              <text x={specX + 12} y={boxY + 109 + i * 27} fontSize="8.5"
                fill="var(--slide-text)" opacity="0.6">{rule}</text>
            </g>
          ))}

          {/* Arrow 1 */}
          <line
            x1={specX + specW} y1={boxY + boxH / 2}
            x2={boqX - 12}     y2={boxY + boxH / 2}
            stroke="var(--slide-primary)" strokeWidth="1.5" opacity="0.4"
            markerEnd="url(#arrowhead-inv)" />

          {/* ── BILL OF QUANTITIES BOX ── */}
          <rect x={boqX} y={boxY} width={boqW} height={boxH} rx="8"
            fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)" strokeWidth="1.5" />
          <text x={boqX + boqW / 2} y={headerY} textAnchor="middle" fontSize="11" fontWeight="700"
            fill="var(--slide-primary)">Bill of Quantities</text>
          <text x={boqX + boqW / 2} y={subtitleY} textAnchor="middle" fontSize="7.5"
            fill="var(--slide-text)" opacity="0.5">Derived from specification</text>
          <line x1={boqX + 10} y1={dividerY} x2={boqX + boqW - 10} y2={dividerY}
            stroke="var(--slide-border-primary)" strokeWidth="0.8" opacity="0.5" />

          <text x={boqX + 10} y={colLabelY} fontSize="7.5" fontWeight="600"
            fill="var(--slide-text)" opacity="0.4">ITEM</text>
          <text x={boqX + boqW - 10} y={colLabelY} textAnchor="end" fontSize="7.5" fontWeight="600"
            fill="var(--slide-text)" opacity="0.4">QTY</text>

          {boq.map(({ item, qty }, i) => {
            const ry = rowStartY + i * rowStep;
            return (
              <g key={item}>
                <rect x={boqX + 8} y={ry} width={boqW - 16} height={rowH} rx="4"
                  fill="var(--slide-bg-card)" stroke="var(--slide-border-primary)" strokeWidth="1" opacity="0.85" />
                <text x={boqX + 16} y={ry + rowTextDY} fontSize="9"
                  fill="var(--slide-text)" opacity="0.8">{item}</text>
                <text x={boqX + boqW - 16} y={ry + rowTextDY} textAnchor="end" fontSize="9" fontWeight="600"
                  fill="var(--slide-primary)">{qty}</text>
              </g>
            );
          })}

          {/* Arrow 2 */}
          <line
            x1={boqX + boqW} y1={boxY + boxH / 2}
            x2={invX - 12}   y2={boxY + boxH / 2}
            stroke="var(--slide-primary)" strokeWidth="1.5" opacity="0.4"
            markerEnd="url(#arrowhead-inv)" />

          {/* ── INVENTORY BOX ── */}
          <rect x={invX} y={boxY} width={invW} height={boxH} rx="8"
            fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)" strokeWidth="1.5" />
          <text x={invX + invW / 2} y={headerY} textAnchor="middle" fontSize="11" fontWeight="700"
            fill="var(--slide-primary)">Inventory</text>
          <text x={invX + invW / 2} y={subtitleY} textAnchor="middle" fontSize="7.5"
            fill="var(--slide-text)" opacity="0.5">Stock management</text>
          <line x1={invX + 10} y1={dividerY} x2={invX + invW - 10} y2={dividerY}
            stroke="var(--slide-border-primary)" strokeWidth="0.8" opacity="0.5" />

          {/* Column headers */}
          <text x={invX + 12} y={colLabelY} fontSize="7.5" fontWeight="600"
            fill="var(--slide-text)" opacity="0.4">ITEM</text>
          <text x={invX + 148} y={colLabelY} textAnchor="middle" fontSize="7.5" fontWeight="600"
            fill="var(--slide-text)" opacity="0.4">NEEDED</text>
          <text x={invX + 218} y={colLabelY} textAnchor="middle" fontSize="7.5" fontWeight="600"
            fill="var(--slide-text)" opacity="0.4">IN STOCK</text>

          {inventory.map(({ item, required, stock, ok }, i) => {
            const ry = rowStartY + i * rowStep;
            return (
              <g key={item}>
                <rect x={invX + 8} y={ry} width={invW - 16} height={rowH} rx="4"
                  fill="var(--slide-bg-card)" stroke="var(--slide-border-primary)" strokeWidth="1" opacity="0.85" />
                <text x={invX + 16} y={ry + rowTextDY} fontSize="9"
                  fill="var(--slide-text)" opacity="0.8">{item}</text>
                <text x={invX + 148} y={ry + rowTextDY} textAnchor="middle" fontSize="9"
                  fill="var(--slide-text)" opacity="0.7">{required}</text>
                <text x={invX + 218} y={ry + rowTextDY} textAnchor="middle" fontSize="9"
                  fill="var(--slide-text)" opacity="0.7">{stock}</text>
                <circle cx={invX + invW - 20} cy={ry + rowH / 2} r="5"
                  fill={ok ? 'var(--slide-primary)' : 'var(--slide-accent)'}
                  opacity={ok ? 0.5 : 0.85} />
              </g>
            );
          })}

          {/* Legend */}
          <circle cx={invX + 10} cy={boxBottom - 8} r="4" fill="var(--slide-primary)" opacity="0.5" />
          <text x={invX + 18} y={boxBottom - 4} fontSize="7.5" fill="var(--slide-text)" opacity="0.4">In stock</text>
          <circle cx={invX + 68} cy={boxBottom - 8} r="4" fill="var(--slide-accent)" opacity="0.85" />
          <text x={invX + 76} y={boxBottom - 4} fontSize="7.5" fill="var(--slide-text)" opacity="0.4">Shortfall</text>
        </svg>
      </div>
    </SlideLayout>
  );
}
