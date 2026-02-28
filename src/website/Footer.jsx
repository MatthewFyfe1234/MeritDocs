
// @mui components
import { Box } from '@mui/system';
import { Typography, Button, useTheme } from '@mui/material';

// Images
import logo from "./logos/logo.webp";
import M from "./logos/M.webp";

// Local context
import { useDispatch } from 'react-redux';
import { setPage, setSection } from '@/context/websiteStore.js';

const navItems = [
  "Platform",
  "Use Cases",
  // "Resources",
  "Teams",
  "Values",
  "Company"
];
const policies = [
  {
    "value": "Terms",
    "page": "Terms of Service",
    "section": "introduction"
  },
  {
    "value": "Privacy Policy",
    "page": "Privacy Policy",
    "section": "introduction"
  },
  {
    "value": "Cookie Policy",
    "page": "Cookie Policy",
    "section": "introduction"
  },
  {
    "value": "Contact",
    "page": "Company",
    "section": "contact"
  }
];

const Footer = ({ }) => {
  const dispatch = useDispatch();

  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        px: { xs: 1, md: 4, lg: 6 },
        height: { xs: '196px', sm: '197px' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        position: 'relative'
      }}>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="start"
        justifyContent="space-between"
        sx={{
          mt: { xs: 0, md: 4 },
        }}
        width="100%">
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
              mt: -1.3,
              textWrap: "balance"
            }}>
            @2026 Modify Visual Ltd. All rights reserved.
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
                key={item}
                disableRipple
                onClick={() => {
                  dispatch(setPage(item));
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
                {item}
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
          mt: { xs: -8, sm: -11, md: 0 },
          mb: { xs: 1, md: 2 },
        }}>
        {
          policies.map((item) => (
            <Button
              key={item.value}
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
              {item.value}
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