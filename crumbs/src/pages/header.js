import { useEffect, useState } from "react";
import{ Link } from "react-router-dom";
import{ Outlet } from "react-router-dom";
import BottomNav from '../components/bottomnav.js';
import SideNav from '../components/sidenav.js';
import SideBar from '../components/sidebar.js';
import { getItem } from '../components/utils.js';
const Header = () => {
  const [user, setUser] = useState('');
  useEffect(() => {
    getItem('user', setUser);
  }, [])
  const state = sessionStorage.getItem('loggedin');
  if(state === null){
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
                <Outlet />
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
<Link to={'/people/' + user}>
<i className="fa-solid fa-user" />
 Profile
</Link>
<Link to="/discover">
<i className="fa-solid fa-search" />
 Discover
 </Link>
 <Link to="/notifications">
<i class="fa-solid fa-heart"></i>
 Notifications
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
        <SideBar />
      <Outlet />
        </div>
          </>
	);
  }

        
    
};
export default Header;
