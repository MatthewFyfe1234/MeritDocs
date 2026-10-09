/** Working notes, not part of the paper. Lives first in the content so it's visible while drafting; delete
 *  before finalising. Uses a plain div (no <h2>) so it takes no section number. */
export function Notes() {
  return (
    <div className="paper-todo" style={{ marginBottom: '2.5em' }}>
      <p style={{ fontWeight: 700 }}>Working notes and TODO (not for publication; remove before finalising).</p>
      <p>
        'everything is latently stigmergic'
        modes of coordination (hierarchy/network/market)
        organisation structures (cooperative/capitalistic)
      </p>
      <p>
        <strong>Paper type.</strong> Conceptual theory paper (organisational economics / economic sociology),
        consciously echoing Powell&rsquo;s &ldquo;neither market nor hierarchy.&rdquo; Paired with the SPD paper,
        which is its existence proof: the mode is formally constructible and implementable. Argument form:
        propositional (falsifiable &ldquo;the mode dominates when A, B, C hold&rdquo;), with a short process sketch
        folded into the mechanism.
      </p>
      <p>
        <strong>Core claim.</strong> A distinct mode of coordination alongside market (price), hierarchy
        (authority), network (trust): attributed stigmergy, coordination through locally-attributed contribution
        recorded in a shared process medium. Stigmergy is the substrate; attribution is the novelty over Heylighen,
        the trace attributes outcomes to specific contributors, which produces selection. One mechanism, applied
        recursively.
      </p>
      <p>
        <strong>Mechanism (the atom).</strong> One step, two workers, visible to each other and the client. B
        delivers equal outcome with less time or carbon; the client selects B; A asks B to teach; B is compensated
        for A&rsquo;s gains, diminishing as A catches up. Competition becomes teaching; improvement propagates
        rather than hoards.
      </p>
      <p>
        <strong>Recursion.</strong> Every output is a selected input to its client (coal, steel, lathe, gun,
        house). Each party selects inputs on locally-attributed outcome; none needs visibility beyond its own
        suppliers. Global order emerges stigmergically from local selection. It holds as far as attribution stays
        clean at each edge, attribution quality is the single dependency.
      </p>
      <p>
        <strong>Two objections it lives on.</strong> Isn&rsquo;t this a network? No, coordination is via the
        medium, not dyadic trust; agents needn&rsquo;t know each other. Isn&rsquo;t this just stigmergy? No,
        attribution-and-selection, not mere trace-response.
      </p>
      <p>
        <strong>Consequences</strong> (derive each from the mechanism, do not assert). Disintermediation:
        transparency closes the information gap that marketing and recruitment bridge. Cooperative scaling: formal
        legibility replaces the informal legibility that caps co-op size. Growth not required: the imperative comes
        from equity financing, not production. Efficiency and carbon: outcome-per-input selection; carbon
        attributable to the action; budgets settable per specification, not centrally.
      </p>
      <p>
        <strong>Design principle.</strong> Only financially-winning systems win ethically; here the ethical
        configuration (low waste, fair reward, removed precarity) is the winning one.
      </p>
      <p>
        <strong>Problem framing (anomaly).</strong> The tyranny of the private organisation: private organisations
        wield unaccountable, quasi-governmental power because production is illegible, contribution opaque and value
        undemonstrable. Attributed stigmergy removes the illegibility that power rests on. Cite Anderson (Private
        Government) for the contemporary version, Coase and Williamson for the neutral theoretical one (the firm as
        a zone where authority replaces price).
      </p>
      <p>
        <strong>Unifying frame.</strong> Maintenance-model abstraction: everything is a state to be delivered and
        maintained, a building, a patient, a forest, a service. This is what lets the model span construction,
        healthcare, disaster response, forestry. Politically neutral; it is just a description of productive
        activity.
      </p>
      <p>
        <strong>Beneath regimes (bounded).</strong> The system describes production at a layer invariant across
        political and economic orders, which is why it is adoptable under any of them and requires no particular
        politics to function. Hold to this bounded version; do not extend to &ldquo;transcends or replaces
        politics.&rdquo;
      </p>
      <p>
        <strong>Scoped extension.</strong> Public services decompose into maintenance-models; the system makes
        their outcomes attributable and their funding outcome-weightable.
      </p>
      <p>
        <strong>Financing (hold loosely).</strong> Taxation as growth-free production capital: complex production
        needs scale, scale needs capital, and equity-capital drags in the growth imperative; taxation-raised
        capital funds scale without it, and attribution makes that capital accountable to measured gains. A
        candidate financing wrapper, not core; it has its own economics to answer (why taxation over cooperative
        finance, mutual credit, retained surplus).
      </p>
      <p>
        <strong>Parked, out of scope.</strong> Governance and constitutional design (direct legislative voting,
        tax-weighting, advocacy-government): not entailed by the mechanism, imports political-theory objections, and
        re-politicises the neutral infrastructure. Private motivation, not a system claim.
      </p>
      <p>
        <strong>Problem framing (supersedes the illegibility lead above).</strong> Lead on misalignment across
        chain parties, client, supplier, employee, and the input parties (toolmaker, material-maker, insurer,
        educator, government). Not illegibility first; misalignment first, illegibility as its cause.
      </p>
      <p>
        <strong>Against principal-agent.</strong> The received treatment accepts the information gap as the floor
        and prices around it; it never closes it. Two moves: it is pairwise and does not compose along a chain
        where each party is both principal and agent; and multitasking (Holmstr&ouml;m and Milgrom) distorts
        effort toward the measured proxy, away from the unmeasured dimensions. As the dimensions that must be
        delivered multiply (health and safety, carbon, provenance, data protection), the proxy misses more, so the
        loss widens with complexity. Claim the comparative-static (as dimensions rise, proxy-alignment degrades
        while attribution does not), not the prophecy that complexity must rise.
      </p>
      <p>
        <strong>Alignment and silos are one problem.</strong> Opacity between parties is what makes interests look
        divergent; the apparent conflict is mostly protected private information, not opposed goals. Attributed
        stigmergy removes the opacity rather than pricing around it. Differentiator from ERP and supply-chain
        integration: they share recorded data, not attributed outcomes.
      </p>
      <p>
        <strong>Co-op / Ostrom parallel (sharpened).</strong> Informal mutual monitoring caps co-op and commons
        scale; the trace is automated monitoring (outcomes book to steps via the product graph, cf. SPD&rsquo;s
        offcut-to-panel), lifting Ostrom&rsquo;s ceiling. The concept&rsquo;s power is that it does not respect the
        usual co-op scaling limits.
      </p>
      <p>
        <strong>Pay timing is illustration, not foundation.</strong> Hourly pay is the purest proxy: it books one
        input and is blind to outcomes. But SPD rests on transparent multi-dimensional attribution, including good
        or poor work evidenced in downstream outputs, with compensation proportionate to attributed contribution.
        Per-contract versus per-hour illustrates the point; it does not hold it up.
      </p>
    </div>
  );
}
