import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
//import NotificationsPopover from './NotificationsPopover';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 52;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 2),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  
  const parent_username = JSON.parse(
    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  ).username;

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

        <Typography variant="h4" style={{ color: '#000', marginBottom: '5px', paddingTop: '5px'  }} sx={{ mb: 5 }}>
          Hi {parent_username.toUpperCase()}, Welcome back
        </Typography>

        {/* <Searchbar /> */}


        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          {/* <NotificationsPopover /> */}
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
