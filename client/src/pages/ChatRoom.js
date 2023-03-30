import { Helmet } from 'react-helmet-async';
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { getAllFriends, host, logoutRoute } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import Header from '../layouts/dashboard/header';
import Logo from '../components/logo';
import { Box } from '@mui/material';

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

   useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/login");
      } else {
        setCurrentUser(
          await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          )
        );
      }
    }
    fetchData();
  }, [navigate]);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${getAllFriends}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    }
    fetchData();
  }, [currentUser, navigate]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
    navigate("/chat");
  };

  const handleBeforeUnload = async (event) => {
    const logout_user = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    event.preventDefault();
    console.log(logout_user._id)
    event.returnValue = "";
    if (socket.current) {
      socket.current.disconnect();
    }
    try {
      console.log(logout_user._id)
      if (!logout_user._id) return;
      console.log('if statement in handle read')
      axios.get(`${logoutRoute}/${logout_user._id}`);
    } catch (ex) {
      console.log(ex);
    }
};
  
  useEffect(() => {
    console.log("Adding event listener for beforeunload");
    window.addEventListener("beforeunload", handleBeforeUnload);
  
    return () => {
      console.log("Removing event listener for beforeunload");
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title> Chat Room | KidzSnap.com </title>
      </Helmet>
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>
      {currentUser && currentUser.parentLink === undefined ? (
        <Header />

      ) : null}
      <Container>
        <div className="container">
        <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
          <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`

  
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: '#080420';
  .container {
    height: 85vh;
    width: 99vw;
    background-color: #080420;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
    @media screen and (min-width: 390px) and (max-width: 720px) {
      grid-template-columns:40% 60%;
    }
  }
`;

