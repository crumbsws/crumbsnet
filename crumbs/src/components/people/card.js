import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../loading.js';
 function Clubcard(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
      fetchClub()
    }, [props.user])

    var user = props.user;
    async function fetchClub() {
      try {
        const response = await fetch('http://localhost:8000/getclub.php', {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({
            user: user,

            })
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
    
    data.map(({ name, founder, description, card, point }) =>(
      <div className='post club' id={card}>
        <div id='club-content'>
          <h1>{name}</h1>
          <p>Club card of <strong>{user}</strong></p>
          <p className='email'>{founder}</p>
        </div>
      </div>
    ))
);
} 
}
  export default Clubcard;