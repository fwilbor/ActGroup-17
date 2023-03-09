import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";

export default function Topbar() {
  return (
    <div className="topbarContainer">

      <div className="topbarLeft">
        <span className="logo">KidzSnap</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            className="searchInput"
            placeholder="Search for friend, messages or images"
            
          />
        </div>
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
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <img src="/assets/dullstretch5.jpeg" alt="Incredible1" className="topbarImg"/>
      </div>
    </div>
  );
}

