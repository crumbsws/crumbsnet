import Display from './display.js';
import { useState, useEffect } from 'react'
import { getItem } from '../components/utils.js';
import Loading from '../components/loading.js';
function Comments(props) {
{
  
  const [postPicture, setPostPicture] = useState(null);
  const [message, setMessage] = useState('');
  const [postBody, setPostBody] = useState('');
  const [displayPicture, setDisplayPicture] = useState(null);

    function removeDisplayPicture(){
      setDisplayPicture(null);
      setPostPicture(null);
    }
    function handlePostBody(e){
      setPostBody(e.target.value);
    }
    function handlePostPicture(e){
      const file = e.target.files[0];
      if(file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              setDisplayPicture(reader.result);
          }
          reader.readAsDataURL(file);
          setPostPicture(file);
          
      }
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      setMessage(<Loading />);

      const formData = new FormData();
      formData.append('title', '')
      formData.append('body', postBody)
      formData.append('collect', props.collect)
      formData.append('parent', props.parent)
      formData.append('conf', postPicture)
      try{
        const response = await fetch(process.env.REACT_APP_API_URL + '/publish.php', {
          credentials: 'include',
          method: 'POST',
          body: formData
        })
        const data = await response.json();
        

        if(data.state === 'success') {
          window.location.href = "/view/" + data.id;
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
    <div className='comment post'>
    <form method="post" onSubmit={handleSubmit}>
    <input type="text" name="comment" onChange={handlePostBody} placeholder='Leave a sprinkle...' required/>
    {displayPicture == null ? (<><input type="file" name="conf" id="conf" onChange={handlePostPicture}/><label htmlFor='conf' ><i class="fa-solid fa-image "></i></label></>) : (<><button id="conf" onClick={removeDisplayPicture}/><label htmlFor='conf' ><i class="fa-solid fa-xmark "></i></label></>)}
    <img src={displayPicture} alt=' ' />
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