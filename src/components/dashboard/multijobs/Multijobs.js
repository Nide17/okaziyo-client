import React, { useState, useEffect } from 'react'
import { Row, Col, Breadcrumb, BreadcrumbItem, Button, Table } from 'reactstrap';
import { Link } from 'react-router-dom'
import ReactLoading from "react-loading";

import "../assets/fonts/fontawesome/css/fontawesome-all.min.css"
import "../assets/plugins/animation/css/animate.min.css"
import "../assets/css/dashboard.css"
import plusItem from '../../../images/plus.svg';
import trash from '../../../images/trash.svg';
import EditIcon from '../../../images/edit.svg';

import { connect } from 'react-redux';
import { getMultijobs, deleteMultijobs } from '../../../redux/multijobs/multijobs.actions'

import DHeader from '../DHeader'
import Navigation from '../Navigation'
import VisitorHomepage from '../homepage/VisitorHomepage'
import LoginModal from '../../auth/LoginModal'

const Multijobs = ({ auth, getMultijobs, categories, multijobs, deleteMultijobs }) => {

    const [showMob, setShowMob] = useState(false)

    // Lifecycle methods to load multijobs
    useEffect(() => {
        getMultijobs();
    }, [getMultijobs]);

    return (

        auth.isAuthenticated ?

            auth.user.role !== 'Visitor' ?

                <div className="dashboard">

                    <div className="loader-bg">
                        <div className="loader-track">
                            <div className="loader-fill"></div>
                        </div>
                    </div>

                    <Navigation showMob={showMob} setShowMob={setShowMob} categories={categories} />
                    <DHeader showMob={showMob} setShowMob={setShowMob} />

                    <div className="pcoded-main-container">
                        <div className="pcoded-wrapper">
                            <div className="pcoded-content">
                                <div className="pcoded-inner-content">

                                    <div className="main-body">
                                        <div className="page-wrapper">

                                            <div className="mt-2 mx-1">

                                                <Row className="mb-0 mb-lg-2 mx-0">
                                                    <Breadcrumb>
                                                        <BreadcrumbItem>
                                                            <Link to="/dashboard">
                                                                Multi-Jobs
                                                            </Link>
                                                        </BreadcrumbItem>
                                                        <BreadcrumbItem active>Summary</BreadcrumbItem>
                                                    </Breadcrumb>
                                                </Row>

                                                <div className="col-md-6 col-xl-10 mt-3">
                                                    <Row className="mb-0 mb-lg-3 mx-0 card Monthly-sales d-flex flex-row">

                                                        <Col sm="4" className="card-block">
                                                            <h6 className="mb-4">Multi-Jobs</h6>

                                                            <div className="row d-flex align-items-center">
                                                                <div className="col-8">
                                                                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                                                        <i className="feather icon-folder text-c-green f-30 m-r-10"></i>
                                                                        {multijobs.allMultijobs.length}
                                                                    </h3>
                                                                </div>

                                                                <div className="col-2 text-right">

                                                                    {
                                                                        <Link to="/dashboard/create-multijobs" className="text-secondary">
                                                                            <img src={plusItem} alt="" width="16" height="16" />
                                                                        </Link>
                                                                    }

                                                                </div>

                                                                <div className="col-2 text-right">
                                                                    <p className="m-b-0">
                                                                        <i className="feather icon-eye text-c-green f-30 m-r-10"></i>
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div className="progress m-t-30" style={{ height: "7px" }}>
                                                                <div className="progress-bar progress-c-theme2" role="progressbar" style={{ width: "100%" }} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>

                                                <Row className="all-items">
                                                    <Table size="sm" className="all-scores" hover responsive>
                                                        <thead>
                                                            <tr>
                                                                <th>#</th>
                                                                <th>Title</th>
                                                                <th>Creator</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            {multijobs.allMultijobs.map((multijob, index) =>

                                                                <tr key={multijob._id}>
                                                                    <th scope="row">{index + 1}</th>
                                                                    <td>{multijob.title && multijob.title}</td>
                                                                    <td>{multijob.creator && multijob.creator.name}</td>

                                                                    <td>
                                                                        <Button size="sm" color="link" className="mt-0 p-0" onClick={() => deleteMultijobs(multijob._id)}>
                                                                            <img src={trash} alt="" width="16" height="16" />
                                                                        </Button>

                                                                        <Link to={`/dashboard/edit-multijobs/${multijob._id}`} className="text-secondary">
                                                                            <img src={EditIcon} alt="" width="16" height="16" />
                                                                        </Link>
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </Table>
                                                </Row>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <script src="assets/js/vendor-all.min.js"></script>
                    <script src="assets/plugins/bootstrap/js/bootstrap.min.js"></script>
                    <script src="assets/js/pcoded.min.js"></script>
                </div> :
                <VisitorHomepage userId={auth.user._id} /> :

            // If not authenticated or loading
            <div className="vh-100 d-flex justify-content-center align-items-center text-danger">
                {
                    auth.isLoading ?
                        <>
                            <ReactLoading type="spinningBubbles" color="#33FFFC" />&nbsp;&nbsp;&nbsp;&nbsp; <br />
                            <p className="d-block">Loading user ...</p>
                        </> :
                        <LoginModal />
                }
            </div>
    )
}

// Map  state props
const mapStateToProps = state => ({
    auth: state.authReducer,
    multijobs: state.multijobsReducer
});

export default connect(mapStateToProps, { getMultijobs, deleteMultijobs })(Multijobs);