import { useTranslation } from 'react-i18next';

// @mui components
import { Box } from '@mui/system';
import { useTheme } from '@mui/material';

// Components
import Intro from './components/Intro';
import SectionContainer from './components/Section';
import ContentFooter from './components/ContentFooter';

import useCasesHeader from '/images/industries/UseCasesHeader.webp';
import { useCasesSections } from './config/use-cases-sections';

const UseCases = ({ setRequestADemoOpen }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const sections = useCasesSections.map(s => ({
    ...s,
    ...t(`useCases.sections.${s.sectionKey}`, { returnObjects: true })
  }));

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default }}>
      <Intro
        id="Use Cases Intro"
        title={t('useCases.intro.title')}
        content={t('useCases.intro.content', { returnObjects: true })}
        backgroundImage={useCasesHeader}/>
      <SectionContainer sections={sections} hasGap/>
      <ContentFooter setRequestADemoOpen={setRequestADemoOpen}/>
    </Box>
  );
}

export default UseCases;