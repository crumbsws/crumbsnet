import Loading from "../loading.js";
import { useEffect, useState } from 'react'
import { getItem } from "../utils.js";
function ClubButton(props) {
    const [loading, setLoading] = useState(true);
    const [club, setClub] = useState('');
    const [value, setValue] = useState('Switch');
    useEffect(() => {
        getItem('club', setClub, setLoading);
      }, [])

    const clubProp = props.club;
    const name = club.length > 0 ? club[0].name : null;

    async function handleJoin() {
        setValue(<Loading />);

        try{
          const response = await fetch(process.env.REACT_APP_API_URL + '/joinclub.php', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
              club: clubProp
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

if(!loading) {
return (
    <>
    {clubProp === name && club.length !== 0 ? (<></>) : (
    <div className='post'>
    <p>Is <strong>{clubProp}</strong> the right club for you?</p>
    <button onClick={handleJoin}>{value}</button>
    </div>
    )}
    </>
)
}
};

export default ClubButton;