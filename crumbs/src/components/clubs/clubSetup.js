import { useState } from "react";
import Loading from '../loading.js';
import { useNavigate } from "react-router-dom";

function ClubSetup() {
  const [clubName, setClubName] = useState('');
  const [message, setMessage] = useState('');
  let navigate = useNavigate();

  function handleClubName(e) {
    setClubName(e.target.value);
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(<Loading />);
    const formData = new FormData();
    formData.append('name', clubName)
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + '/createClub.php', {
        credentials: 'include',
        method: 'POST',
        body: formData
      })
      const data = await response.json();


      if (data.state === 'success') {
        navigate("/clubs/" + data.name);
      }
      else {
        setMessage(data.message);
      }
    } catch (err) {
      console.log(err);
      setMessage('Check your network.');
    }
  }
  return <>
   

    <form encType="multipart/form-data" method="post" onSubmit={handleSubmit}>


      <input type="text" name="name" id="name" placeholder="Enter a name to start" minLength="6" maxLength="28" onChange={handleClubName} value={clubName} required />
      <p className='result'>{message}</p>
      <input type="submit" value="Create" />
    </form>




  </>;

};

export default ClubSetup;