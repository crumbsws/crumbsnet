import Loading from "../loading.js";
import { useState } from "react";
function AddButton(props) {
  
  const [value, setValue] = useState('Send');
  const user = props.user;


  async function handleFriend() {
    setValue(<Loading />);

    try{
      const response = await fetch(process.env.REACT_APP_API_URL + '/adduser.php', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          user: user
        })
      });
      const data = await response.json();
      if(data.state === 'success'){
        setValue('Sent');
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

export default AddButton;