import React from 'react';
import { Link } from 'react-router-dom';
import ProfilePicture from '../profilePicture';


function PeopleTemplate(props) {

    const data = props.data;
    return (
        <div className='post container' >
        {data.map(({ name, point, description, club, photo }) => (
      

        <div className='contained' key={name}>
          <Link to={"/people/" + name}>
            <ProfilePicture src={process.env.REACT_APP_CDN_URL + '/profile-images/' + photo} size='m' />
            <p>{name}</p>
          </Link>
        </div>
    ))}
    </div>
    );
  }
  export default PeopleTemplate;