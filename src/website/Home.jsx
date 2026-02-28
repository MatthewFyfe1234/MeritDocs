import React from "react";
import { Box, Button, Typography, Stack, Link, useTheme } from "@mui/material";
import { alpha } from '@mui/material/styles';

// Images
import HeroImage from "/images/home/hero-mod.webp";
import BI from "/images/home/BI.svg";
import CPQ from "/images/home/CPQ.svg";
import DocumentManagement from "/images/home/DocumentManagement.svg";
import Ethics from "/images/home/Ethics.webp";
import HRRecognition from "/images/home/HRRecognition.svg";
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
  {
    colour: "#eef4ff",
    header: "Business Intelligence",
    title: "Turn insight into action",
    description: "Fractal, process integrated business intelligence, enables you to pinpoint opportunities, monitor performance, and drive informed decision-making across your organisation.",
    width: "100%",
    icon: BI,
    linkedTo: "Business Intelligence"
  },
  {
    colour: "#f0e6ff",
    header: "Process Mapping",
    title: "Visualize your processes",
    description: "Define and view processes at various levels of detail using our Google Maps style interface, ensuring clarity and alignment across teams and functions.",
    width: "50%",
    icon: ProcessMapping,
    linkedTo: "Process Mapping"
  },
  {
    colour: "#f8e6e6",
    header: "Project Management",
    title: "Streamline your projects",
    description: "Plan projects on the basis of product specifications, then coordinate using our unique tools to predict execution times and resource needs, based on historic data.",
    width: "50%",
    icon: ProjectManagement,
    linkedTo: "Project Management"
  },
  {
    colour: "#e6f8e6",
    header: "Resource Planning",
    title: "Optimize your organisations time",
    description: "Model people, skills, tools, availability, and cost to connect capacity directly to operational demand and planned work.",
    width: "100%",
    icon: ResourcePlanning,
    linkedTo: "Resource Planning"
  },
  {
    colour: "#fff4e6",
    header: "Document Management",
    title: "Structure the knowledge that powers outcomes",
    description: "Place documents alongside the people, inventory items, projects, or process steps they relate to for natural organization and easy discovery.",
    width: "50%",
    icon: DocumentManagement,
    linkedTo: "Document Management"
  },
  {
    colour: "#e6f0ff",
    header: "CPQ",
    title: "Simplify complexity without losing precision",
    description: "Create specifications within the constraints of a master product to fit your industry and company capabilities. Configure material and pricing rules accordingly and generate time estimates based on historical project data.",
    width: "50%",
    icon: CPQ,
    linkedTo: "CPQ"
  },
  {
    colour: "#f0f8e6",
    header: "HR Recognition",
    title: "See contribution, reward impact",
    description: "Track real performance and link recognition to outcomes, creating a culture where effort is seen and valued.",
    width: "100%",
    icon: HRRecognition,
    linkedTo: "HR/Recognition"
  }
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
    </Box>
  );
}

export default Home;

const Welcome = ({ navToDemoRequest }) => {
  const theme = useTheme();
  return (
    <Box
      id="Hero"
      className="tracked-section"
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
          px: { xs: 6, sm: 16, md: 24, lg: 12 },
          pt: { xs: 6, sm: 6, md: 8, lg: 12 },
          maxWidth: 800,
          mx: "auto"
        }}>
        <Typography
          sx={{
            color: '#fff'
          }}
          variant="h3" fontWeight={700} gutterBottom>
          The Unified Operating System for Your Business
        </Typography>

        <Typography variant="h6" maxWidth="800px" sx={{ color: '#fff', mb: 4 }}>
          Bring all your operations together into a single execution model, shared by every team, 
          so you can design, execute, optimize, and repeat with unprecedented clarity and control.
        </Typography>
      </Box>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        mb={6}
        alignItems="center"
        justifyContent="center">
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
          Book a Demo
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
          Contact Sales
        </Button>
      </Stack>

      <Typography
        variant="h6"
        maxWidth="800px"
        sx={{ px: { xs: 4, sm: 16, md: 24, lg: 12 }, color: '#fff' }}>
        Replace fragmented ERP, CPQ, BI, and Project Management, Process Mapping, and Document Management tools with one system spanning every function and team.
      </Typography>
    </Box>
  );
};

