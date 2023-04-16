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
  console.log(props.friends)
  console.log(props.friends.data)
  
  if (!props.friends || !props.friends.data) {
    return null; // or return some default value or error message
  }

  const friendsList = props.friends.data.map((friend) => {
    //console.log(friend);
    return {
      friend: friend.username, 
      img: friend.avatarImage,
      id: friend._id
    }   
  });

  if (friendsList.length <= 0) {
    return <div>Child has not made Friends</div>; // or return some default value or error message
  }
//console.log(friendsList);
const base64string = "PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iMTAwLjAwMDAwMHB0IiBoZWlnaHQ9IjEwMC4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDEwMC4wMDAwMDAgMTAwLjAwMDAwMCIKIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgoKPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsMTAwLjAwMDAwMCkgc2NhbGUoMC4xMDAwMDAsLTAuMTAwMDAwKSIKZmlsbD0iIzAwMDAwMCIgc3Ryb2tlPSJub25lIj4KPHBhdGggZD0iTTQ2MCA4NzggYy0xMDcgLTMwIC0xNTIgLTE2NyAtODMgLTI0OSA3NSAtODkgMjExIC03OCAyNjUgMjEgMjUgNDUKMjAgMTI5IC05IDE2OCAtNDAgNTMgLTExMSA3OCAtMTczIDYweiBtMTAxIC01OCBjMjQgLTEzIDQ5IC02MSA0OSAtOTQgMCAtNjIKLTQ2IC0xMDYgLTExMyAtMTA2IC05OCAwIC0xMzcgMTM3IC01NiAxOTQgMjYgMTggOTAgMjEgMTIwIDZ6Ii8+CjxwYXRoIGQ9Ik0zOTMgNTExIGMtMTE3IC00MCAtMTc4IC0xMTYgLTE5OCAtMjQ3IC02IC00MSAtNiAtNDEgNDQgLTc0IDE1MwotOTggMzcwIC05OCA1MjMgLTEgbDQ3IDMwIC00IDU1IGMtMTEgMTgzIC0yMjAgMzA0IC00MTIgMjM3eiBtMjMyIC01OCBjNzAKLTM2IDExNSAtOTEgMTI5IC0xNTkgNiAtMjggMyAtMzUgLTI1IC01NSAtMTI1IC04OSAtMzIxIC05MyAtNDM3IC05IC00OCAzNAotNTEgNTMgLTIzIDExNiAyMiA0OCA3OSA5OCAxMzYgMTE5IDU2IDIwIDE2OCAxNCAyMjAgLTEyeiIvPgo8L2c+Cjwvc3ZnPgo="

  return (

    <Grid item xs={12} md={6} lg={6} style = {{ paddingTop : '10px', paddingLeft : '10px'}}>
      <AppNewsUpdate
        title="Friends List"
        list={[...Array(friendsList.length)].map((_, index) => ({
          id: props.childNameID + index,
          title: friendsList[index].friend,
          description: '',
          image: `data:image/svg+xml;base64,${friendsList[index].img ? friendsList[index].img : base64string }`,
          postedAt: '',
        }))}
      />     
      </Grid>
  );
}
export default GetFriends;