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

function GetSession(props) {
  if (!props.totalSession) {
    return null; // or return some default value or error message
  }

  const name = "Time Login"
  const sessionData = props.totalSession.map((totalSession) => ({
    login: new Date(totalSession.login).toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    }),
    duration: totalSession.duration,
    name: name
  }));

  return (
    <Grid item xs={12} md={6} lg={6}>
      <AppWebsiteVisits title="Child Session Data" chartData={sessionData} chartLabels={sessionData.map((value) => value.login)} />
    </Grid>
  );
}

export default GetSession;