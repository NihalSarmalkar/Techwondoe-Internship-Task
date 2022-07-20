import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import Share from "../share/Share";


export default function Sidebar() {

  const refresh=()=>{
    window.location.reload();

  }

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
      
      
        <ul className="sidebarList">
       
        <li className="sidebarListItem">
        <span className="sidebarListItemText">Platform</span>
          </li>
          
          
          
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Netflix</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Prime Video</span>
          </li>
          
        </ul>
        <button className="sidebarButton" onClick={refresh}>Home</button>
        <hr className="sidebarHr" />
        
      </div>
      <Share />
    </div>
  );
}
