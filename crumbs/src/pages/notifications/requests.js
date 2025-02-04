import { getRequests } from "../../components/utils";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { store } from "../../redux/store";
import { setRequestsActive } from "../../redux/reducers/inbox";
import Loading from "../../components/loading";
import AcceptButton from "../../components/buttons/acceptButton";

function Requests() {
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.user.data[0].name);
  const requestsActive = useSelector((state) => state.inbox.requestsActive);
  const [loading, setLoading] = useState(true);

  function UpdateRequests() {
    if(requestsActive){
      store.dispatch(setRequestsActive())
    }
  }

  useEffect(() => {
    getRequests(setData, setLoading);
  }, [])

  useEffect(() => {
    if (!loading) {
      UpdateRequests();
    }
  }, [data, loading]);

  if (loading) {
    return (
      <Loading />


    );
  }
  else {
    return (
      <div>
      {data.map(({ sender, receiver, status, date }) => (
        <>
          {receiver === user ? (
            <div className="post" key={date}>
              <p><strong>{sender}</strong> sent a friend request.</p>
              {status === 'pending' ? (
                <AcceptButton user={sender} />
              ) : (
                <p className="email">{date}</p>
              )}
            </div>

          ) : (
            <></>
          )}
        </>
      ))}
      </div>
    );

  }
};

export default Requests;
