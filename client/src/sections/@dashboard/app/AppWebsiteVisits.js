import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
import { useChart } from '../../../components/chart';

// ----------------------------------------------------------------------

AppWebsiteVisits.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string),
};

export default function AppWebsiteVisits({ title, subheader, chartLabels, chartData, ...other }) {
  const [isDataAvailable, setIsDataAvailable] = useState(false);
  const [totalDurationByDay, setTotalDurationByDay] = useState([]);

  useEffect(() => {
    if (chartData.length > 0) {
      setIsDataAvailable(true);

      // Calculate the date that is 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Filter the chartData to get only data that is within the last 7 days
    const filteredData = chartData.filter((data) => new Date(data.login) >= sevenDaysAgo);
    //console.log(filteredData)

    // Sort data by date
    filteredData.sort((a, b) => new Date(a.login) - new Date(b.login));
  
      // Group data by day of the week
      const dataByDayOfWeek = {};
      filteredData.forEach((data) => {
        const dayOfWeek = new Date(data.login).getDay();
        if (!dataByDayOfWeek.hasOwnProperty(dayOfWeek)) {
          dataByDayOfWeek[dayOfWeek] = [];
        }
        dataByDayOfWeek[dayOfWeek].push(data);
      });
  
      // Calculate total duration for each day of the week
const totalDurationByDay = [0, 0, 0, 0, 0, 0, 0]; // Initialize array with 0 values for each day of the week
for (let i = 0; i < 7; i++) {
  const dataForDayOfWeek = dataByDayOfWeek[i] || [];
  const totalDurationForDay = dataForDayOfWeek.reduce((acc, curr) => acc + curr.duration, 0);
  totalDurationByDay[i] = totalDurationForDay;
}
  
      //console.log(totalDurationByDay);
      setTotalDurationByDay(totalDurationByDay);
    }
  }, [chartData]);

  // if (!isDataAvailable) {
  //   return <div>Loading...</div>;
  // }
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
 
  const chartOptions = useChart({
    plotOptions: { bar: { columnWidth: '16%' } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartData.map((data) => data.login),
    xaxis: {
      categories: daysOfWeek,
      labels: {
        trim: true,
        maxHeight: 150,
        style: {
          fontSize: '12px',
        },
        formatter: function (value) {
          if (typeof value === 'undefined') {
            return '';
          }
          const [date, time] = value.split(' ');
          const formattedDate = new Date(date).toLocaleDateString('en-US', {
            weekday: 'short'
          });
          return value;
        },
      },
    },
    yaxis: {
      title: {
        text: 'Duration (min:sec)',
      },
      labels: {
        formatter: (value) => {
          const minutes = Math.floor(value / 60);
          const seconds = value % 60;
          return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        },
      },
    },
    tooltip: {
      shared: false,
      intersect: false,
      y: {
        formatter: (y, { dataPointIndex }) => {
          if (typeof y !== 'undefined') {
            const minutes = Math.floor(y / 60);
            const seconds = y % 60;
            const durationString = `${minutes} minute${minutes !== 1 ? 's' : ''} ${seconds} second${seconds !== 1 ? 's' : ''}`;
            //const date = new Date(chartData[dataPointIndex].login);
            // const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            // const dayOfWeek = daysOfWeek[date.getDay()];
            // const formattedDate = date.toLocaleString('en-US', {
            //   month: 'short',
            //   day: 'numeric',
            //   year: 'numeric',
            //   hour: 'numeric',
            //   minute: '2-digit',
            //   hour12: true,
            // });
            if (y === 0) {
              return `User did not login `;
            } else {
              return `Time Login: ${durationString}`;
            }
          }
          return y;
        },
      },
    },
  });

  const sessionData = chartData.map((totalSession) => {
    const loginTime = new Date(totalSession.login).toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    });
    
    return {
      x: loginTime,
      y: totalSession.duration,
    };
  });

   return (
    <Box sx={{ width: '100%' }}>
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
    <ReactApexChart type="bar" series={[{ name: '', data: totalDurationByDay }]} options={chartOptions} width={432} height={295} />
    </Card>
    </Box>
  );
}
