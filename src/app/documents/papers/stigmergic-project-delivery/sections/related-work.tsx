import { Cite, Rev } from '@/components/paper';

export function RelatedWork() {
  return (
    <>
      <h2>Related work</h2>
      <p>
        We position SPD against prior work on two fronts. The first is the three legs it combines, deriving process
        from specification, forecasting from a trace, and coordinating allocation through that same trace, the last
        an instance of Heylighen&rsquo;s stigmergy. The second is the two formalisms it extends, the activity-on-node
        process graph and the classical resource model.
      </p>
      <p>
        <strong>Process derivation from specification.</strong> The idea that process structure should follow from
        product structure, rather than being authored independently, originates with <Cite id="vanderaalst1999" narrative />{' '}
        and was developed into product-based workflow design (PBWD) by Reijers, Limam, and van der Aalst{' '}
        <Cite id="reijers2003" />, who derive a workflow from a product specification and design criteria using
        formal methods. PBWD&rsquo;s product data model fixes a single cost, time, and probability per production
        rule at design time, and cannot represent repeated components. SPD addresses both issues, building on the and/or
        feature tree of <Cite id="kang1990" narrative /> and its later cardinality-based
        extensions <Cite id="czarnecki2005" />. The split between master and project echoes software product line
        engineering, which separates domain engineering, building the reusable space of features and assets, from
        application engineering, deriving a single product from it <Cite id="pohl2005" />. Product lines formalise
        that space and the derivation of a product from it, but they do not record how each derived product&rsquo;s
        work was carried out, by which agents, tools and materials, nor forecast or allocate from that record,
        which is where SPD extends them.
      </p>

      <p>
        <strong>Rolling specification and continuous derivation.</strong> A further limitation of PBWD is temporal
        rather than structural: it derives a workflow once, from a fixed specification, and does not accommodate a
        specification that changes after execution begins. Case handling <Cite id="vanderaalst2005" /> takes the
        opposite stance, deriving what can be done from case data as it arrives rather than from a pre-specified
        control flow, but PBWD&rsquo;s own authors found the two could not be bridged: current case handling could
        not adequately support product-based design <Cite id="vanderfeesten2007" />. SPD does both at once: its
        derivation is continuous, so an extension to the specification during execution extends the derived process
        with it. Section 4 documents this in full.
      </p>

      <p>
        <strong>Network formalisms.</strong> SPD&rsquo;s process graph is best understood as a modified
        Activity-on-Node graph <Cite id="kelley1959" />, where edges are promoted to first-class objects representing
        the products passed between the activities. That typing gives each step a contract, the inputs it consumes
        and the outputs it must produce, which is what an agent takes on and is held to, where a precedence link
        expresses only ordering and so offers nothing to commit to. The typed product is the producer/consumer
        dependency of coordination theory, treated below. It also carries the product&rsquo;s own properties, such
        as the time a crop needs to mature before harvest, which a downstream step reads from the product it
        receives rather than from a lag attached to the link.
      </p>

      <p>
        The graph captures each agent&rsquo;s internal process, not only the hand-offs between agents. Within a job,
        a step&rsquo;s products often pass to the next step rather than crossing to another agent, and the typed
        edge records which, where a precedence link does not.
      </p>

      <p>
        <strong>Resources and agency.</strong> No existing academic resource formalism captures the three-way
        split SPD needs, self-directing agentic resources, tools granted for use, and materials embodied in the
        product: the Resource-Task Network <Cite id={['pantelides1994', 'kondili1993']} /> models materials,
        equipment, and labour within a single uniform abstraction, and multi-agent systems research{' '}
        <Cite id="omicini2008" /> separates autonomous agents from passive artifacts but not materials. The
        closest match is an industry taxonomy rather than an academic one, the six construction-resource subtypes
        Industry Foundation Classes <Cite id="iso16739" /> standardise: IfcLaborResource, IfcCrewResource, and
        IfcSubContractResource fold into agentic; IfcConstructionEquipmentResource is tools; and
        IfcConstructionMaterialResource and IfcConstructionProductResource are materials. In all of them, IFC
        included, labour is a resource the model allocates; SPD&rsquo;s extension is to treat it as an agent rather
        than an allocatable resource.
      </p>

      <p>
        <strong>Trace-based forecasting.</strong> Predictive process monitoring, surveyed by Márquez-Chamorro,
        Resinas, and Ruiz-Cortés <Cite id="marquezchamorro2018" />, forecasts properties of an ongoing process
        instance (remaining time, cost, or outcome) from historical event logs, and has been shown to benefit from
        resource- and workload-specific features. This establishes that forecasting from resource-attributed
        history is well-developed in its own right, but it forecasts within a process it assumes already exists, rather
        than deriving that process. Within project management specifically,
        schedule risk analysis <Cite id={['vanhoucke2009', 'vanhoucke2012', 'vanhoucke2015']} /> measures activity
        and resource sensitivity via Monte Carlo simulation over the network, typically using distributions fitted
        to subjective three-point estimates <Cite id="malcolm1959" /> rather than measured performance of specific
        agents, tools, or materials. Vanhoucke and colleagues have moved this line from expert-estimated inputs
        towards measured history: machine learning trained on past projects <Cite id="wauters2016" /> and
        nearest-neighbour matching against comparable ones <Cite id="wauters2017" /> both forecast from recorded
        outcomes. Matching against comparable projects is reference-class forecasting <Cite id="flyvbjerg2006" />,
        which predicts from the outcomes of past cases similar to the one at hand rather than from expert judgment;
        Batselier and Vanhoucke evaluate it for project management and integrate it with earned value
        management <Cite id={['batselier2016', 'batselier2017']} />, drawing on the empirical project database they
        document <Cite id="batselier2015" />. These methods learn at the level of the project or activity, the
        level their data sits at; but such data is itself hard to come by, the field often leaning on artificial
        data <Cite id="vanhoucke2023" />, and history at the granularity of individual agents, tools, and materials
        is scarcer still. SPD closes this gap by forming the reference class at any level the work is decomposed
        to, from the job down to the individual action, not only the whole project: the finer units recur
        across otherwise-unique projects, so their history accrues as a by-product of execution where sparse,
        rarely-repeated project history does not. Recording at a finer level moves uncertainty toward the
        irreducible aleatory variation that rules out deterministic forecasting <Cite id="derkiureghian2009" />,
        though each finer context also holds fewer matching records, so the gain is a direction of travel rather
        than a floor reached.
      </p>

      <p>
        <strong>Coordination mechanism.</strong> Coordination theory <Cite id="malone1994" /> frames coordination as
        the management of dependencies between activities. The products passed between SPD&rsquo;s steps are its
        producer/consumer dependency, which SPD derives from the product specification and executes, where the theory
        classifies the dependencies of a process already given.
      </p>

      <Rev block>
        <p>
          <strong>Decentralised scheduling.</strong> Scheduling under finite resources is the resource-constrained
          project scheduling problem and its many variants <Cite id="hartmann2022" />. Its decentralised
          multi-project form is the closest to SPD&rsquo;s coordination. Each project is planned by its own agent,
          and the agents coordinate their use of shared resources, by negotiation{' '}
          <Cite id={['homberger2007', 'homberger2012']} /> or by combinatorial auction <Cite id="confessore2007" />.
          There the agents stand for projects, the activities and their durations are given, and resources are
          allocated to them. In SPD the agents are the resources themselves, the steps are derived from the
          specification, and their forecasts are read from the trace. The two can combine, since such a mechanism
          could take SPD&rsquo;s contracts and eligible agents as input, as Section 3 notes of scheduling generally.
        </p>
      </Rev>

      <p>
        Stigmergy, coordination through traces left in a shared medium
        rather than direct instruction, was first described by <Cite id="grasse1959" narrative /> and given formal
        treatment by Heylighen <Cite id={['heylighen2016a', 'heylighen2016b']} />, who defines it through five
        components: action, agent, medium, trace, and coordination. SPD provides the first four: an action is a
        step&rsquo;s execution; agents are the executors; the medium is the process graph; and the trace is the
        record that execution leaves. Stigmergic coordination emerges from these as the resulting self-selection:
        agents are filtered to an eligible set by matching recorded experience against each job&rsquo;s
        requirements, and the forecast attached to the step, drawn from its trace, is the stimulus an eligible
        agent then chooses on, rather than being centrally assigned. One of Heylighen&rsquo;s own illustrations of
        stigmergic coordination among
        humans, programmers self-selecting from a shared, largely independent backlog, demonstrates the same
        underlying principle in its simplest form; SPD extends it to a structurally derived graph of dependent
        steps, each bound by a contract between agent and product, rather than an unstructured or independent
        task.
      </p>

      <p>
        The same coordination mechanism is attested in construction, a domain of structured projects with interdependent
        skillsets rather than isolated tasks. <Cite id="christensen2013" narrative /> observes builders
        coordinating design and site work by acting on the physical evidence of work already accomplished by
        others, rather than through direct instruction. That is the mechanism in its reactive form, the stimulus
        being the realised state of completed work. SPD proposes a structure in which the same principle operates
        anticipatorily, each step carrying a forecast drawn from the trace, so an agent selects on a prediction of
        the step&rsquo;s delivery rather than on the residue of what is already done.
      </p>

      <p>
        Where the same practice has been measured, in software, its informal human form shows clear shortcomings.
        Masood, Hoda, and Blincoe <Cite id={['masood2017', 'masood2021']} /> find that self-assignment in agile
        teams is driven by informal, individually varying preferences, task-based, developer-based, and
        opinion-based; where an agent&rsquo;s own capability is considered at all, it enters as a self-assessed and
        inconsistently applied factor rather than a structured record of demonstrated performance on comparable
        prior work. Estimation is no more reliable: as <Cite id="conoscenti2019" narrative /> find, developer
        inexperience is among the commonly reported causes of inaccurate estimates, and structured reflection on one&rsquo;s own
        completed tasks improves neither estimation accuracy nor the realism of uncertainty assessments, while the
        same feedback about other professionals&rsquo; estimates does make uncertainty assessments more
        realistic <Cite id="jorgensen2009" />. SPD addresses these shortcomings for the structured-project domain
        the construction evidence points to: it replaces self-assessed capability with the trace&rsquo;s record of
        demonstrated performance, and subjective estimates with forecasts measured from it.
      </p>

      <p>
        <strong>Experience-based ranking within eligibility.</strong> Eligibility admits the agents holding a
        job&rsquo;s skillset with enough experience at each of its steps. Among them, experience with the particular
        attributes of the job&rsquo;s steps sets the order of claim. Two agents may share the same
        skillset yet differ in their recorded history against a given descriptor, one having completed several
        prior instances with a specific specialism, the other none. The trace is queried for each eligible
        agent&rsquo;s history of similar prior steps, and the most and best-distributed record is favoured in
        self-selection, rather than the job being centrally assigned. This resembles history-based task assignment in automated bug
        triage <Cite id="anvik2006" />, where candidates within a pre-qualified pool are ranked not by declared
        expertise but by their record of resolving previous instances with matching attributes.
      </p>
    </>
  );
}
