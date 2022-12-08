// fetching data from back-end api to front-end using useEffect()
import React, { useEffect } from "react"

// importing useContext to keep global state of Messages
import { useMessagesContext } from "../hooks/useMessagesContext"

import { useAuthContext } from "../hooks/useAuthContext"

// components
import MessageDetails from "../components/MessageDetails"
import MessageForm from "../components/MessageForm"
// import WebcamCapture from "../components/WebcamCapture"
//import { useNavigate } from "react-router-dom";


const Home = () => {
  
    const {messages, dispatch} = useMessagesContext()
    const {user} = useAuthContext()
    //const [currentUser, setCurrentUser] = useState(undefined);
    //const navigate = useNavigate();

//     useEffect(() => {
//     const fetchData=async()=>{
//         if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
//           navigate("/login");
//         } else {
//           setCurrentUser(
//             await JSON.parse(
//               localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
//             )
//           );
//         }
//       }
//       fetchData();
//   }, [navigate]);

  
    // useEffect hook only fires once and returns object 
    useEffect(() => {
        const fetchMessages = async () => {
            const response = await fetch("/api/messages", {
                
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type:"SET_MESSAGES", payload: json})

            }
        }

        if (user) {
            fetchMessages()
        } 
    }, [dispatch, user])
    
    return (

        <>
        <div className="home">
           <div className="messages">
           
            {messages && messages.map((message)=> (
               <MessageDetails key={message._id} message = {message} />
            ))}

           </div>
           {/* <WebcamCapture /> */}
           <MessageForm />
          

        
        </div>
        </>
        


    )
}



//export {Home, Wlists}
export default Home
