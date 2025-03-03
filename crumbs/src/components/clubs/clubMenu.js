import { NavLink, Outlet } from 'react-router-dom';

import ClubButton from '../buttons/clubButton.js';
function ClubMenu(props) {


    const data = props.data;

return (
    <>
    <div id='tip' className='post mobile'>
    <h1 className='decorated'><i class="fa-solid fa-circle"></i> {data[0].name}</h1>
    <p className='email'>{data[0].description}</p>
    </div>
    <ClubButton club={data[0].name}/>
    <div className='post' id='menu'>


    <NavLink to={'/clubs/' + data[0].name}>
    Board
    </NavLink>
    <NavLink to={'/clubs/' + data[0].name + '/posts'}>
    Posts
    </NavLink>
    <NavLink to={'/clubs/' + data[0].name + '/box'}>
    Box
    </NavLink>

    <NavLink to={'/clubs/' + data[0].name + '/gallery'}>
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