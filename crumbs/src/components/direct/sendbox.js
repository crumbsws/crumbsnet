import { useState} from 'react';

import { socket } from '../../socket';

function SendBox(props) {

  const channel = props.channel;
  const user = props.user;
  const reply = props.reply;
  const setReply = props.setReply;
  const [message, setMessage] = useState('');





    

    function handleSubmit(e) {
      e.preventDefault();
      if (message) {
        socket.timeout(5000).emit('message', { user, channel, message, reply });
        setMessage('');
        setReply('');
      }
    }
    function handleMessage(e) {
      setMessage(e.target.value);
      socket.emit('typing_start', { user, channel});    
    }
    function handleMessageBlur(e) {
      socket.emit('typing_stop', { user, channel});   
    }




      return (
  <div className='sendform'>
          <div className='reply-container'>
            {reply ? (
              <div className='reply' id='received'>
                <span onClick={() => setReply('')} style={{ cursor: 'pointer' }}>
                  <i className="fa-solid fa-times"></i>
                </span>
                <strong> Replying to</strong> {reply}
                
              </div>
            ) : null}
          </div>
  <form  onSubmit={handleSubmit}>
    <input type="text" onChange={handleMessage} onBlur={handleMessageBlur} value={message} id="sendtext" placeholder="Type your message..."/>
    <button type="submit" id="sendsubmit" ><i className="fa-solid fa-paper-plane" /></button>
  </form>
  </div>
      )
  
};

export default SendBox;