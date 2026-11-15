import { Cite, Figure, Rev } from '@/components/paper';

export function RelatedWork() {
  return (
    <>
      <h2>Related work</h2>
      <p>
        <Rev minor><strong>Variation in a specification</strong> has been structured as and/or feature
        trees</Rev> <Cite id="kang1990" /><Rev minor>, extended with cardinalities for repeated components</Rev>{' '}
        <Cite id="czarnecki2005" />, <Rev>which SPD&rsquo;s master specification follows</Rev>. <Rev minor>Software
        product line engineering separates such a space from the derivation of each product</Rev>{' '}
        <Cite id="pohl2005" />.
      </p>
      <p>
        <strong>Deriving process structure from product structure</strong> <Rev minor>was brought into workflow management by</Rev> <Cite id="vanderaalst1999" narrative /><Rev minor>,
        and developed into product-based workflow design
        (PBWD)</Rev> <Cite id="reijers2003" />. <Rev minor>PBWD gives each production rule a single cost, time and
        probability, set by the designer,</Rev> and cannot represent repeated components. SPD <Rev>learns each step&rsquo;s values from the trace, and allows repeated components.</Rev>{' '}
        <Rev>
          Manufacturing has done this for longer. The generic bill of materials <Cite id="hegge1991" /> records a
          product family&rsquo;s variants once, its extension with operations <Cite id="jiao2000" /> derives each
          variant&rsquo;s routing from its configuration, and ISA-95 <Cite id="iec62264" /> links each product
          definition to the process segments that make it, as SPD&rsquo;s mapping does, though not for a selection
          from a family. Elsewhere, schedules are generated from the building information model <Cite id="kim2013" />,
          configurable reference process models derive a process from configuration choices <Cite id="rosemann2007" />,
          hierarchical task network planning decomposes a goal into tasks <Cite id="erol1994" />, and
          computer-interpretable clinical guidelines derive care from a patient&rsquo;s state <Cite id="peleg2013" />.
          In project management, PRINCE2&rsquo;s product-based planning breaks down and orders the required products
          before identifying the activities that deliver them <Cite id={['ogc2009', 'apm2017']} />, the work breakdown
          structure decomposes work toward its deliverables <Cite id="pmi2019wbs" />, and the RCPSP with alternative
          subgraphs selects among sets of activities <Cite id="servranckx2019" />, all authored for each plan rather
          than derived from a selection.
        </Rev>
      </p>

      <p>
        <Rev minor><strong>Extending a specification during execution</strong> was beyond PBWD.</Rev> <Rev>The same
        group&rsquo;s product-based workflow support came closer, steering each case at runtime from the product data
        model <Cite id="vanderfeesten2011" />, but draws on the model without extending it, and gives each
        operation&rsquo;s cost and time as a distribution rather than learning them.</Rev> Case handling <Cite id="vanderaalst2005" /> <Rev minor>decides</Rev> what can be done from case data as it
        arrives rather than from a pre-specified control flow, <Rev minor>though PBWD&rsquo;s authors found it only
        partly ready</Rev> <Cite id="vanderfeesten2007" />. <Rev>Worklets <Cite id="adams2006" /> select
        a sub-process at runtime from case data, close to SPD&rsquo;s extension by a step&rsquo;s findings, but draw
        on a repertoire of sub-processes rather than deriving them from a specification. Artifact-centric and object-aware
        approaches likewise drive process from data objects at runtime <Cite id={['hull2011', 'kunzle2011']} />, with each
        object&rsquo;s lifecycle authored with it rather than derived from a selection.</Rev> <Rev minor>Flash
        organisations let crowd workers revise their structure of roles and tasks as the work
        proceeds</Rev> <Rev minor><Cite id="valentine2017" /></Rev><Rev minor>, though the structure is authored
        rather than derived.</Rev> <Rev minor>In SPD, the derived process extends with the specification at
        runtime.</Rev>
      </p>

      <p>
        <strong>Network formalisms.</strong> SPD&rsquo;s process graph is best understood as a modified
        Activity-on-Node graph <Rev minor><Cite id="fondahl1961" /></Rev>, where edges are promoted to first-class objects representing
        the products passed between the activities<Rev minor>, the producer/consumer dependencies of coordination
        theory</Rev> <Cite id="malone1994" />. That typing <Rev minor>enables us to give each job</Rev> a contract, the inputs it <Rev minor>receives</Rev>
        {' '}and the outputs it must produce. <Rev minor>A typed product can also carry</Rev> properties, such as <Rev minor>a crop&rsquo;s time to mature</Rev>, <Rev>so unlike a lag set on a precedence link they vary
        with what is delivered</Rev>. <Rev>Typed flows between activities are not new. The State-Task Network <Cite id="kondili1993" /> places material states between the tasks
        that make and consume them, and IDEF0 <Cite id="fips183" /> gives each function its inputs, controls,
        outputs and mechanisms. Petri nets, applied to workflow by van der Aalst <Cite id="vanderaalst1998" />, likewise
        place conditions between tasks, with typed tokens in their coloured form. Design structure matrix models treat a development process
        as activities exchanging deliverables, and simulate the rework that changed inputs cause, giving
        distributions of cost and schedule <Cite id="browning2002" />.</Rev>{' '}
        <Rev>
          For point values, a metric accumulated along paths, such as time, is an instance of the algebraic path
          problem <Cite id={['carre1971', 'mohri2002']} />, with one operator extending a value along a path and one merging values
          where paths converge, as the critical path method&rsquo;s sum and maximum do <Cite id="kelley1959" />.
        </Rev>
      </p>

      <p>
        <Rev minor><strong>Forecasting from history</strong> has been developed in process mining, where predictive
        process monitoring</Rev> <Cite id="marquezchamorro2018" /> forecasts properties of an ongoing process
        instance (remaining time, cost<Rev minor> or</Rev> outcome) from historical event logs, and has been shown to benefit from
        resource- and workload-specific features<Rev minor> <Cite id="senderovich2017" /></Rev>. <Rev>Object-centric event logs relate each event to several objects at once, such as an
        order, an item and a resource <Cite id={['vanderaalst2019', 'ghahfarokhi2021']} />, much as an SPD record relates an execution
        to its agents, tools and materials.</Rev> <Rev existing>Within project management,
        schedule risk analysis <Cite id="vanhoucke2015" /> typically simulates the network from activity
        distributions fitted to subjective three-point estimates <Cite id="malcolm1959" /> rather than measured performance of specific
        agents, tools or materials. Vanhoucke and colleagues have moved this line from expert-estimated inputs
        towards measured history: machine learning trained on past projects <Cite id="wauters2016" /> and
        nearest-neighbour matching against comparable ones <Cite id="wauters2017" /> both forecast from recorded
        outcomes. <Rev>Activity distributions have also been calibrated on real project data, allowing for human biases such as the Parkinson effect <Cite id="vanhoucke2019" />.</Rev> Matching against comparable projects is reference-class forecasting <Rev minor><Cite id={['kahneman1982', 'flyvbjerg2006']} /></Rev>,
        which predicts from the outcomes of past cases similar to the one at hand rather than from expert judgment;
        Batselier and Vanhoucke evaluate it for project management and integrate it with earned value
        management <Cite id={['batselier2016', 'batselier2017']} />.</Rev> <Rev minor>Project data are</Rev> hard to come by, <Rev minor>scarce enough that assembling a
        database of real projects is a contribution in itself <Cite id="batselier2015" />, and the field often leans</Rev> on artificial
        data <Cite id="vanhoucke2023" />. History <Rev minor>attributed to</Rev> individual agents, tools and materials
        is scarcer still. <Rev>Times have long been set at the level of the operation in industrial engineering, where
        predetermined time standards and standard data build an operation&rsquo;s time from tabulated elements,
        scaled by attributes of the work such as distance or weight <Cite id="kanawaty1992" />. Parametric models such as COCOMO likewise scale
        effort by attributes of the work, calibrated on past projects <Cite id="boehm2000" />. These scale by
        attributes as SPD does, but from tables set once or calibrated across whole projects, not from a trace
        attributed to agents, tools and materials. Manufacturing execution and ERP systems built to ISA-95 <Cite id="iec62264" /> do
        record actual times and resources against each operation and worker, along with personnel qualifications,
        but for costing and control.</Rev> <Rev>SPD forms the reference class at the operation, which recurs across otherwise-unique projects, with
        each record attributed to the agents, tools and materials involved.</Rev>
      </p>
      <Rev block>
        <p>
          <strong>Project control</strong> through earned value management measures progress against a baseline schedule,
          by methods ranging from an estimated percentage complete to weighted milestones and units completed. Earned schedule <Cite id="lipke2003" /> ties these metrics more closely to forecasts of project duration <Cite id="vanhoucke2007" />, and statistical project control reads progress against tolerance limits set from a simulated project model <Cite id="colin2014" />. Vanhoucke compares tracking a project top-down, from its
          earned value metrics, with tracking it bottom-up, from the sensitivity of its activities under schedule
          risk analysis, the first performing better on serial networks and the second on parallel
          ones <Cite id="vanhoucke2011" />. Integrated project control combines the baseline with
          schedule risk analysis and earned value <Cite id="vanhoucke2014" />. In each, the baseline is authored apart
          from the work, and its expectations are not conditioned on the agents, tools and materials involved. SPD reads progress live from the trace, against what each contract anticipates.
        </p>
      </Rev>

      <Rev block>
        <p>
          <strong>Resources in project models</strong> are typically pooled as interchangeable units of capacity, as
          in the resource-constrained project scheduling problem and its variants <Cite id={['hartmann2022', 'artigues2026']} />,
          though multi-skilled variants give workers several skills <Cite id="snauwaert2023" />. ISA-95 <Cite id="iec62264" /> separates personnel,
          equipment and material, but treats personnel as a resource to allocate rather than as agents. SPD instead
          separates self-directing agents from tools granted for use and materials embodied in the product, and
          records each individually. Where decision
          makers coordinate shared resources across projects, by
          negotiation <Cite id={['homberger2007', 'homberger2012']} /> or combinatorial
          auction <Cite id="confessore2007" />, they are agents in the multi-agent-systems sense, planning projects,
          rather than the workers. The contract as the unit of offer goes back to the Contract Net
          Protocol <Cite id="smith1980" />, in which a manager announces a task and awards it to one of the agents
          bidding for it.
        </p>
      </Rev>

      <p>
        <Rev minor><strong>Stigmergy</strong></Rev>, coordination through traces left in a shared medium
        rather than direct instruction, was first described by <Cite id="grasse1959" narrative /> <Rev minor>and formalised
        by</Rev> Heylighen <Rev minor><Cite id="heylighen2016a" /></Rev> <Rev>through five concepts (action, agent,
        medium, trace and coordination). SPD provides the first four:</Rev> <Rev minor>the action is the execution of a step, the agents its executors,
        the medium the</Rev> <Rev>master process</Rev> <Rev minor>and the trace the execution records held on it</Rev>. <Rev>Coordination follows, with eligibility founded on the actions of agents recorded in
        the trace, each contract&rsquo;s forecasts drawn from it, and eligible agents left to self-select, so the
        offer they act on is a reading of the trace rather than an instruction.</Rev>
      </p>

      <p>
        <Rev>In digital work, Heylighen&rsquo;s illustration is Wikipedia, whose
        contributors choose what to improve from the pages themselves or from notes listing work still to
        do <Cite id="heylighen2016b" />. Software developers also coordinate partly through their shared code, as
        observed in open-source projects <Cite id="bolici2016" />.</Rev> <Rev minor>In physical work, the same mechanism</Rev> is attested in
        construction, <Rev minor>among</Rev> structured projects with interdependent skillsets rather than isolated tasks. <Cite id="christensen2013" narrative /> observes builders
        coordinating site work by acting on the physical evidence of work accomplished by
        others, <Rev>alongside direct communication</Rev>. <Rev minor>There the stimulus is</Rev> the realised state of completed work<Rev>, which tells a builder when to act only at short range. In SPD
        the stimulus is a forecast read from the trace, held on a process that persists across projects, so agents
        can plan ahead. Manufacturing control
        offers a precedent for acting ahead of the work on traces left in the environment, where delegate multi-agent
        systems propagate the intentions of task agents through it, from which short-term forecasts of
        resource use are built <Cite id={['valckenaers2007', 'holvoet2007']} />. There the trace is of current intentions, where SPD&rsquo;s forecast
        is read from the recorded history of executions across projects. In construction practice, the Last Planner
        System <Cite id="ballard2000" /> has the people doing the work commit to tasks that are ready, on their own
        judgment rather than recorded performance, and tracks the share of commitments kept, the nearest practical
        precedent for both self-selection and project control. In agile software teams, self-assignment likewise
        rests on informal and individually varying preferences, with a developer&rsquo;s expertise entering only as
        self-assessed <Cite id="masood2021" />.</Rev>
      </p>

      <p>
        <Rev minor><strong>Eligibility from the trace</strong></Rev> <Rev>rests on an agent&rsquo;s experience or on its
        recorded performance. Experience is taken to predict performance, as the power law of practice
        holds <Cite id="newell1981" />. Process mining recommends resources from event logs on expertise, past performance and
        workload <Cite id={['arias2016', 'arias2018']} />, and history-based distribution and resource-initiated
        allocation are catalogued workflow resource patterns <Cite id="russell2005" />. Amazon Mechanical Turk lets a task require a minimum
        count of approved tasks and approval rate, floors on experience and performance <Cite id="aws-mturk-qualifications" />. Algorithmic management goes further,
        allocating and evaluating work from data recorded at scale, but for independent, standardised tasks, against
        criteria and ratings held by the platform <Cite id={['kellogg2020', 'rosenblat2016']} />. In SPD,
        eligibility is set for each job of a derived process, from an agent&rsquo;s experience at the operations the
        job comprises, so it can carry over to projects whose process has never existed before.</Rev>
      </p>

      <Rev block>
        <p>
          Table 1 compares prior approaches, which each cluster in one group of features or straddle two.
        </p>
        <Figure table caption="Prior approaches against features of planning and control, process structure, and trace and coordination. ✓ has the feature, ◐ a partial form of it, blank absent. Typed products are distinct products passed between activities. SPD's ◐ for loops is taken up in Section 6. Marks record what each approach provides by design, not what has been shown to work.">
          <table className="paper-table-rotated">
            <thead>
              <tr>
                <th rowSpan={2}>Approach</th>
                <th colSpan={6}>Planning and control</th>
                <th colSpan={4}>Process structure</th>
                <th colSpan={4}>Trace and coordination</th>
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
                <th><span>Self-selected<br />by agents</span></th>
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
              <tr><td>Parametric estimating (COCOMO)</td><td>✓</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>◐</td><td></td><td></td></tr>
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
              <tr><td>Flash organisations</td><td>✓</td><td>◐</td><td></td><td></td><td></td><td></td><td></td><td>✓</td><td>◐</td><td></td><td></td><td></td><td></td><td>◐</td></tr>
              <tr><td>Contract Net</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>◐</td><td></td><td></td><td></td><td></td><td></td><td>◐</td></tr>
              <tr><td>Crowdsourcing platforms</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>◐</td><td></td><td>◐</td><td>✓</td></tr>
              <tr><td>Algorithmic management platforms</td><td></td><td></td><td></td><td></td><td>◐</td><td>◐</td><td></td><td></td><td></td><td></td><td>✓</td><td>✓</td><td>◐</td><td>◐</td></tr>
              <tr><td>Delegate MAS</td><td></td><td></td><td></td><td></td><td>◐</td><td></td><td></td><td></td><td></td><td></td><td></td><td>◐</td><td></td><td>◐</td></tr>
              <tr><td><strong>SPD</strong></td><td>✓</td><td>✓</td><td>✓</td><td></td><td></td><td>◐</td><td>✓</td><td>✓</td><td>✓</td><td>◐</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td></tr>
            </tbody>
          </table>
        </Figure>
        <p>
          What no prior approach combines is the join between derivation and the trace: forecasts conditioned on
          the descriptors of the selection, eligibility from experience at the operations a project is derived from,
          and contracts whose inputs and outputs come from derivation and whose forecasts come from the trace.
        </p>
      </Rev>
    </>
  );
}
