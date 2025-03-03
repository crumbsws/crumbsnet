import Loading from '../../components/loading.js';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/pageWrapper.js';


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
    return  (
      <PageWrapper>
    <h1>Check your inbox</h1>
    <p className='email'>We have sent a 6-digit reset code to your mail address.</p>
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
      <input type="submit" value="Validate" />
    </form>
      <p className='result'>{message}</p>
      </PageWrapper>
      );
  
};

export default ResetPassword;