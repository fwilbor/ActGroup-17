import { faker } from '@faker-js/faker';
import React, { useState, useEffect } from 'react';
import SwearWordCheck from "../components/SwearWordCheck.js"
import { Grid } from '@mui/material';
import { AppNewsUpdate, AppCurrentVisits } from '../sections/@dashboard/app';
import { getAllChildren, getChildMessages, getSessionTime } from 'src/utils/APIRoutes';
import { ContactsOutlined } from '@material-ui/icons';

function GetRecentMessages(props) {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (props.c_id !== "") {
          setMessages([]);
          const response = await fetch(`http://localhost:4000/api/messages/getmsg?${props.c_id}`);
          const data = await response.json();
          if (Array.isArray(data) && data.length === 0) {
            console.error(`${props.c_id} has not sent or received messages`);
            return;
          }
          setMessages(data.filter(message => message.users.includes(props.username)).map(message => SwearWordCheck(message.message)));
        }
        else if (props.c_id != "") {
          setMessages([]);
          const response = await fetch(`${getChildMessages.replace(':id', props.c_id)}`);
          const data = await response.json();
          if (Array.isArray(data) && data.length === 0) {
            console.error(`${props.c_id} has not sent or received messages`);
            return;
          }
          setMessages(data.map(message => {
            return SwearWordCheck(message.message);
          }));
        }
      } catch (error) { console.error(error); }
    };
    fetchData();
  }, [props]);

  const messageList = messages.slice(0, 5).map((message, index) => {
    const sender = props.c_id !== "" ? message.sender : "Unknown Sender";
    return {
      id: props.c_id + index,
      title: message,
      description: sender,
      image: `/assets/images/covers/cover_${index + 1}.jpg`,
      postedAt: faker.date.recent(),
    };
  });

  return (
    <Grid item xs={12} md={6} lg={8}>
      <AppNewsUpdate
        title="Recent Messages"
        list={messageList}
      />
    </Grid>
  );
}

export default GetRecentMessages;