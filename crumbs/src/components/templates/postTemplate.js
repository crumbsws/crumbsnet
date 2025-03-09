import React from 'react';
import { Link } from 'react-router-dom';
import ProfilePicture from '../profilePicture';
import { Linkify, isVideoFile, Shorten } from '../utils.js';
import Comment from '../interactions/comment.js';
import Reaction from '../interactions/reaction.js';
import Pin from '../interactions/pin.js';
import ExclusiveTag from '../tags/exclusiveTag.js';
import SelfTag from '../tags/selfTag.js';


function PostTemplate(props) {

    const user = props.user;
    const data = props.data;

    return data.map(({ name, title, url, body, date, conf, collect, access, photo }) => (
      <>
        <Link to={"/view/" + url} key={url}>
          <div className='post'>
            <div className='post-credit'>
              <ProfilePicture src={process.env.REACT_APP_CDN_URL + '/profile-images/' + photo} size='xs' />
              <p className='email'>{name}</p>
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

            {name !== user ? (
              <></>
            ) : (
              <SelfTag />
            )}

            {conf ? (

              isVideoFile(conf) ? (

                <video controls>
                  <source src={process.env.REACT_APP_CDN_URL + '/images/' + conf} type={'video/' + conf.split('.').pop()} />
                </video>

              ) : (
                <img src={process.env.REACT_APP_CDN_URL + '/images/' + conf} alt='' />
              )



            ) : (
              <></>
            )}
            <p>{Shorten(Linkify(body), 120)}</p>
            <div className='interaction-menu'>
              <Comment />
              <Reaction url={url} />
              <Pin url={url} />
            </div>
          </div>
        </Link>
      </>
    ));
  }
  export default PostTemplate;