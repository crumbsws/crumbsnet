import { useState, useEffect} from 'react'
import { getOtherClub } from '../utils.js';
import Uploader from '../buttons/uploader.js';
import Loading from '../loading.js';
import BackNav from '../navigation/backnav.js';
import ProfilePicture from '../profilePicture.js';


function ClubEdit(props) {
  const club = props.club;
  const [clubDescription, setClubDescription] = useState('');
  const [clubCard, setClubCard] = useState('');
  const [message, setMessage] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [displayPhoto, setDisplayPhoto] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOtherClub(club, setData, setLoading)
  }, [])

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


  function handleDescription(e) {
    setClubDescription(e.target.value);
  }
  function handleCard(e) {
    setClubCard(e.target.value);
  }


    const handleSubmit = async (e) => {
      e.preventDefault();
      setMessage(<Loading />);
      const formData = new FormData();
      formData.append('description', clubDescription)
      formData.append('card', clubCard)
      formData.append('club', club)
      formData.append('photo', profilePhoto)
      try{
        const response = await fetch(process.env.REACT_APP_API_URL + '/updateClub.php', {
          method: 'POST',
          credentials: 'include',
          body: formData
        });
        const data = await response.json();
        if(data.state === 'success'){
          setMessage('Club updated');
        }
        else {
          setMessage(data.message);
  
        }
      }catch(err){
        console.log(err);
        setMessage('Check your network');
      }
    }
//Input defaultValue almıyor, veritabanı boşa çekiyor -çözdüm

if( loading){
  return (
    <Loading />
      
    
  );
} 
else
{
return (
<>
<BackNav />
{data.map(({ name, founder, description, point, photo }) =>(
<>
<h2>{name}</h2>
<p className='email'>Permanent</p>





<form encType="multipart/form-data" method="post" onSubmit={handleSubmit}>

{displayPhoto ? <ProfilePicture src={displayPhoto} size='l' /> : <ProfilePicture src={process.env.REACT_APP_CDN_URL + '/club-images/' + photo} size='l' />}


{Uploader(displayPhoto, handleProfilePhoto, removeProfilePhoto)}
<p className='email'>Your clubs image, gifs are allowed.</p>

<div className='statistics'>
<div className='statistics-content'>
<h1>{point}</h1>
<p className='email'>Points</p>
</div>
</div>
<p className='email'>Staff rating for your club, set to 5 initially.</p>
<input type="text" id='description' placeholder={description === '' ? ('Small description') : (description)} onChange={handleDescription} />

<p className='email'>Edit the description that will be displayed to people that are searching for the club.</p>

<select onChange={handleCard}> 
<option id='none' value="0">Select Card</option>
<option value="crumbs">Crumbs</option>
<option value="pumpkin">Pumpkin</option>
<option value="cardinal">Cardinal</option>
<option value="night">Night</option>
<option value="pacific">Pacific</option>
<option value="green">Green</option>
</select>

<p className='email'>The theme color of the club. Displayed in the club browser.</p>

<p className='result'>{message}</p>
<input type='submit' value='Save'/>
</form>
</>
  ))}
  </>
  );
}
};

export default ClubEdit;