import React from 'react'
import ReactLoading from "react-loading";

const SubscribersSummary = ({ subscribers }) => {

    return (
        <>
            {subscribers.isLoading ?
            <div className="d-flex justify-content-center align-items-center">
                            <ReactLoading type="spinningBubbles" color="#33FFFC" />
                        </div>:

                <div className="col-xl-4 col-md-6">
                    <div className="card card-event">
                        <div className="card-block">

                            <div className="row align-items-center justify-content-center">
                                <div className="col">
                                    <h5 className="m-0">Subscribers</h5>
                                </div>
                            </div>

                            <h2 className="mt-3 f-w-300">
                                {subscribers.subscribedUsers.length}
                                <sub className="text-muted f-14"> Clients</sub></h2>
                            <i className="fab fa-angellist text-c-purple f-50"></i>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-block border-bottom">

                            <div className="row d-flex align-items-center">
                                <div className="col-auto">
                                    <i className="feather icon-zap f-30 text-c-green"></i>
                                </div>
                                <div className="col">
                                    <h3 className="f-w-300">
                                        {subscribers.subscribedUsers.length}
                                    </h3>
                                    <span className="d-block text-uppercase">TODAY</span>
                                </div>
                            </div>
                        </div>

                        <div className="card-block border-bottom">
                            <div className="row d-flex align-items-center">
                                <div className="col-auto">
                                    <i className="feather icon-map-pin f-30 text-c-blue"></i>
                                </div>
                                <div className="col">
                                    <h3 className="f-w-300">
                                        {subscribers.subscribedUsers.length}
                                    </h3>
                                    <span className="d-block text-uppercase">THIS WEEK</span>
                                </div>
                            </div>
                        </div>

                        <div className="card-block">
                            <div className="row d-flex align-items-center">
                                <div className="col-auto">
                                    <i className="feather icon-map-pin f-30 text-c-blue"></i>
                                </div>
                                <div className="col">
                                    <h3 className="f-w-300">
                                        {subscribers.subscribedUsers.length}
                                    </h3>
                                    <span className="d-block text-uppercase">THIS MONTH</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default SubscribersSummary
