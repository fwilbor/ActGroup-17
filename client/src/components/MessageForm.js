import { useState } from 'react'

const MessageForm = () => {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [creator, setCreator] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // eslint-disable-next-line
    var message = {title, message, creator}
    
    const response = await fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setError(null)
      setTitle('')
      setMessage('')
      setCreator('')
      console.log('new message added:', json)
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Message</h3>

      <label>Title: </label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
      />

      <label>Message: </label>
      <input 
        type="text" 
        onChange={(e) => setMessage(e.target.value)} 
        value={message}
      />

      <label>Creator: </label>
      <input 
        type="text" 
        onChange={(e) => setCreator(e.target.value)} 
        value={creator} 
      />

      <button>Add Message</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default MessageForm