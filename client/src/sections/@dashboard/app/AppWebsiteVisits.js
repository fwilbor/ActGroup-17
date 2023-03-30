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
  const chartOptions = useChart({
    plotOptions: { bar: { columnWidth: '16%' } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartData.map((data) => data.login),

    xaxis: { 
      categories: chartData.map((data) => {
        const login = data.login;
        const loginWithBreaks = [];
        for (let i = 0; i < login.length; i += 5) {
          loginWithBreaks.push(login.slice(i, i + 5));
        }
        console.log(loginWithBreaks)
        return loginWithBreaks.join('\n');
      }),
      labels: {
        rotate: 0,
        offsetY: 0,
        offsetX: 0,
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Duration (min:sec)'
      },
      labels: {
        formatter: (value) => {
          const minutes = Math.floor(value / 60);
          const seconds = value % 60;
          return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
      }
    },
    tooltip: {
      shared: true,
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
              hour12: true
            });
            return `Time Login: <br/>${durationString}, at <br/>${date}`;
          }
          return y;
        },
      },
    },
  });

  const sessionData = chartData.map((totalSession) => {
    const xarray = new Date(totalSession.login).toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    
    return {
      x: xarray,
      y: totalSession.duration,
    };
  });

   return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={[{ name: '', data: sessionData }]} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
