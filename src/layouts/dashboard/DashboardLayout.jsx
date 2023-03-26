import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
// @mui
import { styled } from '@mui/material/styles';
//
import Header from './header';
import Nav from './nav';

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'flex-start',
});

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />
      <Nav openNav={open} onCloseNav={() => setOpen(false)} />
      <Box display="flex" mt="100px"  width={{ lg: '80%', xs: '100%' }}>
        <Outlet />
      </Box>
    </StyledRoot>
  );
}
