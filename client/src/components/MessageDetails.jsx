//import { Wlists } from "../pages/Home";
function SwearWordCheck(msg){
    const wlists = ['testx', 'Textx', 'xxx', 'Adult'];
    
    for (const wlist of wlists) {
        //console.log(wlist);
        //if (msg.toLowerCase().indexOf(wlist.toLowerCase()) !== -1) {
        if (msg.toLowerCase().includes(wlist.toLowerCase())) {
          return "Yes";
         }     
    }
    return "No";       
    //msg.length;
}
import { useMessagesContext } from "../hooks/useMessagesContext"
import { useAuthContext } from "../hooks/useAuthContext"

// using date-fns
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const MessageDetails = ({message}) => {

    const { dispatch } = useMessagesContext()
    const { user } = useAuthContext()
    
    const handleClick = async () => {
        if (!user) {
            return
        }
        const response = await fetch("api/messages/" + message._id, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${user.token}`
            }

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
            <p><strong>Flag: </strong>{SwearWordCheck(message.message)}</p>

            <p>{message.createdAt}</p>

            <p>{formatDistanceToNow(new Date(message.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>

        </div>
    )
}

//export {MessageDetails,SwearWordCheck}
export default MessageDetails
