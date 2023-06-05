import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect, useRef } from 'react'
import { Box, Grid, Container } from '@mui/material';
import Header from '../layouts/dashboard/header';
import Nav from '../layouts/dashboard/nav'
import Logo from '../components/logo';
import SetAvatar from '../components/SetAvatar';

export default function SetAvatarPage() {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    return (
        <>
            <Helmet>
                <title> Set Avatar | KidzSnap.com </title>
            </Helmet>
            <Box sx={{ px: 2.5, py: 0, display: 'inline-flex' }}>
                <Logo />
            </Box>
            <Header/>
            <Nav openNav={open} onCloseNav={() => setOpen(false)} css={{ '@media (min-width: 768px)': { display: 'none' } }} />
            <SetAvatar />
        </>
    );
}