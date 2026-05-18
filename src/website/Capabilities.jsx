import { useTranslation } from 'react-i18next';

// @mui components
import { Box } from '@mui/system';
import { useTheme } from '@mui/material';

// Components
import Intro from './components/Intro';
import SectionContainer from './components/Section';
import ContentFooter from './components/ContentFooter';

import CapabilitiesHeader from '/images/capabilities/CapabilitiesHeader.webp';
import { capabilitiesSections } from './config/capabilities-sections';

const Capabilities = ({ setRequestADemoOpen }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const sections = capabilitiesSections.map(s => ({
    ...s,
    ...t(`capabilities.sections.${s.sectionKey}`, { returnObjects: true })
  }));

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default }}>
      <Intro
        title={t('capabilities.intro.title')}
        content={t('capabilities.intro.content', { returnObjects: true })}
        backgroundImage={CapabilitiesHeader}/>
      <SectionContainer
        sections={sections}
        imageUnderclip={-4}
        objectFit="contain"/>
      <ContentFooter setRequestADemoOpen={setRequestADemoOpen}/>
    </Box>
  );
}

export default Capabilities;