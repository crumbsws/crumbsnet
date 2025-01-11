import Loading from '../../components/loading.js';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';



function ResetPassword() {

  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  let navigate = useNavigate();

  function handleCode(e){
    setCode(e.target.value);
  }
  function handleNewPassword(e){
    setNewPassword(e.target.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(<Loading />);

    try{
      const response = await fetch(process.env.REACT_APP_API_URL + '/resetPassword.php', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          code: code,
          password: newPassword

        })
      });
      const data = await response.json();
      if(data.state === 'success'){//dispatch

        navigate('/login');
      }
      else {
        setMessage(data.message);

      }
    }catch(err){
      setMessage('Check your network.');
      console.log(err);
    }

  }
    return  <>
    <h1>Check your inbox</h1>
    <form method="post" onSubmit={handleSubmit} >
        <input
          type="text"
          placeholder="Enter verification code"
          value={code}
          onChange={handleCode}
        />
        <input
          type="text"
          placeholder="Enter new password"
          value={newPassword}
          onChange={handleNewPassword}
        />
      <input type="submit" value="Send Code" />
    </form>
      <p className='result'>{message}</p>
  </>;
  
};

export default ResetPassword;