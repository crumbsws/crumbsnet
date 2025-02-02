import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { store } from './redux/store.js';
import { setUserData, setUserClubs, setUserContacts } from './redux/reducers/user.js';
import { useEffect, useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { getUserData } from './components/utils.js';

import Welcome from './pages/welcome.js';
import Login from './pages/login.js';
import Header from './components/navigation/header.js';
import Contributors from './pages/contributors.js';
import Err from './pages/404.js';
import Register from './pages/register.js';
import Center from './pages/center.js';
import Publish from './pages/publish.js';
import Profile from './pages/profile.js';
import View from './pages/view.js';
import Reactions from './pages/reactions.js';
import People from './pages/people.js';
import Discover from './pages/discover.js';
import Clubs from './pages/clubs.js';
import Tos from './pages/tos.js';
import Dashboard from './pages/dashboard.js';
import Notifications from './pages/notifications.js';
import Direct from './pages/direct.js';

import Board from './pages/clubs/board.js';
import Posts from './pages/clubs/posts.js';
import ClubGallery from './pages/clubs/clubGallery.js';
import Box from './pages/clubs/box.js';

import Main from './pages/people/main.js';
import Cards from './pages/people/cards.js';
import Friends from './pages/people/friends.js';

import PrivateRoute from './privateroute.js';

import EnterInput from './pages/resetPassword/enterInput.js';
import ResetPassword from './pages/resetPassword/resetPassword.js';

import FirstLoader from './components/firstLoader.js';
import { setDirectActive, setRequestsActive } from './redux/reducers/inbox.js';
import { socket } from './socket.js';


export default function App() {
  const [loading, setLoading] = useState(true);
  const currentChannel = useSelector((state) => state.inbox.currentChannel);
  const directActive = useSelector((state) => state.inbox.directActive);
  const userData = useSelector((state) => state.user.data[0] || {});
  
  useEffect(() => {
    getUserData(setLoading);
    getUnseenRequests()
    getUnseenMessages()
  }, [])





  useEffect(() => {
    const handleNotifications = (newMessage) => {
    
      // Only show notifications for messages not from current user
      if (loading) return;//active check wont work
      if (userData?.name && newMessage.user !== userData.name) {
        // Only notify if message is from a different channel
        if (newMessage.channel !== currentChannel) {
          if (!directActive){
            store.dispatch(setDirectActive());
          }
          else {
            console.log('skip notif logic')
          }
            if (!document.hasFocus()) {
              document.title = 'New Message 🛎️';
              
              const resetTitle = () => {
                document.title = 'Crumbs';
                window.removeEventListener('focus', resetTitle);
              };
              window.addEventListener('focus', resetTitle);
            }        
          
  
        }
      }
  
  
    };
    socket.on('message', handleNotifications);
    //temp, broadcast the user from socketcontainer

    return () => {
      socket.off('message', handleNotifications);
    };
  }, [currentChannel, loading, directActive])

  function joinChannel(channel) {
    socket.emit('joinChannel', channel);
  }

    async function getUnseenRequests() {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + '/getRequests.php?status=unseen', {
          method: 'POST',
          credentials: 'include'
        });
        const data = await response.json();
        if(data.length > 0){
          store.dispatch(setRequestsActive());
        }
      } catch (error) {
        console.log(error);
        
        
      }
    }
    async function getUnseenMessages() {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + '/getMessages.php?status=unseen', {
          method: 'POST',
          credentials: 'include'
        });
        const data = await response.json();
        if(data.length > 0){
          store.dispatch(setDirectActive());
        }
      } catch (error) {
        console.log(error);
        
        
      }
    }






    if(loading) {
      return(<FirstLoader/>)
    }
    else {
    return(
 <>     
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Header />}>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Err />} />
        <Route path="/contributors" element={<Contributors />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tos" element={<Tos />} />
        <Route path="/welcome" element={<Welcome />} />

      
        <Route path="/resetPassword/" >
          <Route index element={<EnterInput />} />
          <Route path='resetPassword' element={<ResetPassword/>} />
        </Route>
    
    
      

        
        <Route index element={<PrivateRoute><Center /></PrivateRoute>} />
        <Route path="/publish" element={<PrivateRoute><Publish /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/view/:id" element={<PrivateRoute><View /></PrivateRoute>} />
        <Route path="/reactions/:id" element={<PrivateRoute><Reactions /></PrivateRoute>} />
        <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
        <Route path="/direct/:channel?" element={<PrivateRoute><Direct /></PrivateRoute>} />
        <Route path="/people/:people" element={<PrivateRoute><People /></PrivateRoute>} >
          <Route index element={<PrivateRoute><Main /></PrivateRoute>} />
          <Route path='cards' element={<PrivateRoute><Cards /></PrivateRoute>} />
          <Route path='friends' element={<PrivateRoute><Friends /></PrivateRoute>} />    
        </Route>

        <Route path="/discover/:value?" element={<PrivateRoute><Discover /></PrivateRoute>} />
        <Route path="/dashboard/:club?" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

        <Route path="/clubs/:club?" element={<PrivateRoute><Clubs /></PrivateRoute>} >
          <Route index element={<PrivateRoute><Board /></PrivateRoute>} />
          <Route path='posts' element={<PrivateRoute><Posts/></PrivateRoute>} />
          <Route path='box' element={<PrivateRoute><Box /></PrivateRoute>} />
          <Route path='gallery' element={<PrivateRoute><ClubGallery /></PrivateRoute>} />
        </Route>

        </Route>
        
        </Routes>
      </BrowserRouter>
      </>
    );
    }
  }
  



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}><App /></Provider>);
