import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from '../loading.js';
import ProfilePicture from "../profilePicture.js";
import { Shorten } from "../utils.js";



function Sidebar() {
    const [trends, setTrends] = useState([]);

    const userData = useSelector((state) => state.user.data[0]);

    useEffect(() => {
      fetchTrends()
    }, [])

    const fetchTrends = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + '/trends.php');
        const json = await response.json();
        setTrends(json);
      } catch (error) {
        console.log(error);
        
        
      }
    }
return (

<div className="sidebar">
<div className="info">
</div>
<Link to={'people/' + userData.name} >
<div class="post profile-fast">
<ProfilePicture src={process.env.REACT_APP_CDN_URL + '/profiles/' + userData.photo} size='xs' />
<p className="email">{userData.name}</p>
</div>
</Link>
<h3>Lounge </h3>
<p>Open for suggestions</p>
<h3>Trending Collections</h3>
{trends.map(({ collect, count }) =>(
        <Link to={'discover/' + collect}>
        <div class='trend'>
        <h3><i class="fa-solid fa-circle" aria-hidden="true"></i> {Shorten(collect, 12)}</h3>
        <h4 className='email'> Trending  •  {count} New Posts</h4>
        </div>
        </Link>
      ))}
</div>
);
};

export default Sidebar;