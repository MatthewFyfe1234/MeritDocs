import React, { useState } from 'react';

// @mui components
import { Box } from '@mui/material';
import { Typography, useTheme } from '@mui/material';

// Components
import SiteText from './components/SiteText';

// @mui icons
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import process from '/images/home/process.webp';

const functions = [
  {
    title: 'Process Mapping',
    content: <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
               <Box
                 sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignContent: 'space-between',
                  height: '90%'
                 }}>
                 <Typography variant="h6" sx={{ fontSize: 24, fontWeight: 'bold', color: '#485D8C' }}>
                   Smarter operations start with better visibility.
                 </Typography>
                 <Typography>
                   Most BI tools look backward. Merit delivers intelligence that’s embedded in the flow of
                   work, connecting performance data to the processes and people that drive it.
                 </Typography>
                 <Typography>
                   Track outcomes as they happen, uncover root causes, and make smarter decisions without
                   waiting on reports.
                 </Typography>
               </Box>
               <Box
                 component="img"
                 src={process}
                 alt="Process"
                 sx={{ width: 0.6, objectFit: 'contain' }}/>
             </Box>
  },
  {
    title: 'Project Management',
    content:
      <Typography>
        Understand progress, performance, cost, and contribution at every level.
      </Typography>
  },
  {
    title: 'CPQ',
    content:
      <Typography>
        Configure, price, quote. Automate the process of creating quotes and proposals.
      </Typography>
  },
  {
    title: 'Business Intelligence',
    content:
      <Typography>
        Spot inefficiencies, identify impact, and act with clarity.
      </Typography>
  },
  {
    title: 'HR Management',
    content:
      <Typography>
        Manage employee data, payroll, and benefits in one place.
      </Typography>
  }
];

const ACompleteSolution = ({ style }) => {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Box
      sx={{
        ...style,
        flexDirection: 'column',
        backgroundColor: theme.palette.background.default,
        gap: 2
      }}>
      <SiteText
        type='title'
        colour={theme.palette.text.primary}
        content="A Complete Solution for Operational Excellence"
        align="center"/>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: '70vh',
          width: '80%',
          padding: 5,
          borderRadius: 8,
          background: theme.palette.primary.main,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Box
          sx={{
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 0.3,
            color: '#fff'
          }}>
          {
            functions.map((func, index) => (
              <Box
                key={index}
                onClick={() => setSelectedIndex(index)}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  // background: selectedIndex === index ? '#3A5A58' : theme.palette.primary.main,
                  px: 2,
                  flex: 1,
                  borderRadius: 6,
                  width: '100%',
                  textAlign: 'center',
                  transition: 'background-color 0.3s'
                }}>
                <Typography
                  sx={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: selectedIndex === index
                      ? theme.palette.text.secondary
                      : theme.palette.text.primary,
                    textAlign: 'left'
                  }}
                  variant="h6">
                  {func.title}
                </Typography>
                <ArrowForwardIosIcon
                  sx={{
                    color: selectedIndex === index
                      ? theme.palette.text.secondary
                      : theme.palette.text.primary,
                    fontSize: selectedIndex === index ? 26 : 16,
                    marginLeft: 'auto'
                  }} />
              </Box>
            ))
          }
        </Box>
        <Box
          sx={{
            display: 'flex',
            height: '100%',
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 0.7,
            padding: 4,
            background: theme.palette.background.default,
          }}>
          {
            selectedIndex !== null ? (
              functions[selectedIndex].content
            ) : (
              <Typography variant="body1" sx={{ fontSize: 18 }}>
                Select a function to view its content.
              </Typography>
            )
          }
        </Box>
      </Box>
    </Box>
  );
}

export default ACompleteSolution;