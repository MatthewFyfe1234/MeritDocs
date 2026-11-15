import { Rev } from '@/components/paper';

export function Introduction() {
  return (
    <>
      <h2>Introduction</h2>
      <p>
        Project planning methods typically separate three functions that ought to inform one another. They
        derive process structure by hand rather than from a specification of the product; they forecast performance
        from assumed or generic distributions, or from project-level history, rather than from a recorded
        history of the agents, tools and materials involved; and they coordinate who does the work
        through central assignment, <Rev>by judgment</Rev>, rather than letting it fall out of <Rev minor>a trace left by the work</Rev><Rev>, drawn from sources such as manual records, telemetry and filed documents. Control
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
        operation passes to another determines which comes first, whichever operations a project skips, and those with no such dependency can run concurrently, unless one agent performs both.</Rev> History can accumulate, because
        the same operations recur across projects even when the projects themselves are unique. <Rev minor>Eligibility can
        be informed by</Rev> the trace, because an agent&rsquo;s experience belongs to the domain, recorded against operations
        that outlast any one project. <Rev>Progress can be read from the work itself, because what each operation
        receives and produces is known before it begins.</Rev>
      </p>
      <p>
        <Rev minor>Stigmergic Project Delivery (SPD) represents the space of variation in a product</Rev> as the <em>master
        specification</em>, and <Rev minor>the operations available to deliver it</Rev> as the <em>master
        process</em>. <Rev>A</Rev> <em>mapping</em> <Rev minor>between the two means</Rev> that a <em>selection</em> within the
        product yields the process that delivers it.
      </p>
      <p>
        Each project begins with a provided <Rev minor>selection</Rev> <Rev>(an instance of part of the</Rev> <Rev minor>master specification</Rev><Rev>),</Rev> with
        its <em>descriptors</em> bound. <Rev minor>Its process is</Rev> <em>derived</em> <Rev minor>from the selection, and
        extends with it if the selection is</Rev> <em>extended</em> <Rev minor>during execution.</Rev> <Rev minor>The <em>trace</em> of data gathered during earlier projects is held on the master
        process, which persists where the work of any one project does not. It informs the</Rev> <em>forecast</em> <Rev minor>of each derived
        step&rsquo;s delivery metrics, such as time or material usage, and which agents are</Rev> <em>eligible</em> for the <em>job</em> <Rev minor>the step belongs to</Rev>. Eligible agents self-select to take up each job&rsquo;s <em>contract</em>, and{' '}
        <Rev minor>its execution adds to the trace</Rev>. <Rev>Set against the
        contract&rsquo;s forecasts, the trace shows the project&rsquo;s progress as it runs.</Rev>
      </p>
      <Rev block>
        <p>
          Agents acting on the trace rather than on instruction is the stigmergic coordination the model enables.
          Prior accounts of stigmergic coordination concern independent tasks, informal site practice or the current
          intentions of agents in ongoing production. The paper&rsquo;s principal contribution is a formal model that
          extends it to the interdependent jobs of whole projects, with forecasting and eligibility read from a trace
          of past executions held on a process derived from a specification. The paper develops this through one conceptual and five technical contributions, the last following from the other four. The conceptual contribution is the
          position above. Operations are the modular unit of delivery, and they belong to a domain that precedes and
          outlasts any one project, so a project&rsquo;s process can be derived, and its forecasting, coordination and control can draw on a cumulative trace of many projects. The technical contributions build on this position.
        </p>
        <ol>
          <li>
            <strong>Derived typed contracts.</strong> Each job&rsquo;s contract states its typed inputs and outputs and its
            forecasts. Everything the model produces refers to the
            same steps and products by construction.
          </li>
          <li>
            <strong>Extension during execution.</strong> Completed steps and their records stay valid when the selection is
            extended.
          </li>
          <li>
            <strong>Easing data scarcity through what work already records.</strong> Projects rarely repeat, but the
            work within them does. What that work already leaves, such as manual records, telemetry and filed
            documents, can be placed on the steps that produced it, so history accrues as a by-product of execution.
          </li>
          <li>
            <strong>Exposure and eligibility.</strong> Exposure is attributed to individual resources, so forecasts can
            be specific to each agent, tool or material rather than to a pooled resource, and eligibility can rest on
            an agent&rsquo;s own experience.
          </li>
          <li>
            <strong>Project control as a by-product.</strong> Progress is read live from the trace, against what each contract
            anticipates, rather than from a judged percentage complete, and the project&rsquo;s forecast updates as
            recorded values replace forecasts.
          </li>
        </ol>
      </Rev>
      <p>
        Section 2 positions SPD against prior work. Section 3 gives the model<Rev minor>, and</Rev> Section 4
        works two examples. <Rev>Section 5 evaluates the model, Section 6 discusses its implications and
        limitations,</Rev> and Section 7 concludes.
      </p>
    </>
  );
}
