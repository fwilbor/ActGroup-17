import React, { useState } from "react";
// import { useMessagesContext } from "../hooks/useMessagesContext"
// import { useAuthContext } from '../hooks/useAuthContext'
//import { useNavigate } from "react-router-dom";
import { addFriend } from "../utils/APIRoutes";
import axios from "axios";

const FriendForm = () => {
    // const { dispatch } = useMessagesContext()
    // const { user } = useAuthContext();
  
    // const [email, setEmail] = useState('')
    // const [message, setMessage] = useState('')
    // const [creator, setCreator] = useState('')
    // const [sendTo, setsendTo] = useState('')
    //const [error, setError] = useState(null)

    //const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user_data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    const friend_array = user_data.friends
    const current_user = user_data.username
    console.log(current_user)
  
        
    // eslint-disable-next-line
    const {username} = values

    const { data } = await axios.post(addFriend, {
      username,
    });
    console.log(data)
   
 
    if (data.status === false) {
      console.log("Error making friend account")
    }
    if (data.status === true) {

      friend_array.push(username)


      
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
      <h3>Add Friend</h3>

      <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />

      <button>Add Friend</button>
      
    </form>
  )

}

export default FriendForm