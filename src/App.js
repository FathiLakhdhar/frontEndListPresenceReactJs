import React, { Component } from 'react';
import Layout from './components/layout';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './store';
import { setCurrentUserAction } from './actions/authAction';
import jwt from 'jsonwebtoken';
import {setAuthorizationToken, setAxiosBaseUrl} from './axiosConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dates/lib/css/_datepicker.css';
import 'react-datetime/css/react-datetime.css';
import 'react-times/css/classic/default.css';
//import 'react-times/css/material/default.css';
import 'ionicons/dist/css/ionicons.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import 'bootstrap/dist/js/bootstrap.min.js';


class App extends Component {

  componentDidMount() {
    this.configAxios();
    if (localStorage.getItem('jwtoken')) {
      Store.dispatch(setCurrentUserAction(jwt.decode(localStorage.getItem('jwtoken'))));
    }
    
  }



  configAxios() {
    setAxiosBaseUrl();
    setAuthorizationToken(localStorage.getItem('jwtoken'));
  }


  render() {
    return (
      <Provider store={Store}>
        <BrowserRouter basename='/'>
          <Layout />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;