import { WorkedExampleLayout } from '@/components/slides/WorkedExampleLayout';
import type { ExSpecRow, ExRecordRow } from '@/components/slides/WorkedExampleLayout';
import concreteform from './concreteform.jpg';

const specRows: ExSpecRow[] = [
  { label: 'Pour rate',           value: '1.5 m/hr planned (threshold 1.2 m/hr)',                            key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Ambient temperature', value: '32°C - accelerated set, stripping moved to night shift',           key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Crew composition',    value: '40% new hires - extended inspection checklist, 3 cycles',          key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Pour rate >1.2 m/hr', value: 'Additional tie row required, lift height reduced 3.6m to 3.0m',   key: false, tag: 'affects process',     tagType: 'plan'     },
  { label: 'Curved section',      value: 'Floors 12-14 - metallic panels cannot conform; timber formwork, different assembly and sequence',                            key: false, tag: 'affects process', tagType: 'plan' },
  { label: 'Predicted cycle time', value: '4.2 days',                                                        key: true,  tag: null,                  tagType: null       },
  { label: 'Predicted repositioning', value: '6 hours',                                                      key: true,  tag: null,                  tagType: null       },
];

const recordRows: ExRecordRow[] = [
  { label: 'Actual cycle time',   value: '6.2 days',                                                                                                  key: true,  highlight: false },
  { label: 'Actual repositioning', value: '7.5 hours',                                                                                                key: true,  highlight: false },
  { label: 'Deviation',           value: '+2.0 days · +1.5 hours repositioning',                                                                      key: true,  highlight: true  },
  { label: 'Cause flagged',       value: 'Superseded drawings used - 150mm misalignment, pour halted, 2-day remediation',                                     key: false, highlight: true },
  { label: 'Crew',                value: 'Site supervisor (12yr) + mixed crew (40% new hires)',                                                       key: false, highlight: false },
  { label: 'System',              value: 'Crane-lifted steel panels, 3m x 6m, climbing formwork, Level 5',                                           key: false, highlight: false },
  { label: 'Record',              value: 'Timestamped, drawing version logged, liability attributed',                                                      key: false, highlight: false },
];

export function FormworkExampleSlide() {
  return (
    <WorkedExampleLayout
      title="A Floor Cycle. Fully Specified."
      subtitle="What Merit knows before the first panel is lifted, and what it records when the concrete is stripped."
      image={concreteform}
      imageAlt="Heavy metallic formwork on high-rise concrete core"
      preLabel="Pre-Assembly"
      preCaption="Derived from engineered drawings, pour schedule, and contractor history. Assembly stage gates and inspection requirements set before the crane lifts the first panel."
      midNote="14:00 - Concrete pour commenced"
      postLabel="Stripped and Reset"
      specRows={specRows}
      recordRows={recordRows}
      callout="Every panel. Every tie. Every drawing version. Automatically."
    />
  );
}
