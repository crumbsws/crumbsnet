import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../loading.js';
import ProfilePicture from '../profilePicture.js';
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
    
    data.map(({ name, founder, description, card, point, photo }) =>(
      <>
            <Link to={"/clubs/" + name} key={name}>
                <div className='post club' id={card}>
                  <div className='club-content'>
                    <ProfilePicture src={process.env.REACT_APP_CDN_URL + '/club-images/' + photo} size='m' />
                    <div>
                    <h1 className='decorated'>{name}</h1>
                    <p>{description}</p>
                    </div>
                  </div>
                </div>
              </ Link>
    </>
    ))
);
} 
}
  export default Clubcard;