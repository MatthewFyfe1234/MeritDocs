import { Cite, Figure, M, Rev } from '@/components/paper';
import { MasterMapFigure, PatientMasterFigure, AnaesthesiaForecastFigure, FrameDiagram, AssemblyTimeline, minimalWoodMm, minimalNails } from '../figures';

export function WorkedExamples() {
  return (
    <>
      <h2>Worked examples</h2>
      <p>
        We work two examples, a light-timber wall-frame panel and one in patient care. The second brings in three
        things the wall-frame example does not. The specification is extended during execution, the metric is an
        outcome relative to a dose of medication rather than time, and the setting is a second industry.
      </p>

      <h3>Wall-frame panel</h3>
      <p>
        The example is a light-timber wall-frame panel, optionally sheathed, delivered across the designer,
        machinist, and fabricator skillsets. The designer passes a cutting list to the machinist and a fabrication
        drawing to the fabricator, and the machinist passes framing members and sheathing panels to the
        fabricator. Figure 5 shows only the panel&rsquo;s selection <M>{"P"}</M> and its process <M>{"G_P"}</M>, not
        the masters in full. Numbers are illustrative, chosen to exercise the arithmetic, not measured.
      </p>

      <Figure caption="The panel's product tree and derived process, drawn as in Figure 1. The tinted elements are the Sheathing node and the steps it necessitates, present only when it is selected.">
        <MasterMapFigure />
      </Figure>

      <p>
        We now focus on the fabricator, who receives the machinist&rsquo;s framing members and the
        designer&rsquo;s fabrication drawing and assembles the members to that drawing.
      </p>

      <h4>Panel 1: the base frame</h4>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', margin: '1rem 0' }}>
        <div style={{ flex: '1 1 55%' }}>
          <FrameDiagram widthMm={1200} fill />
        </div>
        <p style={{ flex: '1 1 45%', margin: 0 }}>
          This specification resolves to 2 rails (horizontal) and 3 studs (vertical), 5 members, mapped to three fixed
          steps, marking, layout and nailing. Rails run the panel&rsquo;s width, and studs are cut to wall height.
        </p>
      </div>
      <table>
        <thead><tr><th>Quantity</th><th>Minimal (from spec)</th><th>Recorded</th></tr></thead>
        <tbody>
          <tr><td>Wood</td><td>{minimalWoodMm(1200)}mm (2&times;1200 + 3&times;2376)</td><td>9710mm (+182mm waste, 1.9%)</td></tr>
          <tr><td>Nails</td><td>{minimalNails(1200)} (4 per stud)</td><td>13 (+1 misfire)</td></tr>
          <tr><td>Time</td><td>&mdash;</td><td>4.0 min</td></tr>
          <tr><td>Energy</td><td>&mdash;</td><td>0.55 kWh</td></tr>
        </tbody>
      </table>
      <AssemblyTimeline
        T={240}
        endLabel="4.0 min"
        nails={[120, 128, 141, 149, 163, 172, 178, 191, 205, 212, 224, 233, 240]}
        steps={[{ label: 'mark out', end: 60, rev: true }, { label: 'lay out', end: 120, rev: true }, { label: 'nail frame', end: 240, measured: true, rev: true }]}
      />
      <p>
        Only the nailing step signals directly. Telemetry records all 13 nails fired at fairly regular intervals,
        which bounds that step&rsquo;s duration. Marking and layout emit no signal, so the time before the first
        nail is attributed to them, split evenly for want of anything finer.
      </p>
      <p>
        The minimal wood is fixed by the specification, and the recorded figure is what the panel consumed against
        it. The offcut making up the difference arises upstream at cutting rather than at assembly, so it is booked
        to the panel here rather than treated as the fabricator&rsquo;s own outcome.
      </p>

      <h4>Panel 2: a wider frame</h4>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', margin: '1rem 0' }}>
        <div style={{ flex: '1 1 55%' }}>
          <FrameDiagram widthMm={1800} fill />
        </div>
        <p style={{ flex: '1 1 45%', margin: 0 }}>
          Panel width is the descriptor here. At 1800mm the specification resolves to 4 studs. Crossing a stud-spacing
          threshold adds a member, a cardinality-based extension rather than a value change on an existing
          component <Cite id="czarnecki2005" />. Width also scales the quantities, though not exactly, so it bears
          on the metric in both ways, in the member count and in what each member consumes.
        </p>
      </div>
      <table>
        <thead><tr><th>Quantity</th><th>Minimal (from spec)</th><th>Recorded</th><th>Panel 1 scaled to this panel</th></tr></thead>
        <tbody>
          <tr><td>Wood</td><td>{minimalWoodMm(1800)}mm (2&times;1800 + 4&times;2376)</td><td>13342mm (+238mm, 1.8%)</td><td>+250mm</td></tr>
          <tr><td>Nails</td><td>{minimalNails(1800)} (4 per stud)</td><td>18 (+2 misfires)</td><td>+1.3</td></tr>
          <tr><td>Time</td><td>&mdash;</td><td>5.3 min</td><td>5.3 min</td></tr>
          <tr><td>Energy</td><td>&mdash;</td><td>0.71 kWh</td><td>0.73 kWh</td></tr>
        </tbody>
      </table>
      <AssemblyTimeline
        T={318}
        endLabel="5.3 min"
        nails={[138, 148, 157, 169, 176, 188, 199, 205, 218, 227, 236, 249, 258, 266, 279, 291, 303, 318]}
        steps={[{ label: 'mark out', end: 69, rev: true }, { label: 'lay out', end: 138, rev: true }, { label: 'nail frame', end: 318, measured: true, rev: true }]}
      />
      <p>
        The last column scales Panel 1&rsquo;s figures to this panel, wood and nails by their minimums, and time and
        energy by stud count (&times;4/3), since framing effort tracks the members worked, as Panel 3 sets out.
        Recorded values sit close to these but not exactly on them, since panel width scales the metrics without
        fixing them, as Figure 3 shows.
      </p>

      <h4>Panel 3: forecasting the next frame</h4>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', margin: '1rem 0' }}>
        <div style={{ flex: '1 1 55%' }}>
          <FrameDiagram widthMm={1500} sheathed fill />
        </div>
        <p style={{ flex: '1 1 45%', margin: 0 }}>
          1500mm, 4 studs, sheathed. <Rev>Where Panel 2&rsquo;s extra stud scaled metrics already present in
          Panel 1, Panel 3&rsquo;s sheathing necessitates further steps, cutting the sheathing and fixing it.</Rev> All <Rev>four of the fabricator&rsquo;s
          steps</Rev> are known from the specification with certainty. What the trace forecasts is the wastage on
          top of minimal quantities, and time and energy in full.
        </p>
      </div>
      <p>
        Wood and nail wastage are pooled across every prior frame. Time and energy condition on stud count rather
        than width, since framing effort tracks the number of members worked rather than their length, so only
        Panel 2, matching at 4 studs, is used.
      </p>
      <table>
        <thead><tr><th>Quantity</th><th>Minimal (from spec)</th><th>Forecast basis</th><th>Forecast</th></tr></thead>
        <tbody>
          <tr>
            <td>Wood</td>
            <td>{minimalWoodMm(1500)}mm (2&times;1500 + 4&times;2376)</td>
            <td>pooled waste rate across Panels 1 and 2 &asymp; 1.86%</td>
            <td>&asymp;12780mm at <i>r</i> = 0.9 (centred &asymp;12737mm, +233mm)</td>
          </tr>
          <tr>
            <td>Nails</td>
            <td>{minimalNails(1500)} (4 per stud)</td>
            <td>pooled misfire rate across Panels 1 and 2: (1+2) / (12+16) &asymp; 10.7%</td>
            <td>&asymp;18 (+2)</td>
          </tr>
          <tr>
            <td>Time (framing)</td>
            <td>&mdash;</td>
            <td>Panel 2 only (matching stud count)</td>
            <td>&asymp;5.3 min</td>
          </tr>
          <tr>
            <td>Energy (framing)</td>
            <td>&mdash;</td>
            <td>Panel 2 only (matching stud count)</td>
            <td>&asymp;0.71 kWh</td>
          </tr>
          <tr>
            <td><Rev>Fix Sheathing</Rev> (time, energy)</td>
            <td>&mdash;</td>
            <td>no matching prior execution</td>
            <td>no forecast yet</td>
          </tr>
        </tbody>
      </table>
      <p>
        The pooled waste rate carries a spread, so wood has a distribution in the sense of Figure 4, centred near
        12737mm. At a tolerated risk of <i>r</i> = 0.9 the forecast reads its 90th percentile, about 12780mm. The
        other rows show only the centre, for brevity. <Rev>The history is kept to two frames so the arithmetic can
        be followed by hand, and is not representative of the history a forecast would draw on in practice.</Rev>
      </p>
      <p>
        <Rev>Fixing the sheathing has no forecast yet, since no earlier frame like this one has been sheathed.
        Existing heuristic rules can stand in until enough executions are recorded.</Rev>
      </p>

      <h4>Panel 4: the contract offered to eligible workers</h4>
      <p>
        The fabricator&rsquo;s job is offered as one contract. Its inputs are the machinist&rsquo;s framing members
        and sheathing panels and the designer&rsquo;s fabrication drawing, its output is the panel, and its forecasts
        combine the framing steps&rsquo; distributions. The wood offcut stays outside it, booked to the panel as
        Panel 1 set out. With the fabricator qualification assumed for this pool, eligibility turns on the
        experience floor at each step of the job.
      </p>
      <table>
        <thead><tr><th>Contract</th><th>Fabricator&rsquo;s job</th></tr></thead>
        <tbody>
          <tr><td>Inputs</td><td>framing members, sheathing panels, fabrication drawing</td></tr>
          <tr><td>Output</td><td>sheathed panel</td></tr>
          <tr><td>Forecasts</td><td>framing &asymp;18 nails, &asymp;5.3 min, &asymp;0.71 kWh (centres), sheathing none yet</td></tr>
        </tbody>
      </table>
      <table>
        <thead><tr><th>Step</th><th>Experience floor</th></tr></thead>
        <tbody>
          <tr><td><Rev>Mark Out</Rev></td><td>&ge;5 recorded instances</td></tr>
          <tr><td><Rev>Lay Out</Rev></td><td>&ge;5 recorded instances</td></tr>
          <tr><td><Rev>Nail Frame</Rev></td><td>&ge;20 recorded framing instances</td></tr>
          <tr><td><Rev>Fix Sheathing</Rev></td><td>&ge;5 recorded sheathing instances</td></tr>
        </tbody>
      </table>
      <p>
        The floors are illustrative. Sheathing done on other product lines counts toward an agent&rsquo;s exposure at
        that step, so an agent can clear its floor here even though none of those records lies near enough to this
        panel to forecast it.
      </p>

      <h3>Patient care (illustrative)</h3>
      <p>
        In principle, the master specification covers the whole of clinical practice, rooted at the patient, whose
        descriptors, age, weight, ASA grade, attach to that root. Figures 6 to 8 show only a small fragment of it,
        around this case. A patient calls the clinic. The receptionist opens the case and,
        establishing that the complaint is abdominal, selects the abdominal region beneath the patient, with
        nothing further selected yet. That selection maps to an initial consult, in which the receptionist books
        the appointment and the GP assesses the patient (Figure 6).
      </p>

      <Figure caption="A fragment of the master specification and master process around this case, drawn as in Figure 1. The patient root carries the descriptors.">
        <PatientMasterFigure stage={0} />
      </Figure>

      <p>
        Examining the patient, the GP localises the pain to the biliary system and selects that organ, one level
        deeper. The deeper selection necessitates a further step, an ultrasound to image the organ, and the
        GP&rsquo;s consult extends to match (Figure 7). Nothing was added to the master. The biliary node was
        always there, and the assessment is what selected it.
      </p>

      <Figure caption="The GP's assessment selects the biliary node, which necessitates the ultrasound.">
        <PatientMasterFigure stage={1} />
      </Figure>

      <p>
        The ultrasound identifies gallstones, selecting the issue beneath the biliary organ. That selection reaches
        two skillsets the consult did not, the surgeon and the anaesthetist, and the process grows to match
        (Figure 8). This is the model&rsquo;s central move, and the same rule throughout. Each step&rsquo;s finding,
        its <M>{"\\sigma(s)"}</M>, deepens the specification, and the deeper specification necessitates the next steps. The process progresses
        because the selection deepened, not because a plan was drawn. The order is inherited, so the booking,
        assessment and imaging already done stand.
      </p>

      <Figure caption="Imaging selects the gallstone node, which necessitates the surgeon's and anaesthetist's steps.">
        <PatientMasterFigure stage={2} />
      </Figure>

      <p>
        The induction brings in metrics the wall-frame example does not. It consumes a material, the anaesthetic
        drug, whose dose is recorded like any material quantity. Its outcome is measured not by time but by the
        largest fall in blood pressure after the drug is given. Eligibility gates the anaesthetist&rsquo;s job, and
        because cases vary widely, by weight, ASA grade and the like, exposure counted over comparable cases matters
        more here than raw case count.
      </p>

      <p>
        Executing the step, the anaesthetist draws on that history to set the dose. For this patient&rsquo;s
        descriptors, the prior cases that match relate the dose given to the pressure drop that followed, showing
        which doses held blood pressure and which let it fall too far. The anaesthetist settles on a dose whose
        forecast drop, read at the tolerated risk, stays within a safe range (Figure 9). As in the wall frame, the
        distribution&rsquo;s spread is the risk being weighed, and the forecast is read from it at that risk. The
        fit is observational. The doses in the trace were chosen by clinicians for the patients in front of them,
        frailer patients receiving less, so the relation it shows is confounded by indication and cannot be read as
        the effect of a dose. Conditioning on age, weight and ASA grade narrows this without removing it, so the
        forecast informs the anaesthetist&rsquo;s choice rather than setting it.
      </p>

      <Figure caption="The anaesthetist's induction forecast, drawn as in Figure 4, with the dose given against the fall in blood pressure for prior cases with matching descriptors. The dotted line is the safe limit.">
        <AnaesthesiaForecastFigure />
      </Figure>

      <p>
        This is where the delivered process shows itself as a live set of instructions rather than a plan fixed in
        advance. It updates mid-execution, reactive to the conditions found on the ground. Opening the field, the
        surgeon finds a stone in the common bile duct that the ultrasound missed, selecting a duct-clearance node
        that was always in the master but not indicated until now. The surgeon&rsquo;s process gains an exploration
        step and the anaesthetist&rsquo;s maintenance extends to match, mid-procedure. The update is not only
        structural: the newly selected node binds a descriptor, a now-compromised liver, and reading it the
        anaesthetist selects cisatracurium, which clears independently of the liver, in place of the default, a
        choice of material made at execution rather than fixed by the mapping.
        The order already set stands, the steps already completed hold, and nothing returns to the GP.
      </p>
    </>
  );
}
