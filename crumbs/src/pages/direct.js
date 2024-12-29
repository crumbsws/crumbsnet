
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { doSearch } from '../components/utils';

import SocketContainer from '../components/direct/socketcontainer';
function Direct() {

  const type = 'people';
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  const userData = useSelector((state) => state.user.data);
  const user = userData[0].name;

  useEffect(() => {
      doSearch(query, type, setData)
    }, [query])

    const {channel} = useParams();






  function handleValue(e){
    setQuery(e.target.value);
  }
  function handleSubmit(e){
    e.preventDefault();
  }
  const navigate = useNavigate();
  async function prepareChannel(user){
    try{
      const response = await fetch(process.env.REACT_APP_API_URL + '/preparechannel.php', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          user: user
        })
      });
      const data = await response.json();
      if(data.state === 'success') {
        navigate('/direct/' + data.url);
      }
        
    }catch(err){
      console.log(err);
    }
  }

//pass all the data directly to socketcontsiner. no getChannel details
  return  <>
  {channel ? (
  <>
  <SocketContainer channel={channel}/>
  </>

  ) : (
    <>
    <div id='tip' className='post'>
    <h1 className='decorated'><i class="fa-solid fa-circle"></i> {user}</h1>
    <p className='email'>This is a beta preview, definitely not the final version.</p>
    </div>
      <form  onSubmit={handleSubmit}>
      <input type="search" id="wide" value={query} placeholder="Start a conversation" onChange={handleValue} />
      {query && data.map(({ name, home, relation }) => (
                  
                    <div className='post' onClick={() => prepareChannel(name)}>
                      <h2>{name}</h2> 
                      <p className='email'>{home} ︱ {relation}</p>
                    </div>
                  
                ))}
      </form>
        {!query ? (
          <>        
          <p>Not Implemented</p>
          </>
        ) : (<></>)}
      
    </>
  )}
  </>
  };

  export default Direct;
