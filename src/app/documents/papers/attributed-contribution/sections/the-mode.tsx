import { Cite, Figure, M, Eq } from '@/components/paper';
import { AttributedStepFigure, StepScalingFigure, TeaByWorkerFigure, TeaByKettleFigure, HarvestByOperatorFigure, HarvestByCombineFigure, HarvestByMoistureFigure } from '../figures';

export function TheMode() {
  return (
    <>
      <h2>Trace-Based Production</h2>
      <p>
        Each element of a product&rsquo;s specification has descriptors and requires steps to deliver it. When the
        element is delivered, data is recorded against each step, and the aggregated records allow forecasting and
        the attributed comparison of the agents, tools and materials involved.
      </p>

      <h3>Definitions</h3>
      <p>
        <strong>Specification.</strong> The desired state of a product, for a client or a production batch, as a set
        of nodes <M>{"N"}</M>, the elements of the product. A deviation of the product from that state calls for the
        steps that close it. Delivery closes the deviation from nothing, and maintenance closes deviations that arise
        over the product&rsquo;s life, so a single specification serves the whole lifecycle of a product, whether a
        building, a patient&rsquo;s health or a forest.
      </p>

      <p>
        <strong>Descriptor.</strong> An attribute of a node of the specification, either numerical, such as its area, or categorical, such
        as a grade of material. A node carries descriptors <M>{"D = (d_1, \\dots, d_k)"}</M>. Numerical descriptors
        scale the distribution of the metrics at the steps the node necessitates. Categorical descriptors select among
        distributions, each category having its own, without changing the steps.
      </p>
      <p>
        <strong>Process.</strong> The steps that deliver a product, written <M>{"N_s"}</M>, with a single step
        written <M>{"s"}</M>. Delivery of a product involves the instantiation of its process.
      </p>

      <p>
        <strong>Step.</strong> A unit of the process, defined by its output rather than its method, performed by an
        agent with tools and materials.
      </p>
      <p>
        <strong>Mapping.</strong> The association of each node of the specification with the steps it necessitates.
        A given node always necessitates the same steps. Write it as a map from nodes to sets of steps.
      </p>

      <Eq>{"\\mu : N \\to 2^{N_s}"}</Eq>

      <p>
        <strong>Metric.</strong> A quantity recorded at a step, such as the time taken. A step
        records <M>{"M = (m_1, \\dots, m_n)"}</M>, and the descriptors of the node that necessitates it scale those
        metrics.
      </p>
      <p>
        <strong>Output.</strong> The state of the product a step delivers, such as water at a target temperature in a
        required volume. The record holds its timestamp, and measures taken of it, such as the volume and temperature
        of water delivered, are metrics. The output of one step is received as a material by the steps that follow.
      </p>
      <p>
        <strong>Resource.</strong> An agent, tool or material drawn on by a step. Each carries metrics of its own,
        such as an agent&rsquo;s hours worked.
      </p>
      <p>
        <strong>Agent.</strong> A resource that performs steps, written <M>{"a"}</M>, whether a functional group, an
        individual or an autonomous system such as a generative AI. In this
        paper an agent is typically a worker. Where the agent is a functional group, attribution within it requires
        records at a finer grain. Tools are written <M>{"t"}</M> and materials <M>{"w"}</M>.
      </p>
      <p>
        <strong>Record.</strong> One delivery of a step, logged against time. It ties the
        metrics <M>{"M"}</M> recorded at step <M>{"s"}</M>, under descriptor values <M>{"D"}</M>, to the
        agent <M>{"a"}</M>, tools <M>{"t"}</M> and materials <M>{"w"}</M> involved, in delivery instance <M>{"i"}</M>.
        Records carry, or link to, further attributes of the instance and of the resources, such as where and when
        the work was done or how an agent was trained. Where a material is the output of an earlier step, the record
        identifies it, linking the two records. A record captures what was delivered, independent of any
        agent&rsquo;s own account of it. Where capture is instrumented, a record holds the events within a delivery as
        well as its totals.
      </p>
      <p>
        <strong>Trace.</strong> The accumulated set of records.
      </p>

      <Eq>{"\\tau = \\bigl\\{\\,(i,\\ s,\\ D,\\ a,\\ t,\\ w,\\ M)\\,\\bigr\\}"}</Eq>

      <p>
        <strong>Forecast.</strong> The metrics to expect at a step, given the descriptor values of the next instance.
        It is initialised from heuristic rules and reconciled against records as they accumulate, becoming a learned
        distribution drawn from the trace, with <M>{"\\theta"}</M> the dependence of the metrics on the descriptors.
      </p>

      <Eq>{"M(s) \\,\\sim\\, \\mathcal{D}\\bigl(\\theta(D),\\ s\\bigr)"}</Eq>

      <p>
        A delivery is evaluated against its forecast. The forecast is estimated jointly with the effects of the
        resources involved, so that each is read net of the others and the forecast is not confounded by who took
        which work, provided the descriptors capture what the choice of work depends on (Section 6). In its simplest, additive form, the deviation of a
        delivery from its forecast decomposes into an agent effect, a tool effect, a material effect and noise.
      </p>

      <Eq>{"M - \\hat{M}(s, D) = \\alpha_a + \\beta_t + \\gamma_w + \\varepsilon"}</Eq>

      <p>
        <strong>Partition.</strong> A division of the trace into groups by an attribute of its records, such as the
        agent, tool or material involved, the time of day, the jurisdiction in which the work was done, or the
        educator who trained the agent. The attribute enters the decomposition above as a further term{' '}
        <M>{"\\delta_g"}</M>, estimated jointly with the effects of the resources, so that each group{' '}
        <M>{"g"}</M> is compared net of the others and conditioned on the descriptor values.
      </p>

      <p>
        <strong>Score.</strong> A combination of items from an agent&rsquo;s records at a step, with explicit weights,
        used to evaluate and compare agents. It may be a single count, such as the number of deliveries of the step,
        or combine effects on several metrics and their spread. The score used for eligibility is held in the commons,
        and each party making a selection may apply its own.
      </p>
      <p>
        <strong>Eligibility.</strong> The agents permitted to select a step, those whose score at the step meets its
        threshold <M>{"\\lambda_s"}</M>.
      </p>

      <Eq>{"\\mathrm{Elig}(s) = \\{\\, a : \\mathrm{score}_a(s) \\geq \\lambda_s \\,\\}"}</Eq>

      <p>
        <strong>Innovation.</strong> A contribution that improves how steps are delivered rather than delivering
        them, such as revising the process or its terminology, improving documentation, introducing a method, tool or
        material, or improving another agent&rsquo;s delivery. It is evaluated by its effect on subsequent deliveries
        and credited to whoever made it.
      </p>
      <p>
        <strong>Process commons.</strong> A process against which every party delivering the product
        records, so that the trace <M>{"\\tau"}</M> is pooled at the level of the process.
      </p>

      <h3>Attribution</h3>
      <p>
        Figure 1 draws one node of a specification, A, and one step it necessitates, p1. In general a node may
        necessitate several steps, and a step may serve several nodes. The node carries descriptors, such as its area and its grade of material, and
        the step records metrics, such as the time taken and the material used.
      </p>

      <Figure caption="One node of a specification, A, carrying its descriptors, necessitates one step of the process, p1. Each delivery of the step is logged as a record naming the agent, tools and materials involved and the metrics recorded, and the output it passes to the steps that follow.">
        <AttributedStepFigure />
      </Figure>

      <p>
        Consider that step delivered many times by different workers using a mixture of tools and materials. Over
        many deliveries, the records show how the distribution of each  metric depends on the descriptors, scaling with the numerical ones and differing between the categories of the categorical ones, according to conventional analytical techniques (Figure 2). That relationship, <M>{"\\theta"}</M>, provides
        the basis for the step&rsquo;s forecast <M>{"\\hat{M}(s, D)"}</M>. Three things are distinct here. The record of who delivered
        what is observed. The forecast is estimated, as are the effects of the agents, tools and materials, and both
        are refined as records accumulate. Attribution is the estimation of those effects.
      </p>
      <Figure caption="Nine deliveries of step p1. Node A is stacked by delivery, each slab's height its area and its shade its grade of material, dark for grade 2. Beside it, the time and material used in p1 are each layered by worker. Each layer is the worker's share of that metric, labelled with how far it lay above or below what the descriptors of their deliveries would predict. Any component of the trace can take the place of the worker.">
        <StepScalingFigure />
      </Figure>
      <p>
        The same model serves two purposes. Looking forward, it forecasts the next delivery from its descriptors.
        Looking back, it separates what each delivery&rsquo;s descriptors demanded from what its agent, tools and
        materials contributed. Their effects, <M>{"\\alpha_a"}</M>, <M>{"\\beta_t"}</M> and{' '}
        <M>{"\\gamma_w"}</M>, can be separated provided agents, tools and materials are connected through shared
        records, each agent linked to others through the tools, materials or co-workers they share. A worker who only
        ever uses one tool can still be separated from it, provided that tool is also used by others who use other
        tools. What cannot be separated is a group of agents and tools that never mixes with the rest, since a
        difference between such groups may be due to either. In an immature trace, with few records and few links,
        all effects are estimated together and remain noisy. In a mature trace, a new agent, tool or material joins records whose other effects are already well estimated,
        so its own effect is identified from few observations, which instrumented capture can supply within a single
        delivery.
        Where a step is performed jointly, variation in who works with whom separates individual effects and, in a
        mature trace, the effects of particular pairings, as interaction terms added to the
        decomposition <Cite id="jaravel2018" />. With that separation, workers become comparable, and the same
        comparison applies to any partition of the trace. What is measured is contribution relative to what the
        descriptors demanded, not a counterfactual marginal product.
      </p>
      <p>
        The estimator is left open. Parallel equations for several metrics <Cite id="zellner1962" />, hierarchical
        models that place a new agent at the population level and update it as records accumulate, distributional models of spread, and neural
        networks for the dependence on descriptors all fit the decomposition, though attribution requires that the
        effects of agents, tools and materials remain explicit and interpretable.
      </p>
      <p>
        The metrics carried by each resource must reconcile with the trace. Hours logged against steps must account for hours worked, and materials consumed
        across steps must balance against materials drawn. A discrepancy shows that the trace is incomplete or wrong,
        though not where. Whether capture is manual or instrumented, reconciliation detects inconsistent data and
        creates pressure to improve it. It does not detect data that is wrong but consistent. The same additional
        metrics also give further constraints for separating the effects of worker, tool and material.
      </p>
      <h3>Selection</h3>
      <p>
        Selection uses the trace partitions. A party choosing a resource for a step reads the partition by that
        resource, the client choosing an organisation, the worker choosing an employer and the work they take on, and
        the organisation choosing a worker, tool or material. A selecting party reads not only the expected
        metric but its spread, including the risk of delay or abandonment. At a fixed price for the work, it is a
        record that narrows this distribution that makes one agent preferable to another.
      </p>
      <p>
        Work at the step is offered against its forecast to the agents eligible for it. Eligibility rests on a
        worker&rsquo;s delivery history at the step, meaning how often they have delivered it and their past
        performance, combined in its score. Thresholds for harder work are reached on easier work, such as a number
        of deliveries or a sum of descriptor values, and may require supervision. Every worker eligible for hard work
        therefore has records on easier work, which helps separate the effect of the worker from the difficulty of the instance. Movement between organisations and
        teams with different equipment, which the commons encourages, connects agents with tools and materials. The supervisor who certifies a worker past a threshold is compensated in part from the subsequent
        outcomes of those they certify. Eligible workers self-select. The work is not allocated, except that a share
        may be, which reveals any bias from choice (Section 6). How competing selections are resolved, whether first
        come first served or by auction, is a lever set in deployment, as are the allocated share, the thresholds and
        the weights of the score.
      </p>
      <p>
        The judgements that remain, such as certifying a worker, overriding a forecast or revising a mapping, are
        themselves recorded in the trace as attributable events, and are evaluated by their outcomes like any other
        contribution.
      </p>

      <h3>Reward</h3>
      <p>
        Because contribution is attributed to the agent who delivered it, compensation can be proportionate to it
        rather than to the hours that stood in for it. This holds under either time rates or piece rates. Under piece
        rates the record prices each delivery directly, while under time rates it sets the rate itself, through
        grading, progression or bonus. TBP supplies the attribution and does not prescribe the pay scheme. Where
        contribution is not recorded to sufficient quality, pay remains on the conventional basis. The record also
        allows risk to be allocated between the parties. Work whose forecast is narrow can be taken at a fixed price,
        with the agent keeping the gain from delivering faster, while work whose forecast is wide can remain on time
        rates, with the risk held by the organisation.
      </p>

      <h3>Process as a commons</h3>
      <p>
        The scope of a commons is the set of parties recording against the same process. It may be a team, an
        organisation, a group of organisations or an industry. Its natural limit is the operational domain, the
        operations afforded by the materials worked and bounded by the tools and agents that work them, since beyond
        it parties no longer deliver the same steps.
      </p>
      <p>
        Within that scope, the trace for each step is pooled across every party delivering it, and access to the
        pooled trace is conditional on contributing to it. Forecasting and the
        separation of effects improve with the number and variety of records, so both improve with scope. Below a
        sufficient scope, forecasts remain close to their heuristic starting point. The value of the
        commons increases with the number of parties, the network effect set out in Section 3.
      </p>
      <p>
        The commons fixes what each step must output and how it is measured, not the method by which it is
        performed, so no party within it can redefine what counts as good work. Methods are recorded as optional
        attributes of a delivery, so a variant can be compared without being mandated.
      </p>
      <p>
        The trace serves those who supply or govern production as well as its parties. Each partition is read by
        whoever supplies or governs the resource it is drawn by. Toolmakers and material manufacturers read the performance of
        their products in use, net of the agents and conditions they were used under. Educators read the deliveries
        of those they trained, net of the tools and materials they later worked with. Regulators read the effect of a
        regulation in the partition by jurisdiction or by date, and insurers can price risk on recorded conduct
        rather than on broad categories <Cite id="rothschild1976" />. The same decomposition that separates the
        worker from the tool separates the tool from the worker, so each reads its own effect from one record.
      </p>
      <p>
        Ownership is not a property of the mechanism, which works whoever holds the trace. Within a single
        organisation, one party holds the trace. As a process commons spans organisations, it tends toward shared
        ownership of a worker&rsquo;s records by the worker and the organisation (Section 3). The process belongs to
        neither, being held in common.
      </p>

      <h3>Innovation</h3>
      <p>
        Innovation uses the trace partitions. A group that consistently outperforms marks a practice worth
        adopting, and one that underperforms marks where improvement is possible. Which metric matters is set by
        selection. A client choosing on a given metric, such as carbon or time, directs innovation toward it, since
        outperformance on that metric is what wins selection.
      </p>
      <p>
        The forms of innovation follow from the partitions. Where a process variant outperforms, revising the process
        to adopt it improves the deliveries of everyone working against it. Where a method, tool or material
        outperforms, its adoption improves the deliveries of those who take it up. Where an agent outperforms,
        improving other agents&rsquo; delivery, commonly by training, transfers the practice, and the trace shows who
        is placed to train whom. Contributors to the commons can therefore be rewarded for improving it, and those who supply or
        govern production innovate against their own partitions (Section 4.5), directed in the same way by what
        clients select on.
      </p>
      <p>
        A change to the process is recorded in the commons as a variant of the step, proposed by the worker who made
        it and credited to them. Deliveries that use
        the changed process are identified in the trace, so its gain is measured across every worker who adopts it,
        against the forecast that held before the change. The originator is credited with that gain over subsequent
        deliveries, diminishing as deliveries accumulate. A practice shared through the process is therefore credited
        across all its adopters, while one kept private improves only the originator&rsquo;s own deliveries and appears
        only as their own effect. Best practice that competitors can copy brings absolute improvement to all and
        relative improvement to none <Cite id="porter1996" />, so spreading a practice erodes it as an advantage.
        Credited across its adopters, its originator gains from the spread instead. Meanwhile the forecast tightens to the new level, so the improvement becomes part of
        what every delivery is evaluated against, and selection reads an accurate forecast throughout. This allows
        compensation in two streams, one for delivering steps and one for innovation. The rate at which the innovation
        stream diminishes is a lever, set in deployment.
      </p>
      <p>
        An adopter who does not declare a variant keeps its gain as their own effect, but that effect shows a break,
        coinciding with the recording of the variant, toward the profile of declared adopters. The record does not
        settle whether the practice was adopted or arrived at independently, but it raises the question, and the
        judgement that resolves it is recorded like any other. The undeclared gain also erodes, since the forecast
        tightens as declared adoption spreads. Between independent originators, priority goes to whichever variant
        was recorded first, which rewards declaring early.
      </p>
      <p className="paper-todo">
        Innovation figure (to be drawn, after which the later figure numbers in the text shift by one): an innovation event, subsequent deliveries better than the forecast that held before
        it, the shaded gain across adopters credited to the innovator, tapering over deliveries, while the forecast adjusts to the new level. In the style
        of Figure 1.
      </p>

      <h3>Example: making tea</h3>
      <p>
        The mechanism operates step by step, so we follow one node of a specification and one of the steps it necessitates. A
        specification for tea contains several nodes, some essential and some optional, whose structure lies outside
        this paper. We follow one of them, hot water, whose descriptors are the volume required, set by the number
        of cups, and the target temperature. Among the steps it necessitates is filling and boiling the kettle, defined by its output,
        water at the target temperature in the required volume. The step records the time taken, the energy used and the
        water drawn, and the volume and temperature of its output, hot water, which is received as a material by the
        step that follows, brewing. Each record names the worker, the kettle, the kitchen and the person the tea is made for, and its
        timestamp gives the time of day and the month. In the terms of Figure 2, the slabs are rounds of tea, and the
        layers are workers or kettles.
      </p>

      <Figure caption="Figure 1 instantiated for tea. The node hot water, carrying its descriptors, necessitates the step fill and boil kettle, whose record names the worker, kettle and water involved and the metrics recorded, and whose output, hot water, passes to brewing. Further attributes linked to the record, such as the kitchen and the person served, are not shown.">
        <AttributedStepFigure
          node="hot water"
          step="fill and boil kettle"
          descriptors={['cups', 'target temperature']}
          resources={['worker', 'kettle', 'water']}
          metrics={['time taken', 'energy used', 'water drawn', 'volume delivered', 'temperature reached']}
          output="hot water"
        />
      </Figure>

      <p>
        Take an office kitchen with two workers and two kettles, one of 3 kW and one of 2 kW. Each worker makes four
        rounds, two with each kettle, and the rounds vary in the number of cups and the target temperature. Figures 4
        and 5 show the eight rounds and the time, energy and water drawn in them, by worker and by kettle. The same
        records can be read by any component of the trace, each net of the others and of what the descriptors
        demanded. The values are illustrative, and the figures show the form of the output, not that the estimator
        recovers true effects.
      </p>

      <Figure caption="Eight rounds of tea. Hot water is stacked by round, each slab's height its number of cups and its shade its target temperature. Beside it, the time, energy and water drawn in filling and boiling the kettle are each layered by worker. Each layer is the worker's share of that metric, labelled with how far it lay above or below what the descriptors of their rounds would predict.">
        <TeaByWorkerFigure />
      </Figure>

      <Figure caption="The same eight rounds, with each metric layered by kettle. The faster kettle saves time against its rounds, while water drawn, which depends on the worker, does not differ between kettles.">
        <TeaByKettleFigure />
      </Figure>
      <p>
        The worker&rsquo;s effect appears mostly in the water drawn. An overfill wastes water, energy and time, and an
        underfill shows as a shortfall in the volume delivered and calls for a second boil, recorded against the
        same round. The kettle&rsquo;s effect appears in the rate at which it heats a given
        volume. Because time is roughly the volume drawn multiplied by the kettle&rsquo;s time per litre, the effects multiply,
        and the decomposition applies to the logarithms of the metrics. A shared kitchen, where staff use whichever
        kettle is free, connects every worker with every kettle, so both effects can be separated. Where each person
        keeps their own kettle, the two cannot be told apart. Once the kettles&rsquo; effects are well
        estimated, a new member of staff is placed within a few rounds.
      </p>
      <p>
        Water that cools before brewing reaches that step below the target temperature, and the tea is weaker. The
        interval between the two records attributes the loss to the delay, not to the boil.
      </p>
      <p>
        The forecast for a given number of cups is a distribution of time, energy and water. A client wanting tea for
        ten can read which workers and kettles deliver ten cups closest to the volume required, and with the least
        spread. A worker who reliably draws close to that volume is credited with the water, energy and time they save,
        whether they are paid by the hour or by output.
      </p>
      <p>
        A worker who starts filling by the cup markings draws less water, and their rounds come in better than the
        forecast. Recorded as a change to the process, filling by the markings is identified in the rounds of every
        worker who adopts it, and its originator is credited with the water, energy and time it saves across those
        rounds, diminishing over deliveries, while the forecast tightens to the new level. A kettle maker whose
        model heats faster sees the same comparison in the kettle partition.
      </p>

      <h3>Example: harvesting a cereal crop</h3>
      <p>
        The same mechanism applies where production is larger and its capture already instrumented. A specification
        for a cereal crop contains several nodes, from sowing to storage. We follow one of them, the harvested crop,
        whose descriptors are the area of the field and the crop, here wheat or barley. Among the steps it
        necessitates is harvesting the field, defined by its output, grain in store from the whole area. The step
        records the time taken, the fuel used and the grain lost behind the combine. Each record names the operator,
        the combine, the contractor and the farm, and the moisture of the standing crop, which the combine measures as
        it works. The quantity and moisture of its output, grain in store, are recorded as metrics, and the grain is
        received as a material by the step that follows, drying. Its timestamp gives the time of day and the month. Combines already
        record area, yield, fuel and position as they work.
      </p>

      <Figure caption="Figure 1 instantiated for a cereal harvest. The node harvested crop, carrying its descriptors, necessitates the step harvest field, whose record names the operator, combine and standing crop involved and the metrics recorded, and whose output, grain in store, passes to drying. Further attributes linked to the record, such as the contractor and the farm, are not shown.">
        <AttributedStepFigure
          node="harvested crop"
          step="harvest field"
          descriptors={['area', 'crop']}
          resources={['operator', 'combine', 'standing crop']}
          metrics={['time taken', 'fuel used', 'grain lost', 'grain quantity', 'grain moisture']}
          output="grain in store"
        />
      </Figure>

      <p>
        Take a contractor whose three operators use two models of combine across 36 fields of between 10 and 60
        hectares, on many farms. Each operator works both models, on both crops, harvested dry, moderate and damp.
        The values are illustrative, within the ranges field studies report for work rates and grain losses. Figures
        7, 8 and 9 read the same records by operator, by combine and by the moisture of the standing crop, a property
        of the material.
      </p>

      <Figure caption="Thirty-six fields harvested. The harvested crop is stacked by field, each slab's height its area and its shade its crop, dark for wheat and light for barley, with five fields enlarged to its left. Beside it, the time, fuel and grain lost in harvesting are each layered by operator. Each layer is the operator's share of that metric, labelled with how far it lay above or below what the descriptors of their fields would predict.">
        <HarvestByOperatorFigure />
      </Figure>

      <Figure caption="The same fields, with each metric layered by combine. The faster model saves time against its fields, while grain lost, which depends on the operator and the crop, barely differs between combines.">
        <HarvestByCombineFigure />
      </Figure>

      <Figure caption="The same fields, with each metric layered by the moisture of the standing crop. A damp crop takes longer, uses more fuel and loses more grain, whichever operator and combine harvest it.">
        <HarvestByMoistureFigure />
      </Figure>

      <p>
        The operator&rsquo;s effect appears mostly in the grain lost, through ground speed and the setting of the
        header and threshing to the crop, and the combine&rsquo;s in its work rate. The two metrics also trade against
        each other. An operator who drives fast saves time and loses grain, so attribution on one metric alone would
        reward the wrong habit. Because a contractor works across many farms with several machines, operators, combines
        and farms are connected across organisations, not only within one, which is the condition that separates
        their effects. A damp crop slows the combine and raises fuel use and grain lost. It is estimated net of
        operator and combine, so no operator is penalised for the weather. When to harvest is itself a decision,
        recorded as a judgement attributed to whoever made it, so conditioning on moisture at the harvest step does
        not absorb that choice. Sunshine before harvest dries the crop, and
        so enters the trace through the material it leaves. Moisture also passes downstream. Grain harvested damp takes
        more fuel to dry, so a decision that saves time at harvest can raise cost at drying, where the grain&rsquo;s
        moisture enters as a material and its effect is visible to whoever chose when to harvest.
      </p>
      <p>
        A farm choosing a contractor reads the forecast for its fields on both metrics, with their spread, and can
        weigh time against grain lost. An operator who adjusts the threshing to each crop loses less grain than the
        forecast. Recorded as a change to the process, the adjustment is credited to them across the fields of every
        operator who adopts it, diminishing over deliveries. A manufacturer whose combine loses less at the same work rate sees the same comparison in
        the combine partition, across every contractor recording against the process.
      </p>
    </>
  );
}
