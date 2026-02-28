
// @ mui components
import { Box, Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';

const SectionContainer = ({ sections, hasGap, imageUnderclip=0, objectFit='cover' }) => {
  return(
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {
        sections.map((section, index) => (
          <Section
            key={section.id}
            id={section.id}
            index={index}
            title={section.title} content={section.content} image={section.image}
            hasGap={hasGap}
            imageUnderclip={imageUnderclip}
            objectFit={objectFit}/>
        ))
      }
    </Box>
  )
};

const Section = ({
  id,
  title,
  content,
  image,
  index,
  hasGap=false,
  imageUnderclip=0,
  objectFit='cover',
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isEven = index % 2 === 0;

  return (
    <Box
      component="section"
      id={id}
      className="tracked-section"
      sx={{
        display: 'flex',
        alignItems: 'center',
        ml: {
          xs: 2,
          md: isEven ? 6 : 12
        },
        mr: {
          xs: 2,
          md: isEven ? 12 : 6
        },
        p: { xs: 2, md: 4 },
        // backgroundColor: "rgba(230, 248, 230, 0.7)",
        backgroundColor: "rgba(100, 97, 141, 0.08)",
        borderRadius: 6
      }}>
      <Grid
        container
        direction={isMobile ? 'column' : isEven ? 'row' : 'row-reverse'}
        alignItems="center"
        justifyContent="center"
        spacing={{ xs: 0, md: hasGap ? 4 : 0 }}
        sx={{ flexGrow: 1 }}>
        <Grid
          size={{ xs: 12, md: 7 }}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: { xs: 'center', md: 'left' }
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
          size={{ xs: 12, md: 5 }}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Box
            component="img"
            src={image}
            alt={title}
            loading="lazy"
            sx={{
              width: '100%',
              aspectRatio: '5 / 3',
              objectFit: objectFit,
              my: { xs: 0, md: imageUnderclip },
              borderRadius: 4
            }}/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SectionContainer;
