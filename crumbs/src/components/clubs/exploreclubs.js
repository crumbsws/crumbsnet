import Display from "../display";
import Loading from '../loading.js';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { getItem, doSearch } from "../utils";
function ExploreClubs() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const type = 'clubs';

  useEffect(() => {
    doSearch(query, type, setData)
  }, [query])


  const club = useSelector((state) => state.user.clubs);
  console.log(club);

  function handleValue(e) {
    setQuery(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
  }




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
          {Object.values(club).length === 0 ? (
            <div className='post' id='tip'>
              <h1>Can't find anything?</h1>
              <p>Create your own club for your loved ones.</p>
              <Link to={`/dashboard`}><button>Create</button></Link>
            </div>
          ) : (

            <div className='post container'>
          {Object.values(club).map(({ name, founder, description, card }) => (          
              <div id="club-container" className='contained' key={name}>
                <Link to={`/clubs/${name}`} >
                <p>{name}</p>
                <p className="email">{description}</p>
                </Link>
              </div>
          ))}
            </div>
          )}

          <Display type='clubs' />
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

}
export default ExploreClubs;