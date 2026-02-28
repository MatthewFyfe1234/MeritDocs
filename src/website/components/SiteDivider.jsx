
// @mui components
import { Divider, useTheme } from '@mui/material';

const SiteDivider = () => {
  return(
    <Divider
      sx={{
        width: '40%',
        mx: 'auto',
        my: { xs: 2, md: 2 },
        borderBottomWidth: 4,
        borderColor: (theme) => theme.palette.primary.contrastText
      }}/>
  )
}

export default SiteDivider;