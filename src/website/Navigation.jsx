import { useState, useEffect } from "react";

// @mui components
import { AppBar, Toolbar, Box, Button, Menu, MenuItem, IconButton } from "@mui/material";

import { useTheme } from '@mui/material/styles';

// @mui icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from '@mui/icons-material/Login';

// Images
import logo from "./logos/logo.webp";

// Local context
import { useSelector, useDispatch } from 'react-redux';
import { setPage, setSection } from '@/context/websiteStore.js';

const navItems = [
  {
    title: "Platform",
    subItemsTitle: "Capabilities",
    subItems: [
      "Business Intelligence",
      "Process Mapping",
      "Project Management",
      "Document Management",
      "CPQ",
      "HR/Recognition",
      "Resource Planning"
    ]
  },
  {
    title: "Use Cases",
    subItemsTitle: "Industries",
    subItems: [
      "Manufacturing",
      "Construction",
      "Healthcare",
      "Disaster Management",
      "Mining and Resources",
      "Agriculture",
      "Public Infrastructure",
      "Consulting/Professional Services"
    ]
  },
  {
    title: "Teams",
    subItemsTitle: "Roles",
    subItems: [
      "Leadership",
      "Operations",
      "Project Management",
      "Human Resources",
      "Sales",
      "Finance"
    ]
  },
  {
    title: "Values",
    subItemsTitle: "Ethics",
    subItems: [
      "Operational Ethics",
      "ESG",
      "Cultural Integrity"
    ]
  },
  {
    title: "Company",
    subItemsTitle: "About Us",
    subItems: [
      "Our Mission",
      "Who We Are",
      "What We’re Building",
      "Contact Us"]
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
      <IconButton
        href="/bff/login"
        sx={{
          ...navBarButtonStyle(theme, page),
          width: "40px",
          height: "40px",
          minWidth: 0,
          p: 0
        }}>
        <LoginIcon sx={{
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

  const theme = useTheme();
  const [expandedItem, setExpandedItem] = useState(null);

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentMenu(null);
    setExpandedItem(null);
  };

  const handleItemClick = (item) => {
    setExpandedItem((prev) => (prev === item.title ? null : item.title));
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
            key={item.title}
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
            {item.title}
          </MenuItem>
          ,
          ...(expandedItem === item.title
            ? item.subItems.map((subItem) => (
                <MenuItem
                  key={subItem}
                  onClick={() => {
                    dispatch(setPage(item.title));
                    dispatch(setSection(subItem));
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
                  {subItem}
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

  const theme = useTheme();
  return(
    <Box sx={{ display: { xs: "none", md: "none", lg: 'flex' }, gap: 1 }}>
      {
        navItems.map((item) => (
          <Box key={item.title}>
            <Button
              sx={{
                ...navBarButtonStyle(theme, page),
                color: //page === "home" || page === "Company"
                  //</Box>? '#fff'
                  theme.palette.text.secondary
              }}
              onClick={(e) => setMenuOpen(e, item)}
              endIcon={
                <ExpandMoreIcon
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
              {item.title}
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

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentMenu(null);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl) && currentMenu?.title === item.title}
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
          dispatch(setPage(item.title));
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
        {item.subItemsTitle}
      </MenuItem>
      {
        item.subItems.map((subItem) => (
          <MenuItem
            key={subItem}
            onClick={() => {
              dispatch(setPage(item.title));
              dispatch(setSection(subItem));
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
            {subItem}
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

const ActionButtons = ({ }) => {
  const { page, section } = useSelector((state) => state.website);
  const dispatch = useDispatch();
  const theme = useTheme();
  return(
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: { xs: "center", sm: "flex-end" }
      }}>
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
        Book a Demo
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
        <LoginIcon sx={{
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