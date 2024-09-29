import ClubSetup from '../components/clubs/clubsetup.js';
import { useEffect, useState } from 'react';
import { getItem } from '../components/utils.js';
import Popup from '../components/popup.js';
import Loading from '../components/loading.js';
import ClubEdit from '../components/clubs/clubedit.js';

function Dashboard() {
    const [loadingClub, setLoadingClub] = useState(true);
    const [loadingUser, setLoadingUser] = useState(true);
    const [club, setClub] = useState([]);
    const [user, setUser] = useState('');
    useEffect(() => {
        getItem('club', setClub, setLoadingClub);
        getItem('user', setUser, setLoadingUser);
      }, [])


    const founder = club.length > 0 ? club[0].founder : null;

    if( loadingClub || loadingUser){
      return (
        <Loading />
          
        
      );
    } 
    else
    { 
  return  (
  <>
    {user === founder ? //its null getItem only brings the club name -f
        (
            <>
            <ClubEdit />
            </>
        ) : (
            <>
            <Popup heading='New Feature' content='We added the clubs feature' bottom='Crumbs Dev Team' source='https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmdyYzJkNGk2bWV2MmZtODNnZGUwNGhtZ2Y4eHlvZmZ1NWJ0M3NtbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/b2VxjMhx8nnjy/giphy.gif'/>
            <ClubSetup/>
            {console.log(club)}
            
            </>
        ) 
    }
  </>
  )
}

  };

  export default Dashboard;