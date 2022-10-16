// fetching data from back-end api to front-end using useEffect()
import { useEffect, useState} from "react"

// components
import MessageDetails from "../components/MessageDetails"
import MessageForm from "../components/MessageForm"
import { readString } from 'react-papaparse';
import SwearWordsListCSV from '../components/SwearWordsList.csv';

const Home = () => {
  
  const papaConfig = {
    complete: (results, file) => {
      console.log('Parsing complete:', results, file);
    },
    download: true,
    error: (error, file) => {
      console.log('Error while parsing:', error, file);
    },
  };
  //const Wlists = readString(SwearWordsListCSV, papaConfig);


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



//export {Home, Wlists}
export default Home
