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
    
    return (
        
        <Grid item xs={12} md={6} lg={8}>
            {friendsList}
            
            <AppConversionRates
              title="Friends List"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
              ]}
            />
          </Grid>
    );
}
export default GetFriends;