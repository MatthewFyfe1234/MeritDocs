import { CoverSlide } from './slides/CoverSlide';
import { ObligationGapSlide } from './slides/DisconnectSlide';
import { ProcessAuthoritySlide } from './slides/ProcessAuthoritySlide';
import { OriginGapSlide } from '../OriginGapSlide';
import { ValueCaptureSlide } from './slides/ValueCaptureSlide';
import { ContractLifecycleSlide } from './slides/ContractLifecycleSlide';
import { WorkedExampleSlide } from './slides/WorkedExampleSlide';
import { CompetitiveLandscapeSlide } from './slides/CompetitiveLandscapeSlide';
import { LastPieceSlide } from './slides/LastPieceSlide';
import { ProcessModelSlide } from './slides/ProcessModelSlide';
import { HighlightsSlide } from './slides/HighlightsSlide';
import { MunicipalReferencesSlide1, MunicipalReferencesSlide2 } from './slides/MunicipalReferencesSlide';

export const deck = {
  title: 'Merit OI: The Operation Behind the Asset',
  exportFilename: 'Merit-OI-Municipal.pdf',
  slides: [
    <CoverSlide key="cover" />,
    <ObligationGapSlide key="obligation-gap" />,
    <ProcessAuthoritySlide key="process-authority" />,
    <OriginGapSlide key="origin-gap" />,
    <ValueCaptureSlide key="value-capture" />,
    <ContractLifecycleSlide key="contract-lifecycle" />,
    <CompetitiveLandscapeSlide key="competitive-landscape" />,
    <LastPieceSlide key="last-piece" />,
    <WorkedExampleSlide key="worked-example" />,
    <ProcessModelSlide key="process-model" />,
    <HighlightsSlide key="highlights" />,
    <MunicipalReferencesSlide1 key="municipal-references-1" />,
    <MunicipalReferencesSlide2 key="municipal-references-2" />,
  ],
};
