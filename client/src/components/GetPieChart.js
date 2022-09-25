import React, { useState, useEffect } from 'react';
import SwearWordCheck from "../components/SwearWordCheck.js"
import { Grid } from '@mui/material';
import { AppCurrentVisits } from '../sections/@dashboard/app';
import { getAllChildren, getChildMessages, getSessionTime } from 'src/utils/APIRoutes';

function GetPieChart(props) {
    //console.log(props)
    const [totalMessages, setTotalMessages] = useState(0);
    const [totalSwearWords, setTotalSwearWords] = useState(0);

     
    useEffect(() => {
        const fetchData = async () => {
            try {
                let totalMsg = 0;
                let swearWords = 0;

                if (props.p_id != "" && props.c_id === "") {
                    const response = await fetch('http://localhost:4000/api/messages/getmsg?parentLink=${props.p_id}');
                    const data = await response.json();
                    data.forEach(message => {
                        let messageText = message.message.text.toString();
                        if (message.users[2] === props.p_id) {
                            //console.log(messageText);
                            if (SwearWordCheck(messageText) === "Yes") {
                                swearWords++;
                            }
                            totalMsg++;
                        }
                    });
                }
                else if (props.c_id != "") {
                    
                    const response = await fetch(`${getChildMessages.replace(':id', props.c_id)}`);
                    const data = await response.json();
                    if (Array.isArray(data) && data.length === 0) {
                        console.error(`${props.c_id} has not sent or received messages`);
                        return;
                    }
                    data.forEach(message => {
                        let messageText = message.message;
                        if (SwearWordCheck(messageText) === "Yes") {
                            swearWords++;
                        }
                        totalMsg++;
                    });
                }
                else {
                    swearWords = 1;
                    totalMsg = 5;
                }
                setTotalMessages(totalMsg);
                setTotalSwearWords(swearWords);
            } catch (error) { console.error(error); }
        };
        fetchData();
    }, [props]);

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
}
export default GetPieChart;