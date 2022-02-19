import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';
import * as _ from 'lodash';
import {HashRouter as Router} from 'react-router-dom'

ReactDOM.render(<Router><App /></Router>, document.getElementById('app'));
