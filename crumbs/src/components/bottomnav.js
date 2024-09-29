import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getItem } from './utils.js';
import SideNav from "./sidenav.js";
function BottomNav() {
  
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getItem('user', setUser, setLoading);
  }, [])
  const state = sessionStorage.getItem('loggedin');


  
  if(state === null){
    return (
	<div className="bottomnav" id="bottomnav">
               <ul>
                 
                   <Link to="/">
                   <i className="fa-solid fa-house" />
                   </Link>
                   <Link to="/login">
                   <i className="fa-solid fa-user-group" />
                   </Link>
                   <Link to="/login">
                   <i className="fa-solid fa-wand-magic-sparkles"/>
                   </Link>
                   <Link to="/login">
                   <i className="fa-solid fa-user" />
                   </Link>
                   <Link to="/register">
                   <i className="fa-solid fa-right-to-bracket"></i>
                   </Link>
                 
               </ul>
               </div>
			   );
			}
	else {
	return (
		<div className="bottomnav" id="bottomnav">
              <ul>
                

                <li>
                  <div>
                  <SideNav />
                  </div>
                </li>

                <li>
                  <Link to="/publish">
                  <i className="fa-solid fa-wand-magic-sparkles"/>
                  </Link>
                  </li>

                  <li>
                  <Link to={'/people/' + user}>
                  <i className="fa-solid fa-user" />
                  </Link>
                  </li>

                  <li>
                  <Link to="/discover">
                  <i className="fa-solid fa-search"></i>
                  </Link>
                  </li>

                  <li>
                  <Link to="/">
                  <i className="fa-solid fa-house"></i>
                  </Link>
                  </li>


              </ul>
              </div>
	);
  }
       };
export default BottomNav;