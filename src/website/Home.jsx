import React from "react";

import { useTranslation } from 'react-i18next';

import { Box, Button, Typography, Stack, Link, useTheme } from "@mui/material";
import { alpha } from '@mui/material/styles';

// Images
import HeroImage from "/images/home/hero-mod.webp";
import BI from "/images/home/BI.svg";
import CPQ from "/images/home/CPQ.svg";
import DocumentManagement from "/images/home/DocumentManagement.svg";
import Ethics from "/images/home/Ethics.webp";
import CRM from "/images/home/HRRecognition.svg";
import ProcessMapping from "/images/home/ProcessMapping.svg";
import ProjectManagement from "/images/home/ProjectManagement.svg";
import ResourcePlanning from "/images/home/ResourcePlanning.svg";

import Structure from '/images/home/structure.webp';
import Measurement from '/images/home/measurement.webp';
import Intelligence from '/images/home/intelligence.webp';

// Local context
import { useDispatch } from 'react-redux';
import { setPage, setSection } from '@/context/websiteStore.js';

const features = [
  { colour: "#eef4ff", width: "100%", icon: BI,                linkedTo: "Business Intelligence", i18nKey: "businessIntelligence" },
  { colour: "#f0e6ff", width: "50%",  icon: ProcessMapping,    linkedTo: "Process Mapping",       i18nKey: "processMapping" },
  { colour: "#f8e6e6", width: "50%",  icon: ProjectManagement, linkedTo: "Project Management",    i18nKey: "projectManagement" },
  { colour: "#e6f8e6", width: "100%", icon: ResourcePlanning,  linkedTo: "Resource Planning",     i18nKey: "resourcePlanning" },
  { colour: "#fff4e6", width: "50%",  icon: DocumentManagement,linkedTo: "Document Management",   i18nKey: "documentManagement" },
  { colour: "#e6f0ff", width: "50%",  icon: CPQ,               linkedTo: "CPQ",                   i18nKey: "cpq" },
  { colour: "#f0f8e6", width: "100%", icon: CRM,               linkedTo: "CRM",                   i18nKey: "crm" }
];

const Home = ({  }) => {
  const dispatch = useDispatch();
  
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        // background: "#e4e8e8",
        background: "#fff",
        pb: { xs: 2, sm: 5 }
      }}>
      <Welcome
        navToDemoRequest={() => {
          dispatch(setPage("DemoRequest"));
          dispatch(setSection("introduction"));
        }}/>
      <Contextualiser/>
      <Box
        id="Features"
        className="tracked-section"
        sx={{
          mx: { xs: 2, sm: 8, md: 18 },
          display: "flex",
          flexWrap: "wrap",
          gap: { xs: 2, sm: 3, md: 3 }
        }}>
        {
          features.map((feature, index) => (
            <Box
              key={index}
              sx={{
                width: {
                  xs: "100%",
                  sm: feature.width === "100%" ? "100%" : "calc(50% - 12px)"
                },
                flexGrow: 0,
                flexShrink: 0
              }}>
              <FeatureCard
                feature={feature}/>
            </Box>
          ))
        }
      </Box>
      <EthicsSection
        navToEthics={() => {
          dispatch(setPage("Values"));
          dispatch(setSection("introduction"));
        }}/>
      <HowMeritWorks/>
      <MeritConcept/>
    </Box>
  );
}

export default Home;

