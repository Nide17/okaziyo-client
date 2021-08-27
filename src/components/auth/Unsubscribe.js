import React, { useState } from 'react'

import { Link } from 'react-router-dom'

const Unsubscribe = ({ auth, deleteSubscriber }) => {

    const [unsubscribed, setUnsubscribed] = useState(false);

    const onUnsubscribe = e => {
        e.preventDefault();

        // Attempt unsubscribe
        // deleteSubscriber(auth.user.email);
        setUnsubscribed(true)
    }

    return (

        <div className="container forgot-password mt-4">
            <div className="row mt-5 mx-1 d-block text-center">

                {unsubscribed ?
                    <h6 className="font-weight-bold my-5 py-5 text-success">
                        You have unsubscribed from Okaziyo! you will no longer receive updates.
                    </h6> :

                    <h6 className="font-weight-bold my-5 py-5 text-dark">
                        Are sure, you want to unsubscribe? click here to &nbsp;
                        <Link to="#/" onClick={onUnsubscribe}>unsubscribe</Link>
                    </h6>
                }

            </div>
        </div>)
}

export default Unsubscribe;