import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { getAllChildren, getChildMessages, getSessionTime, getAllFriends } from 'src/utils/APIRoutes';
import MessageForm from '../components/MessageForm';
import GetPieChart from "../components/GetPieChart.js"
import GetRecentMessages from "../components/GetRecentMessages.js"
import GetFriends from "../components/GetFriends.js"
import axios from 'axios';
import React from 'react';
import defaultAvatar from "../assets/logo-80x80.png";
import { toast } from "react-toastify";

// sections
import {
  AppNewsUpdate,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWidgetSummary,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {

  const navigate = useNavigate();
  const [sessionTime, setSessionTime] = useState("");
  const [childName, setChildName] = useState("");
  var [childUser, setChildUser] = useState("");
  const [children, setChildren] = useState([]);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [childId, setChildId] = useState("");
  const [childAvatar, setChildAvatar] = useState("");
  const [friendsList, setFriendslist] = useState("");
 
// load the default avatar image
const split = defaultAvatar.split(',');
    const base64string = split[1];
    const base63string = "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"
    console.log(defaultAvatar)
  
  const toastOptions = {
    position: "top-center",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const parent_id = JSON.parse(
    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  )._id;
  //console.log(parent_id)
  const parent_username = JSON.parse(
    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  ).username;

  const handleClick = async (user) => {
    setSelectedUser(user);
    
    if (user) {
      const friends_list = await axios.get(`${getAllFriends}/${user._id}`);
      setFriendslist(friends_list);
      //for (let i = 0; i < friends_list.data.length; i++) {
      //  console.log(friends_list.data[i].username);
      //}
    }
       
    setChildAvatar(user.avatarImage);
    setChildId(user.username);
    const response = await fetch(`${getChildMessages.replace(':username', user.username)}`);
    const messages = await response.json();
    if (Array.isArray(messages) && messages.length === 0) {
      console.error(`${user.username} has not sent or received messages`);
      //return;
      }
    
    //console.log(messages);

    // Get child session time
    
    setChildName(user.username)
    // session time needs to be fixed regarding how it's added/multiplied/divided
    const session = await fetch(`${getSessionTime.replace(':id', user._id)}`);
    const data = await session.json();
    const sessionTimeInSeconds = data.sessionTime;
    const days = Math.floor(sessionTimeInSeconds / (24 * 3600));
    const hours = Math.floor((sessionTimeInSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((sessionTimeInSeconds % 3600) / 60);
    const seconds = Math.floor(sessionTimeInSeconds % 60);
    const formattedSessionTime = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    setSessionTime(formattedSessionTime);
  };

  useEffect(() => {
    const fetchData = async () => {
      const parent_data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setChildUser(parent_data.parentChildLink)
      const parentLink = parent_data._id
      const data = await axios.get(`${getAllChildren}/${parentLink}`);
      const data_array = data.data
      setChildren(Array.from(data_array));
    }
    fetchData();
  }, []);

  const theme = useTheme();
  return (
    <>
      <Helmet>
        <title> Dashboard | KidzSnap.com </title>
      </Helmet>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi {parent_username.toUpperCase()}, Welcome back<br />
        </Typography>

        <Grid container spacing={3}>
          {children.map((child, index) => (
            <React.Fragment key={index}>
              <Grid item xs='auto' sm={2} md={1.5} lg={1.5} xl={1.5}>
              <AppWidgetSummary username={child.username} avatarimage={`data:image/svg+xml;base64,${child.avatarImage ? child.avatarImage : base63string}`} onClick={() => handleClick(child)} />
              </Grid>
              {index !== children.length - 1 && <br />}
            </React.Fragment>
            
          ))}
          </Grid>
          <Grid container spacing={3} style = {{ paddingTop : 25 }}>
          <Grid item xs={12} md={12} lg={12}>
            <h1>{childName} Total Time Logged In: {sessionTime}</h1>
          </Grid>
          <GetRecentMessages childNameID={childId} childAvatarId={childAvatar} childs={children} />
          <GetPieChart childNameID={childId} childs={children} />
          <GetFriends childNameID={childId} friends={friendsList} />
          
        </Grid>
        <div>
          <MessageForm />
        </div>
      </Container>
    </>
  );
}
