import { WorkedExampleLayout } from '@/components/slides/WorkedExampleLayout';
import type { ExSpecRow, ExRecordRow } from '@/components/slides/WorkedExampleLayout';
import leavesonroad from './leavesonroad.jpg';

const specRows: ExSpecRow[] = [
  { label: 'Route type',          value: 'Beachfront commercial, high sand accumulation',                key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Season',              value: 'Post-spring break - elevated litter volume',                   key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Debris mix',          value: '70% sand, 20% litter, 10% vegetation',                        key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Sand route',          value: 'Post-route washout required - sand accelerates wear',          key: false, tag: 'affects process',     tagType: 'plan'     },
  { label: 'High litter volume',  value: 'Broom wrap check every 3 miles',                               key: false, tag: 'affects process',     tagType: 'plan'     },
  { label: 'Predicted route time', value: '5.5 hours',                                                  key: true,  tag: null,                  tagType: null       },
  { label: 'Predicted hopper dumps', value: '3',                                                        key: true,  tag: null,                  tagType: null       },
];

const recordRows: ExRecordRow[] = [
  { label: 'Actual route time',   value: '6.2 hours',                                                                                          key: true,  highlight: false },
  { label: 'Actual hopper dumps', value: '5',                                                                                                   key: true,  highlight: false },
  { label: 'Deviation',           value: '+0.7 hours · +2 hopper dumps',                                                                        key: true,  highlight: true  },
  { label: 'Cause flagged',       value: '8.2 mph vs 3-5 mph target - sand not vacuumed on beachfront passes',                                   key: false, highlight: true  },
  { label: 'Operator',            value: 'Operator #7 (6 months, refuse background)',                                                          key: false, highlight: false },
  { label: 'Vehicle',             value: 'Elgin Pelican mechanical sweeper',                                                                   key: false, highlight: false },
  { label: 'Record',              value: 'Timestamped, broom logged, 0.4-mile missed segment flagged',                                          key: false, highlight: false },
];

export function SweeperExampleSlide() {
  return (
    <WorkedExampleLayout
      title="A Beachfront Route. Fully Specified."
      subtitle="What Merit knows before the sweeper leaves the depot, and what it records when the route is done."
      image={leavesonroad}
      imageAlt="Debris-laden road awaiting sweeping"
      preLabel="Pre-Dispatch"
      preCaption="Derived from route database, historical debris data, and asset records. Speed targets and monitoring thresholds set before the sweeper moves."
      midNote="06:00 - Route commenced"
      postLabel="Route Complete"
      specRows={specRows}
      recordRows={recordRows}
      callout="Every mile. Every broom pass. Every missed segment. Automatically."
      labelWidth={185}
    />
  );
}
