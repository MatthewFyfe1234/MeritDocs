import { Cite } from '@/components/paper';

export function Anomaly() {
  return (
    <>
      <h2>Motivation</h2>
      <p>
        <strong>The client.</strong> Much of what clients value in what they buy is its provenance, in the broad
        sense of how, from what and by whom it was made, including its carbon, safety and labour. These are credence
        qualities, which cannot be verified even after purchase <Cite id={['darby1973', 'dulleck2006']} />. Clients
        compare suppliers on perception rather than on attributed performance, and measures published to help them are
        gamed <Cite id="dranove2003" />. Where quality cannot be observed, buyers pay for the average, and suppliers
        of better quality are under-rewarded and may withdraw <Cite id="akerlof1970" />. Carbon emissions arising across a supply chain
        cannot reliably be attributed to the organisations that cause them, or to the
        steps <Cite id="klaassen2021" />, so claimed reductions can be overstated <Cite id="delmas2011" /> and genuine
        reductions cannot be demonstrated. Before delivery, clients also need a forecast of a supplier&rsquo;s time,
        cost and reliability, qualities observable only after delivery <Cite id="nelson1970" />, and such forecasts
        are systematically optimistic, in large projects especially <Cite id={['flyvbjerg2002', 'buehler1994']} />.
        Private information is segmented at each boundary between organisations <Cite id="baiman2002" />, and the
        arrangements that bridge it, such as relational contracts, depend on repeated interaction and do not extend
        far beyond it <Cite id={['levin2003', 'thompson2003']} />.
      </p>
      <p>
        <strong>The worker.</strong> Pay in practice is only weakly related to
        performance <Cite id="bakerjensen1988" />. Supervisory judgement is open to
        favouritism <Cite id="prendergast1996" /> and shaped by the rater&rsquo;s own purposes <Cite id="murphy1995" />,
        and in performance ratings the idiosyncrasies of the rater account for more of the variance than the
        performance rated <Cite id="scullen2000" />.
        Take a salary review. The owner sees aggregate profit, the person deciding applies criteria the others cannot
        see, and the worker cannot tell which efforts count. Workers withhold
        knowledge that would benefit colleagues <Cite id="connelly2012" />, and relative evaluation discourages
        cooperation <Cite id="lazear1989" />. Those closest to the work, who see where it could be improved, have
        little means to direct improvement beyond their own team, or to be credited for it.
      </p>
      <p>
        <strong>The organisation.</strong> In the investor-owned firm, contribution is assessed by supervisors and,
        where they cannot observe it, by proxies. As interdependence between units rises, firms move from local to
        aggregate measures <Cite id="bushman1995" />, giving up individual attribution where it is most needed, and
        improvements stall where pay cannot credit those who bear their cost <Cite id="atkin2017" />. In research
        collaborations, those spanning more universities coordinate less and achieve less <Cite id="cummings2007" />,
        and each added factor, such as a further regulation, leaves those doing the work with more to weigh, against
        attention that is bounded <Cite id={['simon1955', 'simon1971']} />. In the
        cooperative, contribution is assessed by mutual observation. This works in small groups and fails as they
        grow. Monitoring costs and group size limit collective
        action <Cite id="olson1965" />, governance costs rise with the size and
        diversity of membership <Cite id="hansmann1996" />, their higher-ability members are the most likely to
        leave, since pay is compressed relative to contribution <Cite id="burdin2014" />, and self-managing organisations meet the same limits <Cite id="lee2017" />.
      </p>
      <p>
        <strong>The public.</strong> The public bears effects of production that fall outside the exchange, on those
        who neither bought nor made it, such as carbon, waste and risk to safety <Cite id={['pigou1920', 'coase1960']} />.
        The client has little reason to weigh them, and the public, which bears them, cannot attribute them to the
        steps and organisations that cause them. Regulation, which acts for the public, acts instead on claims,
        targets, averages and procedures. Rules on green claims govern what is said about
        performance <Cite id="delmas2011" />, targets such as net zero set an end state without an attributed path to
        it, emissions across supply chains are largely estimated from industry averages, so a supplier that reduces
        its own is credited with the average <Cite id="ghgprotocol2013" />, and certification and audit check that
        procedures exist more than what they deliver <Cite id="locke2013" />. Vehicles tested for emissions at a
        checkpoint rather than in use were engineered to pass the test <Cite id="thompson2014" />. Rules are rarely
        evaluated after the fact, so regulators see little of what a rule actually changed <Cite id="aldy2014" />.
        Where emissions are measured at source, as for large installations under emissions trading, regulation does
        act on attributed performance. Indicators published to close the gap are gamed, and the more they are used
        for decisions, the more they are corrupted <Cite id={['bevan2006', 'campbell1979']} />. Attribution would not
        by itself make clients weigh these effects, but it would let a price, a regulation or a rule of procurement
        act on them at the step that causes them.
      </p>
      <p>
        <strong>Generative AI.</strong> Where the agent is a generative AI system, the gap widens. Its contribution
        varies sharply by task. It improved performance on tasks within its capabilities while degrading it on tasks
        just beyond them, a boundary not apparent in advance <Cite id="dellacqua2023" />, and in field and
        experimental studies it raised the productivity of less skilled or less experienced workers
        most <Cite id={['brynjolfsson2025', 'noy2023']} />. Its contribution therefore has to be observed step by step.
        Its explanations of its own reasoning often do not reflect what produced its outputs <Cite id="turpin2023" />,
        and its outputs can be fluent but wrong <Cite id="ji2023" />, so its own account cannot serve as the record.
        Where people and AI work on a step together, it is unclear whose contribution produced the outcome. Generative
        AI also lowers the cost of producing claims at every boundary, such as applications, proposals and marketing,
        without lowering the cost of verifying them. A signal informs only while it is costly to
        send <Cite id="spence1973" />, so as claims become cheap they carry less information, and each boundary fills
        with them, consuming the attention of those who receive them <Cite id="simon1971" />. On a freelancing platform, employers paid a premium for applications
        tailored to the job until language models could write them, after which the premium disappeared and
        applications ceased to signal ability <Cite id="galdin2025" />. Where competitors gain equally, the gain is largely competed
        away <Cite id="porter1996" />, while the cost of screening falls on whoever receives the claims.
      </p>
      <p>
        <strong>The cost of bridging.</strong> Considerable economic activity is spent bridging these gaps.
        Wallis and North estimated that the transaction sector, the resources spent arranging and enforcing exchange
        rather than producing, grew from about a quarter of United States gross national product in 1870 to around 45 per
        cent by 1970 <Cite id="wallis1986" />, a share of which is spent bridging them. Within firms the estimate counts only the wages of occupations primarily engaged in such work (managers, clerks, foremen and the like), and so omits the coordination carried out by those classed as production workers. Jayadev and Bowles estimate that a substantial share of the
        workforce is employed as guard labour, including supervisors as well as security and
        enforcement <Cite id="bowles2006" />. Guarantees, brands and licensing arise to counteract uncertainty about
        quality <Cite id="akerlof1970" />, and much of the bridging work is of this kind. Between client and organisation
        this work is sales, procurement and tendering, between worker and organisation recruitment and appraisal,
        within organisations supervision, and at the regulatory boundary audit, inspection and certification.
        Insurance prices risk on broad categories because conduct cannot be
        observed <Cite id="rothschild1976" />, and credentials signal ability
        that employers cannot see directly <Cite id="spence1973" />. These costs continue when delivery fails.
        Disputes, claims and litigation over who caused a failure are costs incurred after the fact, which
        transaction-cost economics treats as part of the cost of exchange <Cite id="williamson1985" />, and each turns
        on evidence of what was delivered and by whom.
      </p>
      <p>
        In each case, what is delivered is evaluated subjectively rather than measured objectively, by clients on
        perception, by supervisors and proxies in investor-owned firms, by peers in cooperatives, by the public
        on published indicators, and, where the agent is an AI, on its own account. Each boundary is a measurement
        gap, and within organisations and cooperatives the gap widens as production grows in scale and complexity.
        Capture is increasingly instrumented, through telemetry in tools, machinery such as combines that record as
        they work, and workforce and inventory systems, so the records that would close these gaps are increasingly
        available, as on-board computers made delivery in trucking verifiable <Cite id="bakerhubbard2004" />.
      </p>
    </>
  );
}
