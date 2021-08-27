import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Form, FormGroup, Label, Input, Breadcrumb, BreadcrumbItem, Alert, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom'
import { createMultijobs } from '../../../redux/multijobs/multijobs.actions'
import { getActiveJobs } from '../../../redux/items/jobs/jobs.actions'
import { connect } from 'react-redux';
import ReactLoading from "react-loading";
import "../assets/fonts/fontawesome/css/fontawesome-all.min.css"
import "../assets/plugins/animation/css/animate.min.css"
import "../assets/css/dashboard.css"

import DHeader from '../DHeader'
import Navigation from '../Navigation'
import VisitorHomepage from '../homepage/VisitorHomepage'
import LoginModal from '../../auth/LoginModal'

const CreateMultiJobs = ({ auth, categories, allActiveJobs, getActiveJobs, createMultijobs }) => {

    const [multijobsState, setMultiJobsState] = useState({
        title: '',
        markdown: ''
    })
    // Errors state on form
    const [errorsState, setErrorsState] = useState([])
    const [showMob, setShowMob] = useState(false)

    // Lifecycle methods to load items
    useEffect(() => {
        getActiveJobs();
    }, [getActiveJobs]);

    const generateMultijobs = e => {
        setErrorsState([]);
        setMultiJobsState({
            ...multijobsState,
            title: `Over ${allActiveJobs.allActiveJobs.length} jobs that you may apply before the deadline closes! (Posted on ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/Rome' })})`,
            markdown: allActiveJobs.allActiveJobs.map((link, index) =>
                `\n${index + 1}. ${link.title} at ${link.brand} __(Deadline: ${new Date(link.deadline).toLocaleString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }) === '01/01/2025' ? 'Ongoing' : new Date(link.deadline).toLocaleString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })})__
                @@<http://www.okaziyo.com/slickJob/${link.slug}>`)
        });
    };

    const onChangeHandler = e => {
        // Remove errors
        setErrorsState([]);
        // Add data
        setMultiJobsState({ ...multijobsState, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = e => {
        e.preventDefault();

        const { title, markdown } = multijobsState;

        // VALIDATE
        // if (title.length < 4 || markdown.length < 4) {
        //     setErrorsState(['Insufficient info!']);
        //     return
        // }
        // else if (title.length > 80) {
        //     setErrorsState(['Multi-Jobs title is too long!']);
        //     return
        // }
        // else if (markdown.length < 80) {
        //     setErrorsState(['Multi-Jobs details are insufficient!']);
        //     return
        // }

        // Create new multi-jobs object
        const multiJobs = {
            title,
            markdown: markdown && markdown.join('\n\n\n').split('@@').join('\n'),
            creator: auth.user ? auth.user._id : null
        }

        // Attempt to create
        createMultijobs(multiJobs);
        // console.log(multiJobs)
        // Reset the form
        setMultiJobsState({
            title: '',
            markdown: ''
        })
    }

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

                                            <div className="mx-1">

                                                <Row className="mb-0 mx-0 d-flex justify-content-between">
                                                    <Breadcrumb>
                                                        <BreadcrumbItem>
                                                            <Link to="/dashboard/multi-jobs">Multi-Jobs</Link>
                                                        </BreadcrumbItem>
                                                        <BreadcrumbItem active>
                                                            Create New
                                                        </BreadcrumbItem>
                                                    </Breadcrumb>

                                                    {!allActiveJobs.isLoading ?
                                                        <Button color="success" onClick={generateMultijobs}>Generate Multijobs</Button> :
                                                        <Spinner color="danger" />
                                                    }
                                                </Row>

                                                <Row className="mb-0 mt-lg-4 mx-0 card Monthly-sales d-flex flex-row">

                                                    <Col>
                                                        {errorsState.length > 0 ?
                                                            errorsState.map(err =>
                                                                <Alert color="danger" key={Math.floor(Math.random() * 1000)}>
                                                                    {err}
                                                                </Alert>) :
                                                            null
                                                        }

                                                        <Form onSubmit={onSubmitHandler}>

                                                            <FormGroup>

                                                                <Label for="title">
                                                                    <strong>Title</strong>
                                                                </Label>

                                                                <Input type="text" name="title" id="title" placeholder="Multi-Jobs title ..." className="mb-2" onChange={onChangeHandler} value={multijobsState.title || ''} />

                                                                <Label for="markdown">
                                                                    <strong>Markdown</strong>
                                                                </Label>

                                                                <Input type="textarea" name="markdown" id="markdown" placeholder="Multi Jobs links ..." minLength="80" rows="30" className="mb-2" onChange={onChangeHandler} value={multijobsState.markdown || ''} />

                                                                <Button color="success" style={{ marginTop: '2rem' }} block >Create</Button>

                                                            </FormGroup>

                                                        </Form>
                                                    </Col>

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
    allActiveJobs: state.jobsReducer
});

export default connect(mapStateToProps, { createMultijobs, getActiveJobs })(CreateMultiJobs);