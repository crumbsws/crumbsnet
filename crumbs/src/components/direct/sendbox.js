import { useState} from 'react';

import { socket } from '../../socket';

function SendBox(props) {

  const channel = props.channel;
  const user = props.user;
  const reply = props.reply;
  const setReply = props.setReply;
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);



  function handleFileButtonClick() {
    document.getElementById('file').click();
  }

  function handleFileSelect(e) {
    const selectedFiles = Array.from(e.target.files); 
    
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    
     }

  function removeFile(index) {
      setFiles(files.filter((_, i) => i !== index));
    }

    function handleSubmit(e) {
      e.preventDefault();
      if (message) {
        socket.timeout(5000).emit('message', { user, channel, message, reply });
        setMessage('');
        setReply('');
      }
    }
    function handleMessage(e) {
      setMessage(e.target.value);
      socket.emit('typing_start', { user, channel});    
    }
    function handleMessageBlur(e) {
      socket.emit('typing_stop', { user, channel});   
    }
    



      return (
  <div className='sendform'>
          
            {reply ? (
              <div className='reply-container'>
              <div className='reply' id='received'>
                <span onClick={() => setReply('')} style={{ cursor: 'pointer' }}>
                  <i className="fa-solid fa-times"></i>
                </span>
                <strong> Replying to</strong> {reply}
                
              </div>
              </div>
            ) : null}
          

          
            {files ? (
              <div className='file-container'>
          {files.map((file, index) => (

          <div className='file' key={index}>
          <span className='remove' onClick={() => removeFile(index)} style={{ cursor: 'pointer' }}><i class="fa-solid fa-xmark"></i></span>
        {file.type.startsWith("image/") ? (
          <img src={URL.createObjectURL(file)}></img>
          ) : (
          <div>
          <p className='email'>{file.name}</p>
          </div>
          )}



            
          </div>
          ))}
          </div>
            ) : null}
          
  <form  onSubmit={handleSubmit} encType="multipart/form-data">
    <div className='sendbox'>
    <input type='text' onChange={handleMessage} onBlur={handleMessageBlur} value={message} className="sendtext" placeholder="Type your message..."/>
    <div>
    <input type="file" name='file' id="file" onChange={handleFileSelect} multiple/>
    
    <button className="sendsubmit" onClick={handleFileButtonClick}><i className="fa-solid fa-paperclip" /></button>
    <button type="submit" className="sendsubmit" ><i className="fa-solid fa-paper-plane" /></button>
    </div>
    </div>
  </form>
  </div>
      )
  
};

export default SendBox;