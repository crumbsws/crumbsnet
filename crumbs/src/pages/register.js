import Loading from '../components/loading.js';
import React, { useState } from "react";
import{ Link } from "react-router-dom";
import { store } from '../redux/store.js';
import { setUserData } from '../redux/reducers/user.js';
import { useNavigate } from 'react-router-dom';



function Login() {
  const [userPass, setUserPass] = useState('');
  const [userName, setUserName] = useState('');
  const [userMail, setUserMail] = useState('');
  const [message, setMessage] = useState('');
  let navigate = useNavigate();

  function handleUserName(e){
    setUserName(e.target.value);
  }
  function handleUserPass(e){
    setUserPass(e.target.value);
  }
  function handleUserMail(e){
    setUserMail(e.target.value);
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
          password: userPass,
          email: userMail
        })
      });
      const data = await response.json();
      if(data.state === 'loggedin'){//dispatch
        sessionStorage.setItem('loggedin', true)
        store.dispatch(setUserData(data.data));
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
    return  <>
    <h1>Register</h1>
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
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={userMail}
          onChange={handleUserMail}
        />
      <input type="password" name="password" placeholder="Password" value={userPass} onChange={handleUserPass}/>
      <p>I accept the <Link to="/tos"><strong>Terms of Service</strong></Link> of Crumbs</p>
      <input type="submit" value="Register" />
    </form>
      <p className='result'>{message}</p>
    <p>Have an account? | <Link to="/login">Login</Link></p>
  </>;
  
};

export default Login;