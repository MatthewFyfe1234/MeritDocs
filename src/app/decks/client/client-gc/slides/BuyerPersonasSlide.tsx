import { LayoutDashboard, Calculator, ShieldCheck } from 'lucide-react';
import { SlideLayout } from '@/components/slides/SlideLayout';

type Complaint = { text: string; refs?: number[] };

const personas = [
  {
    Icon: LayoutDashboard,
    title: 'Project Director / MD',
    subtitle: 'The margin owner',
    companySize: '100–2,000 employees',
    day: "I have six live projects and the commercial picture I get from my team is weeks old by the time it reaches me. I know roughly where each one is. I couldn't tell you precisely what each is making.",
    dayRefs: [] as number[],
    tools: ['Procore / Asite', 'MS Project', 'Excel', 'Email'],
    complaints: [
      { text: 'When change work is in progress, labor efficiency drops 30% and disruptions increase by 50%; that cost is already absorbed on site before the commercial manager has begun to quantify it', refs: [1] },
      { text: 'Construction productivity has grown just 1% annually over the past two decades, against 3.6% in manufacturing; margins are structurally thin before a single variation is raised', refs: [2] },
    ] as Complaint[],
    justify: 'A live performance picture across all projects: what each is making, what is at risk, and where the record needs attention.',
    justifyRef: 1,
  },
  {
    Icon: Calculator,
    title: 'Commercial Manager / QS',
    subtitle: 'The contract protector',
    companySize: '50–1,000 employees',
    day: "The contract gives us clear notice requirements. Between site, sub disputes, and the RFI backlog, the window to issue that notice is sometimes closed before we realise it was opening.",
    dayRefs: [] as number[],
    tools: ['CostX / Excel', 'Email', 'Contract documents', 'Spreadsheets'],
    complaints: [
      { text: 'The 30% efficiency loss during change work is rarely recovered in the variation valuation; contractors who cannot demonstrate disruption cost in real time cannot recover it at final account', refs: [1] },
      { text: '44% of contractors failed to recover retention due to upstream insolvency; often representing the entirety of a project\'s net profit', refs: [3] },
      { text: '12.5 months: the global average time to resolve a construction dispute. Arcadis identifies poorly drafted, unsubstantiated claims as the leading cause', refs: [4] },
    ] as Complaint[],
    justify: 'Systematic variation capture and notice tracking: every claim substantiated from the record, every contractual window closed on time.',
    justifyRef: 1,
  },
  {
    Icon: ShieldCheck,
    title: 'HSE Manager',
    subtitle: 'The compliance carrier',
    companySize: '50–2,000 employees',
    day: "I'm responsible for a site where dozens of subcontractor operatives are working. I need their competency certs, their RAMS, their permits to work. Most of it lives in inboxes and paper folders, and I'm the one called first when something goes wrong.",
    dayRefs: [] as number[],
    tools: ['Email', 'Paper files', 'Spreadsheets', 'Inspection apps'],
    complaints: [
      { text: 'Construction accounts for just 7% of global employment but nearly 30% of all fatal occupational accidents (ILO); when an incident occurs, the first question is whether the RAMS was in place, current, and communicated to site', refs: [5] },
      { text: '52% of rework is linked to working from outdated documentation; the same fragmentation that drives quality failures drives safety failures', refs: [6] },
      { text: 'RAMS, permits, and competency certs must be reviewed and signed before high-risk tasks begin; with scattered documentation, that verification gap is invisible until it is not', refs: [5] },
    ] as Complaint[],
    justify: 'An auditable compliance record for every task, every subcontractor: the GC\'s legal first line of defence, built in the course of delivery.',
    justifyRef: 5,
  },
];

function Refs({ nums }: { nums?: number[] }) {
  if (!nums?.length) return null;
  return (
    <>
      {nums.map((n) => (
        <sup key={n} className="font-semibold ml-px" style={{ color: 'var(--slide-accent)', fontSize: '0.6rem' }}>
          [{n}]
        </sup>
      ))}
    </>
  );
}

export function BuyerPersonasSlide() {
  return (
    <SlideLayout
      title="Who Carries the Risk"
      subtitle="The roles where documentation gaps translate directly into commercial and legal exposure."
      headerContent={
        <span
          className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold mt-2 inline-block"
          style={{ backgroundColor: 'var(--slide-bg-primary-muted)', color: 'var(--slide-primary)', border: '1px solid var(--slide-border-primary)', whiteSpace: 'nowrap' }}
        >
          ICP: General contractor · 100–2,000 employees
        </span>
      }
    >
      {/* Persona cards */}
      <div className="flex-1 min-h-0 grid grid-cols-3 gap-5">
        {personas.map((p) => (
          <div
            key={p.title}
            className="min-h-0 bg-white rounded-lg border flex flex-col overflow-hidden shadow-sm"
            style={{ borderColor: 'var(--slide-border)' }}
          >
            {/* Card header */}
            <div className="p-4 pb-3 shrink-0" style={{ backgroundColor: 'var(--slide-bg-primary-muted)', borderBottom: '1px solid #cfe0db' }}>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md shrink-0" style={{ backgroundColor: 'var(--slide-primary)' }}>
                  <p.Icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold leading-tight" style={{ color: 'var(--slide-primary)' }}>{p.title}</div>
                  <div className="text-xs" style={{ color: 'var(--slide-primary)', opacity: 0.6 }}>{p.subtitle}</div>
                </div>
                <span
                  className="shrink-0 rounded px-1.5 py-0.5 font-medium"
                  style={{ fontSize: '0.6rem', backgroundColor: 'white', color: 'var(--slide-primary)', border: '1px solid var(--slide-border-primary)', whiteSpace: 'nowrap' }}
                >
                  {p.companySize}
                </span>
              </div>
            </div>

            {/* Card body */}
            <div className="flex-1 min-h-0 flex flex-col p-4 gap-3">

              {/* Day in the life */}
              <p className="text-xs leading-relaxed italic" style={{ color: 'var(--slide-text)', opacity: 0.75 }}>
                "{p.day}"<Refs nums={p.dayRefs} />
              </p>

              {/* Current tools */}
              <div>
                <div className="text-xs font-semibold mb-1.5 tracking-wide" style={{ color: 'var(--slide-primary)', opacity: 0.6 }}>
                  CURRENT TOOLS
                </div>
                <div className="flex flex-wrap gap-1">
                  {p.tools.map((t) => (
                    <span
                      key={t}
                      className="rounded px-1.5 py-0.5 text-xs"
                      style={{ backgroundColor: 'var(--slide-bg)', color: '#5a6a75', border: '1px solid #dde4e8' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pain points */}
              <div>
                <div className="text-xs font-semibold mb-1.5 tracking-wide" style={{ color: 'var(--slide-primary)', opacity: 0.6 }}>
                  KEY PAIN POINTS
                </div>
                <ul className="space-y-1">
                  {p.complaints.map((c) => (
                    <li key={c.text} className="flex items-start gap-1.5 text-xs" style={{ color: 'var(--slide-text)' }}>
                      <span style={{ color: 'var(--slide-accent)', flexShrink: 0, marginTop: '1px' }}>•</span>
                      <span>{c.text}<Refs nums={c.refs} /></span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Business case footer */}
            <div className="px-4 py-2.5 shrink-0" style={{ backgroundColor: 'var(--slide-bg-accent-light)', borderTop: '1px solid var(--slide-border-accent)' }}>
              <span className="text-xs" style={{ color: '#7c3aed' }}>
                {p.justify}<Refs nums={[p.justifyRef]} />
              </span>
            </div>

          </div>
        ))}
      </div>
    </SlideLayout>
  );
}
