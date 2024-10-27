import { useState, useEffect } from 'react'
import { fetchProfile } from '../components/utils.js';
import { getItem } from '../components/utils.js';
import { Link } from 'react-router-dom';
import Popup from '../components/popup.js';
import Loading from '../components/loading.js';
import Uploader from '../components/buttons/uploader.js';

function Profile() {
  const [profileDescription, setProfileDescription] = useState('');
  const [profileHome, setProfileHome] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [displayPhoto, setDisplayPhoto] = useState(null);
  const [profileRelationship, setProfileRelationship] = useState('');
  const [data, setData] = useState([]);
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile(user, setData);
    getItem('user', setUser, setLoading);
  }, [user])//olmaz bu böyle


  function handleDescription(e) {
    setProfileDescription(e.target.value);
  }
  function handleHome(e) {
    setProfileHome(e.target.value);
  }
  function handleRelationship(e) {
    setProfileRelationship(e.target.value);
  }
  function handleProfilePhoto(e){
    const file = e.target.files[0];
    if(file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setDisplayPhoto(reader.result);
        }
        reader.readAsDataURL(file);
        setProfilePhoto(file);
        
    }
  }
  function removeProfilePhoto(){
    setProfilePhoto(null);
    setDisplayPhoto(null);
  }


    const handleSubmit = async (e) => {
      e.preventDefault();
      setMessage(<Loading />);
      const formData = new FormData();
      formData.append('description', profileDescription)
      formData.append('home', profileHome)
      formData.append('relationship', profileRelationship)
      formData.append('photo', profilePhoto)
      formData.append('user', user)
      try{
        const response = await fetch(process.env.REACT_APP_API_URL + '/updateprofile.php', {
          method: 'POST',
          credentials: 'include',
          body: formData
        });
        const data = await response.json();
        if(data.state === 'success'){
          setMessage('Profile updated.');
        }
        else {
          setMessage(data.message);
  
        }
      }catch(err){
        console.log(err);
        setMessage('Check your network.')
      }
    }
//Input defaultValue almıyor, veritabanı boşa çekiyor -çözdüm
if( loading || data.length === 0){
  return (
    <Loading />
      
    
  );
} 
else
{
return (
<>

{data.map(({ name, description, home, photo }) =>(
<>
<h2>{name} </h2>
<p className='email'>Permanent</p>


<form encType="multipart/form-data" method="post" onSubmit={handleSubmit}>
<img id='rounded' src={displayPhoto} alt=' ' />
<br/>

      {Uploader(displayPhoto, handleProfilePhoto, removeProfilePhoto)}<br />

<input type="text" placeholder={description === '' ? ('Small description') : (description)} onChange={handleDescription}/><br/>
<input type="text" placeholder={home === '' ? ('School / College / University') : (home)} onChange={handleHome}/><br/>
<select onChange={handleRelationship}>
<option id='none' value="0">Relationship</option>
<option value="yes">Single</option>
<option value="no">In Relationship</option>
<option value="weee">I have no idea</option>  
</select>
<p className='result'>{message}</p>
<input type='submit' value='Save'/>
</form><br/>
<Link to='/dashboard'><p className='call-to-act'>Club Dashboard </p></Link><br/>
<Link to='/tos'><p className='call-to-act'>Terms of Service</p></Link><br/>
<p>Running <strong>{process.env.REACT_APP_VERSION}</strong></p>
</>
  ))}
  </>
  );
}


};

export default Profile;
