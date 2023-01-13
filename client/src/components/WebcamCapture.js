//no longer needed but we'll keep for clarity
import React, {useRef,useEffect, useState} from 'react';
//import { fileAccepted } from 'react-papaparse/dist/utils';
import { addImage } from 'src/utils/APIRoutes';
import axios from "axios";
import { Buffer } from "buffer";







function WebcamCapture() {
    
    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const [hasPhoto, setHasPhoto] = useState(false);
    var [image, setImage] = useState([]);
 
    const getVideo = () => {
        navigator.mediaDevices.getUserMedia({video: {width: 1920, height: 1080}})
        .then(stream => {
            let video = videoRef.current;
            video.srcObject = stream;
            var playPromise =video.play();

            if (playPromise !== undefined) {
                playPromise.then(_=>{

                })
                 .catch(error => {
            console.log(error);
        })
            }
        })
       
    }

    const takePhoto = async () => {
        const width = 200;
        const height = width / (16/9);

        let video = videoRef.current;
        let photo = photoRef.current;
        var canvas = document.getElementById('canvas');

        canvas.width = 250;
        canvas.height = canvas.width / (16/9)
        //console.log(photo)

        photo.width = width;
        photo.height = height;

        canvas.getContext('2d').drawImage(video, 0, 0, width, height);
        document.getElementById("printresult").innerHTML = canvas.toDataURL().split(';base64,')[1];

        //const buffer = Buffer.from(canvas.toDataURL().split(';base64,')[1]);
        //const base64String = buffer.toString('base64');
        let ctx = photo.getContext("2d");
        //console.log(ctx)
        ctx.drawImage(video, 0, 0, width, height);
        //console.log(ctx)
        setHasPhoto(true);

        image = canvas.toDataURL();
    const split = image.split(',');
    const base64string = split[1];
    const buffer = Buffer.from(base64string, 'base64');

           
        // image = canvas.toDataURL()
        // const buffer = Buffer.from(image);

        if (buffer) {
            setImage = buffer;

        }

        const bodyFormData = new FormData();
        bodyFormData.append('image', JSON.stringify(setImage));
        console.log(typeof(bodyFormData))
        const { data } = await axios.post(`${addImage}`, bodyFormData, {
            
                headers: {
                  'accept': 'application/json',
                  'Accept-Language': 'en-US,en;q=0.8',
                  'Content-Type': 'image/png',
                },
            
            });
            //console.log(bodyFormData)
            console.log(data)

          
         
       
          if (data.status === false) {
            console.log("Error posting image to database")
          }
          if (data.status === true) {
      
            //friend_array.push(current_user)
            console.log("Image in database")
            console.log(data)
                 
          }
       
    }

    const closePhoto = () => {
        let photo = photoRef.current;
        let ctx = photo.getContext("2d");
        ctx.clearRect(0, 0, photo.width, photo.height);
        setHasPhoto(false);
    }

    useEffect(()=> {
        getVideo();
    }, [videoRef])

  return (
    <div className='WebcamCapture'>
        <div className='camera'>
    <video ref={videoRef}></video>
    <button onClick={takePhoto}>SNAP!</button><br></br>

    <canvas id="canvas"></canvas>
    <p> Image Converted to String: </p>
    <p id="printresult"></p>
    
   
    </div>
        <div className={"result " + (hasPhoto ? "hasPhoto" : "")}>
            <canvas ref={photoRef}></canvas>
            <button onClick={closePhoto}>CLOSE</button>
        </div>
    </div>
  );
}

export default WebcamCapture