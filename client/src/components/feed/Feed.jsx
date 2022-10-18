import "./feed.css";
import Share from "../share/Share";

import { useAuthContext } from "../../hooks/useAuthContext";

export default function Feed() {

  const user = useAuthContext()
  console.log(user)
  
  return (
    
    <div className="feed">
      <div className="feedWrapper">
      <Share />
      

      </div>
    </div>
  )
}
