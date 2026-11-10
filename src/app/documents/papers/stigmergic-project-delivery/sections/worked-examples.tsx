import { Cite, Figure, M, Rev } from '@/components/paper';
import { MasterMapFigure, PatientMasterFigure, AnaesthesiaForecastFigure, FrameDiagram, AssemblyTimeline, minimalNails } from '../figures';

export function WorkedExamples() {
  return (
    <>
      <h2>Worked examples</h2>
      <p>
        We work two examples, a light-timber wall-frame panel and one in patient care. The second brings in <Rev minor>five</Rev>{' '}
        things the wall-frame example does not. The specification is extended during execution, <Rev>a step repeats within a project,</Rev> the metric is an
        outcome relative to a dose of medication rather than time, <Rev>the trace is drawn from clinical documentation
        rather than telemetry,</Rev> and the setting is a second industry.
      </p>

      <h3>Wall-frame panel</h3>
      <p>
        The example is a light-timber wall-frame panel<Rev minor> (Figure 5)</Rev>, optionally sheathed, delivered across the designer,
        machinist, and fabricator skillsets. The designer <Rev>receives the panel&rsquo;s specification and</Rev> passes a cutting list to the machinist and a fabrication
        drawing to the fabricator, and the machinist passes framing members and sheathing panels to the
        fabricator<Rev>, who delivers the panel</Rev>. <Rev>Each project below delivers one panel, forecast from the
        trace the earlier ones left.</Rev> Numbers are illustrative, chosen to exercise the arithmetic, not measured.
      </p>

      <Figure caption={<><Rev>The selection for Projects 1 and 2, below, drawn on the master specification and master process for wall-frame panels as in Figure 1. Project 3&rsquo;s selection (not shown) would also include the faded elements.</Rev></>}>
        <MasterMapFigure />
      </Figure>

      <p>
        <Rev>The rest of the example follows the fabricator</Rev>, who receives the machinist&rsquo;s framing
        members and the designer&rsquo;s fabrication drawing and assembles the members to that drawing.{' '}
        <Rev>The designer&rsquo;s and machinist&rsquo;s steps are traced, forecast and contracted in the same way.</Rev>
      </p>

      <h4><Rev minor>Project 1: a first frame</Rev></h4>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', margin: '1rem 0' }}>
        <div style={{ flex: '1 1 55%' }}>
          <FrameDiagram widthMm={1200} fill />
        </div>
        <p style={{ flex: '1 1 45%', margin: 0 }}>
          This specification, <Rev>1200mm wide with studs at 600mm centres,</Rev> resolves to 2 rails (horizontal) and 3 studs (vertical), 5 members, <Rev>assembled into the panel in four fixed
          steps (Mark Out, Lay Out, Nail Frame and Stack Panel)</Rev>. <Rev>The stud count is a descriptor derived from
          the width and the spacing (in the spirit of cardinality-based extensions <Cite id="czarnecki2005" />).</Rev>
        </p>
      </div>
      <table>
        <thead><tr><th>Quantity</th><th>Minimal (from spec)</th><th>Recorded</th></tr></thead>
        <tbody>
          <tr><td>Nails</td><td>{minimalNails(1200)} (4 per stud)</td><td>13 (<Rev minor>incl. 1 wasted</Rev>)</td></tr>
          <tr><td>Time</td><td>&mdash;</td><td><Rev>4.9</Rev> min</td></tr>
          <tr><td>Energy<Rev minor> (Nail Frame)</Rev></td><td>&mdash;</td><td><Rev>0.12</Rev> kWh</td></tr>
        </tbody>
      </table>
      <AssemblyTimeline
        T={294}
        nails={[120, 128, 136, 144, 152, 160, 193, 201, 209, 217, 224, 232, 240]}
        steps={[{ label: 'Mark Out', end: 60, rev: true }, { label: 'Lay Out', end: 120, rev: true }, { label: 'Nail Frame', end: 240, measured: true, rev: true }, { label: 'Stack Panel', end: 294, isNew: true }]}
      />
      <p>
        Only <Rev minor>Nail Frame</Rev> signals directly. <Rev minor>In this example, telemetry</Rev> records all 13 nails fired,
        which bounds that step&rsquo;s duration<Rev>, and the foreman notes when the job starts and ends</Rev>.{' '}
        <Rev minor>Mark Out and Lay Out</Rev> emit no signal, so the time <Rev minor>from the job&rsquo;s start to</Rev> the first
        nail is attributed to them, split evenly for want of anything finer. <Rev>Stack Panel runs from the last nail
        to the job&rsquo;s end.</Rev>
      </p>
      <p>
        <Rev>The minimal nails are fixed by the specification, and the extra nail is what the step consumed beyond
        them, recorded by the tool. A pause in the signals suggests the gun jammed and was cleared. Wood is consumed upstream, and its offcut is recorded at the machinist&rsquo;s Cut
        Framing step.</Rev>
      </p>

      <h4><Rev minor>Project 2</Rev>: a wider frame</h4>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', margin: '1rem 0' }}>
        <div style={{ flex: '1 1 55%' }}>
          <FrameDiagram widthMm={1800} fill />
        </div>
        <p style={{ flex: '1 1 45%', margin: 0 }}>
          Panel width is the descriptor <Rev minor>that varies</Rev> here. At 1800mm the specification resolves to 4 studs. Crossing a stud-spacing
          threshold adds a member<Rev>, raising the derived stud count</Rev>.
        </p>
      </div>
      <table>
        <thead><tr><th>Quantity</th><th>Minimal (from spec)</th><th>Recorded</th><th><Rev minor>Project 1</Rev> scaled to this panel</th></tr></thead>
        <tbody>
          <tr><td>Nails</td><td>{minimalNails(1800)} (4 per stud)</td><td>18 (<Rev minor>incl.</Rev> 2 misfires)</td><td><Rev minor>17.3</Rev></td></tr>
          <tr><td>Time</td><td>&mdash;</td><td><Rev>6.6</Rev> min</td><td><Rev>6.7</Rev> min</td></tr>
          <tr><td>Energy<Rev minor> (Nail Frame)</Rev></td><td>&mdash;</td><td><Rev>0.18</Rev> kWh</td><td><Rev>0.16</Rev> kWh</td></tr>
        </tbody>
      </table>
      <AssemblyTimeline
        T={396}
        nails={[144, 154, 164, 175, 183, 194, 205, 212, 225, 234, 244, 256, 266, 275, 289, 302, 315, 330]}
        steps={[{ label: 'Mark Out', end: 72, rev: true }, { label: 'Lay Out', end: 144, rev: true }, { label: 'Nail Frame', end: 330, measured: true, rev: true }, { label: 'Stack Panel', end: 396, isNew: true }]}
      />
      <p>
        The last column scales <Rev minor>Project 1&rsquo;s</Rev> figures to this panel<Rev>, step by step. Nails scale by
        their minimum. Mark Out, Lay Out and Nail Frame scale by stud count (&times;4/3), since their effort tracks the
        number of members worked rather than their length. Stack Panel scales by width (&times;1.5), since a wider
        panel is heavier to move.</Rev> <Rev>The difference between the scaled and recorded values is partly chance, which no forecast can
        remove, and partly factors the scaling does not yet account for, such as who did the work or the condition of
        the gun.</Rev>
      </p>

      <h4><Rev minor>Project 3</Rev>: forecasting the next frame</h4>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', margin: '1rem 0' }}>
        <div style={{ flex: '1 1 55%' }}>
          <FrameDiagram widthMm={1500} sheathed fill />
        </div>
        <p style={{ flex: '1 1 45%', margin: 0 }}>
          1500mm, 4 studs. <Rev>Project 3&rsquo;s panel selects sheathing, which necessitates an extra
          step (Fix Sheathing).</Rev> <Rev>A project framing several panels would instance the panel node once for each,
          and the fabricator would execute each step as many times as the panels require, Fix Sheathing only for
          those that select sheathing.</Rev> <Rev minor>The specification necessitates all five of the fabricator&rsquo;s
          steps. The trace forecasts the materials used, scaled from the minimal quantities the specification gives,
          and time and energy, for which it gives none.</Rev>
        </p>
      </div>
      <p>
        <Rev>The scaling <M>{"\\theta"}</M> brings each prior frame to this panel, step by step as in Project 2, and both
        are used. Project 1&rsquo;s steps scale to about 6.5 min in all and Project 2&rsquo;s to about 6.4 min, and
        their energy to 0.16 and 0.18 kWh.</Rev>
      </p>
      <table>
        <thead><tr><th>Quantity</th><th>Minimal (from spec)</th><th>Forecast basis</th><th>Forecast</th></tr></thead>
        <tbody>
          <tr>
            <td>Nails</td>
            <td>{minimalNails(1500)} (4 per stud)</td>
            <td>pooled <Rev minor>waste</Rev> rate across <Rev minor>Projects 1 and 2</Rev>: (1+2) / (12+16) &asymp; 10.7%</td>
            <td><Rev>centred &asymp;18 (incl. 2), read above this at <i>r</i> = 0.9</Rev></td>
          </tr>
          <tr>
            <td>Time<Rev minor> (excl. Fix Sheathing)</Rev></td>
            <td>&mdash;</td>
            <td><Rev>Projects 1 and 2, each step scaled to this panel</Rev></td>
            <td>&asymp;<Rev>6.4</Rev> min</td>
          </tr>
          <tr>
            <td>Energy (<Rev minor>Nail Frame</Rev>)</td>
            <td>&mdash;</td>
            <td><Rev>Projects 1 and 2, scaled to 4 studs</Rev></td>
            <td>&asymp;<Rev>0.17</Rev> kWh</td>
          </tr>
          <tr>
            <td><Rev minor>Fix Sheathing</Rev> (time, energy<Rev minor>, nails</Rev>)</td>
            <td>&mdash;</td>
            <td><Rev minor>no prior execution near these descriptors</Rev></td>
            <td>no forecast yet</td>
          </tr>
        </tbody>
      </table>
      <p>
        The pooled waste rate carries a spread, so <Rev minor>the nail count</Rev> has a distribution in the sense of Figure 4, centred near{' '}
        <Rev minor>18</Rev>. At <i>r</i> = 0.9<Rev>, a tolerated risk of 10%,</Rev> the forecast reads its 90th percentile<Rev>, somewhat above the centre. Two frames cannot fix the
        spread, so the figure is left unstated</Rev>. The
        other rows show only the centre, for brevity. <Rev>The history is kept to two frames so the arithmetic can
        be followed by hand, and is not representative of the history a forecast would draw on in practice.</Rev>
      </p>
      <p>
        <Rev>Heuristic rules can stand in for Fix Sheathing until enough executions are recorded.</Rev>
      </p>

      <h4><Rev minor>Project 3&rsquo;s contract, offered to eligible agents</Rev></h4>
      <p>
        The fabricator&rsquo;s job is offered as one contract. With the fabricator qualification assumed for this pool, eligibility turns on the
        experience floor at each step of the job.
      </p>
      <table>
        <thead><tr><th>Contract</th><th>Fabricator&rsquo;s job</th></tr></thead>
        <tbody>
          <tr><td>Inputs</td><td>framing members, sheathing panels, fabrication drawing</td></tr>
          <tr><td>Output</td><td>sheathed panel</td></tr>
          <tr><td>Forecasts</td><td>&asymp;18 nails, &asymp;<Rev>6.4</Rev> min, &asymp;<Rev>0.17</Rev> kWh (centres), <Rev>with Fix Sheathing seeded heuristically, as Project 3 notes</Rev></td></tr>
        </tbody>
      </table>
      <table>
        <thead><tr><th>Step</th><th>Experience floor</th></tr></thead>
        <tbody>
          <tr><td><Rev minor>Mark Out</Rev></td><td><Rev minor>&ge;5 executions</Rev></td></tr>
          <tr><td><Rev minor>Lay Out</Rev></td><td><Rev minor>&ge;5 executions</Rev></td></tr>
          <tr><td><Rev minor>Nail Frame</Rev></td><td><Rev minor>&ge;20 framing executions</Rev></td></tr>
          <tr><td><Rev minor>Fix Sheathing</Rev></td><td><Rev minor>&ge;5 sheathing executions</Rev></td></tr>
          <tr><td><Rev>Stack Panel</Rev></td><td><Rev>&ge;5 executions</Rev></td></tr>
        </tbody>
      </table>
      <p>
        The floors are illustrative. Sheathing done on other product lines counts toward an agent&rsquo;s exposure at
        that step, so an agent can clear its floor here even though none of those records lies near enough to this
        panel to forecast it.
      </p>

      <h3>Patient care (illustrative)</h3>
      <p>
        In principle, <Rev minor>a master specification for clinical care would cover</Rev> the whole of clinical practice, rooted at the patient. Figures 6 to 8 show only a small fragment of it,
        around <Rev minor>a single</Rev> case. <Rev minor>When a patient arrives at the emergency department, the triage nurse</Rev> <Rev>creates a specification for the
        patient, recording their age and weight. Establishing that the complaint is abdominal, the nurse selects the
        abdominal region beneath the patient and records the site and severity of the pain as its descriptors.</Rev>{' '}
        <Rev minor>That selection maps to an initial assessment by the emergency physician</Rev> (Figure 6).
      </p>

      <Figure caption={<><Rev minor>An illustrative fragment of a master specification and master process for clinical care</Rev>, drawn as in Figure 1.</>}>
        <PatientMasterFigure stage={0} />
      </Figure>

      <p>
        Examining the patient, the <Rev minor>physician</Rev> localises the pain to the <Rev minor>biliary tract and selects that structure</Rev>, one level
        deeper. The deeper selection necessitates a further step, an ultrasound to image the <Rev minor>tract</Rev>, and the <Rev minor>physician&rsquo;s
        assessment</Rev> extends to match (Figure 7). Nothing was added to the master. The biliary node was
        always there, and the assessment is what selected it.
      </p>

      <Figure caption={<>The <Rev minor>physician&rsquo;s</Rev> assessment selects the biliary node, which necessitates the ultrasound.</>}>
        <PatientMasterFigure stage={1} />
      </Figure>

      <p>
        The ultrasound <Rev>records the tract&rsquo;s wall thickness and duct width and</Rev> identifies gallstones, selecting the issue beneath the biliary <Rev minor>tract</Rev>. <Rev>A diagnosis
        sits beneath the anatomy it concerns because it is present in that anatomy, as the anatomy is in the patient,
        so a finding inherits what is bound above it. Where the data cannot place a diagnosis on anatomy, other
        organisations are possible, as in the evaluation.</Rev> That selection reaches
        two skillsets the <Rev minor>assessment</Rev> did not, the surgeon and the anaesthetist, and the process grows to match
        (Figure 8). This is <Rev minor>derivation&rsquo;s</Rev> central move, and the same rule throughout. Each step&rsquo;s finding,
        its <M>{"\\sigma(s)"}</M>, deepens the specification, and the deeper specification necessitates the next steps. The process progresses
        because the selection deepened, not because a plan was drawn. The order is inherited, so the <Rev minor>triage</Rev>,
        assessment and imaging already done stand. <Rev>For brevity the finding necessitates surgery directly, where
        an intervention beneath it would hold the alternatives, such as watchful waiting. Had the scan found nothing, the physician would have received the negative
        result and returned to the assessment, selecting a further candidate, the pancreas, say, which brings in its
        own investigation. The number of such passes is unknown at the outset and grows with the findings.</Rev>
      </p>

      <Figure caption="Imaging selects the gallstone node, which necessitates the surgeon's and anaesthetist's steps.">
        <PatientMasterFigure stage={2} />
      </Figure>

      <p>
        <Rev>The evidence also differs. Where the wall frame&rsquo;s steps signal through telemetry, here each step is
        marked by the documentation filed at it (the triage and assessment notes, the imaging report, the anaesthetic record), from
        which its timing and findings are read, and the drugs it consumes by the medication administration
        record.</Rev> The induction brings in metrics the wall-frame example does not. It consumes a material, the anaesthetic
        drug, whose dose is recorded like any material quantity. Its outcome is measured not by time but by the
        largest fall in blood pressure after the drug is given. Eligibility gates the anaesthetist&rsquo;s job, and
        because cases vary widely <Rev minor>(by weight, ASA grade and the like)</Rev>, exposure counted over comparable cases matters
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
        that was always in the master but not indicated until now. <Rev>The node necessitates an exploration step for
        the surgeon and a further maintenance step for the anaesthetist, mid-procedure. The maintenance step joins a
        job already taken, so the contract is re-issued with it and the anaesthetist&rsquo;s experience is checked
        there, and what follows were the anaesthetist to fall short is the case Section 6 leaves open.</Rev> The
        update is not only structural: the newly selected node binds a descriptor, <Rev minor>biliary obstruction found
        intraoperatively</Rev><Rev>, which the maintenance step sees because that node necessitates it</Rev>, and reading it the
        anaesthetist selects cisatracurium, which clears independently of the liver, in place of the default, a
        choice of material made at execution rather than fixed by the mapping.
        The order already set stands, the steps already completed hold, and nothing returns to the <Rev minor>emergency physician</Rev>.
      </p>
    </>
  );
}
