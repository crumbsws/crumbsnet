import { Link } from "react-router-dom";
import { setUserData, setUserClubs, setUserContacts } from '../redux/reducers/user.js';
import { store } from "../redux/store";
import { socket } from "../socket";
  function joinChannel(channel) {
    socket.emit('joinChannel', channel);
  }

  export async function getUserData(setLoading){
      try
      {
          
          const response = await fetch(process.env.REACT_APP_API_URL + '/getData.php?', {
              credentials: 'include',
              method: 'GET',
            });
          const data = await response.json();
          if(data.state === 'success'){
          store.dispatch(setUserData(data.data));
          store.dispatch(setUserClubs(data.clubs));
          store.dispatch(setUserContacts(data.contacts));
          
          data.contacts.forEach((element) => joinChannel(element.url));
          sessionStorage.setItem('loggedin', true);
          

          }
          
          setLoading(false);
          
         
    }
    catch(err)
    {
      console.log(err);
    } 
    }

export async function getProfile(user, setData) {
    
    try{
      const response = await fetch(process.env.REACT_APP_API_URL + '/getProfile.php', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          user: user
        })
      });
      const data = await response.json();
      setData(data);

    }
    catch(err){
      console.log(err);
    }
}

export async function doSearch(query, type, setData) {
  setData([]); //unline others, the body of the json changes so its better to keep this here
  try
  {
      
      const response = await fetch(process.env.REACT_APP_API_URL + '/search.php', {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({
              value: query,
              type: type
            })
        });
      const data = await response.json();
      setData(data);
      window.scrollTo({top: 0, behavior: 'smooth'});
}//the type is changed with a latency causing in type shift type shit -fixed with the setData on top
catch(err)
{
  console.log(err);
} 
}

export async function getClub(setData, setLoading){
  try
  {
      
      const response = await fetch(process.env.REACT_APP_API_URL + '/getClub.php', {
          credentials: 'include',
          method: 'POST',
          credentials: 'include'
        });
      const data = await response.json();
      setData(data);
      
      setLoading(false);
     
}
catch(err)
{
  console.log(err);
} 
}

export async function getOwnedClub(setData, setLoading){
  try
  {
      
      const response = await fetch(process.env.REACT_APP_API_URL + '/getClub.php?ownedBy=true', {
          credentials: 'include',
          method: 'POST',
          credentials: 'include'
        });
      const data = await response.json();
      setData(data);
      
      setLoading(false);
     
}
catch(err)
{
  console.log(err);
} 
}

export async function getOtherClub(club, setData, setLoading){
  try
  {
      
      const response = await fetch(process.env.REACT_APP_API_URL + '/getClub.php?name=' + club, {
          credentials: 'include',
          method: 'POST',
          credentials: 'include'
        });
      const data = await response.json();
      setData(data);
      
      setLoading(false);
     
}
catch(err)
{
  console.log(err);
} 
}

export async function getRequests( setData, setLoading){
  try
  {
      
      const response = await fetch(process.env.REACT_APP_API_URL + '/getRequests.php', {
          credentials: 'include',
          method: 'POST',
          credentials: 'include'
        });
      const data = await response.json();
      setData(data);

      setLoading(false);
     
}
catch(err)
{
  console.log(err);
} 
}
export async function getSystemMessages( setData, setLoading){
  try
  {
      
      const response = await fetch(process.env.REACT_APP_API_URL + '/getSystemMessages.php', {
          credentials: 'include',
          method: 'POST',
          credentials: 'include'
        });
      const data = await response.json();
      setData(data);

      setLoading(false);
     
}
catch(err)
{
  console.log(err);
} 
}

export function Linkify(text) {
  const urlRegex = /https?:\/\/[^\s]+/g;

  const parts = text.split(urlRegex);
  const links = [...text.matchAll(urlRegex)];

  return parts.reduce((acc, part, index) => {
    acc.push(part);
    if (index < links.length) {
      acc.push(
        <Link target="_blank" key={index} to={links[index][0]}>
          <p className='call-to-act'>
          {links[index][0]}
          </p>
        </Link>
      );
    }
    return acc;
  }, []);
}

export const isVideoFile = (filename) => {
  const videoExtensions = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'];
  const ext = filename.split('.').pop().toLowerCase();
  return videoExtensions.includes(ext);
};