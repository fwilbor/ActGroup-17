import Topbar from '../components/topbar/Topbar';
import Sidebar from "../components/sidebar/Sidebar";
import Feed from "../components/feed/Feed";
import Rightbar from "../components/rightbar/Rightbar";
import "../index.css";

// import { useAuthContext } from "../hooks/useAuthContext"


 function Messenger() {
  return (
    <>
    <Topbar />
    <div className='dashboardContainer'>
    <Sidebar />
    <Feed />
    <Rightbar />
    </div>


    </>
  )
}

export default Messenger
