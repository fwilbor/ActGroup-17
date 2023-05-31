import React, { useState, useEffect } from "react";
//import { deleteAfter } from "src/utils/APIRoutes";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from 'emoji-picker-react';
import WebcamCapture from "./WebcamCapture";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [deleteAfter, setDeleteAfter] = useState(30); // set the initial value of deleteAfter to "30"
  const [capturedImage, setCapturedImage] = useState("");
  const [showWebcamCapture, setShowWebcamCapture] = useState(false);
  
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  // const handleEmojiClick = (event, emojiObject) => {
  //   let message = msg;
  //   message += emojiObject.emoji;
  //   setMsg(message);
  // };

  const handleEmojiClick = (event, emojiObject) => {
      //console.log(emojiObject.emoji)
      let message = msg;
      message += emojiObject.emoji;
      setMsg(message);

  };

  const toggleWebcamCapture = () => {
    setShowWebcamCapture(!showWebcamCapture);
  };

  const handleCaptureImage = async (imageData) => {
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        setCapturedImage(`data:image/png;base64,${base64String}`);
      };
      reader.readAsDataURL(new Blob([imageData]));
    } catch (error) {
      console.error('Error in handleCaptureImage:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  const handleDeleteAfterChange = (event) => {
    setDeleteAfter(event.target.value); // Update the deleteAfter state variable when the selected option changes
  };

  const sendChat = (event) => {
    event.preventDefault();
    try {
      if (msg.length > 0 || capturedImage) {
        if (capturedImage !== "") {
          console.log('capturedImage:', capturedImage, 'message:', msg, 'deleteAfter:', deleteAfter);
          handleSendMsg(msg, deleteAfter, capturedImage);
        } else {
          console.log('capturedImage:', capturedImage, 'message:', msg, 'deleteAfter:', deleteAfter);
          handleSendMsg(msg, deleteAfter);
        }
        setMsg("");
        setCapturedImage("");
      }
    } catch (error) {
      console.error('Error in sendChat:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

 return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          { showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} /> }
        </div>
      </div>
      
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="Type your message here..."
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="button" onClick={toggleWebcamCapture}>Open Webcam</button>
        <select
          value={deleteAfter} // Set the value of the select element to the deleteAfter state variable
          onChange={handleDeleteAfterChange} // Call handleDeleteAfterChange when the selected option changes
        >
          <option value={7}>Delete after 7 days</option>
          <option value={14}>Delete after 14 days</option>
          <option value={30}>Delete after 30 days</option>
        </select>
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
      {showWebcamCapture && (
        <div className="webcam-capture-container">
        <WebcamCapture onCapture={handleCaptureImage} />
      </div>
      )}
      
      {capturedImage && (
        <div className="captured-image">
          <img src={capturedImage} alt="Captured" />
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
    .input-container{
      width:35%
    }
  }
  @media screen and (min-width: 390px) and (max-width: 720px) {
    gap:1rem;
    padding:0;
    width:100%;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
        margin:0.2rem;
      }
      .emoji-picker-react {
        position: absolute;
        height={350}
        overflow-y: auto;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
          color: white;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .webcam-capture-container video {
    max-width: 100%;
    max-height: 100%;
  }
  .webcam-capture-container {
    position: absolute;
    top: 50px; /* Adjust the top position as needed */
    width: 700px;
    height: 500px;
    background-color: white;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      margin:0.2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      margin-right: 10px;
      padding-right: 25px;
      @media screen and (min-width: 390px) and (max-width: 720px) {
        width:100%;
        padding-left:0.1rem;
        
      }
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
          
        }
      }  
      svg {
        font-size: 2rem;
        color: white;
      }
      @media screen and (min-width: 390px) and (max-width: 720px) {
        
        svg {
          font-size:1rem;
          
        }
        
      }
    }
  }
`;
