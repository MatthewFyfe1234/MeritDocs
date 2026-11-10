import { Cite, Figure, Rev } from '@/components/paper';

export function RelatedWork() {
  return (
    <>
      <h2>Related work</h2>
      <p>
        <Rev minor>We position SPD against prior work on each part of the model in turn: deriving process from a
        specification and extending it during execution, the activity-on-node graph and resource model it modifies,
        forecasting from a trace, project control, and coordination through that trace, where stigmergy and decentralised scheduling
        apply. Table 1 summarises the comparison.</Rev>
      </p>
      <p>
        <strong>Process derivation from specification.</strong> The idea that process structure should follow from
        product structure, rather than being authored independently, <Rev minor>was brought into workflow management by</Rev> <Cite id="vanderaalst1999" narrative /><Rev minor>,
        generating a workflow from a bill of materials,</Rev>{' '}
        and was developed into product-based workflow design (PBWD) by Reijers, Limam, and van der Aalst{' '}
        <Cite id="reijers2003" />, who derive a workflow from a product specification and design criteria using
        formal methods. PBWD&rsquo;s product data model <Rev minor>gives each production rule a single cost, time and
        probability, set by the designer rather than learned from execution,</Rev> and cannot represent repeated components. SPD addresses <Rev>the first, forecasting each step from the trace conditioned on its descriptors, and
        the second by letting a node be instanced more than once, its steps executed as often as the work requires</Rev>, building on the and/or
        feature tree of <Cite id="kang1990" narrative /> and its later cardinality-based
        extensions <Cite id="czarnecki2005" />. The split between master and project echoes software product line
        engineering, which separates domain engineering <Rev minor>(building the reusable space of features and assets)</Rev> from
        application engineering <Rev minor>(deriving a single product from it)</Rev> <Cite id="pohl2005" />. Product lines formalise
        that space and the derivation of a product from it, <Rev minor>but keep no record of how each product&rsquo;s
        work was carried out.</Rev>{' '}
        <Rev>
          Manufacturing has derived process from a selected variant for longer. The generic bill of
          materials <Cite id="hegge1991" /> records a product family&rsquo;s variants once, and its extension with
          operations <Cite id="jiao2000" /> derives each variant&rsquo;s routing from its configuration.
          ISA-95 <Cite id="iec62264" /> links a product definition to the process segments that make it, which
          corresponds to SPD&rsquo;s mapping, though for each product definition rather than for a selection from a
          family, and in construction, schedules are generated from the building
          information model <Cite id="kim2013" />. Configurable reference process models derive a process from
          configuration choices <Cite id="rosemann2007" />, hierarchical task network planning decomposes a goal into
          tasks through methods <Cite id="erol1994" />, and computer-interpretable clinical guidelines derive care
          from a patient&rsquo;s state <Cite id="peleg2013" />. Like product lines, these derive the process, but none
          forecasts or allocates from a record of how each derived step was carried
          out across projects, and only ISA-95 keeps such a record, within one plant&rsquo;s operations.
          Project management practice has a close precedent in the product-based planning of
          PRINCE2 <Cite id="ogc2009" />, which breaks the required products down, orders them by their dependencies
          and only then identifies the activities that deliver them <Cite id="apm2017" />. The work breakdown structure
          likewise decomposes the work toward its deliverables <Cite id="pmi2017" />. Both are authored for each plan
          rather than derived from a selection, and neither keeps an attributed record of each step across projects.
          Within project scheduling, the RCPSP with alternative subgraphs selects one of several alternative sets of
          activities for each work package and schedules those selected <Cite id="servranckx2019" />, though the
          alternatives are authored as a network rather than derived from a specification.
        </Rev>
      </p>

      <p>
        <strong>Rolling specification and continuous derivation.</strong> <Rev minor>PBWD also derives a workflow
        once, from a fixed specification.</Rev> <Rev>The same group&rsquo;s product-based workflow support
        drops the derived workflow, using the product data model to steer execution directly, recommending each
        case&rsquo;s next step from the data available and a chosen strategy <Cite id="vanderfeesten2011" />. It concerns
        informational products, with each operation&rsquo;s cost and time given as a distribution rather than learned
        from execution, and the case draws on the data model without extending it.</Rev> Case handling <Cite id="vanderaalst2005" /> takes the
        opposite stance, deriving what can be done from case data as it arrives rather than from a pre-specified
        control flow, but PBWD&rsquo;s own authors <Rev>found current case handling systems not yet completely ready to
        support product-based design</Rev> <Cite id="vanderfeesten2007" />. <Rev>Worklets <Cite id="adams2006" /> select
        a sub-process at runtime from case data, close to SPD&rsquo;s extension by a step&rsquo;s findings, but draw
        on a repertoire of sub-processes rather than deriving them from a specification. Artifact-centric and object-aware
        approaches likewise drive process from data objects at runtime <Cite id={['hull2011', 'kunzle2011']} />, with each
        object&rsquo;s lifecycle authored with it rather than derived from a selection.</Rev> SPD does both at once: its
        derivation is continuous, so an extension to the specification during execution extends the derived process
        with it<Rev minor>, as Section 4 shows</Rev>.
      </p>

      <p>
        <strong>Network formalisms.</strong> SPD&rsquo;s process graph is best understood as a modified
        Activity-on-Node graph <Rev minor><Cite id="fondahl1961" /></Rev>, where edges are promoted to first-class objects representing
        the products passed between the activities. That typing gives each step a contract, the inputs it <Rev minor>receives</Rev>
        {' '}and the outputs it must produce, which is what an agent takes on and is held to, where a precedence link
        expresses only ordering and so offers nothing to commit to. <Rev>Typed flows between activities are not new
        in themselves. The State-Task Network <Cite id="kondili1993" /> places material states between the tasks
        that make and consume them, and IDEF0 <Cite id="fips183" /> gives each function its inputs, controls,
        outputs and mechanisms. Petri nets, applied to workflow by van der Aalst <Cite id="vanderaalst1998" />, likewise
        place conditions between tasks, with typed tokens in their coloured form, and have been adapted to resource
        allocation in projects <Cite id="kumar1998" />. Design structure matrix models treat a development process
        as activities that exchange deliverables, each with a risk of rework when its inputs change, and simulate
        the iteration that follows to give distributions of cost and schedule <Cite id="browning2002" />. SPD&rsquo;s addition is to derive such a graph from a specification and to attribute
        its execution to the agents, tools and materials involved.</Rev>{' '}
        <Rev>
          A metric that runs along paths, such as time, accumulates through the graph, for point values, as an instance of the
          algebraic path problem <Cite id={['mohri2002', 'baras2010']} />, with its own pair of operators, one extending a value along
          a path and one merging values where paths converge, the critical path method&rsquo;s sum and maximum <Cite id="kelley1959" /> being
          one such pair.
        </Rev>
      </p>

      <p>
        The graph captures each agent&rsquo;s internal process, not only the hand-offs between agents. Within a job,
        a step&rsquo;s products often pass to the next step rather than crossing to another agent, and the typed
        edge records which, where a precedence link does not.
      </p>

      <p>
        <strong>Resources and agency.</strong> No existing academic resource formalism captures the three-way
        split SPD needs, self-directing agentic resources, tools granted for use, and materials embodied in the
        product: the Resource-Task Network <Cite id="pantelides1994" /><Rev minor>, generalising the State-Task
        Network <Cite id="kondili1993" />,</Rev> models materials, equipment, and labour within a single uniform abstraction, and multi-agent systems research{' '}
        <Cite id="omicini2008" /> separates autonomous agents from passive artifacts but not materials. <Rev>The
        closest matches are industry standards rather than academic formalisms. ISA-95, noted above, separates
        personnel, equipment and material resources. It also records personnel qualifications and test results, and
        the personnel, equipment and material actually used in each segment, though it does not forecast from those
        records. Its construction counterpart, Industry Foundation Classes <Cite id="iso16739" />, divides its
        resource subtypes among labour, equipment and materials, with one straddling tools and materials.</Rev> In all of them, <Rev>ISA-95 and</Rev> IFC
        included, labour is a resource the model allocates; SPD&rsquo;s extension is to treat it as an agent rather
        than an allocatable resource.
      </p>

      <p>
        <strong>Trace-based forecasting.</strong> Predictive process monitoring, surveyed by Márquez-Chamorro,
        Resinas, and Ruiz-Cortés <Cite id="marquezchamorro2018" />, forecasts properties of an ongoing process
        instance (remaining time, cost, or outcome) from historical event logs, and has been shown to benefit from
        resource- and workload-specific features<Rev minor> <Cite id="senderovich2017" /></Rev>. <Rev minor>Forecasting from resource-attributed history is thus well
        developed, but within a process assumed to exist rather than derived.</Rev> <Rev>Object-centric event logs relate each event to several objects at once, an
        order, an item and a resource, say <Cite id="vanderaalst2019" />, much as an SPD record relates an execution
        to its agents, tools and materials, and organisational mining builds profiles of resources from such
        logs <Cite id="song2008" />. Both likewise mine a log of a process already given.</Rev> <Rev existing>Within project management specifically,
        schedule risk analysis <Cite id={['vanhoucke2010', 'vanhoucke2015']} /> measures activity
        and resource sensitivity via Monte Carlo simulation over the network, typically using distributions fitted
        to subjective three-point estimates <Cite id="malcolm1959" /> rather than measured performance of specific
        agents, tools, or materials. Vanhoucke and colleagues have moved this line from expert-estimated inputs
        towards measured history: machine learning trained on past projects <Cite id="wauters2016" /> and
        nearest-neighbour matching against comparable ones <Cite id="wauters2017" /> both forecast from recorded
        outcomes. <Rev>Activity distributions have also been calibrated on real project data, allowing for human biases such as the Parkinson effect <Cite id="vanhoucke2019" />.</Rev> Matching against comparable projects is reference-class forecasting <Rev minor><Cite id={['kahneman1982', 'flyvbjerg2006']} /></Rev>,
        which predicts from the outcomes of past cases similar to the one at hand rather than from expert judgment;
        Batselier and Vanhoucke evaluate it for project management and integrate it with earned value
        management <Cite id={['batselier2016', 'batselier2017']} />.</Rev> These methods learn at the level of the project or activity, the
        level their data sits at; but such data is itself hard to come by, <Rev minor>scarce enough that assembling a
        database of real projects is a contribution in itself <Cite id="batselier2015" />, and the field often leans</Rev> on artificial
        data <Cite id="vanhoucke2023" />, and history at the granularity of individual agents, tools, and materials
        is scarcer still. <Rev>Times have long been set at the level of the operation in industrial engineering, where
        predetermined time standards and standard data build an operation&rsquo;s time from tabulated elements,
        scaled by attributes of the work such as distance or weight <Cite id="kanawaty1992" />, and construction
        estimating applies unit rates to measured quantities. Parametric models such as COCOMO likewise scale
        effort by attributes of the work, calibrated on past projects <Cite id="boehm2000" />. These scale by
        attributes as SPD does, but from tables set once or calibrated across whole projects, not from a trace
        attributed to the agents, tools and materials that carried out each step.</Rev> SPD <Rev minor>addresses</Rev> this gap by forming the reference class at any level the work is decomposed
        to, from the job down to the individual action, not only the whole project: the finer units recur
        across otherwise-unique projects, so their history accrues as a by-product of execution where sparse,
        rarely-repeated project history does not.
      </p>
      <Rev block>
        <p>
          <strong>Project control.</strong> Earned value management measures progress against a baseline schedule,
          by methods ranging from an estimated percentage complete to weighted milestones and units completed. Earned schedule <Cite id="lipke2003" /> ties these metrics more closely to forecasts of project duration <Cite id="vanhoucke2007" />, and statistical project control reads progress against tolerance limits set from a simulated project model <Cite id="colin2014" />. Vanhoucke compares tracking a project top-down, from its
          earned value metrics, with tracking it bottom-up, from the sensitivity of its activities under schedule
          risk analysis, the first performing better on serial networks and the second on parallel
          ones <Cite id="vanhoucke2011" />. Integrated project control combines the baseline with
          schedule risk analysis and earned value <Cite id="vanhoucke2014" />. In both, the baseline is authored apart
          from the work, and its expectations are not conditioned on the agents, tools and materials that carry it
          out. SPD reads expected performance from each contract and actual performance from the records of
          execution, at the step, as Section 6 sets out.
        </p>
      </Rev>

      <p>
        <strong>Coordination mechanism.</strong> Coordination theory <Cite id="malone1994" /> frames coordination as
        the management of dependencies between activities. The products passed between SPD&rsquo;s steps are its
        producer/consumer dependency, which SPD derives from the product specification and executes, where the theory
        classifies the dependencies of a process already given.
      </p>

      <Rev block>
        <p>
          <strong>Decentralised scheduling.</strong> Scheduling under finite resources is the resource-constrained
          project scheduling problem and its many variants <Cite id="hartmann2022" />. There workers, equipment and
          materials alike are resources, typically pooled as interchangeable units of capacity that activities consume, though multi-skilled variants give
          workers several skills as an input <Cite id="snauwaert2023" />. SPD
          instead separates the agents who perform a step from the tools and materials it draws on, and records each
          agent and tool individually. The problem&rsquo;s decentralised multi-project form comes closest to
          SPD&rsquo;s coordination. Each project is planned by its own decision maker, an agent in the
          multi-agent-systems sense rather than a worker, and the decision makers coordinate the projects&rsquo; use
          of shared resources, by negotiation <Cite id={['homberger2007', 'homberger2012']} /> or by combinatorial
          auction <Cite id="confessore2007" />. In both forms the activities and their durations are given, and in the alternative-subgraphs variant chosen among, rather
          than derived from a specification and forecast from a trace. Such a mechanism could take SPD&rsquo;s
          contracts and eligible agents as input, as Section 3 notes of scheduling generally. The contract as the
          unit of offer goes back to the Contract Net Protocol <Cite id="smith1980" />, in which a manager announces a
          task and awards it to one of the agents that bid for it. An SPD contract is a job within the derived subset
          of a complex product, its inputs and outputs typed by the products passed, and the record it leaves is
          attributed at the level of the step, to agents, tools and materials, rather than to which agent did which
          task. Flash teams assemble crowd workers into linked tasks that are managed
          computationally <Cite id="retelny2014" />, and flash organisations let workers propose changes to that
          structure as the work proceeds, through roles and a hierarchy <Cite id="valentine2017" />. The structure is
          authored and revised by those involved rather than derived from a specification.
        </p>
      </Rev>

      <p>
        Stigmergy, coordination through traces left in a shared medium
        rather than direct instruction, was first described by <Cite id="grasse1959" narrative /> and given formal
        treatment by Heylighen <Cite id={['heylighen2016a', 'heylighen2016b']} />, who defines it through five
        components: action, agent, medium, trace, and coordination. SPD provides the first four: <Rev minor>his action is here the execution of a step</Rev>; agents are the executors; the medium is the <Rev>master process</Rev>; and the trace is <Rev minor>the
        accumulated records</Rev> that execution leaves <Rev>on it, each attached to the step executed</Rev>. <Rev>SPD&rsquo;s contribution is these four, which enable stigmergic coordination
        by default, agents self-selecting unless a policy selects on their behalf</Rev>:
        agents are filtered to an eligible set by matching recorded experience against each job&rsquo;s
        requirements, and the forecast attached to the step, drawn from its trace, is
        the stimulus <Rev>the selection acts on, rather than a planner&rsquo;s judgment</Rev>. <Rev>Forecasts and
        eligibility are fixed readings of the trace, and the default allocation is a minimal rule, the first
        eligible claim, rather than a controller choosing who acts, as the control component of a blackboard system
        chooses which knowledge source acts next <Cite id="nii1986" />. The product a step delivers accompanies its
        record, enabling the steps that require it. Execution also informs what follows through a parallel mechanism. A step&rsquo;s finding selects further nodes in the project&rsquo;s specification, and derivation
        brings in the steps they necessitate. The trace informs later executions of a step wherever they arise, and
        the specification informs the next steps of the same project.</Rev> <Rev minor>Heylighen&rsquo;s own human
        illustration, open-source contributors choosing their tasks from shared listings of work <Cite id="bolici2016" />,
        shows the principle in its simplest form. SPD extends it to a derived graph of dependent steps, each bound
        by a contract, rather than independent tasks.</Rev>
      </p>

      <p>
        The same coordination mechanism is attested in construction, a domain of structured projects with interdependent
        skillsets rather than isolated tasks. <Cite id="christensen2013" narrative /> observes builders
        coordinating site work by acting on the physical evidence of work already accomplished by
        others, <Rev>alongside direct communication</Rev>. That is the mechanism in its reactive form, the stimulus
        being the realised state of completed work<Rev>, which tells a builder when to act only at short range. By
        making the records left on a persistent process the trace, with the product as its accompaniment, SPD lets the same
        principle operate</Rev> anticipatorily. <Rev>A step is known once its node is selected, and accumulating the
        forecasts of the steps upstream gives when it will be ready, a figure that sharpens as they complete.</Rev>{' '}
        <Rev minor>An</Rev> agent selects on a prediction of the step&rsquo;s delivery rather than on the residue of what is already done. <Rev>Manufacturing control
        offers a precedent for acting ahead of the work on traces left in the process, where delegate multi-agent
        systems propagate the intentions of task agents through the environment, from which short-term forecasts of
        resource use are built <Cite id={['valckenaers2007', 'holvoet2007']} />. There the trace is of current intentions, where SPD&rsquo;s forecast
        is read from the recorded history of executions across projects. In construction practice, the Last Planner
        System <Cite id="ballard2000" /> has the people doing the work commit to tasks that are ready, and tracks the
        share of commitments kept. It is the nearest practical precedent for both self-selection and project
        control, with commitments made on the committer&rsquo;s own judgment of what they can deliver rather than on
        recorded performance.</Rev>
      </p>

      <p>
        <Rev minor>Where self-assignment has been measured, in agile software teams, it rests on informal and
        individually varying preferences, with an agent&rsquo;s expertise entering only as self-assessed <Cite id="masood2021" />.
        Reflection on one&rsquo;s own completed tasks improves neither estimation accuracy nor the realism of
        uncertainty assessments, though feedback on others&rsquo; estimates improves the latter <Cite id="jorgensen2009" />.
        SPD replaces self-assessed capability with the trace&rsquo;s record of demonstrated performance, and
        subjective estimates with forecasts measured from it.</Rev>
      </p>

      <p>
        <strong>Experience-based ranking within eligibility.</strong> Eligibility admits the agents holding a
        job&rsquo;s skillset with enough experience at each of its steps. <Rev>Its premise, that experience at a
        task predicts performance at it, is that of the power law of practice <Cite id="newell1981" />, though an
        individual&rsquo;s curve may be exponential rather than a power <Cite id="heathcote2000" />. Experience with
        the particular attributes of the job&rsquo;s steps can then set the order of claim, whether the agent
        self-selects or the system selects it. Automated bug triage likewise recommends developers by their record
        of resolving similar reports rather than by declared expertise <Cite id="anvik2006" />, and process mining
        recommends resources from event logs on expertise, past performance and
        workload <Cite id={['arias2016', 'arias2018']} />. Amazon Mechanical Turk lets a task require a minimum
        count of approved tasks and approval rate, a record of the platform as a whole rather than a step, from
        which no forecast is read <Cite id="peer2014" />. These recommend among resources for the activities of a
        given process, where SPD sets a floor at each step of a derived one. Algorithmic management goes further,
        allocating and evaluating work from data recorded at scale, but for independent, standardised tasks, against
        criteria and ratings held by the platform <Cite id={['kellogg2020', 'rosenblat2016']} />. SPD derives
        interdependent jobs for each project, states each contract&rsquo;s expectations at a stated risk before work
        begins, sets eligibility from performance at each step rather than across the platform, and leaves the rule
        that allocates among eligible agents explicit and replaceable.
        In workflow terms, eligibility, ranking and claiming instantiate catalogued patterns (capability-based and
        history-based distribution, offer to multiple resources, and resource-initiated
        allocation) <Cite id="russell2005" />, which SPD defines through exposure, per-step experience floors and
        forecasts read from the trace.</Rev>
      </p>

      <Rev block>
        <p>
          Table 1 sets these lines of work against features of planning and control, of process structure, and of the trace
          and allocation. Prior approaches each cluster in one group or straddle two.
        </p>
        <Figure table caption="Prior approaches against features of planning and control, process structure, and trace and allocation. ✓ has the feature, ◐ a partial form of it, blank absent. Typed products are distinct products passed between steps. A feature counts only in the form its column names, so eligibility stated by a manager or judged by the worker does not count as eligibility from the trace. SPD's ◐ for loops reflects steps executed as many times as the work requires, and leaves out rework. Marks record what each approach provides by design, not what has been shown to work, and SPD's own remain to be tested, as Section 5 sets out.">
          <table className="paper-table-rotated">
            <thead>
              <tr>
                <th rowSpan={2}>Approach</th>
                <th colSpan={6}>Planning and control</th>
                <th colSpan={4}>Process structure</th>
                <th colSpan={4}>Trace and allocation</th>
              </tr>
              <tr>
                <th><span>Project as<br />the unit</span></th>
                <th><span>Duration<br />from paths</span></th>
                <th><span>Forecast at<br />a risk level</span></th>
                <th><span>Dependence<br />between risks</span></th>
                <th><span>Finite-resource<br />schedule</span></th>
                <th><span>Project<br />control</span></th>
                <th><span>Derived from<br />specification</span></th>
                <th><span>Extended in<br />execution</span></th>
                <th><span>Typed<br />products</span></th>
                <th><span>Loops and<br />rework</span></th>
                <th><span>Attributed<br />trace</span></th>
                <th><span>Forecast<br />from trace</span></th>
                <th><span>Eligibility<br />from trace</span></th>
                <th><span>Claimed by<br />agents</span></th>
              </tr>
            </thead>
            <tbody>
              <tr><td>CPM, incl. Activity-on-Node</td><td>✓</td><td>✓</td><td></td><td></td><td></td><td>◐</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
              <tr><td>PERT</td><td>✓</td><td>✓</td><td>✓</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
              <tr><td>GERT</td><td>✓</td><td>✓</td><td>✓</td><td></td><td></td><td></td><td></td><td></td><td></td><td>✓</td><td></td><td></td><td></td><td></td></tr>
              <tr><td>Design structure matrix simulation</td><td>✓</td><td>✓</td><td>✓</td><td>◐</td><td></td><td></td><td></td><td></td><td>◐</td><td>✓</td><td></td><td></td><td></td><td></td></tr>
              <tr><td>RCPSP, incl. decentralised</td><td>✓</td><td>✓</td><td>◐</td><td></td><td>✓</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
              <tr><td>Schedule risk analysis</td><td>✓</td><td>✓</td><td>✓</td><td>◐</td><td></td><td>◐</td><td></td><td></td><td></td><td></td><td></td><td>◐</td><td></td><td></td></tr>
              <tr><td>Reference-class forecasting</td><td>✓</td><td></td><td>✓</td><td>◐</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>◐</td><td></td><td></td></tr>
              <tr><td>Parametric estimating (COCOMO, unit rates)</td><td>✓</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>◐</td><td></td><td></td></tr>
              <tr><td>Earned value management, incl. earned schedule</td><td>✓</td><td>◐</td><td></td><td></td><td></td><td>✓</td><td></td><td></td><td></td><td></td><td></td><td>◐</td><td></td><td></td></tr>
              <tr><td>Statistical project control</td><td>✓</td><td>✓</td><td>✓</td><td></td><td></td><td>✓</td><td></td><td></td><td></td><td></td><td></td><td>◐</td><td></td><td></td></tr>
              <tr><td>Product-based planning (PRINCE2)</td><td>✓</td><td>◐</td><td></td><td></td><td>◐</td><td>◐</td><td>◐</td><td>◐</td><td>✓</td><td></td><td></td><td></td><td></td><td></td></tr>
              <tr><td>Work breakdown structure</td><td>✓</td><td></td><td></td><td></td><td></td><td>◐</td><td>◐</td><td>◐</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
              <tr><td>BIM schedule generation</td><td>✓</td><td>✓</td><td></td><td></td><td></td><td></td><td>✓</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
              <tr><td>Last Planner</td><td>✓</td><td></td><td></td><td></td><td>◐</td><td>✓</td><td></td><td>◐</td><td></td><td></td><td>◐</td><td></td><td></td><td>✓</td></tr>
              <tr><td>PBWD, incl. workflow support</td><td></td><td>◐</td><td></td><td></td><td></td><td></td><td>✓</td><td>◐</td><td>✓</td><td></td><td></td><td></td><td></td><td></td></tr>
              <tr><td>Software product lines</td><td></td><td></td><td></td><td></td><td></td><td></td><td>◐</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
              <tr><td>Configurable reference models</td><td></td><td></td><td></td><td></td><td></td><td></td><td>◐</td><td></td><td></td><td>✓</td><td></td><td></td><td></td><td></td></tr>
              <tr><td>HTN planning</td><td></td><td></td><td></td><td></td><td></td><td></td><td>◐</td><td></td><td></td><td>◐</td><td></td><td></td><td></td><td></td></tr>
              <tr><td>Computer-interpretable guidelines</td><td></td><td></td><td></td><td></td><td></td><td></td><td>◐</td><td>✓</td><td></td><td>✓</td><td></td><td></td><td></td><td></td></tr>
              <tr><td>Generic BOM and BOMO</td><td></td><td></td><td></td><td></td><td></td><td></td><td>✓</td><td></td><td>✓</td><td></td><td></td><td></td><td></td><td></td></tr>
              <tr><td>ISA-95</td><td></td><td></td><td></td><td></td><td></td><td>◐</td><td>◐</td><td></td><td>✓</td><td></td><td>✓</td><td></td><td>◐</td><td></td></tr>
              <tr><td>State-Task Network</td><td></td><td>◐</td><td></td><td></td><td>✓</td><td></td><td></td><td></td><td>✓</td><td></td><td></td><td></td><td></td><td></td></tr>
              <tr><td>IDEF0</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>✓</td><td>◐</td><td></td><td></td><td></td><td></td></tr>
              <tr><td>Petri nets, incl. workflow nets</td><td>◐</td><td>◐</td><td>◐</td><td></td><td>◐</td><td>◐</td><td></td><td></td><td>◐</td><td>✓</td><td></td><td></td><td></td><td></td></tr>
              <tr><td>Case handling</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>✓</td><td>◐</td><td>✓</td><td>◐</td><td></td><td></td><td>◐</td></tr>
              <tr><td>Worklets</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>✓</td><td></td><td>✓</td><td>◐</td><td></td><td></td><td>◐</td></tr>
              <tr><td>Artifact-centric processes</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>✓</td><td>◐</td><td>✓</td><td></td><td></td><td></td><td></td></tr>
              <tr><td>Object-aware processes</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>✓</td><td>◐</td><td>✓</td><td></td><td></td><td></td><td></td></tr>
              <tr><td>Process mining, incl. prediction</td><td></td><td>◐</td><td>◐</td><td>◐</td><td></td><td>◐</td><td></td><td></td><td>◐</td><td>✓</td><td>✓</td><td>✓</td><td>◐</td><td></td></tr>
              <tr><td>Flash organisations, incl. flash teams</td><td>✓</td><td>◐</td><td></td><td></td><td></td><td></td><td></td><td>✓</td><td>◐</td><td></td><td></td><td></td><td></td><td>◐</td></tr>
              <tr><td>Contract Net</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>◐</td><td></td><td></td><td></td><td></td><td></td><td>◐</td></tr>
              <tr><td>Crowdsourcing platforms</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>◐</td><td></td><td>◐</td><td>✓</td></tr>
              <tr><td>Algorithmic management platforms</td><td></td><td></td><td></td><td></td><td>◐</td><td>◐</td><td></td><td></td><td></td><td></td><td>✓</td><td>✓</td><td>◐</td><td>◐</td></tr>
              <tr><td>Workflow resource patterns</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>◐</td><td>✓</td></tr>
              <tr><td>Delegate MAS</td><td></td><td></td><td></td><td></td><td>◐</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>◐</td></tr>
              <tr><td><strong>SPD</strong></td><td>✓</td><td>✓</td><td>✓</td><td></td><td></td><td>◐</td><td>✓</td><td>✓</td><td>✓</td><td>◐</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td></tr>
            </tbody>
          </table>
        </Figure>
        <p>
          What no prior approach combines is the join between derivation and the trace: forecasts conditioned on
          the descriptors of a derived step, eligibility floors set at each step of a derived process, and contracts
          whose inputs and outputs come from derivation and whose forecasts come from the trace.
        </p>
      </Rev>
    </>
  );
}
