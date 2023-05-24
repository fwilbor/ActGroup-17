import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Container } from '@mui/material';
import Header from '../layouts/dashboard/header';
import Logo from '../components/logo';
import SetAvatar from '../components/SetAvatar';

export default function SetAvatarPage() {

    const theme = useTheme();

    return (
        <>
            <Helmet>
                <title> Set Avatar | KidzSnap.com </title>
            </Helmet>

            <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
                <Logo />
            </Box>
            <Header />
            <SetAvatar />
        </>
    );

}