const Contextualiser = () => {
  return (
    <Box
      component="section"
      id="context"
      className="tracked-section"
      position="relative"
      sx={{
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
        position="absolute"
        top={20}
        left={0}
        right={0}
        bottom={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
        zIndex={0}>
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
        }}
        zIndex={1} display="flex" flexDirection="column" textAlign="center">
        <Typography variant="h3" fontWeight={700} gutterBottom> {/* The Difference is Unity */ }
          The Value of Unity
        </Typography>
        {
          [
            `When everyone works from the same execution model, it becomes easier to see how work is
             done, who is contributing, and what is driving results.`,
            `Merit connects people, tools, and processes directly to outcomes, making drivers of
             excellence visible, measurable, and repeatable.`,
            `With everything fully integrated, you unlock automation and intelligence that siloed
             tools can’t deliver.`
            ].map((paragraph, idx) => (
              <Typography
                key={idx}
                variant="h6"
                maxWidth="800px"
                sx={{ mb: 3 }}>
                {paragraph}
              </Typography>
            ))
        }
        <Typography
          variant="h6"
          fontWeight={700}
          maxWidth="800px"
          sx={{ mb: 3, userSelect: "none" }}>
          Drive better outcomes together, with Merit.
        </Typography>
      </Box>
    </Box>
  );
};

const EthicsSection = ({ navToEthics }) => {
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
          textAlign: { xs: 'center', md: 'left'}
        }}
        flex={1}>
        <Typography
          sx={{
            color: theme.palette.text.primary
          }}
          variant="h5" fontWeight="bold" gutterBottom>
          Accountability by Design
        </Typography>
        <Typography
          sx={{ color: theme.palette.text.primary }}
          variant="body1" mb={2}>
          Merit enables absolute transparency across work, with enterprise-grade permissions and governance.
        </Typography>
        <Typography
          sx={{ color: theme.palette.text.primary }}
          variant="body1" mb={2}>
          When work is visible, contributions are traceable, and outcomes are measurable, organisations unlock not just performance but trust.
        </Typography>
        <Typography variant="body1" mb={4}>
          Merit connects delivery to decisions with clear governance, so recognition is consistent, effort is visible, and rewards are fair.
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
          Explore how ethics is integral to the platform →
        </Button>
      </Box>
      
      {/* Right Image Section with Shadow Box */}
      <Box
        flex={1}
        position="relative"
        display="flex"
        mr={{ xs: 3, md: 0 }}
        justifyContent="center">
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
  const { colour, header, title, description, icon, linkedTo } = feature;
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
        <Typography fontWeight={600} color="blue" fontSize="1.1rem">
          {header}
        </Typography>
        <Typography variant="h5" fontWeight={500}>
          {title}
        </Typography>
        <Typography variant="body1" maxWidth={400}>
          {description}
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between" alignItems="flex-end" mt={4}>
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
          Learn More →
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
  {
    title: "Structure",
    description: "Build processes that connect teams, tools, and outcomes.",
    image: Structure
  },
  {
    title: "Measurement",
    description: "Understand progress, performance, cost, and contribution at every level.",
    image: Measurement
  },
  {
    title: "Intelligence",
    description: "Spot inefficiencies, identify impact, and act with clarity.",
    image: Intelligence
  }
];

const HowMeritWorks = () => {
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
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ userSelect: "none" }}>
        How Merit Works
      </Typography>

      {/* Subtitle */}
      <Typography variant="body1" sx={{ maxWidth: 700, mx: "auto", mb: 6, userSelect: "none" }}>
        Most tools manage tasks, not systems. Merit gives you a platform to build structured, intelligent
        operations that unlock efficiency, performance and decision-making clarity
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
              title={func.title}
              description={func.description}
              image={func.image} />
          ))
        }
      </Box>
    </Box>
  );
};

const FunctionCard = ({ title, description, image }) => {
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
        <Typography fontWeight="bold" mb={1} sx={{ userSelect: "none" }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ userSelect: "none" }}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
};
