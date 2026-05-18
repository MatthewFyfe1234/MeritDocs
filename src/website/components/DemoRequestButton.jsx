import { Button, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setPage, setSection } from '@/context/websiteStore.js';
import { useTranslation } from 'react-i18next';

const DemoRequestButton = ({ isMini = false, backed = true }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Button
      variant={backed ? "contained" : "outlined"}
      onClick={() => {
        dispatch(setPage("DemoRequest"));
        dispatch(setSection("introduction"));
      }}
      sx={{
        background: backed
          ? "#64618D"
          : theme.palette.action.secondary,
        color: backed
          ? "#fff"
          : theme.palette.text.primary,
        maxWidth: isMini ? "150px" : "300px",
        height: isMini ? "40px" : "60px",
        borderRadius: "6px",
        textTransform: "none",
        fontFamily: theme.typography.fontFamily,
        fontSize: isMini ? "14px" : "24px",
        fontWeight: 700,
        lineHeight: 1.1
      }}>
      {t('common.bookDemo')}
    </Button>
  );
};

export default DemoRequestButton;
