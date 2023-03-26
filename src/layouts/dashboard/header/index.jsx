import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
//
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  const {
    i18n: { dir, language },
  } = useTranslation();

  const StyledRoot = styled(AppBar)(({ theme }) => ({
    ...bgBlur({ color: theme.palette.background.default }),
    boxShadow: 'none',
    direction: dir(language),
    backgroundColor: theme.palette.secondary.lighter,
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${NAV_WIDTH + 1}px)`,
      marginRight: dir(language) === 'rtl' ? '280px' : '0px',
    },
  }));

  const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    minHeight: HEADER_MOBILE,
    [theme.breakpoints.up('lg')]: {
      minHeight: HEADER_DESKTOP,
      padding: theme.spacing(0, 5),
    },
  }));
  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <LanguagePopover />
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
