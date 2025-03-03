
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from '../loading.js';
import { getProfile } from '../utils.js';
import Icons from "../../icons/iconlibrary.js";
import ProfilePicture from "../profilePicture.js";
import { useSelector } from "react-redux";

function Profilecard(props) {
  const [data, setData] = useState([]);
  const user =  useSelector((state) => state.user.data[0].name);
      useEffect(() => {
        getProfile(props.user, setData);
      }, [props.user])

      
      if(data.length === 0){
        return (
          <Loading />
            
          
        );
      } 
      else
      {
    return ( 
      
    data.map(({ name, point, description, home, relation, photo, message }) =>(
    <div className='post' id='profile'>
        <div className="center-text">
        <ProfilePicture src={process.env.REACT_APP_CDN_URL + '/profile-images/' + photo} size='l' />
        <h2>{name}</h2>
        <p><Icons icon='pointSmall' /> {point}</p>
        </div>
        {name === user ? (
             <Link to={"/profile"}><h4 id='edit'>Manage</h4></Link>
          ) : (
            <></>
          )}
        <p className='email'>{home} • {relation}</p>
        <p>{description}</p>

        {message ? (
        <div className="ticker">
        <p><strong>Last Entry ︱ </strong> {message}</p>
        </div>
          ) : (
            <></>
          )}


        
    </div>
        )))
      }
};

export default Profilecard;