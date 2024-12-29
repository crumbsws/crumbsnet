
import { getRequests } from "../components/utils";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loading from "../components/loading";
import AcceptButton from "../components/buttons/acceptbutton";

function Notifications() {
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.user.data[0].name);
  const [loading, setLoading] = useState(true);

  function UpdateRequests(current) {
    localStorage.setItem('requests', current);
  }

  useEffect(() => {
    getRequests(setData, setLoading);
  }, [])

  useEffect(() => {
    if (!loading) {
      UpdateRequests(data.length);
    }
  }, [data, loading]);

  if (loading) {
    return (
      <Loading />


    );
  }
  else {
    return (
      data.map(({ type, sender, receiver, status, date }) => (
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
      ))
    );

  }
};

export default Notifications;
