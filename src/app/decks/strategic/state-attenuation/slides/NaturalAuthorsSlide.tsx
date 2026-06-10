import { SlideLayout } from '@/components/slides/SlideLayout';

const authors = [
  {
    type: 'Tool Provider',
    body: 'Their product already encodes a subset of the process implicitly - the tool\'s workflow is a partial process definition. Formalising it is a natural extension of the product. For engineering software in particular, the incentive goes further: the tool can affect a huge ecosystem, and mapping it reveals the downstream consequences of their output. Identifying where those outputs cause pain is product discovery - every upstream friction they can encode into the tool is a new opportunity.',
  },
  {
    type: 'Organisation',
    body: 'Has operational depth and real execution data across many deliveries. The motivation to build it exists - process advantage is competitive advantage. The tension is the same: the competitive incentive to keep it proprietary is exactly the force that has prevented collective process knowledge from accumulating in every ecosystem.',
  },
  {
    type: 'Association',
    body: 'Has legitimacy, cross-industry reach, and existing relationships with every participant in the ecosystem. The right structure to hold a commons - and has already attempted it. What existing association-authored processes lack is the feedback mechanism, the contribution layer, and the data.',
  },
  {
    type: 'Crowd-sourced',
    body: 'Practitioners executing the process are its most valuable improvers. Every deviation is a data point. Every workaround is a process improvement waiting to be formalised. The system is designed so that execution feeds contribution automatically - the process gets better without anyone deciding to improve it.',
  },
];

export function NaturalAuthorsSlide() {
  return (
    <SlideLayout title="Authoring the Master Process" subtitle="The knowledge exists in the ecosystem. The infrastructure does not.">
      <div className="flex-1 flex flex-col gap-5 min-h-0">

        <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.8, maxWidth: '72ch' }}>
          The master process has no shortage of natural authors. Tool providers, organisations, and associations
          each already hold a piece of the knowledge. The gap is not capability - it is the open contribution
          and feedback infrastructure that turns private process knowledge into a commons.
        </p>

        <div className="grid grid-cols-2 gap-6" style={{ flex: '0 0 auto' }}>
          {authors.map(({ type, body }) => (
            <div key={type} className="flex flex-col gap-2 pt-3" style={{ borderTop: '1px solid var(--slide-border-primary)' }}>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--slide-accent)', opacity: 0.85 }}>
                {type}
              </span>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>
                {body}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-lg px-4 py-3 flex flex-col gap-1.5" style={{ backgroundColor: 'var(--slide-bg-muted)', borderLeft: '2px solid var(--slide-border-primary)' }}>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--slide-text)', opacity: 0.35 }}>
            Precedent
          </span>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>
            RIBA's Plan of Work is the clearest existing attempt: 8 sequential stages covering design through handover, widely adopted across UK construction.
            Its limitations are instructive. It is organised by phase, not by the composition of the delivery.
            You cannot navigate from Stage 5 down into the building systems it activates, the specialist domains that own them, or the sub-processes and actions within those.
            It is not fractable, not data-driven, and has no mechanism for practitioners to contribute improvements from execution.
          </p>
        </div>

      </div>
    </SlideLayout>
  );
}

/*
 * NOTES
 *
 * The three author types each have a different relationship to the master process and a different
 * natural tension:
 *
 * Tool providers: software and hardware vendors in any delivery ecosystem have already partially
 * formalised the process - their product's workflow is an implicit process definition. A BIM
 * platform, a scheduling tool, a materials tracking system - each encodes assumptions about how
 * work proceeds. Formalising and contributing this knowledge is a natural product extension. The
 * limitation is scope: their knowledge is deep in one domain but narrow across the ecosystem.
 *
 * Organisations: firms that operate within the ecosystem have the richest execution data - they
 * have run many projects and know what actually happens versus what is specified. The tension is
 * acute: the competitive value of that knowledge is real, and the incentive to keep it proprietary
 * is strong. This is the same dynamic that has prevented collective process knowledge from
 * accumulating across almost every industry. The model does not eliminate this tension - it
 * provides a counter-incentive through the commons: the organisation that contributes to the
 * master process benefits from every improvement made by everyone else.
 *
 * Associations: industry bodies have the legitimacy and reach that individual firms lack. They
 * already coordinate standards, certifications, and codes of practice. RIBA's Plan of Work is the
 * most developed existing example: a full-lifecycle process definition for architecture and
 * construction, structured by stage, maintained and updated by RIBA. It is widely used as a
 * contractual and planning framework. Its limitations are instructive: it is prescriptive rather
 * than data-driven, describes intended process rather than actual process, has no feedback loop
 * from execution, and cannot incorporate crowd-sourced improvements from practitioners. These are
 * precisely the features the master process model adds.
 *
 * The commons dynamic: the master process becomes more valuable as more people contribute to it.
 * This is the same dynamic that made Linux, Wikipedia, and OpenStreetMap succeed. The first mover
 * advantage is not in keeping the process proprietary - it is in being the organisation whose
 * process definition becomes the standard others build on.
 */
