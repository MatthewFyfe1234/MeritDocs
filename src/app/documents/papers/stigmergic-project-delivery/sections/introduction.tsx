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
        through central assignment, rather than letting it fall out of the work&rsquo;s own structure.
      </p>
      <p>
        This paper takes the position that projects are drawn from an operational domain that exists before
        and beyond any of them. <em>Products</em> are delivered by operations afforded by the <em>materials</em> worked
        and bounded by the capabilities of the <em>tools</em> and <em>agents</em> that work them. Products and
        operations alike belong to the domain, not to any one <em>project</em>. A project specifies a particular
        product and draws on the operations its delivery requires.
      </p>
      <p>
        This position is what lets the three functions inform one another. Process can be derived rather than designed, because
        the operations a product needs already exist and only have to be selected. History can accumulate, because
        the same operations recur across projects even when the projects themselves are unique. Allocation can
        follow from the trace, because an agent&rsquo;s experience belongs to the domain, recorded against operations
        that outlast any one project.
      </p>
      <p>
        This paper&rsquo;s contribution is Stigmergic Project Delivery (SPD), a single model built on that position.
        It represents the product side, the space of possible products and their variation, as the <em>master
        specification</em>, and the operational side, the operations available to deliver them, as the <em>master
        process</em>, with a <em>mapping</em> between the two, so that a selection within the product yields the process
        that delivers it. Process is derived from a specification, and trace-based <em>forecasting</em> and{' '}
        <em>self-selected</em> task allocation both draw on the <em>trace</em> of previous executions.
      </p>
      <p>
        Each project begins with a provided instantiation of the specification, a subset of the master with
        its <em>descriptors</em> bound, from which the corresponding subset of the master process is derived. The order of steps
        follows from the products routed between them rather than being specified by hand, as Activity-on-Node
        scheduling requires. The specification and its derived process remain dynamic
        and extensible during execution. From the trace of earlier projects, each derived step carries a forecast of
        its delivery metrics, material usage, time, and whatever else the domain records; the same trace fixes
        which agents are <em>eligible</em> for the job it belongs to. Eligible agents self-select to take up each job&rsquo;s <em>contract</em>, and
        as they work, data on those metrics accrues back into the trace, manually or via telemetry. The trace
        persists across projects, closing the loop: each project forecasts and allocates from the history before it,
        and leaves its own for the next.
      </p>
      <Rev block>
        <p>
          The paper makes one conceptual and four technical contributions. The conceptual contribution is the
          position above. Operations are the modular unit of delivery, and they belong to a domain that precedes and
          outlasts any one project, so process design, forecasting and allocation can share one trace, a form of the
          stigmergy Section 2 sets out. The technical contributions follow, each with how far it has been tested.
        </p>
        <ol>
          <li>
            <strong>Derivation with typed contracts.</strong> A project&rsquo;s process is derived from its selection
            through a mapping onto the master process, whose edges carry typed products, giving each job a contract of
            inputs, outputs and forecasts. It is formalised in Section 3, illustrated in Section 4 and built over
            clinical data in Section 5, but the correctness of derived processes is not yet tested.
          </li>
          <li>
            <strong>Extension during execution.</strong> The specification can be extended while work proceeds,
            including by a step&rsquo;s own findings, and completed steps and their records stay valid unless a late
            selection feeds one already run. It is formalised, illustrated in the patient example and replayed in
            stages on three clinical admissions, though selection by findings is not yet exercised on real data.
            Removal lies outside the model.
          </li>
          <li>
            <strong>An attributed trace and step-level forecasting.</strong> Execution is recorded one metric at a time
            against steps of the master process, so history accumulates across projects, and forecasts are read from
            it at a tolerated risk. Its mechanisms are exercised on mock data, but forecast accuracy is not yet tested.
          </li>
          <li>
            <strong>Exposure, eligibility and self-selection.</strong> Exposure to a step is read from the trace,
            eligibility for a job requires experience at each of its steps, and among eligible agents experience sets
            priority. This is the model&rsquo;s defined policy, exercised on mock data. Comparing it with central
            priority rules by simulation is future work.
          </li>
        </ol>
      </Rev>
      <p>
        Section 2 positions SPD against prior work along the three legs it combines. Section 3 gives the formal
        model: the specification, the mapping, the trace, the eligibility and self-selection they drive, and the
        contract it produces. Section 4 works two concrete
        examples by hand. Section 5 takes each source of data in turn, reporting what has been tested, what it can
        still test, and what it cannot. Section 6 discusses the model&rsquo;s limitations. Section 7 concludes.
      </p>
    </>
  );
}
