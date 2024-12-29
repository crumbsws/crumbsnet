import { useState, useEffect } from 'react'
import { getProfile } from '../components/utils.js';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Loading from '../components/loading.js';
import Uploader from '../components/buttons/uploader.js';
import { useSelector } from 'react-redux';
import ProfilePicture from '../components/profilepicture.js';
import { PopupTrigger } from '../components/popup.js';
import { store } from '../redux/store.js';
import { setUserData, setUserClubs } from '../redux/reducers/user.js';



function Profile() {
  const [profileDescription, setProfileDescription] = useState('');
  const [profileHome, setProfileHome] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [displayPhoto, setDisplayPhoto] = useState(null);
  const [profileRelationship, setProfileRelationship] = useState('');
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');

  const user =  useSelector((state) => state.user.data[0].name);
  const userPhoto =  useSelector((state) => state.user.data[0].photo);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile(user, setData);
  }, [user])//olmaz bu böyle


  const handleLogout = async (e) => {
    e.preventDefault();
    try{
      await fetch(process.env.REACT_APP_API_URL + '/logout-m.php', {
        credentials: 'include'
      });
      sessionStorage.clear();
      store.dispatch(setUserData(null));
      store.dispatch(setUserClubs(null));
      navigate('/login');
    }catch(err){
      console.log(err);
    }
  }


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
        const response = await fetch(process.env.REACT_APP_API_URL + '/updateProfile.php', {
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
if(data.length === 0){
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
{displayPhoto ? <ProfilePicture src={displayPhoto} size='l' /> : <ProfilePicture src={process.env.REACT_APP_API_URL + '/profiles/' + photo} size='l' />}


{Uploader(displayPhoto, handleProfilePhoto, removeProfilePhoto)}
<p className='email'>Your profile image, gifs are allowed.</p>

<input type="text" placeholder={description === '' ? ('Small description') : (description)} onChange={handleDescription}/>

<p className='email'>Edit the description that will be displayed to people that are viewing your profile.</p>

<input type="text" placeholder={home === '' ? ('School / College / University') : (home)} onChange={handleHome}/>

<p className='email'>Which organisation you take place in. Displayed to filter out people with a similar name.</p>

<select onChange={handleRelationship}>
<option id='none' value="0">Relationship</option>
<option value="yes">Single</option>
<option value="no">In Relationship</option>
<option value="weee">I have no idea</option>  
</select>

<p className='email'>Just an indicator to display if you are interested or not. No big deal.</p>

<p className='result'>{message}</p>
<input type='submit' value='Save'/>
</form>
<Link to='/dashboard'><p className='call-to-act'>Club Dashboard </p></Link>
<Link to='/tos'><p className='call-to-act'>Terms of Service</p></Link>

    <PopupTrigger
    content={
      <>
      <ProfilePicture src={process.env.REACT_APP_API_URL + '/profiles/' + userPhoto} size='l' />
      <h3>{user}</h3>
      <p onClick={handleLogout} className='danger-zone'>Logout</p>
      </>
    }
    bottom="You can log back in anytime">

    <p className='danger-zone'>Logout</p>
    </PopupTrigger>

<p>Running <strong>{process.env.REACT_APP_VERSION}</strong></p>
</>
  ))}
  </>
  );
}


};

export default Profile;
