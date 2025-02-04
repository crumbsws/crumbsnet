import { NavLink, Outlet } from 'react-router-dom';

function NotificationMenu() {


return (
    <>

    <div className='post' id='menu'>
    <NavLink to='/notifications'>
    Requests
    </NavLink>

    <NavLink to='/notifications/messages'>
    System Messages
    </NavLink>
    </div>

    <div className='menu-container'>
    <Outlet />
    </div>
    </>
)
}
export default NotificationMenu;