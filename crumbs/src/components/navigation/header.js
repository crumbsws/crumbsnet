
import{ Link } from "react-router-dom";
import { useSelector } from "react-redux";
import{ Outlet } from "react-router-dom";


import BottomNav from "./bottomnav.js";
import OutletWrapper from "../outletWrapper.js";
import SideBar from './sidebar.js';
import TaskBar from "./taskbar.js";

const Header = () => {

  const directActive = useSelector((state) => state.inbox.directActive);
  const requestsActive = useSelector((state) => state.inbox.requestsActive);
  const userData = useSelector((state) => state.user.data);
  
  // Use optional chaining and fallback to a default value if name is undefined

  




  const state = sessionStorage.getItem('loggedin');
  if(!state){
    return (
      <>
<div className="header" id="header">
<ul>
  <li>
<Link className='decorated 'to="/">
Crumbs 
</Link>
<Link to="/">
<i className="fa-solid fa-house"/>
 Home
</Link>
<Link to="/login">
<i className="fa-solid fa-user-group"/>
 Clubs
</Link>
<Link to="/login">
<i className="fa-solid fa-wand-magic-sparkles"/>
 Publish
</Link>
<Link to="/login">
<i className="fa-solid fa-user"/>
 Login
</Link>
<Link to="/register">
<i className="fa-solid fa-right-to-bracket"></i>
 Register
</Link>
          </li>
          </ul>
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
<ul>
  <li>
<Link className='decorated 'to="/">
Crumbs 
</Link>
<Link to='/clubs'>
<i className="fa-solid fa-user-group" />
 Clubs
</Link>
<Link to="/publish">
<i className="fa-solid fa-wand-magic-sparkles"/>
 Publish
</Link>
<Link to={'/people/' + userData[0].name}>
<i className="fa-solid fa-user" />
 Profile
</Link>
<Link to="/discover">
<i className="fa-solid fa-search" />
 Discover
 </Link>
 <Link to="/notifications">
 {!requestsActive  ? (
  <i class="fa-solid fa-heart"></i>
) : (
  <i class="fa-solid fa-heart danger-zone"></i>
)
}

 Notifications
</Link>
<Link to="/direct">
{!directActive  ? (
  <i class="fa-solid fa-inbox"></i>
) : (
  <i class="fa-solid fa-inbox danger-zone"></i>
)
}
 Messages
 </Link>
<Link to="/">
<i className="fa-solid fa-house"></i>
 Home
</Link>

          </li>
          </ul>
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

