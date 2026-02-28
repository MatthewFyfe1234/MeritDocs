type Coverage = 'native' | 'peripheral' | 'none';

const CAT = {
  status:        { bg: '#f1f5f9', text: '#64748b' },
  construction:  { bg: '#dbeafe', text: '#1d4ed8' },
  manufacturing: { bg: '#fff7ed', text: '#c2410c' },
  offsite:       { bg: 'var(--slide-bg-primary-muted)', text: 'var(--slide-primary)' },
};

type CapKey = 'cpq' | 'pm' | 'factory' | 'site' | 'bi' | 'memory';

type Competitor = {
  name: string;
  category: string;
  cat: keyof typeof CAT;
  isStatusQuo?: boolean;
} & Record<CapKey, Coverage>;

const competitors: Competitor[] = [
  { name: 'Excel / Whiteboards', category: 'Status quo',         cat: 'status',        isStatusQuo: true, cpq: 'peripheral', pm: 'peripheral', factory: 'peripheral', site: 'none',       bi: 'none',       memory: 'none' },
  { name: 'Procore',             category: 'Construction PM',    cat: 'construction',                     cpq: 'none',       pm: 'native',     factory: 'none',       site: 'native',     bi: 'peripheral', memory: 'none' },
  { name: 'Sage / Viewpoint',    category: 'Construction ERP',   cat: 'construction',                     cpq: 'none',       pm: 'none',       factory: 'none',       site: 'peripheral', bi: 'peripheral', memory: 'none' },
  { name: 'Epicor / JobBOSS',    category: 'Manufacturing ERP',  cat: 'manufacturing',                    cpq: 'native',     pm: 'peripheral', factory: 'native',     site: 'none',       bi: 'peripheral', memory: 'none' },
  { name: 'Offsight',            category: 'Offsite production', cat: 'offsite',                          cpq: 'none',       pm: 'peripheral', factory: 'native',     site: 'none',       bi: 'none',       memory: 'none' },
  { name: 'Moducore',            category: 'Offsite ERP',        cat: 'offsite',                          cpq: 'native',     pm: 'peripheral', factory: 'native',     site: 'peripheral', bi: 'peripheral', memory: 'none' },
];

const caps: { key: CapKey; label: string }[] = [
  { key: 'cpq',     label: 'CPQ / Quoting'         },
  { key: 'pm',      label: 'Project Management'    },
  { key: 'factory', label: 'Factory & Production'  },
  { key: 'site',    label: 'Site & Install'        },
  { key: 'bi',      label: 'Business Intelligence' },
  { key: 'memory',  label: 'Org. Learning'          },
];

