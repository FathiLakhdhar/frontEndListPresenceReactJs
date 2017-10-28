import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, isAuthenticated, user, roles, ...rest }) =>
    (
        <Route {...rest} render={props => {

            if (isAuthenticated) {

                if (roles.filter(r => user.roles.includes(r)).length > 0) {
                    return (
                        <Component {...props} />
                    );
                } else {
                    return (
                        <Redirect to={{
                            pathname: '/forbidden',
                            state: { from: props.location }
                        }} />
                    );
                }

            }


            return (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }} />
            )

        }} />
    )


function mapStateToProps(state) {
    return {
        isAuthenticated: state.current_user.isAuthenticated,
        user: state.current_user.user
    }
}
export default connect(mapStateToProps)(PrivateRoute);