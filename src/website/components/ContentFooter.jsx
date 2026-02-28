
// @mui components
import { Box } from "@mui/material";
import { Typography, useTheme } from "@mui/material";

// Components
import DemoRequestButton from "./DemoRequestButton";

const ContentFooter = ({ setRequestADemoOpen }) => {
  const theme = useTheme();
  return(
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.default',
        alignItems: 'center',
        py: 4,
        px: 2,
        gap: 2
      }}>
      <Typography
        sx={{
          fontSize: { xs: '36px', sm: '3vw' },
          fontFamily: theme.typography.fontFamily,
          color: theme.palette.text.primary,
          lineHeight: 1.2,
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
        Operational clarity. Ethical integrity.<br /> Improved Outcomes.
      </Typography>
      <DemoRequestButton
        setRequestADemoOpen={setRequestADemoOpen}
        backed={true}/>
      <Typography
        sx={{
          fontSize: { xs: '18px', sm: '1.6vw' },
          fontFamily: theme.typography.fontFamily,
          color: theme.palette.text.primary,
          lineHeight: 1.5,
          textAlign: 'center'
        }}>
        Request a walkthrough and see how Merit can<br /> help you turn complexity into clarity.
      </Typography>
    </Box>
  )
};

export default ContentFooter;