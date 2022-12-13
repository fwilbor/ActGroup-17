import React, { useState } from "react";
// import { useMessagesContext } from "../hooks/useMessagesContext"
// import { useAuthContext } from '../hooks/useAuthContext'
//import { useNavigate } from "react-router-dom";
import { addFriend } from "../utils/APIRoutes";
import axios from "axios";

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

  //   const user_data = await JSON.parse(
  //     localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  //   );
  //   const user_username = user_data.username
  //     const data = await axios.get(`${addFriend}/${user_username}`);
  //     console.log(data)

    const user_data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    const friend_array = user_data.friends
    //const current_user = user_data.username

  
        
    // eslint-disable-next-line
    const username = user
    const newFriend = ({addFriend},(req,res)=> {
      // if(err){
      //   console.log(err)
      // } else{
      const new_friend = friend_array.push(username);
      console.log(new_friend)
      //new_friend
             //.save()
             //.then(()=>console.log("successful friend upload????"))
             //.catch((err) => console.log(err));
      //}
          
    })
    newFriend();
    

    //console.log(username)

    const { data } = await axios.patch(`${addFriend}/${user_data._id}`, {
      friends: username
    });
    console.log(data)
   
 
    if (data.status === false) {
      console.log("Error making friend account")
    }
    if (data.status === true) {

      //friend_array.push(current_user)
      console.log("You might have added a friend")


      
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
            value={user}
            onChange={(e) => handleChange(e)}
            min="3"
          />

      <button>Add Friend</button>
      
    </form>
  )

}

export default FriendForm