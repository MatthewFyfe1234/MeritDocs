import { WorkedExampleLayout } from '@/components/slides/WorkedExampleLayout';
import type { ExSpecRow, ExRecordRow } from '@/components/slides/WorkedExampleLayout';
import combine from './combine.jpg';

const specRows: ExSpecRow[] = [
  { label: 'Field size',             value: '24 acres',                       key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Grain moisture',         value: '19% (wet)',                       key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Field slope',            value: '8% grade',                        key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Crop type',              value: 'Corn',                            key: false, tag: 'affects process',     tagType: 'plan'     },
  { label: 'Ambient temp',           value: '29°C (cooling checks required)',  key: false, tag: 'affects process',     tagType: 'plan'     },
  { label: 'Predicted harvest rate', value: '3.8 ac/hr',                       key: true,  tag: null,                  tagType: null       },
  { label: 'Predicted fuel',         value: '168 litres',                      key: true,  tag: null,                  tagType: null       },
];

const recordRows: ExRecordRow[] = [
  { label: 'Actual harvest rate', value: '4.9 ac/hr',                                                             key: true,  highlight: false },
  { label: 'Actual fuel',         value: '214 litres',                                                            key: true,  highlight: false },
  { label: 'Deviation',           value: '+29% above moisture-adjusted speed limit',                              key: true,  highlight: true  },
  { label: 'Cause flagged',       value: 'Speed override at 11:42, 13:15, 14:08 - 38 min outside specification', key: false, highlight: true  },
  { label: 'Operator',            value: 'Operator ID 014',                                                       key: false, highlight: false },
  { label: 'Machine',             value: 'Serial CMB-7823',                                                       key: false, highlight: false },
  { label: 'Record',              value: 'Timestamped, manufacturer-spec referenced',                             key: false, highlight: false },
];

export function CombineExampleSlide() {
  return (
    <WorkedExampleLayout
      title="A Corn Harvest. Fully Specified."
      subtitle="What Merit knows before the header drops, and what it records when the field is done."
      image={combine}
      imageAlt="Combine harvester in field"
      preLabel="Pre-Operation"
      preCaption="Derived from field specification, crop type, and detected conditions. Procedure variant selected before the header drops."
      midNote="08:45 - Header engaged"
      postLabel="Field Complete"
      specRows={specRows}
      recordRows={recordRows}
      callout="Every field. Every condition. Every deviation. Automatically."
    />
  );
}
