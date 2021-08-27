import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { sendResetLink } from '../../redux/auth/auth.actions';
import PropTypes from 'prop-types';

const ForgotPassword = ({ error, sendResetLink }) => {

    const [fEmail, setFEmail] = useState('');
    const [showSent, setShowSent] = useState(false);
    const [errorsState, setErrorsState] = useState({ msg: null })

    useEffect(() => {
        if (error.id !== null) {

            // Check for register error
            if (error.id === 'UNEXISTING_EMAIL') {
                setErrorsState({ msg: error.msg.msg });
            } else {
                setErrorsState({ msg: null });
            }
        }
    }, [error])

    const onChangeHandler = e => {
        setFEmail({ [e.target.name]: e.target.value });
    };

    const onSubmitHandler = e => {
        e.preventDefault();

        // VALIDATE
        const emailTest = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!fEmail.email) {
            setErrorsState({ msg: 'Please provide your email!' });
            return
        }
        else if (!emailTest.test(fEmail.email)) {
            setErrorsState({ msg: 'Please provide a valid email!' });
            return
        }
        else if (error.id === 'UNEXISTING_EMAIL') {
            setErrorsState({ msg: error.msg.msg });
            return
        }

        setShowSent(true)
        sendResetLink(fEmail);
    }

    return (
        <div className="container forgot-password mt-4">
            <div className="row mt-5 mx-1 d-block text-center">

                {!errorsState.msg && showSent ?
                    <h6 className="font-weight-bold my-5 py-5 text-success">
                        Reset link sent to {fEmail.email} succesfully!
                    </h6> :

                    <>
                        <h2 className="font-weight-bold my-3">Find your account here</h2>

                        <small>Provide your email to find your account</small>

                        <form className="my-4" onSubmit={onSubmitHandler}>
                            {errorsState.msg ?
                                <div className="alert alert-danger mx-auto p-1 w-50">
                                    {errorsState.msg}
                                </div> : null}

                            <div className="input-group mx-auto search w-50">
                                <input type="text"
                                    name="email"
                                    className="form-control"
                                    placeholder=" Email ..."
                                    onChange={onChangeHandler} />
                            </div>

                            <button className="btn btn-sm btn-info mt-4 d-block mx-auto">Send Link</button>

                        </form>

                    </>

                }

            </div>
        </div>
    )
}

ForgotPassword.propTypes = {
    error: PropTypes.object
}

// Map  state props
const mapStateToProps = state => ({ error: state.errorReducer });

export default connect(mapStateToProps, { sendResetLink })(ForgotPassword);