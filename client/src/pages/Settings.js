import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Container } from '@mui/material';
import { getAllChildren, logoutRoute } from 'src/utils/APIRoutes';
import axios from 'axios';
import React from 'react';
import AppSettingSummary from 'src/sections/@dashboard/app/AppSettingSummary';
//import DashboardLayout from '../layouts/dashboard/header';
import Header from '../layouts/dashboard/header';
import Logo from '../components/logo';

export default function DashboardAppPage() {
  const navigate = useNavigate();
  const [children, setChildren] = useState([]);
  const numMsg = useRef(15); // default number of recent messages
  const base64string = "PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iMTAwLjAwMDAwMHB0IiBoZWlnaHQ9IjEwMC4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDEwMC4wMDAwMDAgMTAwLjAwMDAwMCIKIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgoKPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsMTAwLjAwMDAwMCkgc2NhbGUoMC4xMDAwMDAsLTAuMTAwMDAwKSIKZmlsbD0iIzAwMDAwMCIgc3Ryb2tlPSJub25lIj4KPHBhdGggZD0iTTQ2MCA4NzggYy0xMDcgLTMwIC0xNTIgLTE2NyAtODMgLTI0OSA3NSAtODkgMjExIC03OCAyNjUgMjEgMjUgNDUKMjAgMTI5IC05IDE2OCAtNDAgNTMgLTExMSA3OCAtMTczIDYweiBtMTAxIC01OCBjMjQgLTEzIDQ5IC02MSA0OSAtOTQgMCAtNjIKLTQ2IC0xMDYgLTExMyAtMTA2IC05OCAwIC0xMzcgMTM3IC01NiAxOTQgMjYgMTggOTAgMjEgMTIwIDZ6Ii8+CjxwYXRoIGQ9Ik0zOTMgNTExIGMtMTE3IC00MCAtMTc4IC0xMTYgLTE5OCAtMjQ3IC02IC00MSAtNiAtNDEgNDQgLTc0IDE1MwotOTggMzcwIC05OCA1MjMgLTEgbDQ3IDMwIC00IDU1IGMtMTEgMTgzIC0yMjAgMzA0IC00MTIgMjM3eiBtMjMyIC01OCBjNzAKLTM2IDExNSAtOTEgMTI5IC0xNTkgNiAtMjggMyAtMzUgLTI1IC01NSAtMTI1IC04OSAtMzIxIC05MyAtNDM3IC05IC00OCAzNAotNTEgNTMgLTIzIDExNiAyMiA0OCA3OSA5OCAxMzYgMTE5IDU2IDIwIDE2OCAxNCAyMjAgLTEyeiIvPgo8L2c+Cjwvc3ZnPgo="

  const parent_id = JSON.parse(
    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  )._id;
  const parent_username = JSON.parse(
    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  ).username;

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleBeforeUnload = async () => {
    const logout_user = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );

    // Might need a if statement to check user.isLogin
    try {
      await axios.get(`${logoutRoute}/${logout_user._id}`);
      localStorage.removeItem(process.env.REACT_APP_LOCALHOST_KEY);
      navigate("/login");
      window.location.reload();
    } catch (ex) {
      console.log(ex);
    }
  };

  
  const handleChangeRecentMessages = (event) => {
    console.log(event);
    if (event ) {
      const value = parseInt(event);
      numMsg.current = value;
      console.log(value);
    }
  };

  const handleClick = (childId, event) => async () => {
    console.log('handleClick called with childId:', childId);
   
  };

  useEffect(() => {
    const fetchData = async () => {
      const parent_data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      const parentLink = parent_data._id;
      const data = await axios.get(`${getAllChildren}/${parentLink}`);
      const data_array = data.data;
      setChildren(Array.from(data_array));
    };
    fetchData();
  }, []);

  const theme = useTheme();
  return (
    <>
      <Helmet>
        <title> Settings | KidzSnap.com </title>
      </Helmet>
      
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>
      <Header/>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          
              {children.map((child, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={12} sm={6} md={2}>
                    <br />
                    <AppSettingSummary
                      username={child.username}
                      avatarimage={`data:image/svg+xml;base64,${child.avatarImage ? child.avatarImage : base64string}`}
                      currentnummsg={child.timeLimit}
                      updatenummsg={(event) => handleChangeRecentMessages(event, child._id)}
                      onClick={(event) => handleClick(child._id, event)}
                      childId={child._id} // pass the childId as a prop
                    />
                  </Grid>
                  {index !== children.length - 1 && <br />}
                </React.Fragment>
              ))}
            
          
        </Grid>
      </Container>
    </>
  );
}