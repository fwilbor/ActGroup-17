import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography, Select, MenuItem, Button } from '@mui/material';
import Iconify from '../../../components/iconify';
import axios from 'axios';
import { childTimeLimit } from 'src/utils/APIRoutes';

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

AppSettingSummary.propTypes = {
  childId: PropTypes.string.isRequired, // add childId prop type
  color: PropTypes.string,
  icon: PropTypes.string,
  username: PropTypes.string,
  currentnummsg: PropTypes.number,
  updatenummsg: PropTypes.func,
  avatarimage: PropTypes.string.isRequired,
  title: PropTypes.string,
  sx: PropTypes.object,
  onClick: PropTypes.func,
};

export default function AppSettingSummary({ title, username, avatarimage, currentnummsg, updatenummsg, onClick, childId, color = 'primary', sx, ...other }) {
  const [numRecentMessages, setNumRecentMessages] = useState(currentnummsg);
  const [updatedNumRecentMessages, setUpdatedNumRecentMessages] = useState();

  useEffect(() => {
    onClick(updatedNumRecentMessages);
  }, [updatedNumRecentMessages, onClick]);

  const handleChange = (event) => {
    setNumRecentMessages(parseInt(event.target.value));
    console.log(event.target.value);
  };

  const handleApplyMsg = async () => {
    console.log('handleClick called with childId:', childId);
    updatenummsg(numRecentMessages);
    // Make the PATCH request to update the recentMessages field
    const response = await axios.patch(
      `${childTimeLimit.replace(':id', childId)}`,
      { timeLimit: numRecentMessages }
    );
    console.log(updatenummsg); // log the numRecentMessages value
  };

  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        paddingTop: '10px',
        paddingBottom: '10px',
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <StyledIcon
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
              theme.palette[color].dark,
              0.24
            )} 100%)`,
        }}
      >
        {avatarimage.startsWith("data:image/svg+xml;base64") ? (
          <img src={avatarimage} alt="Avatar image" />
        ) : (
          <Iconify icon={avatarimage} width={24} height={24} />
        )}
      </StyledIcon>

      <Typography variant="h4">{(username)}</Typography>
      <Typography variant="strong">Daily Time Limit: <br></br>{Math.floor(numRecentMessages / 60000)} minutes {Math.round((numRecentMessages % 60000) / 1000)} seconds</Typography>
      


      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>

      {/* Change value to correct millseconds */}
      <Select value={numRecentMessages} onChange={(event) => handleChange(event)} sx={{ mt: 1 }}>
        <MenuItem value={600000}>10 minutes</MenuItem>
        <MenuItem value={1200000}>20 minutes</MenuItem>
        <MenuItem value={1800000}>30 minutes</MenuItem>
      </Select>
<br />
      <Button variant="contained" color="primary" onClick={handleApplyMsg} sx={{  mt: 1 }}>
        Set/Reset Time Limit
      </Button>
    </Card>
  );
}
