import React from 'react';
import Display from '../components/display.js';
import { getItem } from '../components/utils.js';
import Popup from '../components/popup.js';
import { Link } from 'react-router-dom';

function Center() {




    return (
              <>
                
                <div class="post" id="tip">
                  <h1>Start Publishing</h1>
                  <p>Make a move, share a picture or a thought!</p>
                  <Link to="/publish"><button>Publish</button></Link>
                  </div>

                <Display type='posts'/>
              </>
            )
        
    };

export default Center;