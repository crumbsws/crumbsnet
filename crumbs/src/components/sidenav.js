import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getItem } from './utils.js';
function SideNav() {
  
  const [club, setClub] = useState('');
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getItem('club', setClub, setLoading);
  }, [])
  const name = club.length > 0 ? club[0].name : null;

  function Change(){
    setStatus(!status);
}
	return (
    <>
    <span onClick={Change} ><i class="fa-solid fa-bars"></i></span>

		<div className="sidenav" style={status ? ({ display:'block'}) : ({display : 'none'})}>
      <div className="sidenav-content">
        <span onClick={Change}><i class="fa-solid fa-xmark"></i></span>           
        <ul>
        <li>
        <Link className='decorated 'to="/">
        Crumbs 
        </Link>

        <Link to='/direct'>
        <i class="fa-solid fa-message"></i> Messages
        </Link>

        <Link to='/clubs/'>
        <i class="fa-solid fa-clipboard"></i> Explore Clubs
        </Link>

        {!loading && name ? (
                  <Link to={'/clubs/' + name}>
                  <i class="fa-solid fa-book"></i> {name}
                  </Link>
        ) : (
        <></>
        )}


        <Link to='/notifications'>
        <i class="fa-solid fa-heart"></i> Notifications
        </Link>


          </li>
          </ul>
          </div>
        </div>
        </>
	);
       };
export default SideNav;
