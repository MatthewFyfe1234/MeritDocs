import { CoverSlide } from './slides/CoverSlide';
import { WorkflowSlide } from './slides/WorkflowSlide';
import { ToolStackSlide } from './slides/ToolStackSlide';
import { BuyerPersonasSlide } from './slides/BuyerPersonasSlide';
import { DigitalGapSlide } from './slides/DigitalGapSlide';
import { MechanicsSlide } from './slides/MechanicsSlide';
import { ValuePropositionSlide } from './slides/ValuePropositionSlide';
import { ReferencesSlide } from './slides/ReferencesSlide';

export const deck = {
  title: 'Merit OI: Offsite Client',
  exportFilename: 'Merit-OI-Offsite-Client.pdf',
  slides: [
    <CoverSlide key="cover" />,
    <WorkflowSlide key="workflow" />,
    <BuyerPersonasSlide key="buyer-personas" />,
    <ToolStackSlide key="tool-stack" />,
    <DigitalGapSlide key="digital-gap" />,
    <MechanicsSlide key="mechanics" />,
    <ValuePropositionSlide key="value-proposition" />,
    <ReferencesSlide key="references" />,
  ],
};
