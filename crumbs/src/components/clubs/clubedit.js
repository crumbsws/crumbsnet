import { useState, useEffect } from 'react'
import { getItem } from '../utils.js';
import Loading from '../loading.js';
import { Link } from 'react-router-dom';

function ClubEdit() {
  const [clubDescription, setClubDescription] = useState('');
  const [clubCard, setClubCard] = useState('');
  const [loading, setLoading] = useState(true);
  const [club, setClub] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getItem('club', setClub, setLoading);
  }, [])//olmaz bu böyle



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
      try{
        const response = await fetch(process.env.REACT_APP_API_URL + '/updateclub.php', {
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
if(loading){
  return (
    <Loading />
  );
} 
else
{
return (
<>

{club.map(({ name, founder, description, point }) =>(
<>
<h2>{name}</h2>
<p className='email'>Permanent</p>

<div className='statistics'>
<div className='statistics-content'>
<h1>{point}🧀</h1>
<p className='email'>Cheese points</p>
</div>
</div>
<form encType="multipart/form-data" method="post" onSubmit={handleSubmit}>
<input type="text" placeholder={description === '' ? ('Small description') : (description)} onChange={handleDescription}/><br/>
<select onChange={handleCard}> 
<option id='none' value="0">Select Card</option>
<option value="crumbs">Crumbs</option>
<option value="pumpkin">Pumpkin</option>
<option value="cardinal">Cardinal</option>
<option value="night">Night</option>
<option value="pacific">Pacific</option>
</select>
<p className='result'>{message}</p>
<input type='submit' value='Save'/>
</form>
</>
  ))}
  </>
  );
}};

export default ClubEdit;