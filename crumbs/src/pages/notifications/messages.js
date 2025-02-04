import { getSystemMessages } from "../../components/utils";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { store } from "../../redux/store";
import { setSystemMessagesActive } from "../../redux/reducers/inbox";
import Loading from "../../components/loading";
import AcceptButton from "../../components/buttons/acceptButton";

function Requests() {
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.user.data[0].name);
  const systemMessagesActive = useSelector((state) => state.inbox.systemMessagesActive);
  const [loading, setLoading] = useState(true);

  function UpdateSystemMessages() {
    if(systemMessagesActive){
      store.dispatch(setSystemMessagesActive())
    }
  }

  useEffect(() => {
    getSystemMessages(setData, setLoading);
  }, [])

  useEffect(() => {
    if (!loading) {
      UpdateSystemMessages();
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
      {data.map(({ date, message }) => (
        <>
          
            <div className="post" key={date}>
              <p>{message}</p>
                <p className="email">{date}</p>
            </div>

          
            <></>
          
        </>
      ))}
      </div>
    );

  }
};

export default Requests;
