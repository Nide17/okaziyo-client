import React, { useState, useEffect } from 'react'
import { Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link, useParams } from 'react-router-dom'
import ReactLoading from "react-loading";

import "../assets/fonts/fontawesome/css/fontawesome-all.min.css"
import "../assets/plugins/animation/css/animate.min.css"
import "../assets/css/dashboard.css"

import { connect } from 'react-redux'
import { getItems } from '../../../redux/items/items.actions'

import DHeader from '../DHeader'
import AddItem from './AddItem'
import NavigationSell from '../NavigationSell'
import LoginModal from '../../auth/LoginModal'
import Homepage from '../homepage/Homepage';

const SellItem = ({ auth, getItems, categories, items }) => {

    const [showMob, setShowMob] = useState(false)

    // Access route parameters
    const { categoryId } = useParams()

    // Lifecycle methods to load items
    useEffect(() => {
        getItems();
    }, [getItems]);

    return (

        auth.isAuthenticated ?

            auth.user.role === 'Visitor' ?

                <div className="dashboard">

                    <div className="loader-bg">
                        <div className="loader-track">
                            <div className="loader-fill"></div>
                        </div>
                    </div>

                    <NavigationSell showMob={showMob} setShowMob={setShowMob} categories={categories} />
                    <DHeader showMob={showMob} setShowMob={setShowMob} />

                    <div className="pcoded-main-container">
                        <div className="pcoded-wrapper">
                            <div className="pcoded-content">
                                <div className="pcoded-inner-content">

                                    <div className="main-body">
                                        <div className="page-wrapper">

                                            {categories && categories.allCategories.map(category => (

                                                (category._id === categoryId) ?

                                                    <div className="mt-2 mx-1" key={category._id}>

                                                        <Row className="mb-0 mb-lg-3 mx-0">
                                                            <Breadcrumb>
                                                                <BreadcrumbItem>
                                                                    <Link to="/dashboard">
                                                                        {category.title}
                                                                    </Link>
                                                                </BreadcrumbItem>
                                                                <BreadcrumbItem active>Sub-categories</BreadcrumbItem>
                                                            </Breadcrumb>
                                                        </Row>

                                                        <small className="ml-2 one-cat-desc">
                                                            <i className="text-success text-left">
                                                                "{category.description}"
                                                            </i>
                                                        </small>

                                                        <div className="col-md-6 col-xl-10">
                                                            <Row className="mb-0 mb-lg-3 mx-0 card Monthly-sales d-flex flex-row">

                                                                {categories.isLoading ?
                                                                    <div className="d-flex justify-content-center align-items-center">
                                                                        <ReactLoading type="bars" color="#33FFFC" />
                                                                    </div> :

                                                                    <>
                                                                        {category.sub_category.map(subc => (

                                                                            <Col sm="4" className="card-block" key={subc._id}>
                                                                                <h6 className="mb-4">{subc.name}</h6>

                                                                                <div className="row d-flex align-items-center">
                                                                                    <div className="col-8">
                                                                                        <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                                                                            <i className="feather icon-folder text-c-green f-30 m-r-10"></i>
                                                                                            {items.allItems.filter(item =>
                                                                                                item.sub_category === subc._id).length}

                                                                                        </h3>
                                                                                    </div>

                                                                                    <div className="col-2 text-right">

                                                                                        {
                                                                                            <div className="m-b-0">
                                                                                                <AddItem categoryId={category._id} sub_category={subc._id} />
                                                                                            </div>
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
                                                                            </Col>))}
                                                                    </>}

                                                            </Row>
                                                        </div>
                                                    </div> :
                                                    null
                                            ))}

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
                
                <Homepage userId={auth.user._id} /> :

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
    items: state.itemsReducer
});
export default connect(mapStateToProps, { getItems })(SellItem);