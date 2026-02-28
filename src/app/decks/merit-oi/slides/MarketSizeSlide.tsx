import { Users, DollarSign, Info, TrendingUp } from 'lucide-react';

const systems = [
  { name: 'Pre-cast concrete',          share: 40, cagr: '6-7%',   value: '$161-175B', employees: '~160,000', companies: '4,500-5,500', note: null,                      icp: true  },
  { name: 'Timber frame',               share: 12, cagr: '3-10%',  value: '$39-48B',   employees: '~48,000',  companies: '1,800-2,200', note: null,                      icp: true  },
  { name: 'Light gauge steel (LGS)',     share: 10, cagr: '5-7%',   value: '$32-40B',   employees: '~40,000',  companies: '1,200-1,500', note: null,                      icp: true  },
  { name: 'Structural steel frame',      share: 10, cagr: '3-4%',   value: '$40B',      employees: '~32,000',  companies: '800-1,100',   note: 'lower labour intensity',  icp: true  },
  { name: 'CLT / mass timber panels',   share:  8, cagr: '12-15%', value: '$32B',      employees: '~32,000',  companies: '150-250',     note: null,                      icp: true  },
  { name: 'Volumetric modular',          share:  8, cagr: '6-8%',   value: '$32-36B',   employees: '~38,000',  companies: '600-800',     note: 'higher labour intensity', icp: true  },
  { name: 'I-Joist / engineered floor', share:  6, cagr: '5-7%',   value: '$14-24B',   employees: '~24,000',  companies: '150-300',     note: null,                      icp: true  },
  { name: 'Timber roof truss',           share:  4, cagr: '~5%',    value: '$11-16B',   employees: '~16,000',  companies: '2,000-2,500', note: null,                      icp: true  },
  { name: 'Steel roof truss',            share:  2, cagr: '5-7%',   value: '$8B',       employees: '~6,000',   companies: '400-600',     note: null,                      icp: true  },
];

