import Display from "../display.js";
import Loading from '../loading.js';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { getItem, doSearch, Shorten } from "../utils.js";
import ProfilePicture from "../profilePicture.js";
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
            <div className='post' id='tip'>
              <h1>Your clubs</h1>
              <p>Clubs that you are a part of.</p>
            </div>
          )}

          {Object.values(club).map(({ name, founder, description, card, photo }) => (
            <>
              <Link to={"/clubs/" + name} key={name}>
                <div className='post club' id={card}>
                  <div className='club-content'>
                    <ProfilePicture src={process.env.REACT_APP_CDN_URL + '/club-images/' + photo} size='m' />
                    <div>
                    <h1 className='decorated'>{name}</h1>
                    <p>{Shorten(description, 50)}</p>
                    </div>
                  </div>
                </div>
              </ Link>
            </>
          ))}
        </>
      ) : (
        <>
          {data.map(({ name, founder, description, card, photo }) => (
            <>
            <Link to={"/clubs/" + name} key={name}>
                <div className='post club' id={card}>
                  <div className='club-content'>
                    <ProfilePicture src={process.env.REACT_APP_CDN_URL + '/club-images/' + photo} size='m' />
                    <div>
                    <h1 className='decorated'>{name}</h1>
                    <p>{Shorten(description, 50)}</p>
                    </div>
                  </div>
                </div>
              </ Link>
            </>
          ))}
        </>
      )}
    </>
  )

}
export default ExploreClubs;