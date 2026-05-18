import { CoverSlide } from './slides/CoverSlide';
import { LandscapeSlide } from './slides/LandscapeSlide';
import { EconomicImpactSlide } from './slides/EconomicImpactSlide';
import { FailurePointsSlide } from './slides/FailurePointsSlide';
import { ResponseWorkflowSlide } from './slides/ResponseWorkflowSlide';
import { MechanicsSlide } from './slides/MechanicsSlide';
import { PreparednesSlide } from './slides/PreparednesSlide';
import { BeforeAfterSlide } from './slides/BeforeAfterSlide';
import { ValuePropositionSlide } from './slides/ValuePropositionSlide';
import { ReferencesSlide } from './slides/ReferencesSlide';

export const deck = {
  title: 'Merit OI: Disease Outbreak Response',
  exportFilename: 'Merit-OI-Disease-Outbreak-Response.pdf',
  slides: [
    <CoverSlide key="cover" />,
    <LandscapeSlide key="landscape" />,
    <EconomicImpactSlide key="economic-impact" />,
    <FailurePointsSlide key="failure-points" />,
    <ResponseWorkflowSlide key="response-workflow" />,
    <MechanicsSlide key="mechanics" />,
    <PreparednesSlide key="preparedness" />,
    <BeforeAfterSlide key="before-after" />,
    <ValuePropositionSlide key="value-proposition" />,
    <ReferencesSlide key="references" />,
  ],
};
