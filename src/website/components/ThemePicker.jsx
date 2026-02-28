import React, { useEffect } from 'react';

import { createTheme } from '@mui/material/styles';

import { TextField, Box } from '@mui/material';
import { WrapperModal } from "@/components/Modals/ModalWindows.jsx";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#888',
      contrastText: '#fff'
    },
    secondary: {
      main: '#aaa'
    },
    background: {
      default: '#f0f0f0',
      menu: '#333',
      paper: '#fff'
    },
    text: {
      primary: '#333',
      secondary: '#666'
    },
    action: {
      primary: '#555',
      secondary: '#777'
    }
  }
});

const ThemePicker = ({ setThemePickerOpen, customTheme, setCustomTheme }) => {
  useEffect(() => {
    if (!customTheme) setCustomTheme(defaultTheme);
  }, []);

  const handleChange = (section, key) => (e) => {
    const value = e.target.value;
    setCustomTheme(prev => ({
      ...prev,
      palette: {
        ...prev.palette,
        [section]: {
          ...prev.palette[section],
          [key]: value
        }
      }
    }));
  };

  if (!customTheme) return null;

  return (
    <WrapperModal
      open={true}
      handleClose={() => setThemePickerOpen()}
      title="Create Custom Theme"
      minHeight="400px"
      height="auto">
      <Box display="flex" flexDirection="column" gap={2}>

        {/* Primary */}
        <TextField
          label="Primary Main"
          value={customTheme.palette.primary.main}
          onChange={handleChange('primary', 'main')}/>
        <TextField
          label="Primary Contrast Text"
          value={customTheme.palette.primary.contrastText}
          onChange={handleChange('primary', 'contrastText')}/>

        {/* Secondary */}
        <TextField
          label="Secondary Main"
          value={customTheme.palette.secondary.main}
          onChange={handleChange('secondary', 'main')}/>

        {/* Background (excluding paper) */}
        <TextField
          label="Background Default"
          value={customTheme.palette.background.default}
          onChange={handleChange('background', 'default')}/>
        <TextField
          label="Background Default"
          value={customTheme.palette.background.menu}
          onChange={handleChange('background', 'menu')}/>

        {/* Text */}
        <TextField
          label="Text Primary"
          value={customTheme.palette.text.primary}
          onChange={handleChange('text', 'primary')}/>
        <TextField
          label="Text Secondary"
          value={customTheme.palette.text.secondary}
          onChange={handleChange('text', 'secondary')}/>

        {/* Action */}
        <TextField
          label="Action Primary"
          value={customTheme.palette.action.primary}
          onChange={handleChange('action', 'primary')}/>
        <TextField
          label="Action Secondary"
          value={customTheme.palette.action.secondary}
          onChange={handleChange('action', 'secondary')}/>
      </Box>
    </WrapperModal>
  );
};

export default ThemePicker;
