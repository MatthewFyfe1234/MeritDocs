import { useTranslation } from 'react-i18next';

// @mui components
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material';

//components
import ContactPanel from './components/ContactPanel';

import FullWidthSection from './components/FullWidthSection';

// Images
import Vision from '/images/aboutus/Vision.svg';
import Mission from '/images/aboutus/Mission.svg';
import what from '/images/aboutus/What.webp';
import who from '/images/aboutus/Who.webp';

const sectionImages = [
  { id: 'Where We Began',  image: who,  sectionKey: 'origin' },
  { id: 'What Merit Means', image: what, sectionKey: 'definition' }
];

const AboutUs = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const sections = sectionImages.map(s => ({
    ...s,
    ...t(`aboutUs.sections.${s.sectionKey}`, { returnObjects: true })
  }));

  return (
    <Box sx={{ background: theme.palette.background.default }}>
      <Box
        id="introduction"
        className="tracked-section"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}>
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            px: { xs: 2, md: 4, lg: 6 },
            py: { xs: 2, md: 4, lg: 6 },
            textAlign: "center",

            // Purple overlay + image
            backgroundImage: `
              linear-gradient(
                rgba(100,97,141,0.9),
                rgba(100,97,141,0.9)
              ),
              url("/images/aboutus/about-mod.webp")
            `,
            backgroundSize: "cover",
            backgroundPosition: "center",

            // Keep text above layers
            "& > *": {
              position: "relative",
              zIndex: 1
            }
          }}>
          <Typography
            sx={{ color: '#fff', fontWeight: 700 }}
            variant="h3" gutterBottom>
            {t('aboutUs.header.title')}
          </Typography>
          <Typography variant="h6" sx={{ color: '#fff', mb: 4 }}>
            {t('aboutUs.header.subtitle')}
          </Typography>
        </Box>
        <Box
          sx={{
            textAlign: 'center',
            py: { xs: 4, md: 6, lg: 8 },
            px: { xs: 2, sm: 16, md: 24, lg: 24 },
          }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 4, md: 8, lg: 12 },
            }}>
            <IntentCard
              title={t('aboutUs.vision.title')}
              content={t('aboutUs.vision.content')}
              image={Vision}
              theme={theme}/>
            <IntentCard
              colour="#f8e6e6"
              title={t('aboutUs.mission.title')}
              content={t('aboutUs.mission.content')}
              image={Mission}
              theme={theme}/>
          </Box>
        </Box>
      </Box>
      {
        sections.map((section, index) => (
          <FullWidthSection
            key={section.id}
            id={section.id}
            title={section.title}
            content={section.content}
            image={section.image}
            reverse={index % 2 !== 0}
            colour='#64618D'/>
        ))
      }
      <Box
        id="Contact Us"
        className="tracked-section"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2
        }}>
        <GeneralEnquiry/>
      </Box>
    </Box>
  );
}

export default AboutUs;

const IntentCard = ({ colour = "#f0e6ff", title, content, image }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        backgroundColor: colour,
        borderRadius: 6,
        overflow: 'hidden',
        p: { xs: 2, md: 4, lg: 6 },
        minHeight: { xs: 200, md: 300 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        textAlign: 'left'
      }}>
      {/* Absolutely positioned image in top-right, behind content */}
      <Box
        component="img"
        src={image}
        sx={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          height: { xs: '80px', md: '160px' },
          objectFit: 'contain',
          filter: 'brightness(0) saturate(100%)',
          opacity: 0.08,
          pointerEvents: 'none',
        }}/>

      {/* Title in top-left */}
      <Typography
        color="blue"
        sx={{ fontWeight: 600, fontSize: "1.1rem", zIndex: 1 }}>
        {title}
      </Typography>

      {/* Content at the bottom */}
      <Typography
        variant="body1"
        sx={{ maxWidth: 400, zIndex: 1 }}>
        {content}
      </Typography>
    </Box>
  );
};

const GeneralEnquiry = () => {
  const { t } = useTranslation();
  return (
    <ContactPanel
      title={t('aboutUs.contact.formTitle')}
      subject={t('aboutUs.contact.formSubject')}
      subtitle={t('aboutUs.contact.formSubtitle')}
      enquiryTypeId={3}>
      <Box
        sx={{
          flex: { xs: '1 1 100%', sm: '1 1 50%' },
          display: 'flex',
          pt: { xs: 0, sm: 2 },
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 2,
          px: { xs: 2, sm: 4, md: 10 },
          my: { xs: 2, md: 4, lg: 6, xl: 8 }
        }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700 }}>
          {t('aboutUs.contact.heading')}
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontWeight: 400 }}>
          {t('aboutUs.contact.body')}
        </Typography>
      </Box>
    </ContactPanel>
  );
}
