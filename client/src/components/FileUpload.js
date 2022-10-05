import { useState } from "react"
const FileUpload = () => {
    const [title, setTitle] = useState("") 
    const [message, setMessage] = useState("") 
    const [creator, setCreator] = useState("")
    const [error, setError] = useState(null) 
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        // eslint-disable-next-line
        var images = {image_name, testImage}

        const response = await fetch("/api/uploads", {
            method: "GET",
            body: JSON.stringify(images),
            headers: {
                "Content-Type": "application/json"
            }



        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setTitle("")
            setMessage("")
            setCreator("")
            setError(null)
            console.log("new message added", json)
        }



    }
    
    
    
    
    
    
    return (
       <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Message</h3>

<label>Message Creator: </label>
        <input
        type="text"
        onChange={(e) => setCreator(e.target.value)}
        value={creator}
        required
        />

        <button>Add Message</button>
        {error && <div className="error">{error}</div>}
        </form>
    )}