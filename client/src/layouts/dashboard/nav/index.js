import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Drawer, Typography, Avatar,} from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
import { useNavigate } from "react-router-dom";
// components
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
//
import navConfig from './config';

// ----------------------------------------------------------------------

const base64string = "PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iMTAwLjAwMDAwMHB0IiBoZWlnaHQ9IjEwMC4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDEwMC4wMDAwMDAgMTAwLjAwMDAwMCIKIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgoKPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsMTAwLjAwMDAwMCkgc2NhbGUoMC4xMDAwMDAsLTAuMTAwMDAwKSIKZmlsbD0iIzAwMDAwMCIgc3Ryb2tlPSJub25lIj4KPHBhdGggZD0iTTQ2MCA4NzggYy0xMDcgLTMwIC0xNTIgLTE2NyAtODMgLTI0OSA3NSAtODkgMjExIC03OCAyNjUgMjEgMjUgNDUKMjAgMTI5IC05IDE2OCAtNDAgNTMgLTExMSA3OCAtMTczIDYweiBtMTAxIC01OCBjMjQgLTEzIDQ5IC02MSA0OSAtOTQgMCAtNjIKLTQ2IC0xMDYgLTExMyAtMTA2IC05OCAwIC0xMzcgMTM3IC01NiAxOTQgMjYgMTggOTAgMjEgMTIwIDZ6Ii8+CjxwYXRoIGQ9Ik0zOTMgNTExIGMtMTE3IC00MCAtMTc4IC0xMTYgLTE5OCAtMjQ3IC02IC00MSAtNiAtNDEgNDQgLTc0IDE1MwotOTggMzcwIC05OCA1MjMgLTEgbDQ3IDMwIC00IDU1IGMtMTEgMTgzIC0yMjAgMzA0IC00MTIgMjM3eiBtMjMyIC01OCBjNzAKLTM2IDExNSAtOTEgMTI5IC0xNTkgNiAtMjggMyAtMzUgLTI1IC01NSAtMTI1IC04OSAtMzIxIC05MyAtNDM3IC05IC00OCAzNAotNTEgNTMgLTIzIDExNiAyMiA0OCA3OSA5OCAxMzYgMTE5IDU2IDIwIDE2OCAxNCAyMjAgLTEyeiIvPgo8L2c+Cjwvc3ZnPgo="

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

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");

useEffect(() => {
  const fetchData=async()=>{

    setCurrentUser(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      )
    );
  }

fetchData();
}, [navigate]);


  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (

    
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
          <Avatar src={`data:image/svg+xml;base64,${currentUser.avatarImage ? currentUser.avatarImage : base64string}`}/>

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
              {currentUser.username}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {currentUser.email}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection data={navConfig} />

      <Box sx={{ flexGrow: 1 }} />

    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
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
