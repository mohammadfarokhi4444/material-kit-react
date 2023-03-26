import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Drawer, Typography, Avatar } from '@mui/material';
// hooks
import { useTranslation } from 'react-i18next';
import useResponsive from '../../../hooks/useResponsive';
// components
import Logo from '../../../components/logo';
import NavSection from '../../../components/nav-section';
import navConfig from './config';
import useUserState from '../../../hooks/useUserState';
//

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  const {
    i18n: { dir, language },
  } = useTranslation();
  const anchor = dir(language) === 'rtl' ? 'right' : 'left';
  const { fullName, roleName } = useUserState();
  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const renderContent = (
    <>
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar src={''} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {fullName}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {roleName}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection data={navConfig} />
    </>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: anchor === 'right' ? '0px' : "280px" },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          anchor={anchor}
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          anchor={anchor}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
