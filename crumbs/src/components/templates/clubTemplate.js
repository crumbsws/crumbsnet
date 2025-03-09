import React from 'react';
import { Link } from 'react-router-dom';
import ProfilePicture from '../profilePicture';
import { Shorten } from '../utils.js';


function ClubTemplate(props) {
    const data = props.data;

    return data.map(({ name, founder, description, card, point, photo }) => (
      <Link to={"/clubs/" + name} key={name}>
        <div className='post club' id={card}>
          <div className='club-content'>
            <ProfilePicture src={process.env.REACT_APP_CDN_URL + '/club-images/' + photo} size='m' />
            <div>
              <h1 className='decorated'>{name}</h1>
              <p>{Shorten(description, 50)}</p>
            </div>
          </div>
        </div>
      </Link>
    ));
  }
  export default ClubTemplate;