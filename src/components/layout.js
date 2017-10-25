import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './menu/navbar';
import Footer from './footer';
import Home from './home';
import Login from './auth/login';
import SignUp from './auth/signUp';
import AdminPage from './admin';
import PrivateRoute from '../components/route/privateRoute'

class Layout extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={SignUp} />
                    <PrivateRoute path="/admin" component={AdminPage} />
                <Redirect to="/" />
                    </Switch>
            <Footer />
            </div >
        );
    }
}

export default Layout;