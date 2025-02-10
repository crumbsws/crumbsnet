
import {PopupTrigger} from "../popup.js";
import { useState } from "react";
import Display from "../display.js";
import Loading from "../loading.js";
function TaskBar() {
    
  const [message, setMessage] = useState('');
  const [update, triggerUpdate] = useState('');
  const [value, setValue] = useState(<i class="fa-solid fa-paper-plane" ></i>);

  function handleMessage(e) {
    setMessage(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValue(<Loading />);

    const formData = new FormData();
    formData.append('message', message)
    try{
      const response = await fetch(process.env.REACT_APP_API_URL + '/diary.php', {
        credentials: 'include',
        method: 'POST',
        body: formData
      })
      const data = await response.json();
      

      if(data.state === 'success') {
        setMessage('');
        setValue(<i class="fa-solid fa-check"></i>);
        triggerUpdate((prev) => prev + 1);
      }
      else{
        setValue(<i class="fa-solid fa-xmark"></i>);        
      }
    }catch(err){
      console.log(err);
      setValue(<i class="fa-solid fa-xmark"></i>);
    }
  }




return (
<div className="taskbar">

    <PopupTrigger
    content={
      <>
      <h2>Update Diary</h2>
      <div className='publish post'>
        <form encType="multipart/form-data" method="post" >
          <input type="text" id="title" onChange={handleMessage} value={message} placeholder="What a sunny day! Right?" minLength="3" maxLength="28" required />
          <button type="submit" className="sendsubmit" onClick={handleSubmit} >{value}</button>
        </form>
      </div>
      </>
    }
    bottom="Your past diaries are not viewable by anyone unless an investigation is ongoing.">

    <button id="add"><i class="fa-solid fa-plus fa-2x"></i></button>
    </PopupTrigger>
    <Display type='diary' key={update}/>
</div>
);
};

export default TaskBar;