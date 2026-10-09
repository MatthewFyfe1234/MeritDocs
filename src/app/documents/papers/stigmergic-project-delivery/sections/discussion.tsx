export function Discussion() {
  return (
    <>
      <h2>Discussion and limitations</h2>
      <p>
        Aggregating measured distributions along the revealed structure, as the worked example does, assumes the
        metrics at different steps are independent; where paths converge on a shared downstream
        step, that assumption does not hold, and the aggregation must account for the dependence rather than
        ignore it. The worked forecasts are all per-step, and none aggregates across a merge: where the process
        graphs do converge, at the sheathed panel&rsquo;s Sheathing step and the patient&rsquo;s Resection, the
        forecasts stop short of combining the incoming distributions. This case is acknowledged rather than
        resolved here; treating it properly is future work.
      </p>
      <p className="paper-todo">TODO. Further limitations to add.</p>
    </>
  );
}
