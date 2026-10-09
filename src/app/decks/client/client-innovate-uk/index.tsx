import { CoverSlide } from './slides/CoverSlide';
import { ConglomerateProblemSlide } from './slides/ConglomerateProblemSlide';
import { ShiftInPerspectiveSlide } from './slides/ShiftInPerspectiveSlide';
import { SiloingSlide } from './slides/SiloingSlide';
import { ResolutionSlide } from './slides/ResolutionSlide';
import { MechanicsSlide } from './slides/MechanicsSlide';
import { LandscapeSlide } from './slides/LandscapeSlide';
import { EngineeringFitSlide } from './slides/EngineeringFitSlide';

export const deck = {
  title: 'Merit OI: The Model',
  exportFilename: 'Merit-OI-The-Model.pdf',
  slides: [
    <CoverSlide key="cover" />,
    <ConglomerateProblemSlide key="conglomerate-problem" />,
    <ShiftInPerspectiveSlide key="shift-in-perspective" />,
    <SiloingSlide key="siloing" />,
    <ResolutionSlide key="resolution" />,
    <LandscapeSlide key="landscape" />,
    <MechanicsSlide key="mechanics" />,
    <EngineeringFitSlide key="engineering-fit" />,
  ],
};
