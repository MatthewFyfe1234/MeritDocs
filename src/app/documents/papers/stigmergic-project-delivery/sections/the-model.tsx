import { Figure, M, Eq } from '@/components/paper';
import { MappingFigure, ScalingFigure, ForecastFigure, MasterInstanceFigure } from '../figures';

export function TheModel() {
  return (
    <>
      <h2>The model</h2>
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

      <Eq>{"T = (N,\\ A)"}</Eq>

      <p>
        <strong>Master process.</strong> A directed graph that breaks delivery down into all its possible
        steps. The nodes are the steps; the arcs each carry a product passed between two steps, thereby
        determining their precedence in an acyclic graph. Write it <M>{"G = (N_s, A_{sp})"}</M>: <M>{"N_s"}</M> the
        steps, <M>{"A_{sp}"}</M> the step products, a single step written <M>{"s"}</M>, and an arc <M>{"e = (u, v)"}</M> carrying
        a product from step <M>{"u"}</M> to step <M>{"v"}</M>.
      </p>

      <Eq>{"G = (N_s,\\ A_{sp}) \\qquad e = (u, v) \\in A_{sp}"}</Eq>

      <p>
        A second graph then nominally groups steps by job. Unlike the step
        graph, this one may contain cycles, representing delegation between jobs, as teams and organisations do
        when their responsibilities are mutually dependent. Write it <M>{"G_j = (N_j, A_{jp})"}</M>: <M>{"N_j"}</M> the
        jobs and <M>{"A_{jp}"}</M> the job products. Steps are assigned to jobs by a grouping <M>{"J : N_s \\to N_j"}</M>,
        and a job-arc joins two jobs wherever a product passes between their steps.
      </p>

      <Eq>{"G_j = (N_j,\\ A_{jp}), \\qquad \\colorbox{#ecd98a}{$J : N_s \\to N_j$}"}</Eq>

      <Eq>{"A_{jp} = \\bigl\\{\\, (J(u),\\ J(v)) : (u, v) \\in A_{sp},\\ J(u) \\neq J(v) \\,\\bigr\\}"}</Eq>

      <p>
        <strong>Mapping.</strong> A deterministic association of each node of the master specification with the
        steps in the master process it necessitates: a given product node always necessitates the
        same steps. It fixes which steps a node necessitates, not their order. Write it as a map <M>{"\\mu : N \\to 2^{N_s}"}</M>,
        from spec nodes to the sets of steps they necessitate.
      </p>

      <Eq>{"\\mu : N \\to 2^{N_s}"}</Eq>

      <p>
        <strong>Descriptor.</strong> An attribute attached to a node of the master specification,
        numerical or categorical. A node carries descriptors <M>{"D = (d_1, \\dots, d_k)"}</M>; on an instance
        each takes a value, and the metrics at the steps the node necessitates scale with those values, as the
        forecast below makes precise. A step may be necessitated by more than one node, as an interface between
        two components is; the values conditioning such a step are those of all the nodes that necessitate it,
        taken together.
      </p>

      <p>
        <strong>Derivation.</strong> A project&rsquo;s nodes are a subset <M>{"P \\subseteq N"}</M> of the
        master specification, closed upward so that selecting a node selects its ancestors to the root, with their
        descriptors bound to values. The corresponding part of the master
        process follows through the mapping, the subgraph <M>{"G_P"}</M> it induces on the steps those nodes
        necessitate. The specification can be extended during execution, drawing further subsets the same way.
      </p>

      <Eq>{"\\colorbox{#ecd98a}{$\\displaystyle G_P = G[\\,N_P\\,]$}, \\qquad \\colorbox{#ecd98a}{$\\displaystyle N_P = \\bigcup_{x \\in P} \\mu(x)$}"}</Eq>

      <p>
        <strong>Agent.</strong> A resource that performs steps, as against the tools and materials a step also
        draws on; it holds a set of skillsets <M>{"Q(a)"}</M>, its qualifications.
      </p>

      <p>
        <strong>Eligibility.</strong> An agent is eligible for a step if they hold the skillset it requires.
        That skillset is the one defining the step&rsquo;s job, so <M>{"\\mathrm{req}(s) = J(s)"}</M>; the eligible
        agents are those whose qualifications include it. Eligibility is necessary before an agent can self-select
        the work.
      </p>

      <Eq>{"\\mathrm{Elig}(s) = \\{\\, a : \\mathrm{req}(s) \\in Q(a) \\,\\}"}</Eq>

      <p>
        <strong>Trace.</strong> An accumulating record of execution data, tied to steps and
        covering the agents, tools, materials and outcomes involved. Forecasts and the selection stimulus are drawn from
        it. It persists across projects: a project&rsquo;s forecasts and selection draw on history accumulated
        before it began, and its own execution adds to that history. It is a set of attributed records; each ties
        the metrics <M>{"M = (m_1, \\dots, m_n)"}</M> recorded at a master step <M>{"s"}</M>, under the descriptor
        values <M>{"D"}</M> that held, to the agent <M>{"a"}</M> that executed it, the tools <M>{"t"}</M> and
        materials <M>{"w"}</M> it drew on, and the project instance <M>{"i"}</M> it arose from. Keying on the master
        step is what lets history accumulate across projects.
      </p>

      <Eq>{"\\colorbox{#ecd98a}{$\\displaystyle \\tau = \\bigl\\{\\,(i,\\ s,\\ D,\\ a,\\ t,\\ w,\\ M)\\,\\bigr\\}$}"}</Eq>

      <p>
        <strong>Forecast.</strong> A predicted distribution for a step&rsquo;s metrics, read from the trace.
        Because a descriptor scales the distribution, the forecast conditions on the descriptor values, the step,
        and the resources, not on the descriptors alone: <M>{"M(s) \\sim \\mathcal{D}(\\theta(D), s, a)"}</M>, with <M>{"\\theta"}</M> the
        scaling (its form a modelling choice, left open). As a function of the trace, <M>{"\\mathrm{forecast}(s, D)"}</M> is
        fitted over the records that match the step and lie near those descriptor values.
      </p>

      <Eq>{"M(s) \\,\\sim\\, \\mathcal{D}\\bigl(\\theta(D),\\ s,\\ a\\bigr)"}</Eq>

      <Eq>{"\\mathrm{forecast}(s, D) = \\mathrm{fit}\\,\\bigl\\{\\, M : (i', s, D', a', t', w', M) \\in \\tau,\\ D' \\approx D \\,\\bigr\\}"}</Eq>

      <p>
        <strong>Selection.</strong> Eligible agents self-select on a trace-derived stimulus rather than being
        assigned: the forecast attached to the work, and each agent&rsquo;s recorded performance on comparable
        work. The latter counts an agent&rsquo;s records at the step. The forecast and this count are surfaced side by
        side to inform the agent&rsquo;s choice, not combined into a rule that makes it: the model defines no such
        rule, by design.
      </p>

      <Eq>{"n_a(s) = \\bigl|\\,\\{\\, (i', s', D', a', t', w', M') \\in \\tau : a' = a,\\ s' = s \\,\\} \\,\\bigr|"}</Eq>

      <p>
        <strong>Contract.</strong> The unit offered for self-selection, a job within the derived subgraph: the
        inputs <M>{"\\mathrm{in}(j)"}</M> it draws from outside, the outputs <M>{"\\mathrm{out}(j)"}</M> it
        supplies, and the forecast <M>{"\\varphi(j)"}</M> over its steps. A contract <M>{"C(j)"}</M> is offered to
        every eligible agent and becomes binding on whichever self-selects it.
      </p>

      <Eq>{"C(j) = \\bigl(\\,\\mathrm{in}(j),\\ \\mathrm{out}(j),\\ \\varphi(j)\\,\\bigr)"}</Eq>

      <p>
        Taken together, a project is each of its derived steps with that step&rsquo;s forecast, its eligible agents,
        and the contract of the job it belongs to, offered for self-selection:
      </p>

      <Eq>{"\\mathrm{Project}(P) = \\bigl\\{\\, \\bigl(s,\\ \\mathrm{forecast}(s, D),\\ \\mathrm{Elig}(s),\\ C(J(s))\\bigr) : s \\in N_P \\,\\bigr\\}"}</Eq>

      <p>
        Throughout, <M>{"N"}</M>, <M>{"N_s"}</M> and the agents are taken finite, and the trace <M>{"\\tau"}</M> is
        finite at any point; the step products <M>{"A_{sp}"}</M> are acyclic, while the job graph <M>{"G_j"}</M> may
        cycle.
      </p>

      <h3>Illustration</h3>
      <p>
        Figure 1 draws the model in miniature: a master specification and master process, with the subset one
        project selects, here nodes A and B but not C, picked out through the mapping as the derived subgraph <M>{"G_P"}</M>,
        shown solid against the faded remainder.
      </p>

      <Figure caption="A master specification and master process, with the subset a project selects shown solid and the rest faded: choosing spec nodes A and B, but not C, picks out the corresponding process steps through the mapping (grey). Brown arrows carry the work in progress between a skillset's steps; teal dashed arrows carry the products passed between skillsets. A step follows the one whose output it receives.">
        <MasterInstanceFigure />
      </Figure>

      <p>
        Take a single component of that selected subset, A. It relates deterministically to the steps it
        necessitates, p1 and q2 (the mapping <M>{"\\mu"}</M>); a descriptor on it relates stochastically to the metrics those steps record (the forecast <M>{"M(s) \\sim \\mathcal{D}(\\theta(D), s, a)"}</M>, here reduced to one descriptor and one metric).
        A descriptor is not a node, a distinction that matters for categorical ones: a node may specify a painted
        finish and a descriptor the colour of the paint, the first implying the painting process, the second
        bearing on none. Figures 2 to 4 draw these out in turn, before the worked examples below make them concrete.
      </p>

      <Figure caption="Component A maps deterministically to the steps it necessitates. The mapping is fixed: every instance of the specification that includes A necessitates steps p1 and q2.">
        <MappingFigure />
      </Figure>

      <Figure caption="A descriptor on component A (descriptor x) scales the metrics recorded at each step it necessitates (metric y). The relation is stochastic: descriptor x does not fix metric y but scales the distribution metric y is drawn from.">
        <ScalingFigure />
      </Figure>

      <Figure caption="On a new project the descriptor x is known from the specification, but the metric y is not yet. Because metric y scales with descriptor x (Figure 3), the accumulated (descriptor x, metric y) history fits that relationship, and the forecast reads metric y at the new x off it, as a distribution with a spread rather than a fixed value.">
        <ForecastFigure />
      </Figure>

      <p>
        The figures reduce the forecast to a single descriptor, a single metric, and a straight-line fit, for
        clarity. In practice a step&rsquo;s outcome typically depends on several descriptors at once, and on the agents,
        tools and materials involved, so the fit is multivariate. The estimator itself is not part of the model:
        any method that maps recorded (descriptor, outcome) tuples to a predicted distribution serves, from
        multivariate regression to nearest-neighbour matching or a lightweight neural network, the established
        approaches Section 2 surveys. What the model contributes is the structured, resource-attributed history
        those methods need; turning it into a forecast is a modelling choice left open.
      </p>
    </>
  );
}
