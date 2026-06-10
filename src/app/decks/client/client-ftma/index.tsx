import { CoverSlide } from './slides/CoverSlide';
import { SectorSlide } from './slides/SectorSlide';
import { OnboardingSlide } from './slides/OnboardingSlide';
import { OrganisationEffectSlide } from './slides/OrganisationEffectSlide';
import { ReferencesSlide } from './slides/ReferencesSlide';

export const deck = {
  title: "A 'Union' of Organisations",
  exportFilename: 'Merit-Union-of-Organisations.pdf',
  slides: [
    <CoverSlide key="cover" />,
    <SectorSlide key="sector" />,
    <OnboardingSlide key="onboarding" />,
    <OrganisationEffectSlide key="organisation-effect" />,
    <ReferencesSlide key="references" />,
  ],
};
