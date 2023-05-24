import React, { useState } from "react";
import styled from "styled-components";
import { addFriend } from "../utils/APIRoutes";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
function FriendForm() {

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [username, setUsername] = useState("");

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

  return (
    <FormContainer>
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

        <button>Add Friend</button>

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
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default FriendForm