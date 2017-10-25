import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) =>
    (
        <Route {...rest} render={props => (
            rest.isAuthenticated ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }} />
                )
        )} />
    )


function mapStateToProps(state) {
    return {
        isAuthenticated: state.current_user.isAuthenticated
    }
}
export default connect(mapStateToProps)(PrivateRoute);