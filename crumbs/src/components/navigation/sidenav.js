import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
function SideNav() {
  

  const [status, setStatus] = useState(false);

  const active = useSelector((state) => state.inbox.active);
  
  function Change(){
    setStatus(!status);
}
	return (
    <>
    <span onClick={Change} ><i class="fa-solid fa-bars"></i></span>

    {!status ? (<></>) : (
		<div className="sidenav" onClick={Change}>
      <div className="sidenav-content" onClick={(e) => e.stopPropagation()}>
        <span onClick={Change}><i class="fa-solid fa-xmark"></i></span>           

        <Link className='decorated 'to="/">
        Crumbs 
        </Link>

        <Link to='/direct'>
                  {!active ? (
                    <i class="fa-solid fa-inbox"></i>
                  ) : (
                    <i class="fa-solid fa-inbox danger-zone"></i>
                  )
                  } Messages
        </Link>

        <Link to='/clubs/'>
        <i class="fa-solid fa-clipboard"></i> Clubs
        </Link>



        <Link to='/notifications'>
        <i class="fa-solid fa-heart"></i> Notifications
        </Link>



          </div>
        </div>
        )}
        </>
        
	);
       };
export default SideNav;
