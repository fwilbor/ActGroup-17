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

const MessageDetails = ({message}) => {
    return (
        <div className="message-details">
            <h4> {message.title} </h4>
            <p><strong>Message: </strong>{message.message}</p>
            <p><strong>Creator: </strong>{message.creator}</p>
            <p><strong>Flag: </strong>{SwearWordCheck(message.message)}</p>
            <p>{message.createdAt}</p>
        </div>
    )
}

//export {MessageDetails,SwearWordCheck}
export default MessageDetails
