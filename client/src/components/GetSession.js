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
  const [isDataAvailable, setIsDataAvailable] = useState(false);

  useEffect(() => {
    if (props.totalSession && props.totalSession.length > 0) {
      setIsDataAvailable(true);
    }
  }, [props.totalSession]);

  if (!isDataAvailable) {
    return null; // or return some default value or error message
  }
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
    duration: totalSession.duration
  }));

  return (
    <Grid item xs={12} md={6} lg={6} style = {{ paddingTop : '24px', paddingLeft : '10px'}}>
      <AppWebsiteVisits title="Child Session Data (Last 7 days)" chartData={sessionData} chartLabels={sessionData.map((value) => value.login)} />
    </Grid>
  );
}

export default GetSession;