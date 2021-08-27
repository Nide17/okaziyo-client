import React from 'react'
import ReactLoading from "react-loading";
import CreateCategory from './CreateCategory';

const CategoriesSummary = ({ auth, categories }) => {

    return (
        <div className="col-md-6 col-xl-4">
            <div className="card daily-sales">

                {categories.isLoading ? <ReactLoading type="spinningBubbles" color="#33FFFC" /> :

                    <div className="card-block">
                        <h6 className="mb-4">Categories</h6>

                        <div className="row d-flex align-items-center">
                            <div className="col-8">
                                <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                    <i className="feather icon-folder text-c-green f-30 m-r-10"></i>
                                    {categories.allCategories.length}
                                </h3>
                            </div>

                            <div className="col-2 text-right">
                                <div className="m-b-0">
                                    <CreateCategory auth={auth} />
                                </div>
                            </div>

                            <div className="col-2 text-right">
                                <p className="m-b-0">
                                    <i className="feather icon-eye text-c-green f-30 m-r-10"></i>
                                </p>
                            </div>
                        </div>

                        <div className="progress m-t-30" style={{ height: "7px" }}>
                            <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: "100%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default CategoriesSummary