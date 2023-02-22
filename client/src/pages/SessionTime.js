import { useState, useEffect, Line } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { getSessionTime } from 'src/utils/APIRoutes';


export default function SessionTime({ userId }) {
  const [sessionTime, setSessionTime] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${getSessionTime.replace(':id', userId)}`);
      const data = await response.json();
      setSessionTime(data);
    };
    fetchData();
  }, [userId]);

  const chartData = {
    labels: sessionTime.map((s) => s.date),
    datasets: [
      {
        label: 'Session Time',
        data: sessionTime.map((s) => s.sessionTime),
        fill: false,
        borderColor: theme.palette.primary.main,
      },
    ],
  };

  return (
    <Grid item xs={12} md={6} lg={8}>
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
                tooltipFormat: 'll',
              },
            },
            y: {
              suggestedMin: 0,
              suggestedMax: 60,
            },
          },
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 14,
                },
              },
            },
          },
        }}
      />
    </Grid>
  );
}