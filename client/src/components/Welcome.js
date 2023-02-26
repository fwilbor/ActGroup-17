import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
import Logout from "./Logout";

export default function Welcome() {
  const [userName, setUserName] = useState([]);
  
  useEffect(() => {
    const fetchData=async()=>{
      setUserName(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        ).username
      );
      
      
      //const user = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
      
    }
    fetchData();
    
  }, []);
  
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to start messaging. Or click <a href="/addfriend">here</a> to add friends</h3>
      <h3 style={{display: "inline-block", margin: 0}}>Log out<Logout/></h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
