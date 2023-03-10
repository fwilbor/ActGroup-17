import React, { useState } from "react";
import styled from "styled-components";
// import { useMessagesContext } from "../hooks/useMessagesContext"
// import { useAuthContext } from '../hooks/useAuthContext'
//import { useNavigate } from "react-router-dom";
import { addFriend } from "../utils/APIRoutes";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const toastOptions = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};
const setError = (error) => {
  toast.error(error, toastOptions);
};

const FriendForm = () => {
    // const { dispatch } = useMessagesContext()
    // const { user } = useAuthContext();
  
    const [user, setUser] = useState('')
    // const [message, setMessage] = useState('')
    // const [creator, setCreator] = useState('')
    // const [sendTo, setsendTo] = useState('')
    //const [error, setError] = useState(null)

    //const navigate = useNavigate();

  // const [values, setValues] = useState({
  //   username: "",
  // });

  const handleChange = (event) => {
    //setValues({ ...values, [event.target.name]: event.target.value });
    setUser(event.target.value)
  };

  //  useEffect(() => {
  //   const fetchData=async()=>{
  //     const user_data = await JSON.parse(
  //       localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  //     );
  //     const current_user = user_data.username
  //     console.log(current_user)

  // }
  // fetchData();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user_data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    const friend_array = user_data.friends
    const username = user

    try {
      const { data } = await axios.patch(`${addFriend}/${user_data._id}`, {
        username
      });
      if (data.error) {
        setError(data.error, toastOptions);
      } else {
        const new_friend = friend_array.push(username);
        toast.success("You have added a friend!", toastOptions);
      }
    } catch (err) {
      console.error(err);
      setError("Error adding friend. Please try again later.", toastOptions);
    }
  };

  return (
    <FormContainer>
    <form className="brand" onSubmit={handleSubmit}> 
      <h3>Add Friend</h3>

      <input
            type="text"
            value={user}
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
    padding: 5rem;
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

export default FriendForm