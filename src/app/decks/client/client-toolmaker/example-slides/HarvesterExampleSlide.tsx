import { WorkedExampleLayout } from '@/components/slides/WorkedExampleLayout';
import type { ExSpecRow, ExRecordRow } from '@/components/slides/WorkedExampleLayout';
import standingtrees from './standingtrees.jpg';

const specRows: ExSpecRow[] = [
  { label: 'Stand age',         value: '28-year loblolly pine, 12-16" DBH',                         key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Terrain',           value: 'Two zones - flat (A) + sloped/wet (B, 15-20%)',              key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Target products',   value: 'Sawlogs (8-16ft, primary) + pulpwood (residual)',            key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Site class',        value: 'Zone B - tracked, slope speed limit, wet areas last',                    key: false, tag: 'affects process', tagType: 'plan' },
  { label: 'Morning temp',      value: '-3°C - warm-up required, ice check on rollers',                         key: false, tag: 'affects process', tagType: 'plan' },
  { label: 'Predicted production', value: '180 tonnes/day',                                         key: true,  tag: null,                  tagType: null       },
  { label: 'Predicted fuel',    value: '95 litres/day',                                             key: true,  tag: null,                  tagType: null       },
];

const recordRows: ExRecordRow[] = [
  { label: 'Actual production', value: '172 tonnes',                                                                                        key: true,  highlight: false },
  { label: 'Actual fuel',       value: '102 litres',                                                                                        key: true,  highlight: false },
  { label: 'Deviation',         value: '-8 tonnes · +7 litres',                                                                             key: true,  highlight: true  },
  { label: 'Cause flagged',     value: '8% below spec (<6" top diameter) - Zone B',                                                          key: false, highlight: true  },
  { label: 'Operator',          value: 'Operator ID 031 (piece-rate, production bonus)',                                                    key: false, highlight: false },
  { label: 'Machine',           value: 'Wheeled CTL harvester, single-grip head',                                                          key: false, highlight: false },
  { label: 'Record',            value: 'Timestamped, GPS-located, breach logged',                                                           key: false, highlight: false },
];

export function HarvesterExampleSlide() {
  return (
    <WorkedExampleLayout
      title="A 40-Acre Clear-Cut. Fully Specified."
      subtitle="What Merit knows before the first tree falls, and what it records when the last log is cut."
      image={standingtrees}
      imageAlt="Standing loblolly pine ready for harvest"
      preLabel="Pre-Dispatch"
      preCaption="Derived from stand inventory, site survey, and contract terms. Procedure variant and monitoring thresholds set before the harvester moves."
      midNote="07:15 - First cut commenced"
      postLabel="Stand Complete"
      specRows={specRows}
      recordRows={recordRows}
      callout="Every tree. Every cut. Every breach. Automatically."
    />
  );
}
