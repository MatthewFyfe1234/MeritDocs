import React, { useState } from 'react';

// @mui components
import { Box } from '@mui/system';
import { Tab, Tabs} from '@mui/material';
import { TabPanel, TabContext } from '@mui/lab';
import { useTheme } from '@mui/material';

// Components
import Intro from './components/Intro';
import ContentFooter from './components/ContentFooter';

// Images
import ResourcesHeader from '/images/resources/ResourcesHeader.webp';

const Resources = ({ section, setRequestADemoOpen }) => {
  const theme = useTheme();
  const [tabIndex, setTabIndex] = useState(section !== "introduction" ? section : 'all');

  const handleTabChange = (event, newValue) => setTabIndex(newValue);

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default }}>
      <Intro
        title="Merit Insights & News"
        content={[`Explore how organizations are building smarter systems of work with Merit.`,
                  `From customer success stories to strategic insights and product updates, this is where we share what’s working, 
                   what’s evolving, and what’s next in operational intelligence.`]}
        backgroundImage={ResourcesHeader}/>
      <Box sx={{ width: '100%', height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
        <TabContext value={tabIndex} sx={{ width: '100%', height: 'calc(100vh - 80px)' }}>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            variant="fullWidth">
            <Tab id="all"  label="All Content" value="all" sx={{ color: 'text.primary' }}/>
            <Tab id="Merit Blog" label="Merit Blog" value="Merit Blog" sx={{ color: 'text.primary' }}/>
            <Tab id="Case Studies" label="Case Studies" value="Case Studies" sx={{ color: 'text.primary' }}/>
            <Tab id="Press Releases" label="Press Releases" value="Press Releases" sx={{ color: 'text.primary' }}/>
            <Tab id="Product Updates" label="Product Updates" value="Product Updates" sx={{ color: 'text.primary' }}/>
          </Tabs>
          <TabPanel value="all" sx={{ px: 2 }}>All Content goes here</TabPanel>
          <TabPanel value="Merit Blog" sx={{ px: 2 }}>Blog content goes here</TabPanel>
          <TabPanel value="Case Studies" sx={{ px: 2 }}>Case Studies content goes here</TabPanel>
          <TabPanel value="Press Releases" sx={{ px: 2 }}>Press Releases content goes here</TabPanel>
          <TabPanel value="Product Updates" sx={{ px: 2 }}>Product Updates content goes here</TabPanel>
        </TabContext>
      </Box>
      <ContentFooter setRequestADemoOpen={setRequestADemoOpen}/>
    </Box>
  );
}

export default Resources;