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
                    <span className="imageOptionText">Images</span>

                </div>
                <div className="shareOption">
                    <Chat className ="shareIcon"/>
                    <span className="messageOptionText">Messages</span>

                </div>
                <div className="shareOption">
                    <LocationOn className ="shareIcon"/>
                    <span className="locationOptionText">Location</span>

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
