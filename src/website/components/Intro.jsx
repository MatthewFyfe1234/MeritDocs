import { Box, Typography, useTheme } from '@mui/material';

const Intro = ({ title, content, backgroundImage }) => {
  const theme = useTheme();
  return (
    <Box
      id="introduction"
      className="tracked-section"
      sx={{
        position: 'relative',
        textAlign: 'center',
        py: { xs: 4, sm: 12 },
        px: 2,
        background: `url(${backgroundImage}) center/cover no-repeat ${theme.palette.background.default}`,
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: '-1px',
          background: `linear-gradient(to bottom, rgba(0,0,0,0) 50%, ${theme.palette.background.default} 100%)`,
          pointerEvents: 'none',
          zIndex: 1
        },
        '& > *': {
          position: 'relative',
          zIndex: 2
        }
      }}>
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 800,
          mx: 'auto',
          textAlign: 'center'
        }}>
        <Typography
          sx={{
            fontSize: { xs: '36px', sm: '4.4vw' },
            fontFamily: theme.typography.fontFamily,
            color: theme.palette.text.primary,
            lineHeight: 1.2,
            fontWeight: 'bold'
          }}>
          {title}
        </Typography>
        {
          content?.map((paragraph, index) =>
            paragraph.trim() === ''
              ? <Box key={index} sx={{ height: 24 }} />
              : <Typography
                  key={index}
                  sx={{
                    fontSize: { xs: '18px', sm: '1.7vw' },
                    fontFamily: theme.typography.fontFamily,
                    color: theme.palette.text.primary,
                    lineHeight: 1.5,
                    mt: index === 0 ? 2 : 1.5
                  }}>
                  {paragraph}
                </Typography>
          )
        }
      </Box>
    </Box>
  );
};

export default Intro;
