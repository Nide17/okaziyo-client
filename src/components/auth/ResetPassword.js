import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { sendNewPassword } from '../../redux/auth/auth.actions';
import PropTypes from 'prop-types';

const ResetPassword = ({ error, sendNewPassword }) => {

    const [newPasswords, setNewPasswords] = useState({
        password: '',
        password1: ''
    });
    const [showResetSuccess, setShowResetSuccess] = useState(false);
    const [errorsState, setErrorsState] = useState({ msg: null })

    useEffect(() => {
        if (error.id !== null) {

            // Check for register error
            if (error.id === 'RESET_FAIL') {
                setErrorsState({ msg: error.msg.msg });
            } else {
                setErrorsState({ msg: null });
            }
        }
    }, [error])

    const onChangeHandler = e => {
        setNewPasswords({ ...newPasswords, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = e => {
        e.preventDefault();

        const { password, password1 } = newPasswords;

        // Simple validation
        const pswdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!password || !password1) {
            setErrorsState({ msg: 'Fill empty fields!' });
            return
        }

        else if (!pswdRegex.test(password)) {
            setErrorsState({ msg: 'Password should be greater than 7 and having special characters, number, and uppercase and lowercase letters' });
            return
        }

        else if (password !== password1) {
            setErrorsState({ msg: 'Passwords must match!' });
            return
        }

        else if (error.id === 'RESET_FAIL') {
            setErrorsState({ msg: error.msg.msg });
            return
        }

        // Exploit token and userId from URL
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const token = urlParams.get('token')
        const userId = urlParams.get('id')

        // Create new pswd object
        const updatePsw = {
            userId,
            token,
            password
        };

        // Attempt to reset
        sendNewPassword(updatePsw);
        setShowResetSuccess(true)
    }

    return (

        <div className="container forgot-password mt-4">
            <div className="row mt-5 mx-1 d-block text-center">

                {!errorsState.msg && showResetSuccess ?
                    <h6 className="font-weight-bold my-5 py-5 text-success">
                        Account reset successful, Please Login!
                    </h6> :

                    <>
                        <h2 className="font-weight-bold my-3">Change your password here</h2>

                        <small>Provide matching passwords to reset your account</small>

                        <form className="my-4" onSubmit={onSubmitHandler}>

                            {errorsState.msg ?
                                <div className="alert alert-danger mx-auto p-1 w-50">
                                    {errorsState.msg}
                                </div> : null}

                            <div className="input-group mx-auto my-5 search w-50">
                                <input type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder=" Create password ..."
                                    onChange={onChangeHandler} />
                            </div>

                            <div className="input-group mx-auto my-5 search w-50">
                                <input type="password"
                                    name="password1"
                                    className="form-control"
                                    placeholder=" Verify password ..."
                                    onChange={onChangeHandler} />
                            </div>

                            <button className="btn btn-sm btn-info mt-4 d-block mx-auto">Reset</button>

                        </form>
                    </>

                }

            </div>
        </div>
    )
}

ResetPassword.propTypes = {
    error: PropTypes.object
}

// Map  state props
const mapStateToProps = state => ({ error: state.errorReducer });

export default connect(mapStateToProps, { sendNewPassword })(ResetPassword);