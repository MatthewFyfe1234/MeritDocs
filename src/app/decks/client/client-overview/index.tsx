import { CoverSlide } from './slides/CoverSlide';
import { ProblemSlide } from './slides/ProblemSlide';
import { OrganisationSlide } from './slides/OrganisationSlide';
import { ConceptSlide } from './slides/ConceptSlide';
import { MechanicsSlide } from './slides/MechanicsSlide';
import { ChangesSlide } from './slides/ChangesSlide';
import { ValueSlide } from './slides/ValueSlide';
import { ReferencesSlide } from './slides/ReferencesSlide';

export const deck = {
  title: 'Merit OI: Client Overview',
  exportFilename: 'Merit-OI-Client-Overview.pdf',
  slides: [
    <CoverSlide key="cover" />,
    <ProblemSlide key="problem" />,
    <OrganisationSlide key="organisation" />,
    <ConceptSlide key="concept" />,
    <MechanicsSlide key="mechanics" />,
    <ChangesSlide key="changes" />,
    <ValueSlide key="value" />,
    <ReferencesSlide key="references" />,
  ],
};
