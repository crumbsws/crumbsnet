import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import { socket } from '../../socket';
import ConversationsSkeleton from '../skeletons/conversationsSkeleton';
import { Shorten, fetchConversations }  from '../utils.js';

import ProfilePicture from '../profilePicture';
function Conversations(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastActiveChannel, setLastActiveChannel] = useState(null);
  const userData = useSelector((state) => state.user.data);
  const displayLastMessage = props.displayLastMessage;
  const profileSize = props.profileSize;
  const currentChannel = useSelector((state) => state.inbox.currentChannel);


  useEffect(() => {
    fetchConversations(setData, setLoading);
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

useEffect(() => {  
readChannel(currentChannel);
}, [currentChannel])

function readChannel(channel) {
  const targetIndex = data.findIndex(item => item.channel === channel);
  if (targetIndex === -1) return;
  const dummyData = [...data];
  dummyData[targetIndex].status = "seen"
  setData(dummyData);
  console.log('read channel ' + channel);
}

  function moveChannel(channel) {
    console.log('moving channel ' + channel)
    setData(currentData => {
      
      const targetIndex = currentData.findIndex(item => item.channel === channel);
      
      if (targetIndex === -1) 
        {  
          const newData = [...currentData];
          newData.unshift({
            channel: channel,
            status: "unseen",
            name: "New Channel",
            photo: '/default.png',
            message: "",
            date: "Just Now",
            user: "New Channel"
            // Add other necessary details for the new channel
          });
          return newData;
        }

      
      
      const newData = [...currentData];
      
      
      const [removedObject] = newData.splice(targetIndex, 1);
      
      
      newData.unshift(removedObject);
      if (channel !== currentChannel) {
      newData[targetIndex].status = "unseen"
    }
      console.log(newData);
      return newData;
      
  });
    
}



  
  if (loading) {

    return (
      <ConversationsSkeleton />


    );
  }

  else {
    return (
      data.map(({ name, photo, channel, message, date, status, user }) => (
        
          <Link to={"/direct/" + channel} key={channel}>
            <div className='post conversation-container' >
              <ProfilePicture size={profileSize || 's'} src={process.env.REACT_APP_CDN_URL + '/profile-images/' + photo} />
              <div>

                {displayLastMessage === 'false' ? (
                <h4>{status === 'unseen' && user !== userData[0].name ? (<i class="fa-solid fa-circle fa-2xs call-to-act"></i>) : (<></>)} {Shorten(name, 8)}</h4>
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
