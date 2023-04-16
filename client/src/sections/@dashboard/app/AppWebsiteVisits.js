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

  useEffect(() => {
    if (chartData.length > 0) {
      setIsDataAvailable(true);
    }
  }, [chartData]);

  // if (!isDataAvailable) {
  //   return <div>Loading...</div>;
  // }
  console.log(chartLabels)
  const chartOptions = useChart({
    plotOptions: { bar: { columnWidth: '16%' } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartData.map((data) => data.login),
    xaxis: {
      categories: chartData.map((data) => {
        const [date, time] = [
          new Date(data.login).toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
          }),
          new Date(data.login).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
          })
        ];
        return `${date} ${time}`;
      }),
      labels: {
        rotate: -45,
        trim: true,
        maxHeight: 150,
        style: {
          fontSize: '10px',
        },
        offsetX: -5,
        formatter: function (value) {
          if (typeof value === 'undefined') {
            return '';
          }
          const [date, time] = value.split(' ');
          const formattedDate = new Date(date).toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
          });
          return formattedDate;
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
            const date = new Date(chartData[dataPointIndex].login).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            });
            return `Time Login: <br/>${durationString}, at <br/>${date}`;
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
    <ReactApexChart type="line" series={[{ name: '', data: sessionData }]} options={chartOptions} width={432} height={264} />
    </Card>
    </Box>
  );
}