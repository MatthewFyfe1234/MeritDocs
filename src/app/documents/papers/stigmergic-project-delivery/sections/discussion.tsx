import { Rev } from '@/components/paper';

export function Discussion() {
  return (
    <>
      <h2>Discussion and limitations</h2>
      <Rev block>
        <p>
          The model takes over three tasks a management layer otherwise performs by hand. Planning the process falls
          to derivation, since the steps a project needs follow from its selection. Estimating falls to the trace,
          since each step&rsquo;s forecast is read from recorded executions. Assigning work falls to self-selection,
          since a contract is offered to the eligible agents and taken by one of them. What remains for management is
          to set the policy the model reads, the tolerated risk, the experience floors and the pool of agents, and to
          handle what the model leaves out, such as rework and removal. Whether this reduces overhead in practice is
          untested here.
        </p>
      </Rev>
      <p>
        Per-step distributions combine into a job&rsquo;s forecasts, and on to the project, under the assumption that
        the steps are independent. That assumption holds well for a shallow graph with little sharing of sources.
        Where converging paths share a source, one agent or one material batch, their errors are correlated, and the
        independence assumption understates the risk, leaving the forecast at any tolerated risk optimistic. The
        effect grows with the number of paths converging through shared sources, which is to say with the size and
        interconnection of a project. Within the small-to-mid graphs SPD targets it is expected to be slight, and Monte Carlo
        sampling at the source level is the route past it, carrying a shared source through the paths it touches so
        their correlation is preserved<Rev>, with each metric&rsquo;s operators applied to every sample, so the
        maximum where paths converge carries no merge bias either</Rev>. That route needs a trace attributed at the source level and is untested
        here. Independence can fail from the specification side too, where co-selected nodes interact, a roof with
        both a turret and a bay window being harder than either alone. The forecast captures this by conditioning on
        the combination where the trace holds such records, but those grow sparse as combinations multiply, and
        without them it falls back to an additive approximation that under-predicts interacting selections.
      </p>
      <p>
        A second limitation is that derivation is additive. Extending the specification only adds nodes, and a
        selection that arrives after the steps it feeds have run, an extra socket after plastering, say, forces
        rework the model gives no account of. Nor can it express removal. Switching between alternatives in the specification, a slab foundation for blockwork, say,
        or a change order that replaces part of the product, removes nodes, and an additive model has no operation
        for it.
      </p>
      <p>
        A third limitation is the granularity of the contract. A job is offered and taken whole, by one agent.{' '}
        <Rev>
          The model does not divide a job&rsquo;s steps among agents, one agent taking some of its steps and another
          the rest, nor fix the order in time of a job&rsquo;s independent workflows, which share the job&rsquo;s
          skillset but have no precedence between them. Nor does it pass a job from one agent to another partway
          through. These concern how work is arranged within a job, which the paper leaves aside. Across jobs, steps
          run concurrently wherever the process allows.
        </Rev>
      </p>
    </>
  );
}
