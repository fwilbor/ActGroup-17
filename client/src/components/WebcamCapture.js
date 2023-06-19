//no longer needed but we'll keep for clarity
// import React, {useRef, useState} from 'react';
//import { fileAccepted } from 'react-papaparse/dist/utils';
// import Webcam from "react-webcam";
// import { addImage } from '../utils/APIRoutes';
// import axios from "axios";

// const WebcamCapture = () => {
//     const webcamRef = useRef(null);
//     const [imageSrc, setImageSrc] = useState(null);
  
//     const capture = () => {
//       const imageSrc = webcamRef.current.getScreenshot();
//       setImageSrc(imageSrc);
      
//       const saveImage = async (imageSrc) => {
//         try {
//         const binaryImage = Buffer.from(imageSrc.replace(/^data:image\/\w+;base64,/, ""), 'base64');
//         const response = await axios.post(addImage, { image: binaryImage });
//          console.log(response);
//         } catch (error) {
//         console.error(error);
//         }
//         };
//     };

//     return (
//         <div>
//           <Webcam
//             ref={webcamRef}
//           />
//           <button onClick={capture}>Capture photo</button>
//           {imageSrc && <img src={imageSrc} alt="Webcam capture" />}
//         </div>
//       );
//     };







// export default WebcamCapture


import React, {useRef,useEffect, useState} from 'react';
import { addImage } from 'src/utils/APIRoutes';
import axios from "axios";
import { Buffer } from "buffer";

function WebcamCapture({ onCapture }) {
    
    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const [hasPhoto, setHasPhoto] = useState(false);
    var [image, setImage] = useState([]);
    const [mediaStream, setMediaStream] = useState(null);
 
    const getVideo = () => {
        navigator.mediaDevices.getUserMedia({video: {width: 640, height: 480}})
        .then(stream => {
          setMediaStream(stream);
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
        var canvas = document.createElement('canvas');

        canvas.width = 250;
        canvas.height = canvas.width / (16/9)

        photo.width = width;
        photo.height = height;

        canvas.getContext('2d').drawImage(video, 0, 0, width, height);
        photo.innerHTML = canvas.toDataURL().split(';base64,')[1];

        let ctx = photo.getContext("2d");
        ctx.drawImage(video, 0, 0, width, height);
        setHasPhoto(true);

        image = canvas.toDataURL();
    const split = image.split(',');
    const base64string = split[1];
    const buffer = Buffer.from(base64string, 'base64');
    if (typeof onCapture === "function") {
      console.log('ChatInput calling WebcamCapture')
      onCapture(buffer);
      console.log(buffer);
    }
    
    console.log(buffer);


    if (buffer) {
      setImage(buffer);
    }

        const bodyFormData = new FormData();
        const blob = new Blob([buffer], {type: 'image/jpeg'});
        bodyFormData.append('image', blob, 'filename.jpg');
        console.log(typeof(bodyFormData))
        const { data } = await axios.post(`${addImage}`, bodyFormData, {
            
                headers: {
                //   'accept': 'application/json',
                //   'Accept-Language': 'en-US,en;q=0.8',
                  'Content-Type': 'multipart/form-data',
                },
            
            });
            console.log(data)

          
         
       
          if (data.status === false) {
            console.log("Error posting image to database")
          }
          if (data.status === true) {
      
            console.log("Image in database")
            console.log(data)
            console.log(hasPhoto)
          }
          stopCamera();
    }

    const stopCamera = () => {
      if (mediaStream) {
        const tracks = mediaStream.getTracks();
        tracks.forEach((track) => track.stop());
        setMediaStream(null);
      }
    };

    const closePhoto = () => {
      if (mediaStream) {
        const tracks = mediaStream.getTracks();
        tracks.forEach(track => track.stop());
      }
        let photo = photoRef.current;
        let ctx = photo.getContext("2d");
        ctx.clearRect(0, 0, photo.width, photo.height);
        setHasPhoto(false);
    }

    useEffect(()=> {
        getVideo();
        return () => {
          if (mediaStream) {
            mediaStream.getTracks().forEach((track) => track.stop());
            stopCamera();
          }
        };
      }, []);

  return (
    <div className='WebcamCapture'>
        <div className='camera'>
    <video ref={videoRef}></video>
    <button onClick={takePhoto}>SNAP!</button><br></br>

    {hasPhoto && (
          <>
            <canvas id="canvas"></canvas>
            <p id="printresult"></p>
          </>
        )}
    
   
    </div>
        <div className={"result " + (hasPhoto ? "hasPhoto" : "")}>
            <canvas ref={photoRef}></canvas>
            <button onClick={closePhoto}>CLOSE</button>
        </div>
    </div>
  );
}

export default WebcamCapture