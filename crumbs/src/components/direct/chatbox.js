import { useState, useEffect, useRef, Fragment } from 'react';
import { socket } from '../../socket';
import MessagesSkeleton from '../skeletons/messagesSkeleton';
import { Linkify } from '../utils';



function ChatBox(props) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const channel = props.channel;
  const name = props.name;
  const setReply = props.setReply;
  const messagesEndRef = useRef(null);

  function scrollBottom() {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  function toArray(buffer) {
    const array = buffer ? buffer.split(',') : [];
    return array;
  }



  useEffect(() => {

    if (!channel) return;
    setMessages([]);
    fetchMessages();
    socket.on('message', (newMessages) => {


      if (newMessages.channel === channel) {


        setMessages((prev) => [...prev, newMessages]);
      }

    });

  }, [channel])


  useEffect(() => {
    // Scroll to bottom when messages are updated
    scrollBottom();
  }, [messages]);


  function identToText(ident) {

    const message = messages.find(message => message.url === ident)?.message;
    return (message.length > 70 ? message.slice(0, 69) + '...' : message);
  }
  //fetch
  async function fetchMessages() {

    try {
      const response = await fetch(process.env.REACT_APP_API_URL + '/getMessages.php', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          channel: channel
        })
      });
      const data = await response.json();
      setMessages(data);
      setLoading(false);
      data.forEach(item => { item.asset = toArray(item.asset) });
    } catch (error) {
      console.log(error);


    }
  }



  /*
Implement support for multiple filetypes by storing type in db and conditionally rendering a button redirecting to the link for the file in the cdn  
image enlarger
  */



  if (loading) {
    return (<MessagesSkeleton />)
  }
  return (
    <>
      <div className="chatbox">
        <div className="chat-container">

          {messages.map(({ user, message, url, reply, asset }) => (
            <div key={url}>
              {name === user ? (
                sentMessage(reply, message, asset)
              ) : (
                receivedMessage(reply, message, url, asset)
              )
              }
            </div>
          ))}





        </div >
        
      </div>
      <div ref={messagesEndRef} />
    </>
  );


  function sentMessage(reply, message, asset) {
    return <>
      <div className="chat sent">
        {reply ? (<div className='reply' id='sent'>{identToText(reply)}</div>) : (<></>)}
        <p>{Linkify(message)}</p>


      </div>
      {asset && asset.length > 0 ? (
        <div className='assets asset-sent'>
          {asset.map((asset, index) => (
            <Fragment key={index}>
              <img src={process.env.REACT_APP_API_URL + '/message-assets/' + asset} alt='asset' />
            </Fragment>
          ))}
        </div>
      ) : (<></>)}
    </>;
  }

  function receivedMessage(reply, message, url, asset) {
    return <>
      <div className="chat received">
        {reply ? (<div className='reply' id='received'>{identToText(reply)}</div>) : (<></>)}
        <p>{Linkify(message)}</p>
        <span onClick={() => setReply(url)}><i class="fa-solid fa-reply"></i></span>
      </div>
      {asset && asset.length > 0 ? (
        <div className='assets asset-received'>
          {asset.map((asset, index) => (
            <Fragment key={index}>
              <img src={process.env.REACT_APP_API_URL + '/message-assets/' + asset} alt='asset' />
            </Fragment>
          ))}
        </div>
      ) : (<></>)}
    </>;
  }
};

export default ChatBox;