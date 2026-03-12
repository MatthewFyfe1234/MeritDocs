import { Compass, PiggyBank, HardHat } from 'lucide-react';
import { SlideLayout } from '@/components/slides/SlideLayout';

type Complaint = { text: string; refs?: number[] };

const personas = [
  {
    Icon: Compass,
    title: 'Managing Director / CEO',
    subtitle: 'The accidental hierarchy',
    companySize: '30–300 members',
    day: "I became a manager in an organisation that was supposed to have no managers. Every operational decision I make unilaterally feels like a betrayal of the founding principles. Every decision I take to committee takes three weeks and costs us the contract.",
    dayRefs: [] as number[],
    tools: ['Excel', 'Email', 'WhatsApp', 'MS Project'],
    complaints: [
      { text: 'Cooperatives that reach scale consistently drift toward managerial concentration: the democratic mandate and operational necessity pull in opposite directions', refs: [1] },
      { text: 'The "reverse dominance hierarchy" that emerges weakens leadership while preserving its costs: decisions are slow, unpopular changes are blocked, and accountability remains diffuse', refs: [2] },
      { text: '85% of construction projects exceed original budget, a sector baseline the cooperative inherits regardless of its governance structure', refs: [3] },
    ] as Complaint[],
    justify: 'Operational authority that comes from the process model, not from you, so you can lead without accumulating the hierarchy that undermines the mandate.',
    justifyRef: 1,
  },
  {
    Icon: PiggyBank,
    title: 'Finance / Surplus Distribution',
    subtitle: 'The fairness problem',
    companySize: '30–300 members',
    day: "Every year we divide the surplus and every year the same argument starts. Who contributed more? The answer is always political, never factual. We're a meritocracy in principle and a seniority system in practice.",
    dayRefs: [] as number[],
    tools: ['Sage / Xero', 'Excel', 'Membership records'],
    complaints: [
      { text: 'The capital constraint and horizon problem mean members systematically underinvest in projects with long payoffs. Surplus distribution disputes accelerate this', refs: [4] },
      { text: 'Worker absenteeism at Fagor rose to 8% against a 4% industry average as the link between contribution and reward became opaque', refs: [2] },
      { text: 'When contribution is invisible, seniority and relationships become the default. The cooperative\'s principles invert.', refs: [1] },
    ] as Complaint[],
    justify: 'Surplus distributed based on what was actually delivered, not seniority, relationships, or who argued loudest at the AGM.',
    justifyRef: 4,
  },
  {
    Icon: HardHat,
    title: 'Project Manager / Site Foreman',
    subtitle: 'Coordination without authority',
    companySize: '30–300 members',
    day: "I can ask people to do things. I can't tell them. In a conventional firm that distinction doesn't matter much. On a live construction site or a factory floor with a deadline, it matters enormously.",
    dayRefs: [] as number[],
    tools: ['Procore', 'MS Project', 'WhatsApp', 'Excel'],
    complaints: [
      { text: 'Only 25% of construction projects are delivered on schedule. Coordination failure is the primary cause, and cooperative structures compound it without clear escalation paths', refs: [3] },
      { text: '52% of rework is caused by poor information flow and miscommunication. The handoff problem is worse when authority to enforce handoff standards is absent', refs: [5] },
      { text: 'Stage-by-stage accountability requires someone to own each gate. In the absence of hierarchy, that ownership is contested or absent entirely', refs: [1] },
    ] as Complaint[],
    justify: 'The model governs execution, not you. Stage gates show exactly what is required and who is responsible. There is no request to refuse.',
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
      title="Who Carries the Problem"
      subtitle="The roles where democratic governance and operational reality collide."
      headerContent={
        <span
          className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold mt-2 inline-block"
          style={{ backgroundColor: 'var(--slide-bg-primary-muted)', color: 'var(--slide-primary)', border: '1px solid var(--slide-border-primary)', whiteSpace: 'nowrap' }}
        >
          ICP: Worker cooperative · Construction and manufacturing · 30–300 members
        </span>
      }
    >
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
              <p className="text-xs leading-relaxed italic" style={{ color: 'var(--slide-text)', opacity: 0.75 }}>
                "{p.day}"<Refs nums={p.dayRefs} />
              </p>

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

            {/* Footer */}
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
