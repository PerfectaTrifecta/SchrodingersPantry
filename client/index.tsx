import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';
import * as _ from 'lodash';
import { VideoContextProvider } from './src/VideoContext';

ReactDOM.render(
<VideoContextProvider>
  <App />
</VideoContextProvider>, document.getElementById('app'));
