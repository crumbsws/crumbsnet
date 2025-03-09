import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getRequests } from '../../components/utils.js';
import { useSelector } from 'react-redux';
import Loading from '../../components/loading.js';
import AddButton from '../../components/buttons/addButton.js';
import Display from '../../components/display.js';
function Friends() {
  const user =  useSelector((state) => state.user.data[0].name);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  
  const {people} = useParams();

  useEffect(() => {

    getRequests(setData, setLoading);
  }, [people])

  const hasSentRequest = data.some(request => 
    (request[1] === user && request[2] === people) || (request[1] === people && request[2] === user)
  ); 

  if( loading ){
    return (
      <Loading /> 
    );
  } 
  else
  {
  return  (
  <>
  {user === people || hasSentRequest ? (<></>) : (
    
    <div className='post'>
    <p>Send a friend request to this user.</p>
    <AddButton user={people} />
    </div>
  )}

      
        <Display type='friends' user={people} />
      

  </>
  );
}};

  export default Friends;
