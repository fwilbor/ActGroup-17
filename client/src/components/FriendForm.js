import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { addFriend, logoutRoute } from "../utils/APIRoutes";
import axios from "axios";
import Header from '../layouts/dashboard/header'
import Nav from '../layouts/dashboard/nav'
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ButtonContainer = styled.div`
display: flex;
gap: 1rem;
button {
  background-color: #080420;
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  &:hover {
    background-color: #4e0eff;
  }
}
`;

function FriendForm() {

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false);
  // Add a state for user login status
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

  const adult_or_child = JSON.parse(
    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user_data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    const friend_array = user_data.friends;

    try {
      const { data } = await axios.patch(`${addFriend}/${user_data._id}`, {
        username,
      });
      const { error } = data;
      if (error) {
        toast.error(error, toastOptions);
      } else {
        const new_friend = friend_array.push(username);
        toast.success("You have added a friend!", toastOptions);
      }
    } catch (err) {
      console.error(err);
      let error = "An error occurred";
      if (err.response && err.response.data && err.response.data.error) {
        error = err.response.data.error;
      }
      toast.error(error, toastOptions);
    }
  };

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleRefreshPage = () => {
    window.location.reload();
  }

  useEffect(() => {
    // Add event listener for beforeunload
    if (adult_or_child && adult_or_child.parentLink === undefined) {
      const handleBeforeUnload = (event) => {
        event.preventDefault();
        event.returnValue = "";
        handleLogout();
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [adult_or_child]);

  const handleLogout = async () => {
    const logout_user = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    // Might need a if statement to check user.isLogin
    // This code must clear startTimer do I need to call startTimer and if yes add if statement
    // to startTimer to return nothing. If startTimer doesn't need to be call then figure out why
    // setStartInactiveTimer(true); and clearTimeout(timerIdRef.current); doesn't clear old timer
    try {
      await axios.get(`${logoutRoute}/${logout_user._id}`);
      localStorage.removeItem(process.env.REACT_APP_LOCALHOST_KEY);
      setIsUserLoggedIn(false);      
      navigate("/login");
      window.location.reload();
  } catch (ex) {
    console.log(ex);
  }
   
  };

  return (
    <FormContainer>
      {adult_or_child && adult_or_child.parentLink === undefined ? (
      <>
        <Header onOpenNav={() => setOpen(true)} />
        <Nav openNav={open} onCloseNav={() => setOpen(false)} />
      </>
    ) : null}
      <ToastContainer />
      <form className="brand" onSubmit={handleSubmit}>
        <h3>Add Friend</h3>

        <input
          type="text"
          value={username}
          placeholder="Username"
          name="username"
          onChange={(e) => handleChange(e)}
          min="3"
        />
        <ButtonContainer>
        <button>Add Friend</button>
        <button onClick={handleRefreshPage}>Return to Main Page</button>
        </ButtonContainer>

      </form>
    </FormContainer>

  )

}

const FormContainer = styled.div`
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #FFF;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
      border-radius:20px;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #FFDB58;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #080420;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  
  span {
    a {
      color: #080420;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default FriendForm