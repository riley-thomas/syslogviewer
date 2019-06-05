import './Utils/Polyfill.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { unregister as unregisterServiceWorker } from './registerServiceWorker'
import $ from 'jquery';
import './Utils/FAImport.js';
import './css/nc.css';
import './css/style.css';

window.jQuery = $;
window.$ = $;

//ReactDOM.render((<BrowserRouter basename="/syslogs/"><App /></BrowserRouter>), document.getElementById('root'));
ReactDOM.render((<BrowserRouter basename={'/syslog'}><App /></BrowserRouter>), document.getElementById('root'));
//registerServiceWorker();
unregisterServiceWorker();