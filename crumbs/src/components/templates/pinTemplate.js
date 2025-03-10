import Comment from '../interactions/comment';
import ExclusiveTag from '../tags/exclusiveTag';
import SelfTag from '../tags/selfTag';
import Reaction from '../interactions/reaction';
import Pin from '../interactions/pin';
import { Linkify, isVideoFile, Shorten } from '../utils';
import { Link } from 'react-router-dom';
import ProfilePicture from '../profilePicture';


function PinTemplate(props) {

const user = props.user;
const data = props.data;

    return data.map(({ name, title, url, body, date, conf, collect, access, photo, quote, pinnerPhoto, pinnerName }) => (
      <div className='post' id='tip' key={url}>
            <div className='post-credit'>
              <ProfilePicture src={process.env.REACT_APP_CDN_URL + '/profile-images/' + pinnerPhoto	} size='xs' />
              <p className='email'>{pinnerName}</p>
            </div>

        <Link to={"/view/" + url}>



          <div className='post pin-container'>

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
        {quote ? (
          <p>{Linkify(quote)}</p>
        ) : (
          <></>
        )}
      </div>
    ));
  }
  export default PinTemplate;