const Welcome = ({ navToDemoRequest }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Box
      id="Hero"
      className="tracked-section"
      sx={{
        minHeight: { xs: "100vh", sm: "calc(100dvh - 74px)" },
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
        pb: { xs: 4, md: 0 },

        // Base background image
        backgroundImage: `
          linear-gradient(
            rgba(100,97,141,0.85),
            rgba(100,97,141,0.75)
          ),
          url("/images/home/hero-mod.webp")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",

        // Make sure content sits above
        "& > *": {
          position: "relative",
          zIndex: 1
        }
      }}>
      <Box
        sx={{
          px: 2,
          pt: { xs: 6, sm: 0 },
          maxWidth: 800,
          mx: "auto"
        }}>
        <Typography
          sx={{ color: '#fff', fontWeight: 700 }}
          variant="h3" gutterBottom>
          {t('home.hero.title')}
        </Typography>

        <Typography variant="h6" sx={{ color: '#fff', mb: 3, maxWidth: "800px" }}>
          {t('home.hero.subtitle')}
        </Typography>
      </Box>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ mb: 3, alignItems: "center", justifyContent: "center" }}>
        <Button
          variant="outlined"
          onClick={navToDemoRequest}
          fullWidth={{ xs: true, sm: false }}
          sx={{
            borderRadius: "16px",
            px: 4,
            py: 1.5,
            fontSize: "1rem",
            borderColor: "#fff",
            color: "#fff"
          }}>
          {t('common.bookDemo')}
        </Button>
        <Button
          variant="contained"
          onClick={navToDemoRequest}
          fullWidth={{ xs: true, sm: false }}
          sx={{
            backgroundColor: "#fff",
            "&:hover": {
              backgroundColor: "#fff"
            },
            borderRadius: "16px",
            px: 4,
            py: 1.5,
            fontSize: "1rem",
            color: "#64618D"
          }}>
          {t('common.contactSales')}
        </Button>
      </Stack>

      <Typography
        variant="h6"
        sx={{ px: 2, color: '#fff', mx: "auto", maxWidth: "800px" }}>
        {t('home.hero.tagline')}
      </Typography>
    </Box>
  );
};

const Contextualiser = () => {
  const { t } = useTranslation();
  return (
    <Box
      component="section"
      id="context"
      className="tracked-section"
      sx={{
        position: "relative",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        pt: 6,
        mb: { xs: 4, md: 6 },
        px: { xs: 0.5, md: 10 },
        background: "linear-gradient(to bottom, #b8c5c5, #fff)"
      }}>
      <Box
        sx={{
          position: "absolute",
          top: 20,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 0
        }}>
        <Box
          component="img"
          src="/images/M.svg"
          alt="Logo"
          loading="lazy"
          sx={{
            width: '50%',
            height: 'auto',
            maxHeight: '650px',
            opacity: 0.05,
            aspectRatio: '1 / 1',
            objectFit: 'contain'
          }}/>
      </Box>
      {/* Foreground text content */}
      <Box
        sx={{
          px: { xs: 4, sm: 16, md: 24, lg: 12 },
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          textAlign: "center"
        }}>
        <Typography variant="h3" sx={{ fontWeight: 700 }} gutterBottom>
          {t('home.contextualiser.title')}
        </Typography>
        {
          [t('home.contextualiser.p1'), t('home.contextualiser.p2'), t('home.contextualiser.p3')].map((paragraph, idx) => (
            <Typography
              key={idx}
              variant="h6"
              sx={{ mb: 3, maxWidth: "800px" }}>
              {paragraph}
            </Typography>
          ))
        }
      </Box>
    </Box>
  );
};

const EthicsSection = ({ navToEthics }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Box
      id="Ethics Brief"
      className="tracked-section"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        gap: { xs: 8, md: 4 },
        py: 2,
        mx: { xs: 2, sm: 4, md: 10 },
        my: { xs: 2, md: 8 },
        backgroundColor: 'transparent'
      }}>
      <Box
        sx={{
          textAlign: { xs: 'center', md: 'left'},
          flex: 1
        }}>
        <Typography
          sx={{
            color: theme.palette.text.primary
          }}
          variant="h5" fontWeight="bold" gutterBottom>
          {t('home.ethics.title')}
        </Typography>
        <Typography
          sx={{ color: theme.palette.text.primary, mb: 2 }}
          variant="body1">
          {t('home.ethics.p1')}
        </Typography>
        <Typography
          sx={{ color: theme.palette.text.primary, mb: 2 }}
          variant="body1">
          {t('home.ethics.p2')}
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          {t('home.ethics.p3')}
        </Typography>
        <Button
          onClick={navToEthics}
          variant="contained"
          color="secondary"
          sx={{
            backgroundColor: '#f3f1fd',
            color: '#1e1e1e',
            textTransform: 'none',
            fontWeight: 'bold',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#e0deff'
            }
          }}>
          {t('home.ethics.cta')}
        </Button>
      </Box>
      
      {/* Right Image Section with Shadow Box */}
      <Box
        sx={{
          flex: 1,
          position: "relative",
          display: "flex",
          mr: { xs: 3, md: 0 },
          justifyContent: "center"
        }}>
        {/* Background Blue Box */}
        <Box
          sx={{
            position: 'absolute',
            top: -30,
            right: -20,
            width: '100%',
            height: '100%',
            backgroundColor: '#f1f9ff',
            zIndex: 0
          }}/>
        {/* Foreground Image */}
        <Box sx={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 600 }}>
          <img src={Ethics} alt="Ethics team" loading="lazy" style={{ width: '100%', height: 'auto' }} />
        </Box>
      </Box>
    </Box>
  );
};

const FeatureCard = ({ feature }) => {
  const { t } = useTranslation();
  const { colour, icon, linkedTo, i18nKey } = feature;
  const { header, title, description } = t(`home.features.${i18nKey}`, { returnObjects: true });
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        backgroundColor: alpha(colour, 0.5),
        borderRadius: 4,
        p: 4,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 250,
        height: "100%"
      }}>
      <Stack spacing={2}>
        <Typography color="blue" sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
          {header}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 400 }}>
          {description}
        </Typography>
      </Stack>

      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-end", mt: 4 }}>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(setPage("Platform"));
            dispatch(setSection(linkedTo));
          }}
          sx={{
            backgroundColor: "#fff",
            color: "#000",
            px: 2,
            py: 0.5,
            fontSize: "0.85rem",
            borderRadius: "999px",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#f4f4f4",
              boxShadow: "none"
            }
          }}>
          {t('common.learnMore')}
        </Button>
        
      {/* Icon container */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "40%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.1,
          zIndex: 0
        }}>
        <Box
          component="img"
          src={icon}
          alt={`${header} icon`}
          loading="lazy"
          sx={{
            maxWidth: "80%",
            maxHeight: "80%",
            objectFit: "contain"
          }}/>
      </Box>
      </Stack>
    </Box>
  );
};

const functionalities = [
  { i18nKey: "model",   image: Structure },
  { i18nKey: "execute", image: Measurement },
  { i18nKey: "improve", image: Intelligence }
];

const HowMeritWorks = () => {
  const { t } = useTranslation();
  return (
    <Box
      id="How Merit Works"
      className="tracked-section"
      sx={{
        backgroundColor: '#f9f9fb',
        borderRadius: 4,
        mx: { xs: 2, md: 8 },
        px: { xs: 3, md: 8 },
        py: { xs: 2, md: 7 },
        textAlign: 'center'
      }}>
      {/* Title */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
        {t('home.howMeritWorks.title')}
      </Typography>

      {/* Subtitle */}
      <Typography variant="body1" sx={{ maxWidth: 700, mx: "auto", mb: 6 }}>
        {t('home.howMeritWorks.subtitle')}
      </Typography>

      {/* Icons and Labels */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'center',
          gap: { xs: 6, md: 10 },
          textAlign: 'center'
        }}>
        {
          functionalities.map((func, index) => (
            <FunctionCard
              key={index}
              i18nKey={func.i18nKey}
              image={func.image} />
          ))
        }
      </Box>
    </Box>
  );
};

const MeritConcept = () => {
  const { t } = useTranslation();
  return (
    <Box
      id="What We Mean by Merit"
      className="tracked-section"
      sx={{
        textAlign: 'center',
        px: { xs: 4, sm: 12, md: 24 },
        py: { xs: 6, md: 10 },
        mx: { xs: 2, md: 8 },
        mt: { xs: 4, md: 6 },
      }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {t('home.meritConcept.title')}
      </Typography>
      {
        t('home.meritConcept.content', { returnObjects: true }).map((paragraph, idx) => (
          <Typography key={idx} variant="body1" sx={{ mb: 2, mx: 'auto', maxWidth: 700 }}>
            {paragraph}
          </Typography>
        ))
      }
    </Box>
  );
};

const FunctionCard = ({ i18nKey, image }) => {
  const { t } = useTranslation();
  const { title, description } = t(`home.howMeritWorks.${i18nKey}`, { returnObjects: true });
  return (
    <Box
      sx={{
        position: 'relative',
        px: 2,
        py: { xs: 4, md: 6 },
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
      {/* Background image that *respects flow* */}
      <Box
        component="img"
        src={image}
        alt=""
        loading="lazy"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          opacity: 0.08,
          filter: 'grayscale(100%)',
          zIndex: 0,
          pointerEvents: 'none'
        }}/>
      {/* Foreground text */}
      <Box sx={{ zIndex: 1, maxWidth: '60%' }}>
        <Typography sx={{ fontWeight: "bold", mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2">
          {description}
        </Typography>
      </Box>
    </Box>
  );
};
