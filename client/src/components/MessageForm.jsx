import { useState } from 'react'
import { useMessagesContext } from "../hooks/useMessagesContext"
import { useAuthContext } from '../hooks/useAuthContext'
const MessageForm = () => {
    const { dispatch } = useMessagesContext()
    const { user } = useAuthContext()
  
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [creator, setCreator] = useState('')
    const [sendTo, setsendTo] = useState('')
    const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
        setError("You must be logged in")
        return
    }
    
    // eslint-disable-next-line
    var messages = {email, message, creator, sendTo}
    
    const response = await fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify(messages),
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setError(null)
      setEmail('')
      setMessage('')
      setCreator('')
      setsendTo('')
      console.log('new message added:', json)
      dispatch({type: "CREATE_MESSAGE", payload: json })
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Message</h3>

      <label>Message: </label>
      <input 
        type="text" 
        onChange={(e) => setMessage(e.target.value)} 
        value={message}
        required
      />

      <label>To: </label>
      <input 
        type="text" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email}
        required 
      />

      <button>Send Message</button>
      {error && <div className="error">{error}</div>}
    </form>
  )

}

export default MessageForm