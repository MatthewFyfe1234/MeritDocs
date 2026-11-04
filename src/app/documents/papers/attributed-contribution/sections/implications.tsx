import { Cite, M, Proposition } from '@/components/paper';

export function Implications() {
  return (
    <>
      <h2>Implications and evidence</h2>
      <p className="paper-todo">
        Theoretical implications for the debates being entered, and the empirical observations that would
        corroborate or disconfirm the model.
      </p>
      <p>
        Cooperatives are confined to small scale for two reasons the evidence identifies. Contribution among members
        is assessed by mutual observation, which fails as membership grows <Cite id={['olson1965', 'hansmann1996']} />,
        and pay compressed relative to contribution drives out higher-ability members <Cite id="burdin2014" />. Both are
        consequences of the measurement gap, and TBP addresses each. Attribution against a shared process replaces
        mutual observation, so assessing contribution no longer depends on members observing one another, and its cost
        does not rise with membership. Proportionate reward then becomes possible without giving up cooperative
        ownership, so higher-ability members are credited within the cooperative rather than leaving to be credited
        elsewhere. And because the commons pools records across organisations, a small cooperative draws on enough
        data to forecast and compare without first having to grow. What remains is the cost of collective
        decision-making among members with diverse interests, which Hansmann <Cite id="hansmann1996" /> treats as the
        binding constraint, and which attribution informs but does not remove, so the ceiling may fall less than the
        measurement argument alone suggests. Compressed pay is also sometimes a value members choose, and TBP makes
        proportionate reward possible without requiring it.
      </p>
      <p>
        Shared ownership changes the position of the worker. Where the worker holds their record, they can leave with
        it, so the organisation cannot hold their reputation hostage and exit becomes a real option. Selection on the
        trace continues, which is its purpose, but the arbitrary power Anderson <Cite id="anderson2017" /> describes
        as private government is removed, since decisions on reward and selection are made against an agreed
        yardstick the worker can see and carry. Because the gain from training is attributed to the trainer, its
        return holds even if the trainee later leaves, and training is rewarded without the disincentive to help
        peers that relative evaluation creates.
      </p>
      <p>
        Output-based pay raises productivity <Cite id={['lazear2000', 'shearer2004']} />, and TBP makes it available
        without requiring it. Because proportionate reward depends on contribution being recorded to sufficient
        quality, better data is in the worker&rsquo;s own interest.
      </p>
      <p>
        The commons also changes the cost of verification. Where parties verify each factor bilaterally, the effort
        grows with the number of verifying relationships times the number of factors, and where <M>{"p"}</M> parties
        all deal with one another and each pair verifies every factor, with <M>{"p^2 f"}</M>. Recording each delivery
        once against a common process grows with <M>{"p f"}</M>, since every party reads from the same record rather
        than establishing it again at each boundary. This assumes the capture is trusted, which reconciliation and
        shared ownership support but do not guarantee (Section 6). Where pairs verify only some factors, the
        saving is correspondingly smaller. Credit bureaus make the same move from bilateral to central
        verification <Cite id="pagano1993" />. The saving is largest where relationships are dense, and smaller, though
        still present, where each party deals with few others. It is net of the cost of governing the commons and
        maintaining its definitions (Section 6).
      </p>
      <p>
        Because routine and remedial processes record against the same specification, the trace links them within
        each product&rsquo;s life and pools them across every product of its class. A deviation such as a forest fire
        or a change in a patient&rsquo;s condition can then be related to the maintenance that preceded it, such as
        thinning or diet. The trace supplies the linked records, subject to the limits on lagged outcomes set out in
        Section 6.
      </p>

      <Proposition>
        <p>
          Within an operational domain, the network effect draws a process commons toward the domain&rsquo;s full
          scale, subject to the aggregation competition law requires (Sections 3 and 6). It would be disconfirmed by commons that remain fragmented among parties delivering the
          same steps, where parties can join on the same terms.
        </p>
      </Proposition>
      <Proposition>
        <p>
          As a process commons spans organisations, employers converge on pooling records, and the dependence of data
          quality on worker cooperation extends this to shared ownership of the trace with the worker (Section 3). It would be disconfirmed by commons spanning organisations in which
          employers retain exclusive control of records.
        </p>
      </Proposition>
      <Proposition>
        <p>
          The effects of agent, tool and material are separable where assignments connect them, which eligibility
          thresholds and movement across the commons supply (Section 4). It would be disconfirmed by effect estimates that
          do not converge as connectedness rises.
        </p>
      </Proposition>

      <p className="paper-todo">
        Hosting the commons: the parties that read partitions of the trace (Section 4.5) each have an interest in
        hosting or initialising it.
        Toolmakers, to obtain feedback on their tools. Insurers, to assess risk and incentivise its reduction.
        Regulators, to observe the effect of regulation and improve it. Educators, to identify where their provision
        can improve. Organisations involved in production. Workers and their unions, whose performance the commons
        measures. Independent organisations and industry associations may also host, and the process may be
        open-sourced, with hosting funded by a fee on each user. Under any of these arrangements, the process and the
        orchestration of production become a commodity, to the client&rsquo;s benefit.
      </p>
      <p className="paper-todo">
        Residual claim: Alchian and Demsetz <Cite id="alchian1972" /> justify the
        monitor&rsquo;s residual claim by the monitor&rsquo;s role. Where attribution comes from a co-owned record on
        a common process, monitoring remains but the monitor&rsquo;s privileged position is weakened, and with it the
        ground for the residual claim. The claim is limited to the monitor&rsquo;s position. Attribution gives average
        effects conditional on descriptors and co-workers, not each member&rsquo;s share of a given joint delivery,
        which in non-separable production has no unique value, so the problem of non-separability itself remains. Verifiability: in incomplete-contracts theory, control is allocated through
        ownership because what is delivered cannot be verified <Cite id={['grossman1986', 'hart1990']} />. TBP
        expands what is verifiable, and so changes how ownership and authority are allocated, as on-board computers
        changed asset ownership in trucking <Cite id="bakerhubbard2004" />.
      </p>
    </>
  );
}
