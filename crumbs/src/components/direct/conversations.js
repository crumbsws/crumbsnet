import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { setDirectActive } from '../../redux/reducers/inbox';
import { store } from '../../redux/store';
import ConversationsSkeleton from '../skeletons/conversationsSkeleton';

import ProfilePicture from '../profilePicture';
function Conversations() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const directActive = useSelector((state) => state.inbox.directActive);
  const userData = useSelector((state) => state.user.data);

  useEffect(() => {
      if (directActive){
        store.dispatch(setDirectActive());
      }
    fetchConversations()

  }, [directActive])

  function Shorten(str, length) {
    if (str.length > length) {
        return str.slice(0, length) + '...';
    } else {
        return str;
    }
}

  async function fetchConversations() {

    try {
      const response = await fetch(process.env.REACT_APP_API_URL + '/getConversations.php', {
        method: 'POST',
        credentials: 'include',
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
      <ConversationsSkeleton />


    );
  }
  else if(data.length === 0) {
    
    return (
      <div className='post' id='tip'>
        <h1>Find Friends</h1>
        <p>You haven't chatted with anyone before...</p>
      </div>


    );
  }
  else {
  return (
    data.map(({ name, photo, url, message, date, status, user }) => (
      <>
        <Link to={"/direct/" + url} key={url}>
          <div className='post conversation-container' >
              <ProfilePicture size='s' src={process.env.REACT_APP_API_URL + '/profiles/' + photo}/>
              <div>
              <h4>{name}</h4>
              <p>{status === 'unseen' && user !== userData[0].name ? (<i class="fa-solid fa-circle fa-2xs call-to-act"></i>) : (<></>)} 
                {' ' + Shorten(message, 20)}
                </p>
              </div>
            
          </div>
        </ Link>
      </>
    ))
  );
}

}
export default Conversations;
