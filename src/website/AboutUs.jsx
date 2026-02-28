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

const sections = [
  {
    id: 'Who We Are',
    title: 'Who We Are',
    content: [`We’re a growing team of product thinkers, technologists, and operational minds with a shared goal: to make better 
               work inevitable.`,
              `Our work is grounded, structured, and shaped by the real needs of teams and organisations, across industries and 
               across the world, who believe that clarity, fairness, and excellence should be built into the system, not left to 
               chance.`],
    image: who
  },
  {
    id: 'What We’re Building',
    title: 'What We’re Building',
    content: [`We’re building the operating engine behind a new way of working, where execution is measurable, systems are connected, and
               merit is visible and actionable by design.`,
              `When work is seen clearly, it can be improved. When outcomes are trusted, teams can focus on delivering them.`],
    image: what
  }
];

const AboutUs = () => {
  const theme = useTheme();
  return (
    <Box sx={{ background: theme.palette.background.default }}>
      <Box
        id="introduction"
        className="tracked-section"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          mb: { xs: 4, md: 6, lg: 8}
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
            sx={{
              color: '#fff'
            }}
            variant="h3" fontWeight={700} gutterBottom>
            About Merit
          </Typography>
          <Typography variant="h6" sx={{ color: '#fff', mb: 4 }}>
            How we’re building an engine to drive better work.
          </Typography>
        </Box>
        <Box
          sx={{
            textAlign: 'center',
            py: { xs: 2, md: 4, lg: 6 },
            px: { xs: 2, sm: 16, md: 24, lg: 24 },
          }}>
          <Typography variant="h6" sx={{ color: '#000', mb: { xs: 2, md: 4, lg: 6 } }}>
            Merit exists to help organisations operate with clarity, unity, and purpose. From product delivery to strategic 
            alignment, we believe every function performs better when execution is connected and contribution is visible.
          </Typography>
          <Box 
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 2, md: 4, lg: 6 },
            }}>
            <IntentCard
              title="Our Vision"
              content="To enable organizations to recognise, measure, and reward the true merit of every person, process, tool, and outcome, empowering them to build excellence into every product."
              image={Vision}
              theme={theme}/>
            <IntentCard
              colour="#f8e6e6"
              title="Our Mission"
              content="To deliver a connected framework that unites every business system, making execution visible, performance measurable, and continuous improvement the standard."
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
        fontWeight={600}
        color="blue"
        fontSize="1.1rem"
        sx={{ zIndex: 1 }}>
        {title}
      </Typography>

      {/* Content at the bottom */}
      <Typography
        variant="body1"
        maxWidth={400}
        sx={{ zIndex: 1 }}>
        {content}
      </Typography>
    </Box>
  );
};

const GeneralEnquiry = () => {
  return (
    <ContactPanel
      title="Contact Us"
      subtitle="Complete the form and one of our team will be in touch to discuss your enquiry."
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
          fontWeight={700}>
          Interested in learning more about Merit?
        </Typography>
        <Typography
          variant="h6"
          fontWeight={400}>
          Whether you have a question, want to explore partnership opportunities, or just want to say hello, we’re here to help.
        </Typography>
      </Box>
    </ContactPanel>
  );
}