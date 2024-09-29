import { NavLink, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { getItem } from "../utils";
import Loading from "../loading.js";
import ClubButton from '../buttons/clubbutton.js';

function ClubMenu(props) {


    const clubProp = props.club;

return (
    <>
    <ClubButton club={clubProp}/>
    <div className='post' id='menu'>


    <NavLink to={'/clubs/' + clubProp}>
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