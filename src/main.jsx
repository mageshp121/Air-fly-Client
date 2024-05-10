import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import {Toaster} from 'react-hot-toast'
import store from './utils/redux/store/store.js';


ReactDOM.createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
    <Provider store={store} >
      <App />
    </Provider>
    <Toaster  position='top-right'/>
    </BrowserRouter>
  
)
