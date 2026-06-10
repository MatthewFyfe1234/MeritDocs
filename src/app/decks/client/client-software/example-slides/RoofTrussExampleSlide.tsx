import { WorkedExampleLayout } from '@/components/slides/WorkedExampleLayout';
import type { ExSpecRow, ExRecordRow } from '@/components/slides/WorkedExampleLayout';
import roofscape from './roofscape.jpg';

const specRows: ExSpecRow[] = [
  { label: 'Plant load',            value: '180/200 booked - overtime likely day 2+',                                   key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Lumber spec',           value: 'SPF, 40ft span - deflection limit confirmed before cutting',                key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Truss span',            value: '40ft - over prescriptive limits: engineer stamp + piggyback transport',      key: false, tag: 'affects process',     tagType: 'plan'     },
  { label: 'Attic trusses',         value: '2 units - manual jig, 2x fabrication time',                                 key: false, tag: 'affects process',     tagType: 'plan'     },
  { label: 'Wind zone',             value: '110 mph - hurricane ties at all heel joints',                                key: false, tag: 'affects process',     tagType: 'plan'     },
  { label: 'Roof profile',          value: 'Hipped end - hip, jack and girder trusses; sequenced manufacture',          key: false, tag: 'affects process',     tagType: 'plan'     },
  { label: 'Predicted design time', value: '4 hours',                                                                   key: true,  tag: null,                  tagType: null       },
  { label: 'Predicted manufacture', value: '250 trusses, 2 days',                                                       key: true,  tag: null,                  tagType: null       },
];

const recordRows: ExRecordRow[] = [
  { label: 'Design time',     value: '6.5 hours (predicted: 4h) - pitch change rework + attic complexity',        key: true,  highlight: false },
  { label: 'Manufacture time',value: '2.5 days (predicted: 2 days) - QA hold on press calibration',               key: true,  highlight: false },
  { label: 'Incident 1',      value: 'Pitch changed 6/12 to 8/12 after design lock - no change order. 8 re-cuts', key: false, highlight: true  },
  { label: 'Incident 2',      value: '12 trusses quarantined - nail plate grip below spec, press under pressure',  key: false, highlight: true  },
  { label: 'Waste factor',    value: '7% vs 4% predicted',                                                         key: false, highlight: false },
  { label: 'Rework cost',     value: '$365 lumber + labor - back-charged, record established the dispute',         key: false, highlight: false },
  { label: 'Record',          value: 'Change order logged, press fault flagged, QA trail complete for all 250',   key: false, highlight: false },
];

export function RoofTrussExampleSlide() {
  return (
    <WorkedExampleLayout
      title="250 Roof Trusses for a Housing Development."
      subtitle="What Merit knows before the design starts, and what it records when the batch leaves the factory."
      image={roofscape}
      imageAlt="Roof truss structure under construction"
      preLabel="Pre-Production"
      preCaption="Derived from architectural plans, building code (NC 2018 IBC), and customer history. Regulatory requirements and load steps vary by jurisdiction."
      midNote="Design approved — cut list issued to saw station"
      postLabel="Fabricated"
      specRows={specRows}
      recordRows={recordRows}
      labelWidth={175}
      callout="The design was locked. The customer changed the pitch. The record established who bore the cost."
    />
  );
}
