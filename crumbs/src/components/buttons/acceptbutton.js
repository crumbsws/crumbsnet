import Loading from "../loading.js";
import { useState } from "react";
function AcceptButton(props) {
  
  const [value, setValue] = useState('Accept');
  const user = props.user;


  async function handleFriend() {
    setValue(<Loading />);

    try{
      const response = await fetch('http://localhost:8000/acceptuser.php', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          user: user
        })
      });
      const data = await response.json();
      if(data.state === 'success'){
        setValue('Accepted');
      }
      else {
        setValue(data.message);

      }
    }catch(err){
      setValue('Network error.');
      console.log(err);
    }
}

  return (
    <>
    <button onClick={handleFriend}>{value}</button>
    </>
  );
}

export default AcceptButton;