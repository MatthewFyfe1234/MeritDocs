export function BeforeSlide() {
  const capabilities = [
    { name: 'Process Mapping & SOPs',        tools: 'BPM, process mining' },
    { name: 'Project Management',            tools: 'PPM, work management' },
    { name: 'Product Specification',         tools: 'PLM, CPQ, PDM' },
    { name: 'Business Intelligence',         tools: 'BI, analytics, data viz' },
    { name: 'HR & Performance',              tools: 'HRIS, HCM, LMS' },
    { name: 'Systems Optimisation',          tools: 'APM, ITSM, RPA' },
    { name: 'Inventory Management',          tools: 'IMS, WMS, ERP' },
    { name: 'Workforce Management',          tools: 'WFM, scheduling' },
    { name: 'Resource Planning',             tools: 'ERP, capacity planning' },
    { name: 'Document & Knowledge',          tools: 'DMS, KMS, CMS, QMS' },
  ];

  return (
    <div className="w-full h-full p-8 flex flex-col">

      <div className="mb-4 shrink-0">
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--slide-primary)' }}>
          A Patchwork of Platforms
        </h2>
        <div className="w-20 h-1 mb-2" style={{ backgroundColor: 'var(--slide-accent)' }} />
        <p className="text-sm" style={{ color: 'var(--slide-text)', opacity: 0.7 }}>
          Each function runs on its own set of specialised tools — disconnected, duplicated, and expensive to maintain.
        </p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-2 gap-2">
        {capabilities.map(({ name, tools }) => (
          <div
            key={name}
            className="flex items-baseline gap-2 px-3 py-2 rounded"
            style={{
              backgroundColor: 'var(--slide-bg-primary-muted)',
              border: '1px solid var(--slide-border-primary)',
            }}
          >
            <span className="text-xs font-semibold shrink-0" style={{ color: 'var(--slide-primary)' }}>
              {name}
            </span>
            <span className="text-xs" style={{ color: 'var(--slide-text)', opacity: 0.5 }}>
              {tools}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
