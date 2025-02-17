import Loading from "../loading.js";
import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { PopupTrigger } from "../popup.js";
import { useNavigate } from "react-router-dom";

function ClubButton(props) {
    const [value, setValue] = useState('Join');
    const navigate = useNavigate();
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

    async function handleLeave() {
      setValue(<Loading />);

      try{
        const response = await fetch(process.env.REACT_APP_API_URL + '/leaveClub.php', {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({
            club: club
          })
        });
        const data = await response.json();
        if(data.state === 'success'){

          setValue('Left');
          navigate('/clubs');
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
    <div className='post'>
    <p>You are a member of <strong>{club}</strong></p>
    
    <PopupTrigger
    content={
      <>
      <h3>{club}</h3>
      <p class="danger-zone" onClick={handleLeave}>Leave</p>
      </>
      
    }
    >

    <button>Manage membership</button>
    </PopupTrigger>
    </div>
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