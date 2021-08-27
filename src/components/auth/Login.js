import React, { useState, useEffect } from 'react'
import ReactLoading from "react-loading";
import { connect } from 'react-redux';
import { loadUser, login } from '../../redux/auth/auth.actions';
import store from '../../redux/store'
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";

const Login = ({ login, error, auth }) => {

    useEffect(() => {
        store.dispatch(loadUser())
    }, []);

    const [state, setState] = useState({
        // initialy doesn't show
        email: '',
        password: '',
        msg: null
    })

    useEffect(() => {

        if (error.id !== null) {

            // Check for register error
            if (error.id === 'LOGIN_FAIL') {
                setState({ msg: error.msg.msg });
            } else {
                setState({ msg: null });
            }
        }
    }, [error])

    const onChangeHandler = e => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = e => {
        e.preventDefault();

        const { email, password } = state;

        // Create user object
        const user = {
            email,
            password
        };

        // Attempt to login
        login(user);
    }

    return (

        auth.isLoading ?
            <>
                <ReactLoading type="spinningBubbles" color="#33FFFC" />&nbsp;&nbsp;&nbsp;&nbsp; <br />
                <p className="d-block">Loading user ...</p>
            </> :

            auth.isAuthenticated ? <Redirect to="/dashboard" /> :

                <div className="container">
                    <div className="mt-5 w-50 mx-auto">

                        <div className="mb-4 text-center">
                            <i className="fa fa-unlock"></i>
                        </div>

                        <h1 className="text-center">Login</h1>

                        {state.msg ? (
                            <div className="alert alert-danger">
                                {state.msg}
                            </div>) : null}

                        <form onSubmit={onSubmitHandler}>

                            <div className="form-group">

                                <label htmlFor="email" className="font-weight-bold">Email</label>
                                <input type="email" name="email" value={state.email || ''} placeholder="Email ..." className="form-control mb-3" onChange={onChangeHandler} />

                                <label htmlFor="password" className="font-weight-bold">Password</label>
                                <input type="password" name="password" value={state.password || ''} placeholder="Password ..." className="form-control mb-3" onChange={onChangeHandler} />

                                <button className="btn btn-warning btn-block" style={{ marginTop: '2rem' }}>Login</button>

                            </div>

                        </form>

                        <a href="forgot-password" className="forgot-password">
                            <p className="font-weight-bold p-2">Forgot password</p>
                        </a>
                        <div className="d-flex">
                            <p className="p-2">No account yet? &nbsp;<a href="/register" className="text-success font-weight-bold">Register</a></p>
                        </div>
                    </div>
                </div>
    )
}

Login.propTypes = {
    error: PropTypes.object,
    login: PropTypes.func.isRequired,
    auth: PropTypes.object
}

// Map  state props
const mapStateToProps = state => ({
    auth: state.authReducer,
    error: state.errorReducer
});

export default connect(mapStateToProps, { login })(Login);