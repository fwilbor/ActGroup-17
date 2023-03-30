import React, { useState, useEffect } from "react";
// import { useMessagesContext } from "../hooks/useMessagesContext"
// import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator"
import { getAllChildren, registerChild, checkIfUsernameExists } from "../utils/APIRoutes";
import axios from "axios";

const MessageForm = () => {
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
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/dashboard/app");
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
        const { username, password } = values;
        
        const { data } = await axios.post(registerChild, {
          username,
          password,
          parentLink,
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
    <div>
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
    </div>
  );

};

export default MessageForm