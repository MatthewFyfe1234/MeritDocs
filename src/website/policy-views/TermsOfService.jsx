import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

const TermsOfService = () => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    fetch('./termsofservice.html')
      .then((res) => res.text())
      .then((data) => setHtmlContent(data))
      .catch((err) => console.error('Failed to load terms of service:', err));
  }, []);

  return (
    <Box
      id="terms-of-service"
      className="tracked-section"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        px: { xs: 3, md: 8, lg: 12 },
        py: 4,
        '& ul': {
          listStyleType: 'disc',
          paddingLeft: '1.5rem',
          marginTop: 1,
          marginBottom: 1
        },
        '& li': {
          marginBottom: 0.5
        }
      }}
      dangerouslySetInnerHTML={{ __html: htmlContent }}/>
  );
};

export default TermsOfService;