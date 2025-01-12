import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BackNav from '../components/navigation/backnav.js';
import Loading from '../components/loading.js';
import Comments from '../components/comments.js';
import ProfilePicture from '../components/profilepicture.js';
import Reaction from '../components/interactions/reaction.js';
import { Linkify } from '../components/utils.js';

function View() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    getPostData()
  }, [id])




  const getPostData = async () => {
    setLoading(true)
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + '/getPost.php', {
        credentials: 'include',
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          id: id
        })
      });
      const json = await response.json();
      setData(json);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    catch (err) {
      console.log(err);
    }

  }
  if (loading) {
    return (
      <Loading />


    );
  }
  else {

    return (
      <>
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
                  <ProfilePicture src={process.env.REACT_APP_API_URL + '/profiles/' + photo} size='xs' />
                  <p className='email' >{name}</p>
                </div>
              </Link>

              <p className='email'>{date}</p>

              {conf ? (
                <img src={process.env.REACT_APP_API_URL + '/images/' + conf} alt='' />
              ) : (
                <></>
              )}
              <p>{Linkify(body)}</p>
              {parent === 'public' ? (
                <></>
              ) : (
                <Link to={"/view/" + parent}><h4 className='call-to-act'>Visit Related post</h4></Link>
              )}

              <div className='interaction-menu' >
                <Reaction url={url} />
                <Link to={"/reactions/" + url}><p className='email'>View reactions</p></Link>
              </div>
            </div>
            <Comments parent={url} collect={collect} />
          </>

        ))}
      </>
    );
  }
}


export default View;