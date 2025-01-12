import { useState, useEffect} from 'react'
import { getOtherClub } from '../utils.js';
import Loading from '../loading.js';
import BackNav from '../navigation/backnav.js';

function ClubEdit(props) {
  const club = props.club;
  const [clubDescription, setClubDescription] = useState('');
  const [clubCard, setClubCard] = useState('');
  const [message, setMessage] = useState('');

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOtherClub(club, setData, setLoading)
  }, [])




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
{data.map(({ name, founder, description, point }) =>(
<>
<h2>{name}</h2>
<p className='email'>Permanent</p>

<div className='statistics'>
<div className='statistics-content'>
<h1>{point}</h1>
<p className='email'>Points</p>
</div>
</div>

<p className='email'>Given to the top 100 in the Crumbs Club Awards. On creation, it is set to five.</p>

<form encType="multipart/form-data" method="post" onSubmit={handleSubmit}>
<input type="text" id='description' placeholder={description === '' ? ('Small description') : (description)} onChange={handleDescription} />

<p className='email'>Edit the description that will be displayed to people that are searching for the club.</p>

<select onChange={handleCard}> 
<option id='none' value="0">Select Card</option>
<option value="crumbs">Crumbs</option>
<option value="pumpkin">Pumpkin</option>
<option value="cardinal">Cardinal</option>
<option value="night">Night</option>
<option value="pacific">Pacific</option>
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