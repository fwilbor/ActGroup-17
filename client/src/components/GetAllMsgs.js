import React, { useState, useEffect } from 'react';
import SwearWordCheck from "../components/SwearWordCheck.js"
import { Grid, Container, Typography } from '@mui/material';
// sections
import {
    AppNewsUpdate,
    AppCurrentVisits,
    AppWebsiteVisits,
    AppWidgetSummary,
    AppConversionRates,
  } from '../sections/@dashboard/app';

const GetAllMsgs = ({ parentLink }) => {
const [messages, setMessages] = useState([]);
const [totalMessages, setTotalMessages] = useState(0);
const [totalSwearWords, setTotalSwearWords] = useState(0);
console.log("Parent Link: " + parentLink);
useEffect(() => {
const fetchData = async () => {
try {
const response = await fetch('http://localhost:4000/api/messages/getmsg?parentLink=${parentLink}');
const data = await response.json();
setMessages(data);
//setMessages(data.filter(message => message.users[2] === parentLink));
//setTotalMessages(data.length);
let totalMsg = 0;
let swearWords = 0;
data.forEach(message => {
    let messageText = message.message.text.toString();
    if (message.users[2] === parentLink) {
        if (SwearWordCheck(messageText) === "Yes") {
            swearWords++;
        }
        totalMsg++;
    }
});
setTotalMessages(totalMsg);
setTotalSwearWords(swearWords);
} catch (error) {
console.error(error);
}
};
fetchData();
}, [parentLink]);

return (
    
   <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Flagged Messages"
              chartData={[
                { label: 'Total Messages', value: parseInt(totalMessages, 10) },
                { label: 'Flagged Messages', value: parseInt(totalSwearWords, 10) },
              ]}
              chartColors={[
                "rgba(0, 0, 255, 1)",
                "rgba(255, 0, 0, 1)",
              ]}
            />
          </Grid>
);
};

export default GetAllMsgs;