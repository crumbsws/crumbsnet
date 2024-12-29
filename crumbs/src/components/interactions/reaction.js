import {PopupTrigger} from "../popup.js";
import { useState } from "react";

function Reaction(props) {
  const url = props.url;
  const [value, setValue] = useState(0);
  const handleValue = (e) => {
    setValue(e.target.value);
  };

  async function handleSubmit() {

    try {
      const response = await fetch(process.env.REACT_APP_API_URL + '/reactPost.php', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          url: url,
          value: value 
        })
      });
      const data = await response.json();
    } catch (error) {
      console.log(error);


    }
  }
  return (
    <PopupTrigger
    content={
      <>
      <h2>React</h2>
      <div className='publish post'>
      <input className='slider' value={value} type="range" min="1" max="100" onMouseUp={handleSubmit} onTouchEnd={handleSubmit} onChange={handleValue} style={{
          background: `linear-gradient(to right, var(--brand) ${value}%, var(--froutline) ${value}%)`,
        }}/>
      </div>
      </>
    }
   >

    <button className='interaction'><i class="fa-solid fa-plus"></i> React</button>
    </PopupTrigger>
  
  );
  }
  export default Reaction;