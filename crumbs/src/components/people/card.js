import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../loading.js';
import { Shorten } from '../utils.js';
import ProfilePicture from '../profilePicture.js';
import ClubTemplate from '../templates/clubTemplate.js';
 function Clubcard(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
      fetchClub()
    }, [props.user])

    const user = props.user;
    async function fetchClub() {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + '/getClub.php?user=' + user, {
          method: 'POST',
          credentials: 'include'
        });
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.log(error);
        
        
      }
    }
    if( data.length === 0){
      return (
        <Loading />
          
        
      );
    } 
    else
    {
  return (
    
    <ClubTemplate data={data} />
);
} 
}
  export default Clubcard;