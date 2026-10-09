import { SlideLayout } from '@/components/slides/SlideLayout';

const organs = [
  {
    n: '01',
    label: 'Process',
    role: 'Generative',
    body: 'The central organ. Encodes what must happen, in what order. Source of the data that specifies and optimises everything else.',
    accent: true,
  },
  {
    n: '02',
    label: 'Product',
    role: 'Terminus',
    body: 'The desired state. Defined by spec, delivered by executing the process. What the other organs are organised toward.',
    accent: false,
  },
  {
    n: '03',
    label: 'Agents',
    role: 'Instrument',
    body: 'People and organisations who execute. Trained and selected against process-defined tasks. Their execution generates the data that refines the process.',
    accent: false,
  },
  {
    n: '04',
    label: 'Inventory',
    role: 'Instrument',
    body: 'Materials and tools. Specified and evaluated by what the process demands. Their performance data feeds back into the process.',
    accent: false,
  },
];

export function OrgansOfProductionSlide() {
  return (
    <SlideLayout title="The Organs of Production" subtitle="Four parts, playing different roles. Process is the generative centre.">
      <div className="flex-1 flex flex-col gap-6 min-h-0">

        <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.8, maxWidth: '76ch' }}>
          Production is composed of four organs, not four equal parts. Process is generative: it produces the
          structure and the data that the other organs are specified, trained, and evaluated against. Product is
          the terminus it is aimed at. Agents and Inventory are instruments it deploys, and the two organs that
          feed data back, closing the loop.
        </p>

        {/* Hub and spoke diagram */}
        <div className="flex-1 flex items-center justify-center min-h-0">
          <svg viewBox="0 0 360 220" style={{ width: '100%', maxWidth: '520px', height: 'auto', fontFamily: 'inherit' }}>
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 z" fill="var(--slide-border-primary)" fillOpacity="0.6" />
              </marker>
              <marker id="arrowAccent" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 z" fill="var(--slide-accent)" fillOpacity="0.8" />
              </marker>
            </defs>

            {/* Process -> Product (one-way: specifies) */}
            <line x1="180" y1="82" x2="180" y2="38" stroke="var(--slide-accent)" strokeOpacity="0.6" strokeWidth="1.2" markerEnd="url(#arrowAccent)" />
            <text x="196" y="60" fontSize="7" fontStyle="italic" fill="var(--slide-text)" fillOpacity="0.45">specifies</text>

            {/* Process <-> Agents */}
            <line x1="152" y1="118" x2="82" y2="168" stroke="var(--slide-border-primary)" strokeOpacity="0.55" strokeWidth="1.2" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
            <text x="70" y="145" fontSize="7" fontStyle="italic" fill="var(--slide-text)" fillOpacity="0.4">trains / selects</text>
            <text x="60" y="188" fontSize="7" fontStyle="italic" fill="var(--slide-text)" fillOpacity="0.4">execution data</text>

            {/* Process <-> Inventory */}
            <line x1="208" y1="118" x2="278" y2="168" stroke="var(--slide-border-primary)" strokeOpacity="0.55" strokeWidth="1.2" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
            <text x="222" y="145" fontSize="7" fontStyle="italic" fill="var(--slide-text)" fillOpacity="0.4">specifies</text>
            <text x="232" y="188" fontSize="7" fontStyle="italic" fill="var(--slide-text)" fillOpacity="0.4">performance data</text>

            {/* Product node */}
            <rect x="140" y="10" width="80" height="26" rx="4" fill="var(--slide-bg-card)" stroke="var(--slide-border)" strokeWidth="0.8" />
            <text x="180" y="27" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--slide-text)" fillOpacity="0.8">Product</text>

            {/* Agents node */}
            <rect x="15" y="170" width="80" height="26" rx="4" fill="var(--slide-bg-card)" stroke="var(--slide-border)" strokeWidth="0.8" />
            <text x="55" y="187" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--slide-text)" fillOpacity="0.8">Agents</text>

            {/* Inventory node */}
            <rect x="265" y="170" width="80" height="26" rx="4" fill="var(--slide-bg-card)" stroke="var(--slide-border)" strokeWidth="0.8" />
            <text x="305" y="187" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--slide-text)" fillOpacity="0.8">Inventory</text>

            {/* Process node (centre, drawn last so lines tuck under it) */}
            <circle cx="180" cy="100" r="38" fill="var(--slide-bg-accent-muted)" stroke="var(--slide-accent)" strokeWidth="1.4" />
            <text x="180" y="97" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--slide-accent)">Process</text>
            <text x="180" y="111" textAnchor="middle" fontSize="6.5" fontStyle="italic" fill="var(--slide-accent)" fillOpacity="0.75">generative centre</text>
          </svg>
        </div>

        {/* Four organ cards */}
        <div className="grid grid-cols-4 gap-4" style={{ flex: '0 0 auto' }}>
          {organs.map(({ n, label, role, body, accent }) => (
            <div
              key={n}
              className="flex flex-col gap-1.5 p-3 rounded-lg"
              style={{
                backgroundColor: accent ? 'var(--slide-bg-accent-muted)' : 'var(--slide-bg-card)',
                border: accent ? '1px solid var(--slide-accent)' : '1px solid transparent',
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: accent ? 'var(--slide-accent)' : 'var(--slide-text)', opacity: accent ? 0.9 : 0.7 }}
                >
                  {label}
                </span>
                <span
                  className="text-[9px] font-semibold uppercase tracking-widest"
                  style={{ color: accent ? 'var(--slide-accent)' : 'var(--slide-text)', opacity: 0.4 }}
                >
                  {role}
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>
                {body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </SlideLayout>
  );
}

/*
 * NOTES
 *
 * Opening structural slide, introduced after the deck's title was reframed around "The Organs of
 * Production." The four organs are not peers: Process is generative and central, producing the
 * data and structure that Product, Agents, and Inventory are specified, trained, and evaluated
 * against. Product is the terminus - the desired state the process is aimed at, defined by spec.
 * Agents and Inventory are instruments the process deploys, and the two organs that close the loop
 * by feeding execution and performance data back into the process.
 *
 * This slide exists to state that structure up front, once, visually, before the rest of the deck
 * argues each piece of it in turn: Best Process and Delivery Composition (Process), Master Process
 * and Natural Authors (how Process is built and who authors it), Who Sets Goals (Product), Incentive
 * Alignment and Telemetry (Agents), and capital placement / selection (Inventory, currently thin -
 * a dedicated Inventory slide on how capital equipment is routed by need and skill rather than
 * ownership is a likely future addition, discussed but not yet built).
 *
 * Deliberately placed early (after Cover) rather than folded into State Attenuation, since it
 * frames the whole deck's model rather than the delivery/maintenance distinction specifically.
 */
