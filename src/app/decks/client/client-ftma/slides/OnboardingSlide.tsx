import { SlideLayout } from '../../../../components/slides/SlideLayout';

const inherited = [
  {
    title: 'Process model',
    headline: 'A shared reference map of the full delivery ecosystem',
    body: "A reference map spanning the full delivery ecosystem - design, manufacturing, PM, installation, and delegate manufacturers. Like RIBA's Plan of Work, when manufacturers share the same process they share a language with each other and with the broader ecosystem. Any project is a subset of it, derived from the specification.",
    bullets: [
      'A shared language across all manufacturers in the cohort',
      'Interoperability with designers, contractors, and the wider delivery ecosystem',
      'Projects derived from the specification, not built from scratch',
    ],
    existing: false,
  },
  {
    title: 'Training framework',
    headline: 'A backbone for training, not a content library',
    body: "Merit provides the process structure - the association anchors its own materials to specific steps. Where steps have no material attached, the gap is visible. At the operator level, high variance in execution metrics between individuals doing the same step signals that training for that step may be inconsistent or missing.",
    bullets: [
      'Association materials anchored to specific steps, not stored in a folder',
      'Gaps visible where steps have no training material attached',
      'Executor variance flags training quality issues before they become delivery problems',
    ],
    existing: true,
  },
  {
    title: 'Document templates',
    headline: 'A standardised document library across people, tools, materials, and product delivery',
    body: 'Pre-built templates covering every entity in the delivery process. Operatives are reminded before compliance lapses, tools are flagged for scheduled maintenance, and material chain of custody is enforced at the point of handling. When an inspector arrives or a claim is made, the records are already in their natural place.',
    bullets: [
      'Individual compliance stays current - operatives, tools, and materials tracked continuously',
      'Audit and insurance ready by default - no retrospective assembly of documents',
      'Stage gates enforced at each step - a missing document blocks progress and identifies who to contact',
    ],
    existing: true,
  },
  {
    title: 'Estimating baselines',
    headline: 'Faster, less effort, more accurate',
    body: "Quotes are generated from the specification - material quantities calculated from dimensions with wastage factors, process steps estimated deterministically (calculated from the job's own variables, not from experience or guesswork).",
    bullets: ['Faster quote turnaround', 'Less effort per quote', 'Fundamentally more accurate'],
    existing: false,
  },
];

export function OnboardingSlide() {
  return (
    <SlideLayout
      title="The Shared Foundation"
      subtitle="A new member does not configure Merit from scratch. They inherit the foundation built by the association."
    >
      <div className="flex-1 min-h-0 flex flex-col" style={{ borderTop: '1px solid var(--slide-border-primary)' }}>
        {inherited.map(({ title, headline, body, bullets, existing }, i) => (
          <div
            key={title}
            className="flex gap-5 items-start py-2 flex-1"
            style={{ borderBottom: i < inherited.length - 1 ? '1px solid var(--slide-border-primary)' : undefined }}
          >
            <span className="text-xs font-semibold shrink-0 w-36 flex items-center gap-1.5" style={{ color: 'var(--slide-primary)', paddingTop: '1px' }}>
              {existing && <span style={{ color: 'var(--slide-accent)', fontSize: '0.5rem' }}>●</span>}
              {title}
            </span>
            <div className="flex flex-col gap-0.5 flex-1">
              {headline && <span className="text-xs font-semibold" style={{ color: 'var(--slide-primary)' }}>{headline}</span>}
              <span className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>{body}</span>
              {bullets.length > 0 && (
                <div style={{ marginTop: '-2px' }}>
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--slide-text)', opacity: 0.35 }}>Benefits</span>
                  <ul className="list-disc list-inside">
                    {bullets.map(b => (
                      <li key={b} className="text-xs" style={{ color: 'var(--slide-accent)' }}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}
