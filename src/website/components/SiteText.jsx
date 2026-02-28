
// @mui components
import { Box } from "@mui/material";
import { Typography, useTheme } from "@mui/material";

export const SiteText = ({
  content,
  colour,
  type = "title",
  widthType = "full",
  textAlign = "left"
}) => {
  const theme = useTheme();
  colour = colour || theme.palette.text.primary;

  return (
    <Box
      sx={{
        textAlign: textAlign,
        mt: 1,
        maxWidth: '100%',
        mx: 0
      }}>
      <Typography
        sx={{
          fontSize: widthType === "half"
            ? (type === "title"
                ? { xs: '20px', md: '28px', lg: '36px' }
                : { xs: '14px', md: '17px', lg: '15px' }
              )
            : (type === "title"
                ? { xs: '26px', md: '40px', lg: '50px' }
                : { xs: '14px', md: '18px', lg: '24px' }
              ),
          color: colour,
          lineHeight: 1.2,
          fontWeight: type === "title" ? 500 : 400,
          textAlign: textAlign
        }}>
        {content}
      </Typography>
    </Box>
  );
};


export default SiteText;