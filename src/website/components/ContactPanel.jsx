
// @mui components
import { Box } from '@mui/system';

// Components
import LogoWallpaper from "./LogoWallpaper";
import ContactForm from "./ContactForm"

const ContactPanel = ({ children, title, subtitle, enquiryTypeId }) => {
  return (
    <LogoWallpaper rotation={10}>
      <Box
        id="introduction"
        className="tracked-section"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 4,
          px: { xs: 3, sm: 8, md: 6 },
          py: { xs: 6, md: 10 },
          width: '100%',
          zIndex: 10
        }}>
        {children}
        <Box
          sx={{
            flex: { xs: '1 1 100%', sm: '1 1 40%' },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            mt: { xs: 2, md: 4, lg: 6, xl: 8 }
          }}>
          <ContactForm
            enquiryTypeId={enquiryTypeId}
            title={title}
            subtitle={subtitle}/>
        </Box>
      </Box>
    </LogoWallpaper>
  );
};

export default ContactPanel;