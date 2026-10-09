import { CoverSlide } from './slides/CoverSlide';
import { ConceptSlide } from './slides/ConceptSlide';
import { QuotationsSlide } from './slides/QuotationsSlide';
import { OversightSlide } from './slides/OversightSlide';
import { WorkedExamplesSlide } from './slides/WorkedExamplesSlide';
import { OnboardingSlide } from './slides/OnboardingSlide';

export const deck = {
  title: 'Merit OI: Mini Demo Follow-Up',
  exportFilename: 'Merit-OI-Mini-Demo.pdf',
  slides: [
    <CoverSlide key="cover" />,
    <ConceptSlide key="concept" />,
    <QuotationsSlide key="quotations" />,
    <OversightSlide key="oversight" />,
    <WorkedExamplesSlide key="worked-examples" />,
    <OnboardingSlide key="onboarding" />,
  ],
};
