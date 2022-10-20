import "./share.css"
import {Image} from "@material-ui/icons"

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
                    <span className="shareOptionText">Images</span>

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
