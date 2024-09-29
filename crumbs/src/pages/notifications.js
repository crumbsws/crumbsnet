import { getItem} from "../components/utils";
import { useState, useEffect } from "react";
import Loading from "../components/loading";
import AcceptButton from "../components/buttons/acceptbutton";

function Notifications(){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      getItem('requests', setData, setLoading);
    }, [])

    if( loading){
        return (
          <Loading />
            
          
        );
      } 
      else
      { 
    return (          
    data.map(({ type, sender, receiver, status, date }) =>(
      <div className="post">
    <p><strong>{sender}</strong> sent a friend request.</p>
    {status === 'pending' ? (
    <AcceptButton user={sender}/>
    ) : (
      <p className="email">{date}</p>
    )}
    
      </div>
    )) 
    )
        } 
    };

export default Notifications;