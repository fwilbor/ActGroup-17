// fetching data from back-end api to front-end using useEffect()
import { useEffect } from "react"

// importing useContext to keep global state of Messages
import { useMessagesContext } from "../hooks/useMessagesContext"

import { useAuthContext } from "../hooks/useAuthContext"

// components
import MessageDetails from "../components/MessageDetails"
import MessageForm from "../components/MessageForm"
import WebcamCapture from "../components/WebcamCapture"

const Home = () => {

    const {messages, dispatch} = useMessagesContext()
    const {user} = useAuthContext()


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
        <div className="home">
           <div className="messages">
            
            {messages && messages.map((message)=> (
               <MessageDetails key={message._id} message = {message} />
            ))}

           </div>
           <MessageForm />
           <div>
            <WebcamCapture />
           </div>
        </div>
        


    )
}

export default Home