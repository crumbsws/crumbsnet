import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BackNav from '../components/navigation/backnav.js';
import Loading from '../components/loading.js';
import Comments from '../components/comments.js';
import ProfilePicture from '../components/profilePicture.js';
import Reaction from '../components/interactions/reaction.js';
import { Linkify, isVideoFile, getPostData } from '../components/utils.js';
import PageWrapper from '../components/pageWrapper.js';
import Pin from '../components/interactions/pin.js';

function View() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    getPostData(id, setData, setLoading);
  }, [id])





  if (loading) {
    return (
    <PageWrapper>
      <Loading />
    </PageWrapper>

    );
  }
  else {

    return (
      <PageWrapper>
        <BackNav />
        {data.map(({ photo, name, title, url, body, date, conf, collect, parent }) => (
          <>
            <div className='post' id='view' key={url}>



              <meta name="author" content={name} />


              {title !== '' ? (
                <>
                  <h2 id='big'>{title}</h2>
                </>
              ) : (
                <></>
              )}

              <Link to={'../people/' + name}>
                <div className='post-credit'>
                  <ProfilePicture src={process.env.REACT_APP_CDN_URL + '/profile-images/' + photo} size='xs' />
                  <p className='email' >{name}</p>
                </div>
              </Link>

              

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
              <p className='email'>{date}</p>
              {parent === 'public' ? (
                <></>
              ) : (
                <Link to={"/view/" + parent}><h4 className='call-to-act'>Visit Related post</h4></Link>
              )}

              <div className='interaction-menu' >
                <Pin url={url} />
                <Reaction url={url} />
                <Link to={"/reactions/" + url}><p className='email'>View reactions</p></Link>
              </div>
            </div>
            <Comments parent={url} collect={collect} />
          </>

        ))}
      </PageWrapper>
    );
  }
}


export default View;