import { Figure, M, Eq, Rev } from '@/components/paper';
import { MappingFigure, ScalingFigure, ForecastFigure, MasterInstanceFigure } from '../figures';

export function TheModel() {
  return (
    <>
      <h2>The model</h2>

      <p>
        The model formalises three things, the derivation of process from a specification, trace-based forecasting,
        and <Rev>trace-based eligibility among agents</Rev>. <Rev>Project control is not part of the model, being
        a byproduct of the three, read from the trace against each contract&rsquo;s forecasts, as Section 6 sets out.</Rev> SPD concerns the execution of projects, which run on
        a given master specification, process, and mapping<Rev minor>, together the master</Rev>.
      </p>

      <h3>Definitions</h3>

      <p>
        <strong>Product.</strong> <Rev minor>What a unit of work delivers, whether a step, a job or the whole process. Many
        products serve only the next step within the same job, and others cross a job boundary to serve steps in other
        jobs.</Rev> <Rev>Products that leave the process fulfil the specification, each at once the output of its step, its job
        and the whole process. The formal model is concerned only with step products, each carried by an
        arc <M>{"e \\in A_{sp}"}</M> to each step that requires it, as defined below.</Rev>
      </p>

      <p>
        <strong>Master specification.</strong> A rooted tree that breaks <Rev minor>down all that can be delivered into its</Rev> possible
        elements<Rev> and features</Rev>. The tree is hierarchical:
        the first level holds the high-level components, those delivered by whole systems, such as a
        building&rsquo;s foundation or its structural walls; the next level holds the systems that can deliver each
        component, a foundation, for instance, by a concrete slab or by blockwork; lower levels break the systems
        down as far as needed. Write it <M>{"T = (N, A)"}</M>: <M>{"N"}</M> the <Rev>elements and features</Rev><Rev minor>, a
        single one written <M>{"x"}</M>,</Rev> and <M>{"A"}</M> the parent-child relations. <Rev minor>Descriptors are specified for each node.</Rev>
      </p>

      <Eq gloss="The master specification is a tree of elements and features joined by parent-child relations.">{"T = (N,\\ A)"}</Eq>

      <p>
        <strong>Descriptor.</strong> An attribute attached to a node of the master specification,{' '}
        <Rev minor>either</Rev> numerical or categorical. <Rev minor>A node&rsquo;s descriptors are written</Rev> <M>{"D = (d_1, \\dots, d_k)"}</M>; on an instance
        each takes a value. <Rev>Where <M>{"D"}</M> appears in a record or a forecast, it stands for those bound
        values.</Rev>
      </p>

      <p>
        <strong>Master process.</strong> <Rev minor>An acyclic directed graph that breaks delivery down into all its
        possible steps. Each arc carries a product from one step to another, determining
        their precedence</Rev><Rev>, with <M>{"\\star"}</M> as the source or target of a product supplied from
        outside the process or leaving it, and a product required by several steps has an arc to each.</Rev> Write
        it <M>{"G = (N_s, A_{sp})"}</M>: <M>{"N_s"}</M> the steps<Rev minor>, a single one written <M>{"s"}</M>,
        and</Rev> <M>{"A_{sp}"}</M> the step products<Rev>, each arc <M>{"e"}</M> running
        from <M>{"\\mathrm{src}(e)"}</M> to <M>{"\\mathrm{tgt}(e)"}</M>. A step may record metrics.</Rev>
      </p>

      <Eq parts={[
        { tex: "G = (N_s,\\ A_{sp})", gloss: "The master process is a graph of steps and the products passed between them." },
      ]} />
      <Rev block>
        <Eq gloss="Each arc has a source and a target, either possibly outside the process.">{"\\mathrm{src},\\ \\mathrm{tgt} : A_{sp} \\to N_s \\cup \\{\\star\\}"}</Eq>
      </Rev>

      <Rev block>
        <p>
          <strong>Metric.</strong> A measured quantity shared across the master process, either numerical or
          categorical, such as time, the energy or material used, or a clinical outcome, written <M>{"m"}</M>. Each
          execution of a step records a value <M>{"y"}</M> for the metrics it captures.
        </p>
      </Rev>

      <p>
        <strong><Rev minor>Job.</Rev></strong> <Rev minor>The steps one trade or role performs, its skillset. Write</Rev>{' '}
        <M>{"N_j"}</M> <Rev minor>for the jobs, a single one written <M>{"j"}</M>.</Rev> Steps are assigned to jobs by a grouping <M>{"J : N_s \\to N_j"}</M>.
      </p>

      <Eq parts={[
        { tex: "J : N_s \\to N_j", gloss: "Every step belongs to exactly one job.", showGloss: true },
      ]} />

      <p>
        <strong>Mapping.</strong> A deterministic association of each node of the master specification with the
        steps in the master process it necessitates: a given <Rev minor>node</Rev> always necessitates the
        same steps. A step may be necessitated by more than one node, so the steps of different nodes may overlap.
        Write it as a map <M>{"\\mu : N \\to 2^{N_s}"}</M>,
        from <Rev minor>nodes</Rev> to the sets of steps they necessitate.
      </p>

      <Eq showGloss gloss="Each node of the specification necessitates a set of steps.">{"\\mu : N \\to 2^{N_s}"}</Eq>

      <p>
        <Rev minor><strong>Selection.</strong></Rev> <Rev>A tree <M>{"\\hat{T}"}</M> of node instances, each an
        instance <M>{"\\hat{x}"}</M> of a node <M>{"x"}</M>, with its descriptors bound to values, and under an
        instance of its node&rsquo;s parent, up to a single instance of the root. A node may have several instances,
        each with its own descriptor values.</Rev>
      </p>

      <p>
        <strong>Derivation.</strong> <Rev>Each distinct node instanced in <M>{"\\hat{T}"}</M> necessitates its
        steps through the mapping, and these are the project&rsquo;s steps <M>{"N_{\\hat{T}}"}</M>, each appearing once
        however many instances its nodes have. Write{' '}
        <M>{"u \\rightsquigarrow v"}</M> where a path of the master process joins <M>{"u"}</M> to <M>{"v"}</M> through
        unselected steps alone. The project&rsquo;s process <M>{"G_{\\hat{T}}"}</M> orders its steps by these paths,
        so that where unselected steps lie between two selected ones, the later still follows the earlier, as though
        joined directly.</Rev>
      </p>

      <Rev block>
        <Eq showGloss gloss="A project's steps are those its node instances necessitate, each appearing once.">{"N_{\\hat{T}} = \\bigcup\\nolimits_{\\hat{x} \\in \\hat{T}} \\mu(x)"}</Eq>
        <Eq showGloss gloss="A project's process orders its steps wherever a path of the master process joins them through unselected steps alone.">{"G_{\\hat{T}} = \\bigl(N_{\\hat{T}},\\ \\bigl\\{\\, (u, v) \\in N_{\\hat{T}}^2 : u \\rightsquigarrow v \\,\\bigr\\}\\bigr)"}</Eq>
      </Rev>

      <p>
        <Rev minor><strong>Extension.</strong></Rev> The specification can be extended
        during execution, <Rev minor>including by a step&rsquo;s own findings</Rev>. <Rev>Write the node instances a step&rsquo;s execution selects as <M>{"\\sigma(s)"}</M>,
        each under an instance already in <M>{"\\hat{T}"}</M> or in <M>{"\\sigma(s)"}</M></Rev><Rev>,
        or <M>{"\\sigma(s, t)"}</M> where the selection is made at a time <M>{"t"}</M> during the step</Rev>.
        Executing <M>{"s"}</M> then extends the selection to <M>{"\\hat{T} \\cup \\sigma(s)"}</M>, and the steps
        those <Rev minor>instances</Rev> necessitate join the project&rsquo;s process. Extension only
        adds <Rev minor>instances</Rev>, so a larger selection{' '}
        <M>{"\\hat{T} \\subseteq \\hat{T}'"}</M> gives <M>{"N_{\\hat{T}} \\subseteq N_{\\hat{T}'}"}</M> and <Rev>keeps every precedence of <M>{"G_{\\hat{T}}"}</M> in <M>{"G_{\\hat{T}'}"}</M>, a direct join giving way to the path
        through the steps newly selected</Rev>.
        Steps already executed, and the records they left, therefore stay valid, unless a newly necessitated step
        feeds one of them, a limitation Section 6 takes up. <Rev>A step under way when an extension lands <Rev minor>continues</Rev>,
        with any descriptor the extension binds entering the values it sees, its forecast updating with them, and
        its records closing at completion.</Rev>
      </p>

      <Rev block>
        <p>
          <strong>Repetition.</strong> A node may be instanced more than once in a project, but each distinct step
          appears once in the project&rsquo;s process. Its agent executes it as many times as the work requires, by
          their own instructions, and each execution leaves its own records, with its own <M>{"\\xi"}</M>. Loops are
          carried by these executions, however many there turn out to be, and the project&rsquo;s process stays
          acyclic. A step&rsquo;s executions fall within its job&rsquo;s contract, so a project of twenty panels gives
          the fabricator one contract covering all twenty.
        </p>
      </Rev>

      <p>
        <strong>Agent.</strong> A resource that performs steps, as against the tools and materials a step also
        draws on<Rev minor>, written <M>{"a"}</M></Rev>; it holds a set of skillsets <M>{"Q(a)"}</M><Rev> <M>{"\\subseteq N_j"}</M></Rev>, its qualifications.
      </p>

      <p>
        <strong>Tool.</strong> A resource a step draws on without embodying it in the product, such as equipment,
        software, a vehicle, or a consumable like sandpaper or a face mask, whether used up in a single step or worn
        down over many, written <M>{"g"}</M>. <Rev>A single use of one of its functions, such as a nail fired, is an
        action.</Rev>
      </p>

      <p>
        <strong>Material.</strong> A resource a step embodies in the product, written <M>{"w"}</M>.
      </p>

      <p>
        <strong>Trace.</strong> An accumulating set of execution records. Each ties
        the value <M>{"y"}</M> of one metric <M>{"m"}</M> recorded at a step <M>{"s"}</M> at time <M>{"t"}</M>,
        under the descriptor values <M>{"D"}</M> that held, to the agent <Rev>or agents</Rev> <M>{"a"}</M> that executed it<Rev>, a crew or an
        agent working under supervision recorded together</Rev>, the
        tools <M>{"g"}</M> and materials <M>{"w"}</M> it drew on, and the project <M>{"i"}</M> it arose
        from. An execution leaves a record for each metric it captures, so steps can record different metrics, each
        when and however it is captured<Rev>, and the records of one execution share an identifier <M>{"\\xi"}</M>, a step that repeats within a project having
        one for each execution</Rev>. Beyond the project, step, time, metric and value, any field may go
        unrecorded, written <M>{"\\bot"}</M>, as distinct from an empty set of tools or materials, which records that
        none were used. A record then serves only the forecasts and exposure its recorded fields can answer, so a
        partial trace is useful in proportion to what it records. <Rev>Records can often be read from logs the work
        already keeps, a logged output being placed on the step that produces it and its time inferred from when it
        was logged.</Rev>
      </p>

      <Rev block>
        <Eq gloss="Each record holds one metric's value at a step in a project, the execution it belongs to, when it was captured, and whichever of the descriptor values, agents, tools and materials were recorded.">{"\\tau = \\bigl\\{\\,(\\xi,\\ i,\\ s,\\ t,\\ D,\\ a,\\ g,\\ w,\\ m,\\ y)\\,\\bigr\\}"}</Eq>
      </Rev>

      <p>
        <strong>Exposure.</strong> The recorded exposure to a step of anything the trace records, alone or in
        combination, written <M>{"n_c(s)"}</M> for such a context <M>{"c"}</M>, as a count of executions or a total of
        some recorded quantity, say. Its reading follows the context, wear for a tool, for instance, experience for
        an agent, written <M>{"n_a(s)"}</M><Rev> and counting the distinct executions <M>{"\\xi"}</M> the agent
        appears in, each member of a crew credited with the execution</Rev>, or how often the step has run at night.
      </p>

      <p>
        <strong>Eligibility.</strong> An agent is eligible for a job it is qualified and has sufficient experience
        for, according to a given per-step floor <M>{"\\lambda_s"}</M> at each of the job&rsquo;s steps <Rev>in the
        project</Rev><Rev>, with <M>{"\\tilde{n}_a(s)"}</M> any experience credited to the agent by hand, which counts
        toward the floor but not toward forecasts</Rev>.
      </p>

      <Rev block>
        <Eq gloss="An agent is eligible for a job when qualified for it and its experience clears the floor at every step of the job in the project.">{"\\mathrm{Elig}(j) = \\{\\, a : j \\in Q(a),\\ n_a(s) + \\tilde{n}_a(s) \\geq \\lambda_s\\ \\forall s \\in N_{\\hat{T}},\\ J(s) = j \\,\\}"}</Eq>
      </Rev>

      <p>
        <strong>Forecast.</strong> A predicted value for one of a step&rsquo;s metrics, based on the trace. A
        metric&rsquo;s value is distributed as <M>{"y_m(s) \\sim \\mathcal{F}(\\theta(D), s, c)"}</M>, conditioned on a
        chosen context <M>{"c"}</M>. The descriptors <M>{"D"}</M> <Rev minor>an execution sees are those bound on the node instances it
        serves</Rev> and on their ancestors. Here <M>{"c"}</M> selects the records the fit draws on, <M>{"\\theta"}</M> scales
        within them by the descriptors, and a neighbourhood fixes which descriptor values count as near, <M>{"D' \\approx D"}</M>.
        What <M>{"c"}</M> holds follows the use. The <Rev minor>forecast</Rev> offered against a step takes <M>{"c"}</M> empty, pooling
        over who will do the work, so a client is not charged for drawing the slowest <Rev minor>agent</Rev>. Planning can condition
        more finely, with <M>{"c"}</M> naming the <Rev minor>agent</Rev>, the tool, the time of day, and so on. <Rev>It
        can also name the value of another metric recorded in the same execution, matched through <M>{"\\xi"}</M>, so
        that one metric is forecast against a value chosen for another, such as a dose. The records then
        matched for the first metric are those whose execution also recorded that value of the second.</Rev> The forecast
        reads off the fit over the records that match the step and metric, lie near its descriptor values, and agree with <M>{"c"}</M>,
        at <Rev>a confidence level</Rev> <M>{"r"}</M>, its <M>{"r"}</M>-percentile <M>{"Q_r"}</M><Rev>, so
        that <M>{"1 - r"}</M> is the tolerated risk of overrun</Rev>. A lower tolerance for overrun takes
        a higher percentile, a more conservative value.
      </p>

      <Eq showGloss gloss="A metric's value at a step follows a distribution scaled by its descriptors and conditioned on the chosen context.">{"y_m(s) \\,\\sim\\, \\mathcal{F}\\bigl(\\theta(D),\\ s,\\ c\\bigr)"}</Eq>

      <Rev block>
        <Eq showGloss gloss={<>The forecast for a metric is the <M>{"r"}</M>-percentile of a fit over its matching records near the step&rsquo;s descriptor values, evaluated at those values.</>}>{"\\begin{aligned} \\mathrm{forecast}(s, m, D, r, c) &= Q_r\\bigl(\\, \\mathrm{fit}(R)(D) \\,\\bigr), \\\\ R &= \\bigl\\{\\, (D', y) : (\\xi', i', s, t', D', a', g', w', m, y) \\in \\tau,\\ D' \\approx D,\\ \\mathrm{match}(c) \\,\\bigr\\} \\end{aligned}"}</Eq>
      </Rev>

      <Rev block>
        <p>
          <strong>Accumulation.</strong> A metric&rsquo;s values combine in one of two ways, each acting on
          distributions rather than point values, with <M>{"y_m(s)"}</M> a step&rsquo;s own value distributed as in
          the forecast. A total, such as material or energy, is the sum of the steps&rsquo; own values over the
          steps it covers, a job&rsquo;s or the project&rsquo;s, each step counted once. Its distribution is taken
          with the steps&rsquo; values independent, an assumption Section 6 returns to, and the same holds for the
          path metrics below.
        </p>
        <Eq gloss="A total over a set of steps sums each step's own value once.">{"X_m(S) = \\sum\\nolimits_{s \\in S} y_m(s), \\qquad S \\subseteq N_{\\hat{T}}"}</Eq>
        <p>
          A metric that runs along paths, such as time, accumulates through the graph with its own pair of
          operators, one extending a value along a path and one merging the values that converge at a step. Time
          adds along a path and takes the maximum where paths converge. One agent executes a job&rsquo;s steps in
          turn, so each job&rsquo;s steps are first chained in the order executed or, before execution, in the order
          of a single topological sort of <M>{"G_{\\hat{T}}"}</M>. Write <M>{"G_{\\hat{T}}^{J}"}</M> for the project&rsquo;s process
          with these chains added. The executed steps in the order executed, followed by the rest in that sort, give
          one global order that every chain restricts, so it remains acyclic unless a late selection feeds a step
          already run.
          Time then adds within a job and takes the maximum where jobs converge. The value accumulated at
          step <M>{"v"}</M> merges the values of the steps that supply it and extends them by its own.
        </p>
        <Eq gloss="A path metric's accumulated value at a step merges the values arriving from the steps that supply it, with each job's steps chained, and extends them by the step's own value.">{"X_m(v) = \\Bigl(\\, \\bigoplus\\nolimits_{m}\\ \\bigl\\{\\, X_m(u) : u \\in \\mathrm{pred}_{G_{\\hat{T}}^{J}}(v) \\,\\bigr\\} \\Bigr) \\otimes_m y_m(v)"}</Eq>
      </Rev>

      <p>
        <strong>Contract.</strong> The unit offered for self-selection, a job within the <Rev minor>project&rsquo;s process</Rev>: the
        inputs <M>{"\\mathrm{in}(j)"}</M> it draws from outside, the outputs <M>{"\\mathrm{out}(j)"}</M> it
        supplies, and the forecasts <M>{"\\varphi(j)"}</M>, for each metric the <M>{"r"}</M>-percentile of the
        distribution obtained by combining the job&rsquo;s steps under independence, not a sum of per-step
        percentiles<Rev>, and for a path metric over the job&rsquo;s own chained steps alone, so that its time is
        the job&rsquo;s own duration, not including any wait for its inputs</Rev>. <Rev>Writing <M>{"S_j"}</M> for the job&rsquo;s steps in the project, its inputs are the
        products entering <M>{"S_j"}</M> from another of the project&rsquo;s jobs or from outside the process, and
        its outputs are those leaving <M>{"S_j"}</M> for another of the project&rsquo;s jobs or out of the
        process.</Rev> A contract <M>{"C(j)"}</M> is offered to
        every agent in <M>{"\\mathrm{Elig}(j)"}</M> and becomes binding on whichever self-selects it. <Rev>Where an
        extension adds steps to a job already taken, they join its contract, which is re-issued to the same agent
        with <M>{"\\varphi(j)"}</M> recomputed and eligibility checked at the added steps.</Rev>
      </p>

      <Rev block>
        <Eq gloss="A job's inputs are the products entering its steps in the project from another job in the project or from outside the process.">{"\\mathrm{in}(j) = \\{\\, e \\in A_{sp} : \\mathrm{tgt}(e) \\in S_j,\\ \\mathrm{src}(e) \\in (N_{\\hat{T}} \\setminus S_j) \\cup \\{\\star\\} \\,\\}, \\qquad S_j = \\{\\, s \\in N_{\\hat{T}} : J(s) = j \\,\\}"}</Eq>
        <Eq gloss="Its outputs are the products leaving those steps for another job in the project or for outside the process.">{"\\mathrm{out}(j) = \\{\\, e \\in A_{sp} : \\mathrm{src}(e) \\in S_j,\\ \\mathrm{tgt}(e) \\in (N_{\\hat{T}} \\setminus S_j) \\cup \\{\\star\\} \\,\\}"}</Eq>
      </Rev>

      <Eq gloss="A contract is a job's inputs, outputs and aggregated forecasts.">{"C(j) = \\bigl(\\,\\mathrm{in}(j),\\ \\mathrm{out}(j),\\ \\varphi(j)\\,\\bigr)"}</Eq>

      <p>
        <Rev minor><strong>Project.</strong> The delivery of the state a selection specifies, from an initial state:</Rev> each of its derived steps with that step&rsquo;s <Rev minor>offered</Rev> forecasts across its metrics, <Rev>taken with the empty
        context <M>{"\\varnothing"}</M>,</Rev>{' '}
        and the contract of the job it belongs to with the agents eligible for that job, offered for self-selection:
      </p>

      <Eq gloss="A project is each derived step with its forecasts, its job's contract and the agents eligible for that job.">{"\\mathrm{Project}(\\hat{T}) = \\bigl\\{\\, \\bigl(s,\\ \\mathrm{forecast}(s, \\cdot, D, r, \\varnothing),\\ C(J(s)),\\ \\mathrm{Elig}(J(s))\\bigr) : s \\in N_{\\hat{T}} \\,\\bigr\\}"}</Eq>

      <p>
        Throughout, <M>{"N"}</M>, <M>{"N_s"}</M> and the agents are taken finite, and the trace <M>{"\\tau"}</M> is
        finite at any point. The master process <M>{"G"}</M> is acyclic.
      </p>

      <h3>Illustration</h3>
      <p>
        <Rev minor>Figure 1 draws a master specification and master process in miniature, with a project&rsquo;s
        selection (S, A and B but not C) and the process <M>{"G_{\\hat{T}}"}</M> it necessitates drawn solid against the faded
        rest of the master.</Rev>
      </p>

      <Figure caption={<>A master specification (left) and master process (right), the process laid out in skillset lanes. Grey dashed lines are the mapping from specification nodes to the steps they necessitate. Brown arrows carry work in progress between a skillset&rsquo;s steps, teal dashed arrows carry products between skillsets<Rev> and into and out of the process</Rev>, and a step follows the one whose output it receives. A project&rsquo;s selected nodes and the steps they derive are drawn solid, and the rest of the master faded.</>}>
        <MasterInstanceFigure />
      </Figure>

      <p>
        Take a single component of that selected subset, A, which necessitates p1 and q2 (Figure 2). A descriptor
        on A, <Rev minor>d</Rev>, scales the distribution of a metric y recorded at each of those steps (Figure 3). On a new project{' '}
        <Rev minor>d</Rev> is known from the specification but y is not, so <Rev minor>y is forecast from a fit to past (d, y) records at
        the step, read at the tolerated risk</Rev> (Figure 4).
      </p>

      <Figure caption="Component A and the steps it necessitates, isolated from Figure 1 in the same positions and lanes, with the mapping drawn as grey dashed lines.">
        <MappingFigure />
      </Figure>

      <Figure caption={<>The same component and steps raised into three dimensions, each standing on its Figure 2 footprint. Height reads a value, descriptor <Rev minor>d</Rev> on A and metric y on each step, as the brackets mark.</>}>
        <ScalingFigure />
      </Figure>

      <Figure caption={<>Grey points are past (descriptor <Rev minor>d</Rev>, metric y) records and the dashed line their fit. At a new project&rsquo;s descriptor <Rev minor>d</Rev>, the teal bar is the distribution the fit gives for metric y, and the forecast is read from it at the tolerated risk.</>}>
        <ForecastFigure />
      </Figure>

      <p>
        The figures reduce the forecast to a single descriptor, a single metric, and a straight-line fit, for
        clarity. In practice <Rev minor>each metric recorded at a step</Rev> typically depends on several descriptors at once, and on the agents,
        tools and materials involved, so the fit is multivariate. <Rev>A categorical descriptor cannot be read along an
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
        The form of exposure, the scaling <M>{"\\theta"}</M>, the
        neighbourhood <M>{"\\approx"}</M>, the estimator<Rev>, the operators by which each path metric accumulates and, before execution, the
        order assumed for a job&rsquo;s steps where the process leaves it open</Rev>{' '}
        are left open as modelling choices.{' '}
        <Rev>
          The scaling is any function of descriptor values, the neighbourhood any relation on them that says which
          count as near, a distance threshold, say, or equality for a categorical descriptor, and the estimator any
          map from a finite set of (descriptor, metric) records to a distribution conditional on the descriptors.
          Path metrics other than time may call for other operators, multiplication for a yield along a path, say,
          or the minimum for a capacity.
        </Rev>
      </p>
      <p>
        The experience floor <M>{"\\lambda_s"}</M>, with the context over which experience is counted against it, is
        a policy input set per step that the model reads but does not define.{' '}
        <Rev>
          A floor could equally read an agent&rsquo;s own forecast at the step, its expected value or its spread,
          since forecasts can be conditioned on a named agent. How an agent comes by credited experience, through
          work done before or outside the trace, training or supervision, including at a step no agent has yet
          executed, lies outside the model.
        </Rev>{' '}
        Eligibility may also read external predicates for an agent&rsquo;s availability and documentation, which the
        model likewise takes as given. <Rev>Custody of the trace, who holds it and who may read which records, also
        lies outside the model.</Rev>
      </p>
      <p>
        Forecasts are estimated from accumulated history. <Rev>Where a step has no relevant trace, the model takes a
        given forecast in its place, from a heuristic or an expert estimate, as activity-on-node planning takes its
        durations, until enough executions are recorded.</Rev> Forecasts combine across a
        job&rsquo;s steps, and on to the project, under independence, which understates risk where converging paths
        share a source<Rev>, and within a job above all</Rev>, a boundary the limitations take up.
      </p>
      <Rev block>
        <p>
          A selection is taken to be coherent, and any constraints that would enforce this belong to an
          implementation. A join across unselected steps carries no product and enters no contract, though it does enter the path
          metrics, and can over-constrain them where the later step depended on the earlier only through the steps
          left out. Where two nodes bind a
          step&rsquo;s descriptor differently, which value holds is likewise left to an implementation. Rework, a step
          repeated because its output failed, is recorded like any other execution, and can be measured by a metric
          of its own, rework time, say, within the step&rsquo;s total time.
        </p>
      </Rev>
    </>
  );
}
