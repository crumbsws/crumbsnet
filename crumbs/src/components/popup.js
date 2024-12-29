import { useState } from "react";
import ReactDOM from 'react-dom';
export function Popup(props) {

    const { children, status, bottom, Change } = props;

      //finish this first, then reply and socket notifications for messages
      if (!status) return null;

      return ReactDOM.createPortal(
          <div className='modal' id="modal" onClick={() => Change()}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  {children}
                  <p className="email">{bottom}</p>
              </div>
          </div>,
          document.body // This renders the modal directly in the body
      );

    
};

export function PopupTrigger(props) {

    const { children, content, bottom } = props;

    const [status, setStatus] = useState(false);
    function Change(){
        setStatus(!status);
    }
     
    return (
        <>
        <div onClick={Change}>
            { children }
        </div>
        <Popup status={status} Change={Change} bottom={bottom}>{content}</Popup>
        </>
        )
   
};

