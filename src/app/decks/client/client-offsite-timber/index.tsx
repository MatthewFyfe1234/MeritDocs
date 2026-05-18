import { CoverSlide } from './slides/CoverSlide';
import { WorkflowSlide } from '../client-offsite/slides/WorkflowSlide';
import { BuyerPersonasSlide } from '../client-offsite/slides/BuyerPersonasSlide';
import { ToolStackSlide } from './slides/ToolStackSlide';
import { DigitalGapSlide } from './slides/DigitalGapSlide';
import { MechanicsSlide } from '../client-offsite/slides/MechanicsSlide';
import { ValuePropositionSlide } from './slides/ValuePropositionSlide';
import { ReferencesSlide } from '../client-offsite/slides/ReferencesSlide';

export const deck = {
  title: 'Merit OI: Timber Offsite Client',
  exportFilename: 'Merit-OI-Timber-Offsite-Client.pdf',
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
