import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { addFriend } from "../utils/APIRoutes";
import axios from "axios";
import Header from '../layouts/dashboard/header'
import Nav from '../layouts/dashboard/nav'
import { ToastContainer, toast } from "react-toastify";


import { useNavigate } from "react-router-dom";

//import "react-toastify/dist/ReactToastify.css";
import validator from "validator"
import { getAllChildren, registerChild, checkIfUsernameExists } from "../utils/APIRoutes";


const CreateChildform = () => {
    // const { dispatch } = useMessagesContext()
    // const { user } = useAuthContext();
  
    // const [email, setEmail] = useState('')
    // const [message, setMessage] = useState('')
    // const [creator, setCreator] = useState('')
    // const [sendTo, setsendTo] = useState('')
    //const [error, setError] = useState(null)

    const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const toastOptions = {
    position: "top-center",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // useEffect and navigate are routing and re-rendering page (likely needs to be changed)
  useEffect(() => {
    let parent_or_child = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    ).parentLink;
    if (parent_or_child !== undefined) {
      navigate("/chat");
    }
  }, [navigate]);

    // get childs username and info to parent dashboard
  useEffect(() => {
    const fetchData=async()=>{
      const parent_data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      const parentLink = parent_data._id
        const data = await axios.get(`${getAllChildren}/${parentLink}`);
        const data_array = data.data
        const children = data_array.values();
        for (const name of children) {
          //console.log(name.username)
          //console.log(name.avatarImage)
          //console.log(name)
        }


  }
  fetchData();
  }, []);

  const validateForm  = async () => {
    const { username, password } = values;
    try {
      if (username.trim() === "") {
        toast.error("Username is required.", toastOptions);
        return false;
      } else if (password.trim() === "") {
        toast.error("Password is required.", toastOptions);
        return false;
      }
  
      // check if username exists
      const usernameResponse = await fetch(`${checkIfUsernameExists.replace(':username', username)}`);
      const exists = await usernameResponse.json();
      if (exists) {
        toast.error("Username already exists.", toastOptions);
        return false;
      }
  
      // check if password strong
      if (!validator.isStrongPassword(password)) {
        toast.error("Password is not strong enough.", toastOptions);
        return false;
      }
  
      return true;
    } catch (error) {
      toast.error("Something went wrong.", toastOptions);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formValid = await validateForm();
    if (formValid) {
        const parent_data = await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );
        const parentLink = parent_data._id;
        const timeLimit = 150000
        const dailyTimeLimit = 150000
        const { username, password } = values;
        
        const { data } = await axios.post(registerChild, {
          username,
          password,
          parentLink,
          timeLimit,
          dailyTimeLimit: Number(dailyTimeLimit),
        });
        console.log(data.status)
        if (data.status === false) {
          throw new Error("Error making child account", toastOptions);
        }
        if (data.status === true) {
          toast.success("You have added a child!", toastOptions);
        }
      }
    } catch (error) {
      toast.error(error.message, toastOptions);
    }
  };

  return (
    <FormContainer>
            
    <ToastContainer />
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add Child</h3>

      <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />

      <button>Add child</button>
      
    </form>
    </FormContainer>
  );

};

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
    a {
      color: #080420;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
export default CreateChildform