import { useState, useEffect } from "react";

import { useTranslation } from 'react-i18next';

// @mui components
import { AppBar, Toolbar, Box, Button, Menu, MenuItem, IconButton } from "@mui/material";
import { useTheme } from '@mui/material/styles';

// @mui icons
import { ExpandMore, Login, Menu as MenuIcon, Translate } from '@mui/icons-material';

// i18n
import { languages } from '@/i18n/languages';

// Images
import logo from "./logos/logo.webp";

// Section configs
import { capabilitiesSections } from './config/capabilities-sections';
import { teamsSections } from './config/teams-sections';
import { useCasesSections } from './config/use-cases-sections';

// Local context
import { useSelector, useDispatch } from 'react-redux';
import { setPage, setSection } from '@/context/websiteStore.js';

const navItems = [
  {
    page: "Why Merit",
    titleKey: "nav.whyMerit",
    subMenuKey: "nav.subMenus.whyMerit.title",
    subItems: [
      { section: "product-implies-process", labelKey: "nav.subMenus.whyMerit.theProblem" },
      { section: "the-model",               labelKey: "nav.subMenus.whyMerit.theSolution" },
      { section: "everything-follows",      labelKey: "nav.subMenus.whyMerit.theAdvantage" }
    ]
  },
  {
    page: "Platform",
    titleKey: "nav.platform",
    subMenuKey: "nav.subMenus.platform.title",
    subItems: capabilitiesSections.map(s => ({
      section: s.id,
      labelKey: `nav.subMenus.platform.${s.sectionKey}`
    }))
  },
  {
    page: "Use Cases",
    titleKey: "nav.useCases",
    subMenuKey: "nav.subMenus.useCases.title",
    subItems: useCasesSections.map(s => ({
      section: s.id,
      labelKey: `nav.subMenus.useCases.${s.sectionKey}`
    }))
  },
  {
    page: "Teams",
    titleKey: "nav.teams",
    subMenuKey: "nav.subMenus.teams.title",
    subItems: teamsSections.map(s => ({
      section: s.id,
      labelKey: `nav.subMenus.teams.${s.sectionKey}`
    }))
  },
  {
    page: "Values",
    titleKey: "nav.values",
    subMenuKey: "nav.subMenus.values.title",
    subItems: [
      { section: "Operational Ethics", labelKey: "nav.subMenus.values.operationalEthics" },
      { section: "ESG",                labelKey: "nav.subMenus.values.esg" },
      { section: "Cultural Integrity", labelKey: "nav.subMenus.values.culturalIntegrity" }
    ]
  },
  {
    page: "Company",
    titleKey: "nav.company",
    subMenuKey: "nav.subMenus.company.title",
    subItems: [
      { section: "Our Mission",        labelKey: "nav.subMenus.company.ourMission" },
      { section: "Who We Are",         labelKey: "nav.subMenus.company.whoWeAre" },
      { section: "What We're Building", labelKey: "nav.subMenus.company.whatWereBuilding" },
      { section: "Contact Us",         labelKey: "nav.subMenus.company.contactUs" }
    ]
  }
];

const Navigation = ({ }) => {
  const { page, section } = useSelector((state) => state.website);
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const [currentMenu, setCurrentMenu] = useState(null);

  const handleMenuOpen = (event, menu) => {
    setAnchorEl(event.currentTarget);
    setCurrentMenu(menu);
  };

  useEffect(() => {
    const handleResize = () => {
      setCurrentMenu(null);
      setAnchorEl(null);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <AppBar
      position="sticky"
      elevation={
        (page === "home" && section === 'introduction') || page === "Company" ? 
        0 : 3
      }
      sx={{
        bgcolor: // page === "home" || page === "Company"
          // ? "#64618D"
          theme.palette.primary.main,
        px: { xs: 2, sm: 4, md: 8, lg: 5 },
        py: 0.6
      }}>
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          gap: 2
        }}>
        {/* <ThemePicker
          themes={themes}
          setActiveTheme={setActiveTheme}/> */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "space-between", width: "100%" }}>
          <Box sx={{ display: 'flex', alignItems: "center", gap: 2 }}>
            <LogoButton/>
            <FullSizeMenu
              setMenuOpen={handleMenuOpen}
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              currentMenu={currentMenu}
              setCurrentMenu={setCurrentMenu}/>
          </Box>
          <HamburgerMenu
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            currentMenu={currentMenu}
            setCurrentMenu={setCurrentMenu}
            theme={theme}/>
        </Box>
        <Box sx={{ display: { xs: "none", md: "none", lg: 'flex' }, gap: 1 }}>
          <ActionButtons theme={theme}/>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;

const LogoButton = ({ }) => {
  const { page, section } = useSelector((state) => state.website);
  const dispatch = useDispatch();

  const theme = useTheme();
  return (
    <Box
      component="div"
      onClick={() => {
        dispatch(setPage("home"));
        dispatch(setSection("Hero"));
      }}
      sx={{
        height: 48,
        width: 192,
        cursor: "pointer",
        backgroundColor: //page === "home" || page === "Company"
          // ? "#fff" :
           "#64618D",
        WebkitMaskImage: `url(${logo})`,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        WebkitMaskSize: "contain",
        maskImage: `url(${logo})`,
        maskRepeat: "no-repeat",
        maskPosition: "center",
        maskSize: "contain"
      }}/>
  );
};

const HamburgerMenu = ({ anchorEl, setAnchorEl, currentMenu, setCurrentMenu, theme }) => {
  const { page, section } = useSelector((state) => state.website);
  return(
    <Box sx={{ display: { xs: "flex", md: "flex", lg: "none" } }}>
      <Button
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
          setCurrentMenu({ title: "menu" });
        }}
        sx={{
          color: theme.palette.action.secondary,
          p: 0,
          minWidth: "40px"
        }}
        endIcon={
          <MenuIcon sx={{
            fontSize: "32px",
            width: "28px",
            height: "32px",
            color: //page === "home" || page === "Company"
              //</Box>? '#fff'
              theme.palette.action.secondary,
            p: 0
          }}/>
        }>
      </Button>
      <ItemMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        currentMenu={currentMenu}
        setCurrentMenu={setCurrentMenu}/>
      <LanguagePicker theme={theme}/>
      <IconButton
        href="/bff/login"
        sx={{
          ...navBarButtonStyle(theme, page),
          width: "40px",
          height: "40px",
          minWidth: 0,
          p: 0
        }}>
        <Login sx={{
          fontSize: "24px",
          color: //page === "home" || page === "Company"
            // '#fff'
            theme.palette.text.secondary
        }}/>
      </IconButton>
    </Box>
  )
};

