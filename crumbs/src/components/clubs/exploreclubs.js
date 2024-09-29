import Display from "../display";
import Loading from '../loading.js';
import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { getItem, doSearch } from "../utils";
function ExploreClubs() {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [club, setClub] = useState('');
    const type = 'clubs';

    useEffect(() => {
      getItem('club', setClub, setLoading);
      doSearch(query, type, setData)
    }, [query])
    const name = club.length > 0 ? club[0].name : null;

    function handleValue(e){
      setQuery(e.target.value);
    }
    function handleSubmit(e){
      e.preventDefault();
    }
    


    if(loading){
      return (
        <Loading />
          
        
      );
    } 
    else
    {
    return (
        <>
          <form onSubmit={handleSubmit}>
            <input 
              type='search' 
              placeholder='Search for Clubs' 
              id='wide'
              value={query} 
              onChange={handleValue} 
            />
          </form>
      
          {query === '' ? (
            <>
                {name ? (
                  <div className='post' id='tip'>
                    <h1>View your Club</h1>
                    <p>It looks like you are already a part of <strong>{name}</strong>.</p>
                    <Link to={`/clubs/${name}`}><button>Jump</button></Link>
                    </div>
                ) : (
                  <div className='post' id='tip'>
                    <h1>Can't find anything?</h1>
                    <p>Create your own club for your loved ones.</p>
                    <Link to={`/dashboard`}><button>Create</button></Link>
                    </div>
                )}
              
              <Display type='clubs'/>
            </>
          ) : (
            <>
            {data.map(({ name, founder, description, card }) => (
              <Link to={`/clubs/${name}`} key={name}>
                <div className='post club' id={card}>
                  <div id='club-content'>
                    <h1>{name}</h1>
                    <p>{description}</p>
                    <p className='email'>{founder}</p>
                  </div>
                </div>
              </Link>
            ))}
            </>
          )}
        </>
      )
      
}}
export default ExploreClubs;