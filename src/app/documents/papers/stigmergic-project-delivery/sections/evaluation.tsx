import { Cite, M, Rev } from '@/components/paper';

export function Evaluation() {
  return (
    <>
      <h2>Evaluation</h2>
      <p>
        The model is implemented as a working platform, and the evaluation reported here is partial rather than
        conclusive. It verifies the model&rsquo;s mechanisms and shows that the model can be built over a real
        domain, but does not yet establish that derived processes are correct or that forecasts are accurate.
      </p>

      <p>
        <strong>Mock data.</strong> Mock data was constructed from the author&rsquo;s experience of timber-frame
        manufacturing and construction, with master specifications, processes, agents and execution records
        modelled on real projects rather than generated at random. Runs against it exercise every mechanism of
        Section 3 end to end, from the derivation of a project&rsquo;s process from its selection, through extension
        of the specification during execution, capture of trace records including partial ones, forecasting at a
        chosen risk and the combination of forecasts into a contract&rsquo;s, and the exposure and experience floors
        that set eligibility, to generation of the contracts offered to eligible agents <Rev>and their
        self-selection</Rev>. In each case the platform behaves as Section 3 specifies. What the mock data cannot test
        is whether forecasts are accurate, since its records reflect the author&rsquo;s understanding of the work
        rather than independent observation of it.
      </p>

      <p>
        <strong>Clinical data.</strong> We built the model over the MIMIC-IV Clinical Database
        Demo <Cite id="johnson2023mimicdemo" />, an open subset of MIMIC-IV covering 100 patients and 275 admissions
        to a single academic medical centre. The master specification has 873 nodes over five levels, from the
        patient through body areas and structures to interventions, investigations and medications. <Rev>Unlike the worked
        example, conditions are carried as descriptors on a structure rather than as nodes beneath it, since MIMIC
        records diagnoses only at discharge and without the anatomy they concern. Where the data allow, the
        example&rsquo;s arrangement is the more natural.</Rev> The master process has 250 steps in 64 jobs, joined by 1,171 products passed between jobs, and the mapping links 854
        of the 873 nodes to the steps they necessitate. All 275 admissions are represented as selections, with
        15,497 dated events placed on the specification. Three admissions are replayed in four stages, and the
        derived process grows at each stage as the selection deepens. This shows that the formalism can be built
        over a real domain at this scale and that derivation runs end to end. It does not show that the derived
        processes are correct, and <Rev minor>the master was</Rev> authored without clinical review,
        so <Rev minor>its</Rev> clinical validity is untested. The build also exposed gaps in the mapping. In 204 of the 275 admissions at least
        one contract receives no product, and in one replayed admission 829 nursing records fall on no job in the
        derived process.
      </p>
      <p>
        The data is close to a natural trace. Its events are timestamped, many are attributed to individual
        caregivers or providers, drugs and doses are recorded as administered, and many fields are recorded for
        some events and not others. It supports four tests not yet run. Derivation can be tested by authoring the
        mapping on some admissions and measuring, on the rest, the share of recorded events the derived process
        accounts for and the share of derived steps that never occur. <Rev existing>Forecasting can be tested by comparing
        forecasts formed at the level of the step with a baseline formed at the level of the whole admission, on
        held-out admissions, with calibration reported as the rate at which outcomes exceed
        the <M>{"r"}</M>-percentile against the nominal <M>{"1 - r"}</M>.</Rev> Combined forecasts can be tested by
        comparing job-level forecasts made under independence with ones that preserve shared sources. The premise
        beneath eligibility, that recorded exposure to a step predicts performance at it, can be tested
        observationally. The demo&rsquo;s 100 patients are too few for the forecasting tests, which need the full
        database.
      </p>
      <p>
        Two things the clinical data cannot test. Diagnoses are coded at discharge rather than when found, and the
        specification built here has no finding nodes, so selection driven by a step&rsquo;s
        findings, <M>{"\\sigma(s)"}</M>, is not exercised, though timed results and reports could approximate it in a
        later build. Outcomes can be forecast and checked for calibration, but choosing treatments from those
        forecasts requires causal effects the observational record does not identify.
      </p>

      <p>
        <strong>Court records.</strong> Ongoing testing aims to bring in court records, which by their nature hold
        detail anchored to a timeline, captured and published for the public record. Their master process is
        largely codified in rules of procedure, so derived processes can be checked against the docket, and cases
        deepen through motions and appeals much as patients do through findings. Where judges are assigned at
        random, they also allow an unconfounded test of whether recorded exposure predicts performance. Court data
        would barely exercise tools and materials, and its adversarial parties would stress-test the model&rsquo;s
        assumption that agents work toward the specification.
      </p>

      <p>
        <strong>What the data in hand cannot test.</strong> Allocation is assigned rather than self-selected in
        both domains. Clinical staff are rostered, judges are assigned, and the lawyers&rsquo; choice of cases goes
        unrecorded, so selection and contracts cannot yet be evaluated against real behaviour. The clinical data covers a single centre,
        and construction, the domain of the first worked example, awaits deployment with industrial partners.
      </p>
    </>
  );
}
