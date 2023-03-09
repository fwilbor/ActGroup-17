// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
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
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
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
        width: 150,
        textAlign: 'center',
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

      <Typography variant="h3">{(username)}</Typography>
      <Typography variant="h3">{(currentnummsg)}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
      <button style={{ width: '75px', height: '35px' }} onClick={onClick}>
      Details
    </button>
    </Card>
  );
}
