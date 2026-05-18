
// @mui components
import { Box } from '@mui/system';

// Components
import LogoWallpaper from "./LogoWallpaper";
import ContactForm from "./ContactForm"

const ContactPanel = ({ children, title, subject, subtitle, enquiryTypeId }) => {
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
          alignItems: { md: 'center' },
          gap: 4,
          px: { xs: 3, sm: 8, md: 6 },
          py: { xs: 3, md: 5 },
          minHeight: { md: 'calc(100dvh - 74px)' },
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
            mt: { xs: 2, md: 2 }
          }}>
          <ContactForm
            enquiryTypeId={enquiryTypeId}
            title={title}
            subject={subject}
            subtitle={subtitle}/>
        </Box>
      </Box>
    </LogoWallpaper>
  );
};

export default ContactPanel;