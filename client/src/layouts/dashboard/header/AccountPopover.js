import { useState, useEffect } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Logout from "../../../components/Logout.js"
import axios from "axios";

const base64string = "PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iMTAwLjAwMDAwMHB0IiBoZWlnaHQ9IjEwMC4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDEwMC4wMDAwMDAgMTAwLjAwMDAwMCIKIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgoKPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsMTAwLjAwMDAwMCkgc2NhbGUoMC4xMDAwMDAsLTAuMTAwMDAwKSIKZmlsbD0iIzAwMDAwMCIgc3Ryb2tlPSJub25lIj4KPHBhdGggZD0iTTQ2MCA4NzggYy0xMDcgLTMwIC0xNTIgLTE2NyAtODMgLTI0OSA3NSAtODkgMjExIC03OCAyNjUgMjEgMjUgNDUKMjAgMTI5IC05IDE2OCAtNDAgNTMgLTExMSA3OCAtMTczIDYweiBtMTAxIC01OCBjMjQgLTEzIDQ5IC02MSA0OSAtOTQgMCAtNjIKLTQ2IC0xMDYgLTExMyAtMTA2IC05OCAwIC0xMzcgMTM3IC01NiAxOTQgMjYgMTggOTAgMjEgMTIwIDZ6Ii8+CjxwYXRoIGQ9Ik0zOTMgNTExIGMtMTE3IC00MCAtMTc4IC0xMTYgLTE5OCAtMjQ3IC02IC00MSAtNiAtNDEgNDQgLTc0IDE1MwotOTggMzcwIC05OCA1MjMgLTEgbDQ3IDMwIC00IDU1IGMtMTEgMTgzIC0yMjAgMzA0IC00MTIgMjM3eiBtMjMyIC01OCBjNzAKLTM2IDExNSAtOTEgMTI5IC0xNTkgNiAtMjggMyAtMzUgLTI1IC01NSAtMTI1IC04OSAtMzIxIC05MyAtNDM3IC05IC00OCAzNAotNTEgNTMgLTIzIDExNiAyMiA0OCA3OSA5OCAxMzYgMTE5IDU2IDIwIDE2OCAxNCAyMjAgLTEyeiIvPgo8L2c+Cjwvc3ZnPgo="

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");

useEffect(() => {
  const fetchData=async()=>{
  if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
    navigate("/login");
  } else {
    const user = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUser(user);
  }
};
fetchData();
}, [navigate, setCurrentUser]);

const MENU_OPTIONS = [
  {
    label: 'Dashboard',
    icon: 'eva:home-fill',
    link: '/dashboard/app',
  },
  {
    label: 'Add Friend',
    icon: 'eva:settings-2-fill',
    link: '/addfriend',
  },
  {
    label: 'Set Avatar',
    icon: 'eva:settings-2-fill',
    link: '/setavatar',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
    link: '/settings',
  },
];

// ----------------------------------------------------------------------

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar 
  src={`data:image/svg+xml;base64,${currentUser.avatarImage ? currentUser.avatarImage : base64string}`} 
/>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {currentUser.username}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {currentUser.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
           <MenuItem key={option.label} onClick={() => {
            handleClose();
            navigate(option.link);
          }}>
            {option.label}
          </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleClose} sx={{ m: 1 }}>
          <Logout/>
        </MenuItem>
      </Popover>
    </>
  );
}
