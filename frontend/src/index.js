import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from "react-router-dom";

import './assets/css/bootstrap.css';
import './assets/css/index.css';
import 'react-notifications/lib/notifications.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Router>
    <App />
</Router>, document.getElementById('root'));
//registerServiceWorker();