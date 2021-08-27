import React, { useState, useEffect } from 'react'
import "../assets/fonts/fontawesome/css/fontawesome-all.min.css"
import "../assets/plugins/animation/css/animate.min.css"
import "../assets/css/dashboard.css"
import LoginModal from '../../auth/LoginModal'

import { connect } from 'react-redux';
import { getItems } from '../../../redux/items/items.actions'
import { getJobs } from '../../../redux/items/jobs/jobs.actions'
import { getContacts } from '../../../redux/contacts/contacts.actions'
import { getSubscribers } from '../../../redux/subscribers/subscribers.actions'

import ReactLoading from "react-loading";
import DHeader from '../DHeader'
import Navigation from '../Navigation'
import CategoriesSummary from '../categories/CategoriesSummary'
import ItemsSummary from './ItemsSummary'
import JobsSummary from './JobsSummary'
import ContactsMessages from './ContactsMessages'
import SubscribersSummary from './SubscribersSummary'
import AllUsers from './AllUsers'
import VisitorHomepage from './VisitorHomepage'

const Homepage = ({ auth, jobs, getJobs, items, getItems, categories, contacts, getContacts, subscribers, getSubscribers }) => {

    const [showMob, setShowMob] = useState(false)

    // Lifecycle methods to load items
    useEffect(() => {
        getItems();
        getJobs();
        getContacts();
        getSubscribers();
    }, [getJobs, getItems, getContacts, getSubscribers]);

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

                                            <div className="row">
                                                <CategoriesSummary auth={auth} categories={categories} />
                                                <ItemsSummary items={items} />
                                                <JobsSummary jobs={jobs} />
                                                <ContactsMessages contacts={contacts} />
                                                <SubscribersSummary subscribers={subscribers} />
                                                <AllUsers />
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
    items: state.itemsReducer,
    contacts: state.contactsReducer,
    subscribers: state.subscribersReducer,
    jobs: state.jobsReducer
});
export default connect(mapStateToProps, { getJobs, getItems, getContacts, getSubscribers })(Homepage);