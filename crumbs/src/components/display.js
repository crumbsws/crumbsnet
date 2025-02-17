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
import { Linkify, isVideoFile } from './utils.js';

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

        data.map(({ name, title, url, body, date, conf, collect, access, photo }) => (
          <>
            <Link to={"/view/" + url} key={url}>
              <div className='post'>
              <div className='post-credit'>
              <ProfilePicture src={process.env.REACT_APP_CDN_URL + '/profiles/' + photo} size='xs' />
              <p className='email' >{name}</p>
              </div>

                {title !== '' ? (
                    <h2>{title}</h2>
                ) : (
                  <></>
                )}
                
                


                {access === 'public' ? (
                  <></>
                ) : (
                  <ExclusiveTag />
                )}
                
                {username || name !== user ? (
                    <></>
                ) : (
                  <SelfTag />
                )}

                {conf ? (

                isVideoFile(conf) ? (
                  
                  <video controls>
                  <source src={process.env.REACT_APP_CDN_URL + '/images/' + conf} type={'video/' + conf.split('.').pop() } />
                  </video>
                  
                ) : (
                  <img src={process.env.REACT_APP_CDN_URL + '/images/' + conf} alt='' />
                )



                ) : (
                  <></>
                )}
                <p>{Linkify(body)}</p>
                <div className='interaction-menu' >
                  <Comment />
                  <Reaction url={url} />
                </div>
              </div>
            </ Link>
          </>
        ))
      );
    }
    else if (type === 'clubs') {
      return (
        data.map(({ name, founder, description, card, point }) => (
          <>
            <Link to={"/clubs/" + name} key={name}>
              <div className='post club' id={card}>
                <div id='club-content'>
                  <h1 className='decorated'>{name}</h1>
                  <p>{description}</p>
                </div>
              </div>
            </ Link>
          </>
        ))
      );
    }
    else if (type === 'friends') {
      return (
        data.map(({ name, point, description, club, photo }) => (
          <>

            <div className='contained' key={name}>
              <Link to={"/people/" + name}>
                <ProfilePicture src={process.env.REACT_APP_CDN_URL + '/profiles/' + photo} size='m' />
                <p>{name}</p>
              </ Link>
            </div>
          </>
        ))
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
                <ProfilePicture size='m' src={process.env.REACT_APP_CDN_URL + '/profiles/' + photo}/>
                <h3>{name}'s Entry</h3>
                <p>{message}</p>
                </>
              }
              bottom={date}>

              <ProfilePicture src={process.env.REACT_APP_CDN_URL + '/profiles/' + photo} size='s' />
            </PopupTrigger>

          </>
        ))

      );
    }

  }




}
export default Display;
