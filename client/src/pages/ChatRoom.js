import { Helmet } from 'react-helmet-async';
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { getAllFriends, host, logoutRoute, getUserInfo } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import Header from '../layouts/dashboard/header';
import Nav from '../layouts/dashboard/nav'
import Logo from '../components/logo';
import { Box } from '@mui/material';
import LogoutListener from "../components/LogoutListener"
import { ToastContainer, toast } from "react-toastify";

export default function ChatPage() {
  return <Chat />;
}

function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  //const timeLimitRef = useRef(null);
  const [showTimeRemainingToast, setShowTimeRemainingToast] = useState(false);
  const [signInTime, setSignInTime] = useState(null); // new state variable for sign-in time
  const timerIdRef = useRef(null);
  const [open, setOpen] = useState(false);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/login");
      } else {
        const user = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
        console.log("Current user:", user);
      if (!user || !user._id) {
        console.log("User or user._id is undefined:", user);
        return; // Return early if user or user._id is undefined
      }
        
        try {
          const response = await fetch(`${getUserInfo.replace(':id', user._id)}`);
          const data = await response.json();
          const updatedUser = data;
          console.log(updatedUser._id);
  
          if (updatedUser.timeLimit < user.timeLimit) {
            console.log('ran update')
            console.log(updatedUser.timeLimit);
            const userObj = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
            userObj.timeLimit = updatedUser.timeLimit;
            setCurrentUser(userObj);
            localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(userObj));
            setTimeRemaining(updatedUser.timeLimit);
            console.log(timeRemaining)
          } else {
            console.log('no update')
            setCurrentUser(user);
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining === null ? user.timeLimit : prevTimeRemaining);
          }
        } catch (error) {
          console.error("Error in fetchData:", error);
        }
      }
    };
  
    fetchData().catch(error => {
      console.error("Error in fetchData:", error);
    });
  }, [navigate]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const user = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
  // // Retrieve the updated user object from the server
  // const response = await fetch(`${getUserInfo.replace(':id', user._id)}`);
  // const data = await response.json();
  // console.log(data);
  // const updatedUser = data;
  // console.log(updatedUser.timeLimit); // Log the updated timeLimit value
  //   };
  //   fetchData();
  // }, [navigate]);
 
  // useEffect(() => {
  //   // listen for changes to localStorage
  //   const handleStorageChange = (event) => {
  //     console.log('localStorage changed!');
  //     if (event.key === process.env.REACT_APP_LOCALHOST_KEY) {
  //       const user = JSON.parse(event.newValue);
  //       console.log(`Current user time limit: ${user.timeLimit}`);
  //       setCurrentUser(user);
  //       timeLimitRef.current = user.timeLimit;
  //       setTimeRemaining(user.timeLimit);
  //     }
  //   };

  //   window.addEventListener('storage', handleStorageChange);

  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //   };
  // }, []);

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
    };
    fetchData();
  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
    navigate("/chat");
  };

  const handleBeforeUnload = async (event, timerId) => {
    const logout_user = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );

    if (!logout_user._id) {
      return;
    }

    if (socket.current) {
      socket.current.disconnect();
    }

    try {
      if (typeof timeRemaining === 'number') { // check if timeRemaining is a number
        console.log(timeRemaining)
        await axios.get(`${logoutRoute}/${logout_user._id}?timeLimit=${timeRemaining}`);
        sessionStorage.setItem("logout", "true");
        navigate("/login");
        window.location.reload();
        return (
          <>
            <LogoutListener timerIdRef={timerIdRef} />
          </>
        );
      } else {
        console.error('timeRemaining is not a number'); // log an error message to the console
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  // useEffect(() => {
  //   console.log("Adding event listener for beforeunload");
  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     console.log("Removing event listener for beforeunload");
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  useEffect(() => {
    if (timeRemaining !== null) {
      const timer = setInterval(() => {
        setTimeRemaining((time) => time - 1000);
        setSignInTime((time) => time + 1000); // update sign-in time
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeRemaining]);

  useEffect(() => {
    if (currentUser) {
      if (timeRemaining === 0) {
        toast.info(`Your time limit has expired. Please logout.`);
        handleBeforeUnload();
      } else if (timeRemaining === Math.floor(currentUser.timeLimit / 2) + 500) {
        toast.info(`You have used half of your time. (${Math.floor(timeRemaining / 60000)} minutes ${Math.floor((timeRemaining % 60000) / 1000)} seconds left)`);
      } else if (timeRemaining === 120000) {
        toast.info(`You have 2 minutes left.`);
      } else if (timeRemaining > 0 && !showTimeRemainingToast) {
        setShowTimeRemainingToast(true);
        console.log(Math.floor(currentUser.timeLimit / 2))
        const minutes = Math.floor(currentUser.timeLimit / 60000);
        const seconds = Math.floor((currentUser.timeLimit % 60000) / 1000);
        toast.info(`You have (${minutes} minutes ${seconds} seconds left)`);
      }
    }
  }, [timeRemaining, currentUser, showTimeRemainingToast]);

  // useEffect(() => {
  //   // listen for changes to localStorage
  //   const handleStorageChange = (event) => {
  //     console.log('localStorage changed!');
  //     if (event.key === process.env.REACT_APP_LOCALHOST_KEY) {
  //       const user = JSON.parse(event.newValue);
  //       console.log(`Current user time limit: ${user.timeLimit}`);
  //       setCurrentUser(user);
  //       timeLimitRef.current = user.timeLimit;
  //       setTimeRemaining(user.timeLimit);
  //     }
  //   };

  //   window.addEventListener('storage', handleStorageChange);

  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //   };
  // }, []);

  return (
    <>
      <LogoutListener timeoutInMinutes={1} />
      <ToastContainer />
      <Helmet>
        <title> Chat Room | KidzSnap.com </title>
      </Helmet>
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>
      {currentUser && currentUser.parentLink === undefined ? (
      <>
        <Header onOpenNav={() => setOpen(true)} />
        <Nav openNav={open} onCloseNav={() => setOpen(false)} />
      </>
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

