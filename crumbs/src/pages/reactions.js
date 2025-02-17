import { useEffect, useState } from 'react';
import BackNav from '../components/navigation/backnav.js';
import Loading from '../components/loading.js';
import { useParams } from 'react-router-dom';
import ProfilePicture from '../components/profilePicture.js';
import PageWrapper from '../components/pageWrapper.js';

function Reactions() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    getReactData()
  }, [id])




  const getReactData = async () => {
    setLoading(true)
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + '/getReactions.php', {
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
      <PageWrapper>
      <Loading />
      </PageWrapper>

    );
  }
  else {

    return (
      <PageWrapper>
        <BackNav ><p>Reactions</p></BackNav>
        {data.map(({ name, rating, photo }) => (
          <>
            <div className='post' id='view'>
              <div className='post-credit'>
                <ProfilePicture src={process.env.REACT_APP_CDN_URL + '/profiles/' + photo} size='xs' />
                <p className='email'>{name}</p>
              </div>
              <input className='slider' value={rating} type="range" style={{
                background: `linear-gradient(to right, var(--brand) ${rating}%, var(--froutline) ${rating}%)`,
              }} />
            </div>
          </>

        ))}

      </PageWrapper>
    );
  }
}


export default Reactions;