export function MarketSizeSlide() {
  return (
    <div className="w-full h-full p-8 flex flex-col">

      {/* Header */}
      <div className="mb-4">
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--slide-primary)' }}>
          Offsite Systems: Market Size &amp; Employment
        </h2>
        <div className="w-20 h-1" style={{ backgroundColor: 'var(--slide-accent)' }} />
        <p className="text-xs mt-2" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>
          Global estimates by system type, sourced from multiple market research providers
          <sup className="font-semibold ml-px" style={{ color: 'var(--slide-accent)', fontSize: '0.6rem' }}>[1–5]</sup>
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 grid grid-cols-5 gap-6">

        {/* Left: data table (3/5) */}
        <div className="col-span-3 flex flex-col min-h-0 bg-white rounded-lg shadow-md border overflow-hidden" style={{ borderColor: 'var(--slide-border)' }}>

          {/* Column headers */}
          <div className="flex items-center gap-3 px-4 py-2 shrink-0 text-xs font-semibold border-b" style={{ backgroundColor: 'var(--slide-bg)', color: 'var(--slide-text)', borderColor: 'var(--slide-border)' }}>
            <div style={{ width: '28%' }}>System</div>
            <div style={{ flex: 1 }}>Market share</div>
            <div style={{ width: '12%', textAlign: 'right' }}>Value / yr</div>
            <div style={{ width: '12%', textAlign: 'right', color: 'var(--slide-accent)' }}>Employees</div>
            <div style={{ width: '12%', textAlign: 'right', color: 'var(--slide-primary)' }}>Companies</div>
            <div style={{ width: '8%', textAlign: 'right', color: 'var(--slide-primary)' }}>CAGR</div>
          </div>

          {/* Rows */}
          <div className="flex-1 min-h-0 flex flex-col">
            {systems.map((s, i) => (
              <div
                key={s.name}
                className="flex-1 min-h-0 flex items-center gap-3 px-4"
                style={{
                  borderTop: i > 0 ? '1px solid var(--slide-border)' : undefined,
                  opacity: s.icp ? 1 : 0.42,
                }}
              >
                {/* System name */}
                <div className="text-xs font-medium flex flex-col justify-center" style={{ width: '28%', color: 'var(--slide-text)' }}>
                  <span className="flex items-center gap-1.5">
                    {s.name}
                    {!s.icp && (
                      <span className="rounded px-1 py-px font-semibold" style={{ fontSize: '0.55rem', backgroundColor: 'var(--slide-bg)', color: 'var(--slide-text-muted)', border: '1px solid var(--slide-border)', whiteSpace: 'nowrap' }}>
                        excl.
                      </span>
                    )}
                  </span>
                  {s.note && (
                    <span style={{ fontSize: 'var(--slide-sz-xs)', color: 'var(--slide-text)', opacity: 0.45, lineHeight: 1.3 }}>{s.note}</span>
                  )}
                </div>

                {/* Bar + % label */}
                <div style={{ flex: 1 }}>
                  <div className="flex items-center gap-1.5">
                    <div className="flex-1 h-3 rounded overflow-hidden" style={{ backgroundColor: 'var(--slide-bg)' }}>
                      <div
                        className="h-full rounded"
                        style={{ width: `${s.share}%`, backgroundColor: s.icp ? 'var(--slide-primary)' : 'var(--slide-text-muted)', opacity: 0.72 }}
                      />
                    </div>
                    <span style={{ fontSize: '9px', width: '20px', textAlign: 'right', color: 'var(--slide-text)', opacity: 0.55 }}>{s.share}%</span>
                  </div>
                </div>

                {/* Value */}
                <div className="text-xs font-medium" style={{ width: '12%', textAlign: 'right', color: 'var(--slide-text)' }}>
                  {s.value}
                </div>

                {/* Employees */}
                <div className="text-xs font-bold" style={{ width: '12%', textAlign: 'right', color: s.icp ? 'var(--slide-accent)' : 'var(--slide-text-muted)' }}>
                  {s.employees}
                </div>

                {/* Companies */}
                <div className="text-xs font-semibold" style={{ width: '12%', textAlign: 'right', color: s.icp ? 'var(--slide-primary)' : 'var(--slide-text-muted)' }}>
                  {s.companies}
                </div>

                {/* CAGR */}
                <div className="text-xs font-medium" style={{ width: '8%', textAlign: 'right', color: s.icp ? 'var(--slide-primary)' : 'var(--slide-text-muted)' }}>
                  {s.cagr}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: summary (2/5) */}
        <div className="col-span-2 flex flex-col gap-3 min-h-0">

          {/* Total market value */}
          <div className="bg-white rounded-lg p-4 shadow-md border shrink-0" style={{ borderColor: 'var(--slide-border)' }}>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 shrink-0" style={{ color: 'var(--slide-primary)' }} />
              <span className="text-xs font-semibold" style={{ color: 'var(--slide-text)' }}>Total Market Value</span>
            </div>
            <div className="flex items-baseline gap-4">
              <div className="text-2xl font-bold" style={{ color: 'var(--slide-primary)' }}>~$400B / yr</div>
              <div className="text-sm font-semibold" style={{ color: 'var(--slide-primary)', opacity: 0.65 }}>~6.5% CAGR</div>
            </div>
          </div>

          {/* Total employees */}
          <div className="bg-white rounded-lg p-4 shadow-md border-2 shrink-0" style={{ borderColor: 'var(--slide-accent)' }}>
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 shrink-0" style={{ color: 'var(--slide-accent)' }} />
              <span className="text-xs font-semibold" style={{ color: 'var(--slide-accent)' }}>Total Employees</span>
            </div>
            <div className="text-2xl font-bold" style={{ color: 'var(--slide-accent)' }}>~396,000</div>
            <p className="text-xs mt-0.5" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>Addressable headcount across all systems: the primary TAM metric for per-seat licensing</p>
          </div>

          {/* ICP entry market */}
          <div className="flex-1 min-h-0 bg-white rounded-lg p-4 shadow-md border-2 flex flex-col" style={{ borderColor: 'var(--slide-primary)' }}>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 shrink-0" style={{ color: 'var(--slide-primary)' }} />
              <span className="text-xs font-semibold" style={{ color: 'var(--slide-primary)' }}>ICP: Fabricated Structural Systems</span>
            </div>
            <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--slide-text)', opacity: 0.8 }}>
              All nine systems share a common delivery model: project-based sales, factory production, and site installation, spanning building and civil infrastructure applications.
            </p>
            <div className="mt-auto grid grid-cols-2 gap-2 pt-3 border-t" style={{ borderColor: 'var(--slide-border)' }}>
              <div className="rounded-md p-2 text-center" style={{ backgroundColor: 'var(--slide-bg-primary-muted)' }}>
                <div className="text-sm font-bold" style={{ color: 'var(--slide-primary)' }}>~$400B</div>
                <div className="text-xs" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>Industry value</div>
              </div>
              <div className="rounded-md p-2 text-center" style={{ backgroundColor: 'var(--slide-bg-primary-muted)' }}>
                <div className="text-sm font-bold" style={{ color: 'var(--slide-primary)' }}>12-15k</div>
                <div className="text-xs" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>Companies</div>
              </div>
              <div className="rounded-md p-2 text-center" style={{ backgroundColor: 'var(--slide-bg-accent-muted)' }}>
                <div className="text-sm font-bold" style={{ color: 'var(--slide-accent)' }}>~396k</div>
                <div className="text-xs" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>Addressable seats</div>
              </div>
              <div className="rounded-md p-2 text-center" style={{ backgroundColor: 'var(--slide-bg-accent-muted)' }}>
                <div className="text-sm font-bold" style={{ color: 'var(--slide-accent)' }}>~$475M</div>
                <div className="text-xs" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>ARR at $100/seat/mo (illustrative)</div>
              </div>
            </div>
          </div>

          {/* Source note */}
          <div className="rounded-lg p-3 border shrink-0" style={{ backgroundColor: 'var(--slide-bg-muted)', borderColor: 'var(--slide-border)' }}>
            <div className="flex items-start gap-2">
              <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: 'var(--slide-text-muted)' }} />
              <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>
                {/* <span className="font-semibold">Sources
                  <sup style={{ color: 'var(--slide-accent)', fontSize: '0.6rem' }}>[14–18]</sup>: </span> */}
                Employee figures adjusted for relative labour intensity by system type. CAGR figures are indicative estimates derived from the same sources.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
