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
import GetSession from "../components/GetSession.js"
import axios from 'axios';
import React from 'react';
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
  const [totalSession, setTotalSession] = useState([]);
 
// load the default avatar image
const base64string = "PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iMTAwLjAwMDAwMHB0IiBoZWlnaHQ9IjEwMC4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDEwMC4wMDAwMDAgMTAwLjAwMDAwMCIKIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgoKPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsMTAwLjAwMDAwMCkgc2NhbGUoMC4xMDAwMDAsLTAuMTAwMDAwKSIKZmlsbD0iIzAwMDAwMCIgc3Ryb2tlPSJub25lIj4KPHBhdGggZD0iTTQ2MCA4NzggYy0xMDcgLTMwIC0xNTIgLTE2NyAtODMgLTI0OSA3NSAtODkgMjExIC03OCAyNjUgMjEgMjUgNDUKMjAgMTI5IC05IDE2OCAtNDAgNTMgLTExMSA3OCAtMTczIDYweiBtMTAxIC01OCBjMjQgLTEzIDQ5IC02MSA0OSAtOTQgMCAtNjIKLTQ2IC0xMDYgLTExMyAtMTA2IC05OCAwIC0xMzcgMTM3IC01NiAxOTQgMjYgMTggOTAgMjEgMTIwIDZ6Ii8+CjxwYXRoIGQ9Ik0zOTMgNTExIGMtMTE3IC00MCAtMTc4IC0xMTYgLTE5OCAtMjQ3IC02IC00MSAtNiAtNDEgNDQgLTc0IDE1MwotOTggMzcwIC05OCA1MjMgLTEgbDQ3IDMwIC00IDU1IGMtMTEgMTgzIC0yMjAgMzA0IC00MTIgMjM3eiBtMjMyIC01OCBjNzAKLTM2IDExNSAtOTEgMTI5IC0xNTkgNiAtMjggMyAtMzUgLTI1IC01NSAtMTI1IC04OSAtMzIxIC05MyAtNDM3IC05IC00OCAzNAotNTEgNTMgLTIzIDExNiAyMiA0OCA3OSA5OCAxMzYgMTE5IDU2IDIwIDE2OCAxNCAyMjAgLTEyeiIvPgo8L2c+Cjwvc3ZnPgo="
      
  const toastOptions = {
    position: "top-center",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const adult_or_child = JSON.parse(
    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  ).parentLink;
  //console.log(parent_or_child)

  if (adult_or_child !== undefined) {
    navigate("/chat");
    }

  const parent_id = JSON.parse(
    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  )._id;
  console.log(parent_id)
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
    console.log(user)   
    setChildAvatar(user.avatarImage);
    setChildId(user.username);
    setTotalSession(user.totalSession);
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

  console.log(childId)

  const theme = useTheme();
  return (
    <>
      <Helmet>
        <title> Dashboard | KidzSnap.com </title>
      </Helmet>
      <Container maxWidth="xl">
        
        <Grid container spacing={3}>
          {children.map((child, index) => (
            <React.Fragment key={index}>
              <Grid item  xs='auto' sm={2} md={1.2} lg={1.1} xl={1} style = {{ paddingTop : '10px', paddingLeft : '10px'}}>
              <AppWidgetSummary username={child.username} avatarimage={`data:image/svg+xml;base64,${child.avatarImage ? child.avatarImage : base64string}`} onClick={() => handleClick(child)} />
              </Grid>
              {index !== children.length - 1 && <br />}
            </React.Fragment>
            
          ))}
          </Grid>

          <Grid container spacing={3} style = {{ paddingTop : '10px'}}>
            <GetPieChart childNameID={childId} childs={children} />
            <GetSession childNameID={childId} totalSession={totalSession} />
            <GetRecentMessages childNameID={childId} childAvatarId={childAvatar} childs={children} />
            <GetFriends childNameID={childId} friends={friendsList} />
          </Grid>
        
      </Container>
    </>
  );
}
