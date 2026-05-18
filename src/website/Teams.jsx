import { useTranslation } from 'react-i18next';

// @mui components
import { Box } from '@mui/system';
import { useTheme } from '@mui/material';

// Components
import ContextSection from './components/ContextSection';
import Intro from './components/Intro';
import SectionContainer from './components/Section';
import ContentFooter from './components/ContentFooter';

import Context from '/images/teams/Context.webp';
import teamsHeader from '/images/teams/TeamsHeader.webp';
import { teamsSections } from './config/teams-sections';

const Roles = ({ setRequestADemoOpen }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const sections = teamsSections.map(s => ({
    ...s,
    ...t(`teams.sections.${s.sectionKey}`, { returnObjects: true })
  }));

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default }}>
      <Intro
        title={t('teams.intro.title')}
        content={t('teams.intro.content', { returnObjects: true })}
        backgroundImage={teamsHeader}/>
      <ContextSection
        id="Skill Allocation"
        title={t('teams.skillAllocation.title')}
        content={t('teams.skillAllocation.content', { returnObjects: true })}
        image={
          <Box
            component="img"
            src={Context}
            alt="From Compliance to Competitive Advantage"
            sx={{
              width: '45%',
              objectFit: 'contain',
              filter: 'brightness(0) saturate(100%)', // black
              opacity: 0.08,
              background: 'transparent',
              mixBlendMode: 'multiply'
            }}/>
        }
        hasGap/>
      <SectionContainer sections={sections} hasGap/>
      <ContentFooter setRequestADemoOpen={setRequestADemoOpen}/>
    </Box>
  );
}

export default Roles;
