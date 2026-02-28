import { RefreshCw } from 'lucide-react';

export function OrganisationSlide() {
  const deliveryRoles = [
    { label: 'Estimation', x: 75  },
    { label: 'Planning',   x: 155 },
    { label: 'Design',     x: 235 },
    { label: 'Execution',  x: 315 },
    { label: 'Quality',    x: 395 },
  ];

  const flowArrowXs = deliveryRoles.slice(0, -1).map(r => r.x + 58);

  const supportRoles = [
    { label: 'Finance',     x: 74  },
    { label: 'HR',          x: 139 },
    { label: 'Legal',       x: 204 },
    { label: 'Operations',  x: 269 },
    { label: 'Procurement', x: 334 },
    { label: 'IT',          x: 399 },
  ];

  return (
    <div className="w-full h-full p-8 flex flex-col">

      {/* Header */}
      <div className="mb-5 shrink-0">
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--slide-primary)' }}>
          The Organisation
        </h2>
        <div className="w-20 h-1 mb-2" style={{ backgroundColor: 'var(--slide-accent)' }} />
        <p className="text-sm" style={{ color: 'var(--slide-text)', opacity: 0.7 }}>
          Every organisation, regardless of what it delivers, is structured around the same two layers.
        </p>
      </div>

      {/* Diagram */}
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox="0 0 700 264" style={{ width: '100%', height: '100%' }}>
          <defs>
            <marker id="arrowhead-org" markerWidth="14" markerHeight="10" refX="0" refY="5" orient="auto" markerUnits="userSpaceOnUse">
              <polygon points="0 0, 14 5, 0 10" fill="var(--slide-primary)" opacity="0.5" />
            </marker>
            <marker id="arrowhead-flow" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto" markerUnits="userSpaceOnUse">
              <polygon points="0 0, 8 3, 0 6" fill="var(--slide-primary)" opacity="0.6" />
            </marker>
          </defs>

          {/* ── OUTER ORGANISATION BOX — 7px padding all sides (x=28 to 500, y=0 to 264) ── */}
          <rect x="28" y="0" width="472" height="264" rx="12"
            fill="var(--slide-bg-muted)" stroke="var(--slide-border)" strokeWidth="1.5" />

          {/* ── DELIVERY TEAM BOX — y=7, h=120, bottom=127, centre y=67 ── */}
          <rect x="35" y="7" width="458" height="120" rx="8"
            fill="var(--slide-bg-card)" stroke="var(--slide-primary)" strokeWidth="2" />
          <text x="264" y="37" textAnchor="middle" fontSize="13" fontWeight="700"
            fill="var(--slide-primary)">Delivery Functions</text>
          <text x="264" y="51" textAnchor="middle" fontSize="9"
            fill="var(--slide-text)" opacity="0.6">The core of the organisation.</text>
          <text x="264" y="63" textAnchor="middle" fontSize="9"
            fill="var(--slide-text)" opacity="0.6">Every function directly involved in producing the product belongs here.</text>
          <text x="264" y="75" textAnchor="middle" fontSize="9"
            fill="var(--slide-text)" opacity="0.6">From initial estimation through to quality sign-off.</text>

          {/* Delivery role pills — y=89, h=20 */}
          {deliveryRoles.map(({ label, x }) => (
            <g key={label}>
              <rect x={x} y={89} width={58} height={20} rx="4"
                fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)" strokeWidth="1" />
              <text x={x + 29} y={103} textAnchor="middle" fontSize="9"
                fill="var(--slide-primary)" opacity="0.85">{label}</text>
            </g>
          ))}

          {/* Inter-role flow arrows at pill centre y=99 */}
          {flowArrowXs.map(x => (
            <line key={x} x1={x + 2} y1={99} x2={x + 14} y2={99}
              stroke="var(--slide-primary)" strokeWidth="1.2" opacity="0.45"
              markerEnd="url(#arrowhead-flow)" />
          ))}

          {/* ── SUPPORT FUNCTIONS BOX — y=137, h=120, bottom=257, centre y=197 ── */}
          <rect x="35" y="137" width="458" height="120" rx="8"
            fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)" strokeWidth="1.5" />
          <text x="264" y="169" textAnchor="middle" fontSize="13" fontWeight="700"
            fill="var(--slide-primary)">Support Functions</text>
          <text x="264" y="183" textAnchor="middle" fontSize="9"
            fill="var(--slide-text)" opacity="0.6">The team that enables the delivery team to operate.</text>
          <text x="264" y="195" textAnchor="middle" fontSize="9"
            fill="var(--slide-text)" opacity="0.6">They provide the resources, compliance and infrastructure that delivery depends on.</text>

          {/* Support role pills — y=211, h=20, 55px wide, 10px gap */}
          {supportRoles.map(({ label, x }) => (
            <g key={label}>
              <rect x={x} y={211} width={55} height={20} rx="4"
                fill="white" stroke="var(--slide-border-primary)" strokeWidth="1" opacity="0.8" />
              <text x={x + 27.5} y={225} textAnchor="middle" fontSize="8"
                fill="var(--slide-primary)" opacity="0.85">{label}</text>
            </g>
          ))}

          {/* ── CYCLE ICON — centred in gap at x=264 y=132 ── */}
          {/* Gap runs y=127–137. Circle r=18 spans y=114–150 */}
          <circle cx="264" cy="132" r="18"
            fill="var(--slide-bg-card)" stroke="var(--slide-border-primary)" strokeWidth="1.5" />
          <foreignObject x="246" y="114" width="36" height="36">
            <div
              style={{
                width: '100%', height: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--slide-primary)', opacity: 0.6,
              }}
            >
              <RefreshCw size={20} strokeWidth={1.8} />
            </div>
          </foreignObject>

          {/* ── DELIVERY → PRODUCTS ARROW — from right edge centre y=67 ── */}
          <line x1="493" y1="67" x2="536" y2="67"
            stroke="var(--slide-primary)" strokeWidth="1.8" opacity="0.4"
            markerEnd="url(#arrowhead-org)" />

          {/* ── PRODUCTS BOX — centred at y=67, aligned with delivery team ── */}
          <rect x="550" y="37" width="140" height="60" rx="8"
            fill="var(--slide-bg-accent-muted)" stroke="var(--slide-accent)" strokeWidth="2" />
          <text x="620" y="73" textAnchor="middle" fontSize="14" fontWeight="700"
            fill="var(--slide-accent)">Products</text>

        </svg>
      </div>
    </div>
  );
}
