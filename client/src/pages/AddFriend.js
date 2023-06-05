import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Container } from '@mui/material';
import Header from '../layouts/dashboard/header';
import Logo from '../components/logo';
import FriendForm from '../components/FriendForm';

export default function AddFriend() {
    const theme = useTheme();
    return (
        <>
            <Helmet>
                <title> Add Friends | KidzSnap.com </title>
            </Helmet>
            <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
                
            </Box>
            <FriendForm />
        </>
    );
}