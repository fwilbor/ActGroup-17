//import Buffer from "buffer/"
import { Buffer } from "buffer";
import { useEffect, useState} from "react"

//const [data, setData] = useState([]);

// useEffect(() => {
//     const fetchImages = async () => {
//         const response = await fetch("/api/uploads")
//         const json = await response.json()

//         if (response.ok) {
             //setMessages(json)
//             response.json()

//         }
//     }

//     fetchImages()

// }, [])



function FileUpload() {

    // const [title, setTitle] = useEffect("") 
    // const [message, setMessage] = useEffect("") 
    // const [creator, setCreator] = useEffect("")
    // const [error, setError] = useEffect(null)
    
    const [data, setData] = useState([]);

useEffect(() => {
    const fetchImages = async () => {
        const response = await fetch("/api/uploads")
        const json = await response.json()

        if (response.ok) {
            setData(json)
            
            

        }
    }

    fetchImages()

}, [])

return (
    <div className="FileUpload">
      <h1>Image uploading react</h1>
      {data.map((singleData) => {
        const uniqueKey = singleData._id
        const data = singleData.image.data.data
        console.log(singleData.image.data.data)
        //const base64String = Buffer.from(String.fromCharCode(...new Uint8Array(singleData.image.data.data)).toString('base64')
        const buffer = Buffer.from(data);
        const base64String = buffer.toString('base64');
                  
        //);
        console.log(base64String)
        //console.log(uniqueKey)
        return <img key = {uniqueKey} src={`data:image/png base64,${base64String}`} alt="" height={300} width={500}/>
        //return <img src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600"></img>
      })}
    </div>
  );
    
//     const handleSubmit = async (e) => {
//         e.preventDefault()

//         // eslint-disable-next-line
//         var images = {image_name, testImage}

//         const response = await fetch("/api/uploads", {
//             method: "GET",
//             body: JSON.stringify(images),
//             headers: {
//                 "Content-Type": "application/json"
//             }



//         })

//         const json = await response.json()

//         if (!response.ok) {
//             setError(json.error)
//         }

//         if (response.ok) {
//             setTitle("")
//             setMessage("")
//             setCreator("")
//             setError(null)
//             console.log("new message added", json)
//         }



//     }
    
    
    
    
    
    
//     return (
//        <form className="create" onSubmit={handleSubmit}>
//         <h3>Add a New Message</h3>

// <label>Message Creator: </label>
//         <input
//         type="text"
//         onChange={(e) => setCreator(e.target.value)}
//         value={creator}
//         required
//         />

//         <button>Add Message</button>
//         {error && <div className="error">{error}</div>}
//         </form>
//     )
}

    export default FileUpload