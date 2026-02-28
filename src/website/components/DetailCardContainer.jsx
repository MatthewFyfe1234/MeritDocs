
// @mui components
import { Box } from "@mui/material";
import { Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/material";

const DetailCardContainer = ({ cards, shadow = true, colour, textColour, size = 'small' }) => {
  return(
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'center',
        marginTop: 4,
        maxWidth: '100%',
        gap: { xs: 2, sm: 2, md: 4, lg: 5, xl: 6 },
        }}>
      {
        cards.map((card, index) => (
          <DetailCard
            key={index}
            card={card}
            shadow={shadow}
            colour={colour}
            textColour={textColour}
            size={size}/>
        ))
      }
    </Box>
  )
}

const DetailCard = ({ card, shadow = true, colour, textColour, size = 'small' }) => {
  const theme = useTheme();

  const sizes = {
    small: {
      width: '240px',
      imageSize: 100,
      titleVariant: 'h6',
      descriptionVariant: 'body2',
      padding: 2
    },
    large: {
      width: '300px',
      minWidth: '120px',
      imageSize: 140,
      titleVariant: 'h5',
      descriptionVariant: 'body1',
      padding: 3
    }
  };

  const currentSize = sizes[size] || sizes.small;

  return (
    <Box
      sx={{
        display: 'flex',
        position: 'relative',
        width: 'fit-content',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        p: { xs: 1.5, md: currentSize.padding },
        pt: { md: 12 },
        background: colour ?? theme.palette.background.default,
        borderRadius: 2,
        boxShadow: shadow ? 1 : 'none',
        border: shadow ? 'none' : `3px solid #273C5A`,
        
      }}>
        <Box
          component="img"
          sx={{
            position: 'absolute',
            width: {
              xs: '95%',
              md: currentSize.imageSize
            },
            height: {
              xs: "95%",
              md: currentSize.imageSize
            },
            top: 8,
            backgroundColor: alpha(textColour ?? theme.palette.text.primary, 0.1),
            WebkitMaskImage: `url(${card.image})`,
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "top",
            WebkitMaskSize: "contain",
            maskImage: `url(${card.image})`,
            maskRepeat: "no-repeat",
            maskPosition: "top",
            maskSize: "contain"
          }}/>
        <Typography
          variant={currentSize.titleVariant}
          sx={{
            bottom: -12,
            paddingX: 1,
            borderRadius: 1,
            color: textColour ?? theme.palette.text.primary,
            fontWeight: 'bold',
            wordBreak: 'break-word'
          }}>
          {card.title}
        </Typography>
      <Typography
        variant={currentSize.descriptionVariant}
        sx={{
          color: textColour ?? theme.palette.text.primary,
          textAlign: 'center',
          marginTop: 1
        }}>
        {card.description}
      </Typography>
    </Box>
  );
};

export default DetailCardContainer;