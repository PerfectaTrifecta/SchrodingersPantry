import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';
import * as _ from 'lodash';
import { VideoContextProvider } from './src/VideoContext';
import { UserContextProvider } from './src/UserContext';
import {HashRouter as Router} from 'react-router-dom';

ReactDOM.render(
  <UserContextProvider>
    <VideoContextProvider> 
      <Router>
        <App />
      </Router>
    </VideoContextProvider>
  </UserContextProvider>, document.getElementById('app'));
