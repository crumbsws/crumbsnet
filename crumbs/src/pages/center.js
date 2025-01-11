import React from 'react';
import Display from '../components/display.js';
import { getItem } from '../components/utils.js';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

function Center() {

  const userData = useSelector((state) => state.user.data);
  const description = userData[0].description;
  const home = userData[0].home;
  const relation = userData[0].relation;


    return (
              <>
                {description && home && relation ? (
                <div class="post" id="tip">
                  <h1>Start Publishing</h1>
                  <p>Make a move, share a picture or a thought!</p>
                  <Link to="/publish"><button>Publish</button></Link>
                  </div>
                  ) : (
                    <div class="post" id="tip">
                    <h1>Customize Your Profile</h1>
                    <p>Your profile is the key factor in social relations on Crumbs, make sure you are prepared!</p>
                    <Link to="/profile"><button>Customise</button></Link>
                    </div> 
                  )
                    }
                <Display type='posts' />
              </>
            )
        
    };

export default Center;