const ItemMenu = ({ anchorEl, setAnchorEl, currentMenu, setCurrentMenu }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const theme = useTheme();
  const [expandedItem, setExpandedItem] = useState(null);

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentMenu(null);
    setExpandedItem(null);
  };

  const handleItemClick = (item) => {
    setExpandedItem((prev) => (prev === item.page ? null : item.page));
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl) && currentMenu?.title === "menu"}
      onClose={handleMenuClose}
      sx={{
        mt: 1,
        "& .MuiPaper-root": {
          "& .MuiList-root": {
            p: 1
          }
        }
      }}
      slotProps={{
        list: {
          sx: {
            bgcolor: theme.palette.background.menu,
            color: "#fff"
          }
        }
      }}>
      {
        navItems.flatMap((item) => [
          <MenuItem
            key={item.page}
            onClick={() => {
              handleItemClick(item);
            }}
            sx={{
              color: "#fff",
              fontSize: "16px",
              fontWeight: 300,
              borderRadius: "0px",
              '&:hover': {
                textDecoration: "underline"
              }
            }}>
            {t(item.titleKey)}
          </MenuItem>
          ,
          ...(expandedItem === item.page
            ? item.subItems.map((subItem) => (
                <MenuItem
                  key={subItem.section}
                  onClick={() => {
                    dispatch(setPage(item.page));
                    dispatch(setSection(subItem.section));
                    handleMenuClose();
                  }}
                  sx={{
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: 300,
                    pl: 4,
                    "&:hover": {
                      textDecoration: "underline"
                    }
                  }}>
                  {t(subItem.labelKey)}
                </MenuItem>
              ))
            : [])
        ])
      }
      {/* <ActionButtons/> */}
    </Menu>
  );
};

const navBarButtonStyle = (theme, page) => ({
  
  color: theme.palette.text.secondary,
  textTransform: "none",
  fontFamily: theme.typography.fontFamily,
  fontSize: "16px",
  fontWeight: 400,
  whiteSpace: "nowrap",
  
  "&.MuiButton-outlined": {
    border: `1px solid currentColor`
  },

  "&:hover": {
    backgroundColor: "transparent",
    color: //page === "home" || page === "Company"
      //? '#fff !important' :
      `${theme.palette.text.secondary} !important`
  },
  "&:focus": {
    backgroundColor: "transparent",
    color: //page === "home" || page === "Company"
      //? '#fff !important' :
       `${theme.palette.text.secondary} !important`
  },
  "&:active": {
    backgroundColor: "transparent",
    color: //page === "home" || page === "Company"
      //? '#fff !important' :
      `${theme.palette.text.secondary} !important`
  }
});

const FullSizeMenu = ({ setMenuOpen, anchorEl, setAnchorEl, currentMenu, setCurrentMenu }) => {
  const { page, section } = useSelector((state) => state.website);
  const { t } = useTranslation();

  const theme = useTheme();
  return(
    <Box sx={{ display: { xs: "none", md: "none", lg: 'flex' }, gap: 1 }}>
      {
        navItems.map((item) => (
          <Box key={item.page}>
            <Button
              sx={{
                ...navBarButtonStyle(theme, page),
                color: //page === "home" || page === "Company"
                  //</Box>? '#fff'
                  theme.palette.text.secondary
              }}
              onClick={(e) => setMenuOpen(e, item)}
              endIcon={
                <ExpandMore
                  sx={{
                    fontSize: "24px",
                    width: "24px",
                    height: "24px",
                    color: //page === "home" || page === "Company"
                      //</Box>? '#fff'
                      theme.palette.text.secondary,
                    ml: -1
                  }}/>
              }>
              {t(item.titleKey)}
            </Button>
            <SubItemMenu
              item={item}
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              currentMenu={currentMenu}
              setCurrentMenu={setCurrentMenu}
              theme={theme}/>
          </Box>
        ))
      }
    </Box>
  )
};

