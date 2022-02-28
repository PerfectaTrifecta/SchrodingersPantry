import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';
import * as _ from 'lodash';
import { VideoContextProvider } from './src/VideoContext';
import { UserContextProvider } from './src/UserContext';
import {HashRouter as Router} from 'react-router-dom';
import { ThemeProvider } from "@mui/material/styles";
import theme from "./src/Theme"

ReactDOM.render(
  <UserContextProvider>
    <VideoContextProvider> 
      <ThemeProvider theme={ theme } >
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </VideoContextProvider>
  </UserContextProvider>, document.getElementById('app'));
