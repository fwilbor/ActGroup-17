import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
// sections
import {
  AppNewsUpdate,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWidgetSummary,
  AppConversionRates,
} from '../sections/@dashboard/app';

function GetFriends(props) {
  
  if (!props.friends || !props.friends.data) {
    return null; // or return some default value or error message
  }

  const friendsList = props.friends.data.map((friend) => {
    console.log(friend);
    return {
      friend: friend.username, 
      img: friend.avatarImage,
      id: friend._id
    }   
  });

  if (friendsList.length <= 0) {
    return null; // or return some default value or error message
  }
console.log(friendsList);

  return (

    <Grid item xs={12} md={6} lg={8}>
      <AppNewsUpdate
        title="Friends List"
        list={[...Array(friendsList.length)].map((_, index) => ({
          id: props.childNameID + index,
          title: friendsList[index].friend,
          description: friendsList[index].id,
          image: `data:image/svg+xml;base64,${friendsList[index].img}`,
          //postedAt: faker.date.recent(),
        }))}
      />     
      </Grid>
  );
}
export default GetFriends;