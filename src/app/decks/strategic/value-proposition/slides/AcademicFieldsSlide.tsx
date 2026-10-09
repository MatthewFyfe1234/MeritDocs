import { SlideLayout } from '@/components/slides/SlideLayout';

const fields: { label: string; body: string; cite?: string }[] = [
  {
    label: 'Production Theory',
    body: "Production theory's known blind spot is the black box: inputs go in, outputs come out, with nothing modelling what happens between. MeritOI puts process at the centre of those same inputs and outputs, rather than collapsing them into a single function.",
  },
  {
    label: 'BPMN',
    body: "BPMN lets you nest sub-processes, but never names or fixes any levels of abstraction, and its large vocabulary of optional elements means the same process gets drawn differently by different modellers. This model fixes both: one canonical graph, with a named granularity axis from system cluster down to individual action.",
  },
  {
    label: 'Critical Chain Project Management',
    body: "CCPM improved on plain critical path scheduling with buffers for duration uncertainty, but a buffer doesn't say why a step is uncertain. This model attributes that uncertainty to its actual source: the executor, the specific tool, the material, the time of day, etc.",
  },
  {
    label: 'Data-Driven Optimization',
    body: "Data-driven optimization already replaces assumed probability distributions with actual measured samples. This model goes further: it optimises against live, continuously recorded execution data, structured per step and per contributor, not a static historical sample.",
  },
  {
    label: 'Contract Theory',
    body: "The principal-agent problem: a principal can't observe an agent's actual effort, so they contract on proxies instead. Here, an agent's contribution to each step is directly recorded, not inferred from an unobservable action.",
  },
  {
    label: 'Supply Chain Management',
    body: "The bullwhip effect: demand variability amplifies upstream because each tier only sees the order from the tier below it, not real demand. Here, every tier reads from the same recorded process, not from what the tier below reports.",
  },
  {
    label: 'Commons Governance',
    body: "Ostrom showed shared resources can be self-governed without central authority, through monitoring, graduated sanctions, and nested layers of enterprise. That's the same shape as process as a commons: governance, toolmakers, and educators on one side, industry on the other.",
  },
  {
    label: 'Prescriptive Analytics',
    body: "Gartner's own maturity model shows why this is hard: fewer than 10% of organisations ever reach prescriptive analytics, each stage a separate, costly build. Here prescriptive comes for free: the same formula that diagnoses a step also forecasts and drives coordination.",
  },
  {
    label: 'Management Cybernetics',
    body: "Beer's Viable System Model, built on Ashby's Law: a viable system is recursive, made of viable subsystems, each needing enough internal variety to regulate itself. The same graph, repeating at every scale from system cluster to action, is exactly that recursion.",
  },
  {
    label: 'Swarm Intelligence',
    body: "Coherent global behaviour, emerging from many simple, local agents rather than central control. Here that's literal: every tool, person, and organisation executing a step contributes measured data directly and continuously, not a model trained on history.",
  },
  {
    label: 'Artificial Immune Systems',
    body: "AIS models computational security on the immune system's self/non-self discrimination: legitimate behaviour is a known baseline, anything else is flagged. This model retains every historic process and its data as that baseline, so regression or gaming shows up as a deviation from it.",
  },
];

export function AcademicFieldsSlide() {
  return (
    <SlideLayout
      title="Fields This Touches"
      subtitle="MeritOI sits at the intersection of several established academic disciplines."
    >
      <div className="flex-1 min-h-0 grid grid-cols-4 grid-rows-3 gap-3.5">
        {fields.map(({ label, body, cite }) => (
          <div
            key={label}
            className="rounded-lg px-4 py-3.5 flex flex-col justify-center gap-1.5"
            style={{ backgroundColor: 'var(--slide-bg-card)' }}
          >
            <span className="text-sm font-bold uppercase tracking-wide" style={{ color: 'var(--slide-accent)' }}>
              {label}
            </span>
            <p className="text-xs leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.8 }}>
              {body}
            </p>
            {cite && (
              <p className="text-[9px] italic leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.5 }}>
                {cite}
              </p>
            )}
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}
