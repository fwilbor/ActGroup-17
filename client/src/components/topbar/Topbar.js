import "./topbar.css"
import {Search} from "@material-ui/icons";


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
       
       <div className="topbarRight"></div>
    </div>
  )
}
