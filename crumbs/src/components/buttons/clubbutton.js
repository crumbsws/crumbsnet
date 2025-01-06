import Loading from "../loading.js";
import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";


function ClubButton(props) {
    const [value, setValue] = useState('Join');

    const club = props.club;
    
    const currentClubs =  useSelector((state) => state.user.clubs);
    const dispatch = useDispatch();
    const isClubJoined = Object.values(currentClubs).some(obj => obj.name === club);

    async function handleJoin() {
        setValue(<Loading />);

        try{
          const response = await fetch(process.env.REACT_APP_API_URL + '/joinClub.php', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
              club: club
            })
          });
          const data = await response.json();
          if(data.state === 'success'){

            setValue('Joined');
            
          }
          else {
            setValue(data.message);
    
          }
        }catch(err){
          setValue('Network error.');
          console.log(err);
        }
    }


return (
    <>
    {isClubJoined  ? (
    <>
    </>
    ) : (
    <div className='post'>
    <p>Is <strong>{club}</strong> the right club for you?</p>
    <button onClick={handleJoin}>{value}</button>
    </div>
    )}
    </>
)

};

export default ClubButton;