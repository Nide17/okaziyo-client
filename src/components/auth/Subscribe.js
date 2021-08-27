import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { subscribeToNewsLetter } from '../../redux/subscribers/subscribers.actions'
import { clearErrors } from '../../redux/error/error.actions'
import PropTypes from 'prop-types';

const Subscribe = ({ subscribeToNewsLetter, error }) => {

    const [state, setState] = useState({
        // initialy doesn't show
        name: '',
        email: '',
        msg: null
    })

    useEffect(() => {

        if (error.id !== null) {

            // Check for subscribe error
            if (error.id === 'SUBSCRIBE_FAIL') {
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

        const { name, email } = state;

        // Create user object
        const newSubscriber = {
            name,
            email
        };

        // Attempt to subscribe
        subscribeToNewsLetter(newSubscriber);

        // Reset
        setState({
            name: '',
            email: ''
        })
    }

    return (
        <div className="container">
            <div className="mt-5 w-50 mx-auto">
                <h1 className="text-center">Subscribe</h1>

                {state.msg ? (
                    <div className="alert alert-danger">
                        {state.msg}
                    </div>) : null}

                <form onSubmit={onSubmitHandler}>

                    <div className="form-group">

                        <label htmlFor="name" className="font-weight-bold">Name</label>
                        <input type="text" name="name" value={state.name || ''} placeholder="Name ..." className="form-control mb-3" onChange={onChangeHandler} required/>

                        <label htmlFor="email" className="font-weight-bold">Email</label>
                        <input type="email" name="email" value={state.email || ''} placeholder="Email ..." className="form-control mb-3" onChange={onChangeHandler} required/>

                        <button className="btn btn-warning btn-block" style={{ marginTop: '2rem' }}>Subscribe</button>

                    </div>

                </form>

            </div>
        </div>
    )
}

Subscribe.propTypes = {
    error: PropTypes.object,
    subscribeToNewsLetter: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
}

// Map  state props
const mapStateToProps = state => ({ error: state.errorReducer });

export default connect(mapStateToProps, { subscribeToNewsLetter, clearErrors })(Subscribe);