import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getItem } from './utils.js';
import Loading from './loading.js';
 function Display(props) {

    const [data, setData] = useState([]);
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      fetchData()
      getItem('user', setUser, setLoading)
    }, [props.parent, props.user])


    let type = props.type;
    let parent = props.parent;
    let username = props.user;
    let club = props.club;

    async function fetchData() {

      try {
        const response = await fetch(process.env.REACT_APP_API_URL + '/display.php', {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({
            user: username,
            parent: parent,
            club: club,
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


if(type === 'posts')
  {
  return (
    
    data.map(({ name, title, url, body, date, conf, collect }) =>(
      <>
      <Link to={"/view/" + url} key={url}>
      <div className='post'>
      {title !== '' ? (
              <h2>{title}</h2> 
          ) : (
            <Link to={"/people/" + name} ><p>Reply from <strong>{name}</strong></p></Link>
          )}
      <p className='email' >{name}</p>
      {conf ? (
            <img src={process.env.REACT_APP_API_URL + '/images/' + conf} alt='' />
          ) : (
            <></>
          )}
      <p>{body}</p>
      </div>
      </ Link>
      </>
    ))
);
}
else if(type === 'clubs') 
  {
  return (
    data.map(({ name, founder, description, card, point }) =>(
      <>
      <Link to={"/clubs/" + name} key={name}>
      <div className='post club' id={card}>
      <div id='club-content'>
        <h1>{name}</h1>
        <p>{point} ︱{description}</p>
        <p className='email'>{founder}</p>
      </div>
      </div>
      </ Link>
      </>
    ))    
  );
  }
else if(type === 'friends') 
  {
  return (
    data.map(({ name, point, description, club, photo }) =>(
      <>
      
      <div className='post'  key={name}>
      <Link to={"/people/" + name}>
      <p>{point}︱<strong>{name}</strong></p>
      </ Link>
      
      </div>
      </>
    ))    
  );
  }
  else if(type === 'gossip') 
    {
    return (
       
      data.map(({ note }) =>(
        <>
        <div className='gossip' key={note}>
        <p>{note}</p>
        </div>
        
        </>
      ))
       
    );
    }
    else if(type === 'gallery') 
      {
      return (
         
        data.map(({ conf, url }) =>(
          <>
          
          <div className='gallery' key={conf}>
          <Link to={'/view/' + url}>
          <img src={process.env.REACT_APP_API_URL + '/images/' + conf} alt='' />
          </Link>
          </div>
          
          
          </>
        ))
          
      );
      }

} 
}
  export default Display;