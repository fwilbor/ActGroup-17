import { useMessagesContext } from "../hooks/useMessagesContext"

// using date-fns
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const MessageDetails = ({message}) => {

    const { dispatch } = useMessagesContext()

    const handleClick = async () => {

        const response = await fetch("api/messages/" + message._id, {
            method: "DELETE"

        })
        const json = await response.json()

            if (response.ok) {
                dispatch({type: "DELETE_MESSAGE", payload: json})
            }
        

    }



    return (
        <div className="message-details">
            <h4> {message.title} </h4>
            <p><strong>Message: </strong>{message.message}</p>
            <p><strong>Creator: </strong>{message.creator}</p>
            <p>{formatDistanceToNow(new Date(message.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>

        </div>
    )
}

export default MessageDetails