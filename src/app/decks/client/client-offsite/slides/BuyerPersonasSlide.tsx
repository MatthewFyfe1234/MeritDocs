import { Briefcase, ClipboardList, Calculator } from 'lucide-react';
import { SlideLayout } from '@/components/slides/SlideLayout';

type Complaint = { text: string; refs?: number[] };

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

const personas = [
  {
    Icon: Briefcase,
    title: 'VP of Operations',
    subtitle: 'The throughput owner',
    day: "By the time I compile a capacity picture from multiple disconnected systems, it's already obsolete. Our monthly close takes 15+ days. I'm navigating with a rearview mirror, not a dashboard.",
    dayRefs: [] as number[],
    tools: ['Spreadsheets', 'Procore', 'Sage'],
    complaints: [
      { text: '49% of firms forced to transfer data manually between applications, introducing high error rates and latency (FMI/Autodesk)', refs: [1] },
      { text: 'Mid-sized fabricators average a 14-day month-end close - vs 4.8 days for top performers (Numeric/APQC)', refs: [2] },
      { text: 'Over 50% of labor time in construction is classified as waste; only 43% of time is productive, vs 88% in manufacturing (CII)', refs: [3] },
    ] as Complaint[],
    justify: 'Top performers close in 4.8 days vs. 14 for the industry average: the difference is integrated, real-time data flow (Numeric/APQC).',
    justifyRef: 2,
  },
  {
    Icon: ClipboardList,
    title: 'Project Manager',
    subtitle: 'The handoff coordinator',
    day: "35% of my week - 14+ hours - goes to chasing drawings, BOMs, and delivery dates. Without a central source of truth, coordinating handoffs is like herding cats.",
    dayRefs: [] as number[],
    tools: ['Buildertrend', 'Smartsheet', 'Email / Teams'],
    complaints: [
      { text: '13 hours/week spent by construction professionals searching for project data (Autodesk)', refs: [4] },
      { text: '52% of rework caused by poor project data and miscommunication (Autodesk)', refs: [4] },
      { text: '14% of all construction rework globally is caused by bad data (Autodesk)', refs: [4] },
    ] as Complaint[],
    justify: 'Digital transformation increases productivity 14–15% and lowers costs 4–6% (McKinsey).',
    justifyRef: 5,
  },
  {
    Icon: Calculator,
    title: 'Sales / Estimator',
    subtitle: 'The commitment maker',
    day: "A single spreadsheet error throws off an entire quote. You win the job, then immediately worry about delivery and the true cost. Everything I know about past jobs lives in my head or a file no one else can find.",
    dayRefs: [] as number[],
    tools: ['Excel', 'Autodesk CC', 'Email'],
    complaints: [
      { text: 'Improving estimating accuracy is the top-ranked strategic priority for construction firms managing market volatility and margin pressure (KPMG 2023)', refs: [6] },
      { text: '99% of specialty contractors experience margin erosion during construction; average fade is 5% of project value (Dodge/Procore)', refs: [7] },
    ] as Complaint[],
    justify: 'Integrated estimating linked to shop capacity: bid faster and bid more, without adding headcount.',
    justifyRef: 8,
  },
];

export function BuyerPersonasSlide() {
  return (
    <SlideLayout
      title="Who Feels the Pain"
      subtitle="The roles who live the gap every day"
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
