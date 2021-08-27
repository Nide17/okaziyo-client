import React, { useState, useEffect } from 'react'
import "../assets/fonts/fontawesome/css/fontawesome-all.min.css"
import "../assets/plugins/animation/css/animate.min.css"
import "../assets/css/dashboard.css"
import LoginModal from '../../auth/LoginModal'

import { connect } from 'react-redux';
import { getItems } from '../../../redux/items/items.actions'

import ReactLoading from "react-loading";
import DHeader from '../DHeader'
import NavigationSell from '../NavigationSell'
import ItemsSummary from './ItemsSummary'
import Homepage from './Homepage'

const VisitorHomepage = ({ auth, items, getItems, categories }) => {

    const [showMob, setShowMob] = useState(false)

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

                                            <div className="row">
                                                <ItemsSummary items={items} />
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
                <Homepage /> :

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
    items: state.itemsReducer,
    categories: state.categoriesReducer
});
export default connect(mapStateToProps, { getItems })(VisitorHomepage);