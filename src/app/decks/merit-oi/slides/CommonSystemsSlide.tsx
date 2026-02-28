import { ArrowRight } from 'lucide-react';

const regions = {
  NA:    { bg: '#fee2e2', text: '#b91c1c', label: 'N. America' },
  EU:    { bg: '#dbeafe', text: '#1d4ed8', label: 'Europe' },
  APAC:  { bg: '#fef9c3', text: '#a16207', label: 'Asia-Pacific' },
  ANZ:   { bg: '#ffedd5', text: '#c2410c', label: 'Australasia' },
  LATAM: { bg: '#dcfce7', text: '#15803d', label: 'Latin America' },
  AF:    { bg: '#fef3e2', text: '#92400e', label: 'Africa' },
};

const systems = [
  {
    name: 'Light Gauge Steel',
    description: 'Cold-formed steel studs and tracks assembled into wall panels and floor cassettes. Widely used in multi-storey residential and commercial construction.',
    regions: ['NA', 'EU', 'ANZ'],
    buildings: ['Structural walls', 'Structural floors'],
    infrastructure: [],
  },
  {
    name: 'I-Joist',
    description: 'Engineered timber joists with OSB webs and LVL flanges. Lighter and more dimensionally stable than solid timber, suited to floor and roof structures.',
    regions: ['NA', 'EU', 'ANZ'],
    buildings: ['Structural floors', 'Structural roofs'],
    infrastructure: [],
  },
  {
    name: 'CLT',
    description: 'Cross-laminated timber panels built up from alternating layers of structural timber. Used for walls, floors and roofs in low to mid-rise construction.',
    regions: ['EU', 'NA', 'ANZ'],
    buildings: ['Structural walls', 'Structural floors', 'Structural roofs'],
    infrastructure: [],
  },
  {
    name: 'Timber Frame',
    description: 'Factory-assembled wall panels and floor cassettes using timber studs and engineered board. The prefabricated variant of the dominant residential framing method, most established in the UK and Europe.',
    regions: ['EU', 'ANZ'],
    buildings: ['Structural walls', 'Structural roofs'],
    infrastructure: [],
  },
  {
    name: 'Steel Roof Truss',
    description: 'Factory-fabricated steel trusses for long-span roof structures. Common in commercial, industrial and agricultural buildings across multiple regions.',
    regions: ['NA', 'EU', 'ANZ', 'AF', 'LATAM'],
    buildings: ['Structural roofs'],
    infrastructure: [],
  },
  {
    name: 'Pre-cast Concrete',
    description: 'Concrete elements cast in a controlled factory environment and transported to site. Used across building sub-structures and civil infrastructure.',
    regions: ['NA', 'EU', 'APAC', 'ANZ', 'LATAM', 'AF'],
    buildings: ['Sub-structure', 'Structural walls', 'Structural floors'],
    infrastructure: ['Sub-structure', 'Bridge structures', 'Water defences', 'Tunnel structures'],
  },
  {
    name: 'Volumetric',
    description: 'Three-dimensional factory-built modules containing finished structure, services and internal finishes. Craned into position and connected on site.',
    regions: ['EU', 'NA', 'ANZ', 'APAC'],
    buildings: ['Structural walls', 'Structural floors', 'Structural roofs'],
    infrastructure: [],
  },
  {
    name: 'Timber Roof Truss',
    description: 'Engineered timber trusses for residential and light commercial roofs. Produced at high volume with precision cutting from digital models.',
    regions: ['NA', 'EU', 'ANZ'],
    buildings: ['Structural roofs'],
    infrastructure: ['Sub-structure', 'Bridge structures', 'Tunnel structures'],
    infraNote: 'as disposable formwork',
  },
  {
    name: 'Structural Steel Beam',
    description: 'Hot-rolled and fabricated steel sections for frames, beams and columns. Used across commercial, industrial and infrastructure applications.',
    regions: ['NA', 'EU', 'APAC', 'ANZ', 'AF'],
    buildings: ['Structural walls', 'Structural floors'],
    infrastructure: ['Bridge structures', 'Water defences', 'Tunnel structures'],
  },
];

const categories = [
  {
    name: 'Window & Door Systems',
    note: 'Long established as externally manufactured components. Fenestration has been factory-made for decades.',
    selected: false,
  },
  {
    name: 'Structural Systems',
    note: 'Factory-fabricated frames, trusses and engineered timber. A growing, underserved market.',
    selected: true,
  },
  {
    name: 'Access Systems',
    note: 'Stairs, balustrades, balconies and mezzanine structures. Widely prefabricated, reducing on-site labour and programme risk.',
    selected: false,
  },
  {
    name: 'HVAC & MEP Systems',
    note: 'Mechanical and electrical modules are an emerging area of prefabrication, driven by labour shortages.',
    selected: false,
  },
];

