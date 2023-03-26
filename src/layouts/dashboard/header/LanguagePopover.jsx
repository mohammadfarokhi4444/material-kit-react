import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton, Popover } from '@mui/material';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 'en',
    label: 'English',
    icon: '/assets/icons/ic_flag_en.svg',
  },
  {
    value: 'fa',
    label: 'Persian',
    icon: '/assets/icons/ic_flag_pr.svg',
  },
];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const { i18n } = useTranslation();
  const newLang = i18n.language === 'fa' ? 'en' : 'fa';
  const [open, setOpen] = useState(null);
  const [langSelected, setLangSelected] = useState(i18n.language === 'fa' ? 1 : 0);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleClick = () => {
    i18n.changeLanguage(newLang, () => {
      window.location.reload();
    });
    setLangSelected(newLang);
    localStorage.setItem('lang', newLang);
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <img src={LANGS[langSelected].icon} alt={LANGS[langSelected].label} />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map((option, index) => (
            <MenuItem key={index} selected={index === langSelected} onClick={handleClick}>
              <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />

              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
}
