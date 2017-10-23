import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginAction, setCurrentUserAction } from '../../actions/authAction';
import Validator from 'validator';
import { isEmpty } from 'lodash';
import {withRouter, Link} from 'react-router-dom';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../../axiosAuthToken';
class LoginForm extends Component {


    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {},
            isLoading: false,
        };
    }

    HandleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    HandleSubmit(e) {
        e.preventDefault();
        this.setState({ errors: {} });

        const { errors, isValid } = this.validateForm(this.state);

        if (isValid) {
            this.setState({ isLoading: true });
            this.props.loginAction(this.state).then(
                (res) => {
                    const { token } = res.data;
                    //console.log(res.data);
                    localStorage.setItem('jwtoken', token);
                    setAuthorizationToken(token);
                    const user = jwt.decode(token);
                    this.props.setCurrentUserAction(user);
                    this.props.history.push('/');
                }, (error) => {
                    const { errors } = error.response.data;
                    console.log(error);
                    this.setState({ errors });
                }
            );
        } else {
            this.setState({ errors });
        }
    }



    validateForm(f) {
        let errors = {};

        if (!Validator.isEmail(f.email))
            errors.email = 'Email is invalid';

        if (Validator.isEmpty(f.password)) {
            errors.password = 'This field is required';
        } else
            if (!Validator.isLength(f.password, { min: 8, max: 20 }))
                errors.password = 'Password is invalid {min:8, max:20} charater';

        return { errors, isValid: isEmpty(errors) };
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="bg_login">

                <form name="form" className="form_login" onSubmit={this.HandleSubmit.bind(this)} >
                    <div className="align-center">
                        <img src="assets/img/logoLP.png" alt="LogoLp" style={{ 'maxWidth': 150 + 'px' }} />
                        <h1>List Présence</h1>
                    </div>

                    {errors.form && <div className="alert alert-danger">{errors.form}</div>}

                    <div className={"form-group " + (errors.email ? 'has-error' : '')} >
                        <input type="email" value={this.state.email} onChange={this.HandleChange.bind(this)} className="form-control" name="email" placeholder="Email" />
                        {errors.email && <span className="help-block">{errors.email}</span>}
                    </div>
                    <div className={"form-group " + (errors.password ? 'has-error' : '')} >
                        <input type="password" value={this.state.password} onChange={this.HandleChange.bind(this)} className="form-control" name="password" placeholder="Password" />
                        {errors.password && <span className="help-block">{errors.password}</span>}
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn btn-success btn-lg btn-block">Login</button>
                        <Link to="/signup" className="btn btn-link btn-lg btn-block">SignUp</Link>
                        <img className={this.state.isLoading ? 'show' : 'hide'} alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                        />

                    </div>
                </form>


            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginAction: bindActionCreators(loginAction, dispatch),
        setCurrentUserAction: bindActionCreators(setCurrentUserAction, dispatch),
    }
}

export default withRouter ( connect(null, mapDispatchToProps) (LoginForm) );