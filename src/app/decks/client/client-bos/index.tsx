import { CoverSlide } from './slides/CoverSlide';
import { DiagnosisSlide } from './slides/DiagnosisSlide';
import { CommonThreadSlide } from './slides/CommonThreadSlide';
import { MeritOSSlide } from './slides/MeritOSSlide';
import { RIBASlide } from './slides/RIBASlide';
import { CaseStudySlide } from './slides/CaseStudySlide';
import { ToolGapSlide } from './slides/ToolGapSlide';
import { BeyondSlide } from './slides/BeyondSlide';
import { BeyondAssociationSlide } from './slides/BeyondAssociationSlide';

export const deck = {
  title: 'Merit OI: BUILDOFFSITE',
  exportFilename: 'Merit-OI-BUILDOFFSITE.pdf',
  slides: [
    <CoverSlide key="cover" />,
    <DiagnosisSlide key="diagnosis" />,
    <CommonThreadSlide key="common-thread" />,
    <RIBASlide key="riba" />,
    <ToolGapSlide key="tool-gap" />,
    <MeritOSSlide key="merit-os" />,
    <CaseStudySlide key="case-study" />,
    <BeyondSlide key="beyond" />,
    <BeyondAssociationSlide key="beyond-association" />,
  ],
};
