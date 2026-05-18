import { useTranslation } from 'react-i18next';

import { Box, Typography, Grid, useTheme } from '@mui/material';

import ContentFooter from './components/ContentFooter';

import headerImage from '/images/texture.webp';


const sectionWrapSx = {
  display: 'flex',
  flexDirection: 'column',
  mx: { xs: 2, md: 6 },
  mb: { xs: 4, md: 6 },
  p: { xs: 2, md: 6 },
  background: 'rgba(136, 136, 136, 0.08)',
  borderRadius: 6
};

const cardSx = {
  p: { xs: 2.5, md: 3 },
  height: '100%',
  backgroundColor: 'rgba(137, 207, 240, 0.1)',
  borderRadius: 2,
  boxShadow: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: 1
};

const FailureCard = ({ dimension, problem, detail }) => {
  const theme = useTheme();
  return (
    <Box sx={cardSx}>
      <Typography
        variant="overline"
        sx={{ fontWeight: 600, color: theme.palette.primary.main, letterSpacing: 2, lineHeight: 1 }}>
        {dimension}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
        {problem}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 300, lineHeight: 1.6, color: 'rgba(0,0,0,0.75)' }}>
        {detail}
      </Typography>
    </Box>
  );
};

const HorizonCard = ({ label, headline, detail }) => {
  const theme = useTheme();
  return (
    <Box sx={cardSx}>
      <Typography
        variant="overline"
        sx={{ fontWeight: 600, color: theme.palette.primary.main, letterSpacing: 2, lineHeight: 1 }}>
        {label}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
        {headline}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 300, lineHeight: 1.6, color: 'rgba(0,0,0,0.75)' }}>
        {detail}
      </Typography>
    </Box>
  );
};

const Hero = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Box
      id="introduction"
      className="tracked-section"
      sx={{
        position: 'relative',
        textAlign: 'center',
        py: { xs: 4, sm: 12 },
        px: 2,
        backgroundColor: theme.palette.background.default,
        // Image rendered via ::before so CSS filter can be applied to it independently
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `url(${headerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'invert(1)',
          opacity: 0.08,
          zIndex: 0,
          pointerEvents: 'none'
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: '-1px',
          background: `linear-gradient(to bottom, rgba(0,0,0,0) 50%, ${theme.palette.background.default} 100%)`,
          pointerEvents: 'none',
          zIndex: 1
        },
        '& > *': {
          position: 'relative',
          zIndex: 2
        }
      }}>
      <Box sx={{ maxWidth: 800, mx: 'auto', textAlign: 'center' }}>
        <Typography
          sx={{
            fontSize: { xs: '36px', sm: '4.4vw' },
            fontFamily: theme.typography.fontFamily,
            color: theme.palette.text.primary,
            lineHeight: 1.2,
            fontWeight: 'bold'
          }}>
          {t('whyMerit.hero.title')}
        </Typography>
        {
          [t('whyMerit.hero.p1'), t('whyMerit.hero.p2')].map((paragraph, index) => (
            <Typography
              key={index}
              sx={{
                fontSize: { xs: '18px', sm: '1.7vw' },
                fontFamily: theme.typography.fontFamily,
                color: theme.palette.text.primary,
                lineHeight: 1.5,
                mt: index === 0 ? 2 : 1.5
              }}>
              {paragraph}
            </Typography>
          ))
        }
      </Box>
    </Box>
  );
};

const WhyMerit = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const failures = Object.values(t('whyMerit.theProblem.failures', { returnObjects: true }));
  const horizons = Object.values(t('whyMerit.theAdvantage.horizons', { returnObjects: true }));

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default }}>

      <Hero/>

      {/* Six Failures */}
      <Box
        component="section"
        id="The Problem"
        className="tracked-section"
        sx={sectionWrapSx}>
        <Typography variant="h5" sx={{ fontWeight: 600 }} gutterBottom>
          {t('whyMerit.theProblem.title')}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 300, mb: 4, maxWidth: 700 }}>
          {t('whyMerit.theProblem.subtitle')}
        </Typography>
        <Grid container spacing={2} sx={{ width: '100%' }}>
          {
            failures.map((failure) => (
              <Grid key={failure.dimension} size={{ xs: 12, sm: 6, md: 4 }}>
                <FailureCard {...failure}/>
              </Grid>
            ))
          }
        </Grid>
      </Box>

      {/* The Solution */}
      <Box
        component="section"
        id="The Solution"
        className="tracked-section"
        sx={sectionWrapSx}>
        <Typography variant="h5" sx={{ fontWeight: 600 }} gutterBottom>
          {t('whyMerit.theSolution.title')}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 300, mb: 2, lineHeight: 1.7 }}>
          {t('whyMerit.theSolution.p1')}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 300, lineHeight: 1.7 }}>
          {t('whyMerit.theSolution.p2')}
        </Typography>
      </Box>

      {/* Three Horizons */}
      <Box
        component="section"
        id="The Advantage"
        className="tracked-section"
        sx={sectionWrapSx}>
        <Typography variant="h5" sx={{ fontWeight: 600 }} gutterBottom>
          {t('whyMerit.theAdvantage.title')}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 300, mb: 4, maxWidth: 600 }}>
          {t('whyMerit.theAdvantage.subtitle')}
        </Typography>
        <Grid container spacing={2} sx={{ width: '100%' }}>
          {
            horizons.map((horizon) => (
              <Grid key={horizon.label} size={{ xs: 12, md: 4 }}>
                <HorizonCard {...horizon}/>
              </Grid>
            ))
          }
        </Grid>
      </Box>

      <ContentFooter/>
    </Box>
  );
};

export default WhyMerit;
