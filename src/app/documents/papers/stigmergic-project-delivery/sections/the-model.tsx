import { Figure, M, Eq, Rev } from '@/components/paper';
import { MappingFigure, ScalingFigure, ForecastFigure, MasterInstanceFigure } from '../figures';

export function TheModel() {
  return (
    <>
      <h2>The model</h2>

      <p>
        The model formalises three things, the derivation of process from a specification, trace-based forecasting,
        and <Rev>trace-based eligibility among agents</Rev>. <Rev>Project control is not formalised separately, being
        a by-product of the three, read from the trace against each contract&rsquo;s forecasts (Section 6).</Rev> SPD concerns the execution of projects, which run on
        a given master specification, process, and mapping<Rev minor>, together the master</Rev>.
      </p>

      <h3>Definitions</h3>

      <p>
        <Rev>The definitions are of three kinds. The master and the resources are given; the selection, any extension
        to it, and the trace are recorded for each project; and derivation, exposure, eligibility, forecasts,
        accumulation and contracts are functions of these. Together they make up the project.</Rev>
      </p>

      <p>
        <strong>Product <Rev minor><M>{"(e)"}</M></Rev>.</strong> <Rev minor>What a unit of work delivers, whether a step, a job or the whole process. Many
        products serve only the next step within the same job, and others cross a job boundary to serve steps in other
        jobs.</Rev> <Rev>Products that leave the process fulfil the specification, each at once the output of its step, its job
        and the whole process. The formal model is concerned only with step products, each carried by an
        arc <M>{"e \\in A_{sp}"}</M> to each step that requires it in the master process.</Rev> <Rev>A product may have metrics, such as the time
        concrete takes to set before the step it reaches can begin.</Rev>
      </p>

      <p>
        <strong>Master specification <Rev minor><M>{"(T)"}</M></Rev>.</strong> A rooted tree that breaks <Rev minor>down all that can be delivered into its</Rev> possible
        elements<Rev> and features</Rev>. <Rev>Its root is the deliverable as a whole, such as a
        building, and the level below holds</Rev> the high-level components, those delivered by whole systems, such
        as <Rev minor>its foundation or structural walls</Rev>. The next level holds the systems that can deliver each
        component, a foundation, for instance, by a concrete slab or by blockwork. Lower levels break the systems
        down as far as needed. Write it <M>{"T = (N, A)"}</M>: <M>{"N"}</M> the <Rev>elements and features</Rev><Rev minor>, a
        single one written <M>{"x"}</M>,</Rev> and <M>{"A"}</M> the parent-child relations. <Rev minor>Descriptors are specified for each node.</Rev>
      </p>

      <Eq gloss="The master specification is a tree of elements and features joined by parent-child relations.">{"T = (N,\\ A)"}</Eq>

      <p>
        <strong>Descriptor <Rev minor><M>{"(D)"}</M></Rev>.</strong> An attribute attached to a node of the master specification,{' '}
        <Rev minor>either</Rev> numerical or categorical. <Rev minor>A node&rsquo;s descriptors are written</Rev> <M>{"D = (d_1, \\dots, d_k)"}</M>; on an instance
        each takes a value. <Rev>Where <M>{"D"}</M> appears in a forecast, it stands for those bound
        values.</Rev> <Rev>A descriptor&rsquo;s value may be derived from others, as a stud count from a width
        and a spacing.</Rev>
      </p>

      <p>
        <strong>Master process <Rev minor><M>{"(G)"}</M></Rev>.</strong> <Rev minor>An acyclic directed graph that breaks delivery down into all its
        possible steps. Each arc carries a product from one step to another, determining
        their precedence</Rev>. Write
        it <M>{"G = (N_s, A_{sp})"}</M>: <M>{"N_s"}</M> the steps<Rev minor>, a single one written <M>{"s"}</M>,
        and</Rev> <M>{"A_{sp}"}</M> the step products.
      </p>

      <Eq parts={[
        { tex: "G = (N_s,\\ A_{sp})", gloss: "The master process is a graph of steps and the products passed between them." },
      ]} />

      <p>
        <Rev>Each arc <M>{"e"}</M> runs from <M>{"\\mathrm{src}(e)"}</M> to <M>{"\\mathrm{tgt}(e)"}</M>,
        with <M>{"\\star"}</M> as the source or target of a product supplied from outside the process or leaving
        it. A product required by several steps has an arc to each. Steps and products may have metrics.</Rev>
      </p>

      <Rev block>
        <Eq showGloss gloss="Each arc has a source and a target, either possibly outside the process.">{"\\mathrm{src},\\ \\mathrm{tgt} : A_{sp} \\to N_s \\cup \\{\\star\\}"}</Eq>
      </Rev>

      <Rev block>
        <p>
          <strong>Metric <Rev minor><M>{"(m)"}</M></Rev>.</strong> A measured quantity shared across the master process, either numerical or
          categorical, such as time, the energy or material used, or a clinical outcome, written <M>{"m"}</M>,
          its value written <M>{"y"}</M>.
        </p>
      </Rev>

      <p>
        <strong><Rev minor>Job <M>{"(j)"}</M>.</Rev></strong> <Rev minor>The steps one trade or role performs, its skillset. Write</Rev>{' '}
        <M>{"N_j"}</M> <Rev minor>for the jobs, a single one written <M>{"j"}</M>.</Rev> Steps are assigned to jobs by a grouping <M>{"J : N_s \\to N_j"}</M>.
      </p>

      <Eq parts={[
        { tex: "J : N_s \\to N_j", gloss: "Every step belongs to exactly one job.", showGloss: true },
      ]} />

      <p>
        <strong>Mapping <Rev minor><M>{"(\\mu)"}</M></Rev>.</strong> A deterministic association of each node of the master specification with the
        steps in the master process it necessitates: a given <Rev minor>node</Rev> always necessitates the
        same steps. A step may be necessitated by more than one node, so the steps of different nodes may overlap.
        Write it as a map <M>{"\\mu : N \\to 2^{N_s}"}</M>,
        from <Rev minor>nodes</Rev> to the sets of steps they necessitate.
      </p>

      <Eq showGloss gloss="Each node of the specification necessitates a set of steps.">{"\\mu : N \\to 2^{N_s}"}</Eq>

      <p>
        <Rev minor><strong>Selection <M>{"(\\hat{T})"}</M>.</strong></Rev> <Rev>A forest <M>{"\\hat{T}"}</M> of node instances, each
        instance <M>{"\\hat{x}"}</M> labelled with a node <M>{"x"}</M> of <M>{"T"}</M> and its parent an instance
        of <M>{"x"}</M>&rsquo;s parent, and each tree rooted at an instance of <M>{"T"}</M>&rsquo;s root, so a
        project may deliver several. A node may be instanced any number of times, each instance with its own
        descriptor values bound.</Rev>
      </p>

      <p>
        <strong>Derivation <Rev minor><M>{"(G_{\\hat{T}})"}</M></Rev>.</strong> <Rev>Each distinct node instanced in <M>{"\\hat{T}"}</M> necessitates its
        steps through the mapping, and together these are the project&rsquo;s steps <M>{"N_{\\hat{T}}"}</M>.</Rev>
      </p>

      <Rev block>
        <Eq showGloss gloss="A project's steps are those its node instances necessitate, each appearing once.">{"N_{\\hat{T}} = \\bigcup\\nolimits_{\\hat{x} \\in \\hat{T}} \\mu(x)"}</Eq>
      </Rev>

      <p>
        <Rev>Write <M>{"u \\rightsquigarrow v"}</M> where a path of the master process joins <M>{"u"}</M> to <M>{"v"}</M>, a
        step or <M>{"\\star"}</M>, and any steps between them lie outside the project and in <M>{"v"}</M>&rsquo;s job. A
        product thus leaves a job only from the step that makes it. Write <M>{"e \\rightsquigarrow v"}</M> where such a
        path begins with product <M>{"e"}</M>. The project&rsquo;s process <M>{"G_{\\hat{T}}"}</M> orders its
        steps by these paths.</Rev>
      </p>

      <Rev block>
        <Eq showGloss gloss="A project's process orders its steps wherever such a path joins them.">{"G_{\\hat{T}} = \\bigl(N_{\\hat{T}},\\ \\bigl\\{\\, (u, v) \\in N_{\\hat{T}}^2 : u \\rightsquigarrow v \\,\\bigr\\}\\bigr)"}</Eq>
      </Rev>

      <p>
        <Rev minor><strong>Extension <M>{"(\\hat{T}')"}</M>.</strong></Rev> <Rev>Selection and derivation can continue during
        execution. The selection grows to some <M>{"\\hat{T}' \\supseteq \\hat{T}"}</M>, still a selection, and the
        steps it necessitates join the project&rsquo;s process, while a further instance of a node already selected
        adds its descriptor values at that node&rsquo;s steps. Extension only adds, so steps already executed, and
        the records they left, stay valid, unless a newly necessitated step feeds one of them or a new instance
        needs one, a limitation Section 6 takes up.</Rev>
      </p>

      <p>
        <strong>Agent <Rev minor><M>{"(a)"}</M></Rev>.</strong> A resource that performs steps, as against the tools and materials a step also
        draws on<Rev minor>, written <M>{"a"}</M></Rev>; it holds a set of skillsets <Rev minor><M>{"\\mathrm{Qual}(a)"}</M></Rev><Rev> <M>{"\\subseteq N_j"}</M></Rev>, its qualifications.
      </p>

      <p>
        <strong>Tool <Rev minor><M>{"(g)"}</M></Rev>.</strong> A resource a step draws on without embodying it in the product, such as equipment,
        software, a vehicle, or a consumable like sandpaper or a face mask, written <M>{"g"}</M>.
      </p>

      <p>
        <strong>Material <Rev minor><M>{"(w)"}</M></Rev>.</strong> A resource a step embodies in the product, written <M>{"w"}</M>.
      </p>

      <p>
        <strong>Trace <Rev minor><M>{"(\\tau)"}</M></Rev>.</strong> An accumulating set of execution records<Rev>, written <M>{"\\tau"}</M></Rev>. <Rev>Each ties a project <M>{"i"}</M>, a
        step <M>{"s"}</M> executed in it at time <M>{"t"}</M>, the agents <M>{"a"}</M> that executed it and the
        tools <M>{"g"}</M> and materials <M>{"w"}</M> they drew on, to one metric <M>{"m"}</M> and its
        value <M>{"y"}</M>.</Rev> Beyond the project, step, metric and value, any field may go
        unrecorded, written <M>{"\\bot"}</M>, as distinct from an empty set of tools or materials, which records that
        none were used. A partial trace is useful in proportion to what it records.
      </p>

      <Rev block>
        <Eq gloss="Each record holds one metric's value at a step in a project, and whichever of the time, agents, tools and materials were recorded.">{"\\tau = \\bigl\\{\\,(i,\\ s,\\ t,\\ a,\\ g,\\ w,\\ m,\\ y)\\,\\bigr\\}"}</Eq>
      </Rev>

      <p>
        <strong>Exposure <Rev minor><M>{"(n_c)"}</M></Rev>.</strong> <Rev>The extent of the trace&rsquo;s records that name a
        context <M>{"c"}</M>, over a set of steps, such as all those a tool is used in, or a single
        step <M>{"s"}</M>. A context is anything the trace records, such as an agent <M>{"a"}</M> (its experience), a
        tool <M>{"g"}</M> (its wear), a material <M>{"w"}</M> or the time of day, alone or in combination. It is measured in a metric&rsquo;s recorded values
        or in a descriptor&rsquo;s values on the node instances that necessitate the step, as appropriate. Exposure gained outside the trace, such as a hired tool&rsquo;s prior wear or an agent&rsquo;s
        previous role, may be credited by hand, as it must be at a step no agent has yet executed. At a step <M>{"s"}</M>, its extent in the trace is
        written <M>{"n_c^{\\tau}(s)"}</M>, what is credited <M>{"\\tilde{n}_c(s)"}</M>, and the two
        together <M>{"n_c(s)"}</M>, written <M>{"n_a(s)"}</M> for an agent&rsquo;s experience,
        and <M>{"n_{c,d}(s)"}</M> where it is measured in a descriptor <M>{"d"}</M>.</Rev>
      </p>

      <Rev block>
        <Eq gloss="Exposure to a step is its extent in the trace plus any credited by hand.">{"n_c(s) = n_c^{\\tau}(s) + \\tilde{n}_c(s)"}</Eq>
      </Rev>

      <p>
        <strong>Eligibility <Rev minor><M>{"(\\mathrm{Elig})"}</M></Rev>.</strong> An agent is eligible for a job it is qualified and has sufficient experience
        for. <Rev>A floor on experience, written <M>{"\\lambda_{x,d}"}</M>, can be set on a
        descriptor <M>{"d"}</M> of a node <M>{"x"}</M> and applies at each step <M>{"x"}</M> necessitates in a
        project that selects it. An agent&rsquo;s exposure in that descriptor, <M>{"n_{a,d}(s)"}</M>, must clear
        every floor applying at each of the job&rsquo;s steps in the project, a descriptor with no floor set
        having <M>{"\\lambda_{x,d} = 0"}</M>. A floor may instead be set on performance, the agent&rsquo;s forecast at the step taking the place
        of <M>{"n_{a,d}(s)"}</M> below, with the inequality reversed for a metric where more is worse, since forecasts can be conditioned on a named agent. The eligible agents are written <M>{"\\mathrm{Elig}(j, \\hat{T})"}</M>, or <M>{"\\mathrm{Elig}(j)"}</M> where the
        selection is clear</Rev>.
      </p>

      <Rev block>
        <Eq showGloss gloss="An agent is eligible for a job when qualified for it and its experience clears the floor at every step of the job in the project.">{"\\mathrm{Elig}(j, \\hat{T}) = \\{\\, a : j \\in \\mathrm{Qual}(a),\\ n_{a,d}(s) \\geq \\lambda_{x,d}\\ \\forall \\hat{x} \\in \\hat{T},\\ s \\in \\mu(x),\\ J(s) = j,\\ d \\in D \\,\\}"}</Eq>
      </Rev>

      <p>
        <strong>Forecast.</strong> A predicted value for <Rev>a metric of a step or of a step product</Rev>, based on <Rev>the descriptors and</Rev> the trace. <Rev>For each step, a
        metric&rsquo;s value <M>{"y_m(s)"}</M> is distributed according to its context <M>{"c"}</M>, as a
        distribution <M>{"\\mathcal{F}_m"}</M>. It scales with numerical descriptors and is separated by categorical
        ones, each selected by hand as influencing it, their effect written <M>{"\\theta(D)"}</M>.
        Here <M>{"D"}</M> stands for the descriptor values bound on the node instances that <Rev minor>necessitate</Rev> the step and on their ancestors,
        written <M>{"D(s, i)"}</M> where a project <M>{"i"}</M> must be named. A step <Rev minor>necessitated by</Rev>{' '}
        several instances is forecast once, from the descriptor values of all of them, combined as suits the
        metric, their number included, and once recorded in a
        project <M>{"i"}</M> its value <M>{"y_m(s, i)"}</M> combines its records there for the metric. A product&rsquo;s
        value <M>{"y_m(e)"}</M> is forecast by the function of descriptors that gives it, using its source
        step&rsquo;s values, <M>{"D(\\mathrm{src}(e), i)"}</M>, or its target&rsquo;s for a product from outside the
        process.</Rev>
      </p>

      <Eq showGloss gloss="A metric's value at a step follows a distribution shaped by the descriptors and conditioned on a context.">{"y_m(s) \\,\\sim\\, \\mathcal{F}_m\\bigl(\\theta(D),\\ s,\\ c\\bigr)"}</Eq>

      <p>
        <Rev>The forecast draws on <M>{"I_c(s, m)"}</M>, the past projects <M>{"i'"}</M> with records of the metric
        at the step matching <M>{"c"}</M>, each giving a
        point <M>{"(D(s, i'),\\ y_m(s, i'))"}</M>, its value combining only the records that match <M>{"c"}</M>.
        Together these points are <M>{"R"}</M>, and <M>{"\\mathrm{fit}(R)"}</M> is a fit over them. Where a metric
        depends on another set during execution, such as a fall in blood pressure on the dose given, the
        other&rsquo;s value at the step joins the descriptors in the fit, and the forecast is read at a chosen value
        of it.</Rev> The forecast<Rev>, written{' '}
        <M>{"\\mathrm{forecast}(s, m, r, c)"}</M>, with <M>{"i"}</M> the project being forecast,</Rev> reads off the fit at <Rev>a quantile level</Rev> <M>{"r"}</M>, its <M>{"r"}</M>-percentile <M>{"Q_r"}</M><Rev>, so
        that <M>{"1 - r"}</M> is the tolerated risk of overrun</Rev>. <Rev>Where the trace gives no fit, it takes a
        given forecast, as activity-on-node planning takes its durations, from a heuristic or an expert estimate that
        may itself scale with the descriptors.</Rev> A lower tolerance for overrun takes
        a higher percentile, a more conservative value. <Rev>A categorical metric is forecast as its distribution
        over its categories, read as the probability of each, and has no percentile.</Rev>
      </p>

      <Rev block>
        <Eq showGloss gloss={<>The forecast for a metric is the <M>{"r"}</M>-percentile of a fit over past projects&rsquo; descriptor values and recorded values, evaluated at the step&rsquo;s descriptor values.</>}>{"\\mathrm{forecast}(s, m, r, c) = Q_r\\bigl(\\, \\mathrm{fit}(R)(D(s, i)) \\,\\bigr), \\quad R = \\bigl\\{\\, \\bigl(D(s, i'),\\ y_m(s, i')\\bigr) : i' \\in I_c(s, m) \\,\\bigr\\}"}</Eq>
      </Rev>

      <Rev block>
        <p>
          <strong>Accumulation <Rev minor><M>{"(X_m)"}</M></Rev>.</strong> How a numerical metric&rsquo;s forecast distributions combine across the
          project&rsquo;s process, into one for a set of steps, such as a job or the whole project, or at a step
          along the paths that reach it. They combine in one of two ways, both taking each step&rsquo;s value as independent of the others, an assumption Section 6 returns
          to.
        </p>
        <p>
          The first is a total, written <M>{"X_m(S)"}</M>, the sum of the steps&rsquo; own values over a set of
          steps <M>{"S"}</M>, a job&rsquo;s or the project&rsquo;s.
        </p>
        <Eq gloss="A total over a set of steps sums each step's own value.">{"X_m(S) = \\sum\\nolimits_{s \\in S} y_m(s), \\quad S \\subseteq N_{\\hat{T}}"}</Eq>
        <p>
          The second accumulates at a step along the paths that reach it, with a pair of operators chosen for the
          purpose: <M>{"\\otimes_m"}</M> extends a value along a path, and <M>{"\\oplus_m"}</M> merges the values
          that converge at the step. Each has an identity for where there is nothing to extend by or merge. When
          finding the earliest each step can finish, time adds along a path and takes the maximum where paths
          converge, since a step can start only once its last input arrives, so that at the last step it gives the
          length of the critical path. One agent performs a job&rsquo;s steps one at
          a time, so where the process leaves two of them unordered, an order between them is assumed, drawn from
          one ordering of all the project&rsquo;s steps consistent with the process, so that no cycle forms. Write <M>{"G_{\\hat{T}}^{J}"}</M> for the project&rsquo;s process with these orders added. The value accumulated at
          step <M>{"v"}</M>, written <M>{"X_m(v)"}</M>, merges the values of the steps that supply it
          in <M>{"G_{\\hat{T}}^{J}"}</M>, written <M>{"\\mathrm{pred}(v)"}</M>, and extends the result by its own.
          Each supplier&rsquo;s value is first extended by <M>{"y_m(u, v)"}</M>, the merged value of the
          products <M>{"u"}</M> passes on along the paths to <M>{"v"}</M>. Where <M>{"u"}</M> passes on none, as
          between a job&rsquo;s steps in an assumed order, it is extended by the identity of <M>{"\\otimes_m"}</M>.
        </p>
        <Eq gloss="A metric's value accumulated at a step merges the values arriving from the steps that supply it, each extended by the products passed on, with an order assumed between each job's steps, and extends them by the step's own value.">{"X_m(v) = \\Bigl(\\, \\bigoplus\\nolimits_{m}\\ \\bigl\\{\\, X_m(u) \\otimes_m y_m(u, v) : u \\in \\mathrm{pred}(v) \\,\\bigr\\} \\Bigr) \\otimes_m y_m(v)"}</Eq>
        <p>
          A product from outside the process, real or standing only for the wait before work can begin, carries its
          value from the identity, and a product leaving it extends its source&rsquo;s value
          into <M>{"\\star"}</M>, where the project&rsquo;s value, <M>{"X_m(\\star)"}</M>, accumulates. Either may carry no value, the
          identity.
        </p>
      </Rev>

      <p>
        <strong>Contract <Rev minor><M>{"(C)"}</M></Rev>.</strong> The unit offered for self-selection, a job within the <Rev minor>project&rsquo;s process</Rev><Rev minor>, written <M>{"C(j)"}</M>. It comprises</Rev> the
        inputs <M>{"\\mathrm{in}(j)"}</M> it draws, the outputs <M>{"\\mathrm{out}(j)"}</M> it
        supplies, and the forecasts <M>{"\\varphi(j)"}</M>. <Rev minor>For each metric, the forecast is its value accumulated over the job&rsquo;s steps, read
        at <M>{"r"}</M></Rev>, not a sum of per-step
        percentiles. <Rev>It is taken over the records of the agents in <M>{"\\mathrm{Elig}(j)"}</M>, since the
        contract binds one of them, or over all records where theirs fall below a set minimum. For a metric accumulated along paths, it is taken over those steps alone, so that its time is
        the job&rsquo;s own duration, not including any wait for its inputs.</Rev>
      </p>

      <Eq gloss="A contract is a job's inputs, outputs and aggregated forecasts.">{"C(j) = \\bigl(\\,\\mathrm{in}(j),\\ \\mathrm{out}(j),\\ \\varphi(j)\\,\\bigr)"}</Eq>

      <p>
        <Rev>Writing <M>{"S_j"}</M> for the job&rsquo;s steps in the project, its inputs are the
        products passed on into <M>{"S_j"}</M> from outside it, along such a path.</Rev>
      </p>

      <Rev block>
        <Eq gloss="A job's inputs are the products another job in the project, or the outside of the process, passes on along such a path into its steps.">{"\\begin{aligned} \\mathrm{in}(j) &= \\{\\, e \\in A_{sp} : \\mathrm{src}(e) \\in (N_{\\hat{T}} \\cup \\{\\star\\}) \\setminus S_j,\\ \\exists\\, v \\in S_j : e \\rightsquigarrow v \\,\\}, \\\\ S_j &= \\{\\, s \\in N_{\\hat{T}} : J(s) = j \\,\\} \\end{aligned}"}</Eq>
      </Rev>

      <p>
        <Rev>Its outputs are those passed on out of <M>{"S_j"}</M> in the same way.</Rev>
      </p>

      <Rev block>
        <Eq gloss="Its outputs are the products its steps pass on along such a path to another job in the project or out of the process.">{"\\mathrm{out}(j) = \\{\\, e \\in A_{sp} : \\mathrm{src}(e) \\in S_j,\\ \\exists\\, v \\in (N_{\\hat{T}} \\cup \\{\\star\\}) \\setminus S_j : e \\rightsquigarrow v \\,\\}"}</Eq>
      </Rev>

      <p>
        A contract <M>{"C(j)"}</M> is offered to every agent in <M>{"\\mathrm{Elig}(j)"}</M> and becomes binding on
        whichever self-selects it<Rev>, or on whichever a policy selects on the agents&rsquo; behalf</Rev>. <Rev>Where an extension adds steps to a job already taken, or, by adding an
        instance, changes the descriptor values at its steps, the contract is re-issued to the same agent
        with <M>{"\\varphi(j)"}</M> recomputed and eligibility checked at those steps, or, where that agent is not eligible at them, offered again to <M>{"\\mathrm{Elig}(j)"}</M>. Where
        such a step has already executed, the instance comes too late for it, the case Section 6 takes up.</Rev>
      </p>

      <p>
        <Rev minor><strong>Project.</strong> The delivery of the state a selection specifies, from an initial state.
        It comprises each of its derived steps,</Rev> with that step&rsquo;s <Rev minor>offered</Rev> forecasts across its metrics,
        and the contract of the job <Rev minor>the step</Rev> belongs to, offered for self-selection to the agents
        eligible for that job.<Rev> It also has its own value for each metric, its total and its value accumulated
        at <M>{"\\star"}</M>, read from the distributions accumulated over all its steps, so not the sum of its
        contracts&rsquo; forecasts, a percentile of a sum not being a sum of percentiles. All are read at <M>{"r"}</M> and pool over who will do the work, the contract over
        the agents eligible for it and the rest with the empty context <M>{"\\varnothing"}</M>, so a client is not charged for drawing the slowest agent</Rev>:
      </p>

      <Rev block>
        <Eq gloss="A project is each derived step with its forecasts, its job's contract and the agents eligible for that job, with the project's own total and accumulated value.">{"\\begin{aligned} \\mathrm{Project}(\\hat{T}) = \\Bigl(\\, &\\bigl\\{\\, \\bigl(s,\\ \\mathrm{forecast}(s, \\cdot, r, \\varnothing),\\ C(J(s)),\\ \\mathrm{Elig}(J(s))\\bigr) : s \\in N_{\\hat{T}} \\,\\bigr\\}, \\\\ &Q_r\\bigl(X_{\\cdot}(N_{\\hat{T}})\\bigr),\\ Q_r\\bigl(X_{\\cdot}(\\star)\\bigr) \\,\\Bigr) \\end{aligned}"}</Eq>
      </Rev>

      <p>
        Throughout, <M>{"N"}</M>, <M>{"N_s"}</M>, <Rev minor>the selection</Rev> and the agents are taken finite, and the trace <M>{"\\tau"}</M> is
        finite at any point.
      </p>

      <h3>Illustration</h3>
      <p>
        <Rev minor>Figure 1 draws a master specification and master process in miniature, with a project&rsquo;s
        selection (S, A and B but not C) and the process <M>{"G_{\\hat{T}}"}</M> it necessitates drawn solid against the faded
        rest of the master.</Rev>
      </p>

      <Figure caption={<>A master specification (left) and master process (right), the process laid out in skillset lanes. Grey dashed lines are the mapping from specification nodes to the steps they necessitate. Brown arrows carry <Rev minor>products</Rev> between a skillset&rsquo;s steps, teal dashed arrows carry products between skillsets<Rev> and into and out of the process</Rev>, and a step follows the one whose output it receives. A project&rsquo;s selected nodes and the steps they <Rev minor>necessitate</Rev> are drawn solid, and the rest of the master faded<Rev>; squiggles within a faded step mark a product passing on through it</Rev>.</>}>
        <MasterInstanceFigure />
      </Figure>

      <p>
        Take a single component of that <Rev minor>selection</Rev>, A, which necessitates p2, q2, p4 and r2, and two of those steps, p2 and q2 (Figure 2). A descriptor
        on A, <Rev minor>d</Rev>, scales the distribution of a metric y recorded at each of those steps (Figure 3). On a new project{' '}
        <Rev minor>d</Rev> is known from the <Rev minor>selection</Rev> but y is not, so <Rev minor>y is forecast from a fit to past projects&rsquo; (d, y) at
        the step, read at the tolerated risk</Rev> (Figure 4).
      </p>

      <Figure caption="Component A and two of the steps it necessitates, isolated from Figure 1 in the same positions and lanes, with the mapping drawn as grey dashed lines.">
        <MappingFigure />
      </Figure>

      <Figure caption={<>The same component and steps raised into three dimensions, each standing on its Figure 2 footprint. Height reads a value, descriptor <Rev minor>d</Rev> on A and metric y on each step, as the brackets mark.</>}>
        <ScalingFigure />
      </Figure>

      <Figure caption={<>Grey points are past <Rev minor>projects&rsquo;</Rev> (descriptor <Rev minor>d</Rev>, metric y) and the dashed line their fit. At a new project&rsquo;s descriptor <Rev minor>d</Rev>, the teal bar is the distribution the fit gives for metric y, and the forecast is read from it at the tolerated risk.</>}>
        <ForecastFigure />
      </Figure>

      <p>
        The figures reduce the forecast to a single descriptor, a single metric, and a straight-line fit, for
        clarity. In practice <Rev minor>each metric recorded at a step</Rev> typically depends on several descriptors at once, so the fit is
        multivariate, <Rev minor>and on the agents, tools and materials involved, which the context conditions on</Rev>. <Rev>A categorical descriptor cannot be read along an
        axis, and instead shifts or reshapes the fit, or separates the records it is drawn from.</Rev> Any method that maps recorded (descriptor, <Rev minor>metric</Rev>) tuples to a predicted distribution serves, from multivariate regression to nearest-neighbour
        matching or a lightweight neural network, the established approaches Section 2 surveys. What the model contributes is the structured, attributed history those methods need.
      </p>

      {/* Optional addition, parked in NOTES.md: the selection-instance figure and the process passage.
      <Rev block>
        <p>
          A selection is an instance of the master specification, a node appearing once for each time it is
          selected (Figure 5). Were Figure 1&rsquo;s B selected twice, two panels of different widths, say, each
          instance would carry its own value of d, and both would project onto the one node B, while the unselected
          C has no instance at all.
        </p>
        <Figure caption="The master specification of Figure 1 laid flat, with a selection raised above it as a tree of node instances. B is instanced twice, each instance with its own descriptor value, and both project onto the one node B. The unselected C has no instance.">
          <SelectionInstanceFigure />
        </Figure>
        <p>
          The process has a corresponding structure. Each step instance in <M>{"G_{\\hat{T}}"}</M> projects onto its
          step in <M>{"G"}</M>, as <M>{"\\hat{T}"}</M> projects onto <M>{"T"}</M>, though as a graph rather than a
          tree. Analysis after delivery could in principle recover that structure from the trace, assigning each
          execution to the node instances it served. The mapping does not always allow this. A step necessitated by
          several nodes serves them all at once, and which node instance an execution served cannot always be
          determined from its records, so the model derives the process from the selection rather than
          reconstructing it from the trace.
        </p>
      </Rev>
      */}

      <h3>Scope</h3>
      <p>
        The model sets aside the scheduling apparatus a reader from activity-on-node planning might expect.{' '}
        <Rev>
          For each job it gives the forecasts of its steps and the agents eligible to take it, and any scheduling
          under finite resources, from self-selection to priority rules or a resource-constrained scheduler, can draw
          on these.
        </Rev>
      </p>
      <p>
        The form of exposure, the descriptors&rsquo; effect <M>{"\\theta"}</M>, <Rev minor>the fit</Rev><Rev>, how the
        descriptor values combine where several instances necessitate one step, the operators by which a metric accumulates along paths and the
        order assumed for a job&rsquo;s steps where the process leaves it open</Rev>{' '}
        are left open as modelling choices.{' '}
        <Rev>
          <M>{"\\theta"}</M> may be any function of descriptor values, and <M>{"\\mathrm{fit}(R)"}</M> any
          map from the points <M>{"R"}</M> to a distribution conditional on the descriptors,
          which may draw only on points near the step&rsquo;s values.
          Other purposes may call for other operators, multiplication for a yield along a path, say,
          or the minimum for a capacity. The order may be the one performed, or, before then, taken from any
          ordering of all the project&rsquo;s steps consistent with the process, or one chosen to shorten the
          project, itself a resource-constrained scheduling problem with each agent a unit of capacity.
        </Rev>
      </p>
      <Rev block>
        <p>
          A selection is taken to be coherent, and when records are made, whether per item, per day or once a step
          is done, is left open. Any constraints enforcing either belong to an implementation, which a client may
          require.
        </p>
      </Rev>
    </>
  );
}
