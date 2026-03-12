import { CoverSlide } from './slides/CoverSlide';
import { ContextSlide } from './slides/ContextSlide';
import { ConceptSlide } from './slides/ConceptSlide';
import { OrganisationSlide } from './slides/OrganisationSlide';
import { ExecutionSlide } from './slides/ExecutionSlide';
import { ProblemSlide } from './slides/ProblemSlide';
import { ChangesSlide } from './slides/ChangesSlide';
import { ValueSlide } from './slides/ValueSlide';
import { ImplicationsSlide } from './slides/ImplicationsSlide';
import { ReferencesSlide } from './slides/ReferencesSlide';

export const deck = {
  title: 'Merit OI: Product Overview',
  exportFilename: 'Merit-OI-Product-Overview.pdf',
  slides: [
    <CoverSlide key="cover" />,
    <ProblemSlide key="problem" />,
    // CONCEPT
    <OrganisationSlide key="organisation" />,
    <ConceptSlide key="concept" />,
    <ExecutionSlide key="execution" />,
    // VALUE
    <ChangesSlide key="changes" />,
    <ValueSlide key="value" />,
    <ImplicationsSlide key="implications" />,
    <ContextSlide key="context" />,
    <ReferencesSlide key="references" />,
  ],
};