const SubItemMenu = ({ item, anchorEl, setAnchorEl, currentMenu, setCurrentMenu, theme }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentMenu(null);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl) && currentMenu?.page === item.page}
      onClose={handleMenuClose}
      sx={{ mt: 1, "& .MuiPaper-root": { p: 0 } }}
      slotProps={{
        list: {
          sx: {
            bgcolor: theme.palette.background.menu,
            color: theme.palette.background.menu
          }
        }
      }}>
      <MenuItem
        onClick={() => {
          dispatch(setPage(item.page));
          dispatch(setSection("introduction"));
          handleMenuClose();
        }}
        sx={{
          color: "#fff",
          fontSize: "16px",
          fontWeight: 600,
          borderBottom: "2px solid #fff",
          borderRadius: "0px",
          py: 1,
          mb: 1,
          '&:hover': {
            bgcolor: "transparent"
          }
        }}>
        {t(item.subMenuKey)}
      </MenuItem>
      {
        item.subItems.map((subItem) => (
          <MenuItem
            key={subItem.section}
            onClick={() => {
              dispatch(setPage(item.page));
              dispatch(setSection(subItem.section));
              handleMenuClose();
            }}
            sx={{
              color: "#fff",
              fontSize: "16px",
              fontWeight: 300,
              borderRadius: "0px",
              '&:hover': {
                textDecoration: "underline"
              }
            }}>
            {t(subItem.labelKey)}
          </MenuItem>
        ))
      }
    </Menu>
  );
};

const buttonStyles = (theme) => ({
  background: theme.palette.action.primary,
  color: theme.palette.primary.contrastText,
  textAlign: "center",
  height: "40px",
  borderRadius: "5px",
  textTransform: "none",
  fontFamily: theme.typography.fontFamily,
  fontSize: "14px",
  fontWeight: 700,
  lineHeight: 1.1
});

const LanguagePicker = ({ theme }) => {
  const { i18n } = useTranslation();
  const [langAnchor, setLangAnchor] = useState(null);
  return (
    <>
      <IconButton
        onClick={(e) => setLangAnchor(e.currentTarget)}
        sx={{
          width: "40px",
          height: "40px",
          minWidth: 0,
          p: 0
        }}>
        <Translate sx={{ fontSize: "22px", color: theme.palette.text.secondary }}/>
      </IconButton>
      <Menu
        anchorEl={langAnchor}
        open={Boolean(langAnchor)}
        onClose={() => setLangAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { sx: { maxHeight: 360 } } }}>
        {Object.entries(languages).map(([code, { label }]) => (
          <MenuItem
            key={code}
            selected={i18n.language === code}
            onClick={() => {
              i18n.changeLanguage(code);
              setLangAnchor(null);
            }}>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const ActionButtons = ({ }) => {
  const { page, section } = useSelector((state) => state.website);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const theme = useTheme();
  return(
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: { xs: "center", sm: "flex-end" }
      }}>
      <LanguagePicker theme={theme}/>
      <Button
        variant="outlined"
        onClick={() => {
          dispatch(setPage("DemoRequest"));
          dispatch(setSection("introduction"));
        }}
        sx={{
          ...navBarButtonStyle(theme, page),
          color: //page === "home" || page === "Company"
            //</Box>? '#fff'
            theme.palette.text.secondary,
          borderColor: //page === "home" || page === "Company"
            //</Box>? '#fff'
            theme.palette.text.secondary
        }}>
        {t('common.bookDemo')}
      </Button>
      <IconButton
        href="/bff/login"
        sx={{
          ...navBarButtonStyle(theme, page),
          width: "40px",
          height: "40px",
          minWidth: 0,
          p: 0
        }}>
        <Login sx={{
          fontSize: "24px",
          color: //page === "home" || page === "Company"
            // '#fff'
            theme.palette.text.secondary
        }}/>
      </IconButton>
    </Box>
  )
};

const ThemePicker = ({ themes, setActiveTheme }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        maxHeight: 58,
        ml: -1.5,
        mr: 1,
        gap: 1
      }}>
      {
        Object.entries(themes).map(([key, theme]) => (
          <Button
            key={key}
            onClick={() => setActiveTheme(theme)}
            sx={{
              bgcolor: theme.palette.primary.main,
              width: 8,
              height: 8,
              minWidth: 0,
              borderRadius: "50%",
              "&:hover": {
                bgcolor: theme.palette.primary.dark
              }
            }}>
          </Button>
        ))
      }
    </Box>
  );
};