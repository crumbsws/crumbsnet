import Loading from '../components/loading.js';
import React, { useState } from "react";
import{ Link } from "react-router-dom";
import Home from '../components/home.js';


function Login() {
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
      const response = await fetch(process.env.REACT_APP_API_URL + '/register-m.php', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          user: userName,
          password: userPass
        })
      });
      const data = await response.json();
      if(data.state === 'loggedin'){
        sessionStorage.setItem('loggedin', true)
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
    <Home />
    <form method="post" onSubmit={handleSubmit} >
      <input
        type="text"
        name="user"
        placeholder="Username"
        minLength={3}
        maxLength={16}
        value={userName}
        onChange={handleUserName}
      />
      <br />
      <input type="password" name="password" placeholder="Password" value={userPass} onChange={handleUserPass}/>
      <br />
      <p>I accept the <Link to="/tos"><strong>Terms of Service</strong></Link> of Crumbs</p>
      <br />
      <input type="submit" value="Register" />
    </form>
      <p className='result'>{message}</p>
    <p>Have an account? | <Link to="/login">Login</Link></p>
  </>;
  
};

export default Login;