
// @mui components
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

// Components
import ContactPanel from './components/ContactPanel';

// Images
import Tick from '/images/tick.svg';

const DemoRequestForm = () => {
  return (
    <ContactPanel
      title="Schedule a Demo"
      subtitle="Complete the form and one of our team will be in touch to arrange a platform demo at a time that suits you."
      enquiryTypeId={1}>
      <Box
        sx={{
          flex: { xs: '1 1 100%', sm: '1 1 50%' },
          display: 'flex',
          pt: { xs: 0, sm: 2 },
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 2,
          px: { xs: 0, sm: 4, md: 10 }
        }}>
        <Typography
          variant="h4"
          fontWeight={700}>
          See how Merit brings clarity to the way work really happens.
        </Typography>
        <Typography
          variant="h6"
          fontWeight={400}>
          Learn how we unify execution, insight, and improvement in one operational system.
        </Typography>
        <Typography
          variant="h6"
          fontWeight={400}>
          Whether you’re leading strategy or managing delivery, Merit gives you the visibility to act with confidence, and the structure to scale smarter.
        </Typography>
        <Box>
          {
            ["See Merit in action", "Get a personalized demo", "Experience the power of Merit"].map((text, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: '1.2rem',
                  fontWeight: 500,
                  color: 'text.primary'
                }}>
                <img src={Tick} alt="tick" style={{ width: '35px', height: '35px' }} />
                {text}
              </Box>
            ))
          }
        </Box>
      </Box>
    </ContactPanel>
  );
};

export default DemoRequestForm;