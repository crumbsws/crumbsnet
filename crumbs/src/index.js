import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './pages/login.js';
import Header from './pages/header.js';
import Contributors from './pages/contributors.js';
import Home from './pages/home.js';
import Err from './pages/404.js';
import Register from './pages/register.js';
import Center from './pages/center.js';
import Publish from './pages/publish.js';
import Profile from './pages/profile.js';
import View from './pages/view.js';
import People from './pages/people.js';
import Discover from './pages/discover.js';
import Clubs from './pages/clubs.js';
import Tos from './pages/tos.js';
import Dashboard from './pages/dashboard.js';
import Notifications from './pages/notifications.js';

import Club from './pages/clubs/club.js';
import ClubGallery from './pages/clubs/clubgallery.js';
import Box from './pages/clubs/box.js';

import Main from './pages/people/main.js';
import Cards from './pages/people/cards.js';
import Friends from './pages/people/friends.js';


export default function App() {
  const state = sessionStorage.getItem('loggedin');
if(state === null){//bypassable, use a name instead
    return(
      
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Err />} />
        <Route path="/contributors" element={<Contributors />} />
        <Route path="/register" element={<Register />} />
        <Route path="/center" element={<Login />} />
        <Route path="/tos" element={<Tos />} />
        </Route>
        </Routes>
      </BrowserRouter>
      );
    }
    else {
    return(
      
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Header />}>
        <Route index element={<Center />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Err />} />
        <Route path="/contributors" element={<Contributors />} />
        <Route path="/register" element={<Register />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/notifications" element={<Notifications />} />

        <Route path="/people/:people" element={<People />} >
          <Route index element={<Main />} />
          <Route path='cards' element={<Cards />} />
          <Route path='friends' element={<Friends />} />    
        </Route>

        <Route path="/discover/:value?" element={<Discover />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tos" element={<Tos />} />

        <Route path="/clubs/:club?" element={<Clubs />} >
          <Route index element={<Club />} />
          <Route path='box' element={<Box />} />
          <Route path='gallery' element={<ClubGallery />} />
        </Route>

        </Route>
        </Routes>
      </BrowserRouter>
      );
    }
  
  }



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}><App /></Provider>);
