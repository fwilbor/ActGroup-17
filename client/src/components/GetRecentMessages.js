import { faker } from '@faker-js/faker';
import React, { useState, useEffect } from 'react';
import SwearWordCheck from "../components/SwearWordCheck.js"
import { Grid } from '@mui/material';
import { AppNewsUpdate, AppCurrentVisits } from '../sections/@dashboard/app';
import { getAllChildren, getChildMessages, getSessionTime } from 'src/utils/APIRoutes';

function GetRecentMessages(props) {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (props.p_id != "" && props.c_id === "") {
                    setMessages([]);
                    const response = await fetch('http://localhost:4000/api/messages/getmsg?parentLink=${props.p_id}');
                    console.log(response)
                    const data = await response.json();
                    
                    setMessages(data.map(message => {
                        if (message.users[2] === props.p_id) {
                            return message.message.text.toString();
                        }
                    }));
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
                        return message.message;
                        
                    }));
                }
            } catch (error) { console.error(error); }
        };
        fetchData();
    }, [props]);

//console.log(messages);

    return (
        <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
                title="Recent Messages"
                list={[...Array(props.numRecentMessages)].map((_, index) => ({
                    id: props.c_id+index,
                    title: messages[index],
                    description: props.c_id,
                    image: `/assets/images/covers/cover_${index + 1}.jpg`,
                    postedAt: faker.date.recent(),
                }))}
            />
        </Grid>
    );
}
export default GetRecentMessages;