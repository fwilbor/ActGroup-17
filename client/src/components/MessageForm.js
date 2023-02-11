import React, { useState, useEffect } from "react";
// import { useMessagesContext } from "../hooks/useMessagesContext"
// import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from "react-router-dom";
import { getAllChildren, registerChild } from "../utils/APIRoutes";
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
        //console.log(data.data[0].username)
        // let entries = Object.keys(data.data)
        // console.log(entries)
        const data_array = data.data
        const children = data_array.values();
        for (const name of children) {
          console.log(name.username)
          console.log(name.avatarImage)
        }


  }
  fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()

    const parent_data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    const parentLink = parent_data._id
        
    // eslint-disable-next-line
    const {username, password} = values
   
    const { data } = await axios.post(registerChild, {
      username,
      password,
      parentLink,
    });
    console.log(data)

    if (data.status === false) {
      console.log("Error making child account")
    }
    if (data.status === true) {
      // localStorage.setItem(
      //   process.env.REACT_APP_LOCALHOST_KEY,
      //   JSON.stringify(data.user)
      // );
      console.log("Child added")
    }

    
    
    // const { children_data } = await axios.post(getAllChildren, {
    //   username,
    //   avatarImage,
    //   _id,
    // });
    // console.log(children_data)



    // const json = await response.json()

    // if (!response.ok) {
    //   setError(json.error)
    // }
    // if (response.ok) {
    //   setError(null)
    //   setEmail('')
    //   setMessage('')
    //   setCreator('')
    //   setsendTo('')
    //   console.log('new message added:', json)
    //   dispatch({type: "CREATE_MESSAGE", payload: json })
    // }

  }

  return (
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
  )

}

export default MessageForm