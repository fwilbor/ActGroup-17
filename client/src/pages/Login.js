import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute, checkIfUsernameExists, checkIfPasswordMatch, deleteMessage } from "../utils/APIRoutes";


export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "top-center",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm  = async () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Username and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Username and Password is required.", toastOptions);
      return false;
    }
    // check if username exists
    try {
      const usernameResponse = await fetch (`${checkIfUsernameExists.replace(':username', username)}`);
      //const usernameResponse = await axios.get(`${checkIfUsernameExists}/${username}`);
      console.log("usernameResponse:", usernameResponse);
      const usernameExists = (await usernameResponse.json());
      console.log("usernameExists:", usernameExists);
      
      
      //console.log("usernameExists:", usernameExists);
      if (usernameExists === false) {
        throw new Error("Invalid Username");
      }
    } catch (error) {
      if (error.message === "Invalid Username") {
        toast.error("Invalid Username", toastOptions);        
      }
      return false;      
    }

    // check if password match
    try {
      console.log(username)
      const passwordResponse = await fetch (`${checkIfPasswordMatch.replace(':username', username).replace(':password', password)}`);
      console.log("passwordResponse:", passwordResponse);
      const passwordMatch = (await passwordResponse.json());
      console.log("passwordMatch:", passwordMatch);
      

      if (passwordMatch === false) {
        throw new Error("Invalid Password");
      }
    } catch (error) {
      if (error.message === "Invalid Password") {
        toast.error("Invalid Password", toastOptions);
        
      }
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );

        await axios.delete(deleteMessage, {
          params: {
            user_name: data.user.username,
          },
        })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });

        let parent_or_child = await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        ).parentLink;
        console.log(parent_or_child)

        if (parent_or_child === undefined) {
          navigate("/dashboard/app");
        } else {
          navigate("/chat");
          // let currentTimestamp = Date.now()
          // console.log(currentTimestamp); // get current timestamp
          // let login_date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(currentTimestamp)
          // console.log(login_date)
        }

        
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
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/signup">Create One.</Link>
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
      color: #080420;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
