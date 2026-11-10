import { Rev } from '@/components/paper';

export function Introduction() {
  return (
    <>
      <h2>Introduction</h2>
      <p>
        Project planning methods typically separate three functions that ought to inform one another. They
        derive process structure by hand rather than from a specification of the product; they forecast performance
        from assumed or generic distributions, or from project-level history, rather than from a recorded
        history of the agents, tools, and materials involved; and they coordinate who does the work
        through central assignment, <Rev>by judgment or by scheduling rules</Rev>, rather than letting it fall out of <Rev minor>a trace left by the work</Rev><Rev>, drawn from manual records, telemetry, filed documents and other sources. Control, in turn,
        measures progress against a baseline kept apart from the work, rather than being informed by that same trace. Plan, forecast and record then
        have to be reconciled by hand.</Rev>
      </p>
      <p>
        This paper takes the position that projects are drawn from an operational domain that exists before
        and beyond any of them. <em>Products</em> are delivered by operations afforded by the <em>materials</em> worked
        and bounded by the capabilities of the <em>tools</em> and <em>agents</em> that work them. <Rev minor>The range of variation in a product and the operations that deliver it belong</Rev> to <Rev minor>that</Rev> domain, not to any one <em>project</em>.
      </p>
      <p>
        This position is what lets the three functions inform one another. Process can be derived rather than designed, because
        the operations a product needs already exist and only have to be selected. <Rev>Their order can be inherited rather than planned, because what one
        operation passes to another fixes which comes first, whichever operations a project skips, and those with no such dependency can run concurrently.</Rev> History can accumulate, because
        the same operations recur across projects even when the projects themselves are unique. Allocation can
        follow from the trace, because an agent&rsquo;s experience belongs to the domain, recorded against operations
        that outlast any one project. <Rev>Progress can be read from the work itself, because what each operation
        receives and produces is known before it begins.</Rev>
      </p>
      <p>
        <Rev minor>Stigmergic Project Delivery (SPD) builds on that position by representing</Rev> the product side (the space of <Rev minor>variation in a product</Rev>) as the <em>master
        specification</em>, and the operational side (the operations available to <Rev minor>deliver it</Rev>) as the <em>master
        process</em><Rev>, whose steps are ordered by what they pass between them. A</Rev> <em>mapping</em> <Rev minor>between the two means</Rev> that a <em>selection</em> within the
        product yields the process that delivers it.
      </p>
      <p>
        Each project begins with a provided <Rev minor>selection</Rev>, a subset of the <Rev minor>master specification</Rev> with
        its <em>descriptors</em> bound, from which the corresponding subset of the master process is <em>derived</em>. <Rev minor>Any <em>extension</em> of the specification during execution is matched by an
        extension of the derived process.</Rev> From the <em>trace</em> of earlier projects, <Rev minor>the delivery metrics of each derived step, such as time or material usage, can be <em>forecast</em></Rev>; the same trace fixes
        which agents are <em>eligible</em> for the <em>job</em> it belongs to <Rev minor>(the steps of one skillset)</Rev>. Eligible agents self-select to take up each job&rsquo;s <em>contract</em>, and
        as they work, data on those metrics accrues back into the trace, manually or via telemetry<Rev minor>, for the projects that follow</Rev>. <Rev>Set against the
        contract&rsquo;s forecasts, the same data shows the project&rsquo;s progress as it runs. The master process is the medium of that trace, persisting across projects where the work of any one does
        not. Agents acting on the trace rather than on instruction is the stigmergic coordination the model enables, as Section 2 sets out. The model can thereby
        take over work that project management performs by hand, as Section 6 sets out.</Rev>
      </p>
      <Rev block>
        <p>
          Where prior accounts of stigmergic coordination among people concern independent tasks or informal site practice, the
          paper&rsquo;s principal contribution is a formal model that extends it to the interdependent jobs of a whole
          project. The paper develops this through one conceptual and six technical contributions, the last following from the other five. The conceptual contribution is the
          position above. Operations are the modular unit of delivery, and they belong to a domain that precedes and
          outlasts any one project, so a project&rsquo;s process can be derived, and its forecasting, allocation and control can draw on a trace common to many projects. The technical contributions build on this position.
        </p>
        <ol>
          <li>
            <strong>Derived typed contracts.</strong> Each selection derives its own process, giving each job a contract
            of typed inputs and outputs and forecasts, which an agent takes on and is held to, rather than a workflow
            design. Everything the model produces refers to the same steps and products, so
            these are aligned by construction rather than reconciled by hand.
          </li>
          <li>
            <strong>Extension during execution.</strong> The specification can be extended while work proceeds,
            including by a step&rsquo;s own findings, and completed steps and their records stay valid unless a late
            selection feeds one already run.
          </li>
          <li>
            <strong>Addressing data scarcity through what work already logs.</strong> Project-level data is scarce because projects rarely
            repeat, but their steps, actions and outputs do. Outputs are often logged and tools report their use, and
            the model&rsquo;s typed outputs let such logs be placed on steps, with timing inferred from when they were
            made. History therefore accrues as a by-product of execution across otherwise unique projects, attributed
            to the agents, tools and materials involved.
          </li>
          <li>
            <strong>Step-level forecasting.</strong> Each step is forecast from that trace rather than the project as a
            whole, so a new project draws on the steps it shares with earlier ones.
          </li>
          <li>
            <strong>Exposure and eligibility.</strong> Exposure to a step is read from the trace, and eligibility for
            a job requires experience at each of its steps. By default, an eligible agent self-selects the
            job. A system may instead select on the agents&rsquo; behalf, and ordering the eligible agents by
            experience is a rational policy the trace supports.
          </li>
          <li>
            <strong>Project control as a byproduct.</strong> Control follows from the five above rather than being
            modelled separately. Progress is read from inputs worked through and outputs produced rather than a judged
            percentage complete, records reconcile against the specification, against one another and against
            their receipt downstream, and each contract fixes its expectations, at a stated risk, before work begins.
            Recorded values stand in for the forecasts of completed steps, so the project&rsquo;s forecast updates as
            it runs, as Section 6 sets out.
          </li>
        </ol>
      </Rev>
      <p>
        Section 2 positions SPD against prior work<Rev minor>, part by part</Rev>. Section 3 gives the formal
        model: the specification, the mapping, the trace, the eligibility they drive, and the
        contract <Rev minor>offered for self-selection</Rev>. Section 4 works two concrete
        examples by hand. Section 5 takes each source of data in turn, reporting what has been tested, what it can
        still test, and what it cannot. Section 6 discusses <Rev>what the model implies for project management overhead, project control, state delivery, other metrics, reading the trace, forecasting the process, modularity of operations, aligned objectives, a shared instrument and artificial agents, and its</Rev> limitations. Section 7 concludes.
      </p>
    </>
  );
}
