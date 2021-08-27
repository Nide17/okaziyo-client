import React from 'react'

const Rating = () => {
    return (
        <div className="col-xl-4 col-md-6">
            <div className="card user-list">
                <div className="card-header">
                    <h5>Rating</h5>
                </div>
                <div className="card-block">
                    <div className="row align-items-center justify-content-center m-b-20">
                        <div className="col-6">
                            <h2 className="f-w-300 d-flex align-items-center float-left m-0">4.7 <i className="fas fa-star f-10 m-l-10 text-c-yellow"></i></h2>
                        </div>
                        <div className="col-6">
                            <h6 className="d-flex  align-items-center float-right m-0">0.4 <i className="fas fa-caret-up text-c-green f-22 m-l-10"></i></h6>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-12">
                            <h6 className="align-items-center float-left"><i className="fas fa-star f-10 m-r-10 text-c-yellow"></i>5</h6>
                            <h6 className="align-items-center float-right">384</h6>
                            <div className="progress m-t-30 m-b-20" style={{ height: "6px" }}>
                                <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: "70%" }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <div className="col-xl-12">
                            <h6 className="align-items-center float-left"><i className="fas fa-star f-10 m-r-10 text-c-yellow"></i>4</h6>
                            <h6 className="align-items-center float-right">145</h6>
                            <div className="progress m-t-30  m-b-20" style={{ height: "6px" }}>
                                <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: "35%" }} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <div className="col-xl-12">
                            <h6 className="align-items-center float-left"><i className="fas fa-star f-10 m-r-10 text-c-yellow"></i>3</h6>
                            <h6 className="align-items-center float-right">24</h6>
                            <div className="progress m-t-30  m-b-20" style={{ height: "6px" }}>
                                <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: "25%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <div className="col-xl-12">
                            <h6 className="align-items-center float-left"><i className="fas fa-star f-10 m-r-10 text-c-yellow"></i>2</h6>
                            <h6 className="align-items-center float-right">1</h6>
                            <div className="progress m-t-30  m-b-20" style={{ height: "6px" }}>
                                <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: "10%" }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <div className="col-xl-12">
                            <h6 className="align-items-center float-left"><i className="fas fa-star f-10 m-r-10 text-c-yellow"></i>1</h6>
                            <h6 className="align-items-center float-right">0</h6>
                            <div className="progress m-t-30  m-b-20" style={{ height: "6px" }}>
                                <div className="progress-bar" role="progressbar" style={{ width: "0" }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rating
