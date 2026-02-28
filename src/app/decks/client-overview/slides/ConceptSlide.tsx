export function ConceptSlide() {
  return (
    <div className="w-full h-full p-8 flex flex-col relative">

      {/* Callout — top-right */}
      <div
        className="absolute rounded-lg p-3"
        style={{ top: '32px', right: '32px', width: '210px', backgroundColor: 'var(--slide-bg-primary-muted)', border: '1px solid var(--slide-border-primary)' }}
      >
        <p className="text-xs font-semibold mb-1" style={{ color: 'var(--slide-primary)' }}>
          Your whole operation, one model
        </p>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.75 }}>
          Covers your internal delivery functions and your wider network of suppliers and partners.
        </p>
      </div>

      {/* Callout — bottom-right */}
      <div
        className="absolute rounded-lg p-3"
        style={{ bottom: '32px', right: '32px', width: '210px', backgroundColor: 'var(--slide-bg-primary-muted)', border: '1px solid var(--slide-border-primary)' }}
      >
        <p className="text-xs font-semibold mb-1" style={{ color: 'var(--slide-primary)' }}>
          How a delivery works
        </p>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.75 }}>
          Each delivery is its own shopping list, drawing only the agents, inventory and process steps it needs from the master model.
        </p>
      </div>

      {/* Header */}
      <div className="mb-3 shrink-0">
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--slide-primary)' }}>
          The Core Model
        </h2>
        <div className="w-20 h-1" style={{ backgroundColor: 'var(--slide-accent)' }} />
        <p className="text-xs mt-2" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>
          A process-centric perspective of product delivery, as carried out by the <em>delivery functions</em>
        </p>
      </div>

      {/* Diagram */}
      <div className="flex-1 min-h-0 flex items-start justify-center">
        <svg viewBox="0 0 660 280" style={{ width: '100%' }}>
          <defs>
            <marker id="arrowhead-concept" markerWidth="14" markerHeight="10" refX="0" refY="5" orient="auto" markerUnits="userSpaceOnUse">
              <polygon points="0 0, 14 5, 0 10" fill="var(--slide-primary)" opacity="0.5" />
            </marker>
          </defs>

          {/* ── AGENTS BOX ── */}
          <rect x="40" y="10" width="158" height="112" rx="8"
            fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)" strokeWidth="1.5" />
          <text x="119" y="58" textAnchor="middle" fontSize="13" fontWeight="700"
            fill="var(--slide-primary)">Agents</text>
          <text x="119" y="76" textAnchor="middle" fontSize="10.5"
            fill="var(--slide-text)" opacity="0.7">People, skills and roles</text>

          {/* ── INVENTORY BOX ── */}
          <rect x="40" y="158" width="158" height="112" rx="8"
            fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)" strokeWidth="1.5" />
          <text x="119" y="207" textAnchor="middle" fontSize="13" fontWeight="700"
            fill="var(--slide-primary)">Inventory</text>
          <text x="119" y="225" textAnchor="middle" fontSize="10.5"
            fill="var(--slide-text)" opacity="0.7">Tools, materials and equipment</text>

          {/* ── CONNECTORS ── */}
          <path d="M198,66 H219 A8,8,0,0,1,227,74 V132 A8,8,0,0,0,235,140 H256"
            stroke="var(--slide-primary)" strokeWidth="1.8" fill="none" opacity="0.4"
            markerEnd="url(#arrowhead-concept)" />
          <path d="M198,214 H219 A8,8,0,0,0,227,206 V148 A8,8,0,0,1,235,140 H256"
            stroke="var(--slide-primary)" strokeWidth="1.8" fill="none" opacity="0.4"
            markerEnd="url(#arrowhead-concept)" />

          {/* ── PROCESS BOX ── */}
          <rect x="270" y="65" width="158" height="150" rx="8"
            fill="var(--slide-bg-card)" stroke="var(--slide-primary)" strokeWidth="2" />
          <text x="349" y="119" textAnchor="middle" fontSize="14" fontWeight="700"
            fill="var(--slide-primary)">Process</text>
          <text x="349" y="141" textAnchor="middle" fontSize="10"
            fill="var(--slide-text)" opacity="0.6">Configured steps,</text>
          <text x="349" y="155" textAnchor="middle" fontSize="10"
            fill="var(--slide-text)" opacity="0.6">handoffs and</text>
          <text x="349" y="169" textAnchor="middle" fontSize="10"
            fill="var(--slide-text)" opacity="0.6">workflows</text>

          {/* ── PROCESS → RESULT CONNECTOR ── */}
          <line x1="428" y1="140" x2="446" y2="140"
            stroke="var(--slide-primary)" strokeWidth="1.8" opacity="0.4"
            markerEnd="url(#arrowhead-concept)" />

          {/* ── RESULT BOX ── */}
          <rect x="460" y="65" width="158" height="150" rx="8"
            fill="var(--slide-bg-accent-muted)" stroke="var(--slide-accent)" strokeWidth="2" />
          <text x="539" y="119" textAnchor="middle" fontSize="14" fontWeight="700"
            fill="var(--slide-accent)">Result</text>
          <text x="539" y="141" textAnchor="middle" fontSize="10"
            fill="var(--slide-text)" opacity="0.6">Products and</text>
          <text x="539" y="155" textAnchor="middle" fontSize="10"
            fill="var(--slide-text)" opacity="0.6">outcomes</text>
          <text x="539" y="169" textAnchor="middle" fontSize="10"
            fill="var(--slide-text)" opacity="0.6">delivered</text>

        </svg>
      </div>
    </div>
  );
}
