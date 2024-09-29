
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from '../loading.js';
import { fetchProfile, getItem } from '../utils.js';
import Icons from "../../icons/iconlibrary.js";


function Profilecard(props) {
  const [data, setData] = useState([]);
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
      useEffect(() => {
        fetchProfile(props.user, setData);
        getItem('user', setUser, setLoading);
      }, [props.user])

      
      if( loading || data.length === 0){
        return (
          <Loading />
            
          
        );
      } 
      else
      {
    return ( 
      
    data.map(({ name, point, description, home, relation, photo }) =>(
    <div className='post' id='profile'>
        <div className="center-text">
        <img id='rounded' src={'http://localhost:8000/profiles/' + photo} alt=' ' /><br/>
        <h2>{name}︱{point} <Icons icon='point' /></h2>
        </div>
        {name === user ? (
             <Link to={"/profile"}><h4 id='edit'>Edit Profile</h4></Link>
          ) : (
            <></>
          )}
        <p className='email'>{home} • {relation}</p>
        <p>{description}</p>
        
    </div>
        )))
      }
};

export default Profilecard;