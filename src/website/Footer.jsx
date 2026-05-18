// @mui components
import { Box } from '@mui/system';
import { Typography, Button, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

// Images
import logo from "./logos/logo.webp";
import M from "./logos/M.webp";

// Local context
import { useDispatch } from 'react-redux';
import { setPage, setSection } from '@/context/websiteStore.js';

const Footer = ({ }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { t } = useTranslation();

  const navItems = [
    { page: "Why Merit",    labelKey: "nav.whyMerit" },
    { page: "Platform",     labelKey: "nav.platform" },
    { page: "Use Cases",    labelKey: "nav.useCases" },
    { page: "Teams",        labelKey: "nav.teams" },
    { page: "Values",       labelKey: "nav.values" },
    { page: "Company",      labelKey: "nav.company" }
  ];

  const policies = [
    { labelKey: "footer.terms",         page: "Terms of Service", section: "introduction" },
    { labelKey: "footer.privacyPolicy", page: "Privacy Policy",   section: "introduction" },
    { labelKey: "footer.cookiePolicy",  page: "Cookie Policy",    section: "introduction" },
    { labelKey: "footer.contact",       page: "Company",          section: "contact" }
  ];

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        px: { xs: 1, md: 4, lg: 6 },
        height: { xs: '190px', sm: '197px' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        position: 'relative'
      }}>
      <Box
        sx={{
          mt: { xs: 0, md: 4 },
          display: "flex",
          flexDirection: "row",
          alignItems: "start",
          justifyContent: "space-between",
          width: "100%",
        }}>
        <Box>
          <Box
            onClick={() => {
              dispatch(setPage("home"));
              dispatch(setSection("Introduction"));
            }}
            sx={{
              width: { xs: 120, sm: 160, md: 192 },
              aspectRatio: '192 / 80',
              cursor: "pointer",
              backgroundColor: theme.palette.text.secondary,
              ...{
                maskImage: `url(${logo})`,
                maskRepeat: "no-repeat",
                maskPosition: "center",
                maskSize: "contain",
                WebkitMaskImage: `url(${logo})`,
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                WebkitMaskSize: "contain"
              }
            }}/>
          <Typography
            sx={{
              color: theme.palette.text.secondary,
              fontSize: "0.8rem",
              fontWeight: 600,
              mt: -0.8,
              textWrap: "balance"
            }}>
            {t('footer.copyright')}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            borderBottom: { xs: "none", md: `2px solid ${theme.palette.text.secondary}` },
            borderLeft: { xs: `2px solid ${theme.palette.text.secondary}`, md: "none" },
            pl: { xs: 1, md: 0 },
            zIndex: 10,
            minWidth: "98px",
            mt: { xs: 1, sm: 2, md: 2.5 },
            gap: { xs: 0, md: 3 },
            alignItems: { xs: "start", md: "center" }
          }}>
          {
            navItems.map((item) => (
              <Button
                key={item.page}
                disableRipple
                onClick={() => {
                  dispatch(setPage(item.page));
                  dispatch(setSection("introduction"));
                }}
                sx={{
                  p: 0,
                  color: theme.palette.text.secondary,
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: "1rem",
                  backgroundColor: "transparent",
                  justifyContent: { xs: "flex-start", md: "center" },
                  "&:hover": {
                    backgroundColor: "transparent"
                  }
                }}>
                {t(item.labelKey)}
              </Button>
            ))
          }
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 0, md: 2 },
          ml: { xs: 0, md: -1 },
          mt: { xs: -14, sm: -11, md: 0 },
          mb: { xs: 1, md: 2 },
          alignItems: { xs: "flex-start", md: "center" }
        }}>
        {
          policies.map((item) => (
            <Button
              key={item.labelKey}
              disableRipple
              onClick={() => {
                if (item.page && item.section) {
                  dispatch(setPage(item.page));
                  dispatch(setSection(item.section));
                }
              }}
              sx={{
                p: 0,
                color: theme.palette.text.secondary,
                fontWeight: 600,
                textTransform: "none",
                fontSize: "1rem",
                backgroundColor: "transparent",
                justifyContent: { xs: "flex-start", md: "center" },
                "&:hover": {
                  backgroundColor: "transparent"
                }
              }}>
              {t(item.labelKey)}
            </Button>
          ))
        }
      </Box>
      <Box
        component="img"
        src={M}
        sx={{
          height: '200%',
          top: '-32%',
          aspectRatio: '192 / 209',
          position: 'absolute',
          right: '20px',
          filter: 'grayscale(1) brightness(1.5) contrast(0.6)',
          opacity: 0.07,
          pointerEvents: "none"
        }}/>
    </Box>
  );
}

export default Footer;
