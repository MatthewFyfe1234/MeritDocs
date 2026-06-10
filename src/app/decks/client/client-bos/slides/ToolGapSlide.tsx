import { SlideLayout } from '@/components/slides/SlideLayout';

const toolCategories = [
  {
    label: 'Capital equipment',
    examples: 'CNC saws, joinery machines, pressing equipment, overhead cranes',
    readiness: 'Machine data, cycle times, utilisation and fault telemetry are standard outputs on modern plant.',
  },
  {
    label: 'Hand and power tools',
    examples: 'Nail guns, staplers, drills, fastening tools',
    readiness: 'Connectivity platforms from major tool manufacturers are already in market. Tool time, cycle counts, and usage patterns are increasingly available.',
  },
  {
    label: 'Vehicles and logistics',
    examples: 'Forklifts, telehandlers, lorries, delivery vehicles',
    readiness: 'Fleet telematics is standard on commercial vehicles. Location, route, and delivery timing data are well established. The factory-to-site data trail exists - it just is not connected to the delivery process.',
  },
  {
    label: 'Software',
    examples: 'Design, coordination, and construction management platforms',
    readiness: 'API and webhook architectures are mature across BIM, project management, and cloud collaboration tools. Data flows exist.',
  },
];

export function ToolGapSlide() {
  return (
    <SlideLayout
      title="The Disconnected Toolkit"
      subtitle="The tools are ready. The layer that gives their data meaning is not."
    >
      <div className="flex-1 min-h-0 flex flex-col gap-4">

        {/* Three tool categories */}
        <div className="flex-1 min-h-0 grid grid-cols-4 gap-4">
          {toolCategories.map((cat) => (
            <div
              key={cat.label}
              className="bg-white rounded-lg border flex flex-col overflow-hidden shadow-sm"
              style={{ borderColor: 'var(--slide-border)' }}
            >
              <div
                className="shrink-0 px-4 py-3 min-h-[5.5rem] flex flex-col justify-start"
                style={{ backgroundColor: 'var(--slide-bg-muted)', borderBottom: '1px solid var(--slide-border)' }}
              >
                <p className="text-sm font-bold" style={{ color: 'var(--slide-primary)' }}>{cat.label}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--slide-text)', opacity: 0.5 }}>{cat.examples}</p>
              </div>
              <div className="flex-1 p-4 flex items-start">
                <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.75 }}>
                  {cat.readiness}
                </p>
              </div>
              <div
                className="shrink-0 px-4 py-2 flex items-center gap-2"
                style={{ borderTop: '1px solid var(--slide-border)' }}
              >
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: '#22c55e' }} />
                <span className="text-xs font-semibold" style={{ color: '#16a34a' }}>Telemetry available</span>
              </div>
            </div>
          ))}
        </div>

        {/* The gap */}
        <div
          className="shrink-0 rounded-lg px-5 py-4"
          style={{ backgroundColor: 'var(--slide-bg-primary-muted)', borderLeft: '4px solid var(--slide-primary)' }}
        >
          <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--slide-primary)' }}>
            Tool telemetry without process context is noise. A sensor reading from a CNC saw means nothing without knowing which step it was performing, on which product, for which project, against which specification. The process layer is what transforms raw data from equipment and tools into delivery intelligence.
          </p>
        </div>

      </div>
    </SlideLayout>
  );
}
