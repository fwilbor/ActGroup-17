import { faker } from '@faker-js/faker';
import React, { useState, useEffect } from 'react';
import SwearWordCheck from "../components/SwearWordCheck.js"
import { Grid } from '@mui/material';
import { AppNewsUpdate, AppCurrentVisits } from '../sections/@dashboard/app';
import { getAllChildren, getChildMessages, getSessionTime } from 'src/utils/APIRoutes';

function GetRecentMessages(props) {
    const [messages, setMessages] = useState([]);
    let flag = "";
    useEffect(() => {
        const fetchData = async () => {
            try {
                let usernames = [];
                let avatarimages = [];
                
                if (props.childNameID) {
                    usernames[0] = props.childNameID;
                    avatarimages[0] = props.childAvatarId;
                }
                else {
                    for (let i = 0; i < props.childs.length; i++) {
                        usernames[i] = props.childs[i].username;
                        avatarimages[i] = props.childs[i].avatarImage;
                    }
                }
                //console.log(props.childs);
                //console.log(avatarimages);

<<<<<<< HEAD
                const response = await fetch('http://kidzsnap-heroku.herokuapp.com/api/messages/getmsg?parentLink=${props.p_id}');
=======
                const response = await fetch('http://localhost:4000/api/messages/getmsg?parentLink=${props.p_id}');
>>>>>>> main
                const data = await response.json();
                setMessages(data.map(message => {
                    if (usernames.includes(message.sender)) {
                        flag = SwearWordCheck(message.message.text);
                        const usernameKey = usernames.findIndex(username => username === message.sender);
                        return {
                            text: message.message.text, 
                            sender: message.sender,
                            msg: " From: " + message.users[0] + " To: " + message.users[1] + " - Flag: " + flag,
                            date: message.createdAt,
                            img: avatarimages[usernameKey],
                        }
                    }
                }).filter(message => message !== undefined));                
            } catch (error) { console.error(error); }
        };
        fetchData();
    }, [props]);

//console.log(messages);

let A;
if (messages.length > 5) {
  A = 5;
} else {
  A = messages.length;
}
    return (
        <Grid item xs={12} md={6} lg={6} style = {{ paddingTop : '10px', paddingLeft : '10px'}}>
            <AppNewsUpdate
                title="Recent Messages"
                list={[...Array(A)].map((_, index) => ({
                    id: props.childNameID+index,
                    title: messages[index].text,
                    description: messages[index].msg,
                    image: `data:image/svg+xml;base64,${messages[index].img}`,
                    //image: `/assets/images/covers/cover_${index + 1}.jpg`,
                    postedAt: messages[index].date,
                    //postedAt: faker.date.recent(),
                }))}
            />
        </Grid>
    );
}
export default GetRecentMessages;