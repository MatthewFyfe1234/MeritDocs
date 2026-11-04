import { Cite, Figure, M, Eq, Rev } from '@/components/paper';
import { MappingFigure, ScalingFigure, ForecastFigure, MasterInstanceFigure } from '../figures';

export function TheModel() {
  return (
    <>
      <h2>The model</h2>

      <p>
        The model formalises three things, the derivation of process from a specification, trace-based forecasting,
        and trace-driven preferential self-selection among eligible agents. SPD concerns the execution of projects, which run on
        a given master specification, process, and mapping.
      </p>

      <h3>Definitions</h3>

      <p>
        <strong>Product.</strong> What a unit of work delivers, at different levels of granularity. The same
        product can be output by a step, by a job, and by the whole process. Many serve only the next step within
        the same job; others cross a job boundary to serve a step in another job; and one will ultimately leave its
        step, its job, and the whole process, fulfilling the obligation of the specification.
      </p>

      <p>
        <strong>Master specification.</strong> A rooted tree that breaks the product down into all its possible
        elements. The tree is hierarchical:
        the first level holds the high-level components, those delivered by whole systems, such as a
        building&rsquo;s foundation or its structural walls; the next level holds the systems that can deliver each
        component, a foundation, for instance, by a concrete slab or by blockwork; lower levels break the systems
        down as far as needed. Write it <M>{"T = (N, A)"}</M>: <M>{"N"}</M> the product elements and <M>{"A"}</M> the
        parent-child relations. A node may carry descriptors, as defined below.
      </p>

      <Eq gloss="The master specification is a tree of product elements joined by parent-child relations.">{"T = (N,\\ A)"}</Eq>

      <p>
        <strong>Master process.</strong> A directed graph that breaks delivery down into all its possible
        steps. The nodes are the steps; the arcs each carry a product passed between two steps, thereby
        determining their precedence in an acyclic graph. Write it <M>{"G = (N_s, A_{sp})"}</M>: <M>{"N_s"}</M> the
        steps, <M>{"A_{sp}"}</M> the step products, a single step written <M>{"s"}</M>, and an arc <M>{"e = (u, v)"}</M> carrying
        a product from step <M>{"u"}</M> to step <M>{"v"}</M>.
      </p>

      <Eq parts={[
        { tex: "G = (N_s,\\ A_{sp})", gloss: "The master process is a graph of steps and the products passed between them." },
        { tex: "e = (u, v) \\in A_{sp}", gloss: "Each arc carries a product from one step to the next." },
      ]} />

      <p>
        <strong>Job graph.</strong> A graph grouping the steps by job, each job defined by one skillset. It may
        cycle where products pass back and forth between jobs. Write it <M>{"G_j = (N_j, A_{jp})"}</M>: <M>{"N_j"}</M> the
        jobs and <M>{"A_{jp}"}</M> the job products. Steps are assigned to jobs by a grouping <M>{"J : N_s \\to N_j"}</M>,
        and a job-arc joins two jobs wherever a product passes between their steps.
      </p>

      <Eq parts={[
        { tex: "G_j = (N_j,\\ A_{jp})", gloss: "The job graph has jobs for nodes and the products passed between them for arcs." },
        { tex: "J : N_s \\to N_j", gloss: "Every step belongs to exactly one job.", showGloss: true },
      ]} />

      <Eq gloss="Two jobs are joined wherever a product passes from a step in one to a step in the other.">{"A_{jp} = \\bigl\\{\\, (J(u),\\ J(v)) : (u, v) \\in A_{sp},\\ J(u) \\neq J(v) \\,\\bigr\\}"}</Eq>

      <p>
        <strong>Mapping.</strong> A deterministic association of each node of the master specification with the
        steps in the master process it necessitates: a given product node always necessitates the
        same steps. A step may be necessitated by more than one node, so the steps of different nodes may overlap.
        Write it as a map <M>{"\\mu : N \\to 2^{N_s}"}</M>,
        from spec nodes to the sets of steps they necessitate.
      </p>

      <Eq showGloss gloss="Each node of the specification necessitates a set of steps.">{"\\mu : N \\to 2^{N_s}"}</Eq>

      <p>
        <strong>Descriptor.</strong> An attribute attached to a node of the master specification,
        numerical or categorical. A node carries descriptors <M>{"D = (d_1, \\dots, d_k)"}</M>; on an instance
        each takes a value, and the metrics at the steps the node necessitates scale with those values, as the
        forecast below makes precise.
      </p>

      <p>
        <strong>Derivation.</strong> A project&rsquo;s nodes are a subset <M>{"P \\subseteq N"}</M> of the
        master specification, closed upward so selecting a node selects its ancestors up to the root, with their
        descriptors bound to values. The root is therefore always present, and it necessitates the steps the
        product needs as a whole, estimation being a common example. Each selected node necessitates its steps
        through the mapping, and pooled together these are the project&rsquo;s steps <M>{"N_P"}</M>, with the
        project&rsquo;s process <M>{"G_P"}</M> the master process induced on them. The specification can be extended
        during execution, drawing further subsets the same way. Extension can come from outside, a client&rsquo;s
        change, say, or from execution itself, where a step&rsquo;s finding selects further nodes, as an assessment
        selects the organ it localises. Write the nodes a step&rsquo;s execution selects as <M>{"\\sigma(s) \\subseteq N"}</M>.
        Executing <M>{"s"}</M> then extends the selection to <M>{"P \\cup \\sigma(s)"}</M>, closed upward, and the steps
        those nodes necessitate join the project&rsquo;s process. Extension only adds nodes, so a larger selection
        <M>{"P \\subseteq P'"}</M> gives <M>{"N_P \\subseteq N_{P'}"}</M> and makes <M>{"G_P"}</M> a subgraph of <M>{"G_{P'}"}</M>.
        Steps already executed, and the records they left, therefore stay valid, unless a newly necessitated step
        feeds one of them, a limitation Section 6 takes up.
      </p>

      <Eq parts={[
        { tex: "G_P = G[\\,N_P\\,]", gloss: "A project's process is the master process restricted to its steps.", showGloss: true },
        { tex: "N_P = \\bigcup_{x \\in P} \\mu(x)", gloss: "A project's steps are those its selected nodes necessitate.", showGloss: true },
      ]} />

      <p>
        <strong>Agent.</strong> A resource that performs steps, as against the tools and materials a step also
        draws on; it holds a set of skillsets <M>{"Q(a)"}</M>, its qualifications.
      </p>

      <p>
        <strong>Tool.</strong> A resource a step draws on without embodying it in the product, such as equipment,
        software, a vehicle, or a consumable like sandpaper or a face mask, whether used up in a single step or worn
        down over many, written <M>{"g"}</M>.
      </p>

      <p>
        <strong>Material.</strong> A resource a step embodies in the product, written <M>{"w"}</M>.
      </p>

      <p>
        <strong>Trace.</strong> An accumulating set of execution records. Each ties
        the value <M>{"y"}</M> of one metric <M>{"m"}</M> recorded at a step <M>{"s"}</M> at time <M>{"t"}</M>,
        under the descriptor values <M>{"D"}</M> that held, to the agent <M>{"a"}</M> that executed it, the
        tools <M>{"g"}</M> and materials <M>{"w"}</M> it drew on, and the project instance <M>{"i"}</M> it arose
        from. An execution leaves a record for each metric it captures, so steps can record different metrics, each
        when and however it is captured. Beyond the project, step, time, metric and value, any field may go
        unrecorded, written <M>{"\\bot"}</M>, as distinct from an empty set of tools or materials, which records that
        none were used. A record then serves only the forecasts and exposure its recorded fields can answer, so a
        partial trace is useful in proportion to what it records.
      </p>

      <Eq gloss="Each record holds one metric's value at a step in a project, when it was captured, and whichever of the descriptor values, agent, tools and materials were recorded.">{"\\tau = \\bigl\\{\\,(i,\\ s,\\ t,\\ D,\\ a,\\ g,\\ w,\\ m,\\ y)\\,\\bigr\\}"}</Eq>

      <p>
        <strong>Exposure.</strong> The recorded exposure to a step of anything the trace records, alone or in
        combination, written <M>{"n_c(s)"}</M> for such a context <M>{"c"}</M>, as a count of executions or a total of
        some recorded quantity, say. Its reading follows the context, wear for a tool, for instance, experience for
        an agent, written <M>{"n_a(s)"}</M>, or how often the step has run at night.
      </p>

      <p>
        <strong>Eligibility.</strong> An agent is eligible for a job it is qualified and has sufficient experience
        for, according to a given per-step floor <M>{"\\lambda_s"}</M> at each of the job&rsquo;s steps.
      </p>

      <Eq gloss="An agent is eligible for a job when qualified for it and its experience clears the floor at every step of the job.">{"\\mathrm{Elig}(j) = \\{\\, a : j \\in Q(a),\\ n_a(s) \\geq \\lambda_s \\text{ for all } s \\text{ with } J(s) = j \\,\\}"}</Eq>

      <p>
        <strong>Forecast.</strong> A predicted value for one of a step&rsquo;s metrics, based on the trace. A
        metric&rsquo;s value is distributed as <M>{"y_m(s) \\sim \\mathcal{F}(\\theta(D), s, c)"}</M>, conditioned on a
        chosen context <M>{"c"}</M>. The descriptors <M>{"D"}</M> a step sees are those bound on the nodes that
        necessitate it and on their ancestors. Here <M>{"c"}</M> selects the records the fit draws on, <M>{"\\theta"}</M> scales
        within them by the descriptors, and a neighbourhood fixes which descriptor values count as near, <M>{"D' \\approx D"}</M>.
        What <M>{"c"}</M> holds follows the use. The estimate offered against a step takes <M>{"c"}</M> empty, pooling
        over who will do the work, so a client is not charged for drawing the slowest worker. Planning can condition
        more finely, with <M>{"c"}</M> naming the worker, the tool, the time of day, and so on. The forecast
        reads off the fit over the records that match the step and metric, lie near its descriptor values, and agree with <M>{"c"}</M>,
        at a tolerated risk <M>{"r"}</M>, its <M>{"r"}</M>-percentile <M>{"Q_r"}</M>. A lower tolerance for overrun takes
        a higher percentile, a more conservative value.
      </p>

      <Eq showGloss gloss="A metric's value at a step follows a distribution scaled by its descriptors and conditioned on the chosen context.">{"y_m(s) \\,\\sim\\, \\mathcal{F}\\bigl(\\theta(D),\\ s,\\ c\\bigr)"}</Eq>

      <Eq showGloss gloss={<>The forecast for a metric is the <M>{"r"}</M>-percentile of a fit over its matching records near the step&rsquo;s descriptor values.</>}>{"\\mathrm{forecast}(s, m, D, r, c) = Q_r\\bigl(\\, \\mathrm{fit}\\,\\bigl\\{\\, y : (i', s, t', D', a', g', w', m, y) \\in \\tau,\\ D' \\approx D,\\ \\mathrm{match}(c) \\,\\bigr\\} \\,\\bigr)"}</Eq>

      <p>
        <strong>Selection.</strong> Among the agents eligible for a job, each self-selects rather than being
        assigned, weighing the job&rsquo;s forecasts at its own tolerated risk. Experience across the job&rsquo;s
        steps sets their priority, favouring the most and best-distributed record, so preference emerges from the
        trace rather than from central assignment.
      </p>

      <p>
        <strong>Contract.</strong> The unit offered for self-selection, a job within the derived subgraph: the
        inputs <M>{"\\mathrm{in}(j)"}</M> it draws from outside, including any whose producing step is not selected,
        the outputs <M>{"\\mathrm{out}(j)"}</M> it
        supplies, and the forecasts <M>{"\\varphi(j)"}</M>, for each metric the <M>{"r"}</M>-percentile of the
        distribution obtained by combining the job&rsquo;s steps under independence, not a sum of per-step
        percentiles.{' '}
        <Rev>
          Each metric accumulates through the graph with its own pair of operators, one extending a value along a
          path and one merging the values that converge at a step <Cite id="mohri2002" />. Time adds along a path and
          takes the maximum where paths converge, as in the critical path method <Cite id="kelley1959" />, while a
          quantity such as material adds at both. Within a job, one agent executes the steps in turn, so time adds
          across them, and the maximum applies where jobs converge. The operators act on distributions rather than
          point values, since the maximum of point forecasts understates when the last input arrives, the merge bias
          of PERT <Cite id="maccrimmon1964" />.
        </Rev>{' '}
        A contract <M>{"C(j)"}</M> is offered to
        every agent in <M>{"\\mathrm{Elig}(j)"}</M> and becomes binding on whichever self-selects it.
      </p>

      <Eq gloss="A contract is a job's inputs, outputs and aggregated forecasts.">{"C(j) = \\bigl(\\,\\mathrm{in}(j),\\ \\mathrm{out}(j),\\ \\varphi(j)\\,\\bigr)"}</Eq>

      <p>
        Taken together, a project is each of its derived steps with that step&rsquo;s <Rev>offered</Rev> forecasts across its metrics, <Rev>taken with the empty
        context <M>{"\\varnothing"}</M>,</Rev>
        and the contract of the job it belongs to with the agents eligible for that job, offered for self-selection:
      </p>

      <Eq gloss="A project is each derived step with its forecasts, its job's contract and the agents eligible for that job.">{"\\mathrm{Project}(P) = \\bigl\\{\\, \\bigl(s,\\ \\mathrm{forecast}(s, \\cdot, D, r, \\varnothing),\\ C(J(s)),\\ \\mathrm{Elig}(J(s))\\bigr) : s \\in N_P \\,\\bigr\\}"}</Eq>

      <p>
        Throughout, <M>{"N"}</M>, <M>{"N_s"}</M> and the agents are taken finite, and the trace <M>{"\\tau"}</M> is
        finite at any point. The master process <M>{"G"}</M> is acyclic, while the job graph <M>{"G_j"}</M> may
        cycle.
      </p>

      <h3>Illustration</h3>
      <p>
        Figure 1 draws the model in miniature, a master specification beside its master process. One project
        selects the root S with A and B but not C, and the mapping picks out the steps those nodes necessitate, the
        project&rsquo;s process <M>{"G_P"}</M>. What the project uses is drawn solid, and the rest of the master faded.
      </p>

      <Figure caption="A master specification (left) and master process (right), the process laid out in skillset lanes. Grey dashed lines are the mapping from specification nodes to the steps they necessitate. Brown arrows carry work in progress between a skillset's steps, teal dashed arrows carry products between skillsets, and a step follows the one whose output it receives. A project's selected nodes and the steps they derive are drawn solid, and the rest of the master faded.">
        <MasterInstanceFigure />
      </Figure>

      <p>
        Take a single component of that selected subset, A, which necessitates p1 and q2 (Figure 2). A descriptor
        on A, x, scales the distribution of a metric y recorded at each of those steps (Figure 3). On a new project
        x is known from the specification but y is not, so the forecast is read from a fit to past records of the
        two (Figure 4).
      </p>

      <Figure caption="Component A and the steps it necessitates, isolated from Figure 1 in the same positions and lanes, with the mapping drawn as grey dashed lines.">
        <MappingFigure />
      </Figure>

      <Figure caption="The same component and steps raised into three dimensions, each standing on its Figure 2 footprint. Height reads a value, descriptor x on A and metric y on each step, as the brackets mark.">
        <ScalingFigure />
      </Figure>

      <Figure caption="Grey points are past (descriptor x, metric y) records and the dashed line their fit. At a new project's descriptor x, the teal bar is the distribution the fit gives for metric y, and the forecast is read from it at the tolerated risk.">
        <ForecastFigure />
      </Figure>

      <p>
        The figures reduce the forecast to a single descriptor, a single metric, and a straight-line fit, for
        clarity. In practice a step&rsquo;s outcome typically depends on several descriptors at once, and on the agents,
        tools and materials involved, so the fit is multivariate. Any method that maps recorded (descriptor,
        outcome) tuples to a predicted distribution serves, from multivariate regression to nearest-neighbour
        matching or a lightweight neural network, the established approaches Section 2 surveys. What the model
        contributes is the structured, attributed history those methods need.
      </p>

      <h3>Scope</h3>
      <p>
        The model sets aside the scheduling apparatus a reader from activity-on-node planning might expect.
        <Rev>
          For each job it gives the forecasts of its steps and the agents eligible to take it, and any scheduling
          under finite resources, from self-selection to priority rules or a resource-constrained scheduler, can draw
          on these.
        </Rev>{' '}
        The form of exposure, the scaling <M>{"\\theta"}</M>, the
        neighbourhood <M>{"\\approx"}</M>, the estimator<Rev> and the operators by which each metric accumulates</Rev>{' '}
        are left open as modelling choices, and the experience
        floor <M>{"\\lambda_s"}</M>, with the context over which experience is counted against it, is a policy input
        set per step that the model reads but does not define.{' '}
        <Rev>
          Metrics other than time and quantity may call for other operators, multiplication for a yield along a path,
          say, or the minimum for a capacity.
        </Rev>{' '}
        Eligibility may also read
        external predicates for an agent&rsquo;s availability and documentation, which the model likewise takes as
        given. Forecasts are estimated from accumulated
        history, so the model gives no cold-start baseline, and a project with no relevant trace would need a
        descriptor-based one to seed them. Forecasts combine across a job&rsquo;s
        steps, and on to the project, under independence, which understates risk where converging paths share a
        source, a boundary the limitations take up.
      </p>
    </>
  );
}
