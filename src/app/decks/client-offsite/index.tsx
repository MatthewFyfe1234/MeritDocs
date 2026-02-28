import { CoverSlide } from './slides/CoverSlide';
import { WorkflowSlide } from './slides/WorkflowSlide';
import { ToolStackSlide } from './slides/ToolStackSlide';
import { BuyerPersonasSlide } from './slides/BuyerPersonasSlide';
import { DigitalGapSlide } from './slides/DigitalGapSlide';
import { ValuePropositionSlide } from './slides/ValuePropositionSlide';
import { ReferencesSlide } from './slides/ReferencesSlide';

export const deck = {
  title: 'Merit OI: Offsite Client',
  exportFilename: 'Merit-OI-Offsite-Client.pdf',
  slides: [
    <CoverSlide key="cover" />,
    <WorkflowSlide key="workflow" />,
    <ToolStackSlide key="tool-stack" />,
    <BuyerPersonasSlide key="buyer-personas" />,
    <DigitalGapSlide key="digital-gap" />,
    <ValuePropositionSlide key="value-proposition" />,
    <ReferencesSlide key="references" />,
  ],
};
