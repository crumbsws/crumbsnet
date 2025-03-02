import{ useState } from "react";
import Loading from '../../components/loading.js';
import Uploader from "../../components/buttons/uploader.js";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/pageWrapper.js"; 

function Post() {
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [postCollect, setPostCollect] = useState('');
    const [postAccess, setPostAccess] = useState('');
    const [postPhoto, setPostPhoto] = useState(null);
    const [displayPhoto, setDisplayPhoto] = useState(null);
    const [value, setValue] = useState('Submit');
    let navigate = useNavigate();

    function removePostPhoto(){
      setDisplayPhoto(null);
      setPostPhoto(null);
    }
    function handlePostTitle(e){
        setPostTitle(e.target.value);
      }
      function handlePostBody(e){
        setPostBody(e.target.value);
      }
      function handlePostCollect(e){
        setPostCollect(e.target.value);
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
        setValue(<Loading />);

        const formData = new FormData();
        formData.append('title', postTitle)
        formData.append('body', postBody)
        formData.append('collect', postCollect)
        formData.append('access', postAccess)
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
          }
          else if(data.state === 'failed1'){
            setValue('Check your network, error code: 1');
          }
          else{
            setValue('Check your network, error code: 2');        
          }
        }catch(err){
          console.log(err);
          setValue('An error occured');

        }
      }

    return (

  <div className='publish post'>
  <form encType="multipart/form-data" method="post" onSubmit={handleSubmit}>
  <input type="text" name="title" id="title" value={postTitle} placeholder="Post title" minLength="3" maxLength="28" onChange={handlePostTitle} required />
  <input type="text" name="body" id="body" value={postBody} placeholder="Post itself" minLength="10" maxLength="200"  onChange={handlePostBody} required />
  <input type="text" name="collect" id="collect" value={postCollect} placeholder="Collection Name" maxLength="16"  onChange={handlePostCollect} required />

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
  <input type="submit" value={value}/>
  </form>
  </div>

  );
};

export default Post;
