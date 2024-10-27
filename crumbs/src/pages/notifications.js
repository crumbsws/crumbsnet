
import { getItem} from "../components/utils";
import { useState, useEffect } from "react";
import Loading from "../components/loading";
import AcceptButton from "../components/buttons/acceptbutton";

function Notifications(){
    const [data, setData] = useState([]);
        const [user, setUser] = useState('');
    const [loadingUser, setLoadingUser] = useState(true);
        const [loadingReq, setLoadingReq] = useState(true);

	function UpdateRequests(current){
	localStorage.setItem('requests', current);
	}

    useEffect(() => {
      	  getItem('requests', setData, setLoadingReq);
          getItem('user', setUser, setLoadingUser);
    }, [])

useEffect(() => {
    if (!loadingReq) {
        UpdateRequests(data.length);
    }
}, [data, loadingReq]);

    if( loadingUser || loadingReq){
        return (
          <Loading />


        );
      } 
      else
      { 
return (
  data.map(({ type, sender, receiver, status, date }) => (
    <div className="post" key={date}> {/* Added a key prop for list items */}
      {receiver === user ? (
        <>
          <p><strong>{sender}</strong> sent a friend request.</p>
          {status === 'pending' ? (
            <AcceptButton user={sender} />
          ) : (
            <p className="email">{date}</p>
          )}
        </>
      ) : (
        <>
          <p>Friend request sent.</p>
          <p className="email">{date}</p>
        </>
      )}
    </div>
  ))
);

        } 
    };

export default Notifications;
