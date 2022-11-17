import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Cookies from "js-cookies";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { io } from "socket.io-client";
import Header from "../components/Header";

import Topbar from '../components/topbar/Topbar';
import Sidebar from "../components/sidebar/Sidebar";
import Feed from "../components/feed/Feed";
import Rightbar from "../components/rightbar/Rightbar";
import "../index.css";

// import { useAuthContext } from "../hooks/useAuthContext"


 function Messenger() {

  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
    const _userId = Cookies.getItem("userId");
    if (_userId) setUserId(_userId);
  }, []);
  return (
    <>
    <Topbar />
    <div className='dashboardContainer'>
    <Sidebar />
    <Feed />
    <Rightbar />
    </div>

    <div>
      <Container>
        <Header socket={socket} userId={userId} setUserId={setUserId} />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Outlet context={{ socket, userId }} />
        </Box>
      </Container>
    </div>


    </>
  )
}

export default Messenger
