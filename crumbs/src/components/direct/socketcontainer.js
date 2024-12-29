import { useState, useEffect } from 'react';
import { socket } from '../../socket';
import { useSelector, useDispatch } from 'react-redux';
import { store } from '../../redux/store';
import { setCurrentChannel } from '../../redux/reducers/inbox';

import BackNav from '../navigation/backnav';
import SendBox from './sendbox';
import ChatBox from './chatbox';
import ProfilePicture from '../profilepicture';

function SocketContainer(props) {
  const [typing, setTyping] = useState(false);
  const [typer, setTyper] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState('');
  const name = useSelector((state) => state.user.data[0].name);
  var channel = props.channel;
  const dispatch = useDispatch();
  const currentChannel = useSelector((state) => state.inbox.currentChannel);
  //fetch opposing details




  async function fetchDetails() {
    setLoading(true);
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + '/getChannelDetails.php', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({
          channel: channel
        })
      })
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (err) {
      console.log(err);

    }
  }
  //fetch opposing details

  function joinChannel(channel) {
    socket.emit('joinChannel', channel);
  }

  useEffect(() => {

    if (!channel) return; 
      joinChannel(channel);
      store.dispatch(setCurrentChannel(channel));
      console.log(channel)
      fetchDetails();

      socket.on('typing_start', (typer) => {

        if (typer.user !== name && typer.channel === currentChannel) {
          setTyping(true);
          setTyper(typer);
        }


      });

      socket.on('typing_stop', (typer) => {

        setTyping(false);

      });
    
      return () => { //not tested, must prevent leak between channels and messages stil received by the other socket channel
        dispatch(setCurrentChannel(null)); // Clear current channel on unmount
        setTyping(false);
        setTyper('');
        setReply('');
      };
  }, [channel])



  return (
    <>
      <BackNav>

        {data.map(({ name, photo }) => (

          <>
            <ProfilePicture src={process.env.REACT_APP_API_URL + '/profiles/' + photo} size='xs' />
            {!typing ? (
              <p>{name}</p>
            ) : (
              <p className='email'>{typer} is typing...</p>
            )}
          </>

        ))}

      </BackNav>
      <ChatBox channel={currentChannel} name={name} setReply={setReply} />
      <SendBox channel={currentChannel} user={name} setReply={setReply} reply={reply} />
    </>
  );


};

export default SocketContainer;