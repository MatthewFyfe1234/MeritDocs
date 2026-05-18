import { useTranslation } from 'react-i18next';
import { Box, Typography, Grid, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setPage, setSection } from '@/context/websiteStore.js';
import ContentFooter from './components/ContentFooter';
import Intro from './components/Intro';
import ContextSection from './components/ContextSection';
import silosImage from '/images/resources/silos.webp';
import conceptImage from '/images/resources/concept.webp';
import fabricImage from '/images/resources/fabric.webp';

const cardSx = {
  p: { xs: 2.5, md: 3 },
  height: '100%',
  backgroundColor: 'rgba(137, 207, 240, 0.1)',
  borderRadius: 2,
  boxShadow: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 1
};

const sectionWrapSx = {
  display: 'flex',
  flexDirection: 'column',
  mx: { xs: 2, md: 6 },
  mb: { xs: 4, md: 6 },
  p: { xs: 2, md: 6 },
  background: 'rgba(136, 136, 136, 0.08)',
  borderRadius: 6
};

const FunctionCard = ({ title, body, link }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <Box sx={cardSx}>
      <Typography
        variant="overline"
        sx={{ fontWeight: 600, color: theme.palette.text.primary, letterSpacing: 2, lineHeight: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 300, lineHeight: 1.6, color: 'rgba(0,0,0,0.75)', flexGrow: 1 }}>
        {body}
      </Typography>
      {link && (
        <Typography
          variant="caption"
          onClick={() => { dispatch(setPage(link.page)); dispatch(setSection(link.section)); }}
          sx={{ cursor: 'pointer', color: theme.palette.action.primary, mt: 1 }}>
          {t('common.learnMore')}
        </Typography>
      )}
    </Box>
  );
};

const WhyMeritV2 = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const functionLinks = {
    projectManagement:  { page: 'Platform', section: 'Project Management' },
    resourcePlanning:   { page: 'Platform', section: 'Resource Planning' },
    documentManagement: { page: 'Platform', section: 'Document Management' },
    crm:                { page: 'Platform', section: 'CRM' },
    businessIntelligence: { page: 'Platform', section: 'Business Intelligence' },
    hr:                 { page: 'Teams',    section: 'Human Resources' },
  };

  const functions = Object.entries(t('whyMeritV2.everythingFollows.functions', { returnObjects: true }))
    .map(([key, fn]) => ({ ...fn, link: functionLinks[key] }));

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default }}>
      <Intro
        title={t('whyMeritV2.silosByDesign.title')}
        content={[t('whyMeritV2.silosByDesign.p1'), t('whyMeritV2.silosByDesign.p2')]}
        backgroundImage={silosImage}
        overlay="rgba(255,255,255,0.75)"/>
      <ContextSection
        id="product-implies-process"
        title={t('whyMeritV2.productImpliesProcess.title')}
        content={[t('whyMeritV2.productImpliesProcess.p1'), t('whyMeritV2.productImpliesProcess.p2')]}
        image={conceptImage}
        hasGap/>
      <ContextSection
        id="the-model"
        title={t('whyMeritV2.theModel.title')}
        content={[t('whyMeritV2.theModel.p1'), t('whyMeritV2.theModel.p2')]}
        image={fabricImage}
        hasGap/>
      {/* Everything Follows */}
      <Box
        component="section"
        id="everything-follows"
        className="tracked-section"
        sx={sectionWrapSx}>
        <Typography variant="h5" sx={{ fontWeight: 600 }} gutterBottom>
          {t('whyMeritV2.everythingFollows.title')}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 300, mb: 4, maxWidth: 700 }}>
          {t('whyMeritV2.everythingFollows.intro')}
        </Typography>
        <Grid container spacing={2} sx={{ width: '100%' }}>
          {functions.map((fn) => (
            <Grid key={fn.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <FunctionCard {...fn} />
            </Grid>
          ))}
        </Grid>
        <Typography variant="body1" sx={{ fontWeight: 300, mt: 4, lineHeight: 1.7, maxWidth: 750, fontStyle: 'italic' }}>
          {t('whyMeritV2.everythingFollows.closing')}
        </Typography>
      </Box>
      <ContentFooter />
    </Box>
  );
};

export default WhyMeritV2;
