import { useState, useEffect } from "react";
import { getItem } from "../../components/utils";
import { useParams } from "react-router-dom";
import Loading from "../../components/loading";
import Display from "../../components/display";
function Box() {
  const [loading, setLoading] = useState(true);
  const [clubCurrent, setClubCurrent] = useState([]);
  const [value, setValue] = useState('Publish');
  const [note, setNote] = useState('');

  const {club} = useParams();

  useEffect(() => {
      getItem('club', setClubCurrent, setLoading);
    }, [club])

    function handleNote(e) {
      setNote(e.target.value);
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      setValue(<Loading />);

      const formData = new FormData();
      formData.append('note', note)
      try{
        const response = await fetch(process.env.REACT_APP_API_URL + '/note.php', {
          credentials: 'include',
          method: 'POST',
          body: formData
        })
        const data = await response.json();
        

        if(data.state === 'success') {
          setValue('Note Added')
        }
      }catch(err){
        console.log(err);
        setValue('An error occured');

      }
    }



  const name = clubCurrent.length > 0 ? clubCurrent[0].name : null;

  return (
      <>
        <div className="post tip">
          <h1>Drop Notes</h1>
          <p>But your name will stay hidden.</p>

          
        </div>
        {club === name && clubCurrent.length !== 0 && !loading ? (
          <div className='box post'>
            <form method="post">
              <input type="text" onChange={handleNote} placeholder="Drop a new note..." maxLength='25' required/>
              <input type="submit" value={value} onClick={handleSubmit}/>
            </form>
          </div>
        ) : (<></>)}
        
        <div className='post container' >  
        <Display type='gossip' club={club}/>
        </div>
      </>
    )
  }


  export default Box;