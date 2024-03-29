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
              <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary username={child.username} avatarimage={`data:image/svg+xml;base64,${child.avatarImage ? child.avatarImage : base64string}`} onClick={() => handleClick(child)} />
              </Grid>
              {index !== children.length - 1 && <br />}
            </React.Fragment>
            
          ))}
          </Grid>
          <Grid container spacing={3} style = {{ paddingTop : 25 }}>
          <Grid item xs={12} md={6} lg={8}>
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
