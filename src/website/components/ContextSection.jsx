
// @mui components
import { Box, Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';

const ContextSection = ({ id, title, content, image, hasGap=false, imageUnderclip=0 }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      component="section"
      id={id}
      className="tracked-section"
      sx={{
        display: 'flex',
        alignItems: 'center',
        mx: { xs: 2, md: 6 },
        mb: { xs: 4, md: 6 },
        p: { xs: 2, md: 6 },
        background: "rgba(136, 136, 136, 0.08)",
        borderRadius: 6
      }}>
      <Grid
        container
        direction={isMobile ? 'column' : 'row'}
        alignItems="center"
        justifyContent="center"
        spacing={hasGap ? isMobile ? 3 : 5 : 0}
        sx={{ flexGrow: 1 }}>
        <Grid
          size={{ xs: 12, md: 7 }}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            {title}
          </Typography>
          {
            content.map((paragraph, idx) => (
              <Typography
                key={`paragraph-${idx}`}
                variant="body1"
                fontWeight={300}
                sx={{ mb: 1 }}>
                {paragraph}
              </Typography>
            ))
          }
        </Grid>
        {/* Image */}
        <Grid
          size={{ xs: 8, md: 5 }}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          {typeof image === 'string' ? (
  <Box
    component="img"
    src={image}
    alt={title}
    sx={{
      width: '100%',
      objectFit: 'contain',
      my: imageUnderclip
    }}
  />
) : (
  image
)}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContextSection;