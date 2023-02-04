import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { getAllChildren } from 'src/utils/APIRoutes';
import MessageForm from '../components/MessageForm';
import GetAllMsgs from "../components/GetAllMsgs.js"
import axios from 'axios';
import React from 'react';

// sections
import {
  AppNewsUpdate,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWidgetSummary,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
  var [childUser, setChildUser] = useState("");
  const [CurID, setCurID] = useState("");
  const [CurUser, setCurUser] = useState(0);
  const [children, setChildren] = useState([]);

  const parent_id = JSON.parse(
    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  )._id;
  console.log(parent_id)

  useEffect(() => {
  const fetchData=async()=>{
    const parent_data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurID(parent_data._id)
  setCurUser(parent_data.username)
  setChildUser(parent_data.parentChildLink)
    const parentLink = parent_data._id
        const data = await axios.get(`${getAllChildren}/${parentLink}`);
        const data_array = data.data
        setChildren(Array.from(data_array));
        console.log(parentLink)
  }
   
  
   

fetchData();
}, []);

//console.log(currentUser)
//console.log(childUser)

//console.log(currentUser)

//const cfrs = currentUser.friends
//console.log(cfrs) 

  const theme = useTheme();
  return (
    <>
      <Helmet>
        <title> Dashboard | KidsSnap.com </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
        Hi {CurUser}, Welcome back<br />
        {
        //Hi {CurUser.toUpperCase()}, Welcome back<br />
        }
          { CurID }<br />
          
        </Typography>

        {children.map((child, index) => (
  <React.Fragment key={index}>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary username={child.username} avatarImage={<img src={`data:image/png;base64,${child.avatarImage}`} />}  />
      </Grid>
    </Grid>
    {index !== children.length - 1 && <br />}
  </React.Fragment>
))}

        <Grid container spacing={3}>
          
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Child Usage"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>
          
          { GetAllMsgs('currentUser._id') }
          
          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Friends List"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="Recent Activity"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
                
        <div>
        <MessageForm />
        </div>
          </Grid>

        </Grid>
      </Container>
    </>
  );
}
