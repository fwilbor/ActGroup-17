// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography, Button } from '@mui/material';
// utils
// import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(6),
  height: theme.spacing(6),
  justifyContent: 'center',
  marginBottom: theme.spacing(0.5),
}));

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  username: PropTypes.string,
  currentnummsg: PropTypes.number,
  avatarimage: PropTypes.string.isRequired,
  sx: PropTypes.object,
  onClick: PropTypes.func,
};

export default function AppWidgetSummary({ title, username, avatarimage, currentnummsg, onClick, color = 'primary', sx, ...other }) {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        //paddingTop: '10px',
        //paddingBottom: '10px',
        padding: '5px',
        cursor: 'pointer',
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
        onClick={onClick}
      >
        {avatarimage.startsWith("data:image/svg+xml;base64") ? (
<img src={avatarimage} alt="Avatar image" />
) : (
<Iconify icon={avatarimage} width={24} height={24} />
)}
      </StyledIcon>

      <Typography variant="h5" style={{ fontSize: '12px' }} onClick={onClick}>{(username)}</Typography>
      <Typography variant="h3">{(currentnummsg)}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
      <Button variant="contained" style={{ fontSize: '12px', width: '50px', height: '20px', cursor: 'pointer' }} color="primary" onClick={onClick} >
      Info
    </Button>
    </Card>
  );
}