function Dot({ level, isMerit = false }: { level: Coverage; isMerit?: boolean }) {
  if (level === 'native') {
    return (
      <div
        className="w-4 h-4 rounded-full mx-auto flex items-center justify-center"
        style={{ backgroundColor: isMerit ? 'var(--slide-accent)' : 'var(--slide-primary)' }}
      >
        <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
          <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }
  if (level === 'peripheral') {
    return (
      <div
        className="w-4 h-4 rounded-full mx-auto flex items-center justify-center"
        style={{ backgroundColor: '#f3f4f6', border: '1.5px solid #d1d5db' }}
      >
        <svg width="9" height="6" viewBox="0 0 9 6" fill="none">
          <path d="M1.5 3H7" stroke="var(--slide-text-muted)" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M4.5 1L7 3L4.5 5" stroke="var(--slide-text-muted)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }
  return (
    <div
      className="w-4 h-4 rounded-full mx-auto flex items-center justify-center"
      style={{ backgroundColor: '#f9fafb', border: '1.5px solid #e5e7eb' }}
    >
      <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
        <path d="M1 1L5 5M5 1L1 5" stroke="#e5e7eb" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function CompetitorSlide() {
  return (
    <div className="w-full h-full p-8 flex flex-col">

      {/* Header */}
      <div className="mb-4 shrink-0">
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--slide-primary)' }}>
          Why No Existing Tool Covers This
        </h2>
        <div className="w-20 h-1" style={{ backgroundColor: 'var(--slide-accent)' }} />
        <p className="text-xs mt-2" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>
          Each competitor is a vertical slice: designed for one function, one context, one phase. None orchestrate across the full delivery lifecycle. None carry the organisational memory that turns completed projects into competitive advantage.
        </p>
      </div>

      {/* Table */}
      <div className="flex-1 min-h-0 flex flex-col bg-white rounded-lg border overflow-hidden shadow-sm" style={{ borderColor: 'var(--slide-border)' }}>

        {/* Column headers */}
        <div
          className="shrink-0 flex items-center gap-2 px-4 py-2 border-b text-xs font-semibold"
          style={{ backgroundColor: 'var(--slide-bg)', borderColor: 'var(--slide-border)', color: 'var(--slide-text)' }}
        >
          <div style={{ width: '18%' }}>Competitor</div>
          <div style={{ width: '13%' }}>Category</div>
          {caps.map((c) => (
            <div key={c.key} style={{ flex: 1, textAlign: 'center' }} className="leading-tight">
              {c.label}
            </div>
          ))}
        </div>

        {/* Competitor rows */}
        <div className="flex-1 min-h-0 flex flex-col">
          {competitors.map((comp, i) => {
            const catStyle = CAT[comp.cat];
            return (
              <div
                key={comp.name}
                className="flex-1 min-h-0 flex items-center gap-2 px-4"
                style={{
                  borderTop: i > 0 ? '1px solid #f0f2f4' : undefined,
                  backgroundColor: comp.isStatusQuo ? '#fafafa' : undefined,
                }}
              >
                <div
                  className="text-xs font-semibold"
                  style={{
                    width: '18%',
                    color: comp.isStatusQuo ? '#64748b' : 'var(--slide-primary)',
                    fontStyle: comp.isStatusQuo ? 'italic' : undefined,
                  }}
                >
                  {comp.name}
                </div>
                <div style={{ width: '13%' }}>
                  <span
                    className="rounded-full px-2 py-0.5 font-medium"
                    style={{ fontSize: '0.6rem', backgroundColor: catStyle.bg, color: catStyle.text, whiteSpace: 'nowrap' }}
                  >
                    {comp.category}
                  </span>
                </div>
                {caps.map((c) => (
                  <div key={c.key} style={{ flex: 1, textAlign: 'center' }}>
                    <Dot level={comp[c.key]} />
                  </div>
                ))}
              </div>
            );
          })}

          {/* Divider before Merit OI */}
          <div className="shrink-0" style={{ borderTop: '2px solid var(--slide-accent)', opacity: 0.25 }} />

          {/* Merit OI row */}
          <div
            className="flex-1 min-h-0 flex items-center gap-2 px-4"
            style={{ backgroundColor: '#faf5ff' }}
          >
            <div className="text-xs font-bold" style={{ width: '18%', color: 'var(--slide-accent)' }}>
              Merit OI
            </div>
            <div style={{ width: '13%' }}>
              <span
                className="rounded-full px-2 py-0.5 font-bold"
                style={{ fontSize: '0.6rem', backgroundColor: '#f3e8ff', color: 'var(--slide-accent)', whiteSpace: 'nowrap' }}
              >
                Business OS
              </span>
            </div>
            {caps.map((c) => (
              <div key={c.key} style={{ flex: 1, textAlign: 'center' }}>
                <Dot level="native" isMerit />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend + callout */}
      <div className="shrink-0 mt-3 flex items-center gap-4">

        {/* Legend */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--slide-primary)' }}>
              <svg width="7" height="5" viewBox="0 0 7 5" fill="none"><path d="M1 2.5L2.5 4L6 1" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <span className="text-xs" style={{ color: 'var(--slide-text)', opacity: 0.7 }}>Designed for this</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f3f4f6', border: '1.5px solid #d1d5db' }}>
              <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
                <path d="M1 2.5H6.5" stroke="var(--slide-text-muted)" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M4 1L6.5 2.5L4 4" stroke="var(--slide-text-muted)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-xs" style={{ color: 'var(--slide-text)', opacity: 0.7 }}>Data flows, not orchestrated</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f9fafb', border: '1.5px solid #e5e7eb' }}>
              <svg width="5" height="5" viewBox="0 0 5 5" fill="none"><path d="M1 1L4 4M4 1L1 4" stroke="#e5e7eb" strokeWidth="1.2" strokeLinecap="round" /></svg>
            </div>
            <span className="text-xs" style={{ color: 'var(--slide-text)', opacity: 0.7 }}>Not covered</span>
          </div>
        </div>

        {/* Structural gap callout */}
        <div
          className="flex-1 rounded-lg px-4 py-2"
          style={{ backgroundColor: 'var(--slide-bg-primary-muted)', border: '1px solid var(--slide-border-primary)' }}
        >
          <p className="text-xs font-medium" style={{ color: 'var(--slide-primary)' }}>
            <span style={{ color: 'var(--slide-accent)', fontWeight: 700 }}>The platform gap: </span>
            Every competitor here is a tool: built for one function, context or phase phase. At the organisational level Merit OI is a Business OS. The delivery pipeline shown above is one dimension. HR, operations, and inventory run on the same shared process network, so every function learns from the same organisational memory.
          </p>
        </div>

      </div>
    </div>
  );
}
