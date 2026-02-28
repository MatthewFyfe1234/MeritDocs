import React, { useState, useEffect, lazy } from "react";

import VisitLogger from "./components/VisitLogger.js";

import ThemePicker from "./components/ThemePicker.jsx";
import Navigation from "./Navigation.jsx";

const Home = lazy(() => import("./Home.jsx"));
const Capabilities = lazy(() => import("./Capabilities.jsx"));
const UseCases = lazy(() => import("./UseCases.jsx"));
const Resources = lazy(() => import("./Resources.jsx"));
const Teams = lazy(() => import("./Teams.jsx"));
const Ethics = lazy(() => import("./Ethics.jsx"));
const AboutUs = lazy(() => import("./AboutUs.jsx"));
const DemoRequestForm = lazy(() => import("./DemoRequestForm.jsx"));
const CookiePolicy = lazy(() => import("./policy-views/CookiePolicy.jsx"));
const PrivacyPolicy = lazy(() => import("./policy-views/PrivacyPolicy.jsx"));
const TermsOfService = lazy(() => import("./policy-views/TermsOfService.jsx"));

import Footer from "./Footer.jsx";

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { themeA } from "./theme";

import SmoothScroll from "smooth-scroll";

// Local context
import { useSelector, useDispatch } from 'react-redux';
import { setUserIp } from '@/context/adminStore.js';
import { setPage } from '@/context/websiteStore.js';

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

export default function Website () {
  const { page, section } = useSelector((state) => state.website);
  const dispatch = useDispatch();
  
  // Fetch IP Address
  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await fetch("https://api64.ipify.org?format=json");
        const data = await response.json();
        dispatch(setUserIp(data.ip));
      } catch (error) {
        console.error("Failed to fetch IP address", error);
      }
    };
    
    // Defer IP fetch until after initial paint to prioritize page render
    const timeoutId = setTimeout(() => {
      fetchIp();
    }, 1500);
    
    return () => clearTimeout(timeoutId);
  }, [dispatch]);

  const [customTheme, setCustomTheme] = useState(null);
  const [customThemePickerOpen, setCustomThemePickerOpen] = useState(false);
  const handleSetCustomThemePickerOpen = () => {
    setCustomThemePickerOpen(!customThemePickerOpen);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);

    return () => clearTimeout(timeout);
  }, [section, page]);

  useEffect(() => {
    const handleResize = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    window.location.hash = encodeURIComponent(page);
  }, [page]);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      #scrollportion::-webkit-scrollbar-thumb {
        background: #64618D;
        border-radius: 0px;
       }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <React.StrictMode>
      <ThemeProvider theme={themeA}>
        <CssBaseline />
        <div
          style={{
            height: '100dvh',
            display: 'flex',
            flexDirection: 'column'
          }}>
          <Navigation/>
          <div
            id="scrollportion"
            style={{
              flexGrow: 1,
              overflowX: 'hidden',
              overflowY: 'scroll'
            }}>
            <VisitLogger page={page}/>
            {
              page === "home" &&
                <Home setCustomThemePickerOpen={handleSetCustomThemePickerOpen}/>
            }
            {
              page === "Platform" &&
                <Capabilities/>
            }
            {
              page === "Use Cases" &&
                <UseCases/>
            }
            {
              page === "Learning" &&
                <Resources section={section}/>
            }
            {
              page === "Teams" &&
                <Teams/>
            }
            {
              page === "Values" &&
                <Ethics/>
            }
            {
              page === "Company" &&
                <AboutUs/>
            }
            {
              page === "DemoRequest" &&
                <DemoRequestForm/>
            }
            {
              page === "Cookie Policy" &&
                <CookiePolicy/>
            }
            {
              page === "Privacy Policy" &&
                <PrivacyPolicy/>
            }
            {
              page === "Terms of Service" &&
                <TermsOfService/>
            }
            <Footer/>
          </div>
          {
            customThemePickerOpen &&
              <ThemePicker
                setThemePickerOpen={handleSetCustomThemePickerOpen}
                customTheme={customTheme}
                setCustomTheme={setCustomTheme}/>
          }
        </div>
      </ThemeProvider>
    </React.StrictMode>
  );
};
