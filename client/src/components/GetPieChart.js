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
                let usernames = [];
                let avatarimages = [];
                
                if (props.childNameID) {
                    usernames[0] = props.childNameID;
                    avatarimages[0] = props.childNameID;
                }
                else {
                    for (let i = 0; i < props.childs.length; i++) {
                        usernames[i] = props.childs[i].username;
                        avatarimages[i] = props.childs[i].avatarimage;
                    }
                }

                const response = await fetch('http://snap-main.herokuapp.com/api/messages/getmsg?parentLink=${props.p_id}');
                const data = await response.json();
                data.forEach(message => {
                    let messageText = message.message.text.toString();
                    if (usernames.includes(message.sender)) {
                        //console.log(messageText);
                        if (SwearWordCheck(messageText) === "Yes") {
                            swearWords++;
                        }
                        totalMsg++;
                    }
                });
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