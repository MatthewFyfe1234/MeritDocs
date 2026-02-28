import { Lightbulb, Pencil, Factory, Hammer, ArrowDown, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import workflowImage from './workflow.jpg';

const stages = [
  {
    Icon: Lightbulb,
    title: 'Sales and Estimation',
    description: 'Initial client engagement, project scoping, and cost estimation, culminating in a priced proposal, agreed scope, and preliminary bill of materials (BOM).',
    roles: 'Estimator, Sales lead, Client',
    titleSuffix: null,
    outputs: ['Quote / Proposal', 'Scope of Work', 'Preliminary BOM', 'Schedule commitment'],
  },
  {
    Icon: Pencil,
    title: 'Design and Procurement',
    description: 'Detailed engineering, BIM modelling, and material procurement. Fabrication drawings and shop documentation produced for the factory floor.',
    roles: 'Structural engineer, Drafter, Procurement manager',
    titleSuffix: null,
    outputs: ['Fabrication drawings', 'Full BOM', 'Shop documentation', 'Purchase orders'],
  },
  {
    Icon: Factory,
    title: 'Fabrication',
    description: 'Offsite manufacturing of structural components in a controlled factory environment, with quality control checks at each production stage.',
    roles: 'Factory manager, Production supervisor, QC inspector',
    titleSuffix: null,
    outputs: ['Manufactured components', 'QC records', 'Assembly instructions', 'Logistics plan'],
  },
  {
    Icon: Hammer,
    title: 'Installation',
    description: 'On-site assembly of prefabricated components. Some companies provide full installation services; others deliver components only.',
    roles: 'Site foreman, Installation crew, Project manager',
    titleSuffix: '(Most commonly carried out by the construction team)',
    outputs: ['Installed structure', 'As-built documentation', 'Punch list sign-off', 'Project close-out'],
  },
];

export function WorkflowSlide() {
  return (
    <div className="w-full h-full p-8 flex flex-col">

      {/* Header */}
      <div className="mb-3">
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--slide-primary)' }}>
          Typical Offsite Construction Workflow
        </h2>
        <div className="w-20 h-1" style={{ backgroundColor: 'var(--slide-accent)' }} />
        <p className="text-xs mt-2" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>
          From client enquiry to site handover, across a consistent four-stage project structure
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 flex gap-5">

        {/* Left: stage rows + key insight */}
        <div className="flex-1 min-h-0 flex flex-col">

          {/* Stage rows: flatMap so arrow divs sit outside flex-1 rows */}
          <div className="flex-1 min-h-0 flex flex-col" style={{ gap: '4px' }}>
            {stages.flatMap((stage, i) => {
              const row = (
                <div key={stage.title} className="flex-1 min-h-0 flex items-stretch gap-3">

                  {/* Stage card */}
                  <div className="flex-1 min-h-0 bg-white rounded-lg p-3 shadow-md border" style={{ borderColor: 'var(--slide-border)' }}>
                    <div className="flex items-start gap-2">
                      <div className="p-1.5 rounded-lg shrink-0" style={{ backgroundColor: 'var(--slide-bg)' }}>
                        <stage.Icon className="w-4 h-4" style={{ color: 'var(--slide-primary)' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 flex-wrap mb-0.5">
                          <h3 className="text-sm font-semibold" style={{ color: 'var(--slide-text)' }}>
                            {stage.title}
                          </h3>
                          {stage.titleSuffix && (
                            <span className="text-xs font-normal" style={{ color: 'var(--slide-text-muted)' }}>
                              {stage.titleSuffix}
                            </span>
                          )}
                        </div>
                        <p className="text-xs leading-relaxed mb-1.5" style={{ color: 'var(--slide-text)', opacity: 0.75 }}>
                          {stage.description}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--slide-text)', opacity: 0.5 }}>
                          {stage.roles}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Horizontal connector */}
                  <div className="flex items-center shrink-0" style={{ width: '36px' }}>
                    <div style={{ flex: 1, borderTop: '2px solid var(--slide-border-primary)' }} />
                    <ArrowRight className="w-4 h-4 shrink-0 -ml-1" style={{ color: 'var(--slide-border-primary)' }} />
                  </div>

                  {/* Output card: 2x2 grid so 4 chips don't stack tall */}
                  <div
                    className="shrink-0 rounded-lg p-2.5 border grid grid-cols-2 gap-1.5 content-center"
                    style={{ width: '200px', backgroundColor: 'var(--slide-bg-primary-muted)', borderColor: '#cfe0db' }}
                  >
                    {stage.outputs.map((o) => (
                      <span
                        key={o}
                        className="rounded px-1.5 py-1 text-center leading-tight"
                        style={{ backgroundColor: 'white', color: 'var(--slide-primary)', border: '1px solid var(--slide-border-primary)', fontSize: 'var(--slide-sz-tag)' }}
                      >
                        {o}
                      </span>
                    ))}
                  </div>

                </div>
              );

              if (i < stages.length - 1) {
                return [
                  row,
                  <div key={`arrows-${i}`} className="shrink-0 flex items-center gap-3" style={{ height: '16px' }}>
                    <div className="flex-1 flex justify-center">
                      <ArrowDown className="w-4 h-4" style={{ color: 'var(--slide-accent)' }} />
                    </div>
                    <div className="shrink-0" style={{ width: '36px' }} />
                    <div className="shrink-0 flex justify-center" style={{ width: '200px' }}>
                      <ArrowDown className="w-3.5 h-3.5" style={{ color: 'var(--slide-primary)', opacity: 0.25 }} />
                    </div>
                  </div>,
                ];
              }
              return [row];
            })}
          </div>

          {/* Key Insight */}
          <div className="shrink-0 mt-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-2.5 border" style={{ borderColor: 'var(--slide-accent)' }}>
            <p className="text-xs font-medium" style={{ color: 'var(--slide-text)' }}>
              <span style={{ color: 'var(--slide-accent)' }}>Key Insight:</span> The pre-construction phase is critical and data-intensive, requiring coordination across sales, engineering, and manufacturing teams.
            </p>
          </div>

        </div>

        {/* Right: image */}
        <div className="shrink-0 rounded-lg overflow-hidden shadow-md" style={{ width: '280px' }}>
          <ImageWithFallback
            src={workflowImage}
            alt="Offsite construction workflow"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </div>
  );
}
