import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link } from '@mui/material';
import logo80 from '../../assets/logo-55x55-tr.png';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR using local (public folder)
  // -------------------------------------------------------
  // const logo = (
  //   <Box
  //     component="img"
  //     src="/src/assets/logo-250x250_adobe_express.svg"
  //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
  //   />
  // );


  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 55,
        height: 55,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      <img src={logo80} alt="Logo" />
    {/*  
      <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="80.000000pt" height="80.000000pt" viewBox="0 0 80.000000 80.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,80.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M180 450 c0 -15 5 -20 18 -18 9 2 17 10 17 18 0 8 -8 16 -17 18 -13
2 -18 -3 -18 -18z"/>
<path d="M260 343 c0 -142 5 -155 57 -155 41 0 63 34 63 98 0 37 4 54 13 54 6
0 33 -34 59 -75 41 -66 51 -75 77 -75 32 0 61 22 61 47 0 9 -14 38 -31 65 -26
40 -39 50 -76 59 -31 8 -48 19 -58 39 -16 31 -70 60 -126 67 l-39 6 0 -130z"/>
<path d="M164 385 c-9 -23 3 -45 26 -45 25 0 37 25 20 45 -16 19 -39 19 -46 0z"/>
<path d="M613 363 c-15 -6 -17 -49 -3 -58 33 -20 65 26 38 53 -13 13 -16 13
-35 5z"/>
<path d="M390 160 c0 -13 5 -20 13 -17 6 2 12 10 12 17 0 7 -6 15 -12 18 -8 2
-13 -5 -13 -18z"/>
<path d="M340 150 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0
-10 -4 -10 -10z"/>
</g>
</svg>
 */}   

    </Box>
  ); 

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
