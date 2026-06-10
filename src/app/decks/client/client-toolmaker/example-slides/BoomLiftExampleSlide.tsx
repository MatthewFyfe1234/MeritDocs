import { WorkedExampleLayout } from '@/components/slides/WorkedExampleLayout';
import type { ExSpecRow, ExRecordRow } from '@/components/slides/WorkedExampleLayout';
import elevatedwork from './elevatedwork.jpg';

const specRows: ExSpecRow[] = [
  { label: 'Working height',      value: '12 stories, 150 ft',                                              key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Wind speed',          value: '20 mph, gusts 25 mph (limit 28 mph)',                             key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Operator',            value: 'Certified, first session on this model (140ft+)',                 key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Site terrain',        value: 'Slope >5°, boom capped at 75%',                                  key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Overhead power lines', value: 'Live 11kV - exclusion zone and spotter required',                                                        key: false, tag: 'affects process', tagType: 'plan' },
  { label: 'Pedestrian zone',     value: 'Active footpath - debris netting required',                                                               key: false, tag: 'affects process', tagType: 'plan' },
  { label: 'Predicted working time', value: '6.0 hours at height',                                         key: true,  tag: null,                  tagType: null       },
  { label: 'Predicted panels',    value: '24',                                                              key: true,  tag: null,                  tagType: null       },
];

const recordRows: ExRecordRow[] = [
  { label: 'Actual working time', value: '3.5 hours at height',                                                                                       key: true,  highlight: false },
  { label: 'Actual panels',       value: '14',                                                                                                         key: true,  highlight: false },
  { label: 'Deviation',           value: '-2.5 hours · -10 panels',                                                                                   key: true,  highlight: true  },
  { label: 'Cause flagged',       value: 'Leveling cylinder creep - 5° drift at height. Unit removed from service.',                                        key: false, highlight: true },
  { label: 'Operator',            value: 'User ID #4401, ABC Contracting (first session on this model)',                                               key: false, highlight: false },
  { label: 'Machine',             value: 'Unit #8823, 150ft articulated boom, diesel',                                                                key: false, highlight: false },
  { label: 'Record',              value: 'Timestamped, tilt log preserved, unit flagged',                                                               key: false, highlight: false },
];

export function BoomLiftExampleSlide() {
  return (
    <WorkedExampleLayout
      title="A Facade Replacement. Fully Specified."
      subtitle="What Merit knows before the boom leaves the ground, and what it records when the platform comes down."
      image={elevatedwork}
      imageAlt="Articulated boom lift at height on building facade"
      preLabel="Pre-Dispatch"
      preCaption="Derived from site survey, weather data, and asset records. Safety envelopes and access restrictions set before the operator enters the platform."
      midNote="07:30 - Platform raised"
      postLabel="Job Complete"
      specRows={specRows}
      recordRows={recordRows}
      callout="Every lift. Every sensor. Every drift. Automatically."
      labelWidth={178}
    />
  );
}
