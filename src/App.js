import React, { Component } from 'react';
import Layout from './components/layout';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './store';
import axios from 'axios';
import { setCurrentUserAction } from './actions/authAction';
import jwt from 'jsonwebtoken';
//import setAuthorizationToken from './axiosAuthToken';
import 'react-dates/lib/css/_datepicker.css';
import 'react-datetime/css/react-datetime.css';
import 'react-times/css/classic/default.css';
import 'react-times/css/material/default.css';
import './App.css';



class App extends Component {

  componentDidMount() {
    this.configAxios();
    if (localStorage.getItem('jwtoken')) {
      Store.dispatch(setCurrentUserAction(jwt.decode(localStorage.getItem('jwtoken'))));
    }
    
  }



  configAxios() {
    axios.defaults.baseURL = 'http://localhost:3030/';
    //setAuthorizationToken(localStorage.getItem('jwtoken'));
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