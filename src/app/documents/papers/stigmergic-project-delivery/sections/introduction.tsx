export function Introduction() {
  return (
    <>
      <h2>Introduction</h2>
      <p>
        Project planning methods typically handle three things separately that ought to inform one another. They
        derive process structure by hand rather than from the product to be built; they forecast performance
        from assumed or generic distributions, or from project-level history, rather than from a recorded
        history of the agents, tools, and materials involved; and they coordinate who does the work
        through central assignment, rather than letting it fall out of the work&rsquo;s own structure, in which
        the skillsets needed and the relevant experience are already defined by the derivation.
      </p>
      <p>
        This paper&rsquo;s contribution is Stigmergic Project Delivery (SPD), a single model in which process
        derivation draws on the specification, and trace-based forecasting and self-selected task allocation both
        draw on the trace that execution accumulates.
      </p>
      <p>
        In SPD, a master specification holding all variation in the product and a master process holding all
        variation in its delivery are initialised. Each specification node is then linked to the steps it
        necessitates, so a selection within the product determines the process that delivers it. Within the process,
        the steps are joined by directed edges, each carrying a product that one step produces and the next consumes;
        these products are the inputs a step takes and the outputs it must produce, and so form its contract. Steps
        are grouped by skillset, and specification nodes may carry descriptors, values that scale the outcomes
        recorded against the steps they necessitate.
      </p>
      <p>
        Each project begins with a provided instantiation of the specification, a subset of the master with its
        descriptors bound, from which the corresponding subset of the master process is derived. The order of steps
        follows from the products the master process routes between them, authored once and inherited rather than
        hand-specified per project, as Activity-on-Node scheduling and BPMN require. The specification and its derived process remain dynamic
        and extensible during execution. From the trace of earlier projects, each derived step carries a forecast of
        its delivery metrics, material usage, time, and whatever else the domain records; the same trace fixes
        which agents are eligible for it. Eligible agents self-select to take up each skillset&rsquo;s contract, and
        as they work, data on those metrics accrues back into the trace, manually or via telemetry. The trace
        persists across projects, closing the loop: each project forecasts and allocates from the history before it,
        and leaves its own for the next.
      </p>
      <p>
        Section 2 positions SPD against prior work along the three legs it combines. Section 3 gives the formal
        model: the specification, the mapping, the trace, the eligibility and self-selection they drive, and the
        contract it produces. Section 4 works two concrete
        examples by hand. Section 5 outlines the evaluation this claim invites, since this paper introduces and
        positions the model rather than executing that evaluation. Section 6 discusses the model&rsquo;s limitations and where it does not
        apply. Section 7 concludes.
      </p>
    </>
  );
}
