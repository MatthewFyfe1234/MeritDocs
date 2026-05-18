import { SlideLayout } from '@/components/slides/SlideLayout';

const tools = [
  {
    name: 'Excel / Spreadsheets',
    stage: 'All stages',
    gap: 'Every handoff between specialist tools lands in a spreadsheet. Scheduling, cost tracking, resource planning, and delivery commitments all live in files that go stale the moment they are shared. No live data, no connection to what is actually happening on the floor.',
    positioning: 'replace',
  },
  {
    name: 'MiTek PAMIR / WoodEngine',
    stage: 'Truss design & timber frame detailing',
    gap: 'PAMIR handles truss design and cut optimisation; WoodEngine manages timber frame detailing. Both produce accurate BOMs and production files, but data exits via CSV or manual transfer. Output never connects automatically to procurement, scheduling, or delivery commitments.',
    positioning: 'integrate',
  },
  {
    name: 'SEMA / Cadwork',
    stage: 'Structural timber detailing',
    gap: 'Primary CAD/CAM for timber frame, open panel, and CLT detailing. Cutting files and BOMs are exported to Excel or ERP manually. The gap between the design model and the factory floor is bridged by re-keying, not by integration.',
    positioning: 'integrate',
  },
  {
    name: 'Hundegger / Weinmann (CNC)',
    stage: 'Fabrication',
    gap: 'Cutting files arrive from SEMA or MiTek and components are produced. But actual yield, scrap rates, machine utilisation, and maintenance cycles never feed back into estimates, scheduling, or resource planning. The factory floor is the most data-rich part of the operation and the most invisible.',
    positioning: 'integrate',
  },
  {
    name: 'Production ERP / MRP',
    stage: 'Fabrication management',
    gap: 'Standalone production scheduling, BOM management, and stock control. Data stays within the production system. Sales commitments, project timelines, and HR planning remain disconnected from what the floor is actually carrying.',
    positioning: 'replace',
  },
  {
    name: 'Sage / Xero / QuickBooks',
    stage: 'Finance',
    gap: 'Job costs are tracked manually in spreadsheets and re-entered into the accounting system at close. Merit OI handles job costing natively and passes actuals to Sage, Xero, or QuickBooks throughout execution - not just at month end.',
    positioning: 'integrate',
  },
  {
    name: 'Procore / Buildertrend',
    stage: 'Site coordination',
    gap: 'Adequate for tracking on-site progress but factory-blind. Fabrication status, delivery schedules, and component readiness are invisible to the site team. Project managers chase updates by phone rather than reading them in the system.',
    positioning: 'replace',
  },
  {
    name: 'MS Project / Smartsheet',
    stage: 'Project planning',
    gap: 'Static plans disconnected from design outputs and factory throughput. Schedules are published and immediately out of date. No connection to MiTek, SEMA, or Cadwork production data, and no live view of resource availability.',
    positioning: 'replace',
  },
];

const REPLACE = { bg: '#fff7ed', text: '#c2410c', border: '#fed7aa', label: 'Replace' };
const INTEGRATE = { bg: 'var(--slide-bg-primary-muted)', text: 'var(--slide-primary)', border: 'var(--slide-border-primary)', label: 'Integrate' };

export function ToolStackSlide() {
  return (
    <SlideLayout
      title="The Current Tool Stack"
      subtitle="Replace the commodity layer, integrate with the specialist tools that stay"
    >

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
              <div className="shrink-0" style={{ width: '310px' }}>
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

      {/* Summary */}
      <div className="shrink-0 mt-3 rounded-lg p-3" style={{ backgroundColor: 'var(--slide-bg-primary-muted)', border: '1px solid var(--slide-border-primary)' }}>
        <p className="text-xs font-medium" style={{ color: 'var(--slide-primary)' }}>
          <span style={{ color: 'var(--slide-accent)', fontWeight: 700 }}>The approach: </span>
          Merit OI orchestrates across your specialist design and production tools, connecting what they produce to procurement, scheduling, HR, and finance in real time. The only things that go away are the spreadsheets holding it all together.
        </p>
      </div>

    </SlideLayout>
  );
}
