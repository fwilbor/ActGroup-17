import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container } from '@mui/material';
import { getAllChildren } from 'src/utils/APIRoutes';
import axios from 'axios';
import React from 'react';
import AppSettingSummary from 'src/sections/@dashboard/app/AppSettingSummary';
import DashboardLayout from '../layouts/dashboard/header';
import defaultAvatar from "../assets/logo-80x80.png";

export default function DashboardAppPage() {
  const navigate = useNavigate();
  const [children, setChildren] = useState([]);
  const numMsg = useRef(15); // default number of recent messages
  const split = defaultAvatar.split(',');
  const base64string = split[1];

  const parent_id = JSON.parse(
    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  )._id;
  const parent_username = JSON.parse(
    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  ).username;

  
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
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            {/* Add code for left side of dashboard here */}
          </Grid>
          <Grid item xs={12} sm={6} md={9}>
            <Grid container spacing={3}>
            <DashboardLayout/>
              {children.map((child, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={12} sm={6} md={3}>
                    <br></br>
                    <AppSettingSummary
                      username={child.username}
                      avatarimage={`data:image/svg+xml;base64,${child.avatarImage ? child.avatarImage : base64string}`}
                      currentnummsg={child.recentMessages}
                      updatenummsg={(event) => handleChangeRecentMessages(event, child._id)}
                      onClick={(event) => handleClick(child._id, event)}
                      childId={child._id} // pass the childId as a prop
                    />
                  </Grid>
                  {index !== children.length - 1 && <br />}
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}