import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../../components/loading";
import Display from "../../components/display";
function Box() {

  const [value, setValue] = useState('Publish');
  const [note, setNote] = useState('');

  const {club} = useParams();

  const user =  useSelector((state) => state.user.data[0].name);

    function handleNote(e) {
      setNote(e.target.value);
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      setValue(<Loading />);

      const formData = new FormData();
      formData.append('note', note)
      formData.append('club', club)
      try{
        const response = await fetch(process.env.REACT_APP_API_URL + '/note.php', {
          credentials: 'include',
          method: 'POST',
          body: formData
        })
        const data = await response.json();
        

        if(data.state === 'success') {
          setValue('Note Added');
	        setNote('');
        }
      }catch(err){
        console.log(err);
        setValue('An error occured');

      }
    }



    const currentClubs =  useSelector((state) => state.user.clubs);
    const isClubJoined = Object.values(currentClubs).some(obj => obj.name === club);

  return (
      <>
        {isClubJoined ? (
          <>
                  <div className="post tip">
                  <h1>Drop Notes</h1>
                  <p>But your name will stay hidden.</p>
        
                  
                </div>
          <div className='box post'>
            <form method="post">
              <input type="text" onChange={handleNote} value={note} placeholder="Drop a new note..." maxLength='25' required/>
              <input type="submit" value={value} onClick={handleSubmit}/>
            </form>
          </div>
          </>
        ) : (<></>)}
        
        <div className='post container' >  
        <Display type='gossip' club={club}/>
        </div>
      </>
    )
  }


  export default Box;
