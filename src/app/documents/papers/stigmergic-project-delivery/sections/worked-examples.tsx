import { Cite, Figure } from '@/components/paper';
import { MasterMapFigure, PatientMasterFigure, AnaesthesiaForecastFigure, FrameDiagram, AssemblyTimeline, minimalWoodMm, minimalNails } from '../figures';

export function WorkedExamples() {
  return (
    <>
      <h2>Worked examples</h2>
      <p>
        We work two examples: a light-timber wall-frame panel and one in patient care. The
        second brings in three things the wall-frame example does not: extension of the specification during
        execution; a different kind of metric (an outcome relative to a dose of medication rather than time); and a
        second industry.
      </p>

      <h3>Wall-frame panel</h3>
      <p>
        The example is a light-timber wall-frame panel, delivered across the designer, machinist, and fabricator
        skillsets, with products passing between them. Numbers are illustrative, chosen to exercise the
        arithmetic, not measured.
      </p>

      <Figure caption="The sheathed panel: product tree on the left, derived process on the right in skillset lanes. Grey links are the mapping, which steps each product node necessitates (Sheathing's, tinted, appear only when it is selected). The products passed between skillsets are the designer's cutting list and fabrication drawing, the machinist's framing members and sheathing panels. The panels below zoom into the fabricator's contract.">
        <MasterMapFigure />
      </Figure>

      <p>
        We now focus on the fabricator, who receives the machinist&rsquo;s pre-cut elements and the
        designer&rsquo;s assembly drawing and assembles the elements to that drawing.
      </p>

      <h4>Panel 1: the base frame</h4>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', margin: '1rem 0' }}>
        <div style={{ flex: '1 1 55%' }}>
          <FrameDiagram widthMm={1200} fill />
        </div>
        <p style={{ flex: '1 1 45%', margin: 0 }}>
          This specification resolves to 2 rails (horizontal) and 3 studs (vertical), 5 members, mapped to three fixed steps: marking,
          layout, nailing. Rails run the panel&rsquo;s width; studs are cut to wall height.
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
        steps={[{ label: 'marking', end: 60 }, { label: 'layout', end: 120 }, { label: 'nailing', end: 240, measured: true }]}
      />
      <p>
        Only the nailing step signals directly: telemetry records all 13 nails fired at fairly regular intervals,
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
          Panel width is the descriptor here. At 1800mm the specification resolves to 4 studs: crossing a stud-spacing
          threshold adds a member, a cardinality-based extension rather than a value change on an existing
          component <Cite id="czarnecki2005" />. Width also scales the quantities, though not exactly, so it bears
          on the metric in both ways, in the member count and in what each member consumes.
        </p>
      </div>
      <table>
        <thead><tr><th>Quantity</th><th>Minimal (from spec)</th><th>Recorded</th><th>If scaled linearly from Panel 1</th></tr></thead>
        <tbody>
          <tr><td>Wood</td><td>{minimalWoodMm(1800)}mm (2&times;1800 + 4&times;2376)</td><td>13342mm (+238mm, 1.8%)</td><td>+250mm</td></tr>
          <tr><td>Nails</td><td>{minimalNails(1800)} (4 per stud)</td><td>18 (+2 misfires)</td><td>+1.3</td></tr>
          <tr><td>Time</td><td>&mdash;</td><td>5.3 min</td><td>5.5 min</td></tr>
          <tr><td>Energy</td><td>&mdash;</td><td>0.71 kWh</td><td>0.76 kWh</td></tr>
        </tbody>
      </table>
      <AssemblyTimeline
        T={318}
        endLabel="5.3 min"
        nails={[138, 148, 157, 169, 176, 188, 199, 205, 218, 227, 236, 249, 258, 266, 279, 291, 303, 318]}
        steps={[{ label: 'marking', end: 69 }, { label: 'layout', end: 138 }, { label: 'nailing', end: 318, measured: true }]}
      />
      <p>
        Recorded values sit close to, but not exactly on, a linear scaling of Panel 1: panel width scales the
        metric but does not fix it, as Figure 3 shows.
      </p>

      <h4>Panel 3: forecasting the next frame</h4>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', margin: '1rem 0' }}>
        <div style={{ flex: '1 1 55%' }}>
          <FrameDiagram widthMm={1500} sheathed fill />
        </div>
        <p style={{ flex: '1 1 45%', margin: 0 }}>
          1500mm, 4 studs, sheathed. Sheathing is an optional feature: the mapping adds its step only where the
          component is selected, unlike Panel 2&rsquo;s extra stud, a cardinality change to an existing step. All
          four steps are known from the specification with certainty; what the trace forecasts is the wastage on
          top of minimal quantities, and time and energy in full. Sheathing, though, has no recorded history, so
          unlike framing it has no trace-based forecast yet.
        </p>
      </div>
      <p>
        Wood and nail wastage are pooled across every prior frame; time and energy condition on stud count rather
        than width, since framing effort tracks the number of members worked rather than their length, so only
        Panel 2 (matching at 4 studs) is used.
      </p>
      <table>
        <thead><tr><th>Quantity</th><th>Minimal (from spec)</th><th>Forecast basis</th><th>Forecast</th></tr></thead>
        <tbody>
          <tr>
            <td>Wood</td>
            <td>{minimalWoodMm(1500)}mm (2&times;1500 + 4&times;2376)</td>
            <td>pooled waste rate across Panels 1 and 2 &asymp; 1.86%</td>
            <td>&asymp;12737mm (+233mm); 90% within 12690&ndash;12790mm</td>
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
            <td>Sheathing (time, energy)</td>
            <td>&mdash;</td>
            <td>no prior execution recorded</td>
            <td>no forecast yet</td>
          </tr>
        </tbody>
      </table>
      <p>
        The wood forecast is given as an interval, not a bare point: the pooled waste rate carries a spread, so the
        forecast is a distribution in the sense of Figure 4, and that spread is the risk it attaches. The other
        rows are shown as point values for brevity.
      </p>
      <p>
        Sheathing has no trace-based forecast: the specification places the step, but the trace says nothing yet
        about what it costs. A descriptor-based baseline could seed a forecast before any execution, but that is
        outside this example.
      </p>

      <h4>Panel 4: the contract offered to eligible workers</h4>
      <p>
        Required steps and their forecasts are bundled for self-selection. Eligibility and forecast draw on
        different parts of the trace: eligibility on whether an agent has done a step at all; forecast on what to
        expect once they do.
      </p>
      <table>
        <thead><tr><th>Step</th><th>Estimate attached</th><th>Eligibility threshold</th></tr></thead>
        <tbody>
          <tr><td>Marking</td><td>&mdash;</td><td>&ge;5 recorded instances</td></tr>
          <tr><td>Layout</td><td>&mdash;</td><td>&ge;5 recorded instances</td></tr>
          <tr><td>Nailing</td><td>&asymp;12737mm wood, &asymp;18 nails, &asymp;5.3 min, &asymp;0.71 kWh</td><td>&ge;20 recorded framing instances</td></tr>
          <tr><td>Sheathing</td><td>no forecast yet</td><td>&ge;5 recorded sheathing instances</td></tr>
        </tbody>
      </table>
      <p>
        The thresholds are illustrative. An agent eligible for sheathing on other product lines is still eligible
        here even without a forecast for this exact combination, as the Definitions set out.
      </p>

      <h3>Patient care (illustrative)</h3>
      <p>
        The master specification is the whole of clinical practice, rooted at the patient, whose descriptors, age,
        weight, ASA grade, attach to that root. A patient calls the clinic; the receptionist opens the case and,
        establishing that the complaint is abdominal, selects the abdominal region beneath the patient, with
        nothing further selected yet. That selection maps to an initial consult: the receptionist books the
        appointment and the GP assesses the patient (Figure 6). Almost the entire master is unselected, shown
        faded.
      </p>

      <Figure caption="One master specification and master process, shown in full with unselected parts faded. The tree is rooted at the patient, which carries the descriptors; the receptionist's triage selects the abdominal region beneath it, and through the mapping (grey) that picks out the receptionist's booking and the GP's assessment, with the appointment passed between them.">
        <PatientMasterFigure stage={0} />
      </Figure>

      <p>
        Examining the patient, the GP localises the pain to the biliary system and selects that organ, one level
        deeper. The deeper selection necessitates a further step, an ultrasound to image the organ, and the
        GP&rsquo;s consult extends to match (Figure 7). Nothing was added to the master: the biliary node was
        always there; the assessment is what selected it.
      </p>

      <Figure caption="The GP's assessment has localised the complaint to the biliary organ, one level deeper in the same master, and selecting it necessitates the ultrasound. Only the selection, and the step it induces, are new since the previous figure.">
        <PatientMasterFigure stage={1} />
      </Figure>

      <p>
        The ultrasound identifies gallstones, selecting the issue beneath the biliary organ. That selection reaches
        two skillsets the consult did not, the surgeon and the anaesthetist, and the process grows to match
        (Figure 8). This is the model&rsquo;s central move, and the same rule throughout: each step&rsquo;s finding
        deepens the specification, and the deeper specification necessitates the next steps. The process progresses
        because the selection deepened, not because a plan was drawn; the order is inherited, so the booking,
        assessment and imaging already done stand.
      </p>

      <Figure caption="Imaging confirms the gallstone issue beneath the biliary organ, and selecting it reaches the surgeon and anaesthetist. The whole progression, booking to treatment, is deepening selection into one fixed master.">
        <PatientMasterFigure stage={2} />
      </Figure>

      <p>
        The induction brings in metrics the wall-frame example does not. It consumes a material, the anaesthetic
        drug, whose dose is recorded like any material quantity; and its outcome is measured not by time but by the
        largest fall in blood pressure after the drug is given. Eligibility gates the step: an anaesthetist
        self-selects only with a record of comparable cases, and because such cases vary widely, weight, ASA grade
        and the like, matching on that specific prior experience matters more here than raw case count.
      </p>

      <p>
        Executing the step, the anaesthetist draws on that history to set the dose. For this patient&rsquo;s
        descriptors, the prior cases that match relate the dose given to the pressure drop that followed, showing
        which doses held blood pressure and which let it fall too far; the anaesthetist settles on a dose whose
        predicted drop stays within a safe range (Figure 9). As in the wall frame, the prediction is a distribution
        with a spread, not a single value, and that spread is the risk being weighed.
      </p>

      <Figure caption="The anaesthetist's induction forecast, the patient-care counterpart of Panel 3. Among prior cases with matching descriptors, age, weight, ASA grade, the dose given, a recorded material, relates to the resulting fall in blood pressure; the anaesthetist reads which doses held pressure and chooses one whose predicted drop stays within a safe range, shown as a distribution with a spread.">
        <AnaesthesiaForecastFigure />
      </Figure>

      <p>
        This is where the delivered process shows itself as a live set of instructions rather than a plan fixed in
        advance: it updates mid-execution, reactive to the conditions found on the ground. Opening the field, the
        surgeon finds a stone in the common bile duct that the ultrasound missed, selecting a duct-clearance node
        that was always in the master but not indicated until now; the surgeon&rsquo;s process gains an exploration
        step and the anaesthetist&rsquo;s maintenance extends to match, mid-procedure. The update is not only
        structural: the newly selected node binds a descriptor, a now-compromised liver, and reading it the
        anaesthetist self-selects cisatracurium, which clears independently of the liver, in place of the default.
        The order already set stands, the steps already completed hold, and nothing returns to the GP.
      </p>
    </>
  );
}
