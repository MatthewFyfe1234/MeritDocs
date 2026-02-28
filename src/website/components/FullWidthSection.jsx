
// @mui components
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material';


const FullWidthSection = ({ id, title, content, image, reverse = false, colour }) => {
  const theme = useTheme();
  return (
    <Box
      id={id}
      className="tracked-section"
      sx={{
        position: { xs: 'static', md: 'relative' },
        width: '100%',
        height: { xs: 'auto', md: 0 },
        paddingTop: { xs: 0, md: '50%' }
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: reverse ? 'row-reverse' : 'row' },
          position: { xs: 'static', md: 'absolute' },
          top: 0,
          left: 0,
          width: '100%',
          height: { xs: 'auto', md: '100%' }
        }}>
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            height: { xs: '50%', md: '100%' },
            backgroundColor: colour ?? "#335d57",
            position: "relative",
            overflow: "hidden",

            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            justifyContent: 'center',
            p: { xs: 2, md: 8 },
            gap: { xs: 0.5, md: 2 },
            boxSizing: 'border-box',

            // Texture layer
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              backgroundImage: 'url("/images/texture.webp")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.02,
              zIndex: 0,
              pointerEvents: "none"
            },

            // Ensure content stays above texture
            "& > *": {
              position: "relative",
              zIndex: 1
            }
          }}>
          <Typography
            variant="h3"
            fontWeight={700}
            gutterBottom
            sx={{ color: theme.palette.common.white }}>
            {title}
          </Typography>
          {
            content.map((paragraph, idx) => (
              <Typography
                key={`paragraph-${idx}`}
                variant="h6"
                fontWeight={300}
                sx={{ color: theme.palette.common.white, mb: 1 }}>
                {paragraph}
              </Typography>
            ))
          }
        </Box>
        <Box
          component="img"
          src={image}
          alt={title}
          sx={{
            width: { xs: '100%', md: '50%' },
            height: { xs: '50%', md: '100%' },
            objectFit: 'cover'
          }}/>
      </Box>
    </Box>
  );
};

export default FullWidthSection;