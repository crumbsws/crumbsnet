
import React, { useState } from "react";
import{ Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/reducers/user.js';
import store from '../redux/store.js';
import Loading from '../components/loading.js';
import Home from '../components/home.js';

function Login() {
  const dispatch = useDispatch();
  const [userPass, setUserPass] = useState('');
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');

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
        sessionStorage.setItem('loggedin', true);
        dispatch(setUser(userName));
        window.location.href = "/";
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
    <Home/>
    <form method="post" onSubmit={handleSubmit} >
      <input
        type="text"
        name="user"
        placeholder="Username / Mail"
        minLength={3}
        maxLength={16}
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
  </>;
  
};

export default Login;