
import{ Link } from "react-router-dom";
import { useSelector } from "react-redux";
import{ Outlet } from "react-router-dom";
import Icons from "../../icons/iconlibrary.js";


import BottomNav from "./bottomnav.js";
import OutletWrapper from "../outletWrapper.js";
import SideBar from './sidebar.js';
import TaskBar from "./taskbar.js";

const Header = () => {

  const directActive = useSelector((state) => state.inbox.directActive);
  const systemMessagesActive = useSelector((state) => state.inbox.systemMessagesActive);
  const requestsActive = useSelector((state) => state.inbox.requestsActive);
  const userData = useSelector((state) => state.user.data);
  
  // Use optional chaining and fallback to a default value if name is undefined

  




  const state = sessionStorage.getItem('loggedin');
  if(!state){
    return (
      <>
<div className="header" id="header">

<Link className='decorated 'to="/">
Crumbs 
</Link>
<Link to="/">
<i className="fa-solid fa-house"/> Home
</Link>
<Link to="/login">
<i className="fa-solid fa-user"/> Login
</Link>
<Link to="/register">
<i className="fa-solid fa-right-to-bracket"></i> Register
</Link>

          </div>
                  <BottomNav />
                  <div className="main" id="main">
                  <OutletWrapper>
                <Outlet />
                </ OutletWrapper>
                  </div>
                  </>
                           );
                        }
        else {
        return (
    <>
<div className="header" id="header">

<Link className='decorated 'to="/">
Crumbs 
</Link>
<Link to='/clubs'>
<i className="fa-solid fa-user-group" /> Clubs
</Link>
<Link to="/publish">
<i className="fa-solid fa-wand-magic-sparkles"/> Publish
</Link>
<Link to={'/people/' + userData[0].name}>
<i className="fa-solid fa-user" /> Profile
</Link>
<Link to="/discover">
<i className="fa-solid fa-search" /> Discover
 </Link>
 <Link to="/notifications">
 {requestsActive || systemMessagesActive ? (
  <i class="fa-solid fa-heart danger-zone"></i>
  
) : (
  <i class="fa-solid fa-heart"></i>
)
} Notifications
</Link>
<Link to="/direct">
{!directActive  ? (
  <i class="fa-solid fa-inbox"></i>
) : (
  <i class="fa-solid fa-inbox danger-zone"></i>
)
} Messages
 </Link>
<Link to="/notes">
<i className="fa-solid fa-list"></i> Notes
</Link>
<Link to="/">
<i className="fa-solid fa-house"></i> Home
</Link>


          </div>

        <BottomNav />
        <div className="main" id="main">
        <TaskBar />
        <OutletWrapper>
        <Outlet />
        </OutletWrapper>
        <SideBar />
        </div>
          </>
        );
  }


    
};
export default Header;

