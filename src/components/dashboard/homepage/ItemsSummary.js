import React from 'react'
import ReactLoading from "react-loading";

const ItemsSummary = ({ items }) => {

    return (
        <div className="col-md-6 col-xl-4">
            <div className="card Monthly-sales">

                {items.isLoading ?
                    <div className="d-flex justify-content-center align-items-center">
                        <ReactLoading type="spinningBubbles" color="#33FFFC" />
                    </div> :

                    <div className="card-block">
                        <h6 className="mb-4">Items</h6>

                        <div className="row d-flex align-items-center">
                            <div className="col-8">
                                <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                    <i className="feather icon-folder text-c-green f-30 m-r-10"></i>
                                    {items.allItems.length}
                                </h3>
                            </div>

                            <div className="col-2 text-right">
                                <p className="m-b-0">
                                    <i className="feather icon-plus-circle text-c-green f-30 m-r-10 d-none"></i>
                                </p>
                            </div>

                            <div className="col-2 text-right">
                                <p className="m-b-0">
                                    <i className="feather icon-eye text-c-green f-30 m-r-10 d-none"></i>
                                </p>
                            </div>
                        </div>

                        <div className="progress m-t-30" style={{ height: "7px" }}>
                            <div className="progress-bar progress-c-theme2" role="progressbar" style={{ width: "100%" }} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default ItemsSummary