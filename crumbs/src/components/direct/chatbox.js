import { useState, useEffect, useRef} from 'react';
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


  


useEffect(() => {

  if (!channel) return;
        setMessages([]);
        fetchMessages();
        socket.on('message', (newMessages) => {
          

          if(newMessages.channel === channel) {
            
            
          setMessages((prev) => [...prev, newMessages]);
          }

        });
    
  }, [channel])


  useEffect(() => {
    // Scroll to bottom when messages are updated
    scrollBottom();
}, [messages]);


function identToText(ident){

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
  } catch (error) {
    console.log(error);
    
    
  }
}

//fetch



//photo component not working//photo component not working//photo component not working
if(loading) {
  return(<MessagesSkeleton />)
}
return  (
<>
<div  className="chatbox">
<div  className="chat-container">

{messages.map(({ user, message, url, reply }) =>(
<div key={url}>
{ name === user ? (
  <>
    <div className="chat sent">
    {reply ? (<div className='reply' id='sent'>{identToText(reply)}</div>) : (<></>)}
    <p>{Linkify(message)}</p>
</div>
</>
) : (
<>
<div className="chat received">
    {reply ? (<div className='reply' id='received'>{identToText(reply)}</div>) : (<></>)}
    <p>{Linkify(message)}</p>
    <span onClick={() => setReply(url)}><i class="fa-solid fa-reply"></i></span>
    
</div>
</>
)
}
</div>
  ))}





</div >
<div ref={messagesEndRef}/>
</div>

</>
);
  
};

export default ChatBox;