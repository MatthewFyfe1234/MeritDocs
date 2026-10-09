import { SlideLayout } from '@/components/slides/SlideLayout';

const beats: { label: string; body?: string; bullets?: { label: string; body: string }[]; highlight?: boolean }[] = [
  {
    label: 'No Explicit Granularity',
    body: "BPMN lets you nest sub-processes, but it never names or fixes any levels of abstraction. Nothing tells you what a \"level\" is, or how many there should be — so it can't serve as one central, readable resource for everyone involved, from the VP to the on-site executor.",
  },
  {
    label: 'The Foundation',
    body: "Edges are products, not control-flow. A product is the same kind of thing whether it sits between two steps, two jobs, two organisations, or two entirely separate ecosystems, linked only by what one delivers to the other.",
    highlight: true,
  },
  {
    label: 'What Falls Out of It, for Free',
    bullets: [
      {
        label: 'Semi self-organising formation',
        body: 'Someone still declares each step\'s inputs and outputs — but once declared, the connections between them resolve automatically. Nobody draws the graph by hand.',
      },
      {
        label: 'Edges as gateways',
        body: "A step can't start until its product exists. The edge stage-gates the process, with no separate construct needed.",
      },
    ],
  },
];

export function AbstractionFoundationSlide() {
  return (
    <SlideLayout
      title="Products Are Why Abstraction Survives Zooming Out"
      subtitle="One necessity, one foundational choice, two bonus properties that came with it."
    >
      <div className="flex-1 min-h-0 flex flex-col justify-center gap-3">
        {beats.map(({ label, body, bullets, highlight }, i) => (
          <div key={label} className="flex flex-col items-center gap-3">
            {i > 0 && (
              <span className="text-lg leading-none" style={{ color: 'var(--slide-accent)', opacity: 0.4 }}>↓</span>
            )}
            <div
              className="w-full rounded-lg px-5 py-4 flex flex-col gap-1.5"
              style={{
                backgroundColor: highlight ? 'var(--slide-bg-accent-muted)' : 'var(--slide-bg-card)',
                border: highlight ? '1px solid var(--slide-accent)' : undefined,
              }}
            >
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: highlight ? 'var(--slide-accent)' : 'var(--slide-text)', opacity: highlight ? 1 : 0.5 }}
              >
                {label}
              </span>
              {body && (
                <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: highlight ? 0.95 : 0.8 }}>
                  {body}
                </p>
              )}
              {bullets && (
                <ul className="flex flex-col gap-1.5 mt-1">
                  {bullets.map(({ label: bLabel, body: bBody }) => (
                    <li key={bLabel} className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.8 }}>
                      <span className="font-bold">{bLabel}</span> — {bBody}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}
