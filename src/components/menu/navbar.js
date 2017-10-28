import React, { Component } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {logout} from '../../actions/authAction';

class Navbar extends Component {


    logout(e){
        e.preventDefault();
        this.props.logout();
    }


    render() {
        const { isAuthenticated, user } = this.props.current_user;
        let rightNavLink;
        if (isAuthenticated) {
            rightNavLink = (
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <NavLink to="/profil" activeClassName="active">{user.email}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/logout" activeClassName="active" onClick={this.logout.bind(this)}>Logout</NavLink>
                    </li>
                </ul>
            );
        } else {
            rightNavLink = (
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <NavLink to="/login" exact activeClassName="active">Login</NavLink>
                    </li>
                    <li>
                        <NavLink to="/signup" exact activeClassName="active">SignUp</NavLink>
                    </li>
                </ul>
            );
        }

        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link className="navbar-brand" to="/"><img src="../assets/img/logoLP.png" alt="LP : List Présence" /></Link>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li><NavLink to="/" exact activeClassName="active">Home <span className="sr-only">(current)</span></NavLink></li>
                                <li><NavLink to="/admin" activeClassName="active">Admin</NavLink></li>
                                <li><NavLink to="/teachers" activeClassName="active">Teachers</NavLink></li>
                                <li><NavLink to="/workers" activeClassName="active">workers</NavLink></li>
                                <li className="dropdown">
                                    <a href="" className="dropdown-toggle" data-toggle="dropdown">Dropdown <b className="caret"></b></a>
                                    <ul className="dropdown-menu">
                                        <li><a href="">Action</a></li>
                                        <li><a href="">Another action</a></li>
                                        <li><a href="">Something else here</a></li>
                                        <li className="divider"></li>
                                        <li><a href="">Separated NavLink</a></li>
                                        <li className="divider"></li>
                                        <li><a href="">One more separated NavLink</a></li>
                                    </ul>
                                </li>
                            </ul>

                            {rightNavLink}
                        </div>

                    </div>
                </nav>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return { current_user: state.current_user };
}
function mapDispatchToProps(dispatch){
    return {
        logout: bindActionCreators(logout,dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));