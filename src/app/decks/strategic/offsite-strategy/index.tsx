import { CoverSlide } from './slides/CoverSlide';
import { OffsiteConstructionSlide } from './slides/OffsiteConstructionSlide';
import { CommonSystemsSlide } from './slides/CommonSystemsSlide';
import { MarketSizeSlide } from './slides/MarketSizeSlide';
import { WorkflowSlide } from './slides/WorkflowSlide';
import { ToolStackSlide } from './slides/ToolStackSlide';
import { CompetitorSlide } from './slides/CompetitorSlide';
import { BuyerPersonasSlide } from './slides/BuyerPersonasSlide';
import { DigitalGapSlide } from './slides/DigitalGapSlide';
import { ValuePropositionSlide } from './slides/ValuePropositionSlide';
import { ReferencesSlide } from './slides/ReferencesSlide';

export const deck = {
  title: 'Merit OI',
  exportFilename: 'Merit-OI-Presentation.pdf',
  slides: [
    <CoverSlide key="cover" />,
    <OffsiteConstructionSlide key="offsite" />,
    <CommonSystemsSlide key="common-systems" />,
    <MarketSizeSlide key="market-size" />,
    <WorkflowSlide key="workflow" />,
    <ToolStackSlide key="tool-stack" />,
    <CompetitorSlide key="competitor" />,
    <BuyerPersonasSlide key="buyer-personas" />,
    <DigitalGapSlide key="digital-gap" />,
    <ValuePropositionSlide key="value-proposition" />,
    <ReferencesSlide key="references" />,
  ],
};
