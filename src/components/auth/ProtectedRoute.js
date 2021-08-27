import React from 'react'
import { Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from 'prop-types';

const ProtectedRoute = ({ component: Component, auth, ...otherProps }) => (

    <Route
        {...otherProps}
        render={props =>
            auth.isAuthenticated ?
                (<Component {...props} />) : (<Redirect to="/login" />)} />
)

ProtectedRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.authReducer
})

export default connect(mapStateToProps)(ProtectedRoute);