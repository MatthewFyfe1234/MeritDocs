import { Cite } from '@/components/paper';

export function Positioning() {
  return (
    <>
      <h2>Positioning</h2>
      <p>
        The table below compares TBP with the existing ways in which contribution is judged.
      </p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Supervision (investor-owned firm)</th>
            <th>Peers (cooperative)</th>
            <th>Platform algorithmic management</th>
            <th>TBP</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Who judges</td>
            <td>Supervisors and HR, by delegated authority</td>
            <td>Members, by mutual observation</td>
            <td>The platform</td>
            <td>Computed, against a forecast drawn from the pooled trace</td>
          </tr>
          <tr>
            <td>Who decides</td>
            <td>Supervisors and HR</td>
            <td>Members, collectively</td>
            <td>The platform, by algorithm</td>
            <td>Each party, informed by the trace, with eligibility by explicit rule</td>
          </tr>
          <tr>
            <td>Criteria</td>
            <td>The assessor&rsquo;s own, undisclosed</td>
            <td>Shared norms, informal</td>
            <td>Set by the platform, hidden</td>
            <td>Explicit, fixed by the process commons</td>
          </tr>
          <tr>
            <td>Granularity</td>
            <td>The individual, at periodic review</td>
            <td>The member, informally and as a whole</td>
            <td>The task, per transaction</td>
            <td>The step, per delivery, and any partition of the trace</td>
          </tr>
          <tr>
            <td>Who owns the data</td>
            <td>The organisation</td>
            <td>Held informally by members</td>
            <td>The platform</td>
            <td>One party within an organisation, tending toward shared ownership as the commons spans organisations</td>
          </tr>
          <tr>
            <td>Scale limit</td>
            <td>Supervisors&rsquo; capacity to observe, with losses growing with complexity</td>
            <td>Mutual observation fails as the group grows</td>
            <td>Scales, at the cost of worker control</td>
            <td>Data grows with participation in the commons</td>
          </tr>
          <tr>
            <td>Failure mode</td>
            <td>Favouritism, proxy distortion, gaming</td>
            <td>Free-riding, degeneration</td>
            <td>Surveillance, opaque control</td>
            <td>Inconsistent data, choice of work on unrecorded difficulty, insufficient variation in who uses what, capture of the commons</td>
          </tr>
        </tbody>
      </table>
      <p>
        TBP addresses the principal failings of its closest field, algorithmic management, which directs, evaluates
        and disciplines workers, with criteria hidden in the platform, records held by it, and evaluation confined to
        the worker <Cite id={['kellogg2020', 'rosenblat2016']} />. Eligibility is the one rule TBP applies, with its thresholds and weights explicit and held in the commons.
        Beyond it, TBP evaluates but does not decide. It supplies the
        record against which clients, workers and organisations make their own decisions about selection, pay and
        improvement. Within a single organisation, one party holds the trace,
        as a platform does. As a process commons spans organisations, it tends toward shared ownership of the trace
        (Section 3), whereas a platform&rsquo;s network grows while remaining held by the platform. TBP also evaluates every
        resource, not only the worker, against a defined process.
      </p>
      <p>
        Enterprise resource planning and supply-chain integration also share data across units and organisations.
        They share recorded transactions, not attributed outcomes. They show what was done and what was consumed, but
        not whose contribution produced which result against a forecast.
      </p>
      <p>
        Defining steps at the level of a single performer resembles job design, which separates conflicting
        tasks <Cite id={['holmstrom1991', 'corts2007']} />. In TBP, steps remain linked by the products passed between
        them in a shared trace, not separated by information barriers.
      </p>
    </>
  );
}
