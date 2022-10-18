import "./share.css"
import {Image, Chat, LocationOn} from "@material-ui/icons"

export default function Share() {
  return (
    <div className="share">
        <div className="shareWrapper">
        <div className="shareTop">
            <img className="shareProfileImg" src="/assets/mickeyProfile.jpeg" alt="mickey mouse" />
            <input placeholder="You are Amazing, what's on your mind?" className= "shareInput"/>
        </div>
        <hr className="shareHr"/>
        <div className="shareBottom">
            <div className="shareOptions">
                <div className="shareOption">
                    <Image className ="shareIcon"/>
                    <div className="snap">
                         <span className="shareOptionText">Snapz</span>
                         </div>
                   

                </div>
                <div className="shareOption">
                    <Chat className ="shareIcon"/>
                    <div className="flags">
                    <span className="shareOptionText">Messages</span>
                    </div>
                    

                </div>
                <div className="shareOption">
                    <LocationOn className ="shareIcon"/>

                    <div className="location">

                    <span  className="shareOptionText">Location</span>
                   
                    </div>

                   

                </div>
            </div>
        </div>
        <button className="shareButton" type="submit">
            Share
          </button>

        </div>

    </div>
  )
}
