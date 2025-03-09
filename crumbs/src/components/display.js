import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from './loading.js';
import ProfilePicture from './profilePicture.js';
import { PopupTrigger } from './popup.js';
import { useSelector } from 'react-redux';
import Comment from './interactions/comment.js';
import ExclusiveTag from './tags/exclusiveTag.js';
import SelfTag from './tags/selfTag.js';
import Reaction from './interactions/reaction.js';
import PinTemplate from './templates/pinTemplate.js';
import Pin from './interactions/pin.js';
import { Linkify, isVideoFile, Shorten } from './utils.js';
import PostTemplate from './templates/postTemplate.js';
import ClubTemplate from './templates/clubTemplate.js';
import PeopleTemplate from './templates/peopleTemplate.js';

function Display(props) {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchData()
  }, [props.parent, props.user])

  const user = useSelector((state) => state.user.data[0].name);
  const type = props.type;
  const parent = props.parent;
  const username = props.user;
  const club = props.club;



  async function fetchData() {

    try {
      const response = await fetch(process.env.REACT_APP_API_URL + '/display.php', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          user: username,
          parent: parent,
          club: club,
          type: type
        })
      });
      const json = await response.json();
      setData(json);
      setLoading(false);
    } catch (error) {
      console.log(error);


    }
  }
  if (loading) {
    return (
      <Loading />


    );
  }
  else {


    if (type === 'posts') {
      return (

        <PostTemplate data={data} user={user} />
      );
    }
    else if (type === 'clubs') {
      return (
        <ClubTemplate data={data} />
      );
    }
    else if (type === 'friends') {
      return (
        <PeopleTemplate data={data} />
      );
    }
    else if (type === 'gossip') {
      return (

        data.map(({ note }) => (
          <>
            <div className='contained' key={note}>
              <p>{note}</p>
            </div>

          </>
        ))

      );
    }
    else if (type === 'gallery') {
      return (

        data.map(({ conf, url }) => (
          <>

            <div className='gallery' key={conf}>
              <Link to={'/view/' + url}>
                <img src={process.env.REACT_APP_CDN_URL + '/images/' + conf} alt='' />
              </Link>
            </div>


          </>
        ))

      );
    }
    else if (type === 'diary') //fix pfp, return ohtıoo from php
    {
      return (

        data.map(({ name, photo, message, date }) => (
          <>

            <PopupTrigger
              content={
                <>
                  <ProfilePicture size='m' src={process.env.REACT_APP_CDN_URL + '/profile-images/' + photo} />
                  <h3>{name}'s Entry</h3>
                  <p>{message}</p>
                </>
              }
              bottom={date}>

              <ProfilePicture src={process.env.REACT_APP_CDN_URL + '/profile-images/' + photo} size='s' />
            </PopupTrigger>

          </>
        ))

      );
    }

    if (type === 'pins') {
      return (
        <PinTemplate data={data} user={user} />
      );
  }

}





 






}
export default Display;
