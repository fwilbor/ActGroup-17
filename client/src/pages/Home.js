// fetching data from back-end api to front-end using useEffect()
import { useEffect } from "react"

// importing useContext to keep global state of Messages
import { useMessagesContext } from "../hooks/useMessagesContext"

// components
import MessageDetails from "../components/MessageDetails"
import MessageForm from "../components/MessageForm"

const Home = () => {

    const {messages, dispatch} = useMessagesContext()


    // useEffect hook only fires once and returns object 
    useEffect(() => {
        const fetchMessages = async () => {
            const response = await fetch("/api/messages")
            const json = await response.json()

            if (response.ok) {
                dispatch({type:"SET_MESSAGES", payload: json})

            }
        }

        fetchMessages()

    }, [dispatch])
    
    return (
        <div className="home">
           <div className="messages">
            
            {messages && messages.map((message)=> (
               <MessageDetails key={message._id} message = {message} />
            ))}

           </div>
           <MessageForm />
        </div>


    )
}

export default Home