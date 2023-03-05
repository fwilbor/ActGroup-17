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
  //console.log(props.friends.data);

  if (!props.friends || !props.friends.data) {
    return null; // or return some default value or error message
  }

  const friendsList = props.friends.data.map((friend) => {
    return <div key={friend._id}>{friend.username}</div>;
  });

  if (friendsList.length <= 0) {
    return <div>Child has not made Friends</div>; // or return some default value or error message
  }

  return (

    <Grid item xs={12} md={6} lg={8}>
      <AppNewsUpdate
        title="Friends List"
        //list={[...Array({friendListCount})].map((_, index) => ({
        list={[...Array(friendsList.length)].map((_, index) => ({
          id: props.c_id + index,
          //title: messages[index],
          description: friendsList[index],
          image: `/assets/images/covers/cover_${index + 1}.jpg`,
          //postedAt: faker.date.recent(),
        }))}
      />     
      </Grid>
  );
}
export default GetFriends;