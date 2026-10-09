import { Cite } from '@/components/paper';

export function RelatedWork() {
  return (
    <>
      <h2>Related work</h2>
      <p>
        <strong>Modes of coordination.</strong> The paper takes up a lineage that characterises economic
        organisation not by surface features but by the mechanism that coordinates it. Coase <Cite id="coase1937" />{' '}
        drew the first distinction, between the price mechanism of the market and the authority relation of the
        firm, a zone in which direction replaces exchange; Williamson <Cite id={['williamson1975', 'williamson1985']} />{' '}
        made the choice between the two turn on the attributes of the transaction, and later admitted hybrids
        between the poles <Cite id="williamson1991" />. Powell <Cite id="powell1990" /> argued that the network is
        not a hybrid but a third form with its own logic, coordinated by relationship and trust rather than by price
        or fiat, the move this paper imitates. Adjacent typologies name the same plurality differently:
        Ouchi&rsquo;s <Cite id="ouchi1980" /> markets, bureaucracies and clans, the clan coordinated by shared values
        and socialisation; Polanyi&rsquo;s <Cite id="polanyi1944" /> reciprocity, redistribution and exchange; and
        the embeddedness of economic action in social relations <Cite id={['granovetter1985', 'thompson2003']} />.
        Across these, each mode is identified with a coordinating mechanism: price, authority, trust, shared values.
        This paper argues there is a further mechanism, not reducible to these, and sets out to characterise it.
      </p>

      <p>
        <strong>Proxy-based coordination under multidimensional delivery.</strong> That paying against an observable
        proxy distorts effort away from what the proxy fails to capture is the central result of multitask agency
        theory <Cite id="holmstrom1991" />. Feltham and Xie <Cite id="feltham1994" /> sharpened it into a congruity
        condition: as outcome dimensions enter the principal&rsquo;s valuation without a matching expansion of the
        measured signal, the signal grows orthogonal to true value and the usable power of any incentive falls
        toward zero; Baker, Gibbons and Murphy <Cite id={['bakergibbons1994', 'bakergibbons2002']} /> frame the same
        loss as the widening angle between a proxy and the value it stands in for. The deepest statement of the
        problem predates the agency formalism: Barzel <Cite id="barzel1982" /> treats goods as bundles of attributes
        that are costly to measure, so that coarse proxy pricing dissipates value through sorting and through the
        suppression of unmeasured attributes, the closest ancestor of the present argument. Faced with delivery on
        dimensions a single proxy cannot span, organisations have four well-studied responses, and the claim here is
        not that they fail but that each pays a price the proposed mode does not. Relational
        contracts <Cite id={['levin2003', 'bakergibbons2002']} /> substitute holistic subjective evaluation for an
        explicit formula, but depend on repeated interaction and a principal who can observe the whole, informal
        monitoring whose reach is bounded (cf. Ostrom <Cite id="ostrom1990" /> on the monitoring costs that cap
        commons governance) and which crosses firm boundaries only through costly negotiated
        transparency <Cite id="baiman2002" />. Professional norms and intrinsic
        motivation <Cite id={['benabou2006', 'akerlof2005']} /> carry the unmeasured dimensions where they are
        internalised, but apply only to high-trust occupations and can be crowded out by the very proxies meant to
        reinforce them. Regulation-plus-audit decouples safety, environmental and provenance obligations from the
        incentive contract, enforcing them as thresholds policed by audit, at the cost of a separate monitoring
        apparatus for each dimension. And job redesign unbundles conflicting tasks across specialised
        roles <Cite id={['holmstrom1991', 'corts2007']} />, removing the conflict by separating the activities,
        which is to say, by siloing them. The last two are telling: they answer multidimensional misalignment by
        manufacturing exactly the information barriers the next strand identifies as its cause.
      </p>

      <p>
        <strong>Silos as measurement gaps.</strong> That the organisational silo and the measurement gap are
        aspects of one phenomenon has been approached from both sides without being joined. On the incentive side,
        Bushman, Indjejikian and Smith <Cite id="bushman1995" /> show that as cross-unit interdependencies rise,
        optimal compensation retreats from local divisional measures toward aggregate ones, legibility of individual
        contribution is surrendered precisely as the system grows more interconnected; the transfer-pricing
        literature <Cite id={['baldenius2004', 'cools2009']} /> treats responsibility-accounting boundaries as
        information barriers that force a single internal price to stand in for multidimensional contribution. On the
        architecture side, Alonso, Dessein and Matouschek <Cite id="alonso2008" /> model the silo as a
        strategic-communication friction, and the inter-firm literature <Cite id={['baiman2000', 'baiman2002']} /> as
        segmented private information across a boundary. These traditions share an intuition - that structural
        barriers to information produce localised, non-congruent measurement - but formalise it in different
        vocabularies, the one in signal-sensitivity matrices <Cite id={['feltham1994', 'corts2007', 'schnedler2006']} />,
        the other in communication games and accounting identities, and neither derives the first from the second.
        We take the silo and the measurement gap to be the same object, a restriction of what is observable to what
        lies within a boundary, and read the resulting non-congruity as the formal content of misalignment across
        the parties to production.
      </p>

      <p>
        <strong>Stigmergy.</strong> The mode&rsquo;s substrate is stigmergy: coordination in which agents act on and
        modify a shared medium and are guided by the traces others leave in it, without direct communication between
        them <Cite id={['grasse1959', 'heylighen2016a', 'heylighen2016b']} />. Heylighen&rsquo;s synthesis treats
        stigmergy as a general coordination mechanism spanning insects, markets and software. What the present
        account adds is attribution: where Heylighen&rsquo;s trace records that work was done, the trace here records
        whose work produced which outcome, and it is this that turns a passive medium into a basis for selection.
        Attribution-and-selection, not trace-and-response, is what places stigmergy among the modes of coordination
        on the footing of price or authority, rather than beneath them as a mechanism they happen to use.
      </p>
    </>
  );
}
