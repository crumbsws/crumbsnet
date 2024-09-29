import { useState } from "react";
import Loading from '../loading.js';
import Popup from "../popup.js";
function ClubSetup() {
  const [clubName, setClubName] = useState('');
  const [message, setMessage] = useState('');

  function handleClubName(e) {
    setClubName(e.target.value);
}
const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage(<Loading />);
  const formData = new FormData();
  formData.append('name', clubName)
  try{
    const response = await fetch(process.env.REACT_APP_API_URL + '/createclub.php', {
      credentials: 'include',
      method: 'POST',
      body: formData
    })
    const data = await response.json();
    

    if(data.state === 'success') {
      window.location.href = "/clubs/" + data.name;
    }
    else {
    setMessage(data.message);
  }
  }catch(err){
    console.log(err);
    setMessage('Check your network.');
  }}
    return  <>

  <div>
  <div className="welcome">
    <h2>Unite in</h2>
    <h1>
      <strong>Clubs</strong>
    </h1>
    <h2>Start now</h2>
  </div>
    <form encType="multipart/form-data" method="post" onSubmit={handleSubmit}>
    <input type="text" name="name" id="name" placeholder="Pick a Club Name" minLength="6" maxLength="28" onChange={handleClubName} required /><br/>
    <p className='result'>{message}</p>
    <input type="submit" value="Create"/>
    </form>
  </div>



</>;
  
};

export default ClubSetup;