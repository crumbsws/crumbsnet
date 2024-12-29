import ClubSetup from '../components/clubs/clubsetup.js';
import { useEffect, useState } from 'react';
import { getOwnedClub } from '../components/utils.js';
import Loading from '../components/loading.js';
import ClubEdit from '../components/clubs/clubedit.js';
import { useSelector } from 'react-redux';

function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [club, setClub] = useState([]);
    const user =  useSelector((state) => state.user.data[0].name);
    useEffect(() => {
        getOwnedClub(setClub, setLoading);
      }, [])


    if( loading ){
      return (
        <Loading />
          
        
      );
    } 
    else
    { 
  return  (
  <>
    {club.length !== 0 ? //its null getItem only brings the club name -f
        (
            <>
            <ClubEdit club={club} />
            </>
        ) : (
            <>
           
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