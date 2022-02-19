import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';
import * as _ from 'lodash';
import { VideoContextProvider } from './src/VideoContext';
import { UserContextProvider } from './src/UserContext';

ReactDOM.render(
  <UserContextProvider>
    <VideoContextProvider>
      <App />
    </VideoContextProvider>
  </UserContextProvider>, document.getElementById('app'));
