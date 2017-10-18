import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signUpAction } from '../../actions/authAction';
import Validator from 'validator';
import { isEmpty } from 'lodash';
import { withRouter, Link } from 'react-router-dom';

class SignUpForm extends Component {
    constructor() {
        super();
        this.state = {
            firstname: '',
            surname: '',
            email: '',
            password: '',
            age: '',
            gender: 'male',
            errors: {},
            isLoading: false,
        };
    }

    HandleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        //console.log(this.state);
    }

    HandleSubmit(e) {
        e.preventDefault();
        this.setState({ errors: {} });
        var { errors, isValid } = this.validateForm(this.state);
        //console.log(errors, isValid);
        if (isValid) {
            this.setState({ isLoading: true });
            this.props.signUpAction(this.state).then(
                (res) => {
                    console.log(res);
                    this.props.history.push('/login');
                },
                (err) => {
                    errors = err.response.data.errors;
                    this.setState({ errors });
                }
            );
            this.setState({ isLoading: false });
        } else {
            this.setState({ errors });
        }


    }

    validateForm(f) {
        let errors = {};

        if (Validator.isEmpty(f.firstname))
            errors.firstname = 'This field is required';
        if (Validator.isEmpty(f.surname))
            errors.surname = 'This field is required';
        if (!Validator.isEmail(f.email))
            errors.email = 'Email is invalid';
        if (Validator.isEmpty(f.password)) {
            errors.password = 'This field is required';
        } else
            if (!Validator.isLength(f.password, { min: 8, max: 20 }))
                errors.password = 'Password is invalid {min:8, max:20} charater';
        if (Validator.isEmpty(f.age)) {
            errors.age = 'This field is required';
        } else
            if (!Validator.isNumeric(f.age))
                errors.age = 'Age is invalid';

        return { errors, isValid: isEmpty(errors) };
    }


    render() {
        const errors = this.state.errors;
        return (
            <div className="bg_login">
                <form name="form" className="form_register" onSubmit={this.HandleSubmit.bind(this)}>

                    <div className="align-center">
                        <img src="assets/img/logoLP.png" alt="logoLP" style={{ 'maxWidth': 150 + 'px' }} />
                        <h1>List Présence</h1>
                    </div>

                    {errors.form && <div className="alert alert-danger">{errors.form}</div>}

                    <div className={"form-group " + (errors.firstname ? 'has-error' : '')} >
                        <input type="text" value={this.state.firstname} onChange={this.HandleChange.bind(this)} className="form-control" name="firstname" placeholder="firstname" />
                        {errors.firstname && <span className="help-block">{errors.firstname}</span>}
                    </div>
                    <div className={"form-group " + (errors.surname ? 'has-error' : '')} >
                        <input type="text" value={this.state.surname} onChange={this.HandleChange.bind(this)} className="form-control" name="surname" placeholder="surname" />
                        {errors.surname && <span className="help-block">{errors.surname}</span>}
                    </div>
                    <div className={"form-group " + (errors.email ? 'has-error' : '')} >
                        <input type="email" value={this.state.email} onChange={this.HandleChange.bind(this)} className="form-control" name="email" placeholder="Email" />
                        {errors.email && <span className="help-block">{errors.email}</span>}
                    </div>
                    <div className={"form-group " + (errors.password ? 'has-error' : '')} >
                        <input type="password" value={this.state.password} onChange={this.HandleChange.bind(this)} className="form-control" name="password" placeholder="Password" />
                        {errors.password && <span className="help-block">{errors.password}</span>}
                    </div>
                    <div className={"form-group " + (errors.age ? 'has-error' : '')} >
                        <input type="text" value={this.state.age} onChange={this.HandleChange.bind(this)} className="form-control" name="age" placeholder="Age" />
                        {errors.age && <span className="help-block">{errors.age}</span>}
                    </div>

                    <div className="radio">
                        <label>
                            <input type="radio" name="gender" onChange={this.HandleChange.bind(this)} value="male" checked={this.state.gender === 'male'} />Male
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input type="radio" name="gender" onChange={this.HandleChange.bind(this)} value="female" checked={this.state.gender === 'female'} />Female
                        </label>
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn btn-success btn-lg btn-block">Sign Up</button>
                        <Link to="/login" className="btn btn-link btn-lg btn-block">Login</Link>
                        <img className={this.state.isLoading ? 'show' : 'hide'} alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                        />
                    </div>
                </form>
            </div>
        );
    }


}

SignUpForm.propTypes = {
    //signUpAction: React.PropTypes.func.isRequired,
}

function matchDispatchToProps(dispatch) {
    return {
        signUpAction: bindActionCreators(signUpAction, dispatch)
    }
}

export default withRouter(connect(null, matchDispatchToProps)(SignUpForm));