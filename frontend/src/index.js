import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { globalVar } from "./config";

import './assets/css/bootstrap.css';
import './assets/css/index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';
console.log("process.env🌺😊🌈💃🎂💫🎊");

console.log(globalVar);

console.log(process.env.base_url1);

ReactDOM.render(<Router>
    <App />
</Router>, document.getElementById('root'));
//registerServiceWorker();




