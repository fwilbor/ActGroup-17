import "./topbar.css"
import {Search, Person, Chat, Notifications} from "@material-ui/icons";


export default function Topbar() {
  return (
    <div className="topbarContainer">
       <div className="topbarLeft">
        <span className="logo">KidzSnap logo goes here</span>
       </div>
       <div className="topbarCenter">
        <div className="searchbar"></div>
        <Search />
        <input placeholder="Seach for friend, post or Snapz" className="seachInut" />

        
       
       </div>
       
       <div className="topbarRight">
        <div className="topbarLinks">
            <span className="topbarLink">Homepage</span>
            <span className="topbarLink">Dashboard</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">3</span>
          </div>
        </div>
        <img src="/Users/franklin-wilborn/ACT-GROUP17/kidzsnap/client/assets/spongebobProfile.jpeg" alt="" className="topbarImg" />
       </div>
    </div>
  )
}
