import{ useState } from "react";
import Loading from '../components/loading.js';
import Uploader from "../components/buttons/uploader.js";

function Publish() {
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [postCollect, setPostCollect] = useState('');
    const [postPhoto, setPostPhoto] = useState(null);
    const [displayPhoto, setDisplayPhoto] = useState(null);
    const [value, setValue] = useState('Submit');


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
        formData.append('conf', postPhoto)
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
    <>

<h2><i class="fa-solid fa-pen-to-square"></i> Publish Post</h2>
  <div className='publish post'>
  <form encType="multipart/form-data" method="post" onSubmit={handleSubmit}>
  <input type="text" name="title" id="title" placeholder="Post title" minLength="6" maxLength="28" onChange={handlePostTitle} required /><br/>
  <input type="text" name="body" id="body" placeholder="Post itself" minLength="10" maxLength="90"  onChange={handlePostBody} required /><br/>
  <input type="text" name="collect" id="collect" placeholder="Collection Name" maxLength="16"  onChange={handlePostCollect} required /><br/>
  {Uploader(displayPhoto, handlePostPhoto, removePostPhoto)}<br/><br/><br/>
  <div>
  <img src={displayPhoto} alt=' ' />
  </div><br/>
  <input type="submit" value={value}/>
  </form>
  </div>



</>
  );
};

export default Publish;