// fetching data from back-end api to front-end using useEffect()
import { useEffect, useState} from "react"

// components
import MessageDetails from "../components/MessageDetails"
import MessageForm from "../components/MessageForm"

const Home = () => {

    const [messages, setMessages] = useState(null)

    // useEffect hook only fires once and returns object 
    useEffect(() => {
        const fetchMessages = async () => {
            const response = await fetch("/api/messages")
            const json = await response.json()

            if (response.ok) {
                setMessages(json)

            }
        }

        fetchMessages()

    }, [messages])
    
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