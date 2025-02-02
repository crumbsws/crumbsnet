import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { setDirectActive } from '../../redux/reducers/inbox';
import { socket } from '../../socket';
import { store } from '../../redux/store';
import ConversationsSkeleton from '../skeletons/conversationsSkeleton';

import ProfilePicture from '../profilePicture';
function Conversations(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastActiveChannel, setLastActiveChannel] = useState(null);
  const directActive = useSelector((state) => state.inbox.directActive);
  const userData = useSelector((state) => state.user.data);
  const displayLastMessage = props.displayLastMessage;
  const profileSize = props.profileSize;


  useEffect(() => {

    if (directActive) {
      store.dispatch(setDirectActive());
    }


  }, [directActive])
  useEffect(() => {
    fetchConversations()
  }, [])

  useEffect(() => {
    if (lastActiveChannel) {
      moveChannel(lastActiveChannel);
    }
  }, [lastActiveChannel])

  useEffect(() => {
    const messageHandler = (newMessages) => {
      console.log('message received');
      setLastActiveChannel(newMessages.channel);
    };

    // Register the message handler
    socket.on('message', messageHandler);

    // Cleanup the message handler on component unmount
    return () => {
      socket.off('message', messageHandler);
    };
  }, [])

  

  function moveChannel(channel) {
    console.log('moving channel ' + channel)
    setData(currentData => {
      
      const targetIndex = currentData.findIndex(item => item.channel === channel);
      
      if (targetIndex === -1) return currentData;
      if (targetIndex === 0) return currentData;
      
      
      const newData = [...currentData];
      
      
      const [removedObject] = newData.splice(targetIndex, 1);
      
      
      newData.unshift(removedObject);

      console.log(newData);
      return newData;
      
  });
    
}

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
  else if (data.length === 0) {

    return (
      <div className='post' id='tip'>
        <h1>Find Friends</h1>
        <p>You haven't chatted with anyone before...</p>
      </div>


    );
  }
  else {
    return (
      data.map(({ name, photo, channel, message, date, status, user }) => (
        
          <Link to={"/direct/" + channel} key={channel}>
            <div className='post conversation-container' >
              <ProfilePicture size={profileSize || 's'} src={process.env.REACT_APP_API_URL + '/profiles/' + photo} />
              <div>

                {displayLastMessage === 'false' ? (
                <h4>{status === 'unseen' && user !== userData[0].name ? (<i class="fa-solid fa-circle fa-2xs call-to-act"></i>) : (<></>)} {name}</h4>
                ) : (
                  <>
                  <h4>{name}</h4>
                  <p>{status === 'unseen' && user !== userData[0].name ? (<i class="fa-solid fa-circle fa-2xs call-to-act"></i>) : (<></>)}
                    {' ' + Shorten(message, 20)}
                  </p>
                  </>
                )
                }
              </div>

            </div>
          </ Link>
        
      ))
    );
  }

}
export default Conversations;
