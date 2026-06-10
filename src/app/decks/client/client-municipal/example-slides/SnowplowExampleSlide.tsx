import { WorkedExampleLayout } from '@/components/slides/WorkedExampleLayout';
import type { ExSpecRow, ExRecordRow } from '@/components/slides/WorkedExampleLayout';
import snowonroad from './snowonroad.jpg';

const specRows: ExSpecRow[] = [
  { label: 'Storm type',          value: 'Alberta clipper, 6-8 inches, 15-20°F',                          key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Pavement temp',       value: '22°F and falling (bridges below air temp)',                     key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Route',               value: 'Priority 2, 20 lane-miles, 4hr SLA',                           key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Operator experience', value: 'First season, 3 shifts - ride-along first hour, engagement verified at dispatch',              key: false, tag: 'affects process', tagType: 'plan' },
  { label: 'Spreader calibration', value: '14 weeks since last - check required',                                                              key: false, tag: 'affects process', tagType: 'plan' },
  { label: 'Predicted route time', value: '3.2 hours',                                                   key: true,  tag: null,                  tagType: null       },
  { label: 'Predicted salt usage', value: '2.8 tons',                                                    key: true,  tag: null,                  tagType: null       },
];

const recordRows: ExRecordRow[] = [
  { label: 'Actual route time',  value: '3.8 hours',                                                                                           key: true,  highlight: false },
  { label: 'Actual salt usage',  value: '3.6 tons',                                                                                            key: true,  highlight: false },
  { label: 'Deviation',          value: '+0.6 hours · +0.8 tons (+29%)',                                                                        key: true,  highlight: true  },
  { label: 'Cause flagged',      value: 'Spreader drift - 420 vs 300 lb/lane-mile. Missed segment 0.3mi (Elm St)',                              key: false, highlight: true  },
  { label: 'Operator',           value: 'Driver #7 (first season, 3 previous shifts)',                                                         key: false, highlight: false },
  { label: 'Vehicle',            value: 'Municipal plow truck, Henderson front plow, 2yr',                                                     key: false, highlight: false },
  { label: 'Record',             value: 'Timestamped, GPS-tracked, SLA miss and excess salt logged',                                           key: false, highlight: false },
];

export function SnowplowExampleSlide() {
  return (
    <WorkedExampleLayout
      title="A Priority Route. Fully Specified."
      subtitle="What Merit knows before the truck leaves the depot, and what it records when the route is done."
      image={snowonroad}
      imageAlt="Snow-covered road awaiting clearance"
      preLabel="Pre-Dispatch"
      preCaption="Derived from weather forecast, road sensor data, and asset records. Route and monitoring thresholds set before the truck moves."
      midNote="04:30 - Dispatched"
      postLabel="Route Complete"
      specRows={specRows}
      recordRows={recordRows}
      callout="Every route. Every segment. Every over-application. Automatically."
      labelWidth={185}
    />
  );
}
