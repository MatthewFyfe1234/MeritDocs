import { LayoutDashboard, Calculator, ClipboardCheck } from 'lucide-react';
import { SlideLayout } from '@/components/slides/SlideLayout';

type Complaint = { text: string; refs?: number[] };

const personas = [
  {
    Icon: LayoutDashboard,
    title: 'Development Director',
    subtitle: 'The programme owner',
    companySize: '100–500 employees',
    day: "I have eight live schemes and I can tell you the status of approximately none of them without making calls. Every update I get has been filtered through someone with an interest in giving me the optimistic version.",
    dayRefs: [] as number[],
    tools: ['Procore', 'MS Project', 'Excel', 'Email'],
    complaints: [
      { text: '87% of real estate companies rank data collection as their top business priority, yet portfolio visibility still depends on who picks up the phone', refs: [6] },
      { text: '85% of projects fail to stay within original budget, overruns that compound silently across a portfolio without a single source of truth', refs: [1] },
      { text: 'Construction sector productivity has grown only 10% in 20 years, against 50%+ for the global economy', refs: [7] },
    ] as Complaint[],
    justify: 'Full portfolio visibility without adding headcount: the prerequisite for intervening before a project is already in trouble.',
    justifyRef: 6,
  },
  {
    Icon: Calculator,
    title: 'CFO / Finance Director',
    subtitle: 'The cost custodian',
    companySize: '100–2,000 employees',
    day: "My cost reports are three weeks old before they reach me, assembled from whatever partners chose to submit. I am authorising drawdowns against numbers I cannot verify.",
    dayRefs: [] as number[],
    tools: ['Xero / Sage', 'Excel', 'Email'],
    complaints: [
      { text: '28% average global cost overrun. On development margins of 5–6%, even moderate deviation eliminates a project\'s return', refs: [1] },
      { text: 'Only 31% of projects finish within 10% of their original budget. Cost control is the exception, not the norm', refs: [3] },
      { text: 'Developers typically wait 12 to 24 months after practical completion to know their final profit position', refs: [4] },
    ] as Complaint[],
    justify: 'Live cost and programme data across every active development: drawdown decisions backed by current numbers, not assembled history.',
    justifyRef: 1,
  },
  {
    Icon: ClipboardCheck,
    title: 'Procurement Director',
    subtitle: 'The partner selector',
    companySize: '50–500 employees',
    day: "We choose contractors the way the industry always has: who we know, who came in lowest, who someone recommended. I could not tell you, with data, which of our partners actually performs.",
    dayRefs: [] as number[],
    tools: ['Excel', 'Email', 'Procurement frameworks'],
    complaints: [
      { text: '84.6% of real estate investment decision-makers show anchoring bias, selecting partners on past impression rather than current evidence', refs: [8] },
      { text: '70% of rework is design-induced, yet design team and contractor selection remains relationship-based rather than performance-based', refs: [5] },
      { text: 'Only 25% of projects meet their original schedule, a record that relationship-based partner selection has not improved', refs: [3] },
    ] as Complaint[],
    justify: 'Evidence-based partner selection: every engagement builds the delivery record that makes the next decision sharper.',
    justifyRef: 8,
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
      title="Who Feels the Pain"
      subtitle="The roles who carry the consequences of partner decisions they cannot objectively evaluate."
      headerContent={
        <span
          className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold mt-2 inline-block"
          style={{ backgroundColor: 'var(--slide-bg-primary-muted)', color: 'var(--slide-primary)', border: '1px solid var(--slide-border-primary)', whiteSpace: 'nowrap' }}
        >
          ICP: Property developer · 100–2,000 employees
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