export function CommonSystemsSlide() {
  return (
    <div className="w-full h-full p-8 flex flex-col">

      {/* Header */}
      <div className="mb-4">
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--slide-primary)' }}>
          Offsite Systems: Scope Finding
        </h2>
        <div className="w-20 h-1" style={{ backgroundColor: 'var(--slide-accent)' }} />
        <p className="text-xs mt-2" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>
          Nine structural system types across building and infrastructure applications, forming the initial product scope
        </p>
      </div>

      {/* Legend row: right-aligned */}
      <div className="shrink-0 flex items-center justify-end gap-5 mb-3">
        <span className="text-xs font-semibold tracking-wide" style={{ color: 'var(--slide-primary)', opacity: 0.55 }}>REGIONS</span>
        {Object.entries(regions).map(([key, r]) => (
          <span
            key={key}
            className="rounded-full px-2 py-0.5 text-xs font-medium"
            style={{ backgroundColor: r.bg, color: r.text }}
          >
            {r.label}
          </span>
        ))}
        <div className="w-px h-3 mx-1" style={{ backgroundColor: 'var(--slide-border)' }} />
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: 'var(--slide-bg-primary-muted)', border: '1px solid var(--slide-border-primary)' }} />
          <span className="text-xs" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>Buildings</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: '#f3eeff', border: '1px solid #c4aaf0' }} />
          <span className="text-xs" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>Infrastructure</span>
        </div>
      </div>

      {/* Category selector + system grid */}
      <div className="flex-1 min-h-0 flex gap-3">

        {/* Left: offsite category column */}
        <div className="shrink-0 flex flex-col gap-2.5" style={{ width: '210px' }}>
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="flex-1 rounded-lg border px-3 py-2.5 flex flex-col justify-center gap-1"
              style={
                cat.selected
                  ? { backgroundColor: 'var(--slide-bg-primary-muted)', borderColor: 'var(--slide-primary)', borderWidth: '2px' }
                  : { backgroundColor: 'var(--slide-bg-muted)', borderColor: 'var(--slide-border)' }
              }
            >
              <span
                className="text-xs font-semibold leading-tight"
                style={{ color: cat.selected ? 'var(--slide-primary)' : '#b0bec5' }}
              >
                {cat.name}
              </span>
              <p
                className="text-xs leading-snug"
                style={{ color: cat.selected ? 'var(--slide-primary)' : '#b0bec5', opacity: cat.selected ? 0.75 : 0.9 }}
              >
                {cat.note}
              </p>
            </div>
          ))}
        </div>

        {/* Arrow connector: mirrors left column layout so arrow sits on the Structural row */}
        <div className="shrink-0 flex flex-col gap-2.5" style={{ width: '40px' }}>
          <div className="flex-1" />
          <div className="flex-1 flex items-center">
            <div style={{ flex: 1, borderTop: '3px solid var(--slide-primary)' }} />
            <ArrowRight className="w-6 h-6 shrink-0 -ml-1.5" style={{ color: 'var(--slide-primary)' }} />
          </div>
          <div className="flex-1" />
          <div className="flex-1" />
        </div>

        {/* 3x3 system grid, wrapped in a box to show this is the expanded Structural category */}
        <div
          className="flex-1 min-h-0 rounded-lg border"
          style={{ backgroundColor: 'var(--slide-bg-muted)', borderColor: 'var(--slide-border)', padding: '10px' }}
        >
        <div className="w-full h-full grid grid-cols-3 gap-3">
          {systems.map((s) => (
            <div
              key={s.name}
              className="min-h-0 bg-white rounded-lg border flex flex-col overflow-hidden"
              style={{ borderColor: 'var(--slide-border)' }}
            >
              {/* Card header: name + description + region tags */}
              <div className="px-3 pt-3 pb-2 shrink-0" style={{ borderBottom: '1px solid #f0f2f4' }}>
                <div className="text-sm font-semibold mb-1 leading-tight" style={{ color: 'var(--slide-primary)' }}>
                  {s.name}
                </div>
                <p className="text-sm leading-snug mb-1.5" style={{ color: 'var(--slide-text)', opacity: 0.8 }}>
                  {s.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {s.regions.map((r) => (
                    <span
                      key={r}
                      className="rounded-full px-1.5 py-px font-semibold"
                      style={{ backgroundColor: regions[r as keyof typeof regions].bg, color: regions[r as keyof typeof regions].text, fontSize: '9px' }}
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card body: application tags */}
              <div className="flex-1 min-h-0 px-3 py-2 flex flex-col gap-1.5">
                {s.buildings.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {s.buildings.map((b) => (
                      <span
                        key={b}
                        className="rounded px-1.5 py-px"
                        style={{ backgroundColor: 'var(--slide-bg-primary-muted)', color: 'var(--slide-primary)', border: '1px solid var(--slide-border-primary)', fontSize: '9.5px' }}
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                )}
                {s.infrastructure.length > 0 && (
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap gap-1">
                      {s.infrastructure.map((inf) => (
                        <span
                          key={inf}
                          className="rounded px-1.5 py-px"
                          style={{ backgroundColor: '#f3eeff', color: '#7c3aed', border: '1px solid #c4aaf0', fontSize: '9.5px' }}
                        >
                          {inf}
                        </span>
                      ))}
                    </div>
                    {s.infraNote && (
                      <span className="italic" style={{ color: 'var(--slide-text-muted)', fontSize: '9px' }}>{s.infraNote}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        </div>

      </div>

    </div>
  );
}
