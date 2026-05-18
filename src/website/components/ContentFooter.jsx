import { Box, Typography, useTheme } from "@mui/material";
import DemoRequestButton from "./DemoRequestButton";
import { useTranslation } from 'react-i18next';

const ContentFooter = ({ setRequestADemoOpen }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
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
        {t('common.contentFooter.title')}
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
        {t('common.contentFooter.subtitle')}
      </Typography>
    </Box>
  );
};

export default ContentFooter;
