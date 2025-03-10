
import React, { useState } from "react";
import{ Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Loading from '../components/loading.js';
import { store } from "../redux/store.js";
import PageWrapper from "../components/pageWrapper.js";
import { getUserData } from "../components/utils.js";

function Login() {
  const dispatch = useDispatch();
  const [userPass, setUserPass] = useState('');
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  let navigate = useNavigate();




  function handleUserName(e){
    setUserName(e.target.value);
  }
  function handleUserPass(e){
    setUserPass(e.target.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(<Loading />);

    try{
      const response = await fetch(process.env.REACT_APP_API_URL + '/login-m.php', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          user: userName,
          password: userPass
        })
      });
      const data = await response.json();
      if(data.state === 'loggedin'){
        await getUserData();
          navigate('/');
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
    
    <h1>Login</h1>
    <form method="post" onSubmit={handleSubmit} >
      <input
        type="text"
        name="user"
        placeholder="Username"
        value={userName}
        onChange={handleUserName}
      />
      <br />
      <input type="password" name="password" placeholder="Password" value={userPass} onChange={handleUserPass}/>
      <br />
      <input type="submit" value="Login" />
    </form>
    <p className='result'>{message}</p>
    <p>New to crumbs? | <Link to="/register">Register</Link></p>
    <p>Forgot password? | <Link to="/resetPassword">Reset</Link></p>
    </PageWrapper>
  );
  
};

export default Login;