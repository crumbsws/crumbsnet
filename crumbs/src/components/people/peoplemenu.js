import { NavLink, Outlet } from 'react-router-dom';

function PeopleMenu(props) {
    const people = props.user;
return (
    <>
    <div className='post' id='menu'>
    <NavLink to={'/people/' + people}>
    Posts
    </NavLink>
    <NavLink to={'/people/' + people + '/cards'}>
    Card
    </NavLink>
    <NavLink to={'/people/' + people + '/friends'}>
    Friends
    </NavLink>
    </div>

    <div className='menu-container'>
    <Outlet />
    </div>
    </>
)
}
export default PeopleMenu;