
// @mui components
import { Box, useTheme } from '@mui/material';

const LogoWallpaper = ({ rotation = 0, size = '100%', children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        position: 'relative',
        overflow: 'hidden'
      }}>
      <Box
        component="img"
        src="/images/M.svg"
        alt="Logo"
        sx={{
          width: { xs: '240%', sm: '160%', md: size },
          height: 'auto',
          position: 'absolute',
          top: {
            xs: '10%',  // closer to top on mobile
            sm: '10%',
            md: '50%'
          },
          left: {
            xs: '50%',
            sm: '60%',
            md: '50%'
          },
          transform: {
            xs: `translate(-60%, -20%) rotate(${rotation}deg)`,
            sm: `translate(-60%, -30%) rotate(${rotation}deg)`,
            md: `translate(-60%, -50%) rotate(${rotation}deg)`
          },
          transformOrigin: 'center',
          opacity: 0.1,
          zIndex: 0,
          pointerEvents: 'none',
          aspectRatio: '1 / 1',
          objectFit: 'contain'
        }}/>
      <Box
        sx={{
          position: 'relative',
          zIndex: 10,
          height: '100%',
          width: '100%',
        }}>
        {children}
      </Box>
    </Box>
  );
};

export default LogoWallpaper;
