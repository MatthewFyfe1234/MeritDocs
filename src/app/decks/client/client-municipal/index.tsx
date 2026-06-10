import { CoverSlide } from './slides/CoverSlide';
import { ObligationGapSlide } from './slides/DisconnectSlide';
import { ProcessAuthoritySlide } from '../client-toolmaker/slides/ProcessAuthoritySlide';
import { ValueCaptureSlide } from './slides/ValueCaptureSlide';
import { ContractLifecycleSlide } from './slides/ContractLifecycleSlide';
import { WorkedExampleSlide } from './slides/WorkedExampleSlide';
import { SnowplowExampleSlide } from './example-slides/SnowplowExampleSlide';
import { SweeperExampleSlide } from './example-slides/SweeperExampleSlide';
import { LastPieceSlide } from './slides/LastPieceSlide';
import { ProcessModelSlide } from './slides/ProcessModelSlide';
import { HighlightsSlide } from './slides/HighlightsSlide';
import type { DeckConfig } from '../../../types';

export const deck: DeckConfig = {
  title: 'Merit OI: The Operation Behind the Asset',
  exportFilename: 'Merit-OI-Municipal.pdf',
  variantSlots: {
    workedExample: {
      label: 'Worked example',
      options: [
        { value: 'refuse',   label: 'Refuse collection (urban route, rear-loader)' },
        { value: 'snowplow', label: 'Winter maintenance (snowplow fleet, northern Minnesota)' },
        { value: 'sweeper',  label: 'Street sweeping (beachfront commercial, Florida)' },
      ],
    },
  },
  slides: (config: Record<string, string>) => [
    <CoverSlide key="cover" />,
    <ObligationGapSlide key="obligation-gap" />,
    <ProcessAuthoritySlide key="process-authority" />,
    <ValueCaptureSlide key="value-capture" />,
    <ContractLifecycleSlide key="contract-lifecycle" />,
    <LastPieceSlide key="last-piece" />,
    <ProcessModelSlide key="process-model" />,
    config.workedExample === 'snowplow'  ? <SnowplowExampleSlide key="worked-example" />
      : config.workedExample === 'sweeper' ? <SweeperExampleSlide key="worked-example" />
      : <WorkedExampleSlide key="worked-example" />,
    <HighlightsSlide key="highlights" />,
  ],
};
