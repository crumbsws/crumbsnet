import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SideNav from "./sidenav.js";
function BottomNav() {
  
  const userData = useSelector((state) => state.user.data);
  
  // Use optional chaining and fallback to a default value if name is undefined
  const user = userData[0] && userData[0].name ? userData[0].name : 'Guest';

  const state = sessionStorage.getItem('loggedin');


  
  if(state === null){
    return (
	<div className="bottomnav" id="bottomnav">
               
                 
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
                   
               
               </div>
			   );
			}
	else {
	return (
		<div className="bottomnav" id="bottomnav">
              
                

                
                  <div>
                  <SideNav />
                  </div>
               

                  <Link to="/publish">
                  <i className="fa-solid fa-wand-magic-sparkles"/>
                  </Link>
                  

                  
                  <Link to={'/people/' + user}>
                  <i className="fa-solid fa-user" />
                  </Link>
                  

                  
                  <Link to="/discover">
                  <i className="fa-solid fa-search"></i>
                  </Link>
                  

                  
                  <Link to="/">
                  <i className="fa-solid fa-house"></i>
                  </Link>
                  


             
              </div>
	);
  }
       };
export default BottomNav;