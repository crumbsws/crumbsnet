import { useState } from "react";
function Popup(props) {
    const [status, setStatus] = useState(false);
    const toggle = localStorage.getItem(props.id);
    function Change(){
        setStatus(!status);
    }
    
      
if(toggle === 'false' && status === true) {
    return (
        <div className='modal' id="modal" style={status ? ({ display:'block'}) : ({display : 'none'})}>
            <div className="modal-content">
                <span onClick={Change}><i class="fa-solid fa-xmark"></i></span>
                <p>{props.children}</p>
                <img src={props.src} />
                <button onClick={Change}>Alright</button>
                <p className="email">{props.bottom}</p>
            </div>
        </div>
    );

    }
};

export default Popup;