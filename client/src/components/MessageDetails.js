const MessageDetails = ({message}) => {
    return (
        <div className="=message-details">
            <h4> {message.title} </h4>
            <p><strong>Message: </strong>{message.message}</p>
            <p><strong>Creator: </strong>{message.creator}</p>
            <p>{message.createdAt}</p>
        </div>
    )
}

export default MessageDetails