import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../loading';
 function Clubs(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
      fetchdata()
    }, [props.parent, props.user])

    async function fetchdata() {
      let type = 'clubs';
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + '/display.php', {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({
            type: type
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
      <>
      <Link to={"/clubs/" + name} key={name}>
      <div className='post'>
        <h1>{name}</h1>
      </div>
      </ Link>
      </>
    ))
);
} 
}
  export default Clubs;