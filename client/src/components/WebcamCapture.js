//no longer needed but we'll keep for clarity
import React, {useRef,useEffect, useState} from 'react';
import Webcam from "react-webcam";


const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: "user",
};



function WebcamCapture() {
    const webcamRef = useRef(null);
    const photoRef = useRef(null);

    const [hasPhoto, setHasPhoto] = useState(false);

    const getVideo = () => {
        navigator.mediaDevices.getUserMedia({video: {width: 1920, height: 1080}})
        .then(stream => {
            let video = webcamRef.current;
            video.srcObject = stream;
            video.play();
        })
        .catch(error => {
            console.log(error);
        })
    }

    useEffect(()=> {
        getVideo();
    }, [webcamRef])

  return (
    <div className='WebcamCapture'>
    <div className='camera'>
    {/* <Webcam 
    audio={false}
    height={videoConstraints.height}
    ref={webcamRef}
    screenshotFormat="image/jpeg"
    width={videoConstraints.width}
    videoConstraints={videoConstraints}
    />     */}
    <video ref={webcamRef}></video>
    <button>SNAP!</button>
    </div>
    <div className={"result" + (hasPhoto? "hasPhoto" : "")}>
        <canvas ref={webcamRef}></canvas>
        <button>Close</button>
    </div>
    </div>
  )
}

export default WebcamCapture