// import { useState } from "react"
// import { useSignup } from "../hooks/useSignup"

// const Signup = () => {
//     const [username, setUsername] = useState("")
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const [confirmPassword, setConfirmPassword] = useState("")
//     const {signup, error, isLoading} = useSignup()

//     const handleSubmit = async (e) => {
//         e.preventDefault()

//         await signup(username, email, password, confirmPassword)
//     }

//     return (
//         <form className="signup" onSubmit = {handleSubmit}>

//         <h3>Sign up</h3>

//         <label>Username:</label>
//         <input
//         type="text"
//         onChange={(e) => setUsername(e.target.value)}
//         value={username}
//         />
        
//         <label>Email:</label>
//         <input
//         type="email"
//         onChange={(e) => setEmail(e.target.value)}
//         value={email}
//         />

//         <label>Password:</label>
//         <input
//         type="password"
//         onChange={(e) => setPassword(e.target.value)}
//         value={password}
//         />

//         <label>Confirm Password:</label>
//         <input
//         type="password"
//         onChange={(e) => setConfirmPassword(e.target.value)}
//         value={password}
//         />

//         <button disabled={isLoading}>Sign up</button>
//         {error && <div className="error">{error}</div>}
//         </form>
//     )
// }

// export default Signup

import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute, checkIfEmailExists, checkIfUsernameExists } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "top-center",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/signup");
    }
  }, [navigate]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = async () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if(username.length > 10){
      toast.error(
        "Username should not more than 10 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    } //else if (!/^(?=.\d)(?=.[a-z])(?=.*[A-Z]).{6,20}$/.test(password)) {
      //toast.error("Password is not strong enough", toastOptions);
      //return false;
    //}
    
        // check if username exists
        try {
          const usernameResponse = await fetch (`${checkIfUsernameExists.replace(':username', username)}`);
          //const usernameResponse = await axios.get(`${checkIfUsernameExists}/${username}`);
          console.log("usernameResponse:", usernameResponse);
          const usernameExists = (await usernameResponse.json());
          console.log("usernameExists:", usernameExists);
          
          
          //console.log("usernameExists:", usernameExists);
          if (usernameExists === true) {
            throw new Error("Username already exists");
          }
        } catch (error) {
          if (error.message === "Username already exists") {
            toast.error("Username already exists", toastOptions);
            
          }
          return false;
        }
    
    // check if email exists
    try {
      const emailResponse = await fetch (`${checkIfEmailExists.replace(':email', email)}`);
          console.log("emailResponse:", emailResponse);
          const emailExists = (await emailResponse.json());
	        console.log("emailExists:", emailExists);
      if (emailExists === true) {
        throw new Error("Email already exists");
      }
    } catch (error) {
      if (error.message === "Email already exists") {
        toast.error("Email already exists", toastOptions);
      }
      return false;
    }
    

    
    return true;
    
    };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        console.log(data.status)
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/dashboard/app");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>KIDZSNAP</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
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
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
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
    background-color: #4e0eff;
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