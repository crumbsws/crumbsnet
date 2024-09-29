import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './pages/login.js';
import Header from './pages/header.js';
import Contributors from './pages/contributors.js';
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

import PrivateRoute from './privateroute.js';

export default function App() {
//bypassable, use a name instead
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

      
    
    
    
      

        
        <Route index element={<PrivateRoute><Center /></PrivateRoute>} />
        <Route path="/publish" element={<PrivateRoute><Publish /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/view/:id" element={<PrivateRoute><View /></PrivateRoute>} />
        <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />

        <Route path="/people/:people" element={<PrivateRoute><People /></PrivateRoute>} >
          <Route index element={<PrivateRoute><Main /></PrivateRoute>} />
          <Route path='cards' element={<PrivateRoute><Cards /></PrivateRoute>} />
          <Route path='friends' element={<PrivateRoute><Friends /></PrivateRoute>} />    
        </Route>

        <Route path="/discover/:value?" element={<PrivateRoute><Discover /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

        <Route path="/clubs/:club?" element={<PrivateRoute><Clubs /></PrivateRoute>} >
          <Route index element={<PrivateRoute><Club /></PrivateRoute>} />
          <Route path='box' element={<PrivateRoute><Box /></PrivateRoute>} />
          <Route path='gallery' element={<PrivateRoute><ClubGallery /></PrivateRoute>} />
        </Route>

        </Route>
        
        </Routes>
      </BrowserRouter>
      </>
    );
    }
  
  



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}><App /></Provider>);
