import { NavLink, Outlet } from 'react-router-dom';

import ClubButton from '../buttons/clubButton.js';
function ClubMenu(props) {


    const clubProp = props.club;

return (
    <>
    <div id='tip' className='post'>
    <h1 className='decorated'><i class="fa-solid fa-circle"></i> {clubProp}</h1>
    <p className='email'>A Crumbs Club • Branch of the Crumbs Net</p>
    </div>
    <ClubButton club={clubProp}/>
    <div className='post' id='menu'>


    <NavLink to={'/clubs/' + clubProp}>
    Board
    </NavLink>
    <NavLink to={'/clubs/' + clubProp + '/posts'}>
    Posts
    </NavLink>
    <NavLink to={'/clubs/' + clubProp + '/box'}>
    Box
    </NavLink>

    <NavLink to={'/clubs/' + clubProp + '/gallery'}>
    Gallery
    </NavLink>
    </div>

    <div className='menu-container'>
    <Outlet />
    </div>
    </>
)
}
export default ClubMenu;