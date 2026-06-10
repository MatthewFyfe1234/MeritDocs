import { WorkedExampleLayout } from '@/components/slides/WorkedExampleLayout';
import type { ExSpecRow, ExRecordRow } from '@/components/slides/WorkedExampleLayout';
import stackedtimber from './stackedtimber.jpg';

const specRows: ExSpecRow[] = [
  { label: 'Species mix',       value: '60% maple, 25% birch, 15% oak',              key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Average log diameter', value: '18 inches',                               key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Lot size',          value: '120 logs',                                   key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Species includes oak', value: 'Carbide blades, 25% feed reduction during oak section', key: false, tag: 'affects process', tagType: 'plan' },
  { label: 'Grade order',       value: 'Structural - grading stop every 500 BF',     key: false, tag: 'affects process',     tagType: 'plan'     },
  { label: 'Predicted yield',   value: '20.4 m³ / 8,640 BF',                         key: true,  tag: null,                  tagType: null       },
  { label: 'Predicted cycle time', value: '3.8 min/log',                             key: true,  tag: null,                  tagType: null       },
];

const recordRows: ExRecordRow[] = [
  { label: 'Actual yield',      value: '19.4 m³ / 8,210 BF',                                                                         key: true,  highlight: false },
  { label: 'Actual cycle time', value: '4.3 min/log',                                                                                key: true,  highlight: false },
  { label: 'Deviation',         value: '-1.0 m³ / -430 BF · +0.5 min/log',                                                          key: true,  highlight: true  },
  { label: 'Cause flagged',     value: 'Feed speed not restored post-oak - 14 logs below target (71-84)',                          key: false, highlight: true  },
  { label: 'Operator',          value: 'Operator ID 022 (8 months experience)',                                                      key: false, highlight: false },
  { label: 'Machine',           value: 'Primary headrig, band saw unit',                                                             key: false, highlight: false },
  { label: 'Record',            value: 'Timestamped, 2 grading stops logged, grade record complete',                                 key: false, highlight: false },
];

export function SawmillExampleSlide() {
  return (
    <WorkedExampleLayout
      title="A Mixed Hardwood Batch. Fully Specified."
      subtitle="What Merit knows before the first log reaches the blade, and what it records when the last cant exits."
      image={stackedtimber}
      imageAlt="Stacked hardwood timber"
      preLabel="Pre-Dispatch"
      preCaption="Derived from lot manifest, species mix, and order specification. Procedure variant selected before the first log reaches the infeed."
      midNote="07:00 - Infeed commenced"
      postLabel="Batch Complete"
      specRows={specRows}
      recordRows={recordRows}
      callout="Every log. Every step. Every deviation. Automatically."
    />
  );
}
