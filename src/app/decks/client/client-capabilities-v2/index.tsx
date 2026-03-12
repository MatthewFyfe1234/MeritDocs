import { CoverSlide } from '../client-capabilities/slides/CoverSlide';
import { ProblemSlide } from './slides/ProblemSlide';
import { OrganisationSlide } from './slides/OrganisationSlide';
import { ConceptSlide } from '../client-overview/slides/ConceptSlide';
import { SpecificationSlide } from './slides/SpecificationSlide';
import { InventorySlide } from './slides/InventorySlide';
import { ProjectMapSlide } from '../client-capabilities/slides/ProjectMapSlide';
import { ForecastsSlide } from './slides/ForecastsSlide';
import { ExecutionSlide } from '../client-overview/slides/ExecutionSlide';
import { AdvantageSlide } from '../client-capabilities/slides/AdvantageSlide';
import { ReferencesSlide } from '../client-capabilities/slides/ReferencesSlide';

export const deck = {
  title: 'Merit OI: Platform Capabilities (v2)',
  exportFilename: 'Merit-OI-Platform-Capabilities-v2.pdf',
  slides: [
    <CoverSlide key="cover" />,
    <ProblemSlide key="problem" />,
    <OrganisationSlide key="organisation" />,
    <ConceptSlide key="concept" />,
    <SpecificationSlide key="specification" />,
    <InventorySlide key="inventory" />,
    <ProjectMapSlide key="project-map" />,
    <ForecastsSlide key="forecasts" />,
    <ExecutionSlide key="execution" />,
    <AdvantageSlide key="advantage" />,
    <ReferencesSlide key="references" />,
  ],
};
