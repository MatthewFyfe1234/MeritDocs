import { Cite, Eq, M, Rev } from '@/components/paper';

export function Discussion() {
  return (
    <>
      <h2>Discussion and limitations</h2>
      <Rev block>
        <h3>Implications</h3>
      </Rev>
      <Rev block>
        <p>
          <strong>Project management overhead.</strong> The model takes over three tasks project management otherwise performs by hand. Planning the operations falls
          to derivation, since the steps a project needs follow from its selection. Estimating falls to the trace,
          since each step&rsquo;s forecast is read from recorded executions. Assigning work falls by default to eligibility,
          since a contract is offered to the agents the trace makes eligible and taken by one of them, though a
          manager may instead allocate agents within that pool. Much of the role remains. The model informs but does
          not make the decisions of baseline scheduling under finite resources, time/cost trade-offs and the corrective
          actions project control calls for. Management also sets the policy the model reads (the tolerated risk, the
          experience floors and the pool of agents), handles what the model leaves out, such as rework and removal, and
          carries the wider work of leading a project, among its stakeholders and suppliers.
        </p>
      </Rev>
      <Rev block>
        <p>
          <strong>Project control.</strong> Because the mapping ties the specified product to the steps that deliver
          it, what each step should receive and produce is known before work starts, and progress can be read
          against it in four ways. Inputs worked through can be checked by hand. In the wall frame of
          Section 4, three of the five framing members laid out puts Lay Out three-fifths of the way through its
          inputs, though not necessarily through its effort. Tool use can be read
          from telemetry, as a nail gun records each nail it fires. Other metrics can be recorded by hand as the
          work proceeds. The expected outputs can be checked for, whether a single product passed on at completion
          or a running record that accumulates as the work proceeds, such as the medication given over a shift.
          Each reads status from the work itself rather than from a judged percentage complete,
          and the last is a further benefit of promoting the activity-on-node graph&rsquo;s edges to products. The readings must also reconcile, with what the
          specification expects of the step, across the records of one execution, and with the product as received
          downstream. Wood and nails both tracking their expected usage give more confidence than either alone, and a
          discrepancy shows that a record is incomplete or wrong, though not which. Reconciliation needs records
          independent of the agent&rsquo;s own account, such as telemetry or metered materials, and cannot detect
          records that are wrong but consistent. Each reading is also more reliable where the relevant forecast is
          narrow, as for an agent whose trace shows consistent work. Because expectations are conditioned on the
          descriptors of the work, records can be compared across differing instances against a basis stated in the
          contract before work begins. Some attribution is assigned rather than measured, as where Mark Out and Lay
          Out share the time before the first nail. Nor does attributing a record to an agent hold the agent
          responsible for it. Separating the effects of agent, tool and material is what lets the two be told apart. Actual can be set against
          expected step by step from the outset, rather than starting from the project as a whole and drilling
          down when a warning shows, as top-down tracking does <Cite id="vanhoucke2011" />, within the project
          control Vanhoucke builds by integrating
          the baseline schedule, schedule risk analysis and earned value management <Cite id="vanhoucke2014" />.
        </p>
        <p>
          The accumulation of Section 3 states this precisely, as one reading of the model rather than a part of it.
          Write <M>{"C_t \\subseteq N_{\\hat{T}}"}</M> for the steps completed by time <M>{"t"}</M>
          and <M>{"\\hat{y}_m(s)"}</M> for a completed step&rsquo;s recorded value. Each step&rsquo;s value at{' '}
          <M>{"t"}</M> is then its recorded value if it has completed, and its forecast otherwise,
        </p>
        <Eq gloss="At time t, a completed step contributes its recorded value and any other step its forecast.">{"y_m^{t}(s) = \\begin{cases} \\hat{y}_m(s) & s \\in C_t \\\\ y_m(s) & \\text{otherwise} \\end{cases}"}</Eq>
        <p>
          and accumulating these in place of the forecasts alone gives <M>{"X_m^{t}"}</M>, the project&rsquo;s updated
          forecast at <M>{"t"}</M>, its completion time through the path operators and its materials and carbon as
          totals. A step deviates on a metric where more is worse when its recorded value exceeds its forecast at the tolerated risk,
        </p>
        <Eq gloss="A completed step deviates on a metric where its recorded value exceeds its forecast at the contract's tolerated risk.">{"\\hat{y}_m(s) > \\mathrm{forecast}(s, m, D, r, c)"}</Eq>
        <p>
          so an overrun is read against the risk accepted at the outset. By that same risk, about a share{' '}
          <M>{"1 - r"}</M> of well-forecast steps will deviate by design, so a single deviation signals little, and
          control is better read at the job or project level through the accumulation. Tolerance limits in statistical project control serve a similar end <Cite id="colin2014" />. In the wall frame of Section 4, once Mark
          Out and Lay Out are recorded<Rev minor> or assigned</Rev>, their times stand in for their forecasts, and the uncertainty in the
          job&rsquo;s time is that of Nail Frame and Stack Panel alone. As the project&rsquo;s own records also enter the
          trace, forecasts for its remaining steps update with them. Deciding what to do about a deviation lies
          outside the model.
        </p>
      </Rev>
      <Rev block>
        <p>
          <strong>State delivery.</strong> A project delivers a desired state from an initial one. For production the
          initial state is a product that does not yet exist, and for maintenance it is an undesired state, as with a
          patient&rsquo;s ailment or a building in disrepair. The one model therefore serves both, as the worked examples
          show. A selection states what to deliver in production, while in maintenance it can also record a finding
          about the initial state. Either way the decision stays with whoever selects, as with a clinician&rsquo;s
          choice of treatment, and the process follows from it.
        </p>
      </Rev>
      <Rev block>
        <p>
          <strong>Other metrics.</strong> The model forecasts and reads any metric the trace records or that follows from them, as energy in the
          wall frame and dose and blood-pressure fall in the patient example show. A project&rsquo;s carbon is one, the
          total (12) over its steps,
        </p>
        <Eq gloss="A project's carbon sums, over its steps, a workspace baseline on the step's time, a quantity for each action and the carbon embodied in its material.">{"X_{\\mathrm{carbon}}(N_{\\hat{T}}) = \\sum\\nolimits_{s \\in N_{\\hat{T}}} \\bigl(\\, \\beta\\, y_{\\mathrm{time}}(s) + \\kappa\\, y_{\\mathrm{actions}}(s) + \\varepsilon\\, y_{\\mathrm{material}}(s) \\,\\bigr)"}</Eq>
        <p>
          with <M>{"\\beta"}</M>, <M>{"\\kappa"}</M> and <M>{"\\varepsilon"}</M> given factors for the workspace
          baseline per unit of time, the carbon per action and the carbon per unit of material. Through the baseline a slower execution
          costs carbon as well as time. A project&rsquo;s carbon can be forecast before work starts and read from its own records as it proceeds,
          attributed to the steps, tools and materials that produced it.
        </p>
      </Rev>
      <Rev block>
        <p>
          <strong>Reading the trace.</strong> A forecast may rest on two kinds of factor, which can combine: trends in an
          agent&rsquo;s or tool&rsquo;s own records, as an agent gains experience <Cite id="newell1981" /> or tires through
          a week, or a hardware tool wears or warms up through a cold morning; and comparables, the records of agents or
          tools at a similar exposure in a similar context, such as agents with similar experience or tools of similar wear.
          Both are read against the descriptors of the work. Conditioning more finely can narrow a forecast, but each finer context
          also holds fewer matching records, so the gain is a direction of travel rather than a floor reached. These factors can
          be learned as weights by conventional techniques, a hierarchical fit among them.
        </p>
      </Rev>
      <Rev block>
        <p>
          <strong>Forecasting the process.</strong> Extension adds steps as findings arrive, but the trace also records
          which nodes have followed which across past projects, so the likelihood of a further selection could be
          forecast, given the current selection and its descriptors, where stochastic networks give their branches
          probabilities in advance <Cite id="pritsker1966" />. A forecast could then cover the processes a project may
          yet take rather than only the one selected so far, as when a clinician gives an 80% chance that a finding is
          benign, here tied to the steps and resources each outcome would need.
        </p>
      </Rev>
      <Rev block>
        <p>
          <strong>Modularity of operations.</strong> Flyvbjerg argues for replicable modules in project design, because
          repetition drives learning <Cite id="flyvbjerg2021" />. SPD finds that repetition in the operations instead,
          where it occurs far more often, down to each use of a tool, and persists across a much wider range of
          product variation. It looks to the agents and tools with demonstrated capability at those operations, so a
          product can vary and still be delivered by those shown able to deliver it. A project need not then standardise its product to gain from repetition.
        </p>
      </Rev>
      <Rev block>
        <p>
          <strong>Aligned objectives.</strong> Because each record is attributed to those who produced it, and each
          contract states what is expected before work begins, compensation can be pegged more closely to
          contribution, bringing a worker&rsquo;s objectives closer to their employer&rsquo;s. Pay tied to recorded measures
          has known costs, such as effort shifting to what is recorded <Cite id="holmstrom1991" />. Attribution does not itself
          establish responsibility, as project control notes, and tying pay to forecasts sharpens the risk, taken up
          below, that they become targets. Records attributed to individuals also raise concerns of surveillance. Ownership is
          the lever here, since a record an agent holds serves as a credential rather than a means of watching them,
          though custody of the trace lies outside the model and is not explored here.
        </p>
      </Rev>
      <Rev block>
        <p>
          <strong>A shared instrument.</strong> Where the master and trace are open to read, they can serve as one
          reporting tool across an organisation: for setting pay, for seeing shortages of resources and how they are
          trending, and for workers seeing where they can improve.
        </p>
      </Rev>
      <Rev block>
        <p>
          <strong>Artificial agents.</strong> An AI that performs steps is recorded as an agent like any other, so it can
          be compared with a human agent in its place against a fixed process, on the same steps, descriptors and
          metrics, where benchmarks of whole tasks <Cite id="mazeika2025" /> cannot show where in the work an agent falls
          short. The process also narrows the black box. It does not explain the model, but it requires a comprehensible
          footprint, the metrics each step should record and the outputs it should produce, against which activity
          logs <Cite id="chan2024" /> can be read and a failure located. An AI that a person uses
          to perform a step is instead a tool, recorded against the steps it is used in. A new model version has no
          history of its own, and so starts from a given forecast, as Section 3 sets out.
        </p>
      </Rev>
      <Rev block>
        <h3>Limitations</h3>
      </Rev>
      <Rev block>
        <p>
          <strong>Configuring the master.</strong> The master has to be authored, kept
          current and, if traces are to pool across organisations, agreed between them, and the clinical build of
          Section 5 shows that work to be substantial. It could be initialised from existing logs, with clustering expected to group
          records into steps and jobs, and process discovery to order them <Cite id="vanderaalst2016" />, though the
          specification, the checking of the mapping, the naming of what is found and any steps that leave no record
          would still fall to its authors. Rare variants, which a master exists partly to hold, would also tend to be lost
          or to confuse the result. Where the master is wrong, everything derived from it is
          consistently wrong, but the error shows, and is corrected, in one place rather than across artefacts
          reconciled by hand.
        </p>
      </Rev>
      <Rev block>
        <p>
          <strong>Project unit.</strong> The worked examples apply the model to production, in the wall-frame panel,
          and to maintenance, in the care of a patient&rsquo;s health, each a project unit with a specification of its
          own. The model has not been generalised to, or tested within, continuous production. Nor does a
          specification yet persist across projects. One intended extension is to the whole lifecycle, the
          specification of a new build becoming the backbone of every maintenance project after it, and a
          patient&rsquo;s specification following them through life, in a single model of state delivery where the effect
          of one project can inform another, as skipped maintenance in a forest bears on later wildfire.
        </p>
      </Rev>
      <p>
        <Rev minor><strong>Changes during execution.</strong></Rev> <Rev>Selection or deselection comes with no safeguards in the
        model where work is already in motion. A late selection can force rework, a deselection can leave completed work with no
        place in the process, and a step added to a job already taken may be one its agent does not clear the floor
        for. Limiting or appropriately
        handling such changes is the job of extensions to the model or of an implementation.</Rev>
      </p>
      <Rev block>
        <p>
          <strong>Product definition.</strong> The master names its products without specifying them, so what form a
          cutting list should take rests on the tacit understanding of those doing the work <Cite id="autor2015" />, and an
          agent without that understanding, an AI in particular, may need it stated. Product templating, with a
          check of conformance, would extend the model to do so without changing its structure.
        </p>
      </Rev>
      <p>
        <Rev minor><strong>Granularity of the contract.</strong></Rev> A job is offered and taken whole, by one agent.{' '}
        <Rev>
          The model does not allow for the division of a job&rsquo;s steps among agents, one agent taking some of its steps and another
          the rest, nor for parallel workflows within a job. Nor does it pass a job from one agent to another partway
          through. Its remit is to establish who is eligible and to forecast execution metrics, not the division
          of labour, or trade-offs and priorities between jobs. Forecasts can still be conditioned on a named agent
          at any step, so a user dividing the labour, or deciding how many agents to deploy, can draw on them, but
          that decision lies outside the model, whose unit of offer is the whole job. Across jobs, steps
          run concurrently wherever the process allows.
        </Rev>
      </p>
      <Rev block>
        <p>
          <strong>Process recursion.</strong> The model does not map iterations into the process. Each distinct step
          appears once, and its iterations arise at runtime, as its agent executes it as many times as the work
          requires. This keeps the model consistent between processes where the number of iterations is known at the
          outset, as with a set of panels, and those where it is not, as with a diagnosis that moves from one
          candidate to the next. Whether the two cases should be treated differently is open to discussion and
          testing.
        </p>
      </Rev>
      <p>
        <Rev minor><strong>Independence of forecasts.</strong></Rev> Per-step distributions combine into a job&rsquo;s forecasts, and on to the project, under the assumption that
        the steps are independent. That assumption holds well for a shallow graph with little sharing of sources.
        Where converging paths share a source, <Rev minor>an upstream step,</Rev> one agent or one material batch, their errors are correlated, and the
        independence assumption understates the risk, leaving the forecast at any tolerated risk optimistic<Rev>, a problem schedule risk analysis has also recognised
        in activity durations <Cite id="vandorp1999" /></Rev>. The
        effect grows with the number of paths converging through shared sources, which is to say with the size and
        interconnection of a project. <Rev>It is greatest within a job, whose steps share their agent by
        construction, so the contract&rsquo;s forecast, the one an agent commits to, is where independence most
        understates the risk.</Rev> Monte Carlo sampling at the source level is the route past it, carrying a shared source through the paths it touches so
        their correlation is preserved<Rev>, with each metric&rsquo;s operators applied to every sample, so the
        maximum where paths converge carries no merge bias either, the understatement of when the last input
        arrives that comes from taking the maximum of point estimates <Cite id="maccrimmon1964" /></Rev>. That route needs a trace attributed at the source level and is untested
        here. Independence can fail from the specification side too, where co-selected nodes interact, a roof with
        both a turret and a bay window being harder than either alone. The forecast captures this by conditioning on
        the combination where the trace holds such records, but those grow sparse as combinations multiply, and
        without them it falls back to an additive approximation that under-predicts interacting selections.
      </p>
      <Rev block>
        <p>
          <strong>Contention.</strong> By default, a contract goes to whichever eligible agent claims it first, who
          need not be the best placed to take it. An agent with a scarce skill may take up a simple job and so be
          tied up when a job only they can do arrives. A policy within the eligible pool, ranking by experience,
          balancing load or reserving scarce skills, can guard against this, but the choice of policy lies outside
          the model. Whether any policy allocates better than the default, including where agents contend for the
          same jobs, is untested and left for future work. Floors also exclude newcomers, who cannot gain at a step the experience
          its floor requires, and credited experience, which lies outside the model, is the only way past them. Where work cannot wait for a claim, as in the acute care of Section 4, allocation
          falls to rosters and the like, and the model supplies forecasts and eligibility alone.
        </p>
      </Rev>
      <Rev block>
        <p>
          <strong>The trace in use.</strong> Self-selection biases the trace. Agents take the jobs they expect to do
          well, so forecasts conditioned on an agent, and the premise that exposure predicts performance, are
          confounded much as dosing is in Section 4. Random assignment, as of judges to cases, removes the
          confounding, which is why Section 5 looks to court records. Allocating a share of work, as a check on choice, would
          reveal the bias in use. The contract&rsquo;s forecast also pools over
          agents, so those faster than the pool gain by claiming and slower ones overrun, and claims sort agents in
          ways the forecast does not reflect. Forecasts can also become targets. Once a
          forecast is a term of a binding contract, work may expand to meet it and the trace absorb the longer
          durations, so that later forecasts drift. The model does not guard against any of these.
        </p>
      </Rev>
    </>
  );
}
