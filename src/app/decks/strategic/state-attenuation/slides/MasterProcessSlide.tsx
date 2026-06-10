import { SlideLayout } from '@/components/slides/SlideLayout';

const consequences = [
  {
    n: '01',
    label: 'Planning',
    body: 'Cost, time and carbon become derivations, not estimates. Process parameters are known quantities. Every project that runs contributes data that sharpens precision for the next. Forecast error is a function of data, not judgment.',
  },
  {
    n: '02',
    label: 'Carbon',
    body: 'Emissions are tracked at every execution step against known process parameters. They cannot be asserted without being verified. The condition that makes greenwashing structurally possible - unverifiable self-reporting across a fragmented supply chain - is removed.',
  },
  {
    n: '03',
    label: 'Selection',
    body: 'The best available tools, materials and people for any task are identifiable from performance data across the ecosystem. Selection is based on verified execution history, not on relationships, brands or marketing.',
  },
  {
    n: '04',
    label: 'Redundancy',
    body: 'Tasks that exist in current practice but appear in no branch of the master process are identifiable and removable. This includes the coordination and administrative overhead that currently consumes a disproportionate share of project cost.',
  },
];

export function MasterProcessSlide() {
  return (
    <SlideLayout title="The Master Process" subtitle="Every ecosystem has one. Every project is a parameterised subset.">
      <div className="flex-1 flex flex-col gap-5 min-h-0">

        <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.8, maxWidth: '72ch' }}>
          For any non-creative delivery ecosystem, a master process is definable at the industry level.
          It encodes every task, dependency, tool, material and performance standard any project in that ecosystem could require.
          Any specific project activates a subset of it, parameterised by its spec.
          The consequences are structural.
        </p>

        <div className="grid grid-cols-2 gap-x-10 gap-y-0" style={{ flex: '0 0 auto' }}>
          {consequences.map(({ n, label, body }) => (
            <div key={n} className="flex flex-col gap-2 py-4" style={{ borderTop: '1px solid var(--slide-border-primary)' }}>
              <div className="flex items-baseline gap-3">
                <span
                  className="font-black tabular-nums leading-none"
                  style={{ color: 'var(--slide-accent)', opacity: 0.2, fontSize: '1.5rem' }}
                >
                  {n}
                </span>
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: 'var(--slide-text)', opacity: 0.7 }}
                >
                  {label}
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>
                {body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </SlideLayout>
  );
}

/*
 * NOTES
 *
 * The master process is the formalisation of the best-process poset at the ecosystem level. It is
 * not a project plan - it is the complete possibility space for any project of that type. A housing
 * construction master process encodes every task, trade, material, tool and dependency that any
 * housing project could require. A specific project instantiates a subset of it: the spec determines
 * which branches activate and with what inputs.
 *
 * Planning becomes derivation: in the current model, project cost and time are estimated - which is
 * to say guessed, with varying degrees of sophistication. In the master process model they are
 * calculated from known parameters. The uncertainty that remains is empirical, not structural: it
 * shrinks with each project that runs.
 *
 * Carbon: the current system makes meaningful carbon accounting almost impossible at the project
 * level. Carbon performance is self-reported, unverifiable, and fragmented across supply chains.
 * This is not a failure of will - it is a structural feature of a system where there is no common
 * process data layer. The master process provides that layer. Carbon becomes a tracked metric at
 * every execution step, verifiable against process parameters and ecosystem data.
 *
 * Selection: the master process creates the conditions for objective selection of tools, materials
 * and people. Performance data is attached to known process steps, not to brands or relationships.
 * Over time the ecosystem produces a verified performance history for every participant.
 *
 * Redundancy: the master process makes visible the difference between what current practice does
 * and what the best process requires. Much of what consumes cost and time in current delivery -
 * coordination meetings, administrative overhead, management layers, B2B procurement processes -
 * does not appear in the master process. Its removal is a consequence of the model, not a goal.
 *
 * The master process already exists in embryonic form. Building codes, clinical guidelines,
 * engineering standards, ISO specifications - these are all partial, collaborative definitions of
 * best process in their domains. The model formalises and extends what is already how non-creative
 * production knowledge accumulates.
 */
