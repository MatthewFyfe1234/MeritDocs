const tools = [
  {
    name: 'Excel / Spreadsheets',
    stage: 'All stages',
    gap: 'The connective tissue of every stage, and the source of most data loss. No workflow automation, version chaos across teams, and zero real-time visibility into project state.',
    positioning: 'replace',
  },
  {
    name: 'FabTrol / Strumis',
    stage: 'Fabrication',
    gap: 'Standalone production tracking for structural fabrication: material release, work orders, QC, and shipping logs. Valuable on the shop floor, but siloed from sales, estimating, and project management. Progress data never reaches the people who made the commitments.',
    positioning: 'replace',
  },
  {
    name: 'Moducore',
    stage: 'Offsite ERP',
    gap: 'Built for offsite production with CPQ and factory tracking. Project intelligence stays trapped in the system — historical performance data does not feed back into estimates, procurement, or HR. No cross-project learning mechanism.',
    positioning: 'replace',
  },
  {
    name: 'Sage / QuickBooks / Xero',
    stage: 'Finance',
    gap: 'Project costs are manually re-entered at job close, giving finance a lagging, incomplete picture throughout execution. Integration means job costing flows from Merit OI automatically, with no double-entry.',
    positioning: 'integrate',
  },
  {
    name: 'Revit / Tekla / AutoCAD',
    stage: 'Design & Procurement',
    gap: 'Powerful for drawing production and BIM, but outputs stay locked in the design tool. BOMs and fabrication drawings are manually transferred, introducing errors at the most critical handoff.',
    positioning: 'integrate',
  },
  {
    name: 'Buildertrend',
    stage: 'Sales / Site',
    gap: 'Adequate for residential project tracking, but disconnected from design data and shop floor reality. Gives the illusion of progress visibility without the substance.',
    positioning: 'replace',
  },
  {
    name: 'Autodesk Construction Cloud',
    stage: 'Project Management / Site',
    gap: 'Strong document management and project coordination for the site phase, but construction-centric by design. Factory production is invisible to it, and estimating lives in entirely separate systems. It solves information distribution only downstream of where margin is actually won or lost.',
    positioning: 'replace',
  },
  {
    name: 'Procore',
    stage: 'Installation',
    gap: 'Excellent for site document control, but factory-blind. Merit OI covers site tracking, document control, and progress reporting within the same integrated platform that runs your factory, closing the gap between what is built and what is recorded on site.',
    positioning: 'replace',
  },
  {
    name: 'MS Project / Smartsheet',
    stage: 'Project planning',
    gap: 'Static plans that go stale the moment they are published. No live factory capacity data, no connection to resource availability. Schedules are aspirational, not operational.',
    positioning: 'replace',
  },
];

const REPLACE = { bg: '#fff7ed', text: '#c2410c', border: '#fed7aa', label: 'Replace' };
const INTEGRATE = { bg: 'var(--slide-bg-primary-muted)', text: 'var(--slide-primary)', border: 'var(--slide-border-primary)', label: 'Integrate' };

export function ToolStackSlide() {
  return (
    <div className="w-full h-full p-8 flex flex-col">

      {/* Header */}
      <div className="mb-4">
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--slide-primary)' }}>
          The Current Tool Stack
        </h2>
        <div className="w-20 h-1" style={{ backgroundColor: 'var(--slide-accent)' }} />
        <p className="text-xs mt-2" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>
          Replace the commodity layer, integrate with the specialist tools that stay
        </p>
      </div>

      {/* Tool rows */}
      <div className="flex-1 min-h-0 flex flex-col gap-1.5">
        {tools.map((t) => {
          const style = t.positioning === 'replace' ? REPLACE : INTEGRATE;
          return (
            <div
              key={t.name}
              className="flex-1 min-h-0 bg-white rounded-lg border flex items-center gap-4 px-4"
              style={{ borderColor: 'var(--slide-border)', borderLeft: `3px solid ${style.text}` }}
            >
              {/* Tool + stage */}
              <div className="shrink-0" style={{ width: '190px' }}>
                <div className="text-sm font-semibold leading-tight" style={{ color: 'var(--slide-primary)' }}>{t.name}</div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--slide-text)', opacity: 0.5 }}>{t.stage}</div>
              </div>

              {/* Gap description */}
              <p className="flex-1 text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.8 }}>{t.gap}</p>

              {/* Positioning chip */}
              <span
                className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold"
                style={{ backgroundColor: style.bg, color: style.text, border: `1px solid ${style.border}` }}
              >
                {style.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Orchestration summary */}
      <div className="shrink-0 mt-3 rounded-lg p-3" style={{ backgroundColor: 'var(--slide-bg-primary-muted)', border: '1px solid var(--slide-border-primary)' }}>
        <p className="text-xs font-medium" style={{ color: 'var(--slide-primary)' }}>
          <span style={{ color: 'var(--slide-accent)', fontWeight: 700 }}>Positioning: </span>
          Merit OI is a connected model of your delivery chain, replacing the commodity tools that silo data, with medium-term ambitions to integrate with the specialist systems (design, finance) that stay in place.
        </p>
      </div>

    </div>
  );
}