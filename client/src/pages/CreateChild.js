import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect, useRef } from 'react'
import { Box, Grid, Container } from '@mui/material';
import Header from '../layouts/dashboard/header';
import Nav from '../layouts/dashboard/nav'
import Logo from '../components/logo';
import CreateChildform from '../components/CreateChildform';


export default function AddFriend() {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    return (
        <>
            <Helmet>
                <title> Add Friends | KidzSnap.com </title>
            </Helmet>
            <Box sx={{ px: 2.5, py: 0, display: 'inline-flex' }}>
                <Logo />
            </Box>
            <Header onOpenNav={() => setOpen(true)} />
            <Nav openNav={open} onCloseNav={() => setOpen(false)} css={{ '@media (min-width: 768px)': { display: 'none' } }} />
            <CreateChildform />
        </>
    );
}


