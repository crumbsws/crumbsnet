import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getItem } from '../../components/utils.js';
import Loading from '../../components/loading.js';
import AddButton from '../../components/buttons/addbutton.js';
import Display from '../../components/display.js';
function Friends() {
  const [user, setUser] = useState('');
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingSent, setLoadingSent] = useState(true);
  const [data, setData] = useState([]);
  
  const {people} = useParams();

  useEffect(() => {
    getItem('user', setUser, setLoadingUser);
    getItem('requests', setData, setLoadingSent);
  }, [people])

 

  if( loadingUser || loadingSent ){
    return (
      <Loading /> 
    );
  } 
  else
  {
  return  (
  <>
  {user === people || data.length !== 0 ? (<></>) : (
    
    <div className='post'>
    <p>Send a friend request to this user.</p>
    <AddButton user={people} />
    </div>
  )}
  
  <Display type='friends' user={people}/>
  </>
  );
}};

  export default Friends;