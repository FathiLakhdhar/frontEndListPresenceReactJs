import React, { Component } from 'react';
import {  Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './menu/navbar';
import Footer from './footer';
import Home from './home';
import Login from './auth/login';
import SignUp from './auth/signUp';
import AdminPage from './admin';
class Layout extends Component {
    render() {
        return (
            <div>
                <Navbar />
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={SignUp} />
                        <Route path="/admin" component={AdminPage}>
                        </Route>
                        <Redirect to="/" />
                    </Switch>
                <Footer />
            </div>
        );
    }
}

export default Layout;