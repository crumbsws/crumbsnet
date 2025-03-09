import Display from './display.js';
import { useState} from 'react'
import Uploader from './buttons/uploader.js';
import Loading from '../components/loading.js';
import { useNavigate } from 'react-router-dom';
function Comments(props) {
{
  
  const [postPhoto, setPostPhoto] = useState(null);
  const [message, setMessage] = useState('');
  const [postBody, setPostBody] = useState('');
  const [displayPhoto, setDisplayPhoto] = useState(null);
  const [postAccess, setPostAccess] = useState('');
  let navigate = useNavigate();

    function removePostPhoto(){
      setDisplayPhoto(null);
      setPostPhoto(null);
    }
    function handlePostBody(e){
      setPostBody(e.target.value);
    }
    function handlePostAccess(e){
      setPostAccess(e.target.value);
    }
    function handlePostPhoto(e){
      const file = e.target.files[0];
      if(file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              setDisplayPhoto(reader.result);
          }
          reader.readAsDataURL(file);
          setPostPhoto(file);
          
      }
    }
    

    const handleSubmit = async (e) => {
      e.preventDefault();
      setMessage(<Loading />);

      const formData = new FormData();
      formData.append('category', 'post')
      formData.append('title', '')
      formData.append('body', postBody)
      formData.append('collect', props.collect)
      formData.append('access', postAccess)
      formData.append('parent', props.parent)
      formData.append('conf', postPhoto)
      try{
        const response = await fetch(process.env.REACT_APP_API_URL + '/publish.php', {
          credentials: 'include',
          method: 'POST',
          body: formData
        })
        const data = await response.json();
        

        if(data.state === 'success') {
          navigate('/view/' + data.id);
          setMessage('');
        }
        else if(data.state === 'failed1'){
          setMessage('Check your network, error code: 1');
        }
        else{
          setMessage('Check your network, error code: 2');        
        }
      }catch(err){
        console.log(err);
        setMessage('An error occured' + err);

      }
    }

  return (
    <>
    <div className='publish post'>
    <form encType="multipart/form-data" method="post" onSubmit={handleSubmit}>
    <input type="text" name="comment" onChange={handlePostBody} value={postBody} placeholder='Post your reply' required/>

    <div>
  {Uploader(displayPhoto, handlePostPhoto, removePostPhoto)}
            <select onChange={handlePostAccess} id='access'>
            
              <option value="public">Public</option>
              <option value="friends">Friends</option>
            </select>
            </div>

          <div>
            {displayPhoto ? <img src={displayPhoto} alt=' ' /> : <></>}
          </div>


    <input type="submit" name="" value="Post" />
    </form>
    <p className='result'>{message}</p>
    </div>
    <div className='border-left'>
    <Display type='posts' parent={props.parent} />
    </div>
    </>
    );
  };
};
  
  export default Comments;