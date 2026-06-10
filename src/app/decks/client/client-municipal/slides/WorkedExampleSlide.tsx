import { WorkedExampleLayout } from '@/components/slides/WorkedExampleLayout';
import type { ExSpecRow, ExRecordRow } from '@/components/slides/WorkedExampleLayout';
import trashcollect from '../trashcollect.jpg';

const specRows: ExSpecRow[] = [
  { label: 'Route length',               value: '3.2 miles',        key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Area classification',        value: 'Light urban',      key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Collection points',          value: '320 bins',         key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Vehicle type',               value: 'Rear-loader, 26t', key: false, tag: 'affects process',     tagType: 'plan'     },
  { label: 'Ambient temp',               value: '-2°C (sub-zero)',  key: false, tag: 'affects process',     tagType: 'plan'     },
  { label: 'Predicted cycle time',       value: '4h 20m',           key: true,  tag: null,                  tagType: null       },
  { label: 'Predicted fuel consumption', value: '18.4 litres',      key: true,  tag: null,                  tagType: null       },
];

const recordRows: ExRecordRow[] = [
  { label: 'Actual cycle time', value: '4h 51m',                                               key: true,  highlight: false },
  { label: 'Actual fuel',       value: '23.1 litres',                                          key: true,  highlight: false },
  { label: 'Deviation',         value: '+31 minutes / +4.7 litres',                            key: true,  highlight: true  },
  { label: 'Cause flagged',     value: 'Two unscheduled stops, operative change at 2.1 miles', key: false, highlight: true  },
  { label: 'Crew confirmed',    value: 'Driver ID 041, Operatives 12, 17, 23',                 key: false, highlight: false },
  { label: 'Vehicle',           value: 'Fleet asset MX71 RKL',                                 key: false, highlight: false },
  { label: 'Record',            value: 'Timestamped, tamper-proof, FOI-ready',                 key: false, highlight: false },
];

export function WorkedExampleSlide() {
  return (
    <WorkedExampleLayout
      title="A Refuse Round. Fully Specified."
      subtitle="What Merit knows before the job begins, and what it records when it ends."
      image={trashcollect}
      imageAlt="Refuse collection vehicle"
      preLabel="Pre-Dispatch"
      preCaption="Derived from route specification and vehicle type. Calculated before dispatch."
      midNote="07:14 - Job commenced"
      postLabel="Job Complete"
      specRows={specRows}
      recordRows={recordRows}
      callout="Every round. Every asset. Every deviation. Automatically."
      labelWidth={200}
    />
  );
}
