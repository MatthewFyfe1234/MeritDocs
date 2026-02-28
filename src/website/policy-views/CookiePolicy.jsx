import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

const CookiePolicy = () => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    fetch('./cookiepolicy.html')
      .then((res) => res.text())
      .then((data) => setHtmlContent(data))
      .catch((err) => console.error('Failed to load cookie policy:', err));
  }, []);

  return (
    <Box
      id="cookie-policy"
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

export default CookiePolicy;