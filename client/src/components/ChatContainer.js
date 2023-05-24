import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import SwearWordCheck from "../components/SwearWordCheck.js"

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const getCurrentChat = async () => {
    return new Promise((resolve) => {
      const localStorageData = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
      if (!localStorageData) {
        console.log('localStorageData is null or undefined');
        resolve(null);
        return;
      }
  
      const data = JSON.parse(localStorageData);
      if (!data || !data._id) {
        console.log('data or data._id is null or undefined');
        resolve(null);
        return;
      }
  
      console.log('getCurrentChatId resolved:', data._id);
      resolve(data._id);
    });
  };
  
  
  useEffect(() => {
    getCurrentChat().then((chatId) => {
      console.log("chatId:", chatId);
    });
  }, [currentChat]);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentChat || !currentChat.username) {
        console.log('currentChat or currentChat.username is undefined');
        return;
      }
  
      const currentChatId = await getCurrentChat(); // Await the result of getCurrentChatId
  
      try {
        const response = await axios.post(recieveMessageRoute, {
          from: currentChatId, // Use currentChatId instead of data.username
          to: currentChat.username,
        });
        setMessages(response.data);
        console.log(currentChat.username);
      } catch (error) {
        console.log('Error occurred during API call:', error);
        console.log('Error code 402:', error.message);
      }
    };
  
    fetchData();
  }, [currentChat]);

  console.log('currentChat:', currentChat);
  console.log('currentChat.username:', currentChat.username);
 
  const handleSendMsg = async (msg, deleteAfter, capturedImage) => {
    console.log("Message:", msg);
  console.log("Delete after:", deleteAfter);
  console.log("Captured image:", capturedImage);

    if (!currentChat || !currentChat.username) {
      console.log('currentChat or currentChat.username is undefined');
      return;
    }    
    // if (!currentChat) {
    //   console.log('Proof that this is not working 129469237', currentChat)
    //   return; // Return early if currentChat is undefined
    // }

    const localStorageData = localStorage.getItem(
      process.env.REACT_APP_LOCALHOST_KEY
    );
    console.log('localStorageData:', localStorageData); // Add this line
    if (!localStorageData) {
      console.log('localStorageData is null or undefined');
      return;
    }
  
    const data = JSON.parse(localStorageData);
    console.log('data:', data);
    if (!data || !data._id) {
      console.log('data or data._id is null or undefined');
      return;
    }
    if (!currentChat.username) {
      console.log('currentChat username is undefined:', currentChat);
      return; // Return early if currentChat.username is undefined
    }
    

    const messageData = {
      text: msg,
      images: capturedImage ? [capturedImage] : [],
    };

    socket.current.emit("send-msg", {
      to: currentChat.username,
      from: data.username,
      msg: messageData,
      deleteAfter
    });
    try {
      console.log('currentChat:', currentChat);
  console.log('currentChat.username:', currentChat.username);
  console.log('data:', data);
  console.log('data._id:', data._id); // Add this line
      await axios.post(sendMessageRoute, {
        from: data.username,
        to: currentChat.username,
        message: messageData,
        deleteAfter: deleteAfter
      });
      console.log('axios.post request successful');
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.log('Response status:', error.response.status);
        console.log('Response data:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error occurred during request setup:', error.message);
      }
    }

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: messageData });
    setMessages(msgs);
  };

  //different then template
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [messages]);

  //put swearwordcheck in message.message
  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>

      </div>

      <div className="chat-messages" style={{ height: "78%" }}>
        {messages.map((message) => {
          const flag = SwearWordCheck(message.message.text)
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                {message.message.text && (
            <p style={flag === "Yes" ? { background: '#f06f6f', border: '1px solid red'} : {}}>
              {message.message.text}
            </p>
          )}
          {message.message.images &&
            message.message.images.map((image, index) => (
              <div className="image" key={index}>
                <img src={image} alt="Image" />
              </div>
            ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
      
    </Container>
  );
}

const Container = styled.div`
  backgroundColor: '#FFDB58',
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    background-color: LightSeaGreen;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      .bg {
        position: relative;
      }
      display: flex;
      align-items: center;
      .content {
        @media screen and (min-width: 390px) and (max-width: 720px) {
          max-width: 80%;
        }
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
