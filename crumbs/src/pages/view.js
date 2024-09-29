import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BackNav from '../components/backnav.js';
import Loading from '../components/loading.js';
import Comments from '../components/comments.js';
function View() { 
    const { id } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
      getPostData()
    }, [id])

    const getPostData = async () => {
        try
        {
            const response = await fetch(process.env.REACT_APP_API_URL + '/getpost.php', {
                credentials: 'include',
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({
                    id: id
                  })
              });
            const json = await response.json();
            setData(json);
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
        catch(err)
        {
                console.log(err);
        }
        
    }
    if( data.length === 0){
      return (
        <Loading />
          
        
      );
    } 
    else
    {

    return  (
        <>
        <BackNav/>
        {data.map(({ name, title, url, body, date, conf, collect, parent }) =>(
      <>
      <div className='post' id='view' key={url}>


      
      <meta name="author" content={name} />


      {title !== '' ? (
              <>
              <h2 id='big'>{title}</h2> 
              </>
          ) : (
            <></>
          )}
      
      <Link to={'../people/' + name}><p>by <strong>{name}</strong></p></Link> <h4 className='email'><strong>{name}</strong> • {date} • {collect}</h4>
      {conf ? (
            <img src={process.env.REACT_APP_API_URL + '/images/' + conf} alt='' />
          ) : (
            <></>
          )}
      <p>{body}</p>
      {title !== '' ? (
              <></> 
          ) : (
            <Link to={"/view/" + parent}><h4 className='call-to-act'>Visit Related post</h4></Link>
          )}
      </div>
      <Comments parent={url} collect={collect}/>
      </>
    
          ))}
          </>
);
}}


export